import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PlannerForm } from "./components/PlannerForm";
import { BirdProfileLink } from "./components/BirdProfileLink";
import { plantPicks, problemGuides } from "../lib/content";
import { getPublishedBirds } from "../lib/bird-repository";
import { EditorialBody, EditorialHero, EditorialIntro, JsonLd, editorialJsonLd, editorialMetadata } from "./components/Editorial";
import { miscEditorial } from "../data/editorial/misc";
import { birdEditorial } from "../data/editorial/birds";
import { pilotPlants } from "../data/pilot-plants";
import { SITE } from "../lib/url-registry";
import type { Metadata } from "next";

const content = miscEditorial["/"];
export const metadata: Metadata = editorialMetadata(content);

const modules = [
  { icon: "🦜", num: "01", title: "Bird Encyclopedia", copy: "Sourced profiles of the commonest backyard birds, plus the 1,000-species AOS checklist A–Z.", href: "/birds" },
  { icon: "📍", num: "02", title: "Birds by Location", copy: "eBird records by state and month: which birds are reported, when, and how often.", href: "/birds-by-location" },
  { icon: "🌿", num: "03", title: "Bird-Friendly Plants", copy: "Native plants profiled from the Wildflower Center — nectar, seed, berries and nesting cover.", href: "/plants/native-plants" },
  { icon: "🪺", num: "04", title: "Feeder Guide", copy: "Match feeder types to birds and food, then compare placement, cleaning, weather, and wildlife conflicts.", href: "/feeders" },
  { icon: "🍂", num: "05", title: "Seasonal Birds", copy: "What common birds are doing in spring, summer and fall, with eBird records by state.", href: "/seasonal-birds/spring" },
  { icon: "🔍", num: "06", title: "Problem Diagnosis", copy: "Feeder gone quiet? The seven usual causes and the FeederWatch fix for each.", href: "/bird-problems/no-birds-at-feeder" },
  { icon: "🤖", num: "07", title: "AI Yard Planner", copy: "Enter your location, yard size and target birds for a starting plan of plants, feeders and water.", href: "/#planner" },
  { icon: "🗺️", num: "08", title: "How to Attract Birds", copy: "A safe beginner roadmap covering native plants, food, feeders, water, shelter, windows, cats, and hygiene.", href: "/how-to-attract" },
];

const locationPills = [
  { label: "California", slug: "california" },
  { label: "Texas", slug: "texas" },
  { label: "Florida", slug: "florida" },
  { label: "New York", slug: "new-york" },
  { label: "Arizona", slug: "arizona" },
  { label: "Georgia", slug: "georgia" },
  { label: "Oregon", slug: "oregon" },
  { label: "Colorado", slug: "colorado" },
  { label: "Michigan", slug: "michigan" },
  { label: "North Carolina", slug: "north-carolina" },
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
            Bird garden planning with sources
          </div>
          <h1>Attract birds to your backyard<br /><em>with the right plants, feeders and water.</em></h1>
          <p className="hero-sub">
            Tell us where you live and which birds you love, and get a starting plan to attract birds to your backyard — the right plants, feeders and habitat, built from Project FeederWatch, Audubon and eBird data.
          </p>
          <div className="hero-search">
            <input type="text" placeholder="Search a bird, plant, or problem…" aria-label="Search" />
            <button type="button">Search</button>
          </div>
          <div className="hero-pills">
            {locationPills.map((loc) => (
              <Link href={`/birds-by-location/${loc.slug}`} className="hero-pill" key={loc.slug}>{loc.label}</Link>
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="trust-bar">
          <div className="trust-item"><strong>{reviewedCount}</strong><span>Sourced bird profiles</span></div>
          <div className="trust-item"><strong>{catalogCount.toLocaleString("en-US")}</strong><span>Species in the A–Z checklist</span></div>
          <div className="trust-item"><strong>9</strong><span>States with eBird data</span></div>
          <div className="trust-item"><strong>{pilotPlants.length}</strong><span>Native plant profiles</span></div>
        </div>

        {/* BIRD GRID */}
        <section className="section">
          <div className="section-header">
            <div>
              <div className="section-tag">Popular birds</div>
              <h2>Meet your backyard neighbors</h2>
            </div>
            <Link href="/birds" className="view-all">View all birds →</Link>
          </div>
          <div className="bird-grid">
            {featuredBirds.map((bird) => (
              <BirdProfileLink className="bird-card" href={`/birds/${bird.slug}`} birdName={bird.commonName} key={bird.slug}>
                <div className="bird-circle">
                  <div className="bird-circle-inner">{bird.initials}</div>
                </div>
                <span className="bird-card-name">{bird.commonName}</span>
                <span className="bird-card-sci">{bird.scientificName}</span>
                {bird.family&&<span className="bird-card-tag">{bird.family}</span>}
              </BirdProfileLink>
            ))}
          </div>
        </section>

        {/* SOURCED GUIDE */}
        <section className="location-hero" style={{ paddingTop: 0 }}>
          <p className="eyebrow" style={{ marginBottom: "12px" }}><span /> The short version, with sources</p>
          <EditorialIntro content={content} />
          <EditorialHero content={content} />
        </section>
        <EditorialBody content={content} />

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <span>Native plants</span><span className="marquee-dot" />
          <span>Right food</span><span className="marquee-dot" />
          <span>Clean water</span><span className="marquee-dot" />
          <span>Safe shelter</span><span className="marquee-dot" />
          <span>Local birds</span><span className="marquee-dot" />
          <span>eBird data</span><span className="marquee-dot" />
          <span>Sourced guides</span>
        </div>

        {/* MODULE GRID */}
        <section className="section">
          <div className="section-header">
            <div>
              <div className="section-tag">Knowledge base</div>
              <h2>Everything your backyard needs</h2>
            </div>
          </div>
          <div className="module-grid">
            {modules.map((m) => (
              <Link className="module-card" href={m.href} key={m.title}>
                <div className="module-icon-wrap">{m.icon}</div>
                <span className="module-number">{m.num}</span>
                <h3>{m.title}</h3>
                <p>{m.copy}</p>
                <span className="card-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* AI PLANNER */}
        <div className="planner-section" id="planner">
          <div className="planner-intro">
            <div className="section-tag" style={{background:"rgba(126,216,160,.15)", color:"#7ed8a0"}}>AI Yard Planner</div>
            <h2>Your yard.<br /><em>Their</em> perfect home.</h2>
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

        {/* FIELD NOTES */}
        <section className="section">
          <div className="section-header">
            <div>
              <div className="section-tag">Guides</div>
              <h2>Small changes, more birds</h2>
            </div>
          </div>
          <div className="notes-grid">
            <article className="note-card note-feature">
              <span className="note-tag">Plant guide</span>
              <h3>{plantPicks[0].title}</h3>
              <p>{plantPicks[0].summary}</p>
              <Link href="/plants/nectar-plants">Read the guide →</Link>
            </article>
            {problemGuides.map((guide) => (
              <article className="note-card" key={guide.title}>
                <span className="note-tag">Problem solver</span>
                <h3>{guide.title}</h3>
                <p>{guide.summary}</p>
                <Link href={guide.href}>Find the fix →</Link>
              </article>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
