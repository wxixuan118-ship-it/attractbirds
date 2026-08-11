import { birdCatalog } from "../../data/bird-catalog";
import { US_STATES_DATA } from "../../data/us-states-data";
import { getComboStaticParams } from "../../lib/location-repository";
import { indexedSeasonalBirds, seasonSlugs } from "../../lib/seasonal-repository";

const ORIGIN = "https://attractbirds.app";
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
    "/feeders/platform-feeder",
    "/plants/attract-hummingbirds",
  ]);

  for (const bird of birdCatalog) paths.add(`/birds/${bird.slug}`);
  for (const season of seasonSlugs) {
    paths.add(`/seasonal-birds/${season}`);
    for (const bird of indexedSeasonalBirds) paths.add(`/seasonal-birds/${season}/${bird.slug}`);
  }
  for (const state of US_STATES_DATA) paths.add(`/birds-by-location/${state.slug}`);
  for (const item of getComboStaticParams()) paths.add(`/birds-by-location/${item.state}/${item.slug}`);

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
