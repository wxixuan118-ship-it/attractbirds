import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PlannerForm } from "./components/PlannerForm";
import { BirdProfileLink } from "./components/BirdProfileLink";
import { getPublishedBirds } from "../lib/bird-repository";
import { Cited, EditorialBody, EditorialHero, EditorialIntro, JsonLd, editorialJsonLd, editorialMetadata } from "./components/Editorial";
import { miscEditorial } from "../data/editorial/misc";
import { birdEditorial } from "../data/editorial/birds";
import { pilotPlants } from "../data/pilot-plants";
import { HOW_TO_URLS, SITE, URL_REGISTRY } from "../lib/url-registry";
import type { Metadata } from "next";

const content = miscEditorial["/"];
export const metadata: Metadata = editorialMetadata(content);

/** The three entry points into the site's data, requested for the top of the page. */
const entries = [
  { icon: "🦜", title: "Bird encyclopedia", copy: "Sourced profiles of the commonest backyard birds — cardinal, chickadee, goldfinch, robin, jay — plus the 1,000-species AOS checklist A–Z.", href: URL_REGISTRY.birds.hub, cta: "Browse the birds" },
  { icon: "📍", title: "Birds by state", copy: "A page for every state, with eBird records for nine so far: which birds are reported near you, in which months, and how often — so you attract what actually lives there.", href: URL_REGISTRY.locations.hub, cta: "Pick your state" },
  { icon: "🧮", title: "Bird feeder tools", copy: "A feeder calculator, guides to every feeder type, and side-by-side comparisons that match feeder and food to the birds you want.", href: URL_REGISTRY.tools.feederCalculator, cta: "Open the feeder tools" },
];

/** Step overview cards: each links to the deepest page on that step. */
const stepCards = [
  { num: "01", label: "Food", title: "Offer the right food in the right feeder", copy: "Black-oil sunflower in a hopper or tube near cover is the seed most birds come for.", href: URL_REGISTRY.birdFood },
  { num: "02", label: "Water", title: "Add water at ground level", copy: "A shallow bath with dripping water attracts birds that never visit a feeder.", href: URL_REGISTRY.howTo.guide("birds-to-a-bird-bath") },
  { num: "03", label: "Plants", title: "Plant natives in layers", copy: "Trees, fruiting shrubs, seed heads and leaf litter feed birds all year.", href: URL_REGISTRY.plants.hub },
  { num: "04", label: "Nest sites", title: "Give birds somewhere to nest", copy: "Dense shrubs, dead wood and a well-built nest box keep birds that visit.", href: URL_REGISTRY.howTo.guide("birds-to-a-birdhouse") },
  { num: "05", label: "Safety", title: "Remove the two hazards", copy: "Make glass visible and keep cats indoors so the birds you attract survive.", href: URL_REGISTRY.howTo.guide("birds-to-a-feeder") },
];

const guideLabels: Record<string, string> = {
  "birds-to-your-yard": "Attract birds to your yard", "birds-to-a-feeder": "Attract birds to a feeder", "birds-to-a-new-feeder": "Attract birds to a new feeder",
  "birds-to-a-bird-bath": "Attract birds to a bird bath", "birds-without-a-feeder": "Attract birds without a feeder", "birds-with-sounds": "Attract birds with sounds",
  "birds-to-your-hand": "Attract birds to your hand", "birds-in-winter": "Attract birds in winter", "birds-to-a-balcony": "Attract birds to a balcony",
  "birds-to-a-birdhouse": "Attract birds to a birdhouse", "birds-that-eat-yard-pests": "Attract birds that eat yard pests",
};
const speciesGuides = [
  ["northern-cardinal", "cardinals"], ["american-goldfinch", "goldfinches"], ["black-capped-chickadee", "chickadees"],
  ["ruby-throated-hummingbird", "hummingbirds"], ["baltimore-oriole", "orioles"], ["bluebirds", "bluebirds"],
];

const locationPills = [
  { label: "California", slug: "california" }, { label: "Texas", slug: "texas" }, { label: "Florida", slug: "florida" }, { label: "New York", slug: "new-york" },
  { label: "Arizona", slug: "arizona" }, { label: "Georgia", slug: "georgia" }, { label: "Oregon", slug: "oregon" }, { label: "Colorado", slug: "colorado" },
  { label: "Michigan", slug: "michigan" }, { label: "North Carolina", slug: "north-carolina" }, { label: "Tennessee", slug: "tennessee" }, { label: "Rhode Island", slug: "rhode-island" },
];

const feederTools = [
  { icon: "🧮", title: "Bird feeder calculator", copy: "Enter yard size, target birds and budget; get feeder count, type and seed per week.", href: URL_REGISTRY.tools.feederCalculator },
  { icon: "🪺", title: "Feeder types and the birds they attract", copy: "Hopper, tube, platform, suet, nyjer mesh, window and hummingbird feeders — placement, cleaning and squirrels.", href: URL_REGISTRY.feeders.hub },
  { icon: "⚖️", title: "Compare feeders for your birds", copy: "Tube vs hopper, platform vs tube, suet vs seed — which attracts more of the birds you want.", href: URL_REGISTRY.feeders.comparison("tube-vs-hopper") },
  { icon: "🌻", title: "Bird food that attracts each species", copy: "FeederWatch's ranking of sunflower, safflower, nyjer, millet, peanuts, suet and nectar.", href: URL_REGISTRY.birdFood },
];

export default async function Home() {
  const published = await getPublishedBirds();
  const featuredBirds = published.slice(0, 4);
  const reviewedCount = published.filter((b) => birdEditorial[b.slug]).length;
  const catalogCount = published.length;
  const blocks = editorialJsonLd(content, [], [{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.brand, url: SITE.origin }]);
  return (
    <div className="site-shell">
      <Header />
      <main>
        <JsonLd blocks={blocks} />

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Complete beginner guide, with sources
          </div>
          <h1>How to attract birds<br /><em>to your backyard</em></h1>
          <p className="hero-sub">
            How to attract birds in five steps — food, water, native plants, nest sites and safety — built from Project FeederWatch, Audubon and eBird, with every claim linked to its source.
          </p>
          <div className="hero-actions">
            <Link href="/#step-1" className="button button-primary">Start with step 1 ↓</Link>
            <Link href="/#planner" className="hero-pill">Plan my yard with AI</Link>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="trust-bar">
          <div className="trust-item"><strong>{reviewedCount}</strong><span>Sourced bird profiles</span></div>
          <div className="trust-item"><strong>{catalogCount.toLocaleString("en-US")}</strong><span>Species in the A–Z checklist</span></div>
          <div className="trust-item"><strong>9</strong><span>States with eBird data</span></div>
          <div className="trust-item"><strong>{pilotPlants.length}</strong><span>Native plant profiles</span></div>
        </div>

        {/* ENTRY POINTS */}
        <section className="section" style={{ paddingBottom: 24 }}>
          <div className="section-header">
            <div>
              <div className="section-tag">Start here</div>
              <h2>Start with your birds, your state or your feeder</h2>
            </div>
          </div>
          <div className="entry-grid">
            {entries.map((e) => (
              <Link className="module-card entry-card" href={e.href} key={e.title}>
                <div className="module-icon-wrap">{e.icon}</div>
                <h3>{e.title}</h3>
                <p>{e.copy}</p>
                <span className="entry-cta">{e.cta} →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* THE FIVE STEPS AT A GLANCE */}
        <section className="section" id="steps" style={{ paddingTop: 24 }}>
          <div className="section-header">
            <div>
              <div className="section-tag">The method</div>
              <h2>How to attract birds in five steps</h2>
            </div>
          </div>
          <ol className="step-grid">
            {stepCards.map((s) => (
              <li key={s.num}>
                <Link href={s.href} className="step-card">
                  <span className="step-number">{s.num} · {s.label}</span>
                  <strong>{s.title}</strong>
                  <p>{s.copy}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* SOURCED GUIDE */}
        <section className="location-hero" style={{ paddingTop: 0 }}>
          <p className="eyebrow" style={{ marginBottom: "12px" }}><span /> The short version, with sources</p>
          <EditorialIntro content={content} />
          <EditorialHero content={content} />
        </section>
        <div id="step-1" />
        <EditorialBody content={content} faqHeading="Questions about attracting birds" sourcesHeading="Sources on attracting birds">

          {/* ATTRACTION GUIDES */}
          <section className="section">
            <div className="section-header">
              <div>
                <div className="section-tag">Guides</div>
                <h2>How to attract birds in every situation</h2>
              </div>
              <Link href={URL_REGISTRY.howTo.hub} className="view-all">All attraction guides →</Link>
            </div>
            <div className="guide-chips">
              {HOW_TO_URLS.map(({ slug }) => (
                <Link href={URL_REGISTRY.howTo.guide(slug)} className="hero-pill" key={slug}>{guideLabels[slug] ?? slug}</Link>
              ))}
              {speciesGuides.map(([slug, label]) => (
                <Link href={URL_REGISTRY.howTo.species(slug)} className="hero-pill" key={slug}>How to attract {label}</Link>
              ))}
            </div>
          </section>

          {/* BIRDS BY STATE */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <div>
                <div className="section-tag">Birds by state</div>
                <h2>Attract birds that live in your state</h2>
              </div>
              <Link href={URL_REGISTRY.locations.hub} className="view-all">All 50 states →</Link>
            </div>
            <p className="lede" style={{ maxWidth: 760, marginBottom: 20 }}>
              <Cited text="A cardinal feeder in California will stay empty, and a Michigan yard will never see an Anna's Hummingbird. Every state has a page, and nine so far rank the most-reported backyard birds from eBird checklists [6], month by month, so you attract birds that are actually there." sources={content.sources} />
            </p>
            <div className="guide-chips">
              {locationPills.map((loc) => (
                <Link href={URL_REGISTRY.locations.state(loc.slug)} className="hero-pill" key={loc.slug}>Birds in {loc.label}</Link>
              ))}
            </div>
          </section>

          {/* BIRD ENCYCLOPEDIA */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <div>
                <div className="section-tag">Bird encyclopedia</div>
                <h2>Backyard birds you can attract</h2>
              </div>
              <Link href={URL_REGISTRY.birds.hub} className="view-all">View all birds →</Link>
            </div>
            <div className="bird-grid">
              {featuredBirds.map((bird) => (
                <BirdProfileLink className="bird-card" href={URL_REGISTRY.birds.detail(bird.slug)} birdName={bird.commonName} key={bird.slug}>
                  <div className="bird-circle">
                    <div className="bird-circle-inner">{bird.initials}</div>
                  </div>
                  <span className="bird-card-name">{bird.commonName}</span>
                  <span className="bird-card-sci">{bird.scientificName}</span>
                  {bird.family && <span className="bird-card-tag">{bird.family}</span>}
                </BirdProfileLink>
              ))}
            </div>
          </section>

          {/* FEEDER TOOLS */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <div>
                <div className="section-tag">Bird feeder tools</div>
                <h2>Bird feeder tools that attract more birds</h2>
              </div>
              <Link href={URL_REGISTRY.feeders.hub} className="view-all">Feeder guide →</Link>
            </div>
            <div className="module-grid">
              {feederTools.map((t) => (
                <Link className="module-card" href={t.href} key={t.title}>
                  <div className="module-icon-wrap">{t.icon}</div>
                  <h3>{t.title}</h3>
                  <p>{t.copy}</p>
                  <span className="card-arrow">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* AI PLANNER */}
          <div className="planner-section" id="planner">
            <div className="planner-intro">
              <div className="section-tag" style={{ background: "rgba(126,216,160,.15)", color: "#7ed8a0" }}>AI Yard Planner</div>
              <h2>Plan a yard<br />that <em>attracts birds</em></h2>
              <p>Tell us where you live and which birds you want to attract. We&apos;ll generate a tailored plan — native plants, feeder types, water sources, and a seasonal checklist.</p>
              <ul className="planner-checklist">
                <li><span className="check-dot">✓</span> Local bird recommendations</li>
                <li><span className="check-dot">✓</span> Region-native plant choices</li>
                <li><span className="check-dot">✓</span> Feeder + water source plan</li>
                <li><span className="check-dot">✓</span> Seasonal care checklist</li>
              </ul>
            </div>
            <PlannerForm />
          </div>

        </EditorialBody>
      </main>
      <Footer />
    </div>
  );
}
