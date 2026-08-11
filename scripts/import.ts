/** Commercial-safe Bird Encyclopedia import runner.
 * Production occurrence and taxonomy inputs use the CC BY 4.0 eBird
 * Observation Dataset published through GBIF, not the non-commercial eBird API.
 */
import { importStateMonthlyStats, importWhitelistTaxonomy, seedUSStates } from "../lib/importers/gbif-eod.js";
import { importAllBirdImages as gbifImages } from "../lib/importers/gbif.js";
import { importAllWikimediaImages as wikiImages } from "../lib/importers/wikimedia.js";

function print(label:string,result:{inserted:number;updated:number;skipped:number;errors:string[]}){console.log(`\n${label}: ${result.inserted} inserted, ${result.updated} updated, ${result.skipped} skipped, ${result.errors.length} errors`);if(result.errors.length)console.log(result.errors.slice(0,10).join("\n"))}

const [,,command,arg,scopeArg]=process.argv;
switch(command){
  case "taxonomy": print("GBIF/EOD taxonomy",await importWhitelistTaxonomy(Number(arg)||100));break;
  case "states": await seedUSStates();console.log("Seeded 50 US states");break;
  case "occurrences": print(`Monthly occurrences: ${arg??"california"}`,await importStateMonthlyStats(arg??"california",scopeArg==="whitelist"?"whitelist":"pilot"));break;
  case "images": if(arg==="wiki")print("Wikimedia images",await wikiImages({limit:4,delayMs:500}));else print("GBIF images",await gbifImages({limit:4,delayMs:350}));break;
  default: console.log(`Bird data commands:\n  taxonomy [limit]\n  states\n  occurrences [state-slug] [pilot|whitelist]\n  images [gbif|wiki]`);
}
process.exit(0);
