# Feeders Programmatic SEO Architecture

## Decision

Feeders is a high-commercial-intent module, but commercial intent does not justify synthetic reviews. Phase 1 publishes durable, source-reviewable guidance about feeder form, bird compatibility, food, placement, hygiene, common problems, and comparisons. Product rankings, prices, star ratings, and affiliate links remain unpublished until first-party testing or attributable product data, a refresh pipeline, and affiliate disclosure are in place.

## Phase 1 inventory

| Template | Public routes | Index policy |
|---|---:|---|
| Hub | 1 | Index |
| Feeder type | 9 | Index after editorial review |
| Feeder × bird | 10 | Index only for reviewed bird relationships |
| Feeder × food | 8 | Index only for reviewed compatibility |
| Problem | 5 | Index after safety review |
| Comparison | 5 | Index; no product winner claims |
| State planning preview | 50 | `noindex, follow`; excluded from sitemap |
| Calculator | 1 | Index |

This creates 89 accessible routes and 39 sitemap-eligible Feeders routes. Expansion is gated by evidence coverage, not a target page count.

## URL architecture

```text
/feeders
/feeders/{feeder-type}
/feeders/for/{bird-or-food}
/feeders/{problem}
/feeders/{state}                 # noindex preview until reviewed
/feeders/compare/{a}-vs-{b}
/tools/bird-feeder-calculator
```

The shared `/feeders/for/{target}` resolver checks a reviewed bird slug before a food slug. Reserved-slug tests must prevent future collisions among types, problems, states, and collections.

## Data model

### `feeders`

`id`, `slug`, `name`, `type`, `capacity_value`, `capacity_unit`, `materials[]`, `weather_resistance`, `squirrel_resistance`, `cleaning_method`, `drainage`, `placement_guidance`, `source_ids[]`, `review_status`, `reviewed_at`.

### `feeder_birds`

`feeder_id`, `bird_id`, `suitability_score`, `relationship_type`, `reason`, `source_id`, `review_status`, `reviewed_at`.

Scores are editorial sorting aids, never invented precision. Published copy explains the reason and source.

### `feeder_food`

`feeder_id`, `food_id`, `compatibility`, `port_or_mesh_requirement`, `spoilage_notes`, `source_id`, `review_status`.

### `feeder_problems`

`feeder_id`, `problem_id`, `effectiveness_level`, `conditions`, `limitations`, `source_id`, `review_status`.

### `products` (future)

`id`, `brand`, `model`, `canonical_url`, `merchant`, `price`, `currency`, `availability`, `affiliate_url`, `retrieved_at`, `spec_source_url`, `test_method`, `tested_at`, `disclosure_version`.

Price and availability expire quickly and must be refreshed or removed. Merchant claims are labeled as such; editorial testing is stored separately.

## Publishing gates

Every indexable page must pass:

1. A non-empty reviewed relationship or comparison—not a Cartesian product.
2. Unique title, summary, practical decision criteria, limitations, placement, and hygiene guidance.
3. At least one attributable authoritative source for safety-sensitive claims.
4. No unsupported superlative, wildlife-proof guarantee, precise food quantity, or local claim.
5. Canonical URL, internal links, sitemap eligibility decision, and structured data matching visible content.
6. Human review timestamp and a re-review trigger when source guidance changes.

Pages failing the gate are not generated or are accessible as `noindex` previews. Empty and near-duplicate combinations return 404 instead of thin pages.

## Source hierarchy

1. Public agencies and recognized ornithology organizations for disease, wildlife, window, food, and placement safety.
2. Primary manufacturer specifications for dimensions, materials, warranty, and compatibility—never for independent performance claims.
3. Current merchant APIs for price and availability.
4. Community discussions and query tools only for discovering problems and wording; they do not establish biological or safety facts.

Phase 1 uses Cornell Lab / Project FeederWatch, U.S. Fish & Wildlife Service, and Audubon guidance. A source registry should store URL, publisher, claim scope, retrieval date, license/use note, and last verification date.

## Template requirements

### Feeder type

Definition, best-fit birds, compatible foods, advantages, limitations, placement, cleaning, related bird/food/problem links, and FAQ. Avoid “best products” until the product pipeline exists.

### Bird relationship

Species context, reviewed feeder shortlist, foods, perch/access needs where sourced, placement, habitat alternatives, common mistakes, full bird profile, and related plants.

### Food relationship

Food form, compatible ports/mesh/trays, birds served, spoilage/storage concerns, waste, cleaning, and alternative feeder forms.

### Problem

Diagnosis before product selection, environmental controls, equipment options, limitations, stop-feeding conditions, and related feeder comparisons.

### Location

Must have reviewed state occurrence, climate, seasonality, current regulations/advisories, mammal conflicts, and local sources. Until then it stays `noindex` and out of the sitemap.

### Comparison

Side-by-side birds, food, weather exposure, capacity tradeoff, cleaning, wildlife conflict, space, and an audience-specific conclusion. It cannot claim a universal winner.

## Calculator policy

The calculator gives a conservative starting number of feeding stations and layout advice. It intentionally does not prescribe food weight or refill frequency: use, temperature, rain, species, and spoilage vary too much for a safe static formula. Its output includes window placement, hygiene, and conflict checks.

## Internal linking

```text
Bird profile → feeder-for-bird → feeder type → food/problem/comparison
Plant-for-bird → bird profile → feeder-for-bird
Feeder hub → every reviewed collection
Calculator → recommended feeder types → cleaning/problem guides
```

All links are visible HTML anchors. State previews remain followable so users can navigate, while canonicals point to themselves and robots prevent indexing.

## Commercial rollout

1. Connect a product API with reliable identifiers, timestamps, and regional availability.
2. Publish a clear affiliate disclosure before any affiliate link.
3. Create an editorial test protocol for assembly, cleaning, drainage, durability, access, and seed retention.
4. Separate “manufacturer specification,” “editorially tested,” and “merchant price” fields in both UI and schema.
5. Refresh volatile data automatically; suppress stale price or availability.
6. Add Product/Review structured data only when visible claims meet Google policy and reflect genuine testing.

## Expansion roadmap

- Month 1: validate crawl/index behavior and engagement for the 39 durable routes.
- Month 2: review another 25 common North American feeder birds and 10 problem intents.
- Month 3: add sourced food storage and climate rules; begin state data ingestion.
- Month 4: publish only states clearing the location gate; keep the rest `noindex`.
- Month 5: connect product APIs and affiliate disclosure in a staging environment.
- Month 6: release a small number of genuinely maintained product comparisons, then expand based on refresh reliability and search quality—not a 1,200-page quota.

## Success metrics

Track valid indexed pages, excluded/noindex correctness, impressions per template, non-brand clicks, hub-to-detail CTR, calculator completion, outbound merchant clicks after disclosure, stale-product suppression, and editorial refresh SLA. A rising page count without impressions or useful engagement is a failure signal.
