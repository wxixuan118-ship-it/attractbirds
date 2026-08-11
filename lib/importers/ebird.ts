/**
 * eBird API v2 importer
 *
 * Docs:   https://documenter.getpostman.com/view/664302/S1ENwy59
 * Auth:   X-eBirdApiToken header — free key at https://ebird.org/api/keygen
 *
 * Seeds:  birds, bird_details           (from /ref/taxonomy/ebird)
 *         bird_occurrences              (from /product/spplist/{regionCode})
 */

import { eq, sql } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { birds, birdDetails, birdOccurrences, locations, sources } from "../../db/schema.js";
import type { EBirdTaxon, EBirdRegionSpecies, ImportResult } from "./types.js";

const BASE = "https://api.ebird.org/v2";

// ─── US states that have eBird region codes ───────────────────────────────────
export const US_STATES: Array<{ code: string; name: string; slug: string }> = [
  { code: "US-AL", name: "Alabama",       slug: "alabama" },
  { code: "US-AK", name: "Alaska",        slug: "alaska" },
  { code: "US-AZ", name: "Arizona",       slug: "arizona" },
  { code: "US-AR", name: "Arkansas",      slug: "arkansas" },
  { code: "US-CA", name: "California",    slug: "california" },
  { code: "US-CO", name: "Colorado",      slug: "colorado" },
  { code: "US-CT", name: "Connecticut",   slug: "connecticut" },
  { code: "US-DE", name: "Delaware",      slug: "delaware" },
  { code: "US-FL", name: "Florida",       slug: "florida" },
  { code: "US-GA", name: "Georgia",       slug: "georgia" },
  { code: "US-HI", name: "Hawaii",        slug: "hawaii" },
  { code: "US-ID", name: "Idaho",         slug: "idaho" },
  { code: "US-IL", name: "Illinois",      slug: "illinois" },
  { code: "US-IN", name: "Indiana",       slug: "indiana" },
  { code: "US-IA", name: "Iowa",          slug: "iowa" },
  { code: "US-KS", name: "Kansas",        slug: "kansas" },
  { code: "US-KY", name: "Kentucky",      slug: "kentucky" },
  { code: "US-LA", name: "Louisiana",     slug: "louisiana" },
  { code: "US-ME", name: "Maine",         slug: "maine" },
  { code: "US-MD", name: "Maryland",      slug: "maryland" },
  { code: "US-MA", name: "Massachusetts", slug: "massachusetts" },
  { code: "US-MI", name: "Michigan",      slug: "michigan" },
  { code: "US-MN", name: "Minnesota",     slug: "minnesota" },
  { code: "US-MS", name: "Mississippi",   slug: "mississippi" },
  { code: "US-MO", name: "Missouri",      slug: "missouri" },
  { code: "US-MT", name: "Montana",       slug: "montana" },
  { code: "US-NE", name: "Nebraska",      slug: "nebraska" },
  { code: "US-NV", name: "Nevada",        slug: "nevada" },
  { code: "US-NH", name: "New Hampshire", slug: "new-hampshire" },
  { code: "US-NJ", name: "New Jersey",    slug: "new-jersey" },
  { code: "US-NM", name: "New Mexico",    slug: "new-mexico" },
  { code: "US-NY", name: "New York",      slug: "new-york" },
  { code: "US-NC", name: "North Carolina",slug: "north-carolina" },
  { code: "US-ND", name: "North Dakota",  slug: "north-dakota" },
  { code: "US-OH", name: "Ohio",          slug: "ohio" },
  { code: "US-OK", name: "Oklahoma",      slug: "oklahoma" },
  { code: "US-OR", name: "Oregon",        slug: "oregon" },
  { code: "US-PA", name: "Pennsylvania",  slug: "pennsylvania" },
  { code: "US-RI", name: "Rhode Island",  slug: "rhode-island" },
  { code: "US-SC", name: "South Carolina",slug: "south-carolina" },
  { code: "US-SD", name: "South Dakota",  slug: "south-dakota" },
  { code: "US-TN", name: "Tennessee",     slug: "tennessee" },
  { code: "US-TX", name: "Texas",         slug: "texas" },
  { code: "US-UT", name: "Utah",          slug: "utah" },
  { code: "US-VT", name: "Vermont",       slug: "vermont" },
  { code: "US-VA", name: "Virginia",      slug: "virginia" },
  { code: "US-WA", name: "Washington",    slug: "washington" },
  { code: "US-WV", name: "West Virginia", slug: "west-virginia" },
  { code: "US-WI", name: "Wisconsin",     slug: "wisconsin" },
  { code: "US-WY", name: "Wyoming",       slug: "wyoming" },
];

// ─── API helpers ──────────────────────────────────────────────────────────────

function headers(apiKey: string) {
  return { "X-eBirdApiToken": apiKey };
}

async function ebirdGet<T>(path: string, apiKey: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: headers(apiKey) });
  if (!res.ok) throw new Error(`eBird ${path} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// slugify "American Robin" → "american-robin"
function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// minimal placeholder summary — enrich later with AI
function templateSummary(taxon: EBirdTaxon): string {
  return `${taxon.comName} (${taxon.sciName}) is a member of the ${taxon.familyComName} family (${taxon.familySciName}), in the order ${taxon.order}. Found across North America.`;
}

// ─── Taxonomy import ──────────────────────────────────────────────────────────

/**
 * Fetches the full eBird taxonomy and upserts into `birds` + `bird_details`.
 * Skips non-species categories (hybrids, spuh, etc).
 * Marks all records as status='draft', indexable=false until enriched.
 */
export async function importTaxonomy(apiKey: string): Promise<ImportResult> {
  const result: ImportResult = { source: "eBird taxonomy", inserted: 0, updated: 0, skipped: 0, errors: [] };
  const db = getDb();

  console.log("Fetching eBird taxonomy…");
  const taxa = await ebirdGet<EBirdTaxon[]>("/ref/taxonomy/ebird?fmt=json", apiKey);
  console.log(`  ${taxa.length} taxa received`);

  // ensure source record exists
  const [src] = await db
    .insert(sources)
    .values({
      organization: "Cornell Lab of Ornithology — eBird",
      sourceUrl: "https://ebird.org/science/use-ebird-data/the-ebird-taxonomy",
      datasetIdentifier: "ebird-taxonomy",
      license: "CC BY",
      attribution: "eBird Basic Dataset. Version: EBD_relNov-2024. Cornell Lab of Ornithology, Ithaca, New York.",
      allowedFields: ["common_name", "scientific_name", "taxonomy_order", "taxonomy_family", "species_code"],
    })
    .onConflictDoNothing()
    .returning({ id: sources.id });
  const sourceId = src?.id;

  const speciesOnly = taxa.filter((t) => t.category === "species");
  console.log(`  ${speciesOnly.length} true species to import`);

  const BATCH = 100;
  for (let i = 0; i < speciesOnly.length; i += BATCH) {
    const batch = speciesOnly.slice(i, i + BATCH);

    for (const taxon of batch) {
      const slug = toSlug(taxon.comName);
      try {
        const [existing] = await db
          .select({ id: birds.id })
          .from(birds)
          .where(eq(birds.scientificName, taxon.sciName))
          .limit(1);

        if (existing) {
          // update taxonomy fields if they changed
          await db
            .update(birds)
            .set({ taxonomyOrder: taxon.order, taxonomyFamily: taxon.familySciName, updatedAt: new Date() })
            .where(eq(birds.id, existing.id));
          await db
            .insert(birdDetails)
            .values({ birdId: existing.id, speciesCode: taxon.speciesCode, taxonomyClass: "Aves" })
            .onConflictDoNothing();
          result.updated++;
        } else {
          const [inserted] = await db
            .insert(birds)
            .values({
              slug,
              commonName: taxon.comName,
              scientificName: taxon.sciName,
              taxonomyOrder: taxon.order,
              taxonomyFamily: taxon.familySciName,
              summary: templateSummary(taxon),
              status: "draft",
              indexable: false,
              sourceCount: 1,
            })
            .onConflictDoUpdate({
              target: birds.slug,
              set: { commonName: taxon.comName, taxonomyOrder: taxon.order, updatedAt: new Date() },
            })
            .returning({ id: birds.id });

          if (inserted) {
            await db
              .insert(birdDetails)
              .values({ birdId: inserted.id, speciesCode: taxon.speciesCode, taxonomyClass: "Aves" })
              .onConflictDoNothing();
            result.inserted++;
          }
        }
      } catch (e) {
        result.errors.push(`${taxon.sciName}: ${String(e)}`);
      }
    }

    if (i % 500 === 0) console.log(`  ${i + BATCH}/${speciesOnly.length} processed…`);
  }

  void sourceId; // used for future attribution joins
  return result;
}

// ─── Location seed ────────────────────────────────────────────────────────────

/** Upserts all 50 US states into the `locations` table. */
export async function seedUSStates(): Promise<void> {
  const db = getDb();
  for (const state of US_STATES) {
    await db
      .insert(locations)
      .values({ slug: state.slug, type: "state", name: state.name, status: "published", indexable: true })
      .onConflictDoNothing();
  }
  console.log(`Seeded ${US_STATES.length} US states`);
}

// ─── Occurrence import ────────────────────────────────────────────────────────

/**
 * For a single US state, fetches all species ever recorded via eBird
 * and writes one `bird_occurrences` row per species (season="all", presence="resident").
 * Run this per-state to avoid hammering the API.
 */
export async function importStateOccurrences(
  apiKey: string,
  regionCode: string,
  locationId: string,
): Promise<ImportResult> {
  const result: ImportResult = { source: `eBird occurrences ${regionCode}`, inserted: 0, updated: 0, skipped: 0, errors: [] };
  const db = getDb();

  console.log(`Fetching species list for ${regionCode}…`);
  let speciesCodes: string[];
  try {
    speciesCodes = await ebirdGet<string[]>(`/product/spplist/${regionCode}`, apiKey);
  } catch (e) {
    result.errors.push(String(e));
    return result;
  }
  console.log(`  ${speciesCodes.length} species codes received`);

  const [src] = await db
    .insert(sources)
    .values({
      organization: "Cornell Lab of Ornithology — eBird",
      sourceUrl: `https://ebird.org/region/${regionCode}`,
      datasetIdentifier: `ebird-occurrences-${regionCode}`,
      license: "CC BY",
      attribution: "eBird species list data.",
    })
    .onConflictDoNothing()
    .returning({ id: sources.id });

  for (const code of speciesCodes) {
    try {
      const [bird] = await db
        .select({ id: birds.id })
        .from(birds)
        .leftJoin(birdDetails, eq(birdDetails.birdId, birds.id))
        .where(eq(sql`${birdDetails}.species_code`, code))
        .limit(1);

      if (!bird) { result.skipped++; continue; }

      await db
        .insert(birdOccurrences)
        .values({
          birdId: bird.id,
          locationId,
          season: "all",
          presence: "resident",
          confidence: 0.8,
          sourceId: src?.id,
        })
        .onConflictDoNothing();
      result.inserted++;
    } catch (e) {
      result.errors.push(`${code}: ${String(e)}`);
    }
  }

  return result;
}
