export const SITE = { brand: "AttractBirds.app", origin: "https://attractbirds.app" } as const;

export const URL_REGISTRY = {
  home: "/",
  birds: { hub: "/birds", detail: (slug: string) => `/birds/${slug}`, seasonal: "/birds/seasonal", california: "/birds/california", oriole: "/birds/oriole" },
  locations: { hub: "/birds-by-location", state: (state: string) => `/birds-by-location/${state}`, detail: (state: string, slug: string) => `/birds-by-location/${state}/${slug}` },
  seasonal: { hub: "/seasonal-birds", season: (season: string) => `/seasonal-birds/${season}`, detail: (season: string, slug: string) => `/seasonal-birds/${season}/${slug}` },
  plants: { hub: "/plants", detail: (slug: string) => `/plants/${slug}`, forBird: (slug: string) => `/plants/for/${slug}`, nativeByState: (state: string) => `/plants/${state}/native-plants` },
  feeders: { hub: "/feeders", detail: (slug: string) => `/feeders/${slug}`, forTarget: (target: string) => `/feeders/for/${target}`, comparison: (slug: string) => `/feeders/compare/${slug}` },
  birdFood: "/bird-food",
  birdProblems: { noBirdsAtFeeder: "/bird-problems/no-birds-at-feeder" },
  tools: { feederCalculator: "/tools/bird-feeder-calculator" },
  howTo: { hub: "/how-to-attract", guide: (slug: string) => `/how-to-attract/${slug}` },
} as const;

export const HOW_TO_URLS = [
  { legacy: "/how-to-attract-birds-to-your-yard", slug: "birds-to-your-yard" },
  { legacy: "/how-to-attract-birds-to-feeder", slug: "birds-to-a-feeder" },
  { legacy: "/new-bird-feeder-tips", slug: "birds-to-a-new-feeder" },
  { legacy: "/attract-birds-to-bird-bath", slug: "birds-to-a-bird-bath" },
  { legacy: "/attract-birds-without-feeder", slug: "birds-without-a-feeder" },
  { legacy: "/attract-birds-with-sounds", slug: "birds-with-sounds" },
  { legacy: "/attract-birds-to-your-hand", slug: "birds-to-your-hand" },
  { legacy: "/attract-birds-in-winter", slug: "birds-in-winter" },
  { legacy: "/attract-birds-to-balcony", slug: "birds-to-a-balcony" },
  { legacy: "/attract-birds-to-birdhouse", slug: "birds-to-a-birdhouse" },
  { legacy: "/birds-that-eat-yard-pests", slug: "birds-that-eat-yard-pests" },
] as const;

export const HOW_TO_REDIRECTS: Readonly<Record<string, string>> = Object.freeze({
  "/how-to-attract-birds": URL_REGISTRY.howTo.hub,
  ...Object.fromEntries(HOW_TO_URLS.map(({ legacy, slug }) => [legacy, URL_REGISTRY.howTo.guide(slug)])),
});

export const HOW_TO_CANONICAL_BY_LEGACY_SLUG: Readonly<Record<string, string>> = Object.freeze(
  Object.fromEntries(HOW_TO_URLS.map(({ legacy, slug }) => [legacy.slice(1), slug])),
);

export function canonicalizeUrl(path: string) { return HOW_TO_REDIRECTS[path] ?? path; }
