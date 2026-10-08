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
import { birdCatalog } from "../data/bird-catalog";
import { getSeasonalPattern, isEarlyMigrant, monthlyPresence, stateClimate, FREQ_SHOULDER, type Pattern } from "../data/bird-seasonality";
import { getStateOccurrences, classifyPresence, buildCalendar, activeMonths, PRESENCE_LABEL, type OccurrenceBird, type StateOccurrences } from "./occurrence-data";
import { birdInStateHref } from "./indexing";

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


// ─── Static eBird occurrence data (per-state JSON) ─────────────

/** Build a card entry from an occurrence record, reusing pilot/catalog attributes where we have them. */
function birdFromOccurrence(stateSlug: string, occ: OccurrenceBird, totalRecords: number): StateBirdEntry {
  const base = occ.slug ? birdFromWhitelist(occ.slug) : undefined;
  const catalog = occ.slug ? birdCatalog.find((b) => b.slug === occ.slug) : undefined;
  const initials = occ.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2);
  const { presence } = classifyPresence(occ, totalRecords);
  const href = occ.slug ? birdInStateHref(stateSlug, occ.slug) : null;
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
