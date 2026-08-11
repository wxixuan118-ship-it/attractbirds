/**
 * Location data repository — dual-mode (PostgreSQL / static fallback).
 *
 * Mirrors the bird-repository.ts pattern: when DATABASE_URL is set and
 * PostgreSQL is reachable, queries real bird_occurrence_stats / locations
 * tables. Otherwise falls back to curated static data so the site always
 * renders with useful content.
 */

import { US_STATES_DATA, BACKYARD_BIRDS_BY_STATE, BACKYARD_BIRDS_BY_REGION, STATE_BY_SLUG, type USState } from "../data/us-states-data";
import { birdWhitelist } from "../data/bird-whitelist";
import { pilotBirds } from "../data/pilot-birds";

// ─── Types ──────────────────────────────────────────────────────

export type StateBirdEntry = {
  slug: string;
  commonName: string;
  scientificName: string;
  family: string;
  initials: string;
  colors: string;
  size: string;
  habitat: string;
  residentStatus: string;
  summary: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  imageAttribution?: string | null;
  imageSourceUrl?: string | null;
  imageLicenseUrl?: string | null;
  qualityScore: number;
  sourceCount: number;
  // location-specific
  seasonalStatus?: string;
  frequencyScore?: number;
  bestMonths?: string[];
};

export type StatePageData = {
  state: USState;
  commonBirds: StateBirdEntry[];
  backyardBirds: StateBirdEntry[];
  totalSpecies: number;
  // monthly data for calendar section
  monthlyHighlights: { month: string; slug: string; birds: { slug: string; name: string }[] }[];
};

// ─── Helpers ────────────────────────────────────────────────────

const shouldUseDatabase = () => Boolean(process.env.DATABASE_URL) && process.env.ATTRACTBIRDS_STATIC_ONLY !== "1";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SLUGS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** Build a StateBirdEntry from a bird whitelist item (static fallback). */
function birdFromWhitelist(slug: string): StateBirdEntry | undefined {
  const item = birdWhitelist.find((b) => b.slug === slug);
  if (!item) return undefined;
  const pilot = pilotBirds.find((p) => p.slug === slug);
  const initials = item.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
  return {
    slug: item.slug,
    commonName: item.commonName,
    scientificName: item.scientificName,
    family: pilot?.family ?? "Taxonomy pending",
    initials,
    colors: pilot?.colors.join(", ") ?? "Varies",
    size: pilot ? `${pilot.size[0]}–${pilot.size[1]} cm` : "See profile",
    habitat: pilot?.habitats.join(", ") ?? "Varies",
    residentStatus: pilot?.residentStatus ?? "Distribution varies",
    summary: pilot?.summary ?? `${item.commonName} is a North American backyard bird.`,
    qualityScore: pilot ? 85 : 0,
    sourceCount: pilot ? 1 : 0,
  };
}

function birdFromPilot(item: (typeof pilotBirds)[number]): StateBirdEntry {
  const initials = item.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
  return {
    slug: item.slug,
    commonName: item.commonName,
    scientificName: item.scientificName,
    family: item.family,
    initials,
    colors: item.colors.join(", "),
    size: `${item.size[0]}–${item.size[1]} cm`,
    habitat: item.habitats.join(", "),
    residentStatus: item.residentStatus,
    summary: item.summary,
    qualityScore: 85,
    sourceCount: 1,
  };
}

// ─── Static (fallback) data ─────────────────────────────────────

const fallbackBirds = pilotBirds.map(birdFromPilot);
const fallbackWhitelistBirds = birdWhitelist.map((item) => {
  const reviewed = fallbackBirds.find((b) => b.slug === item.slug);
  return reviewed ?? birdFromWhitelist(item.slug)!;
});

/** Get the fallback bird list for a state, filtered by region/backyard overrides. */
function getFallbackStateBirds(stateSlug: string): StateBirdEntry[] {
  // Return all birds, but put backyard/common ones first
  const backyardSlugs = BACKYARD_BIRDS_BY_STATE[stateSlug] ?? BACKYARD_BIRDS_BY_REGION[STATE_BY_SLUG[stateSlug].region] ?? [];
  const backyardSet = new Set(backyardSlugs);
  const backyard = backyardSlugs.map((slug) => birdFromWhitelist(slug)).filter(Boolean) as StateBirdEntry[];
  const rest = fallbackWhitelistBirds.filter((b) => !backyardSet.has(b.slug));
  return [...backyard, ...rest].slice(0, 24);
}

function getFallbackBackyardBirds(stateSlug: string): StateBirdEntry[] {
  const slugs = BACKYARD_BIRDS_BY_STATE[stateSlug] ?? BACKYARD_BIRDS_BY_REGION[STATE_BY_SLUG[stateSlug].region] ?? [];
  return slugs.map((slug) => birdFromWhitelist(slug)).filter(Boolean) as StateBirdEntry[];
}

function getFallbackMonthlyHighlights(_stateSlug: string): { month: string; slug: string; birds: { slug: string; name: string }[] }[] {
  // Generic seasonal highlights
  return [
    { month: "January", slug: "january", birds: [{ slug: "northern-cardinal", name: "Northern Cardinal" }, { slug: "dark-eyed-junco", name: "Dark-eyed Junco" }] },
    { month: "April", slug: "april", birds: [{ slug: "ruby-throated-hummingbird", name: "Ruby-throated Hummingbird" }, { slug: "american-robin", name: "American Robin" }] },
    { month: "May", slug: "may", birds: [{ slug: "american-goldfinch", name: "American Goldfinch" }, { slug: "blue-jay", name: "Blue Jay" }] },
    { month: "September", slug: "september", birds: [{ slug: "ruby-throated-hummingbird", name: "Ruby-throated Hummingbird" }, { slug: "american-robin", name: "American Robin" }] },
    { month: "October", slug: "october", birds: [{ slug: "dark-eyed-junco", name: "Dark-eyed Junco" }, { slug: "white-throated-sparrow", name: "White-throated Sparrow" }] },
  ];
}

// ─── Public API ─────────────────────────────────────────────────

export function getStateStaticParams() {
  return US_STATES_DATA.map((s) => ({ state: s.slug }));
}

export function getAllStates(): USState[] {
  return US_STATES_DATA;
}

export function getStateBySlug(slug: string): USState | undefined {
  return STATE_BY_SLUG[slug];
}

export async function getStatePageData(stateSlug: string): Promise<StatePageData | undefined> {
  const state = STATE_BY_SLUG[stateSlug];
  if (!state) return undefined;

  if (!shouldUseDatabase()) {
    return {
      state,
      commonBirds: getFallbackStateBirds(stateSlug),
      backyardBirds: getFallbackBackyardBirds(stateSlug),
      totalSpecies: state.speciesCount,
      monthlyHighlights: getFallbackMonthlyHighlights(stateSlug),
    };
  }

  try {
    return await hydrateStatePageData(state);
  } catch (error) {
    console.warn(`PostgreSQL lookup failed for state ${stateSlug}; using static fallback.`, error);
    return {
      state,
      commonBirds: getFallbackStateBirds(stateSlug),
      backyardBirds: getFallbackBackyardBirds(stateSlug),
      totalSpecies: state.speciesCount,
      monthlyHighlights: getFallbackMonthlyHighlights(stateSlug),
    };
  }
}

async function hydrateStatePageData(state: USState): Promise<StatePageData> {
  const [{ getDb }, schema, orm] = await Promise.all([
    import("../db/index"),
    import("../db/schema"),
    import("drizzle-orm"),
  ]);
  const db = getDb();

  // Find the location record for this state
  const [locationRow] = await db
    .select()
    .from(schema.locations)
    .where(orm.and(orm.eq(schema.locations.slug, state.slug), orm.eq(schema.locations.type, "state")))
    .limit(1);

  const locationId = locationRow?.id;

  // Get all published birds
  const birdRows = await db
    .select()
    .from(schema.birds)
    .where(orm.and(orm.eq(schema.birds.status, "published"), orm.eq(schema.birds.indexable, true)))
    .orderBy(orm.asc(schema.birds.commonName));

  let birds: StateBirdEntry[] = [];
  let monthlyHighlights: { month: string; slug: string; birds: { slug: string; name: string }[] }[] = [];

  if (locationId && birdRows.length > 0) {
    // Get monthly occurrence stats for this location
    const statsRows = await db
      .select({
        birdId: schema.birdOccurrenceStats.birdId,
        month: schema.birdOccurrenceStats.month,
        observationCount: schema.birdOccurrenceStats.observationCount,
        frequencyScore: schema.birdOccurrenceStats.frequencyScore,
        seasonalStatus: schema.birdOccurrenceStats.seasonalStatus,
      })
      .from(schema.birdOccurrenceStats)
      .where(orm.eq(schema.birdOccurrenceStats.locationId, locationId));

    // Group stats by bird
    const statsByBird = new Map<string, { months: number[]; totalObservations: number; avgFrequency: number; statuses: Set<string> }>();
    for (const row of statsRows) {
      const birdIdStr = row.birdId;
      const existing = statsByBird.get(birdIdStr) ?? { months: [], totalObservations: 0, avgFrequency: 0, statuses: new Set<string>() };
      existing.months.push(row.month);
      existing.totalObservations += row.observationCount;
      existing.avgFrequency += row.frequencyScore ?? 0;
      if (row.seasonalStatus && row.seasonalStatus !== "not-detected") {
        existing.statuses.add(row.seasonalStatus);
      }
      statsByBird.set(birdIdStr, existing);
    }

    // Get primary images
    const imageRows = await db
      .select({
        birdId: schema.birdImages.birdId,
        thumbnailUrl: schema.birdImages.thumbnailUrl,
        imageUrl: schema.birdImages.imageUrl,
        altText: schema.birdImages.altText,
        attributionText: schema.birdImages.attributionText,
        sourcePageUrl: schema.birdImages.sourcePageUrl,
        licenseUrl: schema.birdImages.licenseUrl,
      })
      .from(schema.birdImages)
      .where(orm.eq(schema.birdImages.isPrimary, true));

    const imageByBird = new Map(imageRows.map((r) => [r.birdId, r]));

    // Build bird entries with location data
    birds = birdRows.map((row) => {
      const stats = statsByBird.get(row.id);
      const image = imageByBird.get(row.id);
      const initials = row.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
      const bestMonths = stats
        ? MONTHS.filter((_, i) => {
            const monthStats = statsRows.filter((s) => s.birdId === row.id && s.month === i + 1);
            return monthStats.length > 0 && (monthStats[0].frequencyScore ?? 0) >= 0.1;
          })
        : [];
      return {
        slug: row.slug,
        commonName: row.commonName,
        scientificName: row.scientificName,
        family: row.taxonomyFamily ?? "Aves",
        initials,
        colors: (row.colors ?? []).join(", "),
        size: row.sizeMinCm && row.sizeMaxCm ? `${row.sizeMinCm}–${row.sizeMaxCm} cm` : "See profile",
        habitat: (row.habitats ?? []).join(", "),
        residentStatus: row.residentStatus ?? "Distribution varies",
        summary: row.summary,
        imageUrl: image?.thumbnailUrl ?? image?.imageUrl ?? null,
        imageAlt: image?.altText ?? null,
        imageAttribution: image?.attributionText ?? null,
        imageSourceUrl: image?.sourcePageUrl ?? null,
        imageLicenseUrl: image?.licenseUrl ?? null,
        qualityScore: row.qualityScore,
        sourceCount: row.sourceCount,
        seasonalStatus: stats ? Array.from(stats.statuses).join(", ") : undefined,
        frequencyScore: stats ? stats.avgFrequency / 12 : undefined,
        bestMonths: bestMonths.length > 0 ? bestMonths : undefined,
      };
    });

    // Sort by frequency (most common first), then alphabetically
    birds.sort((a, b) => {
      const freqA = a.frequencyScore ?? 0;
      const freqB = b.frequencyScore ?? 0;
      if (freqB !== freqA) return freqB - freqA;
      return a.commonName.localeCompare(b.commonName);
    });

    // Build monthly highlights
    for (let i = 0; i < 12; i++) {
      const monthStats = statsRows
        .filter((s) => s.month === i + 1 && (s.frequencyScore ?? 0) >= 0.15)
        .sort((a, b) => (b.frequencyScore ?? 0) - (a.frequencyScore ?? 0))
        .slice(0, 3);
      if (monthStats.length > 0) {
        const monthBirds = monthStats.map((s) => {
          const bird = birdRows.find((b) => b.id === s.birdId);
          return bird ? { slug: bird.slug, name: bird.commonName } : { slug: "", name: "" };
        }).filter((b) => b.slug);
        if (monthBirds.length > 0) {
          monthlyHighlights.push({ month: MONTHS[i], slug: MONTH_SLUGS[i], birds: monthBirds });
        }
      }
    }
  } else {
    // No occurrence data — use all published birds
    birds = birdRows.map((row) => {
      const initials = row.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
      return {
        slug: row.slug,
        commonName: row.commonName,
        scientificName: row.scientificName,
        family: row.taxonomyFamily ?? "Aves",
        initials,
        colors: (row.colors ?? []).join(", "),
        size: row.sizeMinCm && row.sizeMaxCm ? `${row.sizeMinCm}–${row.sizeMaxCm} cm` : "See profile",
        habitat: (row.habitats ?? []).join(", "),
        residentStatus: row.residentStatus ?? "Distribution varies",
        summary: row.summary,
        qualityScore: row.qualityScore,
        sourceCount: row.sourceCount,
      };
    });
  }

  // Merge with fallback if database has fewer birds than the whitelist
  const dbSlugs = new Set(birds.map((b) => b.slug));
  const missing = fallbackWhitelistBirds.filter((b) => !dbSlugs.has(b.slug));
  const allBirds = [...birds, ...missing];

  // Identify backyard birds
  const backyardSlugs = BACKYARD_BIRDS_BY_STATE[state.slug] ?? BACKYARD_BIRDS_BY_REGION[state.region] ?? [];
  const backyardBirds = backyardSlugs
    .map((slug) => allBirds.find((b) => b.slug === slug))
    .filter(Boolean) as StateBirdEntry[];

  // Top common birds (first 24)
  const commonBirds = allBirds.slice(0, 24);

  return {
    state,
    commonBirds,
    backyardBirds,
    totalSpecies: Math.max(state.speciesCount, allBirds.length),
    monthlyHighlights: monthlyHighlights.length > 0 ? monthlyHighlights : getFallbackMonthlyHighlights(state.slug),
  };
}
