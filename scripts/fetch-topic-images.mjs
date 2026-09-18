#!/usr/bin/env node
/**
 * Pick openly licensed Wikimedia Commons photos for non-species topics
 * (feeder types, plants, guides) into public/images/topics/ and record
 * attribution in data/topic-images.json.
 *
 *   node scripts/fetch-topic-images.mjs                 # fetch anything missing from TOPICS
 *   node scripts/fetch-topic-images.mjs --refetch key…  # replace specific picks
 *
 * Each TOPICS entry: key, query (Commons search), optional `must` regex the
 * title/description has to match, optional `exact` file title override.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const UA = "AttractBirds.app/0.1 (https://attractbirds.app)";
const OK = new Set(["CC BY 4.0", "CC BY 3.0", "CC BY 2.0", "CC BY-SA 4.0", "CC BY-SA 3.0", "CC BY-SA 2.0", "CC0", "Public domain"]);
const BAD = /drawing|illustration|diagram|logo|icon|clipart|map|\.svg|patent|catalog|advert|packaging|label|screenshot/i;

export const TOPICS = [
  { key: "tube-feeder", query: "x", exact: "File:American Goldfinch 3630 (5063387286).jpg" },
  { key: "hopper-feeder", query: "x", exact: "File:20250514 northern cardinal casa PD200398.jpg" },
  { key: "platform-feeder", query: "x", exact: "File:A dark-eyed junco, black-capped chickadee and northern cardinal visiting a feeder at Minnesota Valley National Wildlife Refuge (32021162008).jpg" },
  { key: "suet-feeder", query: "x", exact: "File:Hairy woodpecker visiting a suet feeder (44078427800).jpg" },
  { key: "hummingbird-feeder", query: "x", exact: "File:Ruby-throated hummingbird (50036595273).jpg" },
  { key: "window-feeder", query: "window bird feeder", must: /window/i },
  { key: "finch-mesh-feeder", query: "x", exact: "File:Goldfinch at tube feeder.JPG" },
  { key: "peanut-feeder", query: "x", exact: "File:Feeding frenzy - Flickr - katerha.jpg" },
  { key: "ground-feeder", query: "mourning dove ground feeding seed", must: /dove|ground/i },
  { key: "squirrel-baffle", query: "x", exact: "File:Black Squirrel 9434 (14083337440).jpg" },
  { key: "bird-bath", query: "x", exact: "File:American Robin (42253318841).jpg" },
  { key: "balcony-feeder", query: "x", exact: "File:House finch (33687)2.jpg" },
  { key: "black-oil-sunflower", query: "x", exact: "File:Black-capped chickadee (31171).jpg" },
  { key: "safflower", query: "safflower seed birds", must: /safflower/i },
  { key: "millet", query: "x", exact: "File:Mourning Dove eating seeds off ground.jpg" },
  { key: "suet", query: "suet cake birds", must: /suet/i },
  { key: "nest-box", query: "bluebird nest box", must: /box|birdhouse/i },
  { key: "cardinal-flower", query: "Lobelia cardinalis flower", must: /Lobelia|cardinal flower/i },
  { key: "trumpet-honeysuckle", query: "Lonicera sempervirens", must: /Lonicera|honeysuckle/i },
  { key: "american-elderberry", query: "Sambucus canadensis berries", must: /Sambucus|elderberry/i },
  { key: "canadian-serviceberry", query: "Amelanchier canadensis", must: /Amelanchier|serviceberry/i },
  { key: "flowering-dogwood", query: "Cornus florida flowers", must: /Cornus|dogwood/i },
  { key: "winterberry", query: "Ilex verticillata berries", must: /Ilex|winterberry/i },
  { key: "common-sunflower", query: "Helianthus annuus goldfinch", must: /Helianthus|sunflower/i },
  { key: "purple-coneflower", query: "Echinacea purpurea goldfinch", must: /Echinacea|coneflower/i },
  { key: "american-holly", query: "Ilex opaca berries", must: /Ilex opaca|American holly/i },
  { key: "eastern-red-cedar", query: "x", exact: "File:Juniperus virginiana cone (St Joseph Twp) 1.jpg" },
  { key: "black-eyed-susan", query: "Rudbeckia hirta", must: /Rudbeckia|black-eyed/i },
  { key: "common-buttonbush", query: "Cephalanthus occidentalis flower", must: /Cephalanthus|buttonbush/i },
  { key: "virginia-creeper", query: "Parthenocissus quinquefolia berries", must: /Parthenocissus|creeper/i },
  { key: "wild-bergamot", query: "Monarda fistulosa", must: /Monarda|bergamot/i },
  { key: "american-beech", query: "Fagus grandifolia", must: /Fagus|beech/i },
  { key: "paper-birch", query: "Betula papyrifera", must: /Betula|birch/i },
  { key: "red-mulberry", query: "Morus rubra fruit", must: /Morus|mulberry/i },
];

const args = process.argv.slice(2);
const refetch = new Set(args.includes("--refetch") ? args.slice(args.indexOf("--refetch") + 1) : []);
const metaPath = path.resolve("data/topic-images.json");
let images = {};
try { images = JSON.parse(await readFile(metaPath, "utf8")); } catch { /* first run */ }
const outDir = path.resolve("public/images/topics");
await mkdir(outDir, { recursive: true });

const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
async function api(params) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  for (const [k, v] of Object.entries({ action: "query", format: "json", ...params })) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  return res.json();
}
const candidatesFrom = (d) => Object.values(d.query?.pages ?? {}).filter((p) => p.imageinfo).map((p) => { const ii = p.imageinfo[0]; const m = ii.extmetadata ?? {}; return { title: p.title, license: strip(m.LicenseShortName?.value), licenseUrl: strip(m.LicenseUrl?.value), artist: strip(m.Artist?.value), w: ii.width, h: ii.height, thumb: ii.thumburl, tw: ii.thumbwidth, th: ii.thumbheight, page: ii.descriptionurl, desc: strip(m.ImageDescription?.value).slice(0, 200), assess: strip(m.Assessments?.value) }; });

async function pick(t) {
  if (t.exact) { const d = await api({ titles: t.exact, prop: "imageinfo", iiprop: "url|extmetadata|size", iiurlwidth: 1280 }); return candidatesFrom(d)[0]; }
  const d = await api({ generator: "search", gsrsearch: `${t.query} filetype:bitmap`, gsrnamespace: 6, gsrlimit: 40, prop: "imageinfo", iiprop: "url|extmetadata|size", iiurlwidth: 1280 });
  const cands = candidatesFrom(d).filter((c) => OK.has(c.license) && c.w >= 1400 && c.w > c.h && !BAD.test(c.title + " " + c.desc) && (!t.must || t.must.test(c.title + " " + c.desc)));
  cands.sort((a, b) => (a.assess ? 0 : 1) - (b.assess ? 0 : 1) || b.w - a.w);
  return cands[0];
}

let n = 0;
for (const t of TOPICS) {
  if (images[t.key] && !refetch.has(t.key)) continue;
  const c = await pick(t);
  if (!c) { console.error(`  NONE for ${t.key}`); continue; }
  const res = await fetch(c.thumb, { headers: { "User-Agent": UA } });
  const tmp = `/tmp/topic-${t.key}.jpg`;
  await writeFile(tmp, Buffer.from(await res.arrayBuffer()));
  const webp = path.join(outDir, `${t.key}.webp`);
  execFileSync("cwebp", ["-quiet", "-q", "80", tmp, "-o", webp]);
  images[t.key] = { src: `/images/topics/${t.key}.webp`, width: c.tw, height: c.th, credit: c.artist || "Wikimedia Commons contributor", creditUrl: c.page, license: c.license, licenseUrl: c.licenseUrl || (c.license === "CC0" ? "https://creativecommons.org/publicdomain/zero/1.0/" : "https://commons.wikimedia.org/wiki/Commons:Licensing"), title: c.title, desc: c.desc };
  console.error(`  ${++n}. ${t.key}: ${c.title} | ${c.license} | ${c.artist.slice(0, 30)} | ${c.assess || "-"}`);
}
await writeFile(metaPath, JSON.stringify(images, null, 1) + "\n");
console.error(`${Object.keys(images).length} topic images recorded`);
