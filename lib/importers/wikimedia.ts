/**
 * Wikimedia Commons importer
 *
 * Docs:  https://www.mediawiki.org/wiki/API:Main_page
 * Auth:  none required
 *
 * Seeds: bird_images  (CC/public-domain images from Commons)
 *
 * Strategy:
 *   1. Query category "Category:{ScientificName}" for image file titles
 *   2. Fetch imageinfo (URL + license metadata) for each file
 *   3. Filter for open licenses and upsert into bird_images
 */

import { getDb } from "../../db/index.js";
import { birdImages, sources } from "../../db/schema.js";
import type { WikimediaQueryResult, ImportResult } from "./types.js";

const API = "https://commons.wikimedia.org/w/api.php";

// Licenses we'll accept from Wikimedia
const ACCEPT_LICENSES = ["cc0", "cc-by", "cc-by-sa", "pd", "public domain", "cc-zero"];

function isAcceptedLicense(license?: string): boolean {
  if (!license) return false;
  const l = license.toLowerCase();
  return ACCEPT_LICENSES.some((ok) => l.includes(ok));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

async function wmGet(params: Record<string, string>): Promise<WikimediaQueryResult> {
  const url = new URL(API);
  const base: Record<string, string> = { action: "query", format: "json", origin: "*" };
  Object.entries({ ...base, ...params }).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: { "User-Agent": "AttractBirds.app/0.1 (https://attractbirds.app)" } });
  if (!res.ok) throw new Error(`Wikimedia API → ${res.status} ${res.statusText}`);
  return res.json() as Promise<WikimediaQueryResult>;
}

// ─── Fetch file titles from a Commons category ────────────────────────────────

async function getCategoryFiles(scientificName: string, limit = 20): Promise<string[]> {
  // Commons categories use underscores, e.g. "Turdus_migratorius"
  const category = `Category:${scientificName.replace(/ /g, "_")}`;
  const result = await wmGet({
    list: "categorymembers",
    cmtitle: category,
    cmtype: "file",
    cmlimit: String(limit),
  });
  return (result.query?.categorymembers ?? []).map((m) => m.title);
}

// ─── Fetch imageinfo for a batch of file titles ───────────────────────────────

async function getImageInfo(titles: string[]): Promise<WikimediaQueryResult> {
  return wmGet({
    prop: "imageinfo",
    titles: titles.join("|"),
    iiprop: "url|extmetadata",
    iiurlwidth: "800",
    iiextmetadatafilter: "License|LicenseShortName|LicenseUrl|Artist|Credit|ImageDescription",
  });
}

// ─── Per-bird image import ────────────────────────────────────────────────────

export async function importWikimediaImages(
  birdId: string,
  scientificName: string,
  limit = 4,
): Promise<ImportResult> {
  const result: ImportResult = { source: "Wikimedia Commons", inserted: 0, updated: 0, skipped: 0, errors: [] };
  const db = getDb();

  let fileTitles: string[];
  try {
    fileTitles = await getCategoryFiles(scientificName, limit * 3);
  } catch (e) {
    result.errors.push(`getCategoryFiles(${scientificName}): ${String(e)}`);
    return result;
  }

  if (fileTitles.length === 0) {
    result.skipped++;
    return result;
  }

  let pages: WikimediaQueryResult;
  try {
    pages = await getImageInfo(fileTitles.slice(0, 20));
  } catch (e) {
    result.errors.push(`getImageInfo: ${String(e)}`);
    return result;
  }

  const [src] = await db
    .insert(sources)
    .values({
      organization: "Wikimedia Commons",
      sourceUrl: `https://commons.wikimedia.org/wiki/Category:${scientificName.replace(/ /g, "_")}`,
      datasetIdentifier: `wikimedia-${scientificName.toLowerCase().replace(/ /g, "-")}`,
      license: "various CC / PD",
      licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia",
      commercialUseAllowed: true,
      attribution: "Wikimedia Commons contributors, licensed under Creative Commons or public domain.",
      allowedFields: ["image_url", "credit", "license", "alt_text"],
    })
    .onConflictDoUpdate({ target: [sources.datasetIdentifier, sources.version], set: { importedAt: new Date() } })
    .returning({ id: sources.id });

  let inserted = 0;
  for (const page of Object.values(pages.query?.pages ?? {})) {
    if (inserted >= limit) break;
    const info = page.imageinfo?.[0];
    if (!info?.url) continue;

    const license = info.extmetadata?.License?.value ?? info.extmetadata?.LicenseUrl?.value ?? "";
    const licenseUrl = info.extmetadata?.LicenseUrl?.value ?? "";
    if (!isAcceptedLicense(license)) { result.skipped++; continue; }

    const artist = info.extmetadata?.Artist?.value
      ? stripHtml(info.extmetadata.Artist.value)
      : "Wikimedia Commons contributor";
    const description = info.extmetadata?.ImageDescription?.value
      ? stripHtml(info.extmetadata.ImageDescription.value).slice(0, 200)
      : `${scientificName} — Wikimedia Commons`;

    // Commons doesn't serve thumbnails at a fixed URL, but you can request one:
    // e.g. https://commons.wikimedia.org/w/thumb.php?f=File.jpg&w=400
    const thumbnailUrl = info.thumburl ?? info.url;

    try {
      await db
        .insert(birdImages)
        .values({
          birdId,
          imageUrl: info.url,
          thumbnailUrl,
          altText: description,
          credit: artist,
          license: license.toUpperCase().replace("CC-", "CC ").replace(/-/g, " "),
          licenseUrl,
          sourcePageUrl: info.descriptionurl,
          attributionText: `${artist} / Wikimedia Commons / ${license}`,
          externalId: `wikimedia:${page.pageid}`,
          wikimediaId: String(page.pageid),
          isPrimary: inserted === 0,
          sourceId: src?.id,
        })
        .onConflictDoUpdate({ target: [birdImages.sourceId, birdImages.externalId], set: { imageUrl: info.url, thumbnailUrl, altText: description, credit: artist, license, licenseUrl, sourcePageUrl: info.descriptionurl, attributionText: `${artist} / Wikimedia Commons / ${license}`, retrievedAt: new Date() } });
      inserted++;
      result.inserted++;
    } catch (e) {
      result.errors.push(`pageid ${page.pageid}: ${String(e)}`);
    }
  }

  return result;
}

// ─── Batch runner ─────────────────────────────────────────────────────────────

import { eq, isNull } from "drizzle-orm";
import { birds } from "../../db/schema.js";

/**
 * Import Wikimedia images for all birds that have no primary image yet.
 */
export async function importAllWikimediaImages(opts: { limit?: number; delayMs?: number } = {}): Promise<ImportResult> {
  const { limit = 4, delayMs = 500 } = opts;
  const totals: ImportResult = { source: "Wikimedia Commons (batch)", inserted: 0, updated: 0, skipped: 0, errors: [] };
  const db = getDb();

  const candidates = await db
    .selectDistinct({ id: birds.id, scientificName: birds.scientificName })
    .from(birds)
    .leftJoin(birdImages, eq(birdImages.birdId, birds.id))
    .where(isNull(birdImages.id));

  console.log(`Wikimedia import: ${candidates.length} birds without primary image`);

  for (const bird of candidates) {
    const r = await importWikimediaImages(bird.id, bird.scientificName, limit);
    totals.inserted += r.inserted;
    totals.skipped += r.skipped;
    totals.errors.push(...r.errors);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return totals;
}
