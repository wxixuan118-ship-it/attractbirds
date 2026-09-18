#!/usr/bin/env node
/**
 * Fetch monthly eBird occurrence counts for every species of the families
 * behind the "{group} in {state}" pages, for one state, and write them to
 * data/occurrences/groups/<state>.json.
 *
 * Source: EOD – eBird Observation Dataset (Cornell Lab of Ornithology) via
 * GBIF, CC BY 4.0. No API key required.
 *
 *   node --import tsx scripts/fetch-state-groups.mjs florida
 *
 * Unlike fetch-state-occurrences.mjs (top-60 + backyard whitelist), this pulls
 * the complete species list per family so an "owls in Florida" page can list
 * every owl with records, not just the ones in the site whitelist.
 */
import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const API = "https://api.gbif.org/v1";
const EOD_DATASET_KEY = "4fa7b334-ce0d-4e88-aaae-2e0c138d049e";
const UA = "AttractBirds.app/0.1 (data import; https://attractbirds.app)";
const YEARS = "2020,2024";
/** Skip species with fewer records than this — vagrants add noise, not information. */
const MIN_RECORDS = 25;

const stateSlug = process.argv[2];
if (!stateSlug) { console.error("usage: fetch-state-groups.mjs <state-slug>"); process.exit(1); }

const { US_STATES_DATA } = await import("../data/us-states-data.ts");
const { GROUP_FAMILIES } = await import("../data/bird-groups.ts");
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

const base = { datasetKey: EOD_DATASET_KEY, country: "US", stateProvince: state.name, year: YEARS, limit: "0" };
const monthCounts = (facets) => {
  const f = facets?.find((x) => x.field.toLowerCase() === "month");
  return Array.from({ length: 12 }, (_, i) => f?.counts.find((c) => Number(c.name) === i + 1)?.count ?? 0);
};
const facetOf = (facets, name) => facets?.find((x) => x.field.toLowerCase().replace("_", "") === name)?.counts ?? [];

// eBird names the GBIF backbone lacks; records match only at genus level, so query by verbatim name.
const VERBATIM_EXTRAS = {
  Accipitridae: [["Astur cooperii", "Cooper's Hawk"], ["Astur atricapillus", "American Goshawk"]],
};

const catalogByName = new Map(birdCatalog.map((b) => [b.scientificName.toLowerCase(), b]));
const vernacularCache = new Map();
async function englishName(key, fallback) {
  if (vernacularCache.has(key)) return vernacularCache.get(key);
  const names = await gbif(`/species/${key}/vernacularNames`, { limit: "60" });
  const eng = (names.results ?? []).filter((r) => r.language === "eng" && !/\(/.test(r.vernacularName));
  const pick = ["The Clements Checklist", "Integrated Taxonomic Information System", "IOC World Bird List"].map((src) => eng.find((r) => (r.source ?? "").startsWith(src))).find(Boolean) ?? eng[0];
  const name = pick?.vernacularName ?? fallback;
  vernacularCache.set(key, name);
  return name;
}

// Re-runs reuse monthly counts already on disk so only new species cost API calls.
const outDir = path.resolve("data/occurrences/groups");
const outPath = path.join(outDir, `${state.slug}.json`);
let existing = {};
try { existing = JSON.parse(await readFile(outPath, "utf8")); } catch { /* first run */ }
const cached = new Map();
for (const fam of Object.values(existing.families ?? {})) for (const sp of fam.species ?? []) if (sp.months) cached.set(sp.gbifTaxonKey ?? sp.scientificName, sp);

console.error(`Fetching ${state.name} totals…`);
const totals = await gbif("/occurrence/search", { ...base, facet: "month", facetLimit: "20" });
const totalByMonth = monthCounts(totals.facets);

const families = {};
for (const family of GROUP_FAMILIES) {
  const match = await gbif("/species/match", { name: family, rank: "FAMILY", kingdom: "Animalia", class: "Aves" });
  if (!match.usageKey || match.matchType === "NONE") { console.error(`  no family key for ${family}`); continue; }
  const list = await gbif("/occurrence/search", { ...base, taxonKey: String(match.usageKey), facet: "speciesKey", facetLimit: "150" });
  const allKeys = facetOf(list.facets, "specieskey");
  const speciesKeys = allKeys.filter((c) => c.count >= MIN_RECORDS);
  console.error(`  ${family}: ${list.count.toLocaleString()} records, ${speciesKeys.length} species with ≥${MIN_RECORDS}, ${allKeys.length - speciesKeys.length} below`);
  const species = [];
  for (const { name: keyStr, count } of allKeys) {
    const key = Number(keyStr);
    const prior = cached.get(key);
    if (prior && prior.total === count) { species.push(prior); continue; }
    const taxon = await gbif(`/species/${key}`, {});
    const canonical = String(taxon.canonicalName ?? taxon.scientificName ?? "");
    const cat = catalogByName.get(canonical.toLowerCase());
    const commonName = cat?.commonName ?? (await englishName(key, canonical));
    if (count < MIN_RECORDS) {
      // Vagrant / marginal: keep the total so a page can say "only 12 records", skip the monthly call.
      species.push({ slug: cat?.slug ?? null, commonName, scientificName: canonical, gbifTaxonKey: key, total: count, months: null, share: null });
      continue;
    }
    const data = await gbif("/occurrence/search", { ...base, taxonKey: String(key), facet: "month", facetLimit: "20" });
    const months = monthCounts(data.facets);
    species.push({ slug: cat?.slug ?? null, commonName, scientificName: canonical, gbifTaxonKey: key, total: data.count, months, share: months.map((c, i) => (totalByMonth[i] > 0 ? c / totalByMonth[i] : 0)) });
  }
  for (const [verbatim, commonName] of VERBATIM_EXTRAS[family] ?? []) {
    if (species.some((s) => s.commonName === commonName)) continue;
    const prior = cached.get(verbatim);
    if (prior) { species.push(prior); continue; }
    const data = await gbif("/occurrence/search", { ...base, verbatimScientificName: verbatim, facet: "month", facetLimit: "20" });
    if (data.count < MIN_RECORDS) continue;
    const months = monthCounts(data.facets);
    const cat = birdCatalog.find((b) => b.commonName === commonName);
    species.push({ slug: cat?.slug ?? null, commonName, scientificName: verbatim, gbifTaxonKey: null, total: data.count, months, share: months.map((c, i) => (totalByMonth[i] > 0 ? c / totalByMonth[i] : 0)) });
  }
  species.sort((a, b) => b.total - a.total);
  families[family] = { records: list.count, species };
}

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
  },
  years: YEARS,
  minRecords: MIN_RECORDS,
  retrievedAt: new Date().toISOString().slice(0, 10),
  totalRecords: totals.count,
  totalByMonth,
  families,
};

await mkdir(outDir, { recursive: true });
await writeFile(outPath, JSON.stringify(out, null, 1) + "\n");
console.error(`Wrote ${outPath}: ${Object.values(families).reduce((n, f) => n + f.species.length, 0)} species across ${Object.keys(families).length} families`);
