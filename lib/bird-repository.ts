import { pilotBirds } from "../data/pilot-birds";
import { birdCatalog, type CatalogBird } from "../data/bird-catalog";

export type BirdPageData = {
  slug:string; commonName:string; scientificName:string; family:string; hook:string; initials:string;
  colors:string; size:string; diet:string; habitat:string; residentStatus:string; summary:string;
  foods:string[]; plants:string[]; feeders:string[];
  identification?:string|null; migrationPattern?:string|null; nestType?:string|null; nestLocations?:string[]|null; clutchSize?:string|null;
  imageUrl?:string|null; imageAlt?:string|null; imageAttribution?:string|null; imageSourceUrl?:string|null; imageLicenseUrl?:string|null;
  sourceUrl?:string|null;
  qualityScore:number; sourceCount:number;
};

function fallbackBird(item:(typeof pilotBirds)[number]):BirdPageData{return {slug:item.slug,commonName:item.commonName,scientificName:item.scientificName,family:item.family,hook:item.residentStatus,initials:item.commonName.split(/\s+/).map(x=>x[0]).join("").slice(0,2),colors:item.colors.join(", "),size:`${item.size[0]}–${item.size[1]} cm`,diet:item.dietSummary,habitat:item.habitats.join(", "),residentStatus:item.residentStatus,summary:item.summary,foods:item.foods,plants:item.plants,feeders:item.feeders,identification:item.identification.features,migrationPattern:item.behavior.migrationPattern,nestType:item.behavior.nestType,nestLocations:item.behavior.nestLocations,clutchSize:item.behavior.clutchSize,qualityScore:85,sourceCount:1}}

const fallback=pilotBirds.map(fallbackBird);
function catalogProfile(item:CatalogBird):BirdPageData {
  const reviewed=fallback.find(bird=>bird.slug===item.slug);
  if(reviewed)return reviewed;
  const waterbird=/Anatidae|Alcidae|Gaviidae|Podicipedidae|Procellariidae|Pelecanidae|Ardeidae|Rallidae|Scolopacidae|Laridae/.test(item.family);
  const raptor=/Accipitridae|Falconidae|Cathartidae|Pandionidae/.test(item.family);
  const owl=/Strigidae|Tytonidae/.test(item.family);
  const hummingbird=item.family==="Trochilidae";
  const woodpecker=item.family==="Picidae";
  const habitat=waterbird?"Wetlands, coasts, lakes, rivers, or open water":raptor?"Open country, woodland edges, cliffs, and forest":owl?"Woodland, forest edges, grassland, and suitable roost sites":hummingbird?"Flower-rich woodland edges, scrub, gardens, and open habitats":woodpecker?"Woodland, forest edges, orchards, and areas with mature trees":"Habitat varies across the species' documented range";
  const diet=raptor||owl?"Animal prey; diet varies by species and season":hummingbird?"Flower nectar and small arthropods":woodpecker?"Insects, larvae, fruit, nuts, and sap depending on species":waterbird?"Aquatic plants or animals depending on species":"Natural foods vary by species, habitat, and season";
  const status=item.accidental?"Accidental or casual in the AOS checklist area":item.nonbreeding?"Regular nonbreeding visitor in parts of the AOS checklist area":item.introduced?"Introduced in parts of the AOS checklist area":"Recorded in the North and Middle American checklist area";
  return {
    slug:item.slug,commonName:item.commonName,scientificName:item.scientificName,family:item.family,
    hook:`${item.order} · ${item.family}`,
    initials:item.commonName.split(/\s+/).map(x=>x[0]).join("").slice(0,2),colors:"Plumage varies by age, sex, season, and population",size:"Consult a regional field guide",diet,habitat,residentStatus:status,
    summary:`The ${item.commonName} (${item.scientificName}) is a member of the ${item.family} family in the order ${item.order}. This taxonomic profile follows the American Ornithological Society checklist; local abundance and seasonality should be confirmed with current regional observations.`,
    foods:raptor||owl?["Natural prey; do not bait"]:hummingbird?["Native flower nectar","Small insects"]:waterbird?["Natural aquatic foods"]:["Species-appropriate natural foods"],
    plants:hummingbird?["Regionally native nectar flowers"]:["Regionally native plants that provide cover and natural food"],
    feeders:raptor||owl||waterbird?["Not typically a feeder species"]:hummingbird?["Clean nectar feeder where appropriate"]:["Use only after confirming species-specific guidance"],
    identification:`Confirm identification using overall shape, bill form, plumage pattern, voice, behavior, habitat, and range. Compare similar ${item.family} species in a current regional field guide.`,
    migrationPattern:"Varies across the species' range; use current regional records",
    nestType:"Species-specific",nestLocations:["Suitable habitat within the breeding range"],clutchSize:"Varies",
    sourceUrl:`https://checklist.americanornithology.org/taxa/${item.sourceId}`,
    qualityScore:65,sourceCount:1,
  };
}

const candidateFallback:BirdPageData[]=birdCatalog.map(item=>{
  const reviewed=fallback.find(bird=>bird.slug===item.slug);
  if(reviewed)return reviewed;
  return catalogProfile(item);
});
const shouldUseDatabase=()=>Boolean(process.env.DATABASE_URL)&&process.env.ATTRACTBIRDS_STATIC_ONLY!=="1";

export function getBirdStaticParams(){return birdCatalog.map(({slug})=>({slug}))}

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
