import Link from "next/link";
import { feederGuides } from "../../data/pilot-feeders";

/** Cross-links between the feeder guides, shared by the feeder editorial templates. */
export function FeederLinks({ exclude = [] }: { exclude?: string[] }) {
  const guides = feederGuides.filter((f) => !exclude.includes(`/feeders/${f.slug}`)).slice(0, 6);
  const extra = [
    { href: "/feeders/compare/tube-vs-hopper", label: "Tube vs hopper feeder" },
    { href: "/feeders/compare/suet-vs-seed", label: "Suet vs seed feeder" },
    { href: "/feeders/for/black-oil-sunflower", label: "Black oil sunflower feeder" },
    { href: "/feeders/squirrel-proof", label: "Squirrel proof bird feeder" },
    { href: "/bird-problems/no-birds-at-feeder", label: "No birds at the feeder?" },
  ].filter((x) => !exclude.includes(x.href));
  return (
    <section className="loc-section">
      <div className="loc-section-header"><h2>More feeder guides</h2></div>
      <div className="chip-list">
        {guides.map((f) => <Link href={`/feeders/${f.slug}`} key={f.slug}>{f.name} →</Link>)}
        {extra.map((x) => <Link href={x.href} key={x.href}>{x.label} →</Link>)}
      </div>
    </section>
  );
}
