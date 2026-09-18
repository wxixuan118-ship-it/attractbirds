import type { Metadata } from "next";
import { EditorialPage, editorialMetadata } from "../../components/Editorial";
import { FeederLinks } from "../../components/FeederLinks";
import { miscEditorial } from "../../../data/editorial/misc";
import { Calculator } from "./Calculator";

const content = miscEditorial["/tools/bird-feeder-calculator"];
export const metadata: Metadata = editorialMetadata(content);

export default function Page() {
  return (
    <EditorialPage content={content} eyebrow="Interactive planning tool" breadcrumbs={[{ name: "Tools", path: "/tools/bird-feeder-calculator" }, { name: "Bird feeder calculator", path: content.path }]} before={<section className="loc-section"><Calculator /></section>}>
      <FeederLinks exclude={[content.path]} />
    </EditorialPage>
  );
}
