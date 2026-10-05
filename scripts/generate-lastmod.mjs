#!/usr/bin/env node
/**
 * Write data/lastmod.json: the last-modified date (YYYY-MM-DD) of every tracked
 * content source under app/, data/ and lib/, taken from git history. Files with
 * uncommitted changes get today's date. app/sitemap.xml maps each URL to the
 * files it is rendered from and uses the newest of their dates as <lastmod>.
 *
 * Runs before every build (npm "prebuild"). Without git (e.g. a tarball build)
 * it leaves the committed data/lastmod.json untouched.
 *
 *   node scripts/generate-lastmod.mjs
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const ROOTS = ["app", "data", "lib"];
const OUT = "data/lastmod.json";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

try {
  git(["rev-parse", "--is-inside-work-tree"]);
} catch {
  console.error("generate-lastmod: not a git checkout; keeping committed data/lastmod.json");
  process.exit(0);
}

const dates = {};
// Newest commit first, so the first date seen for a file is its last change.
let current = "";
for (const line of git(["log", "--format=@%cs", "--name-only", "--", ...ROOTS]).split("\n")) {
  if (line.startsWith("@")) current = line.slice(1);
  else if (line && !(line in dates)) dates[line] = current;
}

const today = new Date().toISOString().slice(0, 10);
for (const line of git(["status", "--porcelain", "--", ...ROOTS]).split("\n")) {
  const file = line.slice(3).split(" -> ").pop().trim();
  if (file && !file.endsWith("/")) dates[file] = today;
}

const tracked = new Set(git(["ls-files", "--", ...ROOTS]).split("\n").filter(Boolean));
for (const line of git(["status", "--porcelain", "--untracked-files=all", "--", ...ROOTS]).split("\n")) {
  if (line.startsWith("??")) tracked.add(line.slice(3).trim());
}
const out = Object.fromEntries(Object.entries(dates).filter(([file]) => tracked.has(file) && file !== OUT).sort(([a], [b]) => a.localeCompare(b)));

writeFileSync(OUT, JSON.stringify(out, null, 1) + "\n");
console.error(`generate-lastmod: ${Object.keys(out).length} files → ${OUT}`);
