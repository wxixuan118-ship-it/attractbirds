# Seasonal Birds Programmatic SEO Architecture

## Executive decision

Launch in quality-gated layers. Index the hub, four season pages, and season × reviewed-species pages. Generate season × state previews but keep them `noindex,follow` until licensed monthly occurrence data is present. Do not create season × state × 1,000 species pages merely because the Cartesian product exists.

## URL architecture and index policy

| Layer | Pattern | Potential | Initial index policy |
|---|---|---:|---|
| Hub | `/seasonal-birds/` | 1 | Index |
| Season | `/seasonal-birds/{season}/` | 4 | Index |
| Season × state | `/seasonal-birds/{season}/{state}/` | 200 | Noindex until occurrence-data gate passes |
| Season × reviewed species | `/seasonal-birds/{season}/{bird}/` | 4,000 | Index only reviewed/data-backed species; 40 initially |
| Season × country | `/seasonal-birds/{season}/{country}/` | 400 | Future; index only countries with adequate data |
| Season × activity | `/seasonal-birds/{season}/{migration|nesting|feeding|backyard}/` | 16 | Future editorial hubs |
| Season × place × species | `/seasonal-birds/{season}/{place}/{bird}/` | 200,000+ for US states | Do not index by default; publish only proven-demand, data-rich combinations |

Potential arithmetic: 4 season pages + 200 US state pages + 400 country pages + 4,000 species pages + 16 activity pages. The theoretical state × species layer adds 200,000 URLs, but most would be thin, duplicative, or factually unsafe.

## Data model

| Table | Important fields | Type/example | Source |
|---|---|---|---|
| `birds` | id, slug, common_name, scientific_name, family, size, habitats | UUID/text/arrays | AOS/AviList taxonomy; reviewed editorial data |
| `seasons` | slug, hemisphere, start_month, end_month | `spring`, `north`, 3, 5 | Editorial configuration |
| `locations` | id, type, country_code, state_code, lat, lng, flyway | `state`, `US-CA`, `Pacific` | US Census/geospatial reference data |
| `migration_data` | bird_id, location_id, week, relative_abundance, presence, confidence, source_id | week 17, 0.31, passage | Licensed occurrence/model output |
| `seasonal_activity` | bird_id, location_id, season_id, arrival_week, departure_week, activity_level, sample_size | spring, 10, 22, common, 1482 | Aggregated monthly/weekly observations |
| `feeding_behavior` | bird_id, season_id, food_id, context, evidence_level | winter, sunflower, supplemental, reviewed | Reviewed species accounts |
| `nesting_behavior` | bird_id, location_id, start_week, end_week, nest_type, disturbance_note | 15, 30, cup | Reviewed breeding phenology |
| `sources` | organization, dataset_version, license, commercial_use_allowed, retrieved_at | GBIF, CC BY 4.0 | Provenance registry |

Every derived row needs `source_id`, dataset version, confidence, sample size, retrieval date, and commercial-use status.

## Reusable “Spring Birds in California” template

- Title: `Spring Birds in California: Migration, Nesting & Backyard Guide`
- Description: `Discover spring birds in California, migration timing, nesting activity, feeder priorities, native plants, and the best places and times to watch.`
- H1: `Spring Birds in California`
- Unique introduction using state habitats, flyway, climate, and verified seasonal signal.
- Ranked species list with frequency/confidence and links to bird profiles.
- Migration arrivals/departures and uncertainty note.
- Feeding guidance, feeder hygiene, and nesting-disturbance safeguards.
- Best observation windows and named local habitats/hotspots.
- Regionally appropriate plants; never imply nativity without state validation.
- Related state, species, feeder, identification, and migration guides.
- `BreadcrumbList`, `Article`, and visible `FAQPage` structured data.

## Data sources and commercial-use guardrails

1. AOS/AviList: taxonomy identity and accepted names.
2. GBIF-hosted datasets: use only dataset records whose license permits the intended commercial publication; preserve dataset and occurrence attribution.
3. eBird Basic Dataset/Status & Trends: valuable for seasonal abundance, but website/commercial usage is governed by Cornell terms. Obtain written permission before publishing derived web products.
4. USGS: use public reports and datasets for validated phenology or flyway context; record publication-level provenance.
5. BirdLife DataZone: global range layers exist, but download/license terms must be reviewed before web redistribution.
6. iNaturalist: observation API can support corroboration; honor per-observation photo licenses and do not treat opportunistic counts as effort-corrected abundance.
7. Audubon: use editorial facts only with permission or citation; do not scrape or republish proprietary accounts/maps.

## Internal linking

- Season hub → `spring bird migration`, `summer nesting birds`, `fall migrant birds`, `winter feeder birds`.
- Season page → `American Robin in spring`, `spring birds in California`, `best feeders for spring birds`.
- Species-season page → full species profile, relevant state pages, feeder/plant guides, and adjacent seasons.
- State-season page → canonical state guide, verified species-season pages, habitat guides, and neighboring states.
- Avoid orphan pages; require at least three contextual inbound links before indexing.

## Twenty launch examples

| URL | Target keyword | Intent | Title/content angle |
|---|---|---|---|
| `/seasonal-birds/spring/` | spring birds | seasonal overview | Spring Birds: Migration, Nesting & Backyard Guide |
| `/seasonal-birds/summer/` | summer backyard birds | support breeding birds | Summer Birds: Water, Insects & Nesting |
| `/seasonal-birds/fall/` | fall migrating birds | migration planning | Fall Birds: Migration & Refueling Guide |
| `/seasonal-birds/winter/` | winter feeder birds | feeding/support | Winter Birds: Feeders, Water & Shelter |
| `/seasonal-birds/spring/american-robin/` | american robin in spring | species timing | Robin movement, nesting, lawn and fruit guidance |
| `/seasonal-birds/winter/dark-eyed-junco/` | dark eyed junco winter | winter presence | Range caveat, ground feeding, shelter |
| `/seasonal-birds/spring/ruby-throated-hummingbird/` | when hummingbirds arrive | arrival intent | Migration variability and nectar safety |
| `/seasonal-birds/fall/ruby-throated-hummingbird/` | hummingbird fall migration | departure intent | Refueling and feeder timing |
| `/seasonal-birds/summer/american-goldfinch/` | goldfinch nesting season | nesting intent | Late nesting, seed plants, disturbance safety |
| `/seasonal-birds/winter/black-capped-chickadee/` | chickadees in winter | support intent | Energy, cover, feeder hygiene |
| `/seasonal-birds/spring/california/` | spring birds california | local discovery | Pacific Flyway/habitat preview; noindex until data-backed |
| `/seasonal-birds/winter/texas/` | winter birds texas | local discovery | Regional habitats/flyway preview; noindex initially |
| `/seasonal-birds/fall/new-york/` | fall migration new york | migration discovery | Atlantic Flyway preview; noindex initially |
| `/seasonal-birds/summer/florida/` | summer birds florida | local discovery | Breeding/wetland preview; noindex initially |
| `/seasonal-birds/spring/arizona/` | spring birds arizona | destination planning | Desert/sky-island preview; noindex initially |
| `/seasonal-birds/winter/minnesota/` | winter birds minnesota | local support | Cold-weather preview; noindex initially |
| `/seasonal-birds/fall/oregon/` | fall birds oregon | migration discovery | Pacific habitats preview; noindex initially |
| `/seasonal-birds/summer/colorado/` | summer birds colorado | elevation/nesting | Elevation habitat preview; noindex initially |
| `/seasonal-birds/spring/northern-cardinal/` | cardinal in spring | nesting/behavior | Residency, territorial activity, cover |
| `/seasonal-birds/winter/downy-woodpecker/` | downy woodpecker winter | feeder/support | Suet, deadwood, tree habitat, hygiene |

## Technical implementation

- Next/vinext `generateStaticParams` creates four season routes, 200 state previews, and 40 reviewed species combinations.
- Metadata sets canonical URLs and applies `noindex,follow` to state previews.
- Sitemap includes only the hub, seasons, and reviewed species combinations.
- FAQ JSON-LD is emitted only when matching questions and answers are visibly rendered.
- In Supabase/PostgreSQL, materialize aggregated seasonal rows rather than querying raw observations at page render time; index `(location_id, season_id, activity_level)` and `(bird_id, location_id, season_id)`.

## Helpful-content quality gate

An indexable combination must have: a verified presence signal; location/season-specific introduction; at least eight supported species or one deeply reviewed species; observation timing; habitat guidance; feeding/nesting safety; visible methodology/source note; three internal links; and no unresolved placeholders. AI may improve phrasing and structure, but must not invent arrival dates, abundance, range, plant nativity, or feeding recommendations. Those fields must come from licensed data or editorial review.

## Six-month roadmap

1. Month 1 — finalize licensing, provenance schema, aggregation jobs, and 10-species/5-state validation set.
2. Month 2 — publish 4 hubs + 40 reviewed species pages; load data for the first 1,000 qualified combinations.
3. Month 3 — strengthen contextual internal linking, breadcrumbs, sitemaps, FAQs, and Search Console monitoring.
4. Month 4 — open state pages that pass the gate; add Canada provinces only after equivalent data coverage.
5. Month 5 — earn authority through methodology pages, expert review, citations, original tools, and legitimate outreach.
6. Month 6 — add relevant feeder/plant affiliates or ads without obscuring content; monitor RPM, engagement, crawl waste, and page cohorts.
