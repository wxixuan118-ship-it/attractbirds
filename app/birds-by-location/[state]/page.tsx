import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { BirdProfileLink } from "../../components/BirdProfileLink";
import { US_STATES_DATA, MONTHS } from "../../../data/us-states-data";
import { getStateStaticParams, getStatePageData } from "../../../lib/location-repository";

export function generateStaticParams() {
  return getStateStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const stateData = US_STATES_DATA.find((s) => s.slug === state);
  if (!stateData) return { title: "Birds by Location" };

  const title = `Birds in ${stateData.name}: Common Backyard Birds & Bird Watching Guide`;
  const description = `Discover ${stateData.speciesCount}+ bird species in ${stateData.name}. Common backyard birds, birding hotspots, seasonal migration calendar, and habitat guides for ${stateData.popularCities[0]} and beyond.`;

  return {
    title,
    description,
    alternates: { canonical: `/birds-by-location/${stateData.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

const HABITAT_ICONS: Record<string, string> = {
  Coastal: "🏖️",
  Desert: "🏜️",
  Forest: "🌲",
  Wetland: "🌊",
  Urban: "🏙️",
};

const HABITAT_BLURBS: Record<string, string> = {
  Coastal: "Shorebirds, gulls, terns, and seabirds along the coastline.",
  Desert: "Desert specialists—from thrashers to quail adapted to arid conditions.",
  Forest: "Woodland and canopy birds including woodpeckers, warblers, and owls.",
  Wetland: "Marsh, lake, and river species—waterfowl, herons, and shorebirds.",
  Urban: "City-adapted birds thriving in parks, gardens, and neighborhoods.",
};

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const data = await getStatePageData(stateSlug);
  if (!data) notFound();

  const { state, commonBirds, backyardBirds, totalSpecies, monthlyHighlights } = data;

  return (
    <div className="site-shell">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/birds-by-location">Birds by Location</Link> / {state.name}
        </div>

        {/* Hero */}
        <section className="location-hero">
          <p className="eyebrow" style={{ marginBottom: "12px" }}>
            <span /> {state.region} · {state.flyway} Flyway
          </p>
          <h1>
            Birds in <em>{state.name}</em>
          </h1>
          <p className="lede">{state.summary}</p>
          <div className="location-stats">
            <div className="location-stat">
              <strong>{totalSpecies}+</strong>
              <span>Bird species</span>
            </div>
            <div className="location-stat">
              <strong>{state.habitats.length}</strong>
              <span>Habitat types</span>
            </div>
            <div className="location-stat">
              <strong>{state.topBirdingSpots.length}</strong>
              <span>Birding hotspots</span>
            </div>
            <div className="location-stat">
              <strong>{state.popularCities.length}+</strong>
              <span>Cities</span>
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="loc-section" style={{ paddingTop: "20px" }}>
          <div className="loc-section-header">
            <h2 style={{ fontSize: "20px" }}>Popular cities in {state.name}</h2>
          </div>
          <div className="city-pills">
            {state.popularCities.map((city) => {
              const citySlug = city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
              return (
                <Link
                  key={city}
                  href={`/birds-by-location/${state.slug}/${citySlug}`}
                  className="city-pill"
                  style={{ textDecoration: "none" }}
                >
                  {city}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Common Birds */}
        {commonBirds.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              <h2>Common Birds in {state.name}</h2>
              <p>
                The most frequently reported bird species across {state.name}. Click any bird for full profiles,
                photos, calls, and attraction tips.
              </p>
            </div>
            <div className="loc-bird-grid">
              {commonBirds.slice(0, 18).map((bird) => (
                <BirdProfileLink
                  key={bird.slug}
                  href={`/birds-by-location/${state.slug}/${bird.slug}`}
                  className="loc-bird-card"
                >
                  <div className="loc-bird-initials">{bird.initials}</div>
                  <span className="loc-bird-name">{bird.commonName}</span>
                  <span className="loc-bird-sci">{bird.scientificName}</span>
                  {bird.seasonalStatus && (
                    <span className="loc-bird-status">{bird.seasonalStatus}</span>
                  )}
                  <span className="loc-bird-meta">{bird.family}</span>
                </BirdProfileLink>
              ))}
            </div>
            <div style={{ marginTop: "24px" }}>
              <Link href="/birds" className="header-cta" style={{ display: "inline-block" }}>
                Browse all birds →
              </Link>
            </div>
          </section>
        )}

        {/* Backyard Birds */}
        {backyardBirds.length > 0 && (
          <section className="loc-section" style={{ background: "var(--green-light)" }}>
            <div className="loc-section-header">
              <h2>Backyard Birds in {state.name}</h2>
              <p>
                Birds that regularly visit feeders and gardens in {state.name}. These are the species you're most
                likely to attract with the right food, plants, and habitat setup.
              </p>
            </div>
            <div className="loc-bird-grid">
              {backyardBirds.map((bird) => (
                <BirdProfileLink
                  key={bird.slug}
                  href={`/birds-by-location/${state.slug}/${bird.slug}`}
                  className="loc-bird-card"
                >
                  <div className="loc-bird-initials">{bird.initials}</div>
                  <span className="loc-bird-name">{bird.commonName}</span>
                  <span className="loc-bird-sci">{bird.scientificName}</span>
                  <span className="loc-bird-meta">
                    {bird.habitat}
                  </span>
                </BirdProfileLink>
              ))}
            </div>
            <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/feeders/platform-feeder" className="header-cta" style={{ display: "inline-block" }}>
                Find the right feeder →
              </Link>
              <Link href={`/plants/${state.slug}/native-plants`} className="region-pill" style={{ display: "inline-block" }}>
                Bird-friendly plants →
              </Link>
            </div>
          </section>
        )}

        {/* Birds by Habitat */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Birds by Habitat in {state.name}</h2>
            <p>
              {state.name} spans {state.habitats.length} major habitat types. Explore birds adapted to each
              environment.
            </p>
          </div>
          <div className="habitat-grid">
            {state.habitats.map((habitat) => (
              <div key={habitat} className="habitat-card">
                <span className="habitat-icon">{HABITAT_ICONS[habitat] ?? "🌿"}</span>
                <span className="habitat-name">{habitat} Birds</span>
                <span className="habitat-desc">
                  {HABITAT_BLURBS[habitat] ?? "Habitat-specific bird communities."}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bird Watching Locations */}
        <section className="loc-section" style={{ background: "var(--card)" }}>
          <div className="loc-section-header">
            <h2>Top Bird Watching Spots in {state.name}</h2>
            <p>The best places to go bird watching in {state.name}, from national wildlife refuges to local sanctuaries.</p>
          </div>
          <div className="spot-list">
            {state.topBirdingSpots.map((spot, i) => (
              <div key={spot.name} className="spot-card">
                <div className="spot-number">{i + 1}</div>
                <div className="spot-info">
                  <h4>{spot.name}</h4>
                  <p>{spot.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly Calendar */}
        {monthlyHighlights.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              <h2>Bird Calendar — {state.name}</h2>
              <p>What to expect each month: migration arrivals, departures, and seasonal highlights.</p>
            </div>
            <div className="month-calendar">
              {MONTHS.map((month, i) => {
                const highlight = monthlyHighlights.find((h) => h.month === month);
                return (
                  <div key={month} className="month-card">
                    <div className="month-name">{month}</div>
                    {highlight && highlight.birds.length > 0 ? (
                      highlight.birds.map((bird) => (
                        <Link
                          key={bird.slug}
                          href={`/birds-by-location/${state.slug}/${bird.slug}`}
                          style={{ display: "block" }}
                        >
                          <span className="month-bird">{bird.name}</span>
                        </Link>
                      ))
                    ) : (
                      <span className="month-bird" style={{ opacity: 0.5 }}>
                        Steady winter residents
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Cross-links to other states */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Explore neighboring states</h2>
          </div>
          <div className="state-directory" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {US_STATES_DATA.filter(
              (s) => s.slug !== state.slug && s.region === state.region
            )
              .slice(0, 6)
              .map((s) => (
                <Link key={s.slug} href={`/birds-by-location/${s.slug}`} className="state-card">
                  <span className="state-card-abbr">{s.abbr}</span>
                  <span className="state-card-name">{s.name}</span>
                  <span className="state-card-count">{s.speciesCount}+ species</span>
                </Link>
              ))}
          </div>
        </section>

        {/* SEO content */}
        <section className="loc-section" style={{ paddingBottom: "64px" }}>
          <div className="loc-section-header">
            <h2 style={{ fontSize: "22px" }}>About birding in {state.name}</h2>
          </div>
          <div style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "760px" }}>
            <p>
              {state.name} is located in the {state.region} region of the United States and falls along the{" "}
              {state.flyway} Flyway, one of four major North American migration routes. The state is home to more
              than {totalSpecies} bird species across {state.habitats.length} habitat types:{" "}
              {state.habitats.join(", ").toLowerCase()}.
            </p>
            <p style={{ marginTop: "16px" }}>
              Whether you're a backyard birder in {state.popularCities[0]} or planning a trip to{" "}
              {state.topBirdingSpots[0]?.name}, this guide covers the most commonly seen species, seasonal patterns,
              and practical tips for attracting and identifying birds in {state.name}.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
