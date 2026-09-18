import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { EditorialBody, EditorialHero, EditorialIntro, JsonLd, editorialJsonLd, editorialMetadata } from "../../components/Editorial";
import { getBirdBySlug, getBirdStaticParams, isBirdIndexEligible, type BirdPageData } from "../../../lib/bird-repository";
import { birdEditorial } from "../../../data/editorial/birds";
import { getStateOccurrences, classifyPresence, PRESENCE_LABEL, activeMonths } from "../../../lib/occurrence-data";
import { US_STATES_DATA } from "../../../data/us-states-data";

const DATA_STATES = ["florida", "arizona", "california", "colorado", "oregon", "tennessee", "texas", "michigan", "rhode-island"];

export function generateStaticParams() { return getBirdStaticParams(); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const editorial = birdEditorial[slug];
  if (editorial) return editorialMetadata(editorial);
  const bird = await getBirdBySlug(slug);
  return bird
    ? { title: `${bird.commonName}: Identification, Habitat & Diet`, description: `Learn the taxonomy, identification approach, habitat, diet, and regional status of ${bird.commonName} (${bird.scientificName}).`, alternates: { canonical: `/birds/${bird.slug}` }, robots: isBirdIndexEligible(bird) ? { index: true, follow: true } : { index: false, follow: true } }
    : {};
}

/** Where the species is reported across the nine states with eBird data on this site. */
function stateRows(slug: string) {
  return DATA_STATES.map((st) => {
    const d = getStateOccurrences(st);
    const b = d?.birds.find((x) => x.slug === slug);
    if (!d || !b) return null;
    const c = classifyPresence(b, d.totalRecords);
    return { state: st, name: US_STATES_DATA.find((s) => s.slug === st)?.name ?? st, total: b.total, rank: b.reportRank, presence: c.presence, abundance: c.abundance, months: activeMonths(b) };
  }).filter((r): r is NonNullable<typeof r> => r !== null).sort((a, b) => b.total - a.total);
}

function StateData({ bird }: { bird: BirdPageData }) {
  const rows = stateRows(bird.slug);
  if (rows.length === 0) return null;
  const present = rows.filter((r) => r.presence !== "absent" && r.abundance !== "rare");
  const absent = rows.filter((r) => r.presence === "absent" || r.abundance === "rare");
  const top = present[0];
  return (
    <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
      <div className="loc-section-header">
        <h2>{bird.commonName} by state: eBird records</h2>
      </div>
      <div className="prose">
        <p>
          {top
            ? `Across the nine states with eBird occurrence data on this site (records from 2020–2024), the ${bird.commonName} is reported most often in ${top.name}${top.rank ? `, where it ranks #${top.rank} among all species` : ""} with ${top.total.toLocaleString("en-US")} records.`
            : `The ${bird.commonName} is not regularly recorded in any of the nine states with eBird data on this site.`}
          {absent.length > 0 && ` It is rare or absent in ${absent.map((r) => r.name).join(", ")}.`}
        </p>
        <div className="loc-bird-grid">
          {present.map((r) => (
            <Link key={r.state} href={`/birds-by-location/${r.state}/${bird.slug}`} className="loc-bird-card" style={{ textDecoration: "none" }}>
              <span className="loc-bird-name">{r.name}</span>
              <span className="loc-bird-status">{PRESENCE_LABEL[r.presence]}</span>
              <span className="loc-bird-meta">{r.total.toLocaleString("en-US")} records{r.rank ? ` · #${r.rank} in state` : ""}</span>
              {r.presence !== "resident" && r.months.length > 0 && <span className="loc-bird-meta">Active {r.months[0]}–{r.months[r.months.length - 1]}</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function BirdPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bird = await getBirdBySlug(slug);
  if (!bird) notFound();
  const isReviewed = isBirdIndexEligible(bird);
  const editorial = birdEditorial[slug];
  // Only facts we actually know; unknown attributes are omitted rather than shown as placeholders.
  const facts = ([["Size", bird.size], ["Colors", bird.colors], ["Useful feeder foods", bird.diet], ["Habitat", bird.habitat]] as const).filter(([, value]) => Boolean(value));

  if (editorial) {
    const blocks = editorialJsonLd(editorial, [{ name: "Birds", path: "/birds" }, { name: bird.commonName, path: `/birds/${bird.slug}` }]);
    return (
      <div className="site-shell">
        <Header />
        <main>
          <JsonLd blocks={blocks} />
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/birds">Birds</Link> / {bird.commonName}</div>
          <section className="location-hero">
            <p className="eyebrow" style={{ marginBottom: "12px" }}><span /> {bird.family} · reviewed profile</p>
            <h1>{editorial.h1 ?? bird.commonName}</h1>
            <p className="scientific">{bird.scientificName}</p>
            <EditorialIntro content={editorial} />
            <EditorialHero content={editorial} />
            {facts.length > 0 && (
              <div className="location-stats">
                {facts.map(([label, value]) => (
                  <div key={label} className="location-stat"><strong style={{ fontSize: "16px" }}>{value}</strong><span>{label}</span></div>
                ))}
              </div>
            )}
          </section>
          <EditorialBody content={editorial}>
            <StateData bird={bird} />
            <section className="loc-section">
              <div className="loc-section-header"><h2>Attracting them to your yard</h2></div>
              <div className="content-grid">
                <section className="info-block"><p className="eyebrow"><span /> Serve · best foods</p><ul className="chip-list">{bird.foods.map((x) => <li key={x}>{x}</li>)}</ul></section>
                <section className="info-block"><p className="eyebrow"><span /> Plant · useful plants</p><ul className="chip-list">{bird.plants.map((x) => <li key={x}>{x}</li>)}</ul></section>
                <section className="info-block"><p className="eyebrow"><span /> Place · best feeders</p><ul className="chip-list">{bird.feeders.map((x) => <li key={x}>{x}</li>)}</ul></section>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
                <Link href={`/feeders/for/${bird.slug}`} className="header-cta" style={{ display: "inline-block" }}>Feeder guide →</Link>
                <Link href={`/plants/for/${bird.slug}`} className="region-pill" style={{ display: "inline-block" }}>Plant guide →</Link>
                <Link href={`/how-to-attract/${bird.slug}`} className="region-pill" style={{ display: "inline-block" }}>Attraction guide →</Link>
              </div>
            </section>
          </EditorialBody>
        </main>
        <Footer />
      </div>
    );
  }

  return <div><Header /><main className="content-main"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/birds">Birds</Link> / {bird.commonName}</div>
    <section className="content-hero"><div><p className="eyebrow"><span /> {isReviewed ? "Reviewed bird profile" : "Bird profile editorial queue"}</p><h1>{bird.commonName}</h1><p className="scientific">{bird.scientificName}</p><p className="lede">{bird.summary}</p></div>{bird.imageUrl ? <figure className="bird-profile-image"><img src={bird.imageUrl} alt={bird.imageAlt ?? bird.commonName} /><figcaption>{bird.imageSourceUrl ? <a href={bird.imageSourceUrl} target="_blank" rel="noreferrer">{bird.imageAttribution}</a> : bird.imageAttribution}{bird.imageLicenseUrl && <> · <a href={bird.imageLicenseUrl} target="_blank" rel="noreferrer">License</a></>}</figcaption></figure> : <aside className="fact-panel">{facts.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</aside>}</section>
    {bird.imageUrl && facts.length > 0 && <aside className="fact-strip">{facts.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</aside>}
    {isReviewed ? <div className="content-grid"><section className="info-block"><p className="eyebrow"><span /> Serve</p><h2>Best foods</h2><ul className="chip-list">{bird.foods.map((x) => <li key={x}>{x}</li>)}</ul><p>Offer fresh food in small amounts and clean feeding surfaces regularly.</p></section><section className="info-block"><p className="eyebrow"><span /> Plant</p><h2>Useful plants</h2><ul className="chip-list">{bird.plants.map((x) => <li key={x}>{x}</li>)}</ul><p>Confirm regional nativity and growing conditions before planting.</p></section><section className="info-block"><p className="eyebrow"><span /> Place</p><h2>Best feeders</h2><ul className="chip-list">{bird.feeders.map((x) => <li key={x}>{x}</li>)}</ul><p>Provide visibility, nearby escape cover, and an easy cleaning routine.</p></section><section className="info-block"><p className="eyebrow"><span /> Identify</p><h2>Field marks</h2><p>{bird.identification ?? "Identification guidance is under editorial review."}</p></section><section className="info-block"><p className="eyebrow"><span /> Nest</p><h2>Nesting habits</h2><p>{bird.nestType ? `${bird.nestType}${bird.nestLocations?.length ? `; commonly using ${bird.nestLocations.join(", ")}` : ""}.${bird.clutchSize ? ` Typical clutch: ${bird.clutchSize}.` : ""}` : "Nesting information is under review."}</p></section><section className="info-block"><p className="eyebrow"><span /> Season</p><h2>Movement</h2><p>{[bird.residentStatus, bird.migrationPattern && `Migration pattern: ${bird.migrationPattern}`].filter(Boolean).map((x) => `${x}.`).join(" ") || "Seasonal movement information is under review."}</p></section><section className="info-block wide"><h2>Plan responsibly for {bird.commonName}</h2><p>Use this profile as a starting point, then confirm local range, seasonality, and species-specific feeding guidance before changing your yard.</p>{bird.sourceUrl && <p><a href={bird.sourceUrl} target="_blank" rel="noreferrer">View the AOS taxonomy record ↗</a></p>}<Link className="button button-primary" href="/#planner">Create my local plan <span>→</span></Link></section></div> : null}
  </main><Footer /></div>;
}
