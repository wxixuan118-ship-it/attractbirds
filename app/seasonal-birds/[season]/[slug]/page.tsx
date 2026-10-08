import { notFound, permanentRedirect } from "next/navigation";
import { isSeason } from "../../../../lib/seasonal-repository";
import { retiredSeasonalRedirect } from "../../../../lib/indexing";

// Bird × season pages are retired: season pages list each state's birds, and
// each URL here redirects to the bird's profile (lib/indexing.ts).
export function generateStaticParams() {
  return [];
}

export default async function RetiredSeasonalBirdPage({ params }: { params: Promise<{ season: string; slug: string }> }) {
  const { season, slug } = await params;
  const retired = isSeason(season) ? retiredSeasonalRedirect(slug) : null;
  if (!retired) notFound();
  permanentRedirect(retired.destination);
}
