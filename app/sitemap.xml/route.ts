import { US_STATES_DATA } from "../../data/us-states-data";
import { indexedSeasonalBirds, seasonSlugs } from "../../lib/seasonal-repository";
import { indexedPlants, plantCategories } from "../../lib/plant-repository";
import { plantPurposes } from "../../data/pilot-plants";
import { feederComparisons, feederFoods, feederGuides, feederProblems } from "../../data/pilot-feeders";
import { pilotBirds } from "../../data/pilot-birds";
import { attractionGuides, attractionGuidePath } from "../../data/attraction-guides";
import { getIndexEligibleBirds } from "../../lib/bird-repository";
import { SITE, URL_REGISTRY } from "../../lib/url-registry";

const ORIGIN = SITE.origin;
const LAST_MODIFIED = "2026-08-11";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  })[character] ?? character);
}

export async function GET() {
  const paths = new Set<string>([
    "/",
    "/birds",
    "/birds/seasonal",
    "/seasonal-birds",
    "/birds/california",
    "/birds-by-location",
    "/bird-problems/no-birds-at-feeder",
    URL_REGISTRY.howTo.hub,
    "/bird-food",
    "/birds/oriole",
    "/plants/bird-of-paradise",
    "/feeders",
    "/tools/bird-feeder-calculator",
    "/plants",
  ]);

  for (const bird of await getIndexEligibleBirds()) paths.add(`/birds/${bird.slug}`);
  for (const guide of attractionGuides) paths.add(attractionGuidePath(guide));
  for (const feeder of feederGuides) paths.add(`/feeders/${feeder.slug}`);
  for (const bird of pilotBirds) paths.add(`/feeders/for/${bird.slug}`);
  for (const food of Object.keys(feederFoods)) paths.add(`/feeders/for/${food}`);
  for (const problem of Object.keys(feederProblems)) paths.add(`/feeders/${problem}`);
  for (const comparison of Object.keys(feederComparisons)) paths.add(`/feeders/compare/${comparison}`);
  for (const plant of indexedPlants) paths.add(`/plants/${plant.slug}`);
  for (const slug of Object.keys(plantCategories)) paths.add(`/plants/${slug}`);
  for (const slug of Object.keys(plantPurposes)) paths.add(`/plants/${slug}`);
  for (const bird of indexedSeasonalBirds) paths.add(`/plants/for/${bird.slug}`);
  for (const season of seasonSlugs) {
    paths.add(`/seasonal-birds/${season}`);
    for (const bird of indexedSeasonalBirds) paths.add(`/seasonal-birds/${season}/${bird.slug}`);
  }
  for (const state of US_STATES_DATA) paths.add(`/birds-by-location/${state.slug}`);

  const body = [...paths]
    .sort()
    .map((path) => `  <url><loc>${escapeXml(`${ORIGIN}${path}`)}</loc><lastmod>${LAST_MODIFIED}</lastmod></url>`)
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
