CREATE TYPE "public"."benefit_type" AS ENUM('nectar', 'fruit', 'seed', 'insects', 'shelter', 'nesting');--> statement-breakpoint
CREATE TYPE "public"."content_status" AS ENUM('draft', 'reviewed', 'published', 'retired');--> statement-breakpoint
CREATE TYPE "public"."location_type" AS ENUM('country', 'state', 'county', 'city', 'region');--> statement-breakpoint
CREATE TYPE "public"."presence_type" AS ENUM('resident', 'breeding', 'winter', 'migrant');--> statement-breakpoint
CREATE TABLE "bird_feeders" (
	"bird_id" uuid NOT NULL,
	"feeder_id" uuid NOT NULL,
	"suitability_score" real,
	"notes" text,
	"source_id" uuid,
	CONSTRAINT "bird_feeders_bird_id_feeder_id_pk" PRIMARY KEY("bird_id","feeder_id")
);
--> statement-breakpoint
CREATE TABLE "bird_foods" (
	"bird_id" uuid NOT NULL,
	"food_id" uuid NOT NULL,
	"context" text NOT NULL,
	"season" text DEFAULT 'all' NOT NULL,
	"preference_score" real,
	"evidence_level" text,
	"source_id" uuid,
	CONSTRAINT "bird_foods_bird_id_food_id_context_season_pk" PRIMARY KEY("bird_id","food_id","context","season")
);
--> statement-breakpoint
CREATE TABLE "bird_occurrences" (
	"bird_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"season" text NOT NULL,
	"frequency_score" real,
	"presence" "presence_type" NOT NULL,
	"observation_period" text,
	"source_id" uuid,
	"confidence" real,
	CONSTRAINT "bird_occurrences_bird_id_location_id_season_pk" PRIMARY KEY("bird_id","location_id","season")
);
--> statement-breakpoint
CREATE TABLE "bird_plants" (
	"bird_id" uuid NOT NULL,
	"plant_id" uuid NOT NULL,
	"benefit" "benefit_type" NOT NULL,
	"season" text DEFAULT 'all' NOT NULL,
	"strength_score" real,
	"source_id" uuid,
	CONSTRAINT "bird_plants_bird_id_plant_id_benefit_season_pk" PRIMARY KEY("bird_id","plant_id","benefit","season")
);
--> statement-breakpoint
CREATE TABLE "birds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"common_name" text NOT NULL,
	"scientific_name" text NOT NULL,
	"taxonomy_order" text,
	"taxonomy_family" text,
	"size_min_cm" real,
	"size_max_cm" real,
	"colors" text[],
	"habitats" text[],
	"resident_status" text,
	"conservation_status" text,
	"summary" text NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"indexable" boolean DEFAULT false NOT NULL,
	"quality_score" integer DEFAULT 0 NOT NULL,
	"source_count" integer DEFAULT 0 NOT NULL,
	"reviewed_at" timestamp with time zone,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feeders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"feeder_type" text NOT NULL,
	"compatible_foods" text[],
	"placement_guidance" text,
	"cleaning_guidance" text,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"indexable" boolean DEFAULT false NOT NULL,
	"quality_score" integer DEFAULT 0 NOT NULL,
	"source_count" integer DEFAULT 0 NOT NULL,
	"reviewed_at" timestamp with time zone,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"food_type" text NOT NULL,
	"description" text,
	"storage_guidance" text,
	"safety_notes" text,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"indexable" boolean DEFAULT false NOT NULL,
	"quality_score" integer DEFAULT 0 NOT NULL,
	"source_count" integer DEFAULT 0 NOT NULL,
	"reviewed_at" timestamp with time zone,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"type" "location_type" NOT NULL,
	"name" text NOT NULL,
	"parent_id" uuid,
	"latitude" real,
	"longitude" real,
	"ecoregion" text,
	"usda_zones" text[],
	"climate_attributes" jsonb,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"indexable" boolean DEFAULT false NOT NULL,
	"quality_score" integer DEFAULT 0 NOT NULL,
	"source_count" integer DEFAULT 0 NOT NULL,
	"reviewed_at" timestamp with time zone,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"common_name" text NOT NULL,
	"scientific_name" text NOT NULL,
	"plant_type" text,
	"native_regions" text[],
	"usda_zone_min" integer,
	"usda_zone_max" integer,
	"sun_requirements" text[],
	"water_requirements" text,
	"height_min_cm" real,
	"height_max_cm" real,
	"bloom_seasons" text[],
	"fruit_seasons" text[],
	"toxicity_notes" text,
	"invasive_regions" text[],
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"indexable" boolean DEFAULT false NOT NULL,
	"quality_score" integer DEFAULT 0 NOT NULL,
	"source_count" integer DEFAULT 0 NOT NULL,
	"reviewed_at" timestamp with time zone,
	"last_verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization" text NOT NULL,
	"source_url" text,
	"dataset_identifier" text,
	"license" text,
	"attribution" text,
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"version" text,
	"allowed_fields" text[]
);
--> statement-breakpoint
ALTER TABLE "bird_feeders" ADD CONSTRAINT "bird_feeders_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_feeders" ADD CONSTRAINT "bird_feeders_feeder_id_feeders_id_fk" FOREIGN KEY ("feeder_id") REFERENCES "public"."feeders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_feeders" ADD CONSTRAINT "bird_feeders_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_foods" ADD CONSTRAINT "bird_foods_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_foods" ADD CONSTRAINT "bird_foods_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_foods" ADD CONSTRAINT "bird_foods_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_occurrences" ADD CONSTRAINT "bird_occurrences_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_occurrences" ADD CONSTRAINT "bird_occurrences_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_occurrences" ADD CONSTRAINT "bird_occurrences_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_plants" ADD CONSTRAINT "bird_plants_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_plants" ADD CONSTRAINT "bird_plants_plant_id_plants_id_fk" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_plants" ADD CONSTRAINT "bird_plants_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bird_foods_food_idx" ON "bird_foods" USING btree ("food_id");--> statement-breakpoint
CREATE INDEX "occurrence_location_season_idx" ON "bird_occurrences" USING btree ("location_id","season","frequency_score");--> statement-breakpoint
CREATE INDEX "bird_plants_plant_idx" ON "bird_plants" USING btree ("plant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "birds_slug_uq" ON "birds" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "birds_scientific_name_uq" ON "birds" USING btree ("scientific_name");--> statement-breakpoint
CREATE INDEX "birds_status_idx" ON "birds" USING btree ("status","indexable");--> statement-breakpoint
CREATE UNIQUE INDEX "feeders_slug_uq" ON "feeders" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "foods_slug_uq" ON "foods" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "locations_slug_uq" ON "locations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "locations_parent_idx" ON "locations" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "plants_slug_uq" ON "plants" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "plants_scientific_name_uq" ON "plants" USING btree ("scientific_name");