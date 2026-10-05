/**
 * Single source of truth for which programmatic pages exist and are indexable.
 *
 * Rule: a page we do not want indexed is not generated. Every route below either
 * renders with `index, follow` and is listed in the sitemap, or returns 404 and
 * receives no internal links. Page metadata, generateStaticParams, internal
 * links, and app/sitemap.xml all read from here so they can never disagree.
 *
 * Production has no database, so decisions use only static data: the GSC
 * whitelist (data/gsc-location-pages.ts) and committed eBird occurrence files.
 */
import { STATE_BY_SLUG, US_STATES_DATA, type USState } from "../data/us-states-data";
import { birdWhitelist } from "../data/bird-whitelist";
import { pilotBirds } from "../data/pilot-birds";
import { birdCatalog } from "../data/bird-catalog";
import { birdEditorial } from "../data/editorial/birds";
import { GSC_LOCATION_PAGES } from "../data/gsc-location-pages";
import { classifyPresence, getStateOccurrences, OCCURRENCE_STATES } from "./occurrence-data";
import { getBirdSnapshot, isBirdIndexEligible } from "./bird-repository";

const comboPath = (state: string, slug: string) => `/birds-by-location/${state}/${slug}`;

/** Birds that can have a State × bird page at all. */
export const LOCATION_BIRD_SLUGS = new Set<string>([...pilotBirds.map((b) => b.slug), ...birdWhitelist.map((b) => b.slug)]);

const GSC_PATHS = new Set(GSC_LOCATION_PAGES.map(([path]) => path));

// ─── State × bird pages ────────────────────────────────────────

/** Bird has real eBird records in the state and is not rare there. */
function hasOccurrenceEvidence(stateSlug: string, birdSlug: string): boolean {
  const data = getStateOccurrences(stateSlug);
  const occ = data?.birds.find((b) => b.slug === birdSlug);
  if (!data || !occ || occ.total === 0) return false;
  return classifyPresence(occ, data.totalRecords).abundance !== "rare";
}

let comboParams: { state: string; slug: string }[] | undefined;

/** Published (and indexable) State × bird pages: GSC whitelist ∪ eBird-backed combinations. */
export function getPublishedComboParams(): { state: string; slug: string }[] {
  if (comboParams) return comboParams;
  const params: { state: string; slug: string }[] = [];
  for (const state of US_STATES_DATA) {
    for (const slug of LOCATION_BIRD_SLUGS) {
      if (GSC_PATHS.has(comboPath(state.slug, slug)) || hasOccurrenceEvidence(state.slug, slug)) params.push({ state: state.slug, slug });
    }
  }
  comboParams = params;
  return params;
}

let comboSet: Set<string> | undefined;

export function isComboPublished(stateSlug: string, birdSlug: string): boolean {
  comboSet ??= new Set(getPublishedComboParams().map(({ state, slug }) => comboPath(state, slug)));
  return comboSet.has(comboPath(stateSlug, birdSlug));
}

/** States with a published page for this bird. */
export function getPublishedStatesForBird(birdSlug: string): USState[] {
  return US_STATES_DATA.filter((s) => isComboPublished(s.slug, birdSlug));
}

// ─── City pages ────────────────────────────────────────────────

/** Only cities that already earn impressions; the rest are not generated. */
export function getPublishedCityParams(): { state: string; slug: string }[] {
  return GSC_LOCATION_PAGES
    .map(([path]) => path.split("/"))
    .filter(([, , state, slug]) => STATE_BY_SLUG[state] && !LOCATION_BIRD_SLUGS.has(slug))
    .map(([, , state, slug]) => ({ state, slug }));
}

export function isCityPublished(stateSlug: string, citySlug: string): boolean {
  return GSC_PATHS.has(comboPath(stateSlug, citySlug)) && !LOCATION_BIRD_SLUGS.has(citySlug);
}

// ─── Bird profiles ─────────────────────────────────────────────

/**
 * U.S. backyard and feeder species outside the 100-bird whitelist that are worth
 * a profile. Everything else in the 1,000-species AOS catalog (seabirds,
 * Neotropical and Old World species) is not generated.
 */
const BACKYARD_EXTRAS = [
  "eastern-screech-owl", "western-screech-owl", "great-horned-owl", "killdeer", "chimney-swift",
  "gambels-quail", "california-quail", "northern-bobwhite", "inca-dove", "eurasian-collared-dove", "rock-pigeon",
  "red-shouldered-hawk", "sharp-shinned-hawk", "allens-hummingbird", "broad-billed-hummingbird",
  "black-billed-cuckoo", "yellow-billed-cuckoo",
];

const CATALOG_SLUGS = new Set(birdCatalog.map((b) => b.slug));
const PROFILE_CANDIDATES = new Set([...LOCATION_BIRD_SLUGS, ...Object.keys(birdEditorial), ...BACKYARD_EXTRAS].filter((slug) => CATALOG_SLUGS.has(slug)));

function hasAnyStateEvidence(slug: string): boolean {
  return OCCURRENCE_STATES.some((state) => hasOccurrenceEvidence(state, slug));
}

let profileSet: Set<string> | undefined;

/** Published (and indexable) /birds/[slug] profiles. */
export function getPublishedBirdSlugs(): Set<string> {
  if (profileSet) return profileSet;
  profileSet = new Set(
    [...PROFILE_CANDIDATES].filter((slug) => {
      if (birdEditorial[slug]) return true;
      const snapshot = getBirdSnapshot(slug);
      return (snapshot && isBirdIndexEligible(snapshot)) || hasAnyStateEvidence(slug) || getPublishedStatesForBird(slug).length > 0;
    }),
  );
  return profileSet;
}

export function isBirdProfilePublished(slug: string): boolean {
  return getPublishedBirdSlugs().has(slug);
}

// ─── Links ─────────────────────────────────────────────────────

/** Best published destination for a bird card in a state: the State × bird page, else the profile, else none. */
export function birdInStateHref(stateSlug: string, birdSlug: string): string | null {
  if (isComboPublished(stateSlug, birdSlug)) return comboPath(stateSlug, birdSlug);
  if (isBirdProfilePublished(birdSlug)) return `/birds/${birdSlug}`;
  return null;
}
