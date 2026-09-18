import Link from "next/link";
import { pilotPlants } from "../../data/pilot-plants";

/** Cross-links between the plant guides, shared by the plant editorial templates. */
export function PlantLinks({ exclude = [], highlight = [] }: { exclude?: string[]; highlight?: string[] }) {
  const first = pilotPlants.filter((p) => highlight.includes(p.slug));
  const rest = pilotPlants.filter((p) => !highlight.includes(p.slug) && !exclude.includes(`/plants/${p.slug}`)).slice(0, Math.max(0, 8 - first.length));
  const collections = [
    { href: "/plants/native-plants", label: "Native plants for birds" },
    { href: "/plants/berry-producing-plants", label: "Berry plants for birds" },
    { href: "/plants/bird-seed-plants", label: "Seed plants for birds" },
    { href: "/plants/nectar-plants", label: "Nectar plants for birds" },
    { href: "/plants/shelter-plants", label: "Shelter plants for birds" },
  ].filter((x) => !exclude.includes(x.href));
  return (
    <section className="loc-section">
      <div className="loc-section-header"><h2>More plant guides</h2></div>
      <div className="chip-list">
        {[...first, ...rest].map((p) => <Link href={`/plants/${p.slug}`} key={p.slug}>{p.commonName} →</Link>)}
        {collections.map((x) => <Link href={x.href} key={x.href}>{x.label} →</Link>)}
      </div>
    </section>
  );
}
