import { notFound, permanentRedirect, redirect } from "next/navigation";
import { retiredLocationRedirect } from "../../../../lib/indexing";

// Nothing is published below state pages: State × bird, State × group and city
// URLs all redirect (lib/indexing.ts).
export function generateStaticParams() {
  return [];
}

export default async function RetiredStateSubPage({ params }: { params: Promise<{ state: string; slug: string }> }) {
  const { state, slug } = await params;
  const retired = retiredLocationRedirect(state, slug);
  if (!retired) notFound();
  if (retired.permanent) permanentRedirect(retired.destination);
  redirect(retired.destination);
}
