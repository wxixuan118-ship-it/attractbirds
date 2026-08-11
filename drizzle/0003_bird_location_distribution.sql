-- bird_location_distribution: aggregated summary per (bird, location) pair
-- Rolled up from bird_occurrence_stats monthly data for O(1) lookups.
CREATE TABLE "bird_location_distribution" (
	"bird_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	"abundance" text DEFAULT 'uncommon' NOT NULL,
	"presence" "presence_type" DEFAULT 'resident' NOT NULL,
	"best_months" integer[],
	"peak_months" integer[],
	"total_observations" integer DEFAULT 0 NOT NULL,
	"avg_frequency" real,
	"max_frequency" real,
	"confidence" real DEFAULT 0 NOT NULL,
	"dataset_version" text NOT NULL,
	"source_id" uuid,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bird_location_distribution_bird_id_location_id_pk" PRIMARY KEY("bird_id","location_id")
);
--> statement-breakpoint
ALTER TABLE "bird_location_distribution" ADD CONSTRAINT "bird_location_distribution_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "bird_location_distribution" ADD CONSTRAINT "bird_location_distribution_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "bird_location_distribution" ADD CONSTRAINT "bird_location_distribution_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "bird_location_dist_location_idx" ON "bird_location_distribution" USING btree ("location_id","avg_frequency");
--> statement-breakpoint
CREATE INDEX "bird_location_dist_bird_idx" ON "bird_location_distribution" USING btree ("bird_id");
--> statement-breakpoint
CREATE INDEX "bird_location_dist_abundance_idx" ON "bird_location_distribution" USING btree ("location_id","abundance");
