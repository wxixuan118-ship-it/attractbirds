import { pilotBirds } from "../data/pilot-birds";

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
