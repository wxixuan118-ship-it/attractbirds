CREATE TYPE "public"."import_run_status" AS ENUM('running', 'succeeded', 'failed');--> statement-breakpoint
CREATE TABLE "bird_occurrence_stats" (
	"bird_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"month" integer NOT NULL,
	"observation_count" integer DEFAULT 0 NOT NULL,
	"recent_year_count" integer DEFAULT 0 NOT NULL,
	"frequency_score" real,
	"seasonal_status" text DEFAULT 'unknown' NOT NULL,
	"confidence" real DEFAULT 0 NOT NULL,
	"dataset_version" text NOT NULL,
	"source_id" uuid NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bird_occurrence_stats_bird_id_location_id_month_dataset_version_pk" PRIMARY KEY("bird_id","location_id","month","dataset_version")
);
--> statement-breakpoint
CREATE TABLE "bird_sources" (
	"bird_id" uuid NOT NULL,
	"source_id" uuid NOT NULL,
	"field_name" text NOT NULL,
	"source_record_url" text,
	"retrieved_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bird_sources_bird_id_source_id_field_name_pk" PRIMARY KEY("bird_id","source_id","field_name")
);
--> statement-breakpoint
CREATE TABLE "import_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"importer" text NOT NULL,
	"dataset_identifier" text NOT NULL,
	"dataset_version" text NOT NULL,
	"status" "import_run_status" DEFAULT 'running' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"inserted_count" integer DEFAULT 0 NOT NULL,
	"updated_count" integer DEFAULT 0 NOT NULL,
	"skipped_count" integer DEFAULT 0 NOT NULL,
	"error_count" integer DEFAULT 0 NOT NULL,
	"metadata" jsonb
);
--> statement-breakpoint
ALTER TABLE "bird_images" ALTER COLUMN "license" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "dataset_identifier" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "license" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "attribution" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "version" SET DEFAULT 'current';--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "version" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_details" ADD COLUMN "gbif_id" text;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "creator_url" text;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "license_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "source_page_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "attribution_text" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "modified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "retrieved_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_images" ADD COLUMN "external_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "sources" ADD COLUMN "license_url" text;--> statement-breakpoint
ALTER TABLE "sources" ADD COLUMN "commercial_use_allowed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "bird_occurrence_stats" ADD CONSTRAINT "bird_occurrence_stats_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_occurrence_stats" ADD CONSTRAINT "bird_occurrence_stats_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_occurrence_stats" ADD CONSTRAINT "bird_occurrence_stats_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_sources" ADD CONSTRAINT "bird_sources_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_sources" ADD CONSTRAINT "bird_sources_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "occurrence_stats_location_month_idx" ON "bird_occurrence_stats" USING btree ("location_id","month","frequency_score");--> statement-breakpoint
CREATE INDEX "bird_sources_bird_idx" ON "bird_sources" USING btree ("bird_id");--> statement-breakpoint
CREATE INDEX "import_runs_dataset_idx" ON "import_runs" USING btree ("dataset_identifier","started_at");--> statement-breakpoint
CREATE UNIQUE INDEX "bird_details_species_code_uq" ON "bird_details" USING btree ("species_code");--> statement-breakpoint
CREATE UNIQUE INDEX "bird_details_gbif_id_uq" ON "bird_details" USING btree ("gbif_id");--> statement-breakpoint
CREATE UNIQUE INDEX "bird_identification_bird_sex_season_uq" ON "bird_identification" USING btree ("bird_id","sex","season");--> statement-breakpoint
CREATE UNIQUE INDEX "bird_images_source_external_uq" ON "bird_images" USING btree ("source_id","external_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sources_dataset_version_uq" ON "sources" USING btree ("dataset_identifier","version");