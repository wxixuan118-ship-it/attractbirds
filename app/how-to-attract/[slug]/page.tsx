import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { attractionGuideByCanonicalSlug, attractionCanonicalSlugByLegacy, canonicalizeAttractionHref } from "../../../data/attraction-guides";
import { speciesAttractionBySlug, speciesAttractionGuides } from "../../../data/species-attraction-guides";
import { getBirdBySlug } from "../../../lib/bird-repository";
import { SITE, URL_REGISTRY } from "../../../lib/url-registry";

export function generateStaticParams() {
  return [...Object.values(attractionCanonicalSlugByLegacy), ...speciesAttractionGuides.map(({ slug }) => slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = attractionGuideByCanonicalSlug[slug];
  if (guide) return { title: guide.title, description: guide.description, alternates: { canonical: URL_REGISTRY.howTo.guide(slug) } };
  const speciesGuide = speciesAttractionBySlug[slug];
  const bird = speciesGuide ? await getBirdBySlug(slug) : undefined;
  return bird ? {
    title: `How to Attract ${speciesGuide.name} to Your Yard`,
    description: `Attract ${speciesGuide.name} responsibly with species-appropriate habitat, plants, food, water, feeders, shelter, and safety guidance.`,
    alternates: { canonical: URL_REGISTRY.howTo.species(slug) },
    robots: { index: true, follow: true },
  } : {};
}

function GeneralGuide({ slug }: { slug: string }) {
  const guide = attractionGuideByCanonicalSlug[slug];
  if (!guide) return null;
  const canonicalPath = URL_REGISTRY.howTo.guide(slug);
  const faq = [
    { q: `What is the safest first step for ${guide.title.toLowerCase()}?`, a: guide.intro },
    { q: "How quickly should I expect birds to respond?", a: "There is no guaranteed timeline. Local range, season, weather, natural food, habitat, disturbance, and discovery time all affect visits." },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: `${SITE.origin}${canonicalPath}` }) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }}/><div className="breadcrumb"><Link href={URL_REGISTRY.home}>Home</Link> / <Link href={URL_REGISTRY.howTo.hub}>How to attract birds</Link> / {guide.title}</div><section className="content-hero"><div><p className="eyebrow"><span/> {guide.eyebrow}</p><h1>{guide.title}</h1><p className="lede">{guide.intro}</p></div><aside className="fact-panel">{guide.facts.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</aside></section><div className="content-grid">{guide.sections.map((section, index) => <section className="info-block" key={section.title}><small className="step-number">0{index + 1}</small><h2>{section.title}</h2><p>{section.body}</p><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}{guide.warning && <section className="info-block wide safety-note"><h2>{guide.warning.title}</h2><p>{guide.warning.body}</p></section>}<section className="info-block wide"><h2>Continue planning</h2><div className="chip-list">{guide.related.map((item) => <Link href={canonicalizeAttractionHref(item.href)} key={item.href}>{item.label}</Link>)}<Link href={URL_REGISTRY.howTo.hub}>All attraction guides</Link></div></section><section className="info-block wide"><h2>Frequently asked questions</h2>{faq.map((item) => <div key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</section></div></>;
}

async function SpeciesGuide({ slug }: { slug: string }) {
  const guide = speciesAttractionBySlug[slug];
  const bird = guide ? await getBirdBySlug(slug) : undefined;
  if (!guide || !bird) return null;
  const canonicalPath = URL_REGISTRY.howTo.species(slug);
  const isFeederBird = !bird.feeders.some((item) => /not a feeder/i.test(item));
  const faq = [
    { q: `What is the best way to attract ${guide.name}?`, a: `${guide.priority}. First confirm that the species occurs locally in the current season, then improve habitat before adding supplemental food.` },
    { q: `What should I feed ${guide.name}?`, a: isFeederBird ? `Useful options include ${bird.foods.join(", ")}. Offer small fresh portions and keep every feeding surface clean.` : `${guide.name} are not feeder birds. Protect natural foraging habitat instead of trying to lure them with food.` },
    { q: `How long does it take to attract ${guide.name}?`, a: "There is no guaranteed timeline. Range, season, local abundance, habitat quality, weather, disturbance, and discovery time all affect visits." },
  ];
  const steps = [
    { title: "Confirm local range and season", body: `${bird.residentStatus}. Check current local observations before changing your yard; a species cannot be attracted where it is absent.` },
    { title: "Build the right habitat", body: `${guide.habitatAction} Typical habitat includes ${bird.habitat}.` },
    { title: "Provide natural food first", body: `Useful plant starting points include ${bird.plants.join(", ")}. Confirm regional nativity, site conditions, and invasiveness before planting.` },
    { title: isFeederBird ? "Add food and feeders carefully" : "Protect natural foraging", body: isFeederBird ? `Foods: ${bird.foods.join(", ")}. Suitable feeder starting points: ${bird.feeders.join(", ")}. Start small, keep food dry, and clean routinely.` : `Natural diet: ${bird.diet}. Supplemental feeding is not recommended for this species.` },
    { title: "Add clean water and shelter", body: `Use shallow clean water with open sight lines and nearby escape cover. Nesting: ${bird.nestType}; typical locations include ${(bird.nestLocations ?? []).join(", ")}. Never disturb an active nest.` },
    { title: "Measure without forcing a visit", body: "Keep a simple weekly log of sightings, food condition, water cleaning, and hazards. Change one factor at a time; never use call playback, baiting, or nest disturbance." },
  ];
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", name: `How to attract ${guide.name} to your yard`, description: guide.priority, mainEntityOfPage: `${SITE.origin}${canonicalPath}`, step: steps.map((step) => ({ "@type": "HowToStep", name: step.title, text: step.body })) }) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }}/><div className="breadcrumb"><Link href={URL_REGISTRY.home}>Home</Link> / <Link href={URL_REGISTRY.howTo.hub}>How to attract birds</Link> / {guide.name}</div><section className="content-hero"><div><p className="eyebrow"><span/> Species attraction guide</p><h1>How to attract<br/><em>{guide.name}.</em></h1><p className="lede">{guide.priority}. This plan combines natural habitat, species-appropriate resources, and backyard safety without promising or forcing a visit.</p></div><aside className="fact-panel"><div><small>Species</small><strong>{bird.commonName}</strong></div><div><small>Natural diet</small><strong>{bird.diet}</strong></div><div><small>Best first move</small><strong>{guide.priority}</strong></div></aside></section><div className="content-grid">{steps.map((step, index) => <section className="info-block" key={step.title}><small className="step-number">0{index + 1}</small><h2>{step.title}</h2><p>{step.body}</p></section>)}<section className="info-block wide safety-note"><h2>Important species-specific caution</h2><p>{guide.caution}</p><p>Also keep cats indoors, treat collision-prone windows from the outside, reduce pesticides, and pause feeding if multiple sick birds appear.</p></section><section className="info-block wide"><h2>Continue planning for {bird.commonName}</h2><div className="chip-list"><Link href={URL_REGISTRY.birds.detail(slug)}>Identification and natural history</Link><Link href={URL_REGISTRY.locations.hub}>Check birds by location</Link><Link href={URL_REGISTRY.plants.hub}>Explore bird-friendly plants</Link><Link href={URL_REGISTRY.howTo.hub}>All attraction guides</Link></div></section><section className="info-block wide"><h2>Frequently asked questions</h2>{faq.map((item) => <div key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</section></div></>;
}

export default async function AttractionGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!attractionGuideByCanonicalSlug[slug] && !speciesAttractionBySlug[slug]) notFound();
  return <div><Header/><main className="content-main">{attractionGuideByCanonicalSlug[slug] ? <GeneralGuide slug={slug}/> : <SpeciesGuide slug={slug}/>}</main><Footer/></div>;
}
