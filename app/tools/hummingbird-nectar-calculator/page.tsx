import type { Metadata } from "next";
import { EditorialPage, editorialMetadata } from "../../components/Editorial";
import { ToolLinks } from "../../components/ToolLinks";
import { miscEditorial } from "../../../data/editorial/misc";
import { NectarCalculator } from "./NectarCalculator";

const content = miscEditorial["/tools/hummingbird-nectar-calculator"];
export const metadata: Metadata = editorialMetadata(content);

export default function Page() {
  return (
    <EditorialPage content={content} eyebrow="Interactive nectar tool" breadcrumbs={[{ name: "Tools", path: "/tools" }, { name: "Hummingbird nectar calculator", path: content.path }]} before={<section className="loc-section"><NectarCalculator /></section>}>
      <ToolLinks exclude={[content.path]} />
    </EditorialPage>
  );
}
