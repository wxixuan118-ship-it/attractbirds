/**
 * Data for "{group} in {state}" pages, built from the per-family eBird
 * occurrence files written by scripts/fetch-state-groups.mjs.
 *
 * Everything numeric on those pages comes from one dataset:
 * EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF (CC BY 4.0).
 */
import arizona from "../data/occurrences/groups/arizona.json";
import california from "../data/occurrences/groups/california.json";
import colorado from "../data/occurrences/groups/colorado.json";
import florida from "../data/occurrences/groups/florida.json";
import michigan from "../data/occurrences/groups/michigan.json";
import oregon from "../data/occurrences/groups/oregon.json";
import rhodeIsland from "../data/occurrences/groups/rhode-island.json";
import tennessee from "../data/occurrences/groups/tennessee.json";
import texas from "../data/occurrences/groups/texas.json";
import groupImages from "../data/group-images.json";
import { BIRD_GROUPS, BIRD_GROUP_BY_SLUG, speciesInGroup, type BirdGroup } from "../data/bird-groups";
import { birdWhitelist } from "../data/bird-whitelist";
import { classifyPresence, relativeByMonth, activeMonths, MONTH_NAMES, PRESENCE_LABEL, type OccurrenceBird, type Presence } from "./occurrence-data";

type FamilySpecies = { slug: string | null; commonName: string; scientificName: string; gbifTaxonKey: number | null; total: number; months: number[] | null; share: number[] | null };
type GroupFile = {
  state: string;
  stateName: string;
  source: { name: string; publisher: string; distributor: string; datasetKey: string; url: string; license: string; licenseUrl: string };
  years: string;
  minRecords: number;
  retrievedAt: string;
  totalRecords: number;
  totalByMonth: number[];
  families: Record<string, { records: number; species: FamilySpecies[] }>;
};

const FILES: Record<string, GroupFile> = {
  arizona: arizona as GroupFile,
  california: california as GroupFile,
  colorado: colorado as GroupFile,
  florida: florida as GroupFile,
  michigan: michigan as GroupFile,
  oregon: oregon as GroupFile,
  "rhode-island": rhodeIsland as GroupFile,
  tennessee: tennessee as GroupFile,
  texas: texas as GroupFile,
};

/** GBIF's backbone lumps or renames a few North American species; show the eBird/AOS name. */
const NAME_FIXES: Record<string, string> = {
  "Hen Harrier": "Northern Harrier",
  "Eurasian Teal": "Green-winged Teal",
  "Common Teal": "Green-winged Teal",
  "Western Cattle Egret": "Cattle Egret",
};

export type GroupImage = { species: string; src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string; title: string };
const IMAGES: Record<string, GroupImage> = groupImages as Record<string, GroupImage>;

export type GroupSpecies = OccurrenceBird & {
  presence: Presence;
  abundance: "abundant" | "common" | "uncommon" | "rare";
  statusLabel: string;
  activeMonths: string[];
  peakMonth: string;
  /** First month (name) the species crosses 30% of its own peak, for non-residents. */
  arrives?: string;
  departs?: string;
  /** Share of all state eBird records, in percent, one decimal. */
  sharePct: string;
  href: string | null;
};

export type GroupPageData = {
  state: string;
  stateName: string;
  group: BirdGroup;
  species: GroupSpecies[];
  totalGroupRecords: number;
  totalRecords: number;
  years: string;
  yearsLabel: string;
  minRecords: number;
  retrievedAt: string;
  /** Months ranked by the group's combined share of state records. */
  bestMonths: string[];
  quietMonths: string[];
  residents: GroupSpecies[];
  seasonal: GroupSpecies[];
  image?: GroupImage;
  source: GroupFile["source"];
  /** Other groups with at least one species in this state, for cross-links. */
  otherGroups: { slug: string; name: string; count: number }[];
  /** Other states with a page for this group, most species first. */
  otherStates: { slug: string; name: string; count: number; top?: { commonName: string; total: number; slug: string | null } }[];
  /** Species recorded too rarely to be regular — the honest answer when `species` is empty. */
  vagrants: { commonName: string; scientificName: string; total: number }[];
};

export function getGroupStates(): string[] {
  return Object.keys(FILES);
}

const whitelistSlugs = new Set(birdWhitelist.map((b) => b.slug));

function toGroupSpecies(stateSlug: string, s: FamilySpecies, totalRecords: number): GroupSpecies {
  const commonName = NAME_FIXES[s.commonName] ?? s.commonName;
  const bird: OccurrenceBird = { slug: s.slug, commonName, scientificName: s.scientificName, gbifTaxonKey: s.gbifTaxonKey ?? 0, reportRank: null, whitelisted: Boolean(s.slug && whitelistSlugs.has(s.slug)), total: s.total, months: s.months ?? [], share: s.share ?? [] };
  const { presence, abundance } = classifyPresence(bird, totalRecords);
  const rel = relativeByMonth(bird);
  const active = activeMonths(bird);
  const peakMonth = MONTH_NAMES[rel.indexOf(Math.max(...rel))];
  let arrives: string | undefined;
  let departs: string | undefined;
  if (presence !== "resident" && presence !== "absent") {
    for (let m = 0; m < 12; m++) {
      const prev = (m + 11) % 12;
      if (rel[m] >= 0.3 && rel[prev] < 0.3 && !arrives) arrives = MONTH_NAMES[m];
      const next = (m + 1) % 12;
      if (rel[m] >= 0.3 && rel[next] < 0.3) departs = MONTH_NAMES[m];
    }
  }
  const href = !s.slug ? null : bird.whitelisted ? `/birds-by-location/${stateSlug}/${s.slug}` : `/birds/${s.slug}`;
  return { ...bird, presence, abundance, statusLabel: PRESENCE_LABEL[presence], activeMonths: active, peakMonth, arrives, departs, sharePct: (100 * s.total / totalRecords).toFixed(s.total / totalRecords >= 0.001 ? 1 : 2), href };
}

function groupSpeciesFor(file: GroupFile, group: BirdGroup): GroupSpecies[] {
  const out: GroupSpecies[] = [];
  for (const family of group.families) {
    const fam = file.families[family];
    if (!fam) continue;
    for (const s of fam.species) {
      const commonName = NAME_FIXES[s.commonName] ?? s.commonName;
      if (!speciesInGroup(group, family, commonName) || !s.months) continue;
      out.push(toGroupSpecies(file.state, s, file.totalRecords));
    }
  }
  // Drop birds with no regular presence; they are vagrants for this state.
  return out.filter((s) => s.presence !== "absent").sort((a, b) => b.total - a.total);
}

/** Species of the group recorded in the state but too rarely to count as regular (below the fetch threshold or classified absent). */
function groupVagrantsFor(file: GroupFile, group: BirdGroup): { commonName: string; scientificName: string; total: number }[] {
  const regular = new Set(groupSpeciesFor(file, group).map((s) => s.commonName));
  const out: { commonName: string; scientificName: string; total: number }[] = [];
  for (const family of group.families) {
    const fam = file.families[family];
    if (!fam) continue;
    for (const s of fam.species) {
      const commonName = NAME_FIXES[s.commonName] ?? s.commonName;
      if (!speciesInGroup(group, family, commonName) || regular.has(commonName)) continue;
      out.push({ commonName, scientificName: s.scientificName, total: s.total });
    }
  }
  return out.sort((a, b) => b.total - a.total);
}

export function getGroupPageData(stateSlug: string, groupSlug: string): GroupPageData | undefined {
  const file = FILES[stateSlug];
  const group = BIRD_GROUP_BY_SLUG[groupSlug];
  if (!file || !group) return undefined;
  const species = groupSpeciesFor(file, group);
  const vagrants = groupVagrantsFor(file, group);
  if (species.length === 0 && vagrants.length === 0 && Object.keys(file.families).length === 0) return undefined;

  const combined = Array.from({ length: 12 }, (_, m) => species.reduce((sum, s) => sum + s.share[m], 0));
  const ranked = combined.map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
  const top = species[0];
  const image = top?.slug ? IMAGES[top.slug] : undefined;

  const otherGroups = BIRD_GROUPS.filter((g) => g.slug !== groupSlug)
    .map((g) => ({ slug: g.slug, name: g.name, count: groupSpeciesFor(file, g).length }))
    .filter((g) => g.count > 0);
  const otherStates = Object.values(FILES).filter((f) => f.state !== stateSlug)
    .map((f) => { const sp = groupSpeciesFor(f, group); return { slug: f.state, name: f.stateName, count: sp.length, top: sp[0] ? { commonName: sp[0].commonName, total: sp[0].total, slug: sp[0].slug } : undefined }; })
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  return {
    state: file.state,
    stateName: file.stateName,
    group,
    species,
    totalGroupRecords: species.reduce((n, s) => n + s.total, 0),
    totalRecords: file.totalRecords,
    years: file.years,
    yearsLabel: file.years.replace(",", "–"),
    minRecords: file.minRecords,
    retrievedAt: file.retrievedAt,
    bestMonths: ranked.slice(0, 3).map(({ i }) => MONTH_NAMES[i]),
    quietMonths: ranked.slice(-2).map(({ i }) => MONTH_NAMES[i]).reverse(),
    residents: species.filter((s) => s.presence === "resident"),
    seasonal: species.filter((s) => s.presence !== "resident"),
    vagrants,
    // Fall back to any listed species with a photo, then to the group's leading species in the nearest covered state.
    image: image ?? species.map((s) => (s.slug ? IMAGES[s.slug] : undefined)).find(Boolean) ?? otherStates.map((s) => (s.top?.slug ? IMAGES[s.top.slug] : undefined)).find(Boolean),
    source: file.source,
    otherGroups,
    otherStates,
  };
}

/** Every (state, group) pair that has at least one regularly occurring species. */
export function getGroupStaticParams(): { state: string; slug: string }[] {
  const params: { state: string; slug: string }[] = [];
  for (const file of Object.values(FILES)) {
    if (Object.keys(file.families).length === 0) continue;
    for (const group of BIRD_GROUPS) params.push({ state: file.state, slug: group.slug });
  }
  return params;
}

export function isGroupSlug(slug: string): boolean {
  return Boolean(BIRD_GROUP_BY_SLUG[slug]);
}

/** Top species per (state, group) — used by the image-fetch script to know which photos are needed. */
export function getGroupTopSpecies(): { state: string; group: string; slug: string; commonName: string; scientificName: string }[] {
  const out: { state: string; group: string; slug: string; commonName: string; scientificName: string }[] = [];
  for (const file of Object.values(FILES)) {
    for (const group of BIRD_GROUPS) {
      const species = groupSpeciesFor(file, group);
      const top = species.find((s) => s.slug);
      if (top && top.slug) out.push({ state: file.state, group: group.slug, slug: top.slug, commonName: top.commonName, scientificName: top.scientificName });
    }
  }
  return out;
}
