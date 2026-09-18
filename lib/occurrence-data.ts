/**
 * Static eBird occurrence data, fetched from GBIF by
 * scripts/fetch-state-occurrences.mjs and committed as JSON so production
 * (which has no database) can serve real, cited numbers.
 *
 * Every derived figure here traces back to one dataset:
 * EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF (CC BY 4.0).
 */
import arizona from "../data/occurrences/arizona.json";
import california from "../data/occurrences/california.json";
import colorado from "../data/occurrences/colorado.json";
import florida from "../data/occurrences/florida.json";
import michigan from "../data/occurrences/michigan.json";
import oregon from "../data/occurrences/oregon.json";
import rhodeIsland from "../data/occurrences/rhode-island.json";
import tennessee from "../data/occurrences/tennessee.json";
import texas from "../data/occurrences/texas.json";

export type OccurrenceBird = {
  slug: string | null;
  commonName: string;
  scientificName: string;
  gbifTaxonKey: number;
  /** Rank among all species by eBird records in the state (null when the species was added from the backyard whitelist). */
  reportRank: number | null;
  whitelisted: boolean;
  total: number;
  /** Raw eBird records per month, January first. */
  months: number[];
  /** Share of all eBird records in the state that month belonging to this species. */
  share: number[];
};

export type StateOccurrences = {
  state: string;
  stateName: string;
  source: { name: string; publisher: string; distributor: string; datasetKey: string; url: string; license: string; licenseUrl: string; query: string };
  years: string;
  retrievedAt: string;
  totalRecords: number;
  totalByMonth: number[];
  birds: OccurrenceBird[];
};

const STATE_OCCURRENCES: Record<string, StateOccurrences> = {
  arizona: arizona as StateOccurrences,
  california: california as StateOccurrences,
  colorado: colorado as StateOccurrences,
  florida: florida as StateOccurrences,
  michigan: michigan as StateOccurrences,
  oregon: oregon as StateOccurrences,
  "rhode-island": rhodeIsland as StateOccurrences,
  tennessee: tennessee as StateOccurrences,
  texas: texas as StateOccurrences,
};

export function getStateOccurrences(stateSlug: string): StateOccurrences | undefined {
  return STATE_OCCURRENCES[stateSlug];
}

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export type Presence = "resident" | "breeding" | "winter" | "migrant" | "absent";

/** Month-by-month presence relative to the bird's own peak month (0–1). */
export function relativeByMonth(bird: OccurrenceBird): number[] {
  const max = Math.max(...bird.share, 0);
  return max > 0 ? bird.share.map((s) => s / max) : bird.share.map(() => 0);
}

/**
 * Classify a bird's seasonal presence in the state from its monthly share
 * curve. Thresholds are relative to the bird's own peak, so a species that is
 * reported year-round at a steady rate is a resident even if it is scarce.
 */
export function classifyPresence(bird: OccurrenceBird, totalRecords: number): { presence: Presence; abundance: "abundant" | "common" | "uncommon" | "rare" } {
  const overallShare = totalRecords > 0 ? bird.total / totalRecords : 0;
  const abundance = overallShare >= 0.015 ? "abundant" : overallShare >= 0.004 ? "common" : overallShare >= 0.0005 ? "uncommon" : "rare";
  if (bird.total < 50) return { presence: "absent", abundance: "rare" };

  const rel = relativeByMonth(bird);
  const present = rel.map((r) => r >= 0.3);
  const presentCount = present.filter(Boolean).length;
  const summer = present[5] && present[6]; // June and July both at ≥30% of peak
  const winter = present[11] && present[0]; // December and January both at ≥30% of peak

  let presence: Presence;
  if (presentCount >= 10) presence = "resident";
  else if (summer && !winter) presence = "breeding";
  else if (winter && !summer) presence = "winter";
  else if (summer && winter) presence = "resident";
  else presence = "migrant";
  return { presence, abundance };
}

export const PRESENCE_LABEL: Record<Presence, string> = {
  resident: "Year-round",
  breeding: "Summer visitor",
  winter: "Winter visitor",
  migrant: "Migration",
  absent: "Not regularly recorded",
};

/** Months (names) in which the bird is at ≥30% of its own peak. */
export function activeMonths(bird: OccurrenceBird, threshold = 0.3): string[] {
  return relativeByMonth(bird).map((r, i) => (r >= threshold ? MONTH_NAMES[i] : null)).filter((m): m is string => m !== null);
}

export type CalendarNote = "arrives" | "departs" | "peak" | "year-round";

/**
 * Build a twelve-month highlight calendar from occurrence data. Each month
 * lists up to `perMonth` species, preferring arrivals and departures (a jump
 * across the 30%-of-peak line) so the calendar reads as a migration timeline.
 */
export function buildCalendar(data: StateOccurrences, perMonth = 3): { month: string; slug: string; birds: { slug: string | null; name: string; note: CalendarNote }[] }[] {
  // Only species a birder can reasonably expect: at least ~0.05% of all records.
  const candidates = data.birds
    .map((b) => {
      const rel = relativeByMonth(b);
      const { presence, abundance } = classifyPresence(b, data.totalRecords);
      const peak = rel.indexOf(Math.max(...rel));
      return { b, rel, presence, abundance, peak, overall: b.total / data.totalRecords };
    })
    .filter((c) => c.presence !== "absent" && c.abundance !== "rare");

  const used = new Map<string, number>();
  const calendar = [];
  for (let m = 0; m < 12; m++) {
    const prev = (m + 11) % 12;
    const next = (m + 1) % 12;
    const scored = candidates
      .map((c) => {
        const here = c.rel[m] >= 0.3;
        if (!here) return null;
        const arrives = c.presence !== "resident" && c.rel[prev] < 0.3;
        const departs = c.presence !== "resident" && c.rel[next] < 0.3;
        let score = c.presence === "resident" ? 1 : 2;
        if (arrives) score += 4;
        if (departs) score += 3;
        if (c.peak === m && c.presence !== "resident") score += 1.5;
        score += Math.min(2, c.overall * 100); // familiar species first
        score -= 1.5 * (used.get(c.b.commonName) ?? 0);
        const note: CalendarNote = arrives ? "arrives" : departs ? "departs" : c.presence === "resident" ? "year-round" : "peak";
        return { slug: c.b.slug, name: c.b.commonName, note, score };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, perMonth);
    for (const s of scored) used.set(s.name, (used.get(s.name) ?? 0) + 1);
    calendar.push({ month: MONTH_NAMES[m], slug: MONTH_NAMES[m].toLowerCase(), birds: scored.map(({ slug, name, note }) => ({ slug, name, note })) });
  }
  return calendar;
}

/** Months ranked by total eBird records — a proxy for when birders find the most to see. */
export function busiestMonths(data: StateOccurrences, count = 3): string[] {
  return data.totalByMonth
    .map((n, i) => ({ n, i }))
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    .map(({ i }) => MONTH_NAMES[i]);
}

/** Formats the standard attribution line for this dataset. */
export function occurrenceAttribution(data: StateOccurrences): string {
  return `${data.source.name}, ${data.source.publisher}, via ${data.source.distributor} (${data.source.license}). ${data.stateName} records ${data.years.replace(",", "–")}, retrieved ${data.retrievedAt}.`;
}
