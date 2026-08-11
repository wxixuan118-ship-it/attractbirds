/**
 * GBIF (Global Biodiversity Information Facility) importer
 *
 * Docs:    https://www.gbif.org/developer/summary
 * Auth:    none required for read-only queries
 *
 * Seeds:  bird_images    (CC-licensed still images)
 *         bird_details   (gbifId for cross-reference)
 */

import { eq } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { birds, birdDetails, birdImages, sources } from "../../db/schema.js";
import type { GbifSpeciesMatch, GbifMedia, GbifOccurrenceSearchResult, ImportResult } from "./types.js";

const BASE = "https://api.gbif.org/v1";

// Open licenses we accept for publication
const OPEN_LICENSES = [
  "http://creativecommons.org/licenses/by/",
  "http://creativecommons.org/licenses/by-sa/",
  "http://creativecommons.org/publicdomain/zero/",
  "http://creativecommons.org/licenses/cc0",
  "CC0",
  "CC BY",
  "CC BY-SA",
  "CC BY 4.0",
  "CC BY-SA 4.0",
];

function isOpenLicense(license: string): boolean {
  return OPEN_LICENSES.some((l) => license.toLowerCase().includes(l.toLowerCase()));
}

// Normalize a GBIF license URL to a short label
function normalizeLicense(license: string): string {
  if (license.includes("publicdomain") || license.includes("cc0")) return "CC0";
  if (license.includes("/by-sa/")) return "CC BY-SA 4.0";
  if (license.includes("/by-nc-sa/")) return "CC BY-NC-SA 4.0";
  if (license.includes("/by-nc/")) return "CC BY-NC 4.0";
  if (license.includes("/by/")) return "CC BY 4.0";
  return license;
}

async function gbifGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`GBIF ${path} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ─── Species key lookup ───────────────────────────────────────────────────────

/** Returns the GBIF usageKey for a scientific name, or null if no exact match. */
export async function lookupGbifKey(scientificName: string): Promise<number | null> {
  try {
    const match = await gbifGet<GbifSpeciesMatch>("/species/match", {
      name: scientificName,
      kingdom: "Animalia",
      class: "Aves",
    });
    if (match.matchType === "EXACT" && match.confidence >= 90) return match.usageKey;
    return null;
  } catch {
    return null;
  }
}

// ─── Image import ─────────────────────────────────────────────────────────────

/**
 * Fetches up to `limit` CC-licensed still images for a bird from GBIF occurrences,
 * then upserts them into `bird_images`.
 */
export async function importBirdImages(
  birdId: string,
  gbifKey: number,
  limit = 5,
): Promise<ImportResult> {
  const result: ImportResult = { source: "GBIF images", inserted: 0, updated: 0, skipped: 0, errors: [] };
  const db = getDb();

  let occurrences: GbifOccurrenceSearchResult;
  try {
    occurrences = await gbifGet<GbifOccurrenceSearchResult>("/occurrence/search", {
      taxonKey: String(gbifKey),
      mediaType: "StillImage",
      limit: String(limit * 3), // fetch extra to filter for open licenses
    });
  } catch (e) {
    result.errors.push(String(e));
    return result;
  }

  const [src] = await db
    .insert(sources)
    .values({
      organization: "Global Biodiversity Information Facility (GBIF)",
      sourceUrl: `https://www.gbif.org/species/${gbifKey}`,
      datasetIdentifier: `gbif-species-${gbifKey}`,
      license: "CC BY",
      attribution: `GBIF.org occurrence data for GBIF taxon key ${gbifKey}.`,
      allowedFields: ["image_url", "thumbnail_url", "credit", "license"],
    })
    .onConflictDoNothing()
    .returning({ id: sources.id });

  let inserted = 0;
  for (const occ of occurrences.results) {
    if (inserted >= limit) break;
    if (!occ.media) continue;

    for (const media of occ.media as GbifMedia[]) {
      if (inserted >= limit) break;
      if (media.type !== "StillImage") continue;
      if (!media.identifier || !media.license) continue;
      if (!isOpenLicense(media.license)) { result.skipped++; continue; }
      if (!media.identifier.startsWith("http")) continue;

      try {
        await db
          .insert(birdImages)
          .values({
            birdId,
            imageUrl: media.identifier,
            altText: media.title ?? `${media.creator ?? "Unknown"} — GBIF`,
            credit: media.creator ?? media.rightsHolder ?? "Unknown",
            license: normalizeLicense(media.license),
            gbifId: String(occ.key),
            isPrimary: inserted === 0, // first valid image = hero
            sourceId: src?.id,
          })
          .onConflictDoNothing();
        inserted++;
        result.inserted++;
      } catch (e) {
        result.errors.push(`occ ${occ.key}: ${String(e)}`);
      }
    }
  }

  return result;
}

// ─── Batch runner ─────────────────────────────────────────────────────────────

/**
 * For every bird in the DB that has no images yet, looks up its GBIF key and
 * imports images. Respects a per-call delay to avoid hammering the API.
 *
 * Usage: importAllBirdImages({ limit: 5, delayMs: 300 })
 */
export async function importAllBirdImages(opts: { limit?: number; delayMs?: number } = {}): Promise<ImportResult> {
  const { limit = 5, delayMs = 300 } = opts;
  const totals: ImportResult = { source: "GBIF images (batch)", inserted: 0, updated: 0, skipped: 0, errors: [] };
  const db = getDb();

  // find birds with no images
  const candidates = await db
    .selectDistinct({ id: birds.id, scientificName: birds.scientificName })
    .from(birds)
    .leftJoin(birdImages, eq(birdImages.birdId, birds.id))
    .where(eq(birds.status, "draft"));

  console.log(`GBIF image import: ${candidates.length} birds with no images`);

  for (const bird of candidates) {
    const gbifKey = await lookupGbifKey(bird.scientificName);
    if (!gbifKey) { totals.skipped++; continue; }

    // persist gbifId for future use
    await db
      .insert(birdDetails)
      .values({ birdId: bird.id, gbifId: String(gbifKey) })
      .onConflictDoUpdate({ target: birdDetails.birdId, set: { gbifId: String(gbifKey) } });

    const r = await importBirdImages(bird.id, gbifKey, limit);
    totals.inserted += r.inserted;
    totals.updated += r.updated;
    totals.skipped += r.skipped;
    totals.errors.push(...r.errors);

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return totals;
}
