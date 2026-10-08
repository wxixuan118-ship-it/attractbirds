import { US_STATES_DATA } from "../../data/us-states-data";
import { indexedSeasonalBirds, seasonSlugs } from "../../lib/seasonal-repository";
import { OCCURRENCE_STATES } from "../../lib/occurrence-data";
import { indexedPlants, plantCategories } from "../../lib/plant-repository";
import { plantPurposes } from "../../data/pilot-plants";
import { feederComparisons, feederFoods, feederGuides, feederProblems } from "../../data/pilot-feeders";
import { pilotBirds } from "../../data/pilot-birds";
import { attractionGuides, attractionGuidePath } from "../../data/attraction-guides";
import { birdEditorial } from "../../data/editorial/birds";
import { SITE, URL_REGISTRY } from "../../lib/url-registry";
import { speciesAttractionGuides } from "../../data/species-attraction-guides";
import { getPublishedBirdSlugs } from "../../lib/indexing";
import LASTMOD from "../../data/lastmod.json";

const ORIGIN = SITE.origin;
const FILE_DATES = LASTMOD as Record<string, string>;

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  })[character] ?? character);
}

/**
 * The files a URL is rendered from. <lastmod> is the newest git date among
 * them (data/lastmod.json, written by scripts/generate-lastmod.mjs). Shared
 * chrome (header, footer, layout) is deliberately not a source.
 */
function sourcesFor(path: string): string[] {
  const [, a = "", b = ""] = path.split("/");
  switch (a) {
    case "":
      return ["app/page.tsx", "data/editorial/misc.ts"];
    case "birds-by-location":
      if (!b) return ["app/birds-by-location/page.tsx"];
      return ["app/birds-by-location/[state]/page.tsx", "lib/location-repository.ts", `data/occurrences/${b}.json`, `data/state-content/${b}.ts`];
    case "birds":
      if (!b) return ["app/birds/page.tsx", "data/editorial/misc.ts"];
      if (b === "oriole") return ["app/birds/oriole/page.tsx"];
      return ["app/birds/[slug]/page.tsx", ...(birdEditorial[b] ? ["data/editorial/birds.ts"] : ["lib/bird-repository.ts"])];
    case "seasonal-birds":
      if (!b) return ["app/seasonal-birds/page.tsx", "data/editorial/seasonal.ts"];
      return ["app/seasonal-birds/[season]/page.tsx", "app/components/SeasonData.tsx", "data/editorial/seasonal.ts", ...OCCURRENCE_STATES.map((state) => `data/occurrences/${state}.json`)];
    case "feeders":
      return [b === "compare" ? "app/feeders/compare/[comparison]/page.tsx" : b === "for" ? "app/feeders/for/[target]/page.tsx" : b ? "app/feeders/[slug]/page.tsx" : "app/feeders/page.tsx", "data/editorial/feeders.ts", "data/pilot-feeders.ts"];
    case "plants":
      if (b === "bird-of-paradise") return ["app/plants/bird-of-paradise/page.tsx"];
      return [b === "for" ? "app/plants/for/[bird]/page.tsx" : b ? "app/plants/[slug]/page.tsx" : "app/plants/page.tsx", "data/editorial/plants.ts", "data/pilot-plants.ts"];
    case "how-to-attract":
      return [b === "species" || b === "bluebirds" ? `app/how-to-attract/${b}/page.tsx` : b ? "app/how-to-attract/[slug]/page.tsx" : "app/how-to-attract/page.tsx", "data/editorial/howto.ts", "data/attraction-guides.ts", "data/species-attraction-guides.ts"];
    case "tools":
      return [b ? `app/tools/${b}/page.tsx` : "app/tools/page.tsx"];
    case "bird-food":
      return ["app/bird-food/page.tsx", "data/editorial/misc.ts"];
    case "bird-problems":
      return [`app/bird-problems/${b}/page.tsx`, "data/editorial/misc.ts"];
    default:
      return [];
  }
}

function lastModified(path: string): string | undefined {
  return sourcesFor(path).map((file) => FILE_DATES[file]).filter(Boolean).sort().pop();
}

export async function GET() {
  // Every URL here renders with `index, follow`; non-indexable routes are not generated at all (lib/indexing.ts).
  const paths = new Set<string>([
    "/",
    "/birds",
    "/seasonal-birds",
    "/birds-by-location",
    "/bird-problems/no-birds-at-feeder",
    URL_REGISTRY.howTo.hub,
    "/how-to-attract/species",
    "/bird-food",
    "/birds/oriole",
    "/plants/bird-of-paradise",
    "/plants/native-plants",
    "/feeders",
    URL_REGISTRY.tools.hub,
    URL_REGISTRY.tools.feederCalculator,
    URL_REGISTRY.tools.nectarCalculator,
    URL_REGISTRY.tools.birdFinder,
    "/plants",
  ]);

  for (const slug of getPublishedBirdSlugs()) paths.add(`/birds/${slug}`);
  for (const guide of attractionGuides) paths.add(attractionGuidePath(guide));
  for (const guide of speciesAttractionGuides) paths.add(URL_REGISTRY.howTo.species(guide.slug));
  for (const feeder of feederGuides) paths.add(`/feeders/${feeder.slug}`);
  for (const bird of pilotBirds) paths.add(`/feeders/for/${bird.slug}`);
  for (const food of Object.keys(feederFoods)) paths.add(`/feeders/for/${food}`);
  for (const problem of Object.keys(feederProblems)) paths.add(`/feeders/${problem}`);
  for (const comparison of Object.keys(feederComparisons)) paths.add(`/feeders/compare/${comparison}`);
  for (const plant of indexedPlants) paths.add(`/plants/${plant.slug}`);
  for (const slug of Object.keys(plantCategories)) paths.add(`/plants/${slug}`);
  for (const slug of Object.keys(plantPurposes)) paths.add(`/plants/${slug}`);
  for (const bird of indexedSeasonalBirds) paths.add(`/plants/for/${bird.slug}`);
  for (const season of seasonSlugs) paths.add(`/seasonal-birds/${season}`);
  for (const state of US_STATES_DATA) paths.add(`/birds-by-location/${state.slug}`);

  const body = [...paths]
    .sort()
    .map((path) => {
      const lastmod = lastModified(path);
      return `  <url><loc>${escapeXml(`${ORIGIN}${path}`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
