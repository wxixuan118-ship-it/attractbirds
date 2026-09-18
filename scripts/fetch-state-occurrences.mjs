#!/usr/bin/env node
/**
 * Fetch monthly eBird occurrence counts for one U.S. state from GBIF and write
 * them to data/occurrences/<state>.json so the site can serve real, cited
 * numbers without a database.
 *
 * Source: EOD – eBird Observation Dataset (Cornell Lab of Ornithology),
 * distributed by GBIF under CC BY 4.0. No API key required.
 *
 *   node scripts/fetch-state-occurrences.mjs florida
 *   node scripts/fetch-state-occurrences.mjs florida --years 2020,2024 --top 60
 *
 * Output per species: raw record counts per month, plus `share` — the share of
 * all eBird records in the state that month that belong to this species. Share
 * is what the pages use to rank and to describe seasonality, because raw counts
 * mostly track how many people are birding in a given month.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const API = "https://api.gbif.org/v1";
const EOD_DATASET_KEY = "4fa7b334-ce0d-4e88-aaae-2e0c138d049e";
const UA = "AttractBirds.app/0.1 (data import; https://attractbirds.app)";

const args = process.argv.slice(2);
const stateSlug = args.find((a) => !a.startsWith("--"));
if (!stateSlug) { console.error("usage: fetch-state-occurrences.mjs <state-slug> [--years 2020,2024] [--top 60]"); process.exit(1); }
const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback; };
const years = opt("years", "2020,2024");
const top = Number(opt("top", "60"));

const { US_STATES_DATA } = await import("../data/us-states-data.ts");
const { birdWhitelist } = await import("../data/bird-whitelist.ts");
const { birdCatalog } = await import("../data/bird-catalog.ts");
const state = US_STATES_DATA.find((s) => s.slug === stateSlug);
if (!state) { console.error(`unknown state ${stateSlug}`); process.exit(1); }

async function gbif(pathname, params) {
  const url = new URL(`${API}${pathname}`);
  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) v.forEach((x) => url.searchParams.append(k, x));
    else url.searchParams.set(k, v);
  }
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return res.json();
    if (res.status >= 500 || res.status === 429) { await new Promise((r) => setTimeout(r, 1500 * (attempt + 1))); continue; }
    throw new Error(`GBIF ${pathname}: ${res.status}`);
  }
  throw new Error(`GBIF ${pathname}: retries exhausted`);
}

const base = { datasetKey: EOD_DATASET_KEY, country: "US", stateProvince: state.name, year: years, limit: "0" };
const monthCounts = (facets) => {
  const f = facets?.find((x) => x.field.toLowerCase() === "month");
  return Array.from({ length: 12 }, (_, i) => f?.counts.find((c) => Number(c.name) === i + 1)?.count ?? 0);
};

console.error(`Fetching ${state.name} totals…`);
const totals = await gbif("/occurrence/search", { ...base, facet: ["month", "speciesKey"], facetLimit: String(Math.max(20, top * 2)) });
const totalByMonth = monthCounts(totals.facets);
const topSpeciesKeys = (totals.facets.find((x) => x.field.toLowerCase().replace("_", "") === "specieskey")?.counts ?? []).map((c) => ({ key: Number(c.name), count: c.count }));

// Resolve the most-reported species to catalog entries by scientific name.
const catalogByName = new Map(birdCatalog.map((b) => [b.scientificName.toLowerCase(), b]));
const whitelistBySlug = new Map(birdWhitelist.map((b) => [b.slug, b]));
const species = new Map(); // slug -> { slug, commonName, scientificName, gbifTaxonKey, rank }

let rank = 0;
for (const { key } of topSpeciesKeys) {
  if (species.size >= top) break;
  const taxon = await gbif(`/species/${key}`, {});
  const canonical = String(taxon.canonicalName ?? taxon.scientificName ?? "").toLowerCase();
  const cat = catalogByName.get(canonical);
  rank++;
  if (cat) { species.set(cat.slug, { slug: cat.slug, commonName: cat.commonName, scientificName: cat.scientificName, gbifTaxonKey: key, reportRank: rank }); continue; }
  // Not in our 1,000-species catalog (no profile page yet): keep it, unlinked, under its English vernacular name.
  const names = await gbif(`/species/${key}/vernacularNames`, { limit: "50" });
  // Prefer the eBird/Clements name (what birders in the U.S. actually use), then ITIS, then IOC.
  const englishNames = names.results?.filter((r) => r.language === "eng" && !/\(/.test(r.vernacularName)) ?? [];
  const eng = ["The Clements Checklist", "Integrated Taxonomic Information System", "IOC World Bird List"].map((src) => englishNames.find((r) => (r.source ?? "").startsWith(src))).find(Boolean) ?? englishNames[0];
  if (!eng) { console.error(`  skip ${taxon.canonicalName} (no English name)`); rank--; continue; }
  species.set(`gbif-${key}`, { slug: null, commonName: eng.vernacularName, scientificName: taxon.canonicalName, gbifTaxonKey: key, reportRank: rank });
}

// Always include the backyard whitelist so every Bird×State page has monthly data.
for (const item of birdWhitelist) {
  if (species.has(item.slug)) continue;
  const match = await gbif("/species/match", { name: item.scientificName, kingdom: "Animalia", class: "Aves" });
  if (match.matchType !== "EXACT" || (match.confidence ?? 0) < 90) { console.error(`  no exact match for ${item.scientificName}`); continue; }
  species.set(item.slug, { slug: item.slug, commonName: item.commonName, scientificName: item.scientificName, gbifTaxonKey: match.usageKey, reportRank: null });
}

// eBird has adopted names the GBIF backbone does not yet carry; those records
// only match at genus level, so query them by the verbatim name eBird publishes.
const VERBATIM_NAME_FALLBACKS = { "Accipiter cooperii": "Astur cooperii" };

const birds = [];
let n = 0;
for (const sp of species.values()) {
  n++;
  let data = await gbif("/occurrence/search", { ...base, taxonKey: String(sp.gbifTaxonKey), facet: "month", facetLimit: "20" });
  const verbatim = VERBATIM_NAME_FALLBACKS[sp.scientificName];
  if (data.count === 0 && verbatim) data = await gbif("/occurrence/search", { ...base, verbatimScientificName: verbatim, facet: "month", facetLimit: "20" });
  const months = monthCounts(data.facets);
  const share = months.map((c, i) => (totalByMonth[i] > 0 ? c / totalByMonth[i] : 0));
  birds.push({ ...sp, whitelisted: sp.slug ? whitelistBySlug.has(sp.slug) : false, total: data.count, months, share });
  console.error(`  ${String(n).padStart(3)}/${species.size} ${sp.commonName}: ${data.count}`);
}
birds.sort((a, b) => b.total - a.total);

const out = {
  state: state.slug,
  stateName: state.name,
  source: {
    name: "EOD – eBird Observation Dataset",
    publisher: "Cornell Lab of Ornithology",
    distributor: "GBIF.org",
    datasetKey: EOD_DATASET_KEY,
    url: `https://www.gbif.org/dataset/${EOD_DATASET_KEY}`,
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    query: `occurrence/search?datasetKey=${EOD_DATASET_KEY}&country=US&stateProvince=${encodeURIComponent(state.name)}&year=${years}`,
  },
  years,
  retrievedAt: new Date().toISOString().slice(0, 10),
  totalRecords: totals.count,
  totalByMonth,
  birds,
};

const outDir = path.resolve("data/occurrences");
await mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, `${state.slug}.json`);
await writeFile(outPath, JSON.stringify(out, null, 1) + "\n");
console.error(`Wrote ${outPath}: ${birds.length} species, ${totals.count.toLocaleString()} records`);
