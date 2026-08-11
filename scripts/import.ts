/**
 * Bird data import runner
 *
 * Usage:
 *   npx tsx scripts/import.ts taxonomy          # Step 1 — seed all species from eBird
 *   npx tsx scripts/import.ts states            # Step 2 — seed US state location rows
 *   npx tsx scripts/import.ts occurrences CA    # Step 3 — occurrence data for one state
 *   npx tsx scripts/import.ts occurrences all   # Step 3b — all 50 states (slow, ~50 API calls)
 *   npx tsx scripts/import.ts images gbif       # Step 4a — GBIF CC images
 *   npx tsx scripts/import.ts images wiki       # Step 4b — Wikimedia Commons images
 *   npx tsx scripts/import.ts all               # Full pipeline (slow, do once)
 *
 * Required env vars:
 *   DATABASE_URL   — postgres connection string
 *   EBIRD_API_KEY  — free key from https://ebird.org/api/keygen
 */

import { getDb } from "../db/index.js";
import { locations } from "../db/schema.js";
import { eq } from "drizzle-orm";
import {
  importTaxonomy,
  seedUSStates,
  importStateOccurrences,
  US_STATES,
} from "../lib/importers/ebird.js";
import { importAllBirdImages as gbifImages } from "../lib/importers/gbif.js";
import { importAllWikimediaImages as wikiImages } from "../lib/importers/wikimedia.js";

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) { console.error(`Missing env var: ${key}`); process.exit(1); }
  return v;
}

function printResult(label: string, r: { inserted: number; updated: number; skipped: number; errors: string[] }) {
  console.log(`\n── ${label} ──`);
  console.log(`  inserted: ${r.inserted}`);
  console.log(`  updated:  ${r.updated}`);
  console.log(`  skipped:  ${r.skipped}`);
  if (r.errors.length) console.log(`  errors (${r.errors.length}):`, r.errors.slice(0, 5));
}

// ─── Commands ──────────────────────────────────────────────────────────────────

async function runTaxonomy() {
  const key = requireEnv("EBIRD_API_KEY");
  const r = await importTaxonomy(key);
  printResult("eBird taxonomy", r);
}

async function runStates() {
  await seedUSStates();
}

async function runOccurrences(stateArg: string) {
  const key = requireEnv("EBIRD_API_KEY");
  const db = getDb();

  const statesToRun = stateArg === "all"
    ? US_STATES
    : US_STATES.filter((s) => s.code.endsWith(stateArg.toUpperCase()) || s.slug === stateArg.toLowerCase());

  if (statesToRun.length === 0) {
    console.error(`Unknown state: ${stateArg}. Use a 2-letter code (CA) or slug (california), or "all".`);
    process.exit(1);
  }

  for (const state of statesToRun) {
    const [loc] = await db
      .select({ id: locations.id })
      .from(locations)
      .where(eq(locations.slug, state.slug))
      .limit(1);

    if (!loc) {
      console.warn(`Location row missing for ${state.name} — run "states" first`);
      continue;
    }

    const r = await importStateOccurrences(key, state.code, loc.id);
    printResult(`Occurrences: ${state.name}`, r);

    // small delay between state calls
    if (stateArg === "all") await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function runImages(source: string) {
  if (source === "gbif") {
    const r = await gbifImages({ limit: 5, delayMs: 300 });
    printResult("GBIF images", r);
  } else if (source === "wiki") {
    const r = await wikiImages({ limit: 4, delayMs: 500 });
    printResult("Wikimedia images", r);
  } else {
    console.error(`Unknown image source: ${source}. Use "gbif" or "wiki".`);
    process.exit(1);
  }
}

async function runAll() {
  console.log("=== Full import pipeline ===\n");
  await runTaxonomy();
  await runStates();
  // California as a sample — run all states separately if needed
  await runOccurrences("CA");
  await runImages("gbif");
  await runImages("wiki");
  console.log("\n=== Done ===");
}

// ─── Router ───────────────────────────────────────────────────────────────────

const [,, command, arg] = process.argv;

switch (command) {
  case "taxonomy":    await runTaxonomy(); break;
  case "states":      await runStates(); break;
  case "occurrences": await runOccurrences(arg ?? "all"); break;
  case "images":      await runImages(arg ?? "gbif"); break;
  case "all":         await runAll(); break;
  default:
    console.log(`
Bird data import runner

Commands:
  taxonomy              Seed all ~11,000 species from eBird taxonomy
  states                Seed US state location rows
  occurrences [state]   Import bird × location data (state code, slug, or "all")
  images [gbif|wiki]    Import CC-licensed images from GBIF or Wikimedia
  all                   Full pipeline

Examples:
  npx tsx scripts/import.ts taxonomy
  npx tsx scripts/import.ts occurrences CA
  npx tsx scripts/import.ts occurrences all
  npx tsx scripts/import.ts images gbif
    `);
}

process.exit(0);
