import { eq } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { birdBehaviors, birdDetails, birdFeeders, birdFoods, birdIdentification, birdPlants, birdSources, birds, feeders, foods, plants, sources } from "../db/schema.js";
import { pilotBirds } from "../data/pilot-birds.js";

const plantScientificNames: Record<string, string> = {
  "flowering dogwood":"Cornus florida", "American elderberry":"Sambucus canadensis", serviceberry:"Amelanchier canadensis",
  "native oak":"Quercus spp.", "American beech":"Fagus grandifolia", "purple coneflower":"Echinacea purpurea",
  sunflower:"Helianthus annuus", "native thistle":"Cirsium spp.", "native birch":"Betula spp.",
  "native willow":"Salix spp.", winterberry:"Ilex verticillata", crabapple:"Malus spp.", "native grasses":"Poaceae spp.",
  coneflower:"Echinacea spp.", "cardinal flower":"Lobelia cardinalis", "trumpet honeysuckle":"Lonicera sempervirens", "native salvia":"Salvia spp.",
};

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

async function main() {
  const db = getDb();
  const [source] = await db.insert(sources).values({
    organization:"AttractBirds editorial", datasetIdentifier:"attractbirds-pilot-editorial", version:"2026-08-11",
    sourceUrl:"https://attractbirds.app/about/editorial-policy", license:"Original editorial content", commercialUseAllowed:true,
    attribution:"Original AttractBirds.app editorial synthesis based on independently verified ornithological facts.",
    allowedFields:["summary","identification","diet","behavior","attraction_guidance"],
  }).onConflictDoUpdate({ target:[sources.datasetIdentifier,sources.version], set:{ importedAt:new Date() } }).returning();

  for (const item of pilotBirds) {
    const [bird] = await db.insert(birds).values({
      slug:item.slug, commonName:item.commonName, scientificName:item.scientificName, taxonomyOrder:item.order,
      taxonomyFamily:item.family, sizeMinCm:item.size[0], sizeMaxCm:item.size[1], colors:item.colors,
      habitats:item.habitats, residentStatus:item.residentStatus, summary:item.summary,
      status:"published", indexable:true, qualityScore:85, sourceCount:1, reviewedAt:new Date(), lastVerifiedAt:new Date(),
    }).onConflictDoUpdate({ target:birds.scientificName, set:{
      slug:item.slug, commonName:item.commonName, taxonomyOrder:item.order, taxonomyFamily:item.family,
      sizeMinCm:item.size[0], sizeMaxCm:item.size[1], colors:item.colors, habitats:item.habitats,
      residentStatus:item.residentStatus, summary:item.summary, status:"published", indexable:true,
      qualityScore:85, sourceCount:1, reviewedAt:new Date(), lastVerifiedAt:new Date(), updatedAt:new Date(),
    }}).returning({id:birds.id});

    await db.insert(birdDetails).values({ birdId:bird.id, genus:item.scientificName.split(" ")[0] }).onConflictDoUpdate({ target:birdDetails.birdId, set:{ genus:item.scientificName.split(" ")[0] } });
    await db.insert(birdIdentification).values({ birdId:bird.id, sex:"unknown", season:"all", primaryColor:item.identification.primaryColor, bodyColors:item.identification.bodyColors, sizeClass:item.identification.sizeClass, beakShape:item.identification.beakShape, tailShape:item.identification.tailShape, wingPattern:item.identification.wingPattern, distinguishingFeatures:item.identification.features }).onConflictDoUpdate({ target:[birdIdentification.birdId,birdIdentification.sex,birdIdentification.season], set:{ primaryColor:item.identification.primaryColor, bodyColors:item.identification.bodyColors, sizeClass:item.identification.sizeClass, beakShape:item.identification.beakShape, tailShape:item.identification.tailShape, wingPattern:item.identification.wingPattern, distinguishingFeatures:item.identification.features } });
    await db.insert(birdBehaviors).values({ birdId:bird.id, migratory:item.behavior.migratory, migrationPattern:item.behavior.migrationPattern, feedingBehavior:item.behavior.feedingBehavior, nestType:item.behavior.nestType, nestLocations:item.behavior.nestLocations, clutchSize:item.behavior.clutchSize, incubationDays:item.behavior.incubationDays, broodsPerYear:item.behavior.broodsPerYear, status:"reviewed", qualityScore:85, sourceCount:1, reviewedAt:new Date(), lastVerifiedAt:new Date() }).onConflictDoUpdate({ target:birdBehaviors.birdId, set:{ migratory:item.behavior.migratory, migrationPattern:item.behavior.migrationPattern, feedingBehavior:item.behavior.feedingBehavior, nestType:item.behavior.nestType, nestLocations:item.behavior.nestLocations, clutchSize:item.behavior.clutchSize, incubationDays:item.behavior.incubationDays, broodsPerYear:item.behavior.broodsPerYear, status:"reviewed", qualityScore:85, reviewedAt:new Date(), lastVerifiedAt:new Date(), updatedAt:new Date() } });
    await db.insert(birdSources).values({ birdId:bird.id, sourceId:source.id, fieldName:"editorial-profile", sourceRecordUrl:`https://attractbirds.app/birds/${item.slug}` }).onConflictDoUpdate({ target:[birdSources.birdId,birdSources.sourceId,birdSources.fieldName], set:{ retrievedAt:new Date() } });

    for (const name of item.foods) {
      const slug=slugify(name); const [food]=await db.insert(foods).values({ slug,name,foodType:"bird food",status:"reviewed",qualityScore:80,sourceCount:1 }).onConflictDoUpdate({target:foods.slug,set:{name,updatedAt:new Date()}}).returning({id:foods.id});
      await db.insert(birdFoods).values({birdId:bird.id,foodId:food.id,context:"feeder",season:"all",preferenceScore:.8,evidenceLevel:"editorial-reviewed",sourceId:source.id}).onConflictDoUpdate({target:[birdFoods.birdId,birdFoods.foodId,birdFoods.context,birdFoods.season],set:{preferenceScore:.8,evidenceLevel:"editorial-reviewed",sourceId:source.id}});
    }
    for (const name of item.plants) {
      const slug=slugify(name); const scientificName=plantScientificNames[name] ?? `${name} spp.`; const [plant]=await db.insert(plants).values({slug,commonName:name,scientificName,plantType:"bird-supporting plant",status:"reviewed",qualityScore:75,sourceCount:1}).onConflictDoUpdate({target:plants.slug,set:{commonName:name,scientificName,updatedAt:new Date()}}).returning({id:plants.id});
      await db.insert(birdPlants).values({birdId:bird.id,plantId:plant.id,benefit:"seed",season:"all",strengthScore:.7,sourceId:source.id}).onConflictDoUpdate({target:[birdPlants.birdId,birdPlants.plantId,birdPlants.benefit,birdPlants.season],set:{strengthScore:.7,sourceId:source.id}});
    }
    for (const name of item.feeders) {
      const slug=slugify(name); const [feeder]=await db.insert(feeders).values({slug,name,feederType:name,status:"reviewed",qualityScore:80,sourceCount:1}).onConflictDoUpdate({target:feeders.slug,set:{name,updatedAt:new Date()}}).returning({id:feeders.id});
      await db.insert(birdFeeders).values({birdId:bird.id,feederId:feeder.id,suitabilityScore:.8,sourceId:source.id}).onConflictDoUpdate({target:[birdFeeders.birdId,birdFeeders.feederId],set:{suitabilityScore:.8,sourceId:source.id}});
    }
  }

  const count = await db.select({ id:birds.id }).from(birds).where(eq(birds.status,"published"));
  console.log(`Pilot seed complete: ${pilotBirds.length} upserted; ${count.length} published birds in database.`);
}

await main();
process.exit(0);
