import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage, editorialMetadata } from "../components/Editorial";
import { FeederLinks } from "../components/FeederLinks";
import { miscEditorial } from "../../data/editorial/misc";
import { feederFoods } from "../../data/pilot-feeders";
import { pilotBirds } from "../../data/pilot-birds";

const content = miscEditorial["/bird-food"];
export const metadata: Metadata = editorialMetadata(content);

export default function BirdFood() {
  return (
    <EditorialPage content={content} eyebrow="Food and feeder matching guide" breadcrumbs={[{ name: "Bird feed", path: content.path }]}>
      <section className="loc-section">
        <div className="loc-section-header"><h2>Bird feed guides by food</h2></div>
        <div className="chip-list">
          {Object.entries(feederFoods).map(([slug, x]) => <Link href={`/feeders/for/${slug}`} key={slug}>{x.name} →</Link>)}
        </div>
      </section>
      <section className="loc-section">
        <div className="loc-section-header"><h2>Bird feed by bird</h2></div>
        <div className="chip-list">
          {pilotBirds.map((b) => <Link href={`/feeders/for/${b.slug}`} key={b.slug}>{b.commonName} →</Link>)}
        </div>
      </section>
      <FeederLinks exclude={[content.path, "/feeders/for/black-oil-sunflower"]} />
    </EditorialPage>
  );
}
