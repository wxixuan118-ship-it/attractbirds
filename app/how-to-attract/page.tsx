import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage, editorialMetadata } from "../components/Editorial";
import { HowToLinks } from "../components/HowToLinks";
import { howtoEditorial } from "../../data/editorial/howto";

const content = howtoEditorial["/how-to-attract"];
export const metadata: Metadata = editorialMetadata(content);

export default function Guide() {
  return (
    <EditorialPage content={content} eyebrow="Complete beginner guide" breadcrumbs={[{ name: "How to attract birds", path: "/how-to-attract" }]}>
      <HowToLinks exclude={[content.path]} />
      <section className="loc-section">
        <div className="loc-section-header"><h2>Plan your next step</h2></div>
        <div className="chip-list">
          <Link href="/tools/bird-feeder-calculator">Feeder planner →</Link>
          <Link href="/plants">Bird-friendly plants →</Link>
          <Link href="/birds">Bird encyclopedia →</Link>
          <Link href="/birds-by-location">Birds by location →</Link>
        </div>
      </section>
    </EditorialPage>
  );
}
