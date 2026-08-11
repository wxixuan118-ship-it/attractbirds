CREATE TABLE "bird_behaviors" (
	"bird_id" uuid PRIMARY KEY NOT NULL,
	"migratory" boolean,
	"migration_pattern" text,
	"migration_months" text[],
	"flocking_behavior" text,
	"feeding_behavior" text[],
	"nest_type" text,
	"nest_locations" text[],
	"nest_material" text,
	"clutch_size" text,
	"incubation_days" integer,
	"broods_per_year" integer,
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
CREATE TABLE "bird_details" (
	"bird_id" uuid PRIMARY KEY NOT NULL,
	"genus" text,
	"taxonomy_class" text DEFAULT 'Aves',
	"species_code" text,
	"avibase_id" text,
	"ebird_id" text,
	"ioc_id" text,
	"weight_g_min" real,
	"weight_g_max" real,
	"wingspan_cm_min" real,
	"wingspan_cm_max" real,
	"lifespan_years_min" real,
	"lifespan_years_max" real,
	"iucn_status" text,
	"population_trend" text,
	"population_estimate" text,
	"main_threats" text[]
);
--> statement-breakpoint
CREATE TABLE "bird_identification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bird_id" uuid NOT NULL,
	"sex" text DEFAULT 'unknown' NOT NULL,
	"season" text DEFAULT 'all' NOT NULL,
	"primary_color" text,
	"body_colors" text[],
	"breast_color" text,
	"wing_color" text,
	"head_color" text,
	"size_class" text,
	"beak_shape" text,
	"beak_color" text,
	"tail_shape" text,
	"wing_pattern" text,
	"eye_ring" boolean DEFAULT false,
	"eye_color" text,
	"distinguishing_features" text,
	"similar_species" text[]
);
--> statement-breakpoint
CREATE TABLE "bird_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bird_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"thumbnail_url" text,
	"alt_text" text,
	"sex" text,
	"age_class" text,
	"season" text,
	"credit" text,
	"license" text,
	"is_primary" boolean DEFAULT false NOT NULL,
	"wikimedia_id" text,
	"macaulay_id" text,
	"gbif_id" text,
	"source_id" uuid
);
--> statement-breakpoint
CREATE TABLE "bird_related_species" (
	"bird_id" uuid NOT NULL,
	"related_bird_id" uuid NOT NULL,
	"relationship_type" text NOT NULL,
	"similarity_score" real,
	CONSTRAINT "bird_related_species_bird_id_related_bird_id_pk" PRIMARY KEY("bird_id","related_bird_id")
);
--> statement-breakpoint
CREATE TABLE "bird_sounds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bird_id" uuid NOT NULL,
	"call_type" text NOT NULL,
	"audio_url" text,
	"spectrogram_url" text,
	"description" text,
	"season" text,
	"credit" text,
	"license" text,
	"macaulay_id" text,
	"source_id" uuid,
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
ALTER TABLE "bird_behaviors" ADD CONSTRAINT "bird_behaviors_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_details" ADD CONSTRAINT "bird_details_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_identification" ADD CONSTRAINT "bird_identification_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_images" ADD CONSTRAINT "bird_images_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_images" ADD CONSTRAINT "bird_images_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_related_species" ADD CONSTRAINT "bird_related_species_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_related_species" ADD CONSTRAINT "bird_related_species_related_bird_id_birds_id_fk" FOREIGN KEY ("related_bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_sounds" ADD CONSTRAINT "bird_sounds_bird_id_birds_id_fk" FOREIGN KEY ("bird_id") REFERENCES "public"."birds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bird_sounds" ADD CONSTRAINT "bird_sounds_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bird_id_sex_season_idx" ON "bird_identification" USING btree ("bird_id","sex","season");--> statement-breakpoint
CREATE INDEX "identification_color_size_idx" ON "bird_identification" USING btree ("primary_color","size_class");--> statement-breakpoint
CREATE INDEX "bird_images_bird_idx" ON "bird_images" USING btree ("bird_id");--> statement-breakpoint
CREATE INDEX "bird_images_primary_idx" ON "bird_images" USING btree ("bird_id","is_primary");--> statement-breakpoint
CREATE INDEX "bird_related_bird_idx" ON "bird_related_species" USING btree ("bird_id");--> statement-breakpoint
CREATE INDEX "bird_sounds_bird_idx" ON "bird_sounds" USING btree ("bird_id");