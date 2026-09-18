#!/usr/bin/env node
/**
 * Pick one openly licensed Wikimedia Commons photo for each species that
 * heads a "{group} in {state}" page, convert it to WebP under
 * public/images/birds/, and record attribution in data/group-images.json.
 *
 *   node --import tsx scripts/fetch-group-images.mjs            # fetch missing
 *   node --import tsx scripts/fetch-group-images.mjs --refetch slug1 slug2   # replace specific picks
 *
 * Selection prefers Commons quality/featured/valued images, then resolution,
 * landscape orientation, and titles that name the species; museum specimens,
 * eggs, maps and artwork are excluded by title/description.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const UA = "AttractBirds.app/0.1 (https://attractbirds.app)";
const OK = new Set(["CC BY 4.0", "CC BY 3.0", "CC BY 2.0", "CC BY-SA 4.0", "CC BY-SA 3.0", "CC BY-SA 2.0", "CC0", "Public domain"]);
const BAD = /\beggs?\b|\bnests?\b|skull|specimen|museum|MHNT|\bmap\b|\brange map\b|drawing|illustration|\bplate\b|painting|taxidermy|\bmounted\b|\bfeathers?\b|\bdead\b|carcass|roadkill|captive|\bzoo\b|aviary|\bchicks?\b|juvenile|nestling|fledgling|duckling|conservancy|\btrust\b|rehab|falconry|\bcentre\b|\bcenter\b|young are/i;

const { getGroupTopSpecies } = await import("../lib/group-data.ts");
const args = process.argv.slice(2);
const refetch = new Set(args.includes("--refetch") ? args.slice(args.indexOf("--refetch") + 1) : []);

const metaPath = path.resolve("data/group-images.json");
const images = JSON.parse(await readFile(metaPath, "utf8"));
const outDir = path.resolve("public/images/birds");
await mkdir(outDir, { recursive: true });

const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
async function api(params) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  for (const [k, v] of Object.entries({ action: "query", format: "json", ...params })) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  return res.json();
}
function candidatesFrom(d) {
  return Object.values(d.query?.pages ?? {}).filter((p) => p.imageinfo).map((p) => {
    const ii = p.imageinfo[0]; const m = ii.extmetadata ?? {};
    return { title: p.title, license: strip(m.LicenseShortName?.value), licenseUrl: strip(m.LicenseUrl?.value), artist: strip(m.Artist?.value), w: ii.width, h: ii.height, thumb: ii.thumburl, tw: ii.thumbwidth, th: ii.thumbheight, page: ii.descriptionurl, desc: strip(m.ImageDescription?.value).slice(0, 200), assess: strip(m.Assessments?.value) };
  });
}
async function pick(commonName, scientificName) {
  const seen = new Map();
  for (const q of [`"${scientificName}"`, `"${commonName}"`]) {
    const d = await api({ generator: "search", gsrsearch: `${q} filetype:bitmap`, gsrnamespace: 6, gsrlimit: 40, prop: "imageinfo", iiprop: "url|extmetadata|size", iiurlwidth: 1280 });
    for (const c of candidatesFrom(d)) seen.set(c.title, c);
  }
  const names = (c) => (new RegExp(commonName.replace(/[-']/g, ".?"), "i").test(c.title + c.desc) ? 0 : 1) + (new RegExp(scientificName, "i").test(c.title + c.desc) ? 0 : 1);
  // Require the species name in the title or description so we never pick a look-alike.
  const cands = [...seen.values()].filter((c) => OK.has(c.license) && c.w >= 1600 && c.w > c.h && !BAD.test(c.title + " " + c.desc) && names(c) < 2);
  cands.sort((a, b) => (a.assess ? 0 : 1) - (b.assess ? 0 : 1) || names(a) - names(b) || b.w - a.w);
  return cands[0];
}

// Hand-picked titles where the automatic choice was a poor photo (tiny subject, injured bird, museum exhibit…).
const OVERRIDE = {
  "black-bellied-whistling-duck": "File:Black-bellied Whistling Duck - Dendrocygna autumnalis, Wakodahatchee Wetlands, Boynton Beach, Florida, February 7, 2022 (52779400905).jpg",
  "acorn-woodpecker": "File:Acorn woodpecker (Melanerpes formicivorus striatipectus) male.jpg",
  "california-scrub-jay": "File:California Scrub-Jay (Aphelocoma Californica) perched in a Toyon shrub.jpg",
  "chestnut-backed-chickadee": "File:Chestnut-backed chickadee (Poecile rufescens rufescens) Seward Park.jpg",
  "broad-tailed-hummingbird": "File:Broad-tailed Hummingbird male, in flight; Selasphorus platycercus.JPG",
  "northern-cardinal": "File:Northern cardinal in Prospect Park (60690).jpg",
  "american-robin": "File:American robin (71307).jpg",
  "tufted-titmouse": "File:Tufted titmouse (84917).jpg",
};
// Species that need a photo beyond the group-page leaders (bird profiles, feeder/plant guides).
const EXTRA_SPECIES = [
  { slug: "northern-cardinal", commonName: "Northern Cardinal", scientificName: "Cardinalis cardinalis" },
  { slug: "american-robin", commonName: "American Robin", scientificName: "Turdus migratorius" },
  { slug: "tufted-titmouse", commonName: "Tufted Titmouse", scientificName: "Baeolophus bicolor" },
];
async function exact(title) {
  const d = await api({ titles: title, prop: "imageinfo", iiprop: "url|extmetadata|size", iiurlwidth: 1280 });
  return candidatesFrom(d)[0];
}
const wanted = new Map();
for (const t of [...getGroupTopSpecies(), ...EXTRA_SPECIES]) wanted.set(t.slug, t);
let n = 0;
for (const [slug, t] of wanted) {
  if (images[slug] && !refetch.has(slug)) continue;
  const c = OVERRIDE[slug] ? await exact(OVERRIDE[slug]) : await pick(t.commonName, t.scientificName);
  if (!c) { console.error(`  NONE for ${t.commonName}`); continue; }
  const res = await fetch(c.thumb, { headers: { "User-Agent": UA } });
  const tmp = `/tmp/${slug}.jpg`;
  await writeFile(tmp, Buffer.from(await res.arrayBuffer()));
  const webp = path.join(outDir, `${slug}.webp`);
  execFileSync("cwebp", ["-quiet", "-q", "80", tmp, "-o", webp]);
  images[slug] = { species: t.commonName, src: `/images/birds/${slug}.webp`, width: c.tw, height: c.th, credit: c.artist || "Wikimedia Commons contributor", creditUrl: c.page, license: c.license, licenseUrl: c.licenseUrl || (c.license === "CC0" ? "https://creativecommons.org/publicdomain/zero/1.0/" : c.license === "Public domain" ? "https://commons.wikimedia.org/wiki/Commons:Licensing" : ""), title: c.title };
  console.error(`  ${++n}. ${t.commonName}: ${c.title} | ${c.license} | ${c.artist.slice(0, 30)} | ${c.assess || "-"}`);
}
await writeFile(metaPath, JSON.stringify(Object.fromEntries(Object.entries(images).sort()), null, 1) + "\n");
console.error(`${Object.keys(images).length} species images recorded; ${wanted.size} needed`);
