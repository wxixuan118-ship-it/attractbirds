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
  assert.match(html, /<h1>How to attract birds/);
  assert.match(html, /"@type":"HowTo"/);
  assert.match(html, /href="\/birds"[^>]*class="module-card entry-card"/);
  assert.match(html, /href="\/birds-by-location"[^>]*class="module-card entry-card"/);
  assert.match(html, /href="\/tools\/bird-feeder-calculator"[^>]*class="module-card entry-card"/);
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

test("keeps all state hub pages explicitly indexable", async () => {
  for (const state of ["california", "texas", "new-york", "florida", "alaska", "hawaii"]) {
    const response = await render(`/birds-by-location/${state}`);
    assert.equal(response.status, 200, state);
    const html = await response.text();
    assert.match(html, /name="robots" content="index, follow"/, state);
    assert.match(html, new RegExp(`rel="canonical" href="https://attractbirds\\.app/birds-by-location/${state}"`), state);
  }
  const sitemap = await (await render("/sitemap.xml")).text();
  const stateUrls = sitemap.match(/<loc>https:\/\/attractbirds\.app\/birds-by-location\/[a-z-]+<\/loc>/g) ?? [];
  assert.equal(stateUrls.length, 50);
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
  assert.match(await problem.text(), /Squirrel Proof Bird Feeder/);

  const comparison = await render("/feeders/compare/tube-vs-hopper");
  assert.equal(comparison.status, 200);
  assert.match(await comparison.text(), /Tube vs Hopper Feeder/);

  const state = await render("/feeders/california");
  assert.equal(state.status, 200);
  assert.match(await state.text(), /noindex/);

  const calculator = await render("/tools/bird-feeder-calculator");
  assert.equal(calculator.status, 200);
  assert.match(await calculator.text(), /Bird Feeder Calculator/);
});

test("renders keyword-mapped pillar, food, bird, and plant pages", async () => {
  const pillar = await render("/how-to-attract");
  assert.equal(pillar.status, 200);
  const pillarHtml = await pillar.text();
  assert.match(pillarHtml, /How to attract birds/);
  assert.match(pillarHtml, /"@type":"(HowTo|Article)"/);

  const food = await render("/bird-food");
  assert.equal(food.status, 200);
  assert.match(await food.text(), /Bird Feed Guide/);

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
    // Editorial guides end with a shared cross-link block; legacy guides with a "Continue planning" section.
    assert.match(html, /More attraction guides|Continue planning/, path);
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
    const location = new URL(legacy.headers.get("location"));
    assert.equal(location.origin, "https://attractbirds.app", source);
    assert.equal(location.pathname, destination, source);
  }
  const unknown = await render("/not-a-real-attraction-guide");
  assert.equal(unknown.status, 404);
});

test("renders twelve indexable species attraction guides", async () => {
  const species = [
    "northern-cardinal", "american-robin", "blue-jay", "american-goldfinch",
    "black-capped-chickadee", "tufted-titmouse", "house-finch", "mourning-dove",
    "downy-woodpecker", "ruby-throated-hummingbird", "baltimore-oriole", "killdeer",
  ];
  const sitemap = await (await render("/sitemap.xml")).text();
  const index = await render("/how-to-attract/species");
  assert.equal(index.status, 200);
  const indexHtml = await index.text();
  for (const slug of species) {
    const path = `/how-to-attract/${slug}`;
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /species (attraction )?guide/i, path);
    assert.match(html, /"@type":"(HowTo|Article)"/, path);
    assert.match(html, /FAQPage/, path);
    assert.match(html, new RegExp(`rel="canonical" href="https://attractbirds\\.app${path}"`), path);
    assert.match(sitemap, new RegExp(`${path.replaceAll("-", "\\-")}<\\/loc>`), path);
    assert.match(indexHtml, new RegExp(`href="${path.replaceAll("-", "\\-")}"`), path);
  }
  const killdeer = await (await render("/how-to-attract/killdeer")).text();
  assert.match(killdeer, /not feeder birds|not a feeder/i);
});

test("renders a researched bluebird attraction guide with keyword-focused TDK", async () => {
  const response = await render("/how-to-attract/bluebirds");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>How to Attract Bluebirds: Nest Boxes, Open Ground &amp; Food<\/title>/);
  assert.match(html, /name="description" content="How to attract bluebirds:/);
  assert.match(html, /rel="canonical" href="https:\/\/attractbirds\.app\/how-to-attract\/bluebirds"/);
  assert.match(html, /How to attract bluebirds with the right box in the right place/);
  assert.match(html, /Bluebird habitat, food and water/);
  assert.match(html, /FAQPage/);
  // Every claim is cited to NestWatch or Audubon's field guide.
  assert.match(html, /nestwatch\.org\/learn\/all-about-birdhouses\/birds\/eastern-bluebird/);
  assert.match(html, /audubon\.org\/field-guide\/bird\/eastern-bluebird/);
  const sitemap = await (await render("/sitemap.xml")).text();
  assert.match(sitemap, /https:\/\/attractbirds\.app\/how-to-attract\/bluebirds<\/loc>/);
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
  // ~150 core pages + 144 group × state pages; Bird×State pages are still excluded.
  assert.ok((sitemap.match(/<url>/g) ?? []).length < 500);
});

test("never renders template placeholders or www links", async () => {
  for (const path of ["/", "/birds", "/birds/seasonal", "/birds-by-location/florida", "/birds-by-location/arizona", "/birds-by-location/california/los-angeles", "/birds-by-location/florida/northern-cardinal", "/birds/highland-tinamou"]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /Taxonomy pending|>Varies<|Steady winter residents|See profile</, path);
    assert.doesNotMatch(html, /https?:\/\/www\.attractbirds\.app/, path);
    assert.doesNotMatch(html, /<form[^>]+class="bird-profile-form"/, path);
  }
  const sitemap = await (await render("/sitemap.xml")).text();
  assert.doesNotMatch(sitemap, /www\.attractbirds\.app/);
});

test("bird cards are plain anchors carrying the full bird name", async () => {
  // Render the encyclopedia first: it must not reorder the shared bird list the homepage features.
  await render("/birds");
  const home = await (await render("/")).text();
  assert.match(home, /<a href="\/birds\/northern-cardinal" class="bird-card" aria-label="Northern Cardinal">/);
  const florida = await (await render("/birds-by-location/florida")).text();
  assert.match(florida, /<a href="\/birds-by-location\/florida\/northern-mockingbird" class="loc-bird-card" aria-label="Northern Mockingbird">/);
});

test("state bird calendars follow the state's climate", async () => {
  const florida = await (await render("/birds-by-location/florida")).text();
  assert.doesNotMatch(florida, /Dark-eyed Junco/, "juncos are not a Florida calendar bird");
  const calendar = (html) => html.slice(html.indexOf("by Month</h2>"), html.indexOf("Birds by Habitat in"));
  const flCalendar = calendar(florida);
  const julyBlock = flCalendar.slice(flCalendar.indexOf(">July<"), flCalendar.indexOf(">August<"));
  assert.doesNotMatch(julyBlock, /winter/i);
  assert.match(julyBlock, /Northern Mockingbird|Northern Cardinal|Carolina Wren|Ruby-throated Hummingbird|Blue Jay|Mourning Dove|White Ibis/);

  const california = await (await render("/birds-by-location/california")).text();
  assert.doesNotMatch(calendar(california), /Blue Jay|Ruby-throated Hummingbird|Northern Cardinal/);
  assert.match(calendar(california), /Anna's Hummingbird|California Scrub-Jay/);

  const minnesota = await (await render("/birds-by-location/minnesota")).text();
  const mnJanuary = calendar(minnesota).slice(calendar(minnesota).indexOf(">January<"), calendar(minnesota).indexOf(">February<"));
  assert.doesNotMatch(mnJanuary, /Ruby-throated Hummingbird|Baltimore Oriole/);

  const combo = await (await render("/birds-by-location/california/blue-jay")).text();
  assert.match(combo, /Not regularly recorded/);
  const resident = await (await render("/birds-by-location/florida/northern-cardinal")).text();
  assert.match(resident, /Year-round resident/);
  assert.doesNotMatch(resident, /best seen in January, February, March/);
});

test("researched state pages carry cited content, a licensed hero image, and structured data", async () => {
  for (const state of ["florida", "arizona", "california", "colorado", "oregon", "tennessee", "texas", "michigan", "rhode-island"]) {
    const html = await (await render(`/birds-by-location/${state}`)).text();
    assert.match(html, new RegExp(`<img src="/images/states/${state}-[a-z-]+\\.webp" alt="[^"]+" width="\\d+" height="\\d+"`), state);
    assert.match(html, /"@type":"FAQPage"/, state);
    assert.match(html, /"@type":"ItemList"/, state);
    assert.match(html, /eBird Observation Dataset/, state);
    assert.match(html, /<title>Birds in [A-Za-z ]+: [^<|]+<\/title>/, state);
    assert.doesNotMatch(html, /Steady winter residents|Taxonomy pending/, state);
  }
});

test("group × state pages render from occurrence data with image, FAQ and sitemap entries", async () => {
  const page = await render("/birds-by-location/florida/hummingbirds");
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /<title>Hummingbirds in Florida: Species &amp; When to See Them<\/title>/);
  assert.match(html, /name="robots" content="index, follow"/);
  assert.match(html, /<img src="\/images\/birds\/[a-z-]+\.webp" alt="[^"]*hummingbirds in Florida[^"]*" width="\d+" height="\d+"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /Ruby-throated Hummingbird/);
  assert.match(html, /eBird Observation Dataset/);
  // A group with no regular species in a state gets an honest "Are there…?" page backed by the same data.
  const absent = await render("/birds-by-location/rhode-island/magpies");
  assert.equal(absent.status, 200);
  const absentHtml = await absent.text();
  assert.match(absentHtml, /<title>Are There Magpies in Rhode Island\? What eBird Records Show<\/title>/);
  assert.match(absentHtml, /Not as regular birds/);
  assert.match(absentHtml, /<img src="\/images\/birds\/black-billed-magpie\.webp"/);
  const sitemap = await (await render("/sitemap.xml")).text();
  assert.match(sitemap, /https:\/\/attractbirds\.app\/birds-by-location\/florida\/hummingbirds/);
  assert.match(sitemap, /birds-by-location\/rhode-island\/magpies/);
});

test("editorial pages (feeders, plants, how-to, seasonal, misc) carry cited sources, a licensed image, FAQ and canonical", async () => {
  const samples = [
    ["/feeders/finch-mesh-feeder", /feederwatch\.org\/learn\/feeding-birds/],
    ["/feeders/for/mourning-dove", /allaboutbirds\.org\/guide\/Mourning_Dove/],
    ["/feeders/compare/suet-vs-seed", /feederwatch\.org/],
    ["/plants/cardinal-flower", /wildflower\.org\/plants\/result\.php\?id_plant=LOCA2/],
    ["/plants/for/american-goldfinch", /wildflower\.org\/plants/],
    ["/plants/native-plants", /audubon\.org\/content\/why-native-plants-matter/],
    ["/how-to-attract/birds-to-a-birdhouse", /nestwatch\.org/],
    ["/how-to-attract/birds-with-sounds", /aba\.org\/aba-code-of-birding-ethics/],
    ["/seasonal-birds/fall", /gbif\.org\/dataset\/4fa7b334/],
    ["/seasonal-birds/summer/ruby-throated-hummingbird", /eBird records by state/],
    ["/bird-problems/no-birds-at-feeder", /feederwatch\.org\/learn\/sick-birds/],
    ["/bird-food", /feederwatch\.org/],
    ["/tools/bird-feeder-calculator", /feederwatch\.org/],
    ["/birds", /checklist\.americanornithology\.org/],
    ["/", /feederwatch\.org/],
  ];
  for (const [path, source] of samples) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, source, path);
    assert.match(html, /<h2>Sources[^<]*<\/h2>/, path);
    assert.match(html, /<img src="\/images\/(birds|topics)\/[a-z-]+\.webp" alt="[^"]+" width="\d+" height="\d+"/, path);
    assert.match(html, /"@type":"FAQPage"/, path);
    assert.match(html, new RegExp(`rel="canonical" href="https://attractbirds\\.app${path === "/" ? "/?" : path.replaceAll("-", "\\-")}"`), path);
    assert.match(html, /name="robots" content="index, follow"/, path);
    // Citation markers link straight to the source list.
    assert.match(html, /<sup class="cite"><a href="https?:\/\/[^"]+" rel="noopener noreferrer"/, path);
  }
});
