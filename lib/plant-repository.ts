import { pilotPlants, plantPurposes, type PilotPlant } from "../data/pilot-plants";
import { pilotBirds } from "../data/pilot-birds";
import { STATE_BY_SLUG, US_STATES_DATA } from "../data/us-states-data";

export const plantCategories={flowers:{title:"Bird-friendly Flowers",type:"flower" as const},trees:{title:"Bird-friendly Trees",type:"tree" as const},shrubs:{title:"Bird-friendly Shrubs",type:"shrub" as const},vines:{title:"Bird-friendly Vines",type:"vine" as const}};
export const indexedPlants=pilotPlants.filter((plant,index,list)=>list.findIndex(item=>item.scientificName===plant.scientificName)===index);

export function resolvePlantSlug(slug:string){
  const plant=indexedPlants.find(item=>item.slug===slug);if(plant)return{type:"plant" as const,plant};
  const purpose=plantPurposes[slug as keyof typeof plantPurposes];if(purpose)return{type:"purpose" as const,purpose,plants:indexedPlants.filter(item=>item.benefits.includes(purpose.benefit))};
  const category=plantCategories[slug as keyof typeof plantCategories];if(category)return{type:"category" as const,category,plants:indexedPlants.filter(item=>item.plantType===category.type)};
  if(slug==="native-plants")return{type:"native" as const,plants:indexedPlants};
  return null;
}

export function getBirdPlantGuide(slug:string){const bird=pilotBirds.find(item=>item.slug===slug);if(!bird)return null;const preferred=new Set(bird.plants.map(name=>name.toLowerCase()));const matches=indexedPlants.filter(plant=>preferred.has(plant.commonName.toLowerCase())||plant.birds.includes(slug));return{bird,plants:matches}}
export function getPlantStaticParams(){return [...indexedPlants.map(plant=>({slug:plant.slug})),...Object.keys(plantPurposes).map(slug=>({slug})),...Object.keys(plantCategories).map(slug=>({slug})),{slug:"native-plants"}]}
export function getBirdPlantStaticParams(){return pilotBirds.map(bird=>({bird:bird.slug}))}
export function getStatePlantStaticParams(){return US_STATES_DATA.map(state=>({state:state.slug}))}
export function getStatePlantPreview(slug:string){const state=STATE_BY_SLUG[slug];if(!state)return null;return{state,plants:indexedPlants.slice(0,12)}}
export function plantJsonLd(plant:PilotPlant){return{"@context":"https://schema.org","@type":"Article",headline:`${plant.commonName} for Bird-friendly Gardens`,about:{"@type":"Thing",name:plant.scientificName},mainEntity:{"@type":"Thing",name:plant.commonName,alternateName:plant.scientificName}}}
