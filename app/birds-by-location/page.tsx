import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { USMap } from "../components/USMap";
import { US_STATES_DATA, REGIONS } from "../../data/us-states-data";
import { getBirdImage } from "../../lib/group-data";
import { SITE } from "../../lib/url-registry";

const title = "Birds by State: Backyard Birds in All 50 U.S. States";
const description = "Birds by state: the common backyard birds, monthly calendar and best birding spots for all 50 U.S. states, with eBird data for the states we have analysed.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/birds-by-location" },
  openGraph: { title, description, type: "website" },
};

export default function BirdsByLocationPage() {
  const popularStates = ["california", "texas", "florida", "new-york", "arizona", "colorado"];
  const popular = US_STATES_DATA.filter((s) => popularStates.includes(s.slug));
  const image = getBirdImage("american-robin");
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${SITE.origin}/birds-by-location`,
      hasPart: US_STATES_DATA.map((s) => ({ "@type": "WebPage", name: `Birds in ${s.name}`, url: `${SITE.origin}/birds-by-location/${s.slug}` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "Birds by state", item: `${SITE.origin}/birds-by-location` },
    ] },
  ];

  return (
    <div className="site-shell">
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Hero */}
        <section className="hero" style={{ paddingBottom: "40px" }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            50 states · 600+ species
          </div>
          <h1>
            Birds by <em>State</em>
          </h1>
          <p className="hero-sub">
            Browse birds by state to see which species visit backyards where you live: the common birds,
            what arrives and leaves each month, and the best bird-watching spots in all 50 states.
          </p>
        </section>

        {image && (
          <section className="loc-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <figure className="state-hero-figure" style={{ maxWidth: "760px", margin: "0 auto" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="American Robin, found in almost every state — compare birds by state below" width={image.width} height={image.height} decoding="async" />
              <figcaption>
                American Robin. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          </section>
        )}

        {/* Interactive Map */}
        <section className="loc-section" style={{ paddingTop: "0" }}>
          <USMap />
        </section>

        {/* Popular Locations */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Popular states for birding</h2>
            <p>The most-searched states for backyard birding and bird watching</p>
          </div>
          <div className="state-directory" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {popular.map((s) => (
              <a key={s.slug} href={`/birds-by-location/${s.slug}`} className="state-card">
                <span className="state-card-abbr">{s.abbr}</span>
                <span className="state-card-name">{s.name}</span>
                <span className="state-card-count">{s.speciesCount}+ species</span>
              </a>
            ))}
          </div>
        </section>

        {/* Browse by Region */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Birds by state and region</h2>
            <p>Find birds across the four major flyways and regions of the United States</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {(Object.entries(REGIONS) as [string, typeof US_STATES_DATA][]).map(([region, states]) => (
              <div key={region}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span className={`legend-dot dot-${region.toLowerCase()}`} style={{ width: "12px", height: "12px" }} />
                  <h3 style={{ fontSize: "20px", fontWeight: 700 }}>{region}</h3>
                  <small style={{ color: "var(--text-muted)" }}>{states.length} states</small>
                </div>
                <div className="state-directory" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                  {states.map((s) => (
                    <a key={s.slug} href={`/birds-by-location/${s.slug}`} className="state-card">
                      <span className="state-card-abbr">{s.abbr}</span>
                      <span className="state-card-name">{s.name}</span>
                      <span className="state-card-count">{s.speciesCount}+ species</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What you'll find */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>What you'll find on each state page</h2>
            <p>Every state guide is packed with practical information for backyard birders and bird watchers</p>
          </div>
          <div className="module-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            <div className="module-card">
              <div className="module-icon-wrap">🐦</div>
              <span className="module-number">01</span>
              <strong>Common Birds</strong>
              <p>The species you're most likely to see in yards, parks, and neighborhoods—with photos, calls, and identification tips.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap">🏡</div>
              <span className="module-number">02</span>
              <strong>Backyard Birds</strong>
              <p>Birds that regularly visit feeders and gardens. Learn what food, plants, and feeders attract each species in your state.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap">🌲</div>
              <span className="module-number">03</span>
              <strong>Birds by Habitat</strong>
              <p>Coastal, desert, forest, wetland, and urban—filter by the habitat you bird in most.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap">📍</div>
              <span className="module-number">04</span>
              <strong>Birding Hotspots</strong>
              <p>Top bird-watching locations in each state, from national wildlife refuges to local parks and sanctuaries.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap">📅</div>
              <span className="module-number">05</span>
              <strong>Monthly Calendar</strong>
              <p>Which birds to expect each month—migration arrivals, departures, and breeding season highlights.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap">🪶</div>
              <span className="module-number">06</span>
              <strong>Migration Patterns</strong>
              <p>Spring and fall flyway information—when and where migrants pass through your state.</p>
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Why bird watching changes by location</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", fontSize: "15px", lineHeight: 1.7, color: "var(--text-muted)" }}>
            <div>
              <p>
                The birds you see depend almost entirely on where you live. California's 660+ species range from coastal
                pelagic birds to Sierra Nevada mountain specialties, while Florida's subtropical wetlands host species
                found nowhere else in the mainland United States. Texas sits at the crossroads of eastern and western
                avifaunas, and its Lower Rio Grande Valley is home to Mexican species at their northern range limit.
              </p>
              <p>
                Each state falls along one of four major North American flyways—Atlantic, Mississippi, Central, and
                Pacific—which channel billions of birds during spring and fall migration. Knowing your flyway helps
                you predict migration timing and target species.
              </p>
            </div>
            <div>
              <p>
                Habitat is the other key factor. A coastal backyard in Maine will attract different species than a
                desert garden in Arizona or a mountain property in Colorado. Our state pages break down birds by
                habitat type—coastal, forest, desert, wetland, and urban—so you can focus on the species relevant
                to your specific environment.
              </p>
              <p>
                Whether you're setting up your first bird feeder, planning a birding trip, or trying to identify a
                bird you spotted in your yard, start by selecting your state on the map above. For sightings reported in
                the last few days, check{" "}
                <a href="https://ebird.org/explore" rel="noopener noreferrer" target="_blank">eBird</a>, the Cornell Lab of Ornithology&rsquo;s checklist database that our state data comes from.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
