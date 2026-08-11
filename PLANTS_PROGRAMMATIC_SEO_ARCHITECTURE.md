# Plants Programmatic SEO Architecture

## Launch decision

Plants is the highest-commercial-intent content layer, but local nativity is not safely inferred from a broad range. Index the hub, reviewed plant profiles, evidence-backed bird relationship pages, and useful benefit/type collections. Generate state-native previews as `noindex,follow` until every recommendation has state/county distribution, invasive-risk, and horticultural data.

## URL architecture and index policy

| Layer | Pattern | Theoretical scale | Policy |
|---|---|---:|---|
| Hub | `/plants/` | 1 | Index |
| Encyclopedia | `/plants/{plant}/` | 1,000 | Index reviewed profiles only |
| Type | `/plants/{flowers|trees|shrubs|vines}/` | 4 | Index when collection has depth |
| Purpose | `/plants/{nectar-plants|berry-producing-plants|bird-seed-plants|nesting-plants|shelter-plants}/` | 5+ | Index |
| Bird relationship | `/plants/for/{bird}/` | 1,000 | Index only with supported relationships |
| Location | `/plants/{state}/native-plants/` | 50 US + later geographies | Noindex until every plant passes local validation |
| Season | `/plants/{spring|summer|fall|winter}-bird-plants/` | 4 | Future editorial collections |
| Location × bird | `/plants/{state}/native-plants-for-{bird}/` | 50,000 US combinations | Avoid by default; publish only proven-demand/data-rich cohorts |

The raw Cartesian space exceeds 1,000 plant profiles + 1,000 bird pages + 50,000 US state×bird pages + 500 purpose/season variants. Scale is not a reason to index.

## Database schema

| Table | Fields | Example/source |
|---|---|---|
| `plants` | id, slug, common_name, scientific_name, family, plant_type, height, status, quality_score | USDA taxonomy + editorial review |
| `plant_categories` | id, slug, label, definition | `shrub`, editorial taxonomy |
| `plant_benefits` | plant_id, benefit_type, season, evidence_level, source_id | nectar/berries/seeds/insects/nesting/shelter |
| `plant_bird_relationship` | plant_id, bird_id or bird_group_id, benefit_type, strength, evidence_level, source_id | Serviceberry → robin → fruit |
| `plant_locations` | plant_id, location_id, native_status, introduced_status, invasive_status, distribution_precision | USDA state/county distribution |
| `plant_seasons` | plant_id, location_id, bloom_start, bloom_end, fruit_start, fruit_end, confidence | Local phenology source |
| `plant_care` | plant_id, ecoregion, zones, sun, water, soil, mature_height, spread, toxicity | Lady Bird Johnson/local extension |
| `sources` | organization, URL, dataset version, license, allowed fields, retrieved_at | Provenance and commercial-use gate |

Normalize on accepted scientific name and stable source IDs. Store common-name synonyms separately. Never join by common name alone. Location data needs precision (`county`, `state`, `region`) and status (`native`, `introduced`, `cultivated`).

## Page templates

### Plants That Attract Hummingbirds

- Title: `Plants That Attract Hummingbirds: Native Flowers & Bloom Calendar`
- H1 and introduction matched to the reviewed hummingbird scope.
- Why tubular nectar flowers help, without implying exclusivity.
- Ranked plant cards and comparison table: bloom, sun, water, height, native range.
- Continuous-bloom planning, pesticide avoidance, perches, shelter, and feeder hygiene.
- Related hummingbird/species pages and regional native-plant previews.
- Visible FAQs mirrored in `FAQPage` JSON-LD.

### Native Plants for Birds in California

- California ecoregion and habitat context, not a single statewide “native” claim.
- Plants grouped by verified California distribution and subregion.
- Bird relationships and seasonal benefits with source/confidence.
- Garden layers: canopy, understory, shrub, herbaceous, ground layer.
- Fire, water, mature-size, toxicity, nursery-source, and invasive-risk checks.
- Remains noindex until all listed plants pass location validation.

## Source strategy

1. USDA PLANTS: accepted names, native status, state/county distribution, growth habit.
2. Lady Bird Johnson Wildflower Center: bloom period, light, soil, water, mature size; verify reuse terms per field.
3. Audubon Plants for Birds: bird-group benefits and local recommendations; treat as evidence/reference, not an unrestricted scrape target.
4. Xerces Society: regional pollinator plants and insect-food-web benefits.
5. iNaturalist: corroborating occurrence/phenology, with research-grade and sampling-bias caveats.
6. State extension/native plant societies: local invasive status, ecoregion fit, and horticultural review.

## Internal linking

- Plant profile → `plants for American Robins`, relevant purpose collection, state preview, seasonal guide.
- Bird profile → `plants that support Northern Cardinals`, feeder guide, location guide.
- State page → `native plant planning for California birds`, local birds, seasonal birds.
- Purpose page → plant profiles and birds using that benefit.
- Anchor examples: “berry-producing shrubs for birds,” “reviewed plants for hummingbirds,” “verify native plants in California,” “winter shelter plants.”

## 50 example pages

| # | URL | Keyword/intent | Title/content angle |
|---:|---|---|---|
| 1 | `/plants/` | bird friendly plants / browse | Bird-friendly Plants Encyclopedia |
| 2 | `/plants/native-plants/` | native plants for birds / learn | Native Plants for Birds: Verification-first Guide |
| 3 | `/plants/flowers/` | flowers that attract birds / compare | Bird-friendly Flowers |
| 4 | `/plants/trees/` | trees that attract birds / compare | Bird-friendly Trees |
| 5 | `/plants/shrubs/` | bird friendly shrubs / compare | Shrubs for Food and Cover |
| 6 | `/plants/vines/` | vines for birds / compare | Bird-friendly Native Vines |
| 7 | `/plants/nectar-plants/` | nectar plants for hummingbirds / buy-plan | Nectar Plants for Birds |
| 8 | `/plants/berry-producing-plants/` | berry bushes for birds / buy-plan | Berry-producing Plants for Birds |
| 9 | `/plants/bird-seed-plants/` | seed plants for birds / buy-plan | Seed-producing Plants for Birds |
| 10 | `/plants/nesting-plants/` | plants for bird nesting / habitat | Nesting Structure Plants |
| 11 | `/plants/shelter-plants/` | evergreen shelter for birds / habitat | Plants That Provide Bird Shelter |
| 12 | `/plants/cardinal-flower/` | cardinal flower hummingbirds / plant detail | Nectar, care, range, local check |
| 13 | `/plants/trumpet-honeysuckle/` | trumpet honeysuckle birds / plant detail | Nectar, berries, vine care |
| 14 | `/plants/american-elderberry/` | elderberry for birds / plant detail | Fruit, insects, thicket structure |
| 15 | `/plants/canadian-serviceberry/` | serviceberry birds / plant detail | Early fruit and nesting layers |
| 16 | `/plants/flowering-dogwood/` | dogwood berries birds / plant detail | Spring insects and fall fruit |
| 17 | `/plants/winterberry/` | winterberry birds / plant detail | Winter fruit and pollination needs |
| 18 | `/plants/common-sunflower/` | sunflower for birds / commercial | Seed heads and garden management |
| 19 | `/plants/purple-coneflower/` | coneflower goldfinches / plant detail | Summer insects and standing seed heads |
| 20 | `/plants/american-holly/` | holly for birds / plant detail | Evergreen shelter and fruiting sex |
| 21 | `/plants/eastern-red-cedar/` | red cedar for birds / plant detail | Winter cover and cone food |
| 22 | `/plants/black-eyed-susan/` | black eyed susan birds / plant detail | Insects and small seed heads |
| 23 | `/plants/common-buttonbush/` | buttonbush hummingbirds / plant detail | Wet-site nectar and structure |
| 24 | `/plants/virginia-creeper/` | virginia creeper birds / plant detail | Fruit, cover, placement |
| 25 | `/plants/wild-bergamot/` | bee balm hummingbirds / plant detail | Summer nectar and regional fit |
| 26 | `/plants/american-beech/` | beech trees blue jays / plant detail | Nuts, insects, mature size |
| 27 | `/plants/paper-birch/` | birch chickadees / plant detail | Insect food web and cool-climate care |
| 28 | `/plants/red-mulberry/` | native mulberry birds / plant detail | Fruit and hybridization caution |
| 29 | `/plants/for/ruby-throated-hummingbird/` | plants for hummingbirds / buy-plan | Reviewed nectar sequence |
| 30 | `/plants/for/northern-cardinal/` | plants for cardinals / buy-plan | Fruit, dense cover, nesting structure |
| 31 | `/plants/for/american-robin/` | plants for robins / buy-plan | Summer and winter fruit sources |
| 32 | `/plants/for/blue-jay/` | trees that attract blue jays / buy-plan | Nuts, fruit, canopy structure |
| 33 | `/plants/for/american-goldfinch/` | plants for goldfinches / buy-plan | Seed heads across seasons |
| 34 | `/plants/for/black-capped-chickadee/` | trees for chickadees / habitat | Insects, cavities, cover |
| 35 | `/plants/for/tufted-titmouse/` | plants for titmice / habitat | Native trees, nuts, cavities |
| 36 | `/plants/for/house-finch/` | plants for house finches / buy-plan | Seeds, fruit, layered cover |
| 37 | `/plants/for/mourning-dove/` | plants for mourning doves / habitat | Seed plants and safe ground layer |
| 38 | `/plants/for/downy-woodpecker/` | trees for downy woodpeckers / habitat | Insects, bark, safe deadwood |
| 39 | `/plants/california/native-plants/` | native plants California birds / local | Noindex until state validation |
| 40 | `/plants/texas/native-plants/` | native plants Texas birds / local | Ecoregion split required |
| 41 | `/plants/florida/native-plants/` | Florida bird friendly plants / local | Heat, wetland, hurricane fit |
| 42 | `/plants/arizona/native-plants/` | desert plants for birds / local | Water and elevation bands |
| 43 | `/plants/new-york/native-plants/` | native bird plants New York / local | Coastal-to-inland validation |
| 44 | `/plants/oregon/native-plants/` | Oregon native plants birds / local | Maritime vs interior split |
| 45 | `/plants/colorado/native-plants/` | Colorado bird plants / local | Elevation and water constraints |
| 46 | `/plants/minnesota/native-plants/` | Minnesota bird shrubs / local | Cold hardiness and winter fruit |
| 47 | `/plants/georgia/native-plants/` | Georgia plants for birds / local | Piedmont/coastal plain split |
| 48 | `/plants/maine/native-plants/` | Maine native plants birds / local | Cold and coastal conditions |
| 49 | `/plants/washington/native-plants/` | Washington native plants birds / local | Cascades climate split |
| 50 | `/plants/new-mexico/native-plants/` | New Mexico bird plants / local | Desert, bosque, mountain zones |

## Technical and content pipeline

- Import taxonomy/distribution into staging; normalize accepted name and synonyms.
- Join care and wildlife-benefit sources field by field, never by copied prose.
- Compute quality score and publish only after native/invasive checks and editorial review.
- Generate static params from rows with `status=published`, `indexable=true`.
- Canonicalize common-name synonyms to one scientific taxon page.
- Use `Article`, `BreadcrumbList`, and visible FAQ data; Schema.org has no dedicated authoritative “Bird” or botanical recommendation type.
- AI may rewrite reviewed facts and generate connective prose. It must not invent nativity, zones, bloom dates, toxicity, invasive status, or bird relationships.

## Monetization

- Nursery/seed affiliates only on locally validated pages; label affiliate links.
- Garden tools: watering, soil tests, pruners, plant supports, window-collision mitigation.
- Bird feeders as complementary—not substitute—habitat products.
- Regional field guides and native-gardening books.
- AdSense on high-information pages with restrained placement; protect tables, warnings, and primary answers from ad interruption.

## Six-month roadmap

1. Month 1: licensing audit, schema, source registry, 20-plant gold dataset.
2. Month 2: 500 reviewed plant profiles in cohorts; image/license pipeline.
3. Month 3: evidence-backed bird relationships and comparison tables.
4. Month 4: validate and index state/ecoregion cohorts; keep failures noindex.
5. Month 5: seasonal-benefit pages, calculators, garden-layer planner, internal links.
6. Month 6: affiliate testing, AdSense, nursery partnerships, cohort-level SEO and revenue monitoring.
