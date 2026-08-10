import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PlannerForm } from "./components/PlannerForm";
import { featuredBirds, plantPicks, problemGuides } from "../lib/content";

const modules = [
  { mark: "01", title: "Bird encyclopedia", copy: "Identify local birds and learn the exact food, plants, and shelter each species prefers.", href: "/birds" },
  { mark: "02", title: "Birds near you", copy: "Explore common backyard birds by state, season, and local habitat.", href: "/birds/california" },
  { mark: "03", title: "Bird-friendly plants", copy: "Choose region-appropriate plants that provide nectar, fruit, insects, and cover.", href: "/plants/attract-hummingbirds" },
  { mark: "04", title: "Solve feeder problems", copy: "Diagnose quiet feeders, spoiled seed, predators, and placement issues.", href: "/bird-problems/no-birds-at-feeder" },
];

export default function Home() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> A better backyard starts here</p>
            <h1>Bring more <em>birds</em><br />to your backyard.</h1>
            <p className="hero-text">Science-backed guidance for choosing the right plants, food, feeders, and shelter—personalized for where you live.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#planner">Plan my bird garden <span>→</span></Link>
              <Link className="text-link" href="/birds">Explore the bird guide <span>↗</span></Link>
            </div>
            <div className="trust-row">
              <div><strong>500+</strong><span>bird profiles</span></div>
              <div><strong>50</strong><span>state guides</span></div>
              <div><strong>1,000+</strong><span>bird-friendly plants</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="A stylized garden habitat plan">
            <div className="sun-disc" />
            <div className="branch branch-one" />
            <div className="branch branch-two" />
            <div className="bird-shape"><span className="bird-eye" /></div>
            <div className="leaf leaf-one" />
            <div className="leaf leaf-two" />
            <div className="leaf leaf-three" />
            <div className="visual-note note-one"><small>Plant</small><strong>Native berries</strong></div>
            <div className="visual-note note-two"><small>Provide</small><strong>Fresh water</strong></div>
            <p className="visual-caption">Four essentials: food, water, shelter, space.</p>
          </div>
        </section>

        <section className="marquee" aria-label="Habitat essentials">
          <span>Native plants</span><i>✦</i><span>Right food</span><i>✦</i><span>Clean water</span><i>✦</i><span>Safe shelter</span><i>✦</i><span>Local birds</span>
        </section>

        <section className="section explore-section">
          <div className="section-heading split-heading">
            <div><p className="eyebrow"><span /> Explore the knowledge base</p><h2>Everything your<br />backyard needs.</h2></div>
            <p>Start with a bird you love, the place you live, or a problem you want to solve. Every guide connects to a practical next step.</p>
          </div>
          <div className="module-grid">
            {modules.map((module) => (
              <Link className="module-card" href={module.href} key={module.title}>
                <span className="module-number">{module.mark}</span>
                <div className="module-icon" aria-hidden="true">{module.mark === "01" ? "◒" : module.mark === "02" ? "⌖" : module.mark === "03" ? "❧" : "?"}</div>
                <h3>{module.title}</h3><p>{module.copy}</p><span className="card-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section birds-section">
          <div className="section-heading row-heading">
            <div><p className="eyebrow light"><span /> Meet your neighbors</p><h2>Popular backyard birds</h2></div>
            <Link className="button button-light" href="/birds">View all birds <span>→</span></Link>
          </div>
          <div className="bird-grid">
            {featuredBirds.map((bird, index) => (
              <Link className={`bird-card bird-${index + 1}`} href={`/birds/${bird.slug}`} key={bird.slug}>
                <span className="bird-monogram">{bird.initials}</span>
                <div className="bird-card-copy"><small>{bird.family}</small><h3>{bird.commonName}</h3><p>{bird.hook}</p><span>Explore species →</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section planner-section" id="planner">
          <div className="planner-intro">
            <p className="eyebrow"><span /> Backyard planner</p>
            <h2>Your yard.<br /><em>Their</em> perfect habitat.</h2>
            <p>Tell us where you live and which birds you hope to see. We’ll create a practical starter plan using suitable plants, feeders, water, and shelter.</p>
            <ul><li><b>✓</b> Local bird recommendations</li><li><b>✓</b> Region-aware plant choices</li><li><b>✓</b> A simple seasonal checklist</li></ul>
          </div>
          <PlannerForm />
        </section>

        <section className="section field-notes">
          <div className="section-heading row-heading dark-text">
            <div><p className="eyebrow"><span /> Field notes</p><h2>Small changes, more birds.</h2></div>
            <p>Begin with one useful improvement. A safer feeder, a native shrub, or a shallow water source can transform a quiet space.</p>
          </div>
          <div className="notes-grid">
            <article className="note-card note-feature"><span className="note-tag">Plant guide</span><h3>{plantPicks[0].title}</h3><p>{plantPicks[0].summary}</p><Link href="/plants/attract-hummingbirds">Read the guide →</Link></article>
            {problemGuides.map((guide) => <article className="note-card" key={guide.title}><span className="note-tag">Problem solver</span><h3>{guide.title}</h3><p>{guide.summary}</p><Link href={guide.href}>Find the fix →</Link></article>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
