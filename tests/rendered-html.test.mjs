import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(path = "/") {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept:"text/html" } }), { ASSETS:{ fetch:async()=>new Response("Not found",{status:404}) } }, { waitUntil(){}, passThroughOnException(){} });
}

test("renders the AttractBirds homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Bring more/);
  assert.match(html, /AttractBirds\.app/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("serves crawlable sitemap and robots files", async () => {
  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /application\/xml/);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<urlset/);
  assert.match(sitemap, /https:\/\/attractbirds\.app\/birds\/northern-cardinal/);
  assert.match(sitemap, /https:\/\/attractbirds\.app\/birds-by-location\/california/);
  assert.ok((sitemap.match(/<url>/g) ?? []).length >= 6000);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/attractbirds\.app\/sitemap\.xml/);
});

test("renders encyclopedia and location detail pages", async () => {
  const encyclopedia = await render("/birds");
  assert.equal(encyclopedia.status, 200);
  assert.match(await encyclopedia.text(), /1,000|1000/);

  const bird = await render("/birds/highland-tinamou");
  assert.equal(bird.status, 200);
  assert.match(await bird.text(), /Nothocercus bonapartei/);

  const location = await render("/birds-by-location/california/los-angeles");
  assert.equal(location.status, 200);
  assert.match(await location.text(), /Birds in/);
});

test("location landing exposes direct state links", async () => {
  const response = await render("/birds-by-location");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<a[^>]+href="\/birds-by-location\/california"[^>]*class="state-card"/);
  assert.match(html, /<a[^>]+href="\/birds-by-location\/texas"[^>]*class="us-map-tile/);
});

test("renders quality-gated seasonal SEO routes", async () => {
  const hub = await render("/seasonal-birds");
  assert.equal(hub.status, 200);
  assert.match(await hub.text(), /Seasonal bird guides/);

  const season = await render("/seasonal-birds/spring");
  assert.equal(season.status, 200);
  assert.match(await season.text(), /Spring.*birds by state/s);

  const species = await render("/seasonal-birds/spring/american-robin");
  assert.equal(species.status, 200);
  const speciesHtml = await species.text();
  assert.match(speciesHtml, /American Robin.*in.*Spring/s);
  assert.match(speciesHtml, /FAQPage/);

  const state = await render("/seasonal-birds/winter/ohio");
  assert.equal(state.status, 200);
  assert.match(await state.text(), /Planning preview/);
});
