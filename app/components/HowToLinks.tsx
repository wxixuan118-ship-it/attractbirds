import Link from "next/link";
import { HOW_TO_URLS } from "../../lib/url-registry";

const GUIDE_LABELS: Record<string, string> = {
  "birds-to-your-yard": "Attract birds to your yard", "birds-to-a-feeder": "Attract birds to a feeder", "birds-to-a-new-feeder": "Attract birds to a new feeder",
  "birds-to-a-bird-bath": "Attract birds to a bird bath", "birds-without-a-feeder": "Attract birds without a feeder", "birds-with-sounds": "Bird calls to attract birds",
  "birds-to-your-hand": "Attract birds to your hand", "birds-in-winter": "Attract birds in winter", "birds-to-a-balcony": "Balcony birding",
  "birds-to-a-birdhouse": "Attract birds to a birdhouse", "birds-that-eat-yard-pests": "Birds that eat yard pests",
};
const SPECIES = [
  ["american-goldfinch", "American goldfinches"], ["northern-cardinal", "Northern cardinals"], ["black-capped-chickadee", "Black-capped chickadees"],
  ["ruby-throated-hummingbird", "Ruby-throated hummingbirds"], ["baltimore-oriole", "Baltimore orioles"], ["bluebirds", "Bluebirds"],
];

/** Cross-links between the how-to guides, shared by the how-to editorial templates. */
export function HowToLinks({ exclude = [] }: { exclude?: string[] }) {
  return (
    <section className="loc-section">
      <div className="loc-section-header"><h2>More attraction guides</h2></div>
      <div className="chip-list">
        {HOW_TO_URLS.filter(({ slug }) => !exclude.includes(`/how-to-attract/${slug}`)).map(({ slug }) => <Link href={`/how-to-attract/${slug}`} key={slug}>{GUIDE_LABELS[slug] ?? slug} →</Link>)}
        {SPECIES.filter(([slug]) => !exclude.includes(`/how-to-attract/${slug}`)).map(([slug, label]) => <Link href={`/how-to-attract/${slug}`} key={slug}>How to attract {label.toLowerCase()} →</Link>)}
        {!exclude.includes("/how-to-attract") && <Link href="/how-to-attract">All guides →</Link>}
      </div>
    </section>
  );
}
