import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PlannerForm } from "./components/PlannerForm";
import { StateTileMap } from "./components/StateTileMap";
import { getPublishedBirds } from "../lib/bird-repository";
import { isBirdProfilePublished } from "../lib/indexing";
import { Cited, JsonLd, editorialJsonLd, editorialMetadata } from "./components/Editorial";
import { miscEditorial } from "../data/editorial/misc";
import { US_STATES_DATA } from "../data/us-states-data";
import { OCCURRENCE_STATES } from "../lib/occurrence-data";
import { HOW_TO_URLS, SITE, URL_REGISTRY } from "../lib/url-registry";
import type { Metadata } from "next";
import { SEASONS, seasonSlugs } from "../lib/seasonal-repository";

const content = miscEditorial["/"];
export const metadata: Metadata = editorialMetadata(content);

const FONTS = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap";

/** Inline stroke icons for the entry cards. */
const ICONS = {
  pin: <><path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
  feeder: <><path d="M12 2v4" /><path d="M5 6h14l-2 6H7z" /><path d="M8 12v8h8v-8" /><path d="M6 20h12" /></>,
};

const entries = [
  { icon: ICONS.pin, title: "Birds by state", copy: "Which birds live near you and in which months, for all 50 states.", href: URL_REGISTRY.locations.hub, cta: "Pick your state" },
  { icon: ICONS.calendar, title: "Birds by season", copy: "What arrives, nests and leaves in spring, summer, fall and winter, state by state.", href: URL_REGISTRY.seasonal.hub, cta: "Choose a season" },
  { icon: ICONS.book, title: "Bird encyclopedia", copy: "Sourced profiles of U.S. backyard birds: food, feeders, plants and range.", href: URL_REGISTRY.birds.hub, cta: "Browse the birds" },
  { icon: ICONS.feeder, title: "Feeder tools", copy: "A feeder calculator, every feeder type, and the food each bird prefers.", href: URL_REGISTRY.tools.feederCalculator, cta: "Open the tools" },
];

const SEASON_NOTES: Record<string, string> = { spring: "Migration and nesting.", summer: "Breeding and raising young.", fall: "Migration and flocking.", winter: "Feeders, shelter and open water." };

const featured = [
  { slug: "northern-cardinal", food: "Sunflower and safflower" },
  { slug: "blue-jay", food: "Peanuts and acorns" },
  { slug: "american-goldfinch", food: "Nyjer and sunflower chips" },
  { slug: "ruby-throated-hummingbird", food: "Nectar and tubular flowers" },
  { slug: "black-capped-chickadee", food: "Sunflower and suet" },
  { slug: "downy-woodpecker", food: "Suet and peanuts" },
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

const feederTools = [
  { title: "Bird feeder calculator", copy: "Enter yard size, target birds and budget; get feeder count, type and seed per week.", href: URL_REGISTRY.tools.feederCalculator },
  { title: "Feeder types and the birds they attract", copy: "Hopper, tube, platform, suet, nyjer mesh, window and hummingbird feeders.", href: URL_REGISTRY.feeders.hub },
  { title: "Compare feeders for your birds", copy: "Tube vs hopper, platform vs tube, suet vs seed — which draws the birds you want.", href: URL_REGISTRY.feeders.comparison("tube-vs-hopper") },
  { title: "Bird food that attracts each species", copy: "FeederWatch's ranking of sunflower, safflower, nyjer, millet, peanuts, suet and nectar.", href: URL_REGISTRY.birdFood },
];

export default async function Home() {
  const published = (await getPublishedBirds()).filter((b) => isBirdProfilePublished(b.slug));
  const birds = featured.flatMap((f) => {
    const bird = published.find((b) => b.slug === f.slug);
    return bird ? [{ ...f, name: bird.commonName }] : [];
  });
  const steps = content.sections.filter((s) => /^Step \d/.test(s.heading)).map((s) => {
    const [, num, title] = s.heading.match(/^Step (\d) — (.*)$/) ?? [];
    return { ...s, num: `0${num}`, title };
  });
  const stateSection = content.sections.find((s) => !/^Step \d/.test(s.heading));
  const blocks = editorialJsonLd(content, [], [{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.brand, url: SITE.origin }]);
  const img = content.image;
  const check = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;

  return (
    <div className="site-shell">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <Header />
      <main className="home">
        <JsonLd blocks={blocks} />

        {/* HERO */}
        <section className="home-wrap home-hero">
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-eyebrow">The backyard bird guide built on real bird data</p>
              <h1>{content.h1}</h1>
              <p className="home-lede">Learn how to attract birds that actually live near you. We match food, water, native plants and nest sites to your state and the season, so you set out what your local birds want.</p>
              <ul className="home-points">
                <li>{check}<span><strong>Local:</strong> the birds in each state, ranked from millions of eBird records</span></li>
                <li>{check}<span><strong>Seasonal:</strong> what arrives, nests and leaves in spring, summer, fall and winter</span></li>
                <li>{check}<span><strong>Sourced:</strong> every tip links to Project FeederWatch, Audubon or the Cornell Lab</span></li>
              </ul>
              <div className="home-actions">
                <Link href="/#step-1" className="home-btn home-btn-primary">Start with step 1</Link>
                <Link href="/#states" className="home-btn home-btn-ghost">Find birds in your state</Link>
              </div>
            </div>
            {img && (
              <figure className="home-hero-figure">
                {/* Static, licensed image committed to the repo. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} fetchPriority="high" decoding="async" />
                <figcaption>
                  Photo: <a href={img.creditUrl} rel="noopener noreferrer" target="_blank">{img.credit}</a>,{" "}
                  <a href={img.licenseUrl} rel="noopener noreferrer license" target="_blank">{img.license}</a>, via Wikimedia Commons.
                </figcaption>
              </figure>
            )}
          </div>
          <dl className="home-stats">
            <div><dt>{US_STATES_DATA.length}</dt><dd>state bird guides</dd></div>
            <div><dt>{seasonSlugs.length}</dt><dd>season guides, state by state</dd></div>
            <div><dt>{published.length}</dt><dd>backyard species profiled</dd></div>
            <div><dt>{OCCURRENCE_STATES.length}</dt><dd>states ranked from eBird records</dd></div>
          </dl>
        </section>

        {/* ENTRY POINTS */}
        <section className="home-wrap home-section">
          <h2>Start with your state, the season or a bird</h2>
          <div className="home-card-grid">
            {entries.map((e) => (
              <Link className="home-card" href={e.href} key={e.title}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="home-card-icon">{e.icon}</svg>
                <h3>{e.title}</h3>
                <p>{e.copy}</p>
                <span className="home-card-cta">{e.cta} →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* THE FIVE STEPS */}
        <section className="home-band" id="steps">
          <div className="home-wrap home-section">
            <div className="home-section-head">
              <h2>How to attract birds in five steps</h2>
              <span>Sources: Project FeederWatch, Audubon, All About Birds</span>
            </div>
            <div className="home-intro">
              {content.intro.map((p, i) => <p key={i}><Cited text={p} sources={content.sources} /></p>)}
            </div>
            <ol className="home-steps">
              {steps.map((s) => (
                <li key={s.heading} id={s.num === "01" ? "step-1" : undefined}>
                  <div className="home-step-head"><span>{s.num}</span><h3>{s.title}</h3></div>
                  <div className="home-step-body">
                    {s.paragraphs.map((p, i) => <p key={i}><Cited text={p} sources={content.sources} /></p>)}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BIRDS BY STATE */}
        <section className="home-wrap home-section home-split" id="states">
          <div className="home-split-copy">
            <h2>{stateSection?.heading ?? "Birds you can attract in your state"}</h2>
            {stateSection?.paragraphs.map((p, i) => <p key={i}><Cited text={p} sources={content.sources} /></p>)}
            <div className="home-legend">
              <span><i className="is-ranked" />Ranked from eBird records</span>
              <span><i />State guide</span>
            </div>
            <Link href={URL_REGISTRY.locations.hub} className="home-link">All 50 states →</Link>
          </div>
          <StateTileMap />
        </section>

        {/* SEASONS */}
        <section className="home-wrap home-section home-section-tight">
          <div className="home-section-head">
            <h2>Backyard birds season by season</h2>
            <Link href={URL_REGISTRY.seasonal.hub} className="home-link">All seasons →</Link>
          </div>
          <div className="home-card-grid">
            {seasonSlugs.map((season) => (
              <Link className="home-card" href={URL_REGISTRY.seasonal.season(season)} key={season} title={`${SEASONS[season].name} birds by state`}>
                <span className="home-card-kicker">{SEASONS[season].months}</span>
                <h3>{SEASONS[season].name} birds</h3>
                <p>{SEASON_NOTES[season]}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* BIRD ENCYCLOPEDIA */}
        <section className="home-band">
          <div className="home-wrap home-section">
            <div className="home-section-head">
              <h2>Backyard birds you can attract</h2>
              <Link href={URL_REGISTRY.birds.hub} className="home-link">All {published.length} birds →</Link>
            </div>
            <div className="home-bird-grid">
              {birds.map((b) => (
                <Link className="home-bird" href={URL_REGISTRY.birds.detail(b.slug)} key={b.slug} aria-label={b.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/birds/${b.slug}.webp`} alt="" loading="lazy" decoding="async" width={400} height={400} />
                  <strong>{b.name}</strong>
                  <span>{b.food}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ATTRACTION GUIDES */}
        <section className="home-wrap home-section">
          <div className="home-section-head">
            <h2>How to attract birds in every situation</h2>
            <Link href={URL_REGISTRY.howTo.hub} className="home-link">All attraction guides →</Link>
          </div>
          <ul className="home-link-grid">
            {HOW_TO_URLS.map(({ slug }) => (
              <li key={slug}><Link href={URL_REGISTRY.howTo.guide(slug)}>{guideLabels[slug] ?? slug}</Link></li>
            ))}
            {speciesGuides.map(([slug, label]) => (
              <li key={slug}><Link href={URL_REGISTRY.howTo.species(slug)}>How to attract {label}</Link></li>
            ))}
          </ul>
        </section>

        {/* FEEDER TOOLS */}
        <section className="home-wrap home-section home-section-tight">
          <div className="home-section-head">
            <h2>Bird feeder tools that attract more birds</h2>
            <Link href={URL_REGISTRY.feeders.hub} className="home-link">Feeder guide →</Link>
          </div>
          <div className="home-card-grid">
            {feederTools.map((t) => (
              <Link className="home-card" href={t.href} key={t.title}>
                <h3>{t.title}</h3>
                <p>{t.copy}</p>
                <span className="home-card-cta">Open →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* YARD PLANNER */}
        <section className="home-wrap home-section" id="planner">
          <div className="home-planner">
            <div className="home-planner-copy">
              <h2>Plan a yard that attracts birds</h2>
              <p>Tell us where you live and which birds you want to attract. You get native plants, feeder types, water sources and a seasonal checklist.</p>
              <p className="home-muted">No signup required.</p>
            </div>
            <PlannerForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="home-rule">
          <div className="home-wrap home-section home-faq">
            <h2>Questions about attracting birds</h2>
            <div>
              {content.faq.map((f) => (
                <div key={f.question} className="home-faq-item">
                  <h3>{f.question}</h3>
                  <p><Cited text={f.answer} sources={content.sources} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOURCES */}
        <section className="home-wrap home-section home-sources">
          <h2>Sources on attracting birds</h2>
          <ol>
            {content.sources.map((s) => (
              <li key={s.id} id={`source-${s.id}`}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.label}</a></li>
            ))}
          </ol>
        </section>
      </main>
      <Footer showPartners showDirectory />
    </div>
  );
}
