import { and, eq, sql } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { birdBehaviors, birdFeeders, birdFoods, birdIdentification, birdImages, birdPlants, birdSources, birds } from "../db/schema.js";

const db=getDb();
const rows=await db.select({id:birds.id,slug:birds.slug,summary:birds.summary,sizeMin:birds.sizeMinCm,sizeMax:birds.sizeMaxCm,colors:birds.colors,habitats:birds.habitats}).from(birds);
let passed=0;
for(const bird of rows){
  const [ident,behavior,food,plant,feeder,source,image]=await Promise.all([
    db.select({n:sql<number>`count(*)`}).from(birdIdentification).where(eq(birdIdentification.birdId,bird.id)),
    db.select({n:sql<number>`count(*)`}).from(birdBehaviors).where(eq(birdBehaviors.birdId,bird.id)),
    db.select({n:sql<number>`count(*)`}).from(birdFoods).where(eq(birdFoods.birdId,bird.id)),
    db.select({n:sql<number>`count(*)`}).from(birdPlants).where(eq(birdPlants.birdId,bird.id)),
    db.select({n:sql<number>`count(*)`}).from(birdFeeders).where(eq(birdFeeders.birdId,bird.id)),
    db.select({n:sql<number>`count(*)`}).from(birdSources).where(eq(birdSources.birdId,bird.id)),
    db.select({n:sql<number>`count(*)`}).from(birdImages).where(and(eq(birdImages.birdId,bird.id),eq(birdImages.isPrimary,true))),
  ]);
  let score=0;
  if(bird.summary.length>=180) score+=10; if(bird.sizeMin&&bird.sizeMax&&bird.colors?.length&&bird.habitats?.length) score+=10;
  if(Number(ident[0].n)>0) score+=15; if(Number(behavior[0].n)>0) score+=10; if(Number(food[0].n)>0) score+=10;
  if(Number(plant[0].n)>0) score+=10; if(Number(feeder[0].n)>0) score+=10; if(Number(source[0].n)>0) score+=10; if(Number(image[0].n)>0)score+=15;
  const publish=score>=80;
  await db.update(birds).set({qualityScore:score,status:publish?"published":"draft",indexable:publish,reviewedAt:publish?new Date():null,updatedAt:new Date()}).where(and(eq(birds.id,bird.id)));
  console.log(`${publish?"PASS":"HOLD"} ${bird.slug}: ${score}/100`); if(publish)passed++;
}
console.log(`Quality gate: ${passed}/${rows.length} birds publishable.`);
process.exit(passed===0?1:0);
