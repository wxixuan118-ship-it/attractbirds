/**
 * Location data repository — dual-mode (PostgreSQL / static fallback).
 *
 * Mirrors the bird-repository.ts pattern: when DATABASE_URL is set and
 * PostgreSQL is reachable, queries real bird_occurrence_stats / locations
 * tables. Otherwise falls back to curated static data so the site always
 * renders with useful content.
 */

import { US_STATES_DATA, BACKYARD_BIRDS_BY_STATE, BACKYARD_BIRDS_BY_REGION, STATE_BY_SLUG, CITIES, CITY_MAP, getCitiesForState, getFallbackCityData, type USState, type CityData } from "../data/us-states-data";
import { birdWhitelist } from "../data/bird-whitelist";
import { pilotBirds } from "../data/pilot-birds";
import { birdCatalog } from "../data/bird-catalog";
import { getSeasonalPattern, isEarlyMigrant, monthlyPresence, stateClimate, FREQ_PEAK, FREQ_SHOULDER, type Pattern } from "../data/bird-seasonality";
import { getStateOccurrences, classifyPresence, buildCalendar, relativeByMonth, activeMonths, PRESENCE_LABEL, type OccurrenceBird, type StateOccurrences } from "./occurrence-data";

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
  /** Where the card links. Defaults to the Bird×State page; catalog-only birds link to their profile; unlinked birds have no page yet. */
  href?: string | null;
  /** eBird records for this bird in the state (static occurrence data). */
  observationCount?: number;
  /** Rank by eBird records among all species in the state. */
  reportRank?: number | null;
};

export type StatePageData = {
  state: USState;
  commonBirds: StateBirdEntry[];
  backyardBirds: StateBirdEntry[];
  totalSpecies: number;
  // monthly data for calendar section
  monthlyHighlights: MonthlyHighlight[];
  /** Present when the page is backed by static eBird occurrence data. */
  occurrences?: StateOccurrences;
};

export type MonthlyHighlight = {
  month: string;
  slug: string;
  birds: { slug: string | null; name: string; note?: "arrives" | "departs" | "peak" | "year-round" }[];
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
  const catalog = birdCatalog.find((b) => b.slug === slug);
  const initials = item.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
  // Unknown attributes stay empty — pages skip empty fields rather than print a placeholder.
  return {
    slug: item.slug,
    commonName: item.commonName,
    scientificName: item.scientificName,
    family: pilot?.family ?? catalog?.family ?? "",
    initials,
    colors: pilot?.colors.join(", ") ?? "",
    size: pilot ? `${pilot.size[0]}–${pilot.size[1]} cm` : "",
    habitat: pilot?.habitats.join(", ") ?? "",
    residentStatus: pilot?.residentStatus ?? "",
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

function seasonalStatusLabel(pattern: Pattern | undefined): string | undefined {
  switch (pattern) {
    case "resident": return "Year-round";
    case "summer": return "Summer visitor";
    case "winter": return "Winter visitor";
    case "migrant": return "Migration";
    default: return undefined;
  }
}

/** Get the fallback bird list for a state, filtered by region/backyard overrides. */
function getFallbackStateBirds(stateSlug: string): StateBirdEntry[] {
  // Return all birds, but put backyard/common ones first
  const backyardSlugs = BACKYARD_BIRDS_BY_STATE[stateSlug] ?? BACKYARD_BIRDS_BY_REGION[STATE_BY_SLUG[stateSlug].region] ?? [];
  const backyardSet = new Set(backyardSlugs);
  const backyard = backyardSlugs.map((slug) => birdFromWhitelist(slug)).filter(Boolean) as StateBirdEntry[];
  // Only list species the seasonality model places in this state — no juncos in Florida, no Blue Jays in California.
  const rest = fallbackWhitelistBirds
    .filter((b) => !backyardSet.has(b.slug))
    .filter((b) => getSeasonalPattern(b.slug, stateSlug) !== "absent")
    .map((b) => ({ ...b, seasonalStatus: seasonalStatusLabel(getSeasonalPattern(b.slug, stateSlug)) }));
  return [...backyard.map((b) => ({ ...b, seasonalStatus: seasonalStatusLabel(getSeasonalPattern(b.slug, stateSlug)) })), ...rest].slice(0, 24);
}

function getFallbackBackyardBirds(stateSlug: string): StateBirdEntry[] {
  const slugs = BACKYARD_BIRDS_BY_STATE[stateSlug] ?? BACKYARD_BIRDS_BY_REGION[STATE_BY_SLUG[stateSlug].region] ?? [];
  return slugs.map((slug) => birdFromWhitelist(slug)).filter(Boolean) as StateBirdEntry[];
}

/**
 * Build a 12-month calendar for a state from the static seasonality model.
 * Each month lists up to three birds, preferring arrivals and departures so
 * the calendar reads as a migration timeline rather than the same residents
 * repeated twelve times.
 */
function getFallbackMonthlyHighlights(stateSlug: string): MonthlyHighlight[] {
  const state = STATE_BY_SLUG[stateSlug];
  if (!state) return [];
  const climate = stateClimate(stateSlug);
  const backyardSlugs = BACKYARD_BIRDS_BY_STATE[stateSlug] ?? BACKYARD_BIRDS_BY_REGION[state.region] ?? [];

  const candidates = birdWhitelist
    .map((item) => {
      const pattern = getSeasonalPattern(item.slug, stateSlug);
      if (!pattern || pattern === "absent") return null;
      return { slug: item.slug, name: item.commonName, pattern, priority: item.priority, backyard: backyardSlugs.includes(item.slug), months: monthlyPresence(pattern, climate, isEarlyMigrant(item.slug)) };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const used = new Map<string, number>();
  const highlights: MonthlyHighlight[] = [];
  for (let month = 0; month < 12; month++) {
    const scored = candidates
      .map((c) => {
        const m = c.months[month];
        if (m.frequency < FREQ_SHOULDER) return null;
        let score = c.pattern === "resident" ? 1 : c.pattern === "migrant" ? 3 : 2;
        if (m.arrives) score += 4;
        if (m.departs) score += 3;
        if (c.backyard) score += 1.5;
        score += (birdWhitelist.length - c.priority) / birdWhitelist.length;
        score -= 1.5 * (used.get(c.slug) ?? 0);
        const note = m.arrives ? "arrives" : m.departs ? "departs" : c.pattern === "resident" ? "year-round" : "peak";
        return { slug: c.slug, name: c.name, note: note as MonthlyHighlight["birds"][number]["note"], score };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    for (const bird of scored) used.set(bird.slug, (used.get(bird.slug) ?? 0) + 1);
    if (scored.length > 0) highlights.push({ month: MONTHS[month], slug: MONTH_SLUGS[month], birds: scored.map(({ slug, name, note }) => ({ slug, name, note })) });
  }
  return highlights;
}

/** Static monthly profile for a bird in a state, derived from the seasonality model. */
function getFallbackBirdMonths(birdSlug: string, stateSlug: string): { pattern: Pattern; monthlyData: BirdStateData["monthlyData"] } {
  const climate = stateClimate(stateSlug);
  const state = STATE_BY_SLUG[stateSlug];
  const backyard = (BACKYARD_BIRDS_BY_STATE[stateSlug] ?? BACKYARD_BIRDS_BY_REGION[state.region] ?? []).includes(birdSlug);
  // Birds outside the model: treat curated backyard birds as residents, everything else as passage migrants.
  const pattern = getSeasonalPattern(birdSlug, stateSlug) ?? (backyard ? "resident" : "migrant");
  const monthlyData = monthlyPresence(pattern, climate, isEarlyMigrant(birdSlug)).map((m, i) => ({
    month: MONTHS[i],
    slug: MONTH_SLUGS[i],
    observationCount: 0,
    frequencyScore: m.frequency,
    seasonalStatus: m.status,
  }));
  return { pattern, monthlyData };
}

// ─── Static eBird occurrence data (per-state JSON) ─────────────

/** Build a card entry from an occurrence record, reusing pilot/catalog attributes where we have them. */
function birdFromOccurrence(stateSlug: string, occ: OccurrenceBird, totalRecords: number): StateBirdEntry {
  const base = occ.slug ? birdFromWhitelist(occ.slug) : undefined;
  const catalog = occ.slug ? birdCatalog.find((b) => b.slug === occ.slug) : undefined;
  const initials = occ.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
  const { presence } = classifyPresence(occ, totalRecords);
  const href = !occ.slug ? null : occ.whitelisted ? `/birds-by-location/${stateSlug}/${occ.slug}` : catalog ? `/birds/${occ.slug}` : null;
  return {
    slug: occ.slug ?? `gbif-${occ.gbifTaxonKey}`,
    commonName: occ.commonName,
    scientificName: occ.scientificName,
    family: base?.family ?? catalog?.family ?? "",
    initials,
    colors: base?.colors ?? "",
    size: base?.size ?? "",
    habitat: base?.habitat ?? "",
    residentStatus: base?.residentStatus ?? "",
    summary: base?.summary ?? `${occ.commonName} is among the most-reported birds in this state on eBird.`,
    qualityScore: base?.qualityScore ?? 0,
    sourceCount: 1,
    seasonalStatus: PRESENCE_LABEL[presence],
    frequencyScore: totalRecords > 0 ? occ.total / totalRecords : undefined,
    bestMonths: presence === "resident" ? undefined : activeMonths(occ),
    href,
    observationCount: occ.total,
    reportRank: occ.reportRank,
  };
}

function statePageFromOccurrences(state: USState, data: StateOccurrences): StatePageData {
  const backyardSlugs = BACKYARD_BIRDS_BY_STATE[state.slug] ?? BACKYARD_BIRDS_BY_REGION[state.region] ?? [];
  const ranked = data.birds.filter((b) => b.reportRank !== null).sort((a, b) => (a.reportRank ?? 0) - (b.reportRank ?? 0));
  const commonBirds = ranked.slice(0, 24).map((b) => birdFromOccurrence(state.slug, b, data.totalRecords));
  const backyardBirds = backyardSlugs
    .map((slug) => data.birds.find((b) => b.slug === slug))
    .filter((b): b is OccurrenceBird => Boolean(b) && (b as OccurrenceBird).total > 0)
    .map((b) => birdFromOccurrence(state.slug, b, data.totalRecords));
  return {
    state,
    commonBirds,
    backyardBirds,
    totalSpecies: state.speciesCount,
    monthlyHighlights: buildCalendar(data),
    occurrences: data,
  };
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

  const occurrences = getStateOccurrences(stateSlug);
  if (occurrences) return statePageFromOccurrences(state, occurrences);

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
  let monthlyHighlights: MonthlyHighlight[] = [];

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
        size: row.sizeMinCm && row.sizeMaxCm ? `${row.sizeMinCm}–${row.sizeMaxCm} cm` : "",
        habitat: (row.habitats ?? []).join(", "),
        residentStatus: row.residentStatus ?? "",
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
        size: row.sizeMinCm && row.sizeMaxCm ? `${row.sizeMinCm}–${row.sizeMaxCm} cm` : "",
        habitat: (row.habitats ?? []).join(", "),
        residentStatus: row.residentStatus ?? "",
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

// ─── Bird × State combo pages ──────────────────────────────────

export type BirdStateData = {
  bird: StateBirdEntry;
  state: USState;
  monthlyData: { month: string; slug: string; observationCount: number; frequencyScore: number; seasonalStatus: string }[];
  abundance: string;
  presence: string;
  bestMonths: string[];
  peakMonths: string[];
  totalObservations: number;
  avgFrequency: number;
  relatedBirds: StateBirdEntry[];
  nearbyStatesWithBird: { slug: string; name: string; abbr: string }[];
};

/**
 * Generate static params for Bird×State combo pages.
 * In static mode: pilot birds × all states + backyard birds × their states.
 * In DB mode: actual bird_occurrence_stats data.
 */
export function getComboStaticParams(): { state: string; slug: string }[] {
  const params: { state: string; slug: string }[] = [];
  const birdSlugs = new Set<string>();

  // Add pilot birds for all states
  for (const bird of pilotBirds) {
    birdSlugs.add(bird.slug);
  }

  // Add whitelist birds
  for (const item of birdWhitelist) {
    birdSlugs.add(item.slug);
  }

  // Generate combos: each bird × each state
  for (const state of US_STATES_DATA) {
    for (const slug of birdSlugs) {
      params.push({ state: state.slug, slug });
    }
  }

  // Add city slugs
  for (const city of CITIES) {
    params.push({ state: city.stateSlug, slug: city.slug });
  }

  // Add fallback cities from state.popularCities
  for (const state of US_STATES_DATA) {
    for (const cityName of state.popularCities) {
      const citySlug = cityName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      // Skip if already in CITIES
      if (!CITIES.some((c) => c.stateSlug === state.slug && c.slug === citySlug)) {
        params.push({ state: state.slug, slug: citySlug });
      }
    }
  }

  return params;
}

/**
 * Resolve a sub-slug under a state page — is it a bird or a city?
 */
export function resolveSubSlug(stateSlug: string, slug: string): { type: "bird"; birdSlug: string } | { type: "city"; city: CityData } | null {
  // Check if it's a city first
  const cityKey = `${stateSlug}:${slug}`;
  const city = CITY_MAP.get(cityKey);
  if (city) return { type: "city", city };

  // Check fallback cities (from state.popularCities)
  const state = STATE_BY_SLUG[stateSlug];
  if (state) {
    for (const cityName of state.popularCities) {
      const citySlug = cityName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (citySlug === slug) {
        const fallback = getFallbackCityData(stateSlug, cityName);
        if (fallback) return { type: "city", city: fallback };
      }
    }
  }

  // Check if it's a bird slug
  const pilotMatch = pilotBirds.find((b) => b.slug === slug);
  if (pilotMatch) return { type: "bird", birdSlug: slug };

  const whitelistMatch = birdWhitelist.find((b) => b.slug === slug);
  if (whitelistMatch) return { type: "bird", birdSlug: slug };

  return null;
}

/**
 * Get detailed bird data within a specific state context.
 * Powers /birds-by-location/[state]/[bird-slug] combo pages.
 */
export async function getBirdStateData(stateSlug: string, birdSlug: string): Promise<BirdStateData | undefined> {
  const state = STATE_BY_SLUG[stateSlug];
  if (!state) return undefined;

  // Get the bird entry from state page data
  const stateData = await getStatePageData(stateSlug);
  if (!stateData) return undefined;

  const bird = stateData.commonBirds.find((b) => b.slug === birdSlug)
    ?? stateData.backyardBirds.find((b) => b.slug === birdSlug)
    ?? birdFromWhitelist(birdSlug)
    ?? birdFromPilot(pilotBirds.find((p) => p.slug === birdSlug)!);

  if (!bird) return undefined;

  // Monthly data (from DB if available, otherwise from static highlights)
  let monthlyData: BirdStateData["monthlyData"] = [];
  let abundance = "common";
  let presence = "resident";
  let bestMonths: string[] = [];
  let peakMonths: string[] = [];
  let totalObservations = 0;
  let avgFrequency = 0;

  if (shouldUseDatabase()) {
    try {
      const [{ getDb }, schema, orm] = await Promise.all([
        import("../db/index"),
        import("../db/schema"),
        import("drizzle-orm"),
      ]);
      const db = getDb();

      // Find location
      const [locationRow] = await db
        .select()
        .from(schema.locations)
        .where(orm.and(orm.eq(schema.locations.slug, stateSlug), orm.eq(schema.locations.type, "state")))
        .limit(1);

      if (locationRow) {
        // Find bird by slug
        const [birdRow] = await db
          .select()
          .from(schema.birds)
          .where(orm.eq(schema.birds.slug, birdSlug))
          .limit(1);

        if (birdRow) {
          const statsRows = await db
            .select()
            .from(schema.birdOccurrenceStats)
            .where(orm.and(
              orm.eq(schema.birdOccurrenceStats.locationId, locationRow.id),
              orm.eq(schema.birdOccurrenceStats.birdId, birdRow.id),
            ));

          if (statsRows.length > 0) {
            const maxCount = Math.max(...statsRows.map((s) => s.observationCount), 1);
            monthlyData = statsRows.map((s) => ({
              month: MONTHS[s.month - 1],
              slug: MONTH_SLUGS[s.month - 1],
              observationCount: s.observationCount,
              frequencyScore: s.frequencyScore ?? 0,
              seasonalStatus: s.seasonalStatus,
            }));

            totalObservations = statsRows.reduce((sum, s) => sum + s.observationCount, 0);
            avgFrequency = statsRows.reduce((sum, s) => sum + (s.frequencyScore ?? 0), 0) / statsRows.length;

            // Determine abundance
            if (avgFrequency >= 0.35) abundance = "abundant";
            else if (avgFrequency >= 0.15) abundance = "common";
            else if (avgFrequency >= 0.05) abundance = "uncommon";
            else abundance = "rare";

            // Best months (frequency >= 0.1)
            bestMonths = MONTHS.filter((_, i) => {
              const stat = statsRows.find((s) => s.month === i + 1);
              return stat && (stat.frequencyScore ?? 0) >= 0.1;
            });

            // Peak months (frequency >= 0.35)
            peakMonths = MONTHS.filter((_, i) => {
              const stat = statsRows.find((s) => s.month === i + 1);
              return stat && (stat.frequencyScore ?? 0) >= 0.35;
            });

            // Determine presence
            const statuses = new Set(statsRows.map((s) => s.seasonalStatus));
            if (statuses.has("regular") && bestMonths.length >= 10) presence = "resident";
            else if (bestMonths.length >= 6 && bestMonths.includes("June")) presence = "breeding";
            else if (bestMonths.length >= 3 && !bestMonths.some(m => ["June", "July"].includes(m))) presence = "winter";
            else presence = "migrant";
          }
        }
      }
    } catch {
      // Fall through to static defaults
    }
  }

  // Static eBird occurrence data for this state, when we have it.
  const occurrences = getStateOccurrences(stateSlug);
  const occ = occurrences?.birds.find((b) => b.slug === birdSlug);
  if (monthlyData.length === 0 && occurrences && occ) {
    const rel = relativeByMonth(occ);
    const classified = classifyPresence(occ, occurrences.totalRecords);
    presence = classified.presence;
    abundance = classified.abundance;
    totalObservations = occ.total;
    avgFrequency = occ.share.reduce((a, b) => a + b, 0) / 12;
    monthlyData = MONTHS.map((month, i) => ({
      month,
      slug: MONTH_SLUGS[i],
      observationCount: occ.months[i],
      frequencyScore: rel[i],
      seasonalStatus: rel[i] >= 0.35 ? "regular" : rel[i] >= 0.1 ? "seasonal" : occ.months[i] > 0 ? "rare" : "not-detected",
    }));
    bestMonths = presence === "absent" ? [] : activeMonths(occ);
    peakMonths = presence === "resident" || presence === "absent" ? [] : MONTHS.filter((_, i) => rel[i] >= 0.8);
  }

  // Fallback monthly data from the static seasonality model (per state, per climate band).
  if (monthlyData.length === 0) {
    const fallback = getFallbackBirdMonths(birdSlug, stateSlug);
    monthlyData = fallback.monthlyData;
    presence = { resident: "resident", summer: "breeding", winter: "winter", migrant: "migrant", absent: "absent" }[fallback.pattern];
    avgFrequency = monthlyData.reduce((sum, m) => sum + m.frequencyScore, 0) / monthlyData.length;
    if (fallback.pattern === "absent") abundance = "rare";
    else if (fallback.pattern === "migrant") abundance = "uncommon";
    else abundance = "common";
    bestMonths = fallback.pattern === "absent" ? [] : monthlyData.filter((m) => m.frequencyScore >= FREQ_SHOULDER).map((m) => m.month);
    peakMonths = fallback.pattern === "resident" || fallback.pattern === "absent" ? [] : monthlyData.filter((m) => m.frequencyScore >= FREQ_PEAK).map((m) => m.month);
  }

  // Related birds: same family or same backyard list in this state
  const allBirds = [...stateData.commonBirds, ...stateData.backyardBirds];
  const relatedBirds = allBirds
    .filter((b) => b.slug !== birdSlug && Boolean(bird.family) && b.family === bird.family)
    .slice(0, 6);
  if (relatedBirds.length < 4) {
    // Fill with other backyard birds
    for (const b of stateData.backyardBirds) {
      if (b.slug !== birdSlug && !relatedBirds.find((r) => r.slug === b.slug)) {
        relatedBirds.push(b);
        if (relatedBirds.length >= 6) break;
      }
    }
  }

  // Nearby states where this bird occurs: same region first, then the rest of the country.
  const occursIn = (s: USState) => {
    const pattern = getSeasonalPattern(birdSlug, s.slug);
    if (pattern) return pattern !== "absent";
    return (BACKYARD_BIRDS_BY_STATE[s.slug] ?? BACKYARD_BIRDS_BY_REGION[s.region] ?? []).includes(birdSlug);
  };
  const otherStates = US_STATES_DATA.filter((s) => s.slug !== stateSlug && occursIn(s));
  const nearbyStatesWithBird = [
    ...otherStates.filter((s) => s.region === state.region),
    ...otherStates.filter((s) => s.region !== state.region),
  ].slice(0, 8).map((s) => ({ slug: s.slug, name: s.name, abbr: s.abbr }));

  return {
    bird,
    state,
    monthlyData,
    abundance,
    presence,
    bestMonths,
    peakMonths,
    totalObservations,
    avgFrequency,
    relatedBirds,
    nearbyStatesWithBird,
  };
}

// ─── City pages ────────────────────────────────────────────────

export type CityPageData = {
  city: CityData;
  state: USState;
  birds: StateBirdEntry[];
  backyardBirds: StateBirdEntry[];
  totalSpecies: number;
  nearbyCities: { slug: string; name: string; stateSlug: string }[];
};

/**
 * Get city-level bird data for /birds-by-location/[state]/[city-slug] pages.
 */
export async function getCityPageData(stateSlug: string, citySlug: string): Promise<CityPageData | undefined> {
  const state = STATE_BY_SLUG[stateSlug];
  if (!state) return undefined;

  // Find city data
  let city = CITY_MAP.get(`${stateSlug}:${citySlug}`);
  if (!city) {
    // Try fallback from state.popularCities
    const cityName = state.popularCities.find((c) => {
      const slug = c.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return slug === citySlug;
    });
    if (cityName) {
      city = getFallbackCityData(stateSlug, cityName);
    }
  }
  if (!city) return undefined;

  // Get bird entries for this city
  const stateData = await getStatePageData(stateSlug);
  if (!stateData) return undefined;

  const allBirds = [...stateData.commonBirds, ...stateData.backyardBirds];
  const birdBySlug = new Map(allBirds.map((b) => [b.slug, b]));

  const birds = city.commonBirdSlugs
    .map((slug) => birdBySlug.get(slug) ?? birdFromWhitelist(slug))
    .filter(Boolean) as StateBirdEntry[];

  const backyardBirds = city.backyardBirdSlugs
    .map((slug) => birdBySlug.get(slug) ?? birdFromWhitelist(slug))
    .filter(Boolean) as StateBirdEntry[];

  // Nearby cities in the same state
  const nearbyCities = getCitiesForState(stateSlug)
    .filter((c) => c.slug !== citySlug)
    .map((c) => ({ slug: c.slug, name: c.name, stateSlug: c.stateSlug }));

  // If not enough nearby curated cities, add other popular cities
  if (nearbyCities.length < 3) {
    for (const cityName of state.popularCities) {
      const slug = cityName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      if (slug !== citySlug && !nearbyCities.some((c) => c.slug === slug)) {
        nearbyCities.push({ slug, name: cityName, stateSlug });
      }
      if (nearbyCities.length >= 5) break;
    }
  }

  return {
    city,
    state,
    birds,
    backyardBirds,
    totalSpecies: Math.max(state.speciesCount, birds.length),
    nearbyCities,
  };
}
