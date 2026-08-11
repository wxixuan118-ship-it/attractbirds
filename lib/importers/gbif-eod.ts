import { eq } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { birdDetails, birdOccurrenceStats, birdSources, birds, importRuns, locations, sources } from "../../db/schema.js";
import { birdWhitelist, pilotBirdSlugs } from "../../data/bird-whitelist.js";
import type { GbifOccurrenceSearchResult, GbifSpeciesMatch, ImportResult } from "./types.js";

const API="https://api.gbif.org/v1";
export const EOD_DATASET_KEY="4fa7b334-ce0d-4e88-aaae-2e0c138d049e";
export const EOD_VERSION="2024";

export const US_STATES=[
  ["Alabama","alabama"],["Alaska","alaska"],["Arizona","arizona"],["Arkansas","arkansas"],["California","california"],["Colorado","colorado"],["Connecticut","connecticut"],["Delaware","delaware"],["Florida","florida"],["Georgia","georgia"],["Hawaii","hawaii"],["Idaho","idaho"],["Illinois","illinois"],["Indiana","indiana"],["Iowa","iowa"],["Kansas","kansas"],["Kentucky","kentucky"],["Louisiana","louisiana"],["Maine","maine"],["Maryland","maryland"],["Massachusetts","massachusetts"],["Michigan","michigan"],["Minnesota","minnesota"],["Mississippi","mississippi"],["Missouri","missouri"],["Montana","montana"],["Nebraska","nebraska"],["Nevada","nevada"],["New Hampshire","new-hampshire"],["New Jersey","new-jersey"],["New Mexico","new-mexico"],["New York","new-york"],["North Carolina","north-carolina"],["North Dakota","north-dakota"],["Ohio","ohio"],["Oklahoma","oklahoma"],["Oregon","oregon"],["Pennsylvania","pennsylvania"],["Rhode Island","rhode-island"],["South Carolina","south-carolina"],["South Dakota","south-dakota"],["Tennessee","tennessee"],["Texas","texas"],["Utah","utah"],["Vermont","vermont"],["Virginia","virginia"],["Washington","washington"],["West Virginia","west-virginia"],["Wisconsin","wisconsin"],["Wyoming","wyoming"],
] as const;

async function gbifGet<T>(path:string,params:Record<string,string|string[]>={}){const url=new URL(`${API}${path}`);for(const [key,value] of Object.entries(params)){if(Array.isArray(value))for(const item of value)url.searchParams.append(key,item);else url.searchParams.set(key,value)}const response=await fetch(url,{headers:{"User-Agent":"AttractBirds.app/0.1 (data import; https://attractbirds.app)"}});if(!response.ok)throw new Error(`GBIF ${path}: ${response.status}`);return response.json() as Promise<T>}

async function eodSource(){const db=getDb();const [source]=await db.insert(sources).values({organization:"Cornell Lab of Ornithology via GBIF",datasetIdentifier:EOD_DATASET_KEY,version:EOD_VERSION,sourceUrl:`https://www.gbif.org/dataset/${EOD_DATASET_KEY}`,license:"CC BY 4.0",licenseUrl:"https://creativecommons.org/licenses/by/4.0/",commercialUseAllowed:true,attribution:"EOD – eBird Observation Dataset. Cornell Lab of Ornithology, accessed via GBIF.org.",allowedFields:["taxonomy","occurrence","location","month"]}).onConflictDoUpdate({target:[sources.datasetIdentifier,sources.version],set:{importedAt:new Date()}}).returning();return source}

async function beginRun(importer:string){const db=getDb();const [run]=await db.insert(importRuns).values({importer,datasetIdentifier:EOD_DATASET_KEY,datasetVersion:EOD_VERSION}).returning();return run.id}
async function finishRun(id:string,result:ImportResult,failed=false){const db=getDb();await db.update(importRuns).set({status:failed?"failed":"succeeded",completedAt:new Date(),insertedCount:result.inserted,updatedCount:result.updated,skippedCount:result.skipped,errorCount:result.errors.length,metadata:{errors:result.errors.slice(0,20)}}).where(eq(importRuns.id,id))}

export async function seedUSStates(){const db=getDb();for(const [name,slug] of US_STATES)await db.insert(locations).values({name,slug,type:"state",status:"published",indexable:true,qualityScore:90}).onConflictDoUpdate({target:locations.slug,set:{name,status:"published",indexable:true,updatedAt:new Date()}});}

export async function importWhitelistTaxonomy(limit=100):Promise<ImportResult>{
  const result:ImportResult={source:"GBIF species + eBird EOD whitelist",inserted:0,updated:0,skipped:0,errors:[]}; const db=getDb();const source=await eodSource();const runId=await beginRun("gbif-eod-taxonomy");
  for(const item of birdWhitelist.slice(0,limit))try{
    const match=await gbifGet<GbifSpeciesMatch>("/species/match",{name:item.scientificName,kingdom:"Animalia",class:"Aves"});
    if(match.matchType!=="EXACT"||match.confidence<90){result.skipped++;result.errors.push(`${item.scientificName}: ${match.matchType}/${match.confidence}`);continue}
    const [existing]=await db.select({id:birds.id}).from(birds).where(eq(birds.scientificName,item.scientificName)).limit(1);
    const [bird]=await db.insert(birds).values({slug:item.slug,commonName:item.commonName,scientificName:item.scientificName,taxonomyOrder:match.order,taxonomyFamily:match.family,summary:`${item.commonName} is a North American bird selected for the AttractBirds backyard encyclopedia. This draft record requires editorial habitat and attraction guidance before publication.`,status:"draft",indexable:false,sourceCount:1}).onConflictDoUpdate({target:birds.scientificName,set:{slug:item.slug,commonName:item.commonName,taxonomyOrder:match.order,taxonomyFamily:match.family,updatedAt:new Date()}}).returning({id:birds.id});
    await db.insert(birdDetails).values({birdId:bird.id,genus:match.genus,gbifId:String(match.usageKey)}).onConflictDoUpdate({target:birdDetails.birdId,set:{genus:match.genus,gbifId:String(match.usageKey)}});
    await db.insert(birdSources).values({birdId:bird.id,sourceId:source.id,fieldName:"taxonomy",sourceRecordUrl:`https://www.gbif.org/species/${match.usageKey}`}).onConflictDoUpdate({target:[birdSources.birdId,birdSources.sourceId,birdSources.fieldName],set:{sourceRecordUrl:`https://www.gbif.org/species/${match.usageKey}`,retrievedAt:new Date()}});
    if(existing)result.updated++;else result.inserted++;
  }catch(error){result.errors.push(`${item.scientificName}: ${String(error)}`)}
  await finishRun(runId,result,result.errors.length===limit);return result;
}

export async function importStateMonthlyStats(stateSlug:string,scope:"pilot"|"whitelist"="pilot"):Promise<ImportResult>{
  const result:ImportResult={source:`GBIF eBird EOD monthly stats: ${stateSlug}`,inserted:0,updated:0,skipped:0,errors:[]};const db=getDb();const source=await eodSource();const runId=await beginRun("gbif-eod-state-monthly");
  const state=US_STATES.find(([,slug])=>slug===stateSlug);if(!state)throw new Error(`Unknown state ${stateSlug}`);const [location]=await db.select({id:locations.id}).from(locations).where(eq(locations.slug,stateSlug)).limit(1);if(!location)throw new Error("Run states import first");
  const selected=scope==="pilot"?birdWhitelist.filter(x=>pilotBirdSlugs.includes(x.slug)):birdWhitelist;
  for(const item of selected){const [bird]=await db.select({id:birds.id}).from(birds).where(eq(birds.scientificName,item.scientificName)).limit(1);if(!bird){result.skipped++;continue}
    let data:GbifOccurrenceSearchResult;try{data=await gbifGet<GbifOccurrenceSearchResult>("/occurrence/search",{datasetKey:EOD_DATASET_KEY,scientificName:item.scientificName,country:"US",stateProvince:state[0],year:"2020,2024",limit:"0",facet:["month","year"],facetLimit:"20"})}catch(error){result.errors.push(`${item.slug}: ${String(error)}`);continue}
    const monthFacet=data.facets?.find(facet=>facet.field.toLowerCase()==="month");const yearFacet=data.facets?.find(facet=>facet.field.toLowerCase()==="year");const counts=Array.from({length:12},(_,index)=>monthFacet?.counts.find(entry=>Number(entry.name)===index+1)?.count??0);const observedYears=yearFacet?.counts.filter(entry=>entry.count>0).length??0;
    const max=Math.max(...counts,1);
    for(let index=0;index<12;index++){const count=counts[index];const relative=count/max;const status=count===0?"not-detected":relative>=.35?"regular":relative>=.1?"seasonal":"rare";const confidence=Math.min(1,Math.log10(count+1)/3);await db.insert(birdOccurrenceStats).values({birdId:bird.id,locationId:location.id,month:index+1,observationCount:count,recentYearCount:count>0?observedYears:0,frequencyScore:relative,seasonalStatus:status,confidence,datasetVersion:EOD_VERSION,sourceId:source.id}).onConflictDoUpdate({target:[birdOccurrenceStats.birdId,birdOccurrenceStats.locationId,birdOccurrenceStats.month,birdOccurrenceStats.datasetVersion],set:{observationCount:count,recentYearCount:count>0?observedYears:0,frequencyScore:relative,seasonalStatus:status,confidence,sourceId:source.id,updatedAt:new Date()}});result.updated++}
  }
  await finishRun(runId,result,result.errors.length>0);return result;
}
