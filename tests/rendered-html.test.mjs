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
  assert.ok((sitemap.match(/<url>/g) ?? []).length >= 150);

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

test("renders quality-gated plant SEO routes", async () => {
  const hub = await render("/plants");
  assert.equal(hub.status, 200);
  assert.match(await hub.text(), /Grow habitat/);

  const plant = await render("/plants/cardinal-flower");
  assert.equal(plant.status, 200);
  const plantHtml = await plant.text();
  assert.match(plantHtml, /Lobelia cardinalis/);
  assert.match(plantHtml, /FAQPage/);

  const relationship = await render("/plants/for/ruby-throated-hummingbird");
  assert.equal(relationship.status, 200);
  assert.match(await relationship.text(), /Plants for.*Ruby-throated Hummingbirds/s);

  const location = await render("/plants/california/native-plants");
  assert.equal(location.status, 200);
  assert.match(await location.text(), /Planning preview/);
});

test("renders quality-gated feeder routes and calculator", async () => {
  const hub = await render("/feeders");
  assert.equal(hub.status, 200);
  assert.match(await hub.text(), /Choose a feeder/);

  const type = await render("/feeders/tube-feeder");
  assert.equal(type.status, 200);
  const typeHtml = await type.text();
  assert.match(typeHtml, /Tube Feeder/);
  assert.match(typeHtml, /FAQPage/);

  const bird = await render("/feeders/for/northern-cardinal");
  assert.equal(bird.status, 200);
  assert.match(await bird.text(), /Feeder types for Northern Cardinals/);

  const food = await render("/feeders/for/nectar");
  assert.equal(food.status, 200);
  assert.match(await food.text(), /Feeders for Hummingbird Nectar/);

  const problem = await render("/feeders/squirrel-proof");
  assert.equal(problem.status, 200);
  assert.match(await problem.text(), /Squirrel-resistant/);

  const comparison = await render("/feeders/compare/tube-vs-hopper");
  assert.equal(comparison.status, 200);
  assert.match(await comparison.text(), /Tube Feeder vs Hopper Feeder/);

  const state = await render("/feeders/california");
  assert.equal(state.status, 200);
  assert.match(await state.text(), /noindex/);

  const calculator = await render("/tools/bird-feeder-calculator");
  assert.equal(calculator.status, 200);
  assert.match(await calculator.text(), /Bird feeder planner/);
});

test("renders keyword-mapped pillar, food, bird, and plant pages", async () => {
  const pillar = await render("/how-to-attract");
  assert.equal(pillar.status, 200);
  const pillarHtml = await pillar.text();
  assert.match(pillarHtml, /How to attract birds/);
  assert.match(pillarHtml, /HowTo/);

  const food = await render("/bird-food");
  assert.equal(food.status, 200);
  assert.match(await food.text(), /Bird food/);

  const oriole = await render("/birds/oriole");
  assert.equal(oriole.status, 200);
  assert.match(await oriole.text(), /Oriole birds/);

  const killdeer = await render("/birds/killdeer");
  assert.equal(killdeer.status, 200);
  assert.match(await killdeer.text(), /two black breast bands/);

  const plant = await render("/plants/bird-of-paradise");
  assert.equal(plant.status, 200);
  const plantHtml = await plant.text();
  assert.match(plantHtml, /Strelitzia reginae/);
  assert.match(plantHtml, /FAQPage/);
});

test("renders the complete how-to-attract-birds topic cluster", async () => {
  const pillar = await render("/how-to-attract");
  const pillarHtml = await pillar.text();
  assert.equal(pillar.status, 200);
  assert.match(pillarHtml, /href="\/how-to-attract\/birds-to-a-bird-bath"/);
  assert.match(pillarHtml, /href="\/how-to-attract\/birds-that-eat-yard-pests"/);

  const paths = [
    "/how-to-attract/birds-to-your-yard", "/how-to-attract/birds-to-a-feeder",
    "/how-to-attract/birds-to-a-new-feeder", "/how-to-attract/birds-to-a-bird-bath",
    "/how-to-attract/birds-without-a-feeder", "/how-to-attract/birds-with-sounds",
    "/how-to-attract/birds-to-your-hand", "/how-to-attract/birds-in-winter",
    "/how-to-attract/birds-to-a-balcony", "/how-to-attract/birds-to-a-birdhouse",
    "/how-to-attract/birds-that-eat-yard-pests",
  ];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /FAQPage/, path);
    assert.match(html, /Continue planning/, path);
  }
  const redirects = {
    "/how-to-attract-birds": "/how-to-attract",
    "/how-to-attract-birds-to-your-yard": "/how-to-attract/birds-to-your-yard",
    "/how-to-attract-birds-to-feeder": "/how-to-attract/birds-to-a-feeder",
    "/new-bird-feeder-tips": "/how-to-attract/birds-to-a-new-feeder",
    "/attract-birds-to-bird-bath": "/how-to-attract/birds-to-a-bird-bath",
    "/attract-birds-without-feeder": "/how-to-attract/birds-without-a-feeder",
    "/attract-birds-with-sounds": "/how-to-attract/birds-with-sounds",
    "/attract-birds-to-your-hand": "/how-to-attract/birds-to-your-hand",
    "/attract-birds-in-winter": "/how-to-attract/birds-in-winter",
    "/attract-birds-to-balcony": "/how-to-attract/birds-to-a-balcony",
    "/attract-birds-to-birdhouse": "/how-to-attract/birds-to-a-birdhouse",
    "/birds-that-eat-yard-pests": "/how-to-attract/birds-that-eat-yard-pests",
  };
  for (const [source, destination] of Object.entries(redirects)) {
    const legacy = await render(source);
    assert.equal(legacy.status, 301, source);
    assert.equal(new URL(legacy.headers.get("location")).pathname, destination, source);
  }
  const unknown = await render("/not-a-real-attraction-guide");
  assert.equal(unknown.status, 404);
});

test("enforces bird and location index eligibility", async () => {
  const reviewed = await render("/birds/northern-cardinal");
  assert.equal(reviewed.status, 200);
  assert.match(await reviewed.text(), /name="robots" content="index, follow"/);

  const taxonomyOnly = await render("/birds/highland-tinamou");
  assert.equal(taxonomyOnly.status, 200);
  assert.match(await taxonomyOnly.text(), /name="robots" content="noindex, follow"/);

  const combo = await render("/birds-by-location/california/northern-cardinal");
  assert.equal(combo.status, 200);
  assert.match(await combo.text(), /name="robots" content="noindex, follow"/);

  const sitemap = await (await render("/sitemap.xml")).text();
  assert.match(sitemap, /\/birds\/northern-cardinal/);
  assert.doesNotMatch(sitemap, /\/birds\/highland-tinamou/);
  assert.doesNotMatch(sitemap, /\/birds-by-location\/california\/northern-cardinal/);
  assert.doesNotMatch(sitemap, /\/attract-birds-to-bird-bath/);
  assert.doesNotMatch(sitemap, /\/how-to-attract-birds/);
  assert.match(sitemap, /https:\/\/attractbirds\.app\/how-to-attract<\/loc>/);
  assert.match(sitemap, /\/how-to-attract\/birds-to-a-bird-bath/);
  assert.ok((sitemap.match(/<url>/g) ?? []).length < 300);
});
