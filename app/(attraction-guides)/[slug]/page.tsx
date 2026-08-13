import{permanentRedirect,notFound}from"next/navigation";import{attractionCanonicalSlugByLegacy}from"../../../data/attraction-guides";
export function generateStaticParams(){return Object.keys(attractionCanonicalSlugByLegacy).map(slug=>({slug}))}
export default async function LegacyAttractionGuide({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const canonical=attractionCanonicalSlugByLegacy[slug];if(!canonical)notFound();permanentRedirect(`/how-to-attract/${canonical}`)}
