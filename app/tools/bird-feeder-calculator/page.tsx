import type { Metadata } from "next";
import { EditorialPage, editorialMetadata } from "../../components/Editorial";
import { FeederLinks } from "../../components/FeederLinks";
import { ToolLinks } from "../../components/ToolLinks";
import { miscEditorial } from "../../../data/editorial/misc";
import { Calculator } from "./Calculator";
import { EmbedCode } from "./EmbedCode";

const content = miscEditorial["/tools/bird-feeder-calculator"];
export const metadata: Metadata = editorialMetadata(content);

export default function Page() {
  return (
    <EditorialPage content={content} eyebrow="Interactive planning tool" breadcrumbs={[{ name: "Tools", path: "/tools" }, { name: "Bird feeder calculator", path: content.path }]} before={<section className="loc-section"><Calculator /><EmbedCode /></section>}>
      <FeederLinks exclude={[content.path]} />
      <ToolLinks exclude={[content.path]} />
    </EditorialPage>
  );
}
