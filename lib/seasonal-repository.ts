import { pilotBirds } from "../data/pilot-birds";
import { STATE_BY_SLUG, US_STATES_DATA } from "../data/us-states-data";

export const SEASONS = {
  spring: { name: "Spring", months: "March–May", activity: "migration and nesting", focus: "native insects, fresh water, and undisturbed nesting cover", watching: "Early morning is usually most productive. Watch woodland edges, flowering gardens, wetlands, and migration stopovers." },
  summer: { name: "Summer", months: "June–August", activity: "breeding and raising young", focus: "clean water, pesticide-free habitat, and abundant natural food", watching: "Look and listen soon after sunrise, then check shaded habitat and water later in the day." },
  fall: { name: "Fall", months: "September–November", activity: "post-breeding migration and refueling", focus: "native berries, standing seed heads, insects, water, and protective cover", watching: "Check migration corridors after favorable overnight winds and revisit fruiting shrubs throughout the morning." },
  winter: { name: "Winter", months: "December–February", activity: "winter residency, irruptions, and energy conservation", focus: "reliable natural food, clean feeders where appropriate, unfrozen water, and dense shelter", watching: "Birds often feed actively after sunrise and before dusk. Sheltered edges and open water can concentrate activity." },
} as const;

export type SeasonSlug = keyof typeof SEASONS;
export const seasonSlugs = Object.keys(SEASONS) as SeasonSlug[];
export function isSeason(value:string):value is SeasonSlug{return value in SEASONS}

export const indexedSeasonalBirds = pilotBirds;

export function resolveSeasonalSlug(slug:string){
  const state=STATE_BY_SLUG[slug];
  if(state)return {type:"state" as const,state};
  const bird=indexedSeasonalBirds.find(item=>item.slug===slug);
  if(bird)return {type:"bird" as const,bird};
  return null;
}

export function getSeasonalStaticParams(){
  return seasonSlugs.flatMap(season=>[
    ...US_STATES_DATA.map(state=>({season,slug:state.slug})),
    ...indexedSeasonalBirds.map(bird=>({season,slug:bird.slug})),
  ]);
}

export function getBirdSeasonCopy(season:SeasonSlug,bird:(typeof pilotBirds)[number]){
  const config=SEASONS[season];
  const migratory=bird.behavior.migratory;
  const movement=season==="spring"||season==="fall"
    ? migratory?`${bird.commonName} populations may be moving during ${season}; timing varies by latitude, weather, and population.`:`${bird.commonName} is generally non-migratory, though local movements can still change visibility.`
    : season==="summer"?`Summer activity centers on breeding habitat, nesting, and natural food where the species occurs.`:`Winter presence depends on the species' regional range and ${bird.behavior.migrationPattern} movement pattern.`;
  return {config,movement,food:`During ${config.name.toLowerCase()}, prioritize ${bird.foods.slice(0,3).join(", ")} where appropriate, plus ${config.focus}.`,habitat:`Look in ${bird.habitats.slice(0,3).join(", ")}. ${config.watching}`};
}
