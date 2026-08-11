import { pilotBirds } from "../data/pilot-birds";
import { birdWhitelist } from "../data/bird-whitelist";

export type BirdPageData = {
  slug:string; commonName:string; scientificName:string; family:string; hook:string; initials:string;
  colors:string; size:string; diet:string; habitat:string; residentStatus:string; summary:string;
  foods:string[]; plants:string[]; feeders:string[];
  identification?:string|null; migrationPattern?:string|null; nestType?:string|null; nestLocations?:string[]|null; clutchSize?:string|null;
  imageUrl?:string|null; imageAlt?:string|null; imageAttribution?:string|null; imageSourceUrl?:string|null; imageLicenseUrl?:string|null;
  qualityScore:number; sourceCount:number;
};

function fallbackBird(item:(typeof pilotBirds)[number]):BirdPageData{return {slug:item.slug,commonName:item.commonName,scientificName:item.scientificName,family:item.family,hook:item.residentStatus,initials:item.commonName.split(/\s+/).map(x=>x[0]).join("").slice(0,2),colors:item.colors.join(", "),size:`${item.size[0]}–${item.size[1]} cm`,diet:item.dietSummary,habitat:item.habitats.join(", "),residentStatus:item.residentStatus,summary:item.summary,foods:item.foods,plants:item.plants,feeders:item.feeders,identification:item.identification.features,migrationPattern:item.behavior.migrationPattern,nestType:item.behavior.nestType,nestLocations:item.behavior.nestLocations,clutchSize:item.behavior.clutchSize,qualityScore:85,sourceCount:1}}

const fallback=pilotBirds.map(fallbackBird);
const candidateFallback:BirdPageData[]=birdWhitelist.map(item=>{
  const reviewed=fallback.find(bird=>bird.slug===item.slug);
  if(reviewed)return reviewed;
  return {
    slug:item.slug,commonName:item.commonName,scientificName:item.scientificName,family:"Taxonomy pending review",
    hook:"North American backyard bird profile queued for editorial review",
    initials:item.commonName.split(/\s+/).map(x=>x[0]).join("").slice(0,2),
    colors:"Pending review",size:"Pending review",diet:"Pending review",habitat:"Pending review",
    residentStatus:"Distribution and seasonal status pending review",
    summary:`${item.commonName} is included in the AttractBirds 100-species editorial pipeline. Its identification, diet, habitat, attraction, and nesting guidance is being prepared and will appear at this permanent URL after review.`,
    foods:[],plants:[],feeders:[],qualityScore:0,sourceCount:0,
  };
});
const shouldUseDatabase=()=>Boolean(process.env.DATABASE_URL)&&process.env.ATTRACTBIRDS_STATIC_ONLY!=="1";

export function getBirdStaticParams(){return birdWhitelist.map(({slug})=>({slug}))}

export async function getPublishedBirds():Promise<BirdPageData[]>{
  if(!shouldUseDatabase())return candidateFallback;
  try{
    const [{getDb},schema,orm]=await Promise.all([import("../db/index"),import("../db/schema"),import("drizzle-orm")]);
    const db=getDb();
    const rows=await db.select().from(schema.birds).where(orm.and(orm.eq(schema.birds.status,"published"),orm.eq(schema.birds.indexable,true))).orderBy(orm.asc(schema.birds.commonName));
    const published=rows.map(row=>({slug:row.slug,commonName:row.commonName,scientificName:row.scientificName,family:row.taxonomyFamily??"Aves",hook:row.residentStatus??"North American bird",initials:row.commonName.split(/\s+/).map(x=>x[0]).join("").slice(0,2),colors:(row.colors??[]).join(", "),size:row.sizeMinCm&&row.sizeMaxCm?`${row.sizeMinCm}–${row.sizeMaxCm} cm`:"See profile",diet:"Open profile for food guidance",habitat:(row.habitats??[]).join(", "),residentStatus:row.residentStatus??"Distribution varies",summary:row.summary,foods:[],plants:[],feeders:[],qualityScore:row.qualityScore,sourceCount:row.sourceCount}));
    const publishedSlugs=new Set(published.map(item=>item.slug));
    return [...published,...candidateFallback.filter(item=>!publishedSlugs.has(item.slug))].sort((a,b)=>a.commonName.localeCompare(b.commonName));
  }catch(error){console.warn("PostgreSQL unavailable; using reviewed build snapshot.",error);return candidateFallback}
}

export async function getBirdBySlug(slug:string):Promise<BirdPageData|undefined>{
  if(!shouldUseDatabase())return candidateFallback.find(item=>item.slug===slug);
  try{return await hydrate(slug)}catch(error){console.warn(`PostgreSQL lookup failed for ${slug}; using reviewed build snapshot.`,error);return candidateFallback.find(item=>item.slug===slug)}
}

async function hydrate(slug:string):Promise<BirdPageData>{
  const [{getDb},schema,orm]=await Promise.all([import("../db/index"),import("../db/schema"),import("drizzle-orm")]);const db=getDb();
  const [row]=await db.select().from(schema.birds).where(orm.and(orm.eq(schema.birds.slug,slug),orm.eq(schema.birds.status,"published"))).limit(1);if(!row)throw new Error("Bird not found");
  const [foodRows,plantRows,feederRows,identRows,behaviorRows,imageRows]=await Promise.all([
    db.select({name:schema.foods.name}).from(schema.birdFoods).innerJoin(schema.foods,orm.eq(schema.birdFoods.foodId,schema.foods.id)).where(orm.eq(schema.birdFoods.birdId,row.id)),
    db.select({name:schema.plants.commonName}).from(schema.birdPlants).innerJoin(schema.plants,orm.eq(schema.birdPlants.plantId,schema.plants.id)).where(orm.eq(schema.birdPlants.birdId,row.id)),
    db.select({name:schema.feeders.name}).from(schema.birdFeeders).innerJoin(schema.feeders,orm.eq(schema.birdFeeders.feederId,schema.feeders.id)).where(orm.eq(schema.birdFeeders.birdId,row.id)),
    db.select().from(schema.birdIdentification).where(orm.and(orm.eq(schema.birdIdentification.birdId,row.id),orm.eq(schema.birdIdentification.sex,"unknown"),orm.eq(schema.birdIdentification.season,"all"))).limit(1),
    db.select().from(schema.birdBehaviors).where(orm.eq(schema.birdBehaviors.birdId,row.id)).limit(1),
    db.select().from(schema.birdImages).where(orm.and(orm.eq(schema.birdImages.birdId,row.id),orm.eq(schema.birdImages.isPrimary,true))).limit(1),
  ]);
  const behavior=behaviorRows[0],image=imageRows[0];return {slug:row.slug,commonName:row.commonName,scientificName:row.scientificName,family:row.taxonomyFamily??"Aves",hook:row.residentStatus??"North American bird",initials:row.commonName.split(/\s+/).map(x=>x[0]).join("").slice(0,2),colors:(row.colors??[]).join(", "),size:row.sizeMinCm&&row.sizeMaxCm?`${row.sizeMinCm}–${row.sizeMaxCm} cm`:"See profile",diet:foodRows.map(x=>x.name).slice(0,3).join(", ")||"Varied natural foods",habitat:(row.habitats??[]).join(", "),residentStatus:row.residentStatus??"Distribution varies by location and season",summary:row.summary,foods:foodRows.map(x=>x.name),plants:plantRows.map(x=>x.name),feeders:feederRows.map(x=>x.name),identification:identRows[0]?.distinguishingFeatures,migrationPattern:behavior?.migrationPattern,nestType:behavior?.nestType,nestLocations:behavior?.nestLocations,clutchSize:behavior?.clutchSize,imageUrl:image?.thumbnailUrl??image?.imageUrl,imageAlt:image?.altText,imageAttribution:image?.attributionText,imageSourceUrl:image?.sourcePageUrl,imageLicenseUrl:image?.licenseUrl,qualityScore:row.qualityScore,sourceCount:row.sourceCount};
}
