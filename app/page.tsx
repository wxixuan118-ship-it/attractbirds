import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PlannerForm } from "./components/PlannerForm";
import { plantPicks, problemGuides } from "../lib/content";
import { getPublishedBirds } from "../lib/bird-repository";

const modules = [
  { icon: "🦜", num: "01", title: "Bird Encyclopedia", copy: "500+ species — diet, habitat, attraction tips, and nesting habits for every common backyard bird.", href: "/birds" },
  { icon: "📍", num: "02", title: "Birds by Location", copy: "Explore backyard birds by state, city, or region. Discover what's visiting your area right now.", href: "/birds/california" },
  { icon: "🌿", num: "03", title: "Bird-Friendly Plants", copy: "Native plants that attract the birds you love — filtered by region, bloom season, and bird species.", href: "/plants/attract-hummingbirds" },
  { icon: "🪺", num: "04", title: "Feeder Guide", copy: "The right feeder for every bird. Types, placement, maintenance, and top product picks.", href: "/feeders/platform-feeder" },
  { icon: "🍂", num: "05", title: "Seasonal Birds", copy: "Year-round calendar of arrivals and migrations. Know exactly what to expect each month.", href: "/birds/seasonal" },
  { icon: "🔍", num: "06", title: "Problem Diagnosis", copy: "Feeders gone quiet? Diagnose and fix 100+ common backyard bird problems fast.", href: "/bird-problems/no-birds-at-feeder" },
  { icon: "🤖", num: "07", title: "AI Yard Planner", copy: "Input your location, yard size, and target birds. Get a personalized bird-garden plan in seconds.", href: "/#planner" },
  { icon: "🗺️", num: "08", title: "Attraction Guides", copy: "Step-by-step habitat-building guides for specific species like hummingbirds, cardinals, and owls.", href: "/birds" },
];

const locationPills = ["California", "Texas", "Florida", "New York", "Arizona", "Georgia", "Oregon", "Colorado", "Michigan", "North Carolina"];

export default async function Home() {
  const featuredBirds=(await getPublishedBirds()).slice(0,4);
  return (
    <div className="site-shell">
      <Header />
      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI-powered bird garden planning
          </div>
          <h1>Build your<br /><em>bird paradise.</em></h1>
          <p className="hero-sub">
            Tell us where you live and which birds you love. Get a personalized plan — the right plants, feeders, and habitat for your backyard.
          </p>
          <div className="hero-search">
            <input type="text" placeholder="Search a bird, plant, or problem…" aria-label="Search" />
            <button type="button">Search</button>
          </div>
          <div className="hero-pills">
            {locationPills.map((loc) => (
              <Link href={`/birds/${loc.toLowerCase()}`} className="hero-pill" key={loc}>{loc}</Link>
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="trust-bar">
          <div className="trust-item"><strong>500+</strong><span>Bird profiles</span></div>
          <div className="trust-item"><strong>50</strong><span>State guides</span></div>
          <div className="trust-item"><strong>1,000+</strong><span>Native plants</span></div>
          <div className="trust-item"><strong>100+</strong><span>Problem fixes</span></div>
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
              <Link className="bird-card" href={`/birds/${bird.slug}`} key={bird.slug}>
                <div className="bird-circle">
                  <div className="bird-circle-inner">{bird.initials}</div>
                </div>
                <span className="bird-card-name">{bird.commonName}</span>
                <span className="bird-card-sci">{bird.scientificName}</span>
                <span className="bird-card-tag">{bird.family}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <span>Native plants</span><span className="marquee-dot" />
          <span>Right food</span><span className="marquee-dot" />
          <span>Clean water</span><span className="marquee-dot" />
          <span>Safe shelter</span><span className="marquee-dot" />
          <span>Local birds</span><span className="marquee-dot" />
          <span>AI planning</span><span className="marquee-dot" />
          <span>Expert guides</span>
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
              <Link href="/plants/attract-hummingbirds">Read the guide →</Link>
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
