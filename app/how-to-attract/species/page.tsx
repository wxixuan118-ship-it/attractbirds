import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { speciesAttractionGuides } from "../../../data/species-attraction-guides";
import { URL_REGISTRY } from "../../../lib/url-registry";

export const metadata: Metadata = {
  title: "How to Attract Specific Bird Species",
  description: "Browse responsible, species-specific backyard attraction plans covering habitat, plants, food, water, feeders, shelter, range, and safety.",
  alternates: { canonical: "/how-to-attract/species" },
};

export default function SpeciesAttractionIndex() {
  return <div><Header/><main className="content-main">
    <div className="breadcrumb"><Link href="/">Home</Link> / <Link href={URL_REGISTRY.howTo.hub}>How to attract birds</Link> / Species guides</div>
    <section className="content-hero"><div><p className="eyebrow"><span/> Reviewed species plans</p><h1>Attract the birds<br/><em>that fit your habitat.</em></h1><p className="lede">Start with birds that occur locally, then match plants, natural food, water, shelter, and optional feeders to each species. These guides prioritize habitat and safety over guaranteed visits.</p></div><aside className="fact-panel"><div><small>Published guides</small><strong>{speciesAttractionGuides.length}</strong></div><div><small>URL family</small><strong>/how-to-attract/</strong></div><div><small>Core rule</small><strong>Species and habitat first</strong></div></aside></section>
    <section className="info-block wide"><h2>Species attraction guides</h2><div className="index-grid">{speciesAttractionGuides.map((guide) => <Link className="index-card" href={URL_REGISTRY.howTo.species(guide.slug)} key={guide.slug}><small>Species plan</small><h2>{guide.name}</h2><p>{guide.priority}</p><span>Build a responsible plan →</span></Link>)}</div></section>
  </main><Footer/></div>;
}
