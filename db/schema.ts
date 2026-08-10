import { boolean, index, integer, jsonb, pgEnum, pgTable, primaryKey, real, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const contentStatus = pgEnum("content_status", ["draft", "reviewed", "published", "retired"]);
export const locationType = pgEnum("location_type", ["country", "state", "county", "city", "region"]);
export const presenceType = pgEnum("presence_type", ["resident", "breeding", "winter", "migrant"]);
export const benefitType = pgEnum("benefit_type", ["nectar", "fruit", "seed", "insects", "shelter", "nesting"]);

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
  id: uuid("id").primaryKey().defaultRandom(), organization: text("organization").notNull(), sourceUrl: text("source_url"), datasetIdentifier: text("dataset_identifier"), license: text("license"), attribution: text("attribution"), importedAt: timestamp("imported_at", { withTimezone: true }).notNull().defaultNow(), version: text("version"), allowedFields: text("allowed_fields").array(),
});

export const birdOccurrences = pgTable("bird_occurrences", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete: "cascade" }), locationId: uuid("location_id").notNull().references(() => locations.id, { onDelete: "cascade" }), season: text("season").notNull(), frequencyScore: real("frequency_score"), presence: presenceType("presence").notNull(), observationPeriod: text("observation_period"), sourceId: uuid("source_id").references(() => sources.id), confidence: real("confidence"),
}, (table) => [primaryKey({ columns:[table.birdId, table.locationId, table.season] }), index("occurrence_location_season_idx").on(table.locationId, table.season, table.frequencyScore)]);

export const birdFoods = pgTable("bird_foods", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete:"cascade" }), foodId: uuid("food_id").notNull().references(() => foods.id, { onDelete:"cascade" }), context: text("context").notNull(), season: text("season").notNull().default("all"), preferenceScore: real("preference_score"), evidenceLevel: text("evidence_level"), sourceId: uuid("source_id").references(() => sources.id),
}, (table) => [primaryKey({ columns:[table.birdId, table.foodId, table.context, table.season] }), index("bird_foods_food_idx").on(table.foodId)]);

export const birdPlants = pgTable("bird_plants", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete:"cascade" }), plantId: uuid("plant_id").notNull().references(() => plants.id, { onDelete:"cascade" }), benefit: benefitType("benefit").notNull(), season: text("season").notNull().default("all"), strengthScore: real("strength_score"), sourceId: uuid("source_id").references(() => sources.id),
}, (table) => [primaryKey({ columns:[table.birdId, table.plantId, table.benefit, table.season] }), index("bird_plants_plant_idx").on(table.plantId)]);

export const birdFeeders = pgTable("bird_feeders", {
  birdId: uuid("bird_id").notNull().references(() => birds.id, { onDelete:"cascade" }), feederId: uuid("feeder_id").notNull().references(() => feeders.id, { onDelete:"cascade" }), suitabilityScore: real("suitability_score"), notes: text("notes"), sourceId: uuid("source_id").references(() => sources.id),
}, (table) => [primaryKey({ columns:[table.birdId, table.feederId] })]);
