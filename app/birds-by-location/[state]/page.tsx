import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { BirdProfileLink } from "../../components/BirdProfileLink";
import { US_STATES_DATA, MONTHS } from "../../../data/us-states-data";
import { getStateContent, type StateContent } from "../../../data/state-content";
import { getStateStaticParams, getStatePageData, type StateBirdEntry } from "../../../lib/location-repository";
import { busiestMonths, occurrenceAttribution } from "../../../lib/occurrence-data";
import { SITE } from "../../../lib/url-registry";
import groupImages from "../../../data/group-images.json";

type BirdImage = { species: string; src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const GROUP_IMAGES = groupImages as Record<string, BirdImage>;

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

  const content = getStateContent(state);
  // Titles are kept under 60 characters, so they skip the site-wide " | AttractBirds.app" suffix.
  // Long state names (e.g. "North Carolina") push the default phrasing past 60 — drop "Common" to fit.
  const longFormTitle = `Birds in ${stateData.name}: Common Backyard Birds & Birding Guide`;
  const fallbackTitle = longFormTitle.length <= 60 ? longFormTitle : `Birds in ${stateData.name}: Backyard Birds & Birding Guide`;
  const title = content?.title ?? fallbackTitle;
  const description =
    content?.description ??
    `Birds in ${stateData.name}: ${stateData.speciesCount}+ species, the common backyard birds, a month-by-month calendar, and the best birding spots near ${stateData.popularCities[0]}.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/birds-by-location/${stateData.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      ...(content ? { images: [{ url: content.hero.src, width: content.hero.width, height: content.hero.height, alt: content.hero.alt }] } : {}),
    },
  };
}

const MONTH_NOTE_LABELS = {
  arrives: "arriving",
  departs: "departing",
  peak: "in season",
  "year-round": "year-round",
} as const;

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

/** Render "[n]" citation markers inside editorial copy as links straight to the cited source. */
function Cited({ text, sources }: { text: string; sources: StateContent["sources"] }): ReactNode {
  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[(\d+)\]$/);
    if (!m) return part;
    const source = sources.find((s) => s.id === Number(m[1]));
    if (!source) return null;
    return (
      <sup key={i} className="cite">
        <a href={source.url} rel="noopener noreferrer" target="_blank" title={source.label} aria-label={`Source ${m[1]}: ${source.label}`}>{m[1]}</a>
      </sup>
    );
  });
}

function BirdCard({ bird, stateSlug, meta }: { bird: StateBirdEntry; stateSlug: string; meta?: ReactNode }) {
  const href = bird.href === undefined ? `/birds-by-location/${stateSlug}/${bird.slug}` : bird.href;
  const body = (
    <>
      <div className="loc-bird-initials">{bird.initials}</div>
      <span className="loc-bird-name">{bird.commonName}</span>
      <span className="loc-bird-sci">{bird.scientificName}</span>
      {bird.seasonalStatus && <span className="loc-bird-status">{bird.seasonalStatus}</span>}
      {meta ?? (bird.family && <span className="loc-bird-meta">{bird.family}</span>)}
    </>
  );
  if (!href) return <div className="loc-bird-card loc-bird-card-static">{body}</div>;
  return (
    <BirdProfileLink href={href} className="loc-bird-card" birdName={bird.commonName}>
      {body}
    </BirdProfileLink>
  );
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const data = await getStatePageData(stateSlug);
  if (!data) notFound();

  const { state, commonBirds, backyardBirds, totalSpecies, monthlyHighlights, occurrences } = data;
  const content = getStateContent(stateSlug);
  const pageUrl = `${SITE.origin}/birds-by-location/${state.slug}`;
  const spots = content?.spots ?? state.topBirdingSpots.map((s) => ({ ...s, url: undefined }));
  const speciesLine = content ? undefined : `${totalSpecies}+`;

  // Template states (no researched `content`) borrow a licensed species photo already
  // used on that bird's own profile page, so the hero always has a real, credited image.
  const fallbackHeroBird = !content ? [...backyardBirds, ...commonBirds].find((b) => GROUP_IMAGES[b.slug]) : undefined;
  const fallbackHeroImage = fallbackHeroBird ? GROUP_IMAGES[fallbackHeroBird.slug] : undefined;
  const busiestFallbackMonths = !content
    ? [...monthlyHighlights].sort((a, b) => b.birds.length - a.birds.length).slice(0, 3).map((h) => h.month)
    : [];

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
        { "@type": "ListItem", position: 2, name: "Birds by Location", item: `${SITE.origin}/birds-by-location` },
        { "@type": "ListItem", position: 3, name: `Birds in ${state.name}`, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Common birds in ${state.name}`,
      description: occurrences
        ? `The most-reported bird species in ${state.name}, ranked by eBird records ${occurrences.years.replace(",", "–")}.`
        : `Common bird species in ${state.name}.`,
      numberOfItems: commonBirds.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: commonBirds.map((bird, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: bird.commonName,
        ...(bird.href ? { url: `${SITE.origin}${bird.href}` } : bird.href === undefined ? { url: `${SITE.origin}/birds-by-location/${state.slug}/${bird.slug}` } : {}),
      })),
    },
  ];
  if (content) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.title,
      description: content.description,
      image: `${SITE.origin}${content.hero.src}`,
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
      publisher: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
      ...(occurrences ? { dateModified: occurrences.retrievedAt } : {}),
      citation: content.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer.replace(/\s*\[\d+\]/g, "") },
      })),
    });
  }

  return (
    <div className="site-shell">
      <Header />
      <main>
        {jsonLd.map((block, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
        ))}

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
          {content ? (
            content.intro.map((paragraph, i) => (
              <p key={i} className="lede">
                <Cited text={paragraph} sources={content.sources} />
              </p>
            ))
          ) : (
            <p className="lede">
              Birds in {state.name}: {state.summary} This guide lists the common backyard birds, a month-by-month
              calendar, and the best places to go bird watching in {state.name}.
            </p>
          )}
          {content && (
            <figure className="state-hero-figure">
              {/* Static, licensed image committed to the repo; no optimizer proxy needed. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.hero.src}
                alt={content.hero.alt}
                width={content.hero.width}
                height={content.hero.height}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                {content.hero.alt}. Photo: <a href={content.hero.creditUrl} rel="noopener noreferrer" target="_blank">{content.hero.credit}</a>,{" "}
                <a href={content.hero.licenseUrl} rel="noopener noreferrer license" target="_blank">{content.hero.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
          {!content && fallbackHeroImage && fallbackHeroBird && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fallbackHeroImage.src}
                alt={`${fallbackHeroBird.commonName}, one of the most common backyard birds in ${state.name}`}
                width={fallbackHeroImage.width}
                height={fallbackHeroImage.height}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                {fallbackHeroBird.commonName} is a common backyard bird in {state.name}. Photo:{" "}
                <a href={fallbackHeroImage.creditUrl} rel="noopener noreferrer" target="_blank">{fallbackHeroImage.credit}</a>,{" "}
                <a href={fallbackHeroImage.licenseUrl} rel="noopener noreferrer license" target="_blank">{fallbackHeroImage.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
          <div className="location-stats">
            <div className="location-stat">
              <strong>{speciesLine ?? totalSpecies}</strong>
              <span>{content ? "Species on the official state list" : "Bird species"}</span>
            </div>
            {occurrences && (
              <div className="location-stat">
                <strong>{(occurrences.totalRecords / 1_000_000).toFixed(0)}M</strong>
                <span>eBird records analysed</span>
              </div>
            )}
            <div className="location-stat">
              <strong>{state.habitats.length}</strong>
              <span>Habitat types</span>
            </div>
            <div className="location-stat">
              <strong>{spots.length}</strong>
              <span>Birding hotspots</span>
            </div>
          </div>
          <p className="city-pills-label">
            <strong>Popular cities in {state.name}:</strong>
          </p>
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
                  Birds in {city}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Common Birds */}
        {commonBirds.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              {/* Template states keep this H2 keyword-free — "Backyard Birds in {state}" below already
                  carries the exact phrase, and repeating it here just pushes keyword density too high
                  on the (shorter) template pages. */}
              <h2>{content ? `Common Birds in ${state.name}` : "Common Birds"}</h2>
              <p>
                {occurrences ? (
                  <>
                    The {commonBirds.length} most-reported bird species in {state.name}, ranked by the number of eBird
                    records from {occurrences.years.replace(",", " to ")}. Click any bird for its full profile and
                    attraction tips.
                  </>
                ) : (
                  <>
                    The most frequently reported bird species across {state.name}. Click any bird for full profiles,
                    photos, calls, and attraction tips.
                  </>
                )}
              </p>
            </div>
            <div className="loc-bird-grid">
              {commonBirds.slice(0, 24).map((bird) => (
                <BirdCard
                  key={bird.slug}
                  bird={bird}
                  stateSlug={state.slug}
                  meta={
                    bird.observationCount !== undefined ? (
                      <span className="loc-bird-meta">
                        #{bird.reportRank} · {bird.observationCount.toLocaleString("en-US")} eBird records
                      </span>
                    ) : undefined
                  }
                />
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
                {state.name} backyard birds that regularly visit feeders and gardens. These are the species you&rsquo;re
                most likely to attract with the right food, plants, and habitat setup.
              </p>
            </div>
            <div className="loc-bird-grid">
              {backyardBirds.map((bird) => (
                <BirdCard
                  key={bird.slug}
                  bird={bird}
                  stateSlug={state.slug}
                  meta={bird.habitat ? <span className="loc-bird-meta">{bird.habitat}</span> : undefined}
                />
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

        {/* Editorial sections (researched states only) */}
        {content?.sections
          .filter((section) => !/data and sources$/i.test(section.heading))
          .map((section) => (
            <section key={section.heading} className="loc-section loc-prose">
              <div className="loc-section-header">
                <h2>{section.heading}</h2>
              </div>
              <div className="prose">
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i}>
                    <Cited text={paragraph} sources={content.sources} />
                  </p>
                ))}
                {/^Where to (go|see)/i.test(section.heading) && (
                  <div className="spot-list">
                    {spots.map((spot, i) => (
                      <div key={spot.name} className="spot-card">
                        <div className="spot-number">{i + 1}</div>
                        <div className="spot-info">
                          <p className="spot-name">
                            {spot.url ? (
                              <a href={spot.url} rel="noopener noreferrer" target="_blank">{spot.name}</a>
                            ) : (
                              spot.name
                            )}
                          </p>
                          <p><Cited text={spot.blurb} sources={content.sources} /></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

        {/* Bird Watching Locations (template states) */}
        {!content && (
          <section className="loc-section" style={{ background: "var(--card)" }}>
            <div className="loc-section-header">
              <h2>Where to Go Bird Watching in {state.name}</h2>
              <p>The best places to see birds in {state.name}, from national wildlife refuges to local sanctuaries.</p>
            </div>
            <div className="spot-list">
              {spots.map((spot, i) => (
                <div key={spot.name} className="spot-card">
                  <div className="spot-number">{i + 1}</div>
                  <div className="spot-info">
                    <p className="spot-name">{spot.name}</p>
                    <p>{spot.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Monthly Calendar */}
        {monthlyHighlights.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              <h2>{content ? `Birds in ${state.name} by Month` : `${state.name} Bird Calendar`}</h2>
              <p>
                {occurrences ? (
                  <>
                    Arrivals, departures, and peaks by month, derived from the share of {state.name} eBird records each
                    species accounts for. Birders log the most records in {busiestMonths(occurrences).join(", ")}.
                  </>
                ) : (
                  <>What to expect each month: migration arrivals, departures, and seasonal highlights.</>
                )}
              </p>
            </div>
            <div className="month-calendar">
              {MONTHS.map((month) => {
                const highlight = monthlyHighlights.find((h) => h.month === month);
                return (
                  <div key={month} className="month-card">
                    <div className="month-name">{month}</div>
                    {highlight?.birds.map((bird) => {
                      const label = (
                        <span className="month-bird">
                          {bird.name}
                          {bird.note && <em className="month-bird-note">{MONTH_NOTE_LABELS[bird.note]}</em>}
                        </span>
                      );
                      return bird.slug ? (
                        <Link key={bird.name} href={`/birds-by-location/${state.slug}/${bird.slug}`} style={{ display: "block" }}>
                          {label}
                        </Link>
                      ) : (
                        <div key={bird.name}>{label}</div>
                      );
                    })}
                  </div>
                );
              })}
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

        {/* FAQ (researched states only) */}
        {content && content.faq.length > 0 && (
          <section className="loc-section loc-prose" style={{ background: "var(--card)" }}>
            <div className="loc-section-header">
              <h2>Birds in {state.name}: frequently asked questions</h2>
            </div>
            <div className="prose">
              {content.faq.map((item) => (
                <div key={item.question} className="faq-item">
                  <h3>{item.question}</h3>
                  <p><Cited text={item.answer} sources={content.sources} /></p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cross-links to other states */}
        <section className="loc-section">
          <div className="loc-section-header">
            <h3>Birds in neighboring states</h3>
          </div>
          <div className="state-directory" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {US_STATES_DATA.filter(
              (s) => s.slug !== state.slug && s.region === state.region
            )
              .slice(0, 6)
              .map((s) => (
                <Link key={s.slug} href={`/birds-by-location/${s.slug}`} className="state-card">
                  <span className="state-card-abbr">{s.abbr}</span>
                  <span className="state-card-name">Birds in {s.name}</span>
                  <span className="state-card-count">{s.speciesCount}+ species</span>
                </Link>
              ))}
          </div>
        </section>

        {/* Data & sources */}
        {content ? (
          <section className="loc-section loc-prose" style={{ paddingBottom: "64px" }}>
            <div className="loc-section-header">
              <h2>Birds in {state.name}: data and sources</h2>
            </div>
            <div className="prose">
              {content.sections
                .filter((section) => /data and sources$/i.test(section.heading))
                .flatMap((section) => section.paragraphs)
                .map((paragraph, i) => (
                  <p key={i}><Cited text={paragraph} sources={content.sources} /></p>
                ))}
              {occurrences && <p className="attribution">{occurrenceAttribution(occurrences)}</p>}
              <ol className="source-list">
                {content.sources.map((source) => (
                  <li key={source.id} id={`source-${source.id}`}>
                    <a href={source.url} rel="noopener noreferrer" target="_blank">{source.label}</a>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : (
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
                Whether you&rsquo;re a backyard birder in {state.popularCities[0]} or planning a trip to{" "}
                {spots[0]?.name}, this guide covers the most commonly seen species, seasonal patterns,
                and practical tips for attracting and identifying birds in {state.name}.
              </p>
              <p style={{ marginTop: "16px" }}>
                {state.name}&rsquo;s most reported backyard visitors include{" "}
                {backyardBirds.slice(0, 3).map((b, i, arr) => (
                  <span key={b.slug}>
                    {i > 0 && (i === arr.length - 1 ? ", and " : ", ")}
                    {b.commonName}
                  </span>
                ))}
                . These species readily use sunflower seed, suet, and a reliable water source, and are
                usually the first to find a new feeder. For identification, diet, and nest-box specifics on
                these and other North American species,{" "}
                <a href="https://www.allaboutbirds.org" rel="noopener noreferrer" target="_blank">
                  Cornell Lab of Ornithology&rsquo;s All About Birds
                </a>{" "}
                is a reliable primary source.
              </p>
              <p style={{ marginTop: "16px" }}>
                Sightings are not spread evenly across the year.{" "}
                {busiestFallbackMonths.length > 0 ? (
                  <>
                    {state.name} birders report the widest mix of species in{" "}
                    {busiestFallbackMonths.join(", ")}, when migrants moving along the {state.flyway} Flyway
                    pass through alongside the state&rsquo;s year-round residents.
                  </>
                ) : (
                  <>
                    Migrants moving along the {state.flyway} Flyway pass through alongside the state&rsquo;s
                    year-round residents, so the mix of species shifts with the seasons.
                  </>
                )}{" "}
                {spots[0]?.name}, covered above, is one place in {state.name} where that seasonal traffic is
                easiest to see.
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
