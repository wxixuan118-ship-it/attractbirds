/**
 * Single source of truth for which programmatic pages exist and are indexable.
 *
 * Rule: a page we do not want indexed is not generated. Every route below either
 * renders with `index, follow` and is listed in the sitemap, redirects (retired
 * URLs), or returns 404 and receives no internal links. Page metadata, generateStaticParams, internal
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
import { BIRD_GROUP_BY_SLUG } from "../data/bird-groups";
import { classifyPresence, getStateOccurrences, OCCURRENCE_STATES } from "./occurrence-data";
import { getBirdSnapshot, isBirdIndexEligible } from "./bird-repository";

/** Bird slugs that once had State × bird pages; those URLs now redirect (see retiredLocationRedirect). */
export const LOCATION_BIRD_SLUGS = new Set<string>([...pilotBirds.map((b) => b.slug), ...birdWhitelist.map((b) => b.slug)]);

/** City pages that earned impressions before all state sub-pages were retired. */
const RETIRED_CITY_PATHS = new Set(GSC_LOCATION_PAGES.map(([path]) => path).filter((path) => !LOCATION_BIRD_SLUGS.has(path.split("/")[3])));

/** Birds whose retired State × bird pages earned impressions; their profiles stay published. */
const GSC_BIRD_SLUGS = new Set(GSC_LOCATION_PAGES.map(([path]) => path.split("/")[3]).filter((slug) => LOCATION_BIRD_SLUGS.has(slug)));

/** Bird has real eBird records in the state and is not rare there. */
function hasOccurrenceEvidence(stateSlug: string, birdSlug: string): boolean {
  const data = getStateOccurrences(stateSlug);
  const occ = data?.birds.find((b) => b.slug === birdSlug);
  if (!data || !occ || occ.total === 0) return false;
  return classifyPresence(occ, data.totalRecords).abundance !== "rare";
}

// ─── Retired sub-pages ─────────────────────────────────────────

type Redirect = { destination: string; permanent: boolean };

/**
 * Site structure from 2026-10-08: 50 state pages and 4 season pages link straight
 * to bird profiles, with nothing below them. Every former sub-page redirects:
 * - /birds-by-location/[state]/[bird] → /birds/[bird] (temporarily to the state
 *   page while a bird has no profile yet)
 * - /birds-by-location/[state]/[group] and the GSC city pages → the state page
 */
export function retiredLocationRedirect(stateSlug: string, slug: string): Redirect | null {
  if (!STATE_BY_SLUG[stateSlug]) return null;
  const statePage = `/birds-by-location/${stateSlug}`;
  if (LOCATION_BIRD_SLUGS.has(slug)) {
    return isBirdProfilePublished(slug) ? { destination: `/birds/${slug}`, permanent: true } : { destination: statePage, permanent: false };
  }
  if (BIRD_GROUP_BY_SLUG[slug] || RETIRED_CITY_PATHS.has(`${statePage}/${slug}`)) return { destination: statePage, permanent: true };
  return null;
}

/** /seasonal-birds/[season]/[bird] → /birds/[bird]; season pages list each state's birds instead. */
export function retiredSeasonalRedirect(birdSlug: string): Redirect | null {
  if (!pilotBirds.some((b) => b.slug === birdSlug) || !isBirdProfilePublished(birdSlug)) return null;
  return { destination: `/birds/${birdSlug}`, permanent: true };
}

/** States where the bird is regularly recorded in eBird data. */
export function getStatesWithBird(birdSlug: string): USState[] {
  return US_STATES_DATA.filter((s) => hasOccurrenceEvidence(s.slug, birdSlug));
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
      return (snapshot && isBirdIndexEligible(snapshot)) || hasAnyStateEvidence(slug) || GSC_BIRD_SLUGS.has(slug);
    }),
  );
  return profileSet;
}

export function isBirdProfilePublished(slug: string): boolean {
  return getPublishedBirdSlugs().has(slug);
}

// ─── Links ─────────────────────────────────────────────────────

/** Destination for a bird card in a state: the bird's profile, else none. */
export function birdInStateHref(_stateSlug: string, birdSlug: string): string | null {
  return isBirdProfilePublished(birdSlug) ? `/birds/${birdSlug}` : null;
}
