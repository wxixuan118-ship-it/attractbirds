import Link from "next/link";
import type { Metadata } from "next";
import { EditorialPage, editorialMetadata } from "../../components/Editorial";
import { HowToLinks } from "../../components/HowToLinks";
import { howtoEditorial } from "../../../data/editorial/howto";

const content = howtoEditorial["/how-to-attract/bluebirds"];
export const metadata: Metadata = editorialMetadata(content);

export default function BluebirdAttractionGuide() {
  return (
    <EditorialPage content={content} eyebrow="How to attract · species guide" breadcrumbs={[{ name: "How to attract", path: "/how-to-attract" }, { name: "Bluebirds", path: content.path }]}>
      <section className="loc-section">
        <div className="loc-section-header"><h2>Related guides</h2></div>
        <div className="chip-list"><Link href="/how-to-attract/birds-to-a-birdhouse">Attract birds to a birdhouse →</Link><Link href="/plants/berry-producing-plants">Berry plants for birds →</Link><Link href="/how-to-attract/birds-to-a-bird-bath">Bird bath guide →</Link></div>
      </section>
      <HowToLinks exclude={[content.path]} />
    </EditorialPage>
  );
}
