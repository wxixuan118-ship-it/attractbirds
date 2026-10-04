import Link from "next/link";
import { URL_REGISTRY } from "../../lib/url-registry";

export const TOOLS = [
  { href: URL_REGISTRY.tools.birdFinder, name: "Backyard bird finder", label: "Birds by state & month", blurb: "Pick your state and month to see year-round residents, seasonal visitors and migrants — with who is arriving and leaving." },
  { href: URL_REGISTRY.tools.nectarCalculator, name: "Hummingbird nectar calculator", label: "Sugar-water recipe", blurb: "Exact sugar and water for any feeder size, in cups, ounces or milliliters — 1:4 for hummingbirds, 1:6 for orioles." },
  { href: URL_REGISTRY.tools.feederCalculator, name: "Bird feeder calculator", label: "Feeding station planner", blurb: "How many feeders to start with for your space and birds, which types, and where to put them." },
] as const;

/** Cross-links between the interactive tools. */
export function ToolLinks({ exclude = [] }: { exclude?: string[] }) {
  return (
    <section className="loc-section">
      <div className="loc-section-header"><h2>More bird feeding tools</h2></div>
      <div className="chip-list">
        {TOOLS.filter((t) => !exclude.includes(t.href)).map((t) => <Link href={t.href} key={t.href}>{t.name} →</Link>)}
        <Link href={URL_REGISTRY.tools.hub}>All tools →</Link>
      </div>
    </section>
  );
}
