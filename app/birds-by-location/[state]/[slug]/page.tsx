import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { BirdProfileLink } from "../../../components/BirdProfileLink";
import { US_STATES_DATA, MONTHS, STATE_BY_SLUG } from "../../../../data/us-states-data";
import {
  getComboStaticParams,
  resolveSubSlug,
  getBirdStateData,
  getCityPageData,
} from "../../../../lib/location-repository";

export function generateStaticParams() {
  return getComboStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; slug: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, slug } = await params;
  const stateData = STATE_BY_SLUG[stateSlug];
  if (!stateData) return { title: "Birds by Location" };

  const resolved = resolveSubSlug(stateSlug, slug);
  if (!resolved) return { title: "Birds by Location" };

  if (resolved.type === "bird") {
    const data = await getBirdStateData(stateSlug, resolved.birdSlug);
    if (!data) return { title: "Birds by Location" };

    const birdName = data.bird.commonName;
    const title = `${birdName} in ${stateData.name}: ${data.abundance === "abundant" ? "Abundant" : data.abundance === "common" ? "Common" : data.abundance === "uncommon" ? "Uncommon" : "Rare"} — When & Where to Spot`;
    const description = `${birdName} in ${stateData.name}: ${data.presence} species${data.bestMonths.length > 0 ? `, best seen in ${data.bestMonths.slice(0, 3).join(", ")}` : ""}. Identification, habitat, seasonal status, and birding tips for ${stateData.name}.`;

    return {
      title,
      description,
      alternates: { canonical: `/birds-by-location/${stateSlug}/${slug}` },
      robots: { index: false, follow: true },
      openGraph: { title, description, type: "article" },
    };
  }

  // City page
  const city = resolved.city;
  const title = `Birds in ${city.name}, ${stateData.abbr}: Common Backyard Birds & Birding Guide`;
  const description = `Discover common backyard birds in ${city.name}, ${stateData.name}. Bird watching spots, seasonal patterns, and tips for attracting birds to your ${city.name} yard.`;

  return {
    title,
    description,
    alternates: { canonical: `/birds-by-location/${stateSlug}/${slug}` },
    robots: { index: false, follow: true },
    openGraph: { title, description, type: "website" },
  };
}

const ABUNDANCE_LABELS: Record<string, { label: string; color: string }> = {
  abundant: { label: "Abundant", color: "var(--green-accent)" },
  common: { label: "Common", color: "var(--blue-accent)" },
  uncommon: { label: "Uncommon", color: "var(--orange-accent)" },
  rare: { label: "Rare", color: "var(--red-accent)" },
  accidental: { label: "Accidental", color: "var(--red-accent)" },
};

const PRESENCE_LABELS: Record<string, string> = {
  resident: "Year-round resident",
  breeding: "Summer breeder",
  winter: "Winter visitor",
  migrant: "Migrant / Transient",
};

export default async function ComboPage({
  params,
}: {
  params: Promise<{ state: string; slug: string }>;
}) {
  const { state: stateSlug, slug } = await params;
  const state = STATE_BY_SLUG[stateSlug];
  if (!state) notFound();

  const resolved = resolveSubSlug(stateSlug, slug);
  if (!resolved) notFound();

  if (resolved.type === "bird") {
    return <BirdStateView stateSlug={stateSlug} birdSlug={resolved.birdSlug} />;
  }
  return <CityView stateSlug={stateSlug} citySlug={slug} />;
}

// ─── Bird × State combo page ───────────────────────────────────

async function BirdStateView({ stateSlug, birdSlug }: { stateSlug: string; birdSlug: string }) {
  const data = await getBirdStateData(stateSlug, birdSlug);
  if (!data) notFound();

  const { bird, state, monthlyData, abundance, presence, bestMonths, peakMonths, totalObservations, avgFrequency, relatedBirds, nearbyStatesWithBird } = data;
  const abundanceInfo = ABUNDANCE_LABELS[abundance] ?? ABUNDANCE_LABELS.common;
  const pilot = birdSlug ? undefined : undefined; // already have bird data
  const maxFreq = Math.max(...monthlyData.map((m) => m.frequencyScore), 0.01);

  return (
    <div className="site-shell">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link> /{" "}
          <Link href="/birds-by-location">Birds by Location</Link> /{" "}
          <Link href={`/birds-by-location/${state.slug}`}>{state.name}</Link> /{" "}
          {bird.commonName}
        </div>

        {/* Hero */}
        <section className="location-hero">
          <p className="eyebrow" style={{ marginBottom: "12px" }}>
            <span /> {state.region} · {state.flyway} Flyway
          </p>
          <h1>
            <em>{bird.commonName}</em> in {state.name}
          </h1>
          <p className="lede">
            {bird.scientificName} — {bird.family}
          </p>

          {/* Quick stats */}
          <div className="location-stats">
            <div className="location-stat">
              <strong style={{ color: abundanceInfo.color }}>{abundanceInfo.label}</strong>
              <span>Abundance</span>
            </div>
            <div className="location-stat">
              <strong>{PRESENCE_LABELS[presence] ?? presence}</strong>
              <span>Seasonal status</span>
            </div>
            {bestMonths.length > 0 && (
              <div className="location-stat">
                <strong>{bestMonths.length}</strong>
                <span>Active months</span>
              </div>
            )}
            {totalObservations > 0 && (
              <div className="location-stat">
                <strong>{totalObservations.toLocaleString()}</strong>
                <span>Observations</span>
              </div>
            )}
          </div>
        </section>

        {/* Bird summary */}
        <section className="loc-section" style={{ paddingTop: "20px" }}>
          <div className="loc-section-header">
            <h2 style={{ fontSize: "20px" }}>About {bird.commonName} in {state.name}</h2>
          </div>
          <div style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "760px" }}>
            <p>{bird.summary}</p>
            <p style={{ marginTop: "12px" }}>
              In {state.name}, this species is classified as <strong style={{ color: abundanceInfo.color }}>{abundanceInfo.label.toLowerCase()}</strong>.
              {presence === "resident" && ` It is a year-round resident, present in all 12 months.`}
              {presence === "breeding" && ` It visits during the breeding season, typically spring through summer.`}
              {presence === "winter" && ` It is primarily a winter visitor to ${state.name}.`}
              {presence === "migrant" && ` It passes through ${state.name} during migration.`}
              {bestMonths.length > 0 && ` The best months to observe this bird are ${bestMonths.join(", ")}.`}
              {peakMonths.length > 0 && ` Peak activity occurs in ${peakMonths.join(", ")}.`}
            </p>
          </div>
        </section>

        {/* Monthly activity chart */}
        {monthlyData.length > 0 && (
          <section className="loc-section" style={{ background: "var(--card)" }}>
            <div className="loc-section-header">
              <h2>Monthly Activity — {bird.commonName} in {state.name}</h2>
              <p>Relative frequency of observations by month. Higher bars indicate peak periods for this species.</p>
            </div>
            <div className="month-activity-chart">
              {monthlyData.map((m) => (
                <div key={m.month} className="month-activity-bar">
                  <div className="month-activity-fill-wrap">
                    <div
                      className="month-activity-fill"
                      style={{
                        height: `${Math.max((m.frequencyScore / maxFreq) * 100, 3)}%`,
                        background:
                          m.seasonalStatus === "regular"
                            ? "var(--green-accent)"
                            : m.seasonalStatus === "seasonal"
                            ? "var(--blue-accent)"
                            : m.seasonalStatus === "rare"
                            ? "var(--orange-accent)"
                            : "var(--text-faint)",
                      }}
                      title={`${m.month}: ${m.seasonalStatus}`}
                    />
                  </div>
                  <span className="month-activity-label">{m.month.slice(0, 3)}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "var(--text-muted)" }}>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--green-accent)", borderRadius: "2px", marginRight: "6px", verticalAlign: "middle" }} />Regular</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--blue-accent)", borderRadius: "2px", marginRight: "6px", verticalAlign: "middle" }} />Seasonal</span>
              <span><span style={{ display: "inline-block", width: "12px", height: "12px", background: "var(--orange-accent)", borderRadius: "2px", marginRight: "6px", verticalAlign: "middle" }} />Rare</span>
            </div>
          </section>
        )}

        {/* Bird identification */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Identification</h2>
          </div>
          <div className="bird-quick-facts">
            <div className="fact-card">
              <span className="fact-label">Colors</span>
              <span className="fact-value">{bird.colors}</span>
            </div>
            <div className="fact-card">
              <span className="fact-label">Size</span>
              <span className="fact-value">{bird.size}</span>
            </div>
            <div className="fact-card">
              <span className="fact-label">Habitat</span>
              <span className="fact-value">{bird.habitat}</span>
            </div>
            <div className="fact-card">
              <span className="fact-label">Family</span>
              <span className="fact-value">{bird.family}</span>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <BirdProfileLink
              href={`/birds/${bird.slug}`}
              className="header-cta"
              style={{ display: "inline-block" }}
            >
              View full {bird.commonName} profile →
            </BirdProfileLink>
          </div>
        </section>

        {/* Best time to see */}
        <section className="loc-section" style={{ background: "var(--green-light)" }}>
          <div className="loc-section-header">
            <h2>Best Time to See {bird.commonName} in {state.name}</h2>
          </div>
          <div className="month-calendar">
            {MONTHS.map((month, i) => {
              const monthData = monthlyData[i];
              const isActive = monthData && monthData.frequencyScore >= 0.1;
              const isPeak = monthData && monthData.frequencyScore >= 0.35;
              return (
                <div
                  key={month}
                  className="month-card"
                  style={{
                    background: isPeak
                      ? "var(--green-accent)"
                      : isActive
                      ? "var(--green-light)"
                      : "var(--bg)",
                    borderColor: isPeak ? "var(--green-accent)" : "var(--border)",
                  }}
                >
                  <div className="month-name">{month}</div>
                  <span className="month-bird" style={{ opacity: isActive ? 1 : 0.4 }}>
                    {isPeak ? "Peak" : isActive ? "Active" : "Low"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Related birds */}
        {relatedBirds.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              <h2>Other birds in {state.name}</h2>
              <p>Birds you might also encounter in {state.name}.</p>
            </div>
            <div className="loc-bird-grid">
              {relatedBirds.map((b) => (
                <BirdProfileLink
                  key={b.slug}
                  href={`/birds-by-location/${state.slug}/${b.slug}`}
                  className="loc-bird-card"
                >
                  <div className="loc-bird-initials">{b.initials}</div>
                  <span className="loc-bird-name">{b.commonName}</span>
                  <span className="loc-bird-sci">{b.scientificName}</span>
                  {b.seasonalStatus && (
                    <span className="loc-bird-status">{b.seasonalStatus}</span>
                  )}
                </BirdProfileLink>
              ))}
            </div>
          </section>
        )}

        {/* Other states */}
        {nearbyStatesWithBird.length > 0 && (
          <section className="loc-section" style={{ background: "var(--card)" }}>
            <div className="loc-section-header">
              <h2>{bird.commonName} in other states</h2>
            </div>
            <div className="state-directory" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
              {nearbyStatesWithBird.map((s) => (
                <Link
                  key={s.slug}
                  href={`/birds-by-location/${s.slug}/${bird.slug}`}
                  className="state-card"
                >
                  <span className="state-card-abbr">{s.abbr}</span>
                  <span className="state-card-name">{s.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEO content */}
        <section className="loc-section" style={{ paddingBottom: "64px" }}>
          <div className="loc-section-header">
            <h2 style={{ fontSize: "22px" }}>{bird.commonName} in {state.name}: Quick Facts</h2>
          </div>
          <div style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "760px" }}>
            <p>
              The {bird.commonName} ({bird.scientificName}) is {abundance === "abundant" ? "one of the most commonly seen" : abundance === "common" ? "a common" : abundance === "uncommon" ? "an uncommon" : "a rarely seen"} bird in {state.name}.
              It is classified as a <strong>{PRESENCE_LABELS[presence]?.toLowerCase() ?? presence}</strong> in the state,
              falling within the {state.region} region and the {state.flyway} Flyway migration corridor.
            </p>
            <p style={{ marginTop: "12px" }}>
              {bird.habitat && `Preferred habitats include ${bird.habitat.toLowerCase()}. `}
              {bestMonths.length > 0 && `The best months to spot this species in ${state.name} are ${bestMonths.join(", ")}. `}
              For birders in {state.popularCities[0]} and throughout {state.name}, knowing the seasonal patterns of {bird.commonName} can help plan birding trips and backyard feeding strategies.
            </p>
            <p style={{ marginTop: "12px" }}>
              {bird.residentStatus && `${bird.residentStatus}. `}
              Use the monthly activity chart above to plan your birding outings, and explore other bird species found in {state.name} using the related birds section.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// ─── City page ─────────────────────────────────────────────────

async function CityView({ stateSlug, citySlug }: { stateSlug: string; citySlug: string }) {
  const data = await getCityPageData(stateSlug, citySlug);
  if (!data) notFound();

  const { city, state, birds, backyardBirds, totalSpecies, nearbyCities } = data;

  return (
    <div className="site-shell">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link> /{" "}
          <Link href="/birds-by-location">Birds by Location</Link> /{" "}
          <Link href={`/birds-by-location/${state.slug}`}>{state.name}</Link> /{" "}
          {city.name}
        </div>

        {/* Hero */}
        <section className="location-hero">
          <p className="eyebrow" style={{ marginBottom: "12px" }}>
            <span /> {state.region} · {state.flyway} Flyway
          </p>
          <h1>
            Birds in <em>{city.name}</em>, {state.abbr}
          </h1>
          <p className="lede">{city.summary}</p>
          <div className="location-stats">
            <div className="location-stat">
              <strong>{totalSpecies}+</strong>
              <span>Bird species</span>
            </div>
            <div className="location-stat">
              <strong>{city.habitats.length}</strong>
              <span>Habitat types</span>
            </div>
            <div className="location-stat">
              <strong>{city.birdingSpots.length}</strong>
              <span>Birding spots</span>
            </div>
            <div className="location-stat">
              <strong>{backyardBirds.length}</strong>
              <span>Backyard birds</span>
            </div>
          </div>
        </section>

        {/* Common Birds */}
        {birds.length > 0 && (
          <section className="loc-section" style={{ paddingTop: "20px" }}>
            <div className="loc-section-header">
              <h2>Common Birds in {city.name}</h2>
              <p>
                The most frequently seen bird species in {city.name}, {state.name}. Click any bird for full profiles and location-specific data.
              </p>
            </div>
            <div className="loc-bird-grid">
              {birds.map((bird) => (
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
          </section>
        )}

        {/* Backyard Birds */}
        {backyardBirds.length > 0 && (
          <section className="loc-section" style={{ background: "var(--green-light)" }}>
            <div className="loc-section-header">
              <h2>Backyard Birds in {city.name}</h2>
              <p>
                Birds that regularly visit feeders and gardens in {city.name}. These species are your best bet for attracting birds to your yard.
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
                  <span className="loc-bird-meta">{bird.habitat}</span>
                </BirdProfileLink>
              ))}
            </div>
            <div style={{ marginTop: "24px" }}>
              <Link href="/feeders/platform-feeder" className="header-cta" style={{ display: "inline-block" }}>
                Find the right feeder for {city.name} →
              </Link>
            </div>
          </section>
        )}

        {/* Birding spots */}
        {city.birdingSpots.length > 0 && (
          <section className="loc-section" style={{ background: "var(--card)" }}>
            <div className="loc-section-header">
              <h2>Top Bird Watching Spots in {city.name}</h2>
            </div>
            <div className="spot-list">
              {city.birdingSpots.map((spot, i) => (
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
        )}

        {/* Nearby cities */}
        {nearbyCities.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              <h2>Explore nearby cities in {state.name}</h2>
            </div>
            <div className="city-pills">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/birds-by-location/${state.slug}/${c.slug}`}
                  className="city-pill"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEO content */}
        <section className="loc-section" style={{ paddingBottom: "64px" }}>
          <div className="loc-section-header">
            <h2 style={{ fontSize: "22px" }}>About birding in {city.name}</h2>
          </div>
          <div style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "760px" }}>
            <p>
              {city.name} is located in {state.name} and falls within the {state.region} region along the {state.flyway} Flyway.
              The city's habitats—{city.habitats.join(", ").toLowerCase()}—support a diverse bird population of more than {totalSpecies} species.
            </p>
            <p style={{ marginTop: "12px" }}>
              Whether you're setting up a backyard feeder in {city.name} or planning a birding trip to {city.birdingSpots[0]?.name ?? state.topBirdingSpots[0]?.name},
              this guide covers the most commonly seen species and practical tips for attracting and identifying birds in {city.name}, {state.name}.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
