/**
 * Static seasonality model for the whitelist backyard birds, used when no
 * occurrence database is available (the production default).
 *
 * Each state maps to an avifaunal zone (which species occur there at all) and
 * a winter-climate band (when summer visitors arrive and winter visitors
 * leave). Each bird then declares a presence pattern per zone, optionally
 * split by climate band, plus state-level overrides for range edges.
 *
 * Patterns are deliberately coarse — "resident / summer / winter / migrant /
 * absent" — but they are per state, so a subtropical state never advertises
 * winter visitors in July and a Pacific state never lists Blue Jays.
 */

export type Zone = "east" | "central" | "mountain" | "southwest" | "pacific" | "alaska" | "hawaii";
export type Climate = "tropical" | "subtropical" | "warm" | "temperate" | "cold";
export type Pattern = "resident" | "summer" | "winter" | "migrant" | "absent";

type ByClimate = Partial<Record<Climate, Pattern>> & { default: Pattern };
type ZonePattern = Pattern | ByClimate;

export type BirdSeasonality = {
  slug: string;
  zones: Partial<Record<Zone, ZonePattern>>;
  /** State-slug overrides for range edges (e.g. Blue Jay in Colorado). */
  states?: Record<string, Pattern>;
  /** Early-spring migrant: arrives ~March and lingers into late fall where it is a summer bird. */
  early?: boolean;
};

export const STATE_ZONE: Record<string, Zone> = {
  california: "pacific", oregon: "pacific", washington: "pacific",
  arizona: "southwest", "new-mexico": "southwest",
  nevada: "mountain", utah: "mountain", idaho: "mountain", montana: "mountain", wyoming: "mountain", colorado: "mountain",
  alaska: "alaska", hawaii: "hawaii",
  "north-dakota": "central", "south-dakota": "central", nebraska: "central", kansas: "central",
  minnesota: "east", iowa: "east", missouri: "east", wisconsin: "east", illinois: "east", indiana: "east", michigan: "east", ohio: "east",
  texas: "east", oklahoma: "east", arkansas: "east", louisiana: "east", mississippi: "east", alabama: "east", florida: "east",
  georgia: "east", "south-carolina": "east", "north-carolina": "east", tennessee: "east", kentucky: "east", "west-virginia": "east",
  virginia: "east", maryland: "east", delaware: "east",
  maine: "east", "new-hampshire": "east", vermont: "east", massachusetts: "east", connecticut: "east", "rhode-island": "east",
  "new-york": "east", "new-jersey": "east", pennsylvania: "east",
};

export const STATE_CLIMATE: Record<string, Climate> = {
  hawaii: "tropical",
  florida: "subtropical",
  texas: "warm", louisiana: "warm", mississippi: "warm", alabama: "warm", georgia: "warm", "south-carolina": "warm",
  arizona: "warm", california: "warm", oklahoma: "warm",
  "north-dakota": "cold", "south-dakota": "cold", minnesota: "cold", wisconsin: "cold", michigan: "cold",
  maine: "cold", vermont: "cold", "new-hampshire": "cold", montana: "cold", wyoming: "cold", idaho: "cold", alaska: "cold",
};

export function stateClimate(stateSlug: string): Climate {
  return STATE_CLIMATE[stateSlug] ?? "temperate";
}

const R: Pattern = "resident";
const S: Pattern = "summer";
const W: Pattern = "winter";
const M: Pattern = "migrant";
const X: Pattern = "absent";

/** Resident in mild states, summer-only where winters are cold. */
const RES_SUMMER_NORTH: ByClimate = { cold: S, default: R };
/** Resident in the middle latitudes, winter visitor in the Deep South. */
const RES_WINTER_SOUTH: ByClimate = { subtropical: W, warm: W, default: R };
/** Breeds across the East, only passes through the Gulf states. */
const SUMMER_MIGRANT_SOUTH: ByClimate = { subtropical: M, warm: M, default: S };
/** Same as above but too far south for Florida. */
const WINTER_NOT_FLORIDA: ByClimate = { subtropical: X, warm: W, temperate: W, cold: R, default: W };

export const BIRD_SEASONALITY: BirdSeasonality[] = [
  { slug: "northern-cardinal", zones: { east: R, central: R, southwest: R } },
  { slug: "american-robin", early: true, zones: { east: { subtropical: W, cold: S, default: R }, central: RES_SUMMER_NORTH, mountain: RES_SUMMER_NORTH, southwest: R, pacific: R, alaska: S } },
  { slug: "blue-jay", zones: { east: R, central: R }, states: { colorado: R } },
  { slug: "american-goldfinch", zones: { east: RES_WINTER_SOUTH, central: R, mountain: R, southwest: W, pacific: R } },
  { slug: "black-capped-chickadee", zones: { east: { subtropical: X, warm: X, default: R }, central: R, mountain: R, pacific: R, alaska: R }, states: { california: X, "north-carolina": X, tennessee: X, arkansas: X, kentucky: X, virginia: X, maryland: X, delaware: X } },
  { slug: "tufted-titmouse", zones: { east: R }, states: { minnesota: X, maine: X, kansas: R, nebraska: R } },
  { slug: "house-finch", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R, hawaii: R } },
  { slug: "mourning-dove", early: true, zones: { east: RES_SUMMER_NORTH, central: RES_SUMMER_NORTH, mountain: RES_SUMMER_NORTH, southwest: R, pacific: R } },
  { slug: "downy-woodpecker", zones: { east: R, central: R, mountain: R, pacific: R, alaska: R } },
  { slug: "ruby-throated-hummingbird", zones: { east: S, central: S } },
  { slug: "annas-hummingbird", zones: { pacific: R, southwest: R }, states: { "new-mexico": X, nevada: R } },
  { slug: "carolina-wren", zones: { east: { cold: X, default: R } }, states: { michigan: R, kansas: R, nebraska: R } },
  { slug: "white-breasted-nuthatch", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R } },
  { slug: "red-bellied-woodpecker", zones: { east: { cold: X, default: R }, central: R }, states: { michigan: R, wisconsin: R, minnesota: R, "north-dakota": X, maine: X, vermont: X, "new-hampshire": X } },
  { slug: "dark-eyed-junco", zones: { east: WINTER_NOT_FLORIDA, central: W, mountain: R, southwest: W, pacific: R, alaska: S }, states: { "new-mexico": R } },
  { slug: "song-sparrow", early: true, zones: { east: { subtropical: X, warm: W, cold: S, default: R }, central: RES_SUMMER_NORTH, mountain: RES_SUMMER_NORTH, southwest: R, pacific: R, alaska: R } },
  { slug: "house-sparrow", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R, hawaii: R } },
  { slug: "european-starling", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "common-grackle", early: true, zones: { east: RES_SUMMER_NORTH, central: S }, states: { colorado: S } },
  { slug: "red-winged-blackbird", early: true, zones: { east: RES_SUMMER_NORTH, central: RES_SUMMER_NORTH, mountain: RES_SUMMER_NORTH, southwest: R, pacific: R } },
  { slug: "brown-headed-cowbird", early: true, zones: { east: RES_SUMMER_NORTH, central: S, mountain: S, southwest: R, pacific: R } },
  { slug: "baltimore-oriole", zones: { east: SUMMER_MIGRANT_SOUTH, central: S } },
  { slug: "orchard-oriole", zones: { east: { cold: X, default: S }, central: S }, states: { michigan: S, wisconsin: S } },
  { slug: "eastern-bluebird", early: true, zones: { east: RES_SUMMER_NORTH, central: RES_SUMMER_NORTH } },
  { slug: "western-bluebird", early: true, zones: { pacific: R, southwest: R, mountain: RES_SUMMER_NORTH } },
  { slug: "mountain-bluebird", early: true, zones: { mountain: RES_SUMMER_NORTH, central: { cold: S, default: W }, southwest: W, pacific: S, alaska: S }, states: { california: W } },
  { slug: "cedar-waxwing", zones: { east: { subtropical: W, warm: W, cold: S, default: R }, central: { cold: S, default: W }, mountain: RES_SUMMER_NORTH, southwest: W, pacific: R, alaska: S } },
  { slug: "gray-catbird", zones: { east: { subtropical: W, default: S }, central: S }, states: { texas: W, louisiana: W, colorado: S } },
  { slug: "northern-mockingbird", zones: { east: { cold: X, default: R }, central: R, southwest: R, pacific: R }, states: { "north-dakota": X, oregon: X, washington: X, nevada: R } },
  { slug: "brown-thrasher", zones: { east: { subtropical: R, warm: R, default: S }, central: S }, states: { virginia: R, "north-carolina": R, tennessee: R, kentucky: R, arkansas: R } },
  { slug: "eastern-towhee", zones: { east: { subtropical: R, warm: R, default: S }, central: S }, states: { virginia: R, "north-carolina": R, tennessee: R, kentucky: R, arkansas: R, "north-dakota": X } },
  { slug: "spotted-towhee", zones: { pacific: R, southwest: R, mountain: RES_SUMMER_NORTH, central: { cold: S, default: W } } },
  { slug: "chipping-sparrow", zones: { east: { subtropical: W, warm: W, default: S }, central: S, mountain: S, southwest: W, pacific: S, alaska: S }, states: { "new-mexico": S, california: R } },
  { slug: "white-throated-sparrow", zones: { east: { subtropical: W, warm: W, cold: S, default: W }, central: W }, states: { "north-dakota": M, california: W } },
  { slug: "white-crowned-sparrow", zones: { east: { subtropical: X, cold: M, default: W }, central: W, mountain: RES_SUMMER_NORTH, southwest: W, pacific: R, alaska: S }, states: { "north-dakota": M } },
  { slug: "american-tree-sparrow", zones: { east: { subtropical: X, warm: X, default: W }, central: W, mountain: W, pacific: W, alaska: S }, states: { california: X } },
  { slug: "fox-sparrow", early: true, zones: { east: { subtropical: X, cold: M, default: W }, central: M, mountain: S, southwest: W, pacific: R, alaska: S }, states: { california: W } },
  { slug: "field-sparrow", early: true, zones: { east: { subtropical: W, cold: S, default: R }, central: RES_SUMMER_NORTH } },
  { slug: "savannah-sparrow", zones: { east: { subtropical: W, warm: W, default: S }, central: { cold: S, default: M }, mountain: S, southwest: W, pacific: S, alaska: S }, states: { california: R } },
  { slug: "lincolns-sparrow", zones: { east: { subtropical: W, warm: W, default: M }, central: M, mountain: S, southwest: W, pacific: S, alaska: S }, states: { maine: S, vermont: S, "new-hampshire": S, michigan: S, minnesota: S, wisconsin: S, california: W } },
  { slug: "purple-finch", zones: { east: WINTER_NOT_FLORIDA, central: W, pacific: R } },
  { slug: "pine-siskin", zones: { east: WINTER_NOT_FLORIDA, central: W, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "evening-grosbeak", zones: { east: { cold: R, default: X }, mountain: R, pacific: R } },
  { slug: "rose-breasted-grosbeak", zones: { east: SUMMER_MIGRANT_SOUTH, central: S } },
  { slug: "black-headed-grosbeak", zones: { mountain: S, southwest: S, pacific: S, central: S }, states: { kansas: M } },
  { slug: "indigo-bunting", zones: { east: S, central: S } },
  { slug: "painted-bunting", zones: {}, states: { florida: R, texas: S, louisiana: S, mississippi: S, alabama: S, georgia: S, "south-carolina": S, "north-carolina": S, arkansas: S, oklahoma: S, kansas: S } },
  { slug: "lazuli-bunting", zones: { mountain: S, pacific: S, southwest: S, central: S }, states: { kansas: M } },
  { slug: "scarlet-tanager", zones: { east: SUMMER_MIGRANT_SOUTH, central: M } },
  { slug: "summer-tanager", zones: { east: { cold: X, default: S }, southwest: S }, states: { "new-york": X, massachusetts: X, connecticut: X, "rhode-island": X, pennsylvania: X, kansas: S, california: S } },
  { slug: "western-tanager", zones: { mountain: S, southwest: S, pacific: S, central: M, alaska: S }, states: { "north-dakota": S, "south-dakota": S } },
  { slug: "yellow-rumped-warbler", zones: { east: { cold: S, default: W }, central: { cold: M, default: W }, mountain: RES_SUMMER_NORTH, southwest: W, pacific: R, alaska: S } },
  { slug: "yellow-warbler", zones: { east: SUMMER_MIGRANT_SOUTH, central: S, mountain: S, southwest: S, pacific: S, alaska: S } },
  { slug: "common-yellowthroat", zones: { east: { subtropical: R, warm: R, default: S }, central: S, mountain: S, southwest: S, pacific: S }, states: { arizona: R, california: R } },
  { slug: "pine-warbler", zones: { east: { subtropical: R, warm: R, default: S } }, states: { virginia: R, "north-carolina": R, arkansas: R, tennessee: R } },
  { slug: "palm-warbler", zones: { east: { subtropical: W, warm: W, default: M }, central: M }, states: { maine: S, minnesota: S, wisconsin: S } },
  { slug: "american-redstart", zones: { east: { subtropical: M, default: S }, central: S }, states: { texas: M, kansas: M } },
  { slug: "nashville-warbler", zones: { east: { cold: S, default: M }, central: M, mountain: S, pacific: S, southwest: M }, states: { colorado: M, texas: W } },
  { slug: "orange-crowned-warbler", zones: { east: { subtropical: W, warm: W, default: M }, central: M, mountain: S, southwest: R, pacific: R, alaska: S }, states: { "new-mexico": S, oregon: S, washington: S } },
  { slug: "black-and-white-warbler", zones: { east: { subtropical: W, default: S }, central: S }, states: { kansas: M } },
  { slug: "carolina-chickadee", zones: { east: { cold: X, default: R } }, states: { "new-york": X, connecticut: X, massachusetts: X, "rhode-island": X, iowa: X, kansas: R } },
  { slug: "mountain-chickadee", zones: { mountain: R, southwest: R, pacific: R } },
  { slug: "chestnut-backed-chickadee", zones: { pacific: R, alaska: R }, states: { idaho: R, montana: R } },
  { slug: "oak-titmouse", zones: { pacific: R }, states: { washington: X } },
  { slug: "bushtit", zones: { pacific: R, southwest: R, mountain: R }, states: { idaho: X, montana: X, wyoming: X, texas: R } },
  { slug: "red-breasted-nuthatch", zones: { east: WINTER_NOT_FLORIDA, central: W, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "brown-creeper", zones: { east: WINTER_NOT_FLORIDA, central: W, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "golden-crowned-kinglet", zones: { east: WINTER_NOT_FLORIDA, central: W, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "ruby-crowned-kinglet", zones: { east: { subtropical: W, warm: W, cold: S, default: W }, central: { cold: M, default: W }, mountain: RES_SUMMER_NORTH, southwest: W, pacific: R, alaska: S }, states: { "new-mexico": R } },
  { slug: "house-wren", zones: { east: { subtropical: W, warm: W, default: S }, central: S, mountain: S, southwest: S, pacific: S }, states: { arizona: R, california: R } },
  { slug: "winter-wren", zones: { east: { subtropical: X, warm: W, cold: S, default: W }, central: W } },
  { slug: "bewicks-wren", zones: { pacific: R, southwest: R, mountain: R }, states: { idaho: X, montana: X, wyoming: X, kansas: R, texas: R, oklahoma: R, arkansas: R } },
  { slug: "rock-wren", zones: { mountain: RES_SUMMER_NORTH, southwest: R, pacific: R, central: S }, states: { oregon: S, washington: S, texas: R } },
  { slug: "american-crow", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "fish-crow", zones: { east: { cold: X, default: R } }, states: { ohio: X, indiana: X, iowa: X, "west-virginia": X, illinois: X, missouri: X, kentucky: X, oklahoma: X } },
  { slug: "black-billed-magpie", zones: { mountain: R, central: R, southwest: R, alaska: R }, states: { kansas: X, arizona: X, oregon: R, washington: R, minnesota: R } },
  { slug: "stellers-jay", zones: { pacific: R, mountain: R, southwest: R, alaska: R } },
  { slug: "california-scrub-jay", zones: { pacific: R }, states: { nevada: R } },
  { slug: "woodhouses-scrub-jay", zones: { southwest: R, mountain: R }, states: { montana: X, texas: R } },
  { slug: "canada-jay", zones: { east: { cold: R, default: X }, mountain: R, pacific: R, southwest: R, alaska: R } },
  { slug: "clarks-nutcracker", zones: { mountain: R, pacific: R, southwest: R }, states: { "south-dakota": R } },
  { slug: "hairy-woodpecker", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R, alaska: R } },
  { slug: "pileated-woodpecker", zones: { east: R, pacific: R }, states: { kansas: R, idaho: R, montana: R } },
  { slug: "northern-flicker", early: true, zones: { east: R, central: RES_SUMMER_NORTH, mountain: R, southwest: R, pacific: R, alaska: S } },
  { slug: "yellow-bellied-sapsucker", early: true, zones: { east: { cold: S, default: W }, central: { cold: M, default: W } } },
  { slug: "red-headed-woodpecker", zones: { east: RES_SUMMER_NORTH, central: RES_SUMMER_NORTH }, states: { maine: X, vermont: X, "new-hampshire": X, massachusetts: X, connecticut: X, "rhode-island": X } },
  { slug: "acorn-woodpecker", zones: { pacific: R, southwest: R }, states: { washington: X, texas: R } },
  { slug: "lewiss-woodpecker", zones: { mountain: RES_SUMMER_NORTH, pacific: R, southwest: R }, states: { oregon: S, washington: S } },
  { slug: "broad-tailed-hummingbird", zones: { mountain: S, southwest: S }, states: { texas: S } },
  { slug: "rufous-hummingbird", zones: { pacific: S, mountain: M, southwest: M, alaska: S, east: { subtropical: W, warm: W, default: X } }, states: { california: M, idaho: S, montana: S } },
  { slug: "black-chinned-hummingbird", zones: { southwest: S, pacific: S, mountain: S }, states: { montana: X, wyoming: X, texas: S, oklahoma: S } },
  { slug: "costas-hummingbird", zones: {}, states: { arizona: R, california: R, nevada: R, utah: S } },
  { slug: "calliope-hummingbird", zones: { mountain: S, pacific: S, southwest: M }, states: { colorado: M } },
  { slug: "common-ground-dove", zones: { east: { subtropical: R, warm: R, default: X }, southwest: R }, states: { california: R, oklahoma: X } },
  { slug: "white-winged-dove", zones: { southwest: R }, states: { texas: R, florida: R, louisiana: R, oklahoma: R, california: R, nevada: R } },
  { slug: "band-tailed-pigeon", zones: { pacific: R, southwest: S, mountain: S }, states: { oregon: S, washington: S, idaho: X, montana: X, wyoming: X } },
  { slug: "american-kestrel", early: true, zones: { east: RES_SUMMER_NORTH, central: RES_SUMMER_NORTH, mountain: RES_SUMMER_NORTH, southwest: R, pacific: R, alaska: S } },
  { slug: "coopers-hawk", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R } },
  { slug: "red-tailed-hawk", zones: { east: R, central: R, mountain: R, southwest: R, pacific: R, alaska: S } },
  { slug: "barred-owl", zones: { east: R, central: R, pacific: R }, states: { "north-dakota": X, idaho: R, montana: R } },
  // Southwest specialties referenced by the Arizona backyard list.
  { slug: "cactus-wren", zones: { southwest: R }, states: { california: R, nevada: R, texas: R, utah: R } },
  { slug: "verdin", zones: { southwest: R }, states: { california: R, nevada: R, texas: R, utah: R } },
  { slug: "gambels-quail", zones: { southwest: R }, states: { california: R, nevada: R, utah: R } },
  { slug: "curve-billed-thrasher", zones: { southwest: R }, states: { texas: R, oklahoma: R, colorado: R } },
];

const SEASONALITY_BY_SLUG = new Map(BIRD_SEASONALITY.map((b) => [b.slug, b]));

export function isEarlyMigrant(birdSlug: string): boolean {
  return SEASONALITY_BY_SLUG.get(birdSlug)?.early === true;
}

/** Presence pattern of a bird in a state; `undefined` when the bird has no model entry. */
export function getSeasonalPattern(birdSlug: string, stateSlug: string): Pattern | undefined {
  const entry = SEASONALITY_BY_SLUG.get(birdSlug);
  if (!entry) return undefined;
  const override = entry.states?.[stateSlug];
  if (override) return override;
  const zone = STATE_ZONE[stateSlug];
  if (!zone) return undefined;
  const zonePattern = entry.zones[zone];
  if (!zonePattern) return "absent";
  if (typeof zonePattern === "string") return zonePattern;
  return zonePattern[stateClimate(stateSlug)] ?? zonePattern.default;
}

// ─── Month windows ──────────────────────────────────────────────

/** Months (0–11) in which a summer visitor is present, by climate band; first/last are arrival/departure. */
const SUMMER_WINDOW: Record<Climate, [number, number]> = {
  tropical: [2, 9],
  subtropical: [2, 9], // March–October
  warm: [2, 9],
  temperate: [3, 8], // April–September
  cold: [4, 8], // May–September
};

/** Early-spring migrants (robins, blackbirds, bluebirds) arrive a month or two ahead and linger into late fall. */
const SUMMER_WINDOW_EARLY: Record<Climate, [number, number]> = {
  tropical: [1, 10],
  subtropical: [1, 10],
  warm: [1, 10], // February–November
  temperate: [2, 10], // March–November
  cold: [2, 9], // March–October
};

/** Months in which a winter visitor is present, expressed as [arrival, departure] wrapping the year end. */
const WINTER_WINDOW: Record<Climate, [number, number]> = {
  tropical: [10, 2],
  subtropical: [10, 2], // November–March
  warm: [9, 2], // October–March
  temperate: [9, 3], // October–April
  cold: [9, 3],
};

const MIGRATION_WINDOW: Record<Climate, number[]> = {
  tropical: [2, 3, 8, 9],
  subtropical: [2, 3, 8, 9], // March–April, September–October
  warm: [2, 3, 8, 9],
  temperate: [3, 4, 8, 9], // April–May, September–October
  cold: [4, 8], // May, September
};

function inWrappedWindow(month: number, [start, end]: [number, number]) {
  return start <= end ? month >= start && month <= end : month >= start || month <= end;
}

export const FREQ_RESIDENT = 0.3;
export const FREQ_PEAK = 0.35;
export const FREQ_SHOULDER = 0.15;
export const FREQ_ABSENT = 0.02;

export type MonthlyPresence = { frequency: number; status: "regular" | "seasonal" | "rare"; arrives: boolean; departs: boolean };

/** Twelve-month presence profile for a pattern under a given climate band. */
export function monthlyPresence(pattern: Pattern, climate: Climate, early = false): MonthlyPresence[] {
  return Array.from({ length: 12 }, (_, month) => {
    if (pattern === "resident") return { frequency: FREQ_RESIDENT, status: "regular" as const, arrives: false, departs: false };
    if (pattern === "absent") return { frequency: FREQ_ABSENT, status: "rare" as const, arrives: false, departs: false };
    if (pattern === "migrant") {
      const window = MIGRATION_WINDOW[climate];
      const present = window.includes(month);
      return { frequency: present ? FREQ_SHOULDER : FREQ_ABSENT, status: present ? "seasonal" as const : "rare" as const, arrives: false, departs: false };
    }
    const window = pattern === "summer" ? (early ? SUMMER_WINDOW_EARLY : SUMMER_WINDOW)[climate] : WINTER_WINDOW[climate];
    const present = inWrappedWindow(month, window);
    const arrives = month === window[0];
    const departs = month === window[1];
    const frequency = !present ? FREQ_ABSENT : arrives || departs ? FREQ_SHOULDER : FREQ_PEAK;
    return { frequency, status: present ? "seasonal" as const : "rare" as const, arrives, departs };
  });
}
