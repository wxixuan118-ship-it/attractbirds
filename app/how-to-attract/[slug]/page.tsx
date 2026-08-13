import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { attractionGuideByCanonicalSlug, attractionCanonicalSlugByLegacy, canonicalizeAttractionHref } from "../../../data/attraction-guides";
import { SITE, URL_REGISTRY } from "../../../lib/url-registry";

export function generateStaticParams() { return Object.values(attractionCanonicalSlugByLegacy).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = attractionGuideByCanonicalSlug[slug];
  return guide ? { title: guide.title, description: guide.description, alternates: { canonical: URL_REGISTRY.howTo.guide(slug) } } : {};
}

export default async function AttractionGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = attractionGuideByCanonicalSlug[slug];
  if (!guide) notFound();
  const canonicalPath = URL_REGISTRY.howTo.guide(slug);
  const faq = [
    { q: `What is the safest first step for ${guide.title.toLowerCase()}?`, a: guide.intro },
    { q: "How quickly should I expect birds to respond?", a: "There is no guaranteed timeline. Local range, season, weather, natural food, habitat, disturbance, and discovery time all affect visits." },
  ];
  return <div><Header/><main className="content-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: `${SITE.origin}${canonicalPath}` }) }}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }}/>
    <div className="breadcrumb"><Link href={URL_REGISTRY.home}>Home</Link> / <Link href={URL_REGISTRY.howTo.hub}>How to attract birds</Link> / {guide.title}</div>
    <section className="content-hero"><div><p className="eyebrow"><span/> {guide.eyebrow}</p><h1>{guide.title}</h1><p className="lede">{guide.intro}</p></div><aside className="fact-panel">{guide.facts.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</aside></section>
    <div className="content-grid">
      {guide.sections.map((section, index) => <section className="info-block" key={section.title}><small className="step-number">0{index + 1}</small><h2>{section.title}</h2><p>{section.body}</p><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
      {guide.warning && <section className="info-block wide safety-note"><h2>{guide.warning.title}</h2><p>{guide.warning.body}</p></section>}
      <section className="info-block wide"><h2>Continue planning</h2><div className="chip-list">{guide.related.map((item) => <Link href={canonicalizeAttractionHref(item.href)} key={item.href}>{item.label}</Link>)}<Link href={URL_REGISTRY.howTo.hub}>All attraction guides</Link></div></section>
      <section className="info-block wide"><h2>Frequently asked questions</h2>{faq.map((item) => <div key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</section>
    </div>
  </main><Footer/></div>;
}
