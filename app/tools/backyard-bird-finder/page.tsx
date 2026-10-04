import type { Metadata } from "next";
import { EditorialPage, editorialMetadata } from "../../components/Editorial";
import { ToolLinks } from "../../components/ToolLinks";
import { miscEditorial } from "../../../data/editorial/misc";
import { BIRD_SEASONALITY, STATE_ZONE } from "../../../data/bird-seasonality";
import { birdWhitelist } from "../../../data/bird-whitelist";
import { birdCatalog } from "../../../data/bird-catalog";
import { US_STATES_DATA } from "../../../data/us-states-data";
import { URL_REGISTRY } from "../../../lib/url-registry";
import { BirdFinder, type FinderBird } from "./BirdFinder";

const content = miscEditorial["/tools/backyard-bird-finder"];
export const metadata: Metadata = editorialMetadata(content);

/** Southwest specialties in the seasonality model that are not on the whitelist. */
const EXTRA_NAMES: Record<string, string> = { "cactus-wren": "Cactus Wren", verdin: "Verdin", "gambels-quail": "Gambel's Quail", "curve-billed-thrasher": "Curve-billed Thrasher" };

function finderBirds(): FinderBird[] {
  const names = new Map<string, string>(birdWhitelist.map((b) => [b.slug, b.commonName]));
  const profiled = new Set(birdCatalog.map((b) => b.slug));
  return BIRD_SEASONALITY.map(({ slug }) => ({
    slug,
    name: names.get(slug) ?? EXTRA_NAMES[slug] ?? slug,
    ...(profiled.has(slug) ? { href: URL_REGISTRY.birds.detail(slug) } : {}),
  }));
}

export default function Page() {
  const states = US_STATES_DATA.filter((s) => s.slug in STATE_ZONE).map((s) => ({ slug: s.slug, name: s.name })).sort((a, b) => a.name.localeCompare(b.name));
  return (
    <EditorialPage content={content} eyebrow="Interactive bird finder" breadcrumbs={[{ name: "Tools", path: "/tools" }, { name: "Backyard bird finder", path: content.path }]} before={<section className="loc-section"><BirdFinder birds={finderBirds()} states={states} /></section>}>
      <ToolLinks exclude={[content.path]} />
    </EditorialPage>
  );
}
