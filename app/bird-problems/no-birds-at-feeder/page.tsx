import Link from "next/link";
import type { Metadata } from "next";
import { EditorialPage, editorialMetadata } from "../../components/Editorial";
import { FeederLinks } from "../../components/FeederLinks";
import { miscEditorial } from "../../../data/editorial/misc";

const content = miscEditorial["/bird-problems/no-birds-at-feeder"];
export const metadata: Metadata = editorialMetadata(content);

export default function ProblemPage() {
  return (
    <EditorialPage content={content} eyebrow="Problem solver" breadcrumbs={[{ name: "Bird problems", path: "/bird-problems/no-birds-at-feeder" }, { name: "No birds at feeder", path: content.path }]}>
      <section className="loc-section">
        <div className="loc-section-header"><h2>Related guides</h2></div>
        <div className="chip-list">
          <Link href="/how-to-attract/birds-to-a-new-feeder">Attract birds to a new feeder →</Link>
          <Link href="/how-to-attract/birds-to-a-bird-bath">Attract birds to a bird bath →</Link>
          <Link href="/bird-food">Bird feed guide →</Link>
          <Link href="/tools/bird-feeder-calculator">Bird feeder calculator →</Link>
        </div>
      </section>
      <FeederLinks exclude={[content.path]} />
    </EditorialPage>
  );
}
