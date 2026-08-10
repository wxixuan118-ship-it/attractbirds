import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "postgresql://attractbirds_app:change-me@127.0.0.1:5432/attractbirds" },
});
