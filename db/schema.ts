import { boolean, index, integer, jsonb, pgEnum, pgTable, primaryKey, real, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const contentStatus = pgEnum("content_status", ["draft", "reviewed", "published", "retired"]);
export const locationType = pgEnum("location_type", ["country", "state", "county", "city", "region"]);
export const presenceType = pgEnum("presence_type", ["resident", "breeding", "winter", "migrant"]);
export const benefitType = pgEnum("benefit_type", ["nectar", "fruit", "seed", "insects", "shelter", "nesting"]);
export const importRunStatus = pgEnum("import_run_status", ["running", "succeeded", "failed"]);

const contentFields = {
  status: contentStatus("status").notNull().default("draft"),
  indexable: boolean("indexable").notNull().default(false),
  qualityScore: integer("quality_score").notNull().default(0),
  sourceCount: integer("source_count").notNull().default(0),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const birds = pgTable("birds", {
  id: uuid("id").primaryKey().defaultRandom(), slug: text("slug").notNull(), commonName: text("common_name").notNull(), scientificName: text("scientific_name").notNull(),
  taxonomyOrder: text("taxonomy_order"), taxonomyFamily: text("taxonomy_family"), sizeMinCm: real("size_min_cm"), sizeMaxCm: real("size_max_cm"), colors: text("colors").array(), habitats: text("habitats").array(), residentStatus: text("resident_status"), conservationStatus: text("conservation_status"), summary: text("summary").notNull(), ...contentFields,
}, (table) => [uniqueIndex("birds_slug_uq").on(table.slug), uniqueIndex("birds_scientific_name_uq").on(table.scientificName), index("birds_status_idx").on(table.status, table.indexable)]);

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(), slug: text("slug").notNull(), type: locationType("type").notNull(), name: text("name").notNull(), parentId: uuid("parent_id"), latitude: real("latitude"), longitude: real("longitude"), ecoregion: text("ecoregion"), usdaZones: text("usda_zones").array(), climateAttributes: jsonb("climate_attributes"), ...contentFields,
}, (table) => [uniqueIndex("locations_slug_uq").on(table.slug), index("locations_parent_idx").on(table.parentId)]);

export const foods = pgTable("foods", {
  id: uuid("id").primaryKey().defaultRandom(), slug: text("slug").notNull(), name: text("name").notNull(), foodType: text("food_type").notNull(), description: text("description"), storageGuidance: text("storage_guidance"), safetyNotes: text("safety_notes"), ...contentFields,
}, (table) => [uniqueIndex("foods_slug_uq").on(table.slug)]);

export const plants = pgTable("plants", {
  id: uuid("id").primaryKey().defaultRandom(), slug: text("slug").notNull(), commonName: text("common_name").notNull(), scientificName: text("scientific_name").notNull(), plantType: text("plant_type"), nativeRegions: text("native_regions").array(), usdaZoneMin: integer("usda_zone_min"), usdaZoneMax: integer("usda_zone_max"), sunRequirements: text("sun_requirements").array(), waterRequirements: text("water_requirements"), heightMinCm: real("height_min_cm"), heightMaxCm: real("height_max_cm"), bloomSeasons: text("bloom_seasons").array(), fruitSeasons: text("fruit_seasons").array(), toxicityNotes: text("toxicity_notes"), invasiveRegions: text("invasive_regions").array(), ...contentFields,
}, (table) => [uniqueIndex("plants_slug_uq").on(table.slug), uniqueIndex("plants_scientific_name_uq").on(table.scientificName)]);

export const feeders = pgTable("feeders", {
  id: uuid("id").primaryKey().defaultRandom(), slug: text("slug").notNull(), name: text("name").notNull(), feederType: text("feeder_type").notNull(), compatibleFoods: text("compatible_foods").array(), placementGuidance: text("placement_guidance"), cleaningGuidance: text("cleaning_guidance"), ...contentFields,
}, (table) => [uniqueIndex("feeders_slug_uq").on(table.slug)]);

export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(), organization: text("organization").notNull(), sourceUrl: text("source_url"), datasetIdentifier: text("dataset_identifier").notNull(), license: text("license").notNull(), licenseUrl: text("license_url"), attribution: text("attribution").notNull(), importedAt: timestamp("imported_at", { withTimezone: true }).notNull().defaultNow(), version: text("version").notNull().default("current"), allowedFields: text("allowed_fields").array(), commercialUseAllowed: boolean("commercial_use_allowed").notNull().default(false),
}, (table) => [uniqueIndex("sources_dataset_version_uq").on(table.datasetIdentifier, table.version)]);

export const importRuns = pgTable("import_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  importer: text("importer").notNull(),
  datasetIdentifier: text("dataset_identifier").notNull(),
  datasetVersion: text("dataset_version").notNull(),
  status: importRunStatus("status").notNull().default("running"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  insertedCount: integer("inserted_count").notNull().default(0),
  updatedCount: integer("updated_count").notNull().default(0),
  skippedCount: integer("skipped_count").notNull().default(0),
  errorCount: integer("error_count").notNull().default(0),
  metadata: jsonb("metadata"),
}, (table) => [index("import_runs_dataset_idx").on(table.datasetIdentifier, table.startedAt)]);

export const birdSources = pgTable("bird_sources", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  sourceId: uuid("source_id").notNull().references(() => sources.id, { onDelete: "cascade" }),
  fieldName: text("field_name").notNull(),
  sourceRecordUrl: text("source_record_url"),
  retrievedAt: timestamp("retrieved_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [primaryKey({ columns: [table.birdId, table.sourceId, table.fieldName] }), index("bird_sources_bird_idx").on(table.birdId)]);

export const birdOccurrences = pgTable("bird_occurrences", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }), locationId: uuid("location_id").notNull().references(() => locations.id, { onDelete: "cascade" }), season: text("season").notNull(), frequencyScore: real("frequency_score"), presence: presenceType("presence").notNull(), observationPeriod: text("observation_period"), sourceId: uuid("source_id").references(() => sources.id), confidence: real("confidence"),
}, (table) => [primaryKey({ columns:[table.birdId, table.locationId, table.season] }), index("occurrence_location_season_idx").on(table.locationId, table.season, table.frequencyScore)]);

export const birdOccurrenceStats = pgTable("bird_occurrence_stats", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  locationId: uuid("location_id").notNull().references(() => locations.id, { onDelete: "cascade" }),
  month: integer("month").notNull(),
  observationCount: integer("observation_count").notNull().default(0),
  recentYearCount: integer("recent_year_count").notNull().default(0),
  frequencyScore: real("frequency_score"),
  seasonalStatus: text("seasonal_status").notNull().default("unknown"),
  confidence: real("confidence").notNull().default(0),
  datasetVersion: text("dataset_version").notNull(),
  sourceId: uuid("source_id").notNull().references(() => sources.id),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [primaryKey({ columns: [table.birdId, table.locationId, table.month, table.datasetVersion] }), index("occurrence_stats_location_month_idx").on(table.locationId, table.month, table.frequencyScore)]);

export const birdFoods = pgTable("bird_foods", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete:"cascade" }), foodId: uuid("food_id").notNull().references(() => foods.id, { onDelete:"cascade" }), context: text("context").notNull(), season: text("season").notNull().default("all"), preferenceScore: real("preference_score"), evidenceLevel: text("evidence_level"), sourceId: uuid("source_id").references(() => sources.id),
}, (table) => [primaryKey({ columns:[table.birdId, table.foodId, table.context, table.season] }), index("bird_foods_food_idx").on(table.foodId)]);

export const birdPlants = pgTable("bird_plants", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete:"cascade" }), plantId: uuid("plant_id").notNull().references(() => plants.id, { onDelete:"cascade" }), benefit: benefitType("benefit").notNull(), season: text("season").notNull().default("all"), strengthScore: real("strength_score"), sourceId: uuid("source_id").references(() => sources.id),
}, (table) => [primaryKey({ columns:[table.birdId, table.plantId, table.benefit, table.season] }), index("bird_plants_plant_idx").on(table.plantId)]);

export const birdFeeders = pgTable("bird_feeders", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete:"cascade" }), feederId: uuid("feeder_id").notNull().references(() => feeders.id, { onDelete:"cascade" }), suitabilityScore: real("suitability_score"), notes: text("notes"), sourceId: uuid("source_id").references(() => sources.id),
}, (table) => [primaryKey({ columns:[table.birdId, table.feederId] })]);

// ─── Encyclopedia extension tables ────────────────────────────────────────────

/**
 * 1:1 extension of `birds` with extra taxonomy + measurement + conservation facts.
 * Kept separate so the core `birds` table stays lean and backward-compatible.
 */
export const birdDetails = pgTable("bird_details", {
  birdId:             uuid("bird_id").primaryKey().references(() => birds.id, { onDelete: "cascade" }),
  // taxonomy
  genus:              text("genus"),
  taxonomyClass:      text("taxonomy_class").default("Aves"),
  speciesCode:        text("species_code"),        // eBird alpha code, e.g. "amrobi"
  avibaseId:          text("avibase_id"),
  ebirdId:            text("ebird_id"),
  iocId:              text("ioc_id"),
  // measurements
  weightGMin:         real("weight_g_min"),
  weightGMax:         real("weight_g_max"),
  wingspanCmMin:      real("wingspan_cm_min"),
  wingspanCmMax:      real("wingspan_cm_max"),
  lifespanYearsMin:   real("lifespan_years_min"),
  lifespanYearsMax:   real("lifespan_years_max"),
  // conservation
  iucnStatus:         text("iucn_status"),         // LC, NT, VU, EN, CR, EW, EX
  populationTrend:    text("population_trend"),    // increasing | stable | decreasing | unknown
  populationEstimate: text("population_estimate"), // free text: "300 million"
  mainThreats:        text("main_threats").array(),
  gbifId:             text("gbif_id"),
}, (table) => [uniqueIndex("bird_details_species_code_uq").on(table.speciesCode), uniqueIndex("bird_details_gbif_id_uq").on(table.gbifId)]);

/**
 * Visual identification features — one row per (bird, sex, season) combo.
 * Powers /identify/ programmatic pages ("small brown bird california").
 * Index on primary_color + size_class enables fast identification queries.
 */
export const birdIdentification = pgTable("bird_identification", {
  id:                     uuid("id").primaryKey().defaultRandom(),
  birdId:                 uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  sex:                    text("sex").notNull().default("unknown"),     // male | female | unknown
  season:                 text("season").notNull().default("all"),      // breeding | nonbreeding | all
  // colors
  primaryColor:           text("primary_color"),
  bodyColors:             text("body_colors").array(),
  breastColor:            text("breast_color"),
  wingColor:              text("wing_color"),
  headColor:              text("head_color"),
  // structure
  sizeClass:              text("size_class"),        // sparrow | robin | crow | hawk | eagle
  beakShape:              text("beak_shape"),         // thin | thick | hooked | long | short | curved
  beakColor:              text("beak_color"),
  tailShape:              text("tail_shape"),          // forked | rounded | pointed | square | long
  wingPattern:            text("wing_pattern"),        // plain | barred | spotted | striped | streaked
  eyeRing:                boolean("eye_ring").default(false),
  eyeColor:               text("eye_color"),
  // text summary for AI + SEO
  distinguishingFeatures: text("distinguishing_features"),
  similarSpecies:         text("similar_species").array(),
}, (table) => [
  uniqueIndex("bird_identification_bird_sex_season_uq").on(table.birdId, table.sex, table.season),
  index("bird_id_sex_season_idx").on(table.birdId, table.sex, table.season),
  index("identification_color_size_idx").on(table.primaryColor, table.sizeClass),
]);

/**
 * Audio recordings — one bird can have many sounds (song, alarm, contact, etc).
 * macaulay_id links to the Macaulay Library catalog for embed/attribution.
 */
export const birdSounds = pgTable("bird_sounds", {
  id:             uuid("id").primaryKey().defaultRandom(),
  birdId:         uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  callType:       text("call_type").notNull(),     // song | alarm | contact | flight | mating | juvenile
  audioUrl:       text("audio_url"),
  spectrogramUrl: text("spectrogram_url"),
  description:    text("description"),
  season:         text("season"),
  credit:         text("credit"),
  license:        text("license"),
  macaulayId:     text("macaulay_id"),
  sourceId:       uuid("source_id").references(() => sources.id),
  ...contentFields,
}, (table) => [index("bird_sounds_bird_idx").on(table.birdId)]);

/**
 * Image library — one bird can have many images.
 * is_primary = true marks the canonical hero image used in listings.
 */
export const birdImages = pgTable("bird_images", {
  id:           uuid("id").primaryKey().defaultRandom(),
  birdId:       uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  imageUrl:     text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  altText:      text("alt_text"),
  sex:          text("sex"),         // male | female | unknown
  ageClass:     text("age_class"),   // adult | juvenile | immature
  season:       text("season"),
  credit:       text("credit"),
  creatorUrl:   text("creator_url"),
  license:      text("license").notNull(),     // CC0 | CC-BY | CC-BY-SA
  licenseUrl:   text("license_url").notNull(),
  sourcePageUrl:text("source_page_url").notNull(),
  attributionText: text("attribution_text").notNull(),
  modified:     boolean("modified").notNull().default(false),
  retrievedAt:  timestamp("retrieved_at", { withTimezone: true }).notNull().defaultNow(),
  externalId:   text("external_id").notNull(),
  isPrimary:    boolean("is_primary").notNull().default(false),
  wikimediaId:  text("wikimedia_id"),
  macaulayId:   text("macaulay_id"),
  gbifId:       text("gbif_id"),
  sourceId:     uuid("source_id").references(() => sources.id),
}, (table) => [
  uniqueIndex("bird_images_source_external_uq").on(table.sourceId, table.externalId),
  index("bird_images_bird_idx").on(table.birdId),
  index("bird_images_primary_idx").on(table.birdId, table.isPrimary),
]);

/**
 * Behavioral data — 1:1 with `birds`.
 * feeding_behavior is an array to capture multiple strategies (e.g. ground-foraging + gleaning).
 */
export const birdBehaviors = pgTable("bird_behaviors", {
  birdId:            uuid("bird_id").primaryKey().references(() => birds.id, { onDelete: "cascade" }),
  migratory:         boolean("migratory"),
  migrationPattern:  text("migration_pattern"),                    // short | long | irruptive | none
  migrationMonths:   text("migration_months").array(),             // ["March","April","September"]
  flockingBehavior:  text("flocking_behavior"),                    // solitary | pairs | flocks | variable
  feedingBehavior:   text("feeding_behavior").array(),             // ground-foraging | hovering | gleaning | probing | hawking
  nestType:          text("nest_type"),                             // cup | cavity | platform | ground | hanging | burrow
  nestLocations:     text("nest_locations").array(),               // tree-cavity | shrub | cliff | building
  nestMaterial:      text("nest_material"),
  clutchSize:        text("clutch_size"),                           // "3-5"
  incubationDays:    integer("incubation_days"),
  broodsPerYear:     integer("broods_per_year"),
  ...contentFields,
});

/**
 * Cross-reference similar species for "You might also like" and /identify/ disambiguation.
 * relationship_type: lookalike (visual), same_family (taxonomy), range_overlap (geography).
 */
export const birdRelatedSpecies = pgTable("bird_related_species", {
  birdId:           uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  relatedBirdId:    uuid("related_bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  relationshipType: text("relationship_type").notNull(), // lookalike | same_family | range_overlap
  similarityScore:  real("similarity_score"),            // 0–1
}, (table) => [
  primaryKey({ columns: [table.birdId, table.relatedBirdId] }),
  index("bird_related_bird_idx").on(table.birdId),
]);

/**
 * Bird × Location distribution summary — one row per (bird, location) pair.
 *
 * Aggregated from `bird_occurrence_stats` monthly data for O(1) lookups on
 * state/city pages and bird+location combo pages. Powers:
 *   - /birds-by-location/[state]        (top birds by abundance)
 *   - /birds-by-location/[state]/[bird] (combo page)
 *   - "Where can I find this bird?" section on species profiles
 */
export const birdLocationDistribution = pgTable("bird_location_distribution", {
  birdId:              uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }),
  locationId:          uuid("location_id").notNull().references(() => locations.id, { onDelete: "cascade" }),
  // abundance label for quick display + sorting
  abundance:           text("abundance").notNull().default("uncommon"), // abundant | common | uncommon | rare | accidental
  // overall seasonal presence
  presence:            presenceType("presence").notNull().default("resident"), // resident | breeding | winter | migrant
  // which months the bird is present (1-12)
  bestMonths:          integer("best_months").array(),
  // peak months (highest frequency)
  peakMonths:          integer("peak_months").array(),
  // aggregate stats
  totalObservations:   integer("total_observations").notNull().default(0),
  avgFrequency:        real("avg_frequency"),
  maxFrequency:        real("max_frequency"),
  // data quality
  confidence:          real("confidence").notNull().default(0),
  datasetVersion:      text("dataset_version").notNull(),
  sourceId:            uuid("source_id").references(() => sources.id),
  updatedAt:           timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.birdId, table.locationId] }),
  index("bird_location_dist_location_idx").on(table.locationId, table.avgFrequency),
  index("bird_location_dist_bird_idx").on(table.birdId),
  index("bird_location_dist_abundance_idx").on(table.locationId, table.abundance),
]);
