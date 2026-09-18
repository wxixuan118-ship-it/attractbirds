import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { BirdProfileLink } from "../../components/BirdProfileLink";
import { STATE_BY_SLUG } from "../../../data/us-states-data";
import { SITE } from "../../../lib/url-registry";
import { getGroupPageData, type GroupPageData, type GroupSpecies } from "../../../lib/group-data";
import { getStateOccurrences, classifyPresence, PRESENCE_LABEL } from "../../../lib/occurrence-data";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const list = (items: string[]) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
const num = (n: number) => n.toLocaleString("en-US");
const millions = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)} million` : num(n));

export function groupMetadata(stateSlug: string, groupSlug: string): Metadata | undefined {
  const data = getGroupPageData(stateSlug, groupSlug);
  if (!data) return undefined;
  const G = cap(data.group.name);
  const top = data.species[0];
  if (!top) {
    const title = `Are There ${G} in ${data.stateName}? What eBird Records Show`;
    const description = `${G} in ${data.stateName}: no species is regularly recorded — ${millions(data.totalRecords)} eBird records from ${data.yearsLabel} say so. Where the nearest ${data.group.name} actually are, and what to watch for.`;
    return { title: { absolute: title }, description: description.length > 160 ? description.slice(0, 157) + "…" : description, alternates: { canonical: `/birds-by-location/${stateSlug}/${groupSlug}` }, robots: { index: true, follow: true }, openGraph: { title, description, type: "article" } };
  }
  const title = `${G} in ${data.stateName}: Species & When to See Them`;
  let description = `${G} in ${data.stateName}: all ${data.species.length} species with regular eBird records, led by the ${top.commonName}, with seasonal status, arrival months, and backyard tips.`;
  if (description.length > 160) description = `${G} in ${data.stateName}: ${data.species.length} species ranked by eBird records, led by the ${top.commonName}, with seasons and backyard tips.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/birds-by-location/${stateSlug}/${groupSlug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      ...(data.image ? { images: [{ url: data.image.src, width: data.image.width, height: data.image.height }] } : {}),
    },
  };
}

function seasonSentence(s: GroupSpecies): string {
  switch (s.presence) {
    case "resident":
      return `a year-round resident, reported in every month`;
    case "breeding":
      return `a summer visitor, present mainly from ${s.arrives ?? s.activeMonths[0]} to ${s.departs ?? s.activeMonths[s.activeMonths.length - 1]} and peaking in ${s.peakMonth}`;
    case "winter":
      return `a winter visitor, present mainly from ${s.arrives ?? s.activeMonths[0]} to ${s.departs ?? s.activeMonths[s.activeMonths.length - 1]} and peaking in ${s.peakMonth}`;
    default:
      return `a passage migrant, reported mainly in ${list(s.activeMonths.slice(0, 4))} with a peak in ${s.peakMonth}`;
  }
}

function SpeciesCard({ s }: { s: GroupSpecies }) {
  const body = (
    <>
      <div className="loc-bird-initials">{s.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2)}</div>
      <span className="loc-bird-name">{s.commonName}</span>
      <span className="loc-bird-sci">{s.scientificName}</span>
      <span className="loc-bird-status">{s.statusLabel}</span>
      <span className="loc-bird-meta">{num(s.total)} eBird records · {s.sharePct}% of state records</span>
    </>
  );
  if (!s.href) return <div className="loc-bird-card loc-bird-card-static">{body}</div>;
  return (
    <BirdProfileLink href={s.href} className="loc-bird-card" birdName={s.commonName}>
      {body}
    </BirdProfileLink>
  );
}

export function GroupView({ data }: { data: GroupPageData }) {
  if (data.species.length === 0) return <AbsentGroupView data={data} />;
  return <PresentGroupView data={data} />;
}

/** "{Group} in {State}" when eBird shows no regularly occurring species: answer the question honestly with the numbers. */
function AbsentGroupView({ data }: { data: GroupPageData }) {
  const { group, stateName, state } = data;
  const G = cap(group.name);
  const Kw = `${G} in ${stateName}`;
  const stateData = STATE_BY_SLUG[state];
  const pageUrl = `${SITE.origin}/birds-by-location/${state}/${group.slug}`;
  const vagrantTotal = data.vagrants.reduce((n, v) => n + v.total, 0);
  const nearest = data.otherStates.slice(0, 8);
  const occ = getStateOccurrences(state);
  const stateTop = (occ?.birds ?? []).filter((b) => b.reportRank !== null && b.slug).sort((a, b) => (a.reportRank ?? 0) - (b.reportRank ?? 0)).slice(0, 6)
    .map((b) => ({ slug: b.slug as string, commonName: b.commonName, scientificName: b.scientificName, total: b.total, rank: b.reportRank as number, status: PRESENCE_LABEL[classifyPresence(b, occ?.totalRecords ?? 1).presence], href: b.whitelisted ? `/birds-by-location/${state}/${b.slug}` : `/birds/${b.slug}` }));
  const image = data.image;
  const faq = [
    {
      q: `Are there ${group.name} in ${stateName}?`,
      a: data.vagrants.length === 0
        ? `Not as regular birds. Across ${millions(data.totalRecords)} eBird records from the state in ${data.yearsLabel}, no ${group.singular} species was reported at all.`
        : `Not as regular birds. Across ${millions(data.totalRecords)} eBird records from the state in ${data.yearsLabel}, the group accounts for only ${num(vagrantTotal)} — ${list(data.vagrants.map((v) => `${v.commonName} (${num(v.total)})`))} — far below the ${data.minRecords}-record threshold this site uses for a regularly occurring species.`,
    },
    {
      q: `Where are the nearest ${group.name}?`,
      a: nearest.length ? `Among the states covered here, ${list(nearest.slice(0, 4).map((s) => `${s.name} (${s.count} species${s.top ? `, led by the ${s.top.commonName}` : ""})`))}.` : `None of the other states covered here has regular ${group.name} either.`,
    },
    {
      q: `Could I still see a ${group.singular} in ${stateName}?`,
      a: data.vagrants.length ? `Occasionally. The ${data.vagrants[0].commonName} has ${num(data.vagrants[0].total)} state records in five years, so individual birds do turn up — but they are rare enough that a sighting is worth reporting to eBird with a photo.` : `It would be exceptional; any sighting should be documented with a photo and reported to eBird.`,
    },
  ];
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "Birds by Location", item: `${SITE.origin}/birds-by-location` },
      { "@type": "ListItem", position: 3, name: `Birds in ${stateName}`, item: `${SITE.origin}/birds-by-location/${state}` },
      { "@type": "ListItem", position: 4, name: Kw, item: pageUrl },
    ] },
    { "@context": "https://schema.org", "@type": "Article", headline: `Are There ${Kw}?`, mainEntityOfPage: pageUrl, ...(image ? { image: `${SITE.origin}${image.src}` } : {}), author: { "@type": "Organization", name: SITE.brand, url: SITE.origin }, publisher: { "@type": "Organization", name: SITE.brand, url: SITE.origin }, dateModified: data.retrievedAt, citation: [{ "@type": "Dataset", name: data.source.name, creator: data.source.publisher, url: data.source.url, license: data.source.licenseUrl }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return (
    <div className="site-shell">
      <Header />
      <main>
        {jsonLd.map((block, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
        ))}
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/birds-by-location">Birds by Location</Link> /{" "}
          <Link href={`/birds-by-location/${state}`}>{stateName}</Link> / {G}
        </div>
        <section className="location-hero">
          <p className="eyebrow" style={{ marginBottom: "12px" }}><span /> {stateData?.region} · {stateData?.flyway} Flyway</p>
          <h1>Are there <em>{group.name}</em> in {stateName}?</h1>
          <p className="lede">
            Not as regular birds. {G} in {stateName} are missing from the everyday birdlife: across {millions(data.totalRecords)} eBird records submitted in {data.yearsLabel},{" "}
            {data.vagrants.length === 0
              ? `no ${group.singular} species was reported at all.`
              : `${group.name} account for just ${num(vagrantTotal)} — ${list(data.vagrants.map((v) => `${v.commonName} (${num(v.total)})`))} — well below the ${data.minRecords}-record line this site uses to call a species regular.`}
          </p>
          <p className="lede">{group.intro}</p>
          {image && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={`${image.species} — the ${group.singular} most likely to wander into ${stateName}, though ${group.name} in ${stateName} are not regular`} width={image.width} height={image.height} fetchPriority="high" decoding="async" />
              <figcaption>
                {image.species}. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
          <div className="location-stats">
            <div className="location-stat"><strong>0</strong><span>Species regularly recorded</span></div>
            <div className="location-stat"><strong>{num(vagrantTotal)}</strong><span>{G.toLowerCase()} records in {data.yearsLabel}</span></div>
            <div className="location-stat"><strong>{millions(data.totalRecords)}</strong><span>All {stateName} eBird records</span></div>
            <div className="location-stat"><strong>{nearest.length}</strong><span>Covered states with regular {group.name}</span></div>
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>{Kw}: what the eBird records show</h2></div>
          <div className="prose">
            <p>
              This site treats a species as regularly occurring in a state when it has at least {data.minRecords} eBird records over {data.yearsLabel} and is reported at a steady rate through at least part of the year.
              No {group.singular} clears that bar in {stateName}.{" "}
              {data.vagrants.length > 0 && `The ${list(data.vagrants.map((v) => v.commonName))} ${data.vagrants.length === 1 ? "has" : "have"} been reported, but at ${data.vagrants.length === 1 ? `${num(data.vagrants[0].total)} records` : `a combined ${num(vagrantTotal)} records`} in five years these are isolated reports — stray individuals or, for species native to other continents, escaped cage birds — not a population.`}
            </p>
            <p>
              For comparison, {stateTop[0] ? `the most-reported bird in the state, the ${stateTop[0].commonName}, has ${num(stateTop[0].total)} records over the same period` : "the most-reported birds in the state have tens or hundreds of thousands of records over the same period"}, and even scarce residents typically pass {num(data.minRecords)} within a few months. A group that stays in the tens or single digits over five years is, for practical purposes, absent.
            </p>
            <p>{group.backyard}</p>
          </div>
        </section>

        {stateTop.length > 0 && (
          <section className="loc-section">
            <div className="loc-section-header">
              <h2>{stateName} birds you will see instead of {group.name}</h2>
              <p>The species that dominate {stateName} eBird records over the same {data.yearsLabel} period, for a sense of scale.</p>
            </div>
            <div className="loc-bird-grid">
              {stateTop.map((b) => (
                <BirdProfileLink key={b.slug} href={b.href} className="loc-bird-card" birdName={b.commonName}>
                  <div className="loc-bird-initials">{b.commonName.split(/\s+/).map((x) => x[0]).join("").slice(0, 2)}</div>
                  <span className="loc-bird-name">{b.commonName}</span>
                  <span className="loc-bird-sci">{b.scientificName}</span>
                  <span className="loc-bird-status">{b.status}</span>
                  <span className="loc-bird-meta">#{b.rank} · {num(b.total)} eBird records</span>
                </BirdProfileLink>
              ))}
            </div>
            <div className="prose" style={{ marginTop: "20px" }}>
              <p>
                Put side by side, the gap is the whole story: the {stateTop[0].commonName} alone has {num(stateTop[0].total)} {stateName} records in {data.yearsLabel}, against {num(vagrantTotal)} for every {group.singular} species combined.
              </p>
            </div>
          </section>
        )}

        {nearest.length > 0 && (
          <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
            <div className="loc-section-header"><h2>{G} near {stateName}: the nearest states</h2></div>
            <div className="prose">
              <p>Among the states covered on this site, these have regular {group.name}, most species first:</p>
              {nearest.map((s) => (
                <p key={s.slug}>
                  <strong><Link href={`/birds-by-location/${s.slug}/${group.slug}`}>{G} in {s.name}</Link></strong> — {s.count} regularly recorded species{s.top ? `, led by the ${s.top.commonName} with ${num(s.top.total)} eBird records` : ""}.
                </p>
              ))}
            </div>
          </section>
        )}

        <section className="loc-section loc-prose" style={{ background: "var(--card)" }}>
          <div className="loc-section-header"><h2>{Kw}: FAQ</h2></div>
          <div className="prose">
            {faq.map((f) => (
              <div key={f.q} className="faq-item"><h3>{f.q}</h3><p>{f.a}</p></div>
            ))}
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-section-header"><h3>More {stateName} birds</h3></div>
          <div className="city-pills">
            <Link href={`/birds-by-location/${state}`} className="city-pill" style={{ textDecoration: "none" }}>All birds in {stateName}</Link>
            {data.otherGroups.map((g) => (
              <Link key={g.slug} href={`/birds-by-location/${state}/${g.slug}`} className="city-pill" style={{ textDecoration: "none" }}>{cap(g.name)} in {stateName} ({g.count})</Link>
            ))}
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ paddingBottom: "64px" }}>
          <div className="loc-section-header"><h2>{Kw}: sources</h2></div>
          <div className="prose">
            <p>
              Every number on this page comes from the <a href={data.source.url} rel="noopener noreferrer" target="_blank">{data.source.name}</a> published by the{" "}
              <a href="https://www.birds.cornell.edu/" rel="noopener noreferrer" target="_blank">{data.source.publisher}</a> and distributed through GBIF under a{" "}
              <a href={data.source.licenseUrl} rel="noopener noreferrer" target="_blank">{data.source.license}</a> license: {stateName} records from {data.yearsLabel}, retrieved {data.retrievedAt}, for the families {list(group.families)}.
              &ldquo;Records&rdquo; are individual eBird observations and reflect how often birders report a species, not a population count.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PresentGroupView({ data }: { data: GroupPageData }) {
  const { group, stateName, species, state } = data;
  const G = cap(group.name);
  const kw = `${group.name} in ${stateName}`;
  const Kw = `${G} in ${stateName}`;
  const stateData = STATE_BY_SLUG[state];
  const pageUrl = `${SITE.origin}/birds-by-location/${state}/${group.slug}`;
  const top = species[0];
  const second = species[1];
  const residents = data.residents;
  const seasonal = data.seasonal;
  const summer = seasonal.filter((s) => s.presence === "breeding");
  const winter = seasonal.filter((s) => s.presence === "winter");
  const migrants = seasonal.filter((s) => s.presence === "migrant");
  const groupSharePct = (100 * data.totalGroupRecords / data.totalRecords).toFixed(1);

  const faq: { q: string; a: string }[] = [
    {
      q: `How many species of ${group.name} are there in ${stateName}?`,
      a: `${species.length} species of ${group.name} have regular eBird records in ${stateName} (at least ${data.minRecords} records in ${data.yearsLabel}): ${list(species.map((s) => s.commonName))}.`,
    },
    {
      q: `What is the most common ${group.singular} in ${stateName}?`,
      a: `The ${top.commonName}, with ${num(top.total)} eBird records in ${data.yearsLabel}${second ? `, followed by the ${second.commonName} with ${num(second.total)}` : ""}. It is ${seasonSentence(top)}.`,
    },
    {
      q: `When is the best time to see ${group.name} in ${stateName}?`,
      a: residents.length === species.length
        ? `Any time of year — every ${group.singular} regularly recorded in ${stateName} is a year-round resident. Their combined share of eBird records is highest in ${list(data.bestMonths)}.`
        : `${list(data.bestMonths)}, when the combined share of ${stateName} eBird records belonging to ${group.name} is highest. ${summer.length ? `Summer visitors such as the ${summer[0].commonName} arrive around ${summer[0].arrives ?? summer[0].activeMonths[0]}. ` : ""}${winter.length ? `Winter visitors such as the ${winter[0].commonName} arrive around ${winter[0].arrives ?? winter[0].activeMonths[0]}.` : ""}`.trim(),
    },
  ];
  if (group.slug === "magpies" || group.slug === "eagles" || species.length <= 3) {
    faq.push({
      q: `Are there ${group.name} in ${stateName}?`,
      a: `Yes. ${list(species.map((s) => `the ${s.commonName} (${num(s.total)} eBird records, ${s.statusLabel.toLowerCase()})`))} ${species.length === 1 ? "is" : "are"} regularly recorded in ${stateName}.`,
    });
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
        { "@type": "ListItem", position: 2, name: "Birds by Location", item: `${SITE.origin}/birds-by-location` },
        { "@type": "ListItem", position: 3, name: `Birds in ${stateName}`, item: `${SITE.origin}/birds-by-location/${state}` },
        { "@type": "ListItem", position: 4, name: Kw, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: Kw,
      description: `${G} recorded in ${stateName}, ranked by eBird records ${data.yearsLabel}.`,
      numberOfItems: species.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: species.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.commonName, ...(s.href ? { url: `${SITE.origin}${s.href}` } : {}) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${Kw}: Species & When to See Them`,
      mainEntityOfPage: pageUrl,
      ...(data.image ? { image: `${SITE.origin}${data.image.src}` } : {}),
      author: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
      publisher: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
      dateModified: data.retrievedAt,
      citation: [{ "@type": "Dataset", name: data.source.name, creator: data.source.publisher, url: data.source.url, license: data.source.licenseUrl }],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <div className="site-shell">
      <Header />
      <main>
        {jsonLd.map((block, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
        ))}

        <div className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/birds-by-location">Birds by Location</Link> /{" "}
          <Link href={`/birds-by-location/${state}`}>{stateName}</Link> / {G}
        </div>

        <section className="location-hero">
          <p className="eyebrow" style={{ marginBottom: "12px" }}>
            <span /> {stateData?.region} · {stateData?.flyway} Flyway
          </p>
          <h1>
            {G} in <em>{stateName}</em>
          </h1>
          <p className="lede">
            {Kw} come down to {species.length} species with regular eBird records, led by the {top.commonName}. Together they account for{" "}
            {num(data.totalGroupRecords)} of the {millions(data.totalRecords)} eBird records from {data.yearsLabel} — {groupSharePct}% of everything reported in the state.
          </p>
          <p className="lede">
            The full list: {list(species.map((s) => s.commonName))}. {group.intro}
          </p>
          {data.image && (
            <figure className="state-hero-figure">
              {/* Static, licensed image committed to the repo. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.image.src}
                alt={`${data.image.species}, the most-reported of the ${group.name} in ${stateName} on eBird`}
                width={data.image.width}
                height={data.image.height}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                {data.image.species}, the most-reported {group.singular} in {stateName}. Photo:{" "}
                <a href={data.image.creditUrl} rel="noopener noreferrer" target="_blank">{data.image.credit}</a>,{" "}
                <a href={data.image.licenseUrl} rel="noopener noreferrer license" target="_blank">{data.image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
          <div className="location-stats">
            <div className="location-stat"><strong>{species.length}</strong><span>Species regularly recorded</span></div>
            <div className="location-stat"><strong>{residents.length}</strong><span>Year-round residents</span></div>
            <div className="location-stat"><strong>{seasonal.length}</strong><span>Seasonal visitors</span></div>
            <div className="location-stat"><strong>{num(data.totalGroupRecords)}</strong><span>eBird records analysed</span></div>
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-section-header">
            <h2>{Kw}: every species, most-reported first</h2>
            <p>
              Every {group.singular} with at least {data.minRecords} eBird records in the state from {data.yearsLabel}, most-reported first. The status label is
              derived from each species&rsquo; own monthly share of all state records.
            </p>
          </div>
          <div className="loc-bird-grid">
            {species.map((s) => (
              <SpeciesCard key={s.commonName} s={s} />
            ))}
          </div>
          <div className="prose" style={{ marginTop: "28px" }}>
            {species.slice(0, 12).map((s, i) => (
              <p key={s.commonName}>
                <strong>{i + 1}. {s.commonName}</strong> ({s.scientificName}) — {num(s.total)} records, {s.sharePct}% of the state&rsquo;s eBird total; {seasonSentence(s)}.
              </p>
            ))}
            {species.length > 12 && (
              <p>
                The remaining {species.length - 12} species — {list(species.slice(12).map((s) => s.commonName))} — are recorded regularly but in smaller numbers; see the cards above for their status.
              </p>
            )}
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
          <div className="loc-section-header">
            <h2>When to see {kw}</h2>
          </div>
          <div className="prose">
            <p>
              Adding up every species&rsquo; share of state eBird records month by month, {group.name} are most prominent in {list(data.bestMonths)} and least in{" "}
              {list(data.quietMonths)}.{" "}
              {residents.length > 0 && `${residents.length === species.length ? "All" : residents.length} of the ${species.length} species ${residents.length === 1 ? "is" : "are"} year-round — ${list(residents.slice(0, 6).map((s) => s.commonName))}${residents.length > 6 ? ` and ${residents.length - 6} more` : ""} — so there is no month without them.`}
              {residents.length === 0 && `None of the ${species.length} species is a year-round resident, so the timing below is everything.`}
            </p>
            {summer.length > 0 && (
              <p>
                <strong>Summer visitors.</strong>{" "}
                {summer.slice(0, 6).map((s) => `${s.commonName} arrives around ${s.arrives ?? s.activeMonths[0]} and is mostly gone after ${s.departs ?? s.activeMonths[s.activeMonths.length - 1]} (peak ${s.peakMonth})`).join("; ")}.
              </p>
            )}
            {winter.length > 0 && (
              <p>
                <strong>Winter visitors.</strong>{" "}
                {winter.slice(0, 6).map((s) => `${s.commonName} arrives around ${s.arrives ?? s.activeMonths[0]} and leaves after ${s.departs ?? s.activeMonths[s.activeMonths.length - 1]} (peak ${s.peakMonth})`).join("; ")}.
              </p>
            )}
            {migrants.length > 0 && (
              <p>
                <strong>Passage migrants.</strong>{" "}
                {migrants.slice(0, 6).map((s) => `${s.commonName} is reported mainly in ${list(s.activeMonths.slice(0, 4))}`).join("; ")}.
              </p>
            )}
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header">
            <h2>Attracting {group.name} to {stateName} backyards</h2>
          </div>
          <div className="prose">
            <p>{group.backyard}</p>
            <p>
              In {stateName} the {group.singular} most likely to turn up is the {top.commonName}
              {residents.length > 1 && residents[0].commonName === top.commonName ? `, a year-round resident, followed by the ${residents[1].commonName}` : ""}.
              {top.href && top.href.startsWith("/birds-by-location") ? " Its own page covers month-by-month activity and attraction tips for this state." : ""}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
              <Link href={`/birds-by-location/${state}`} className="header-cta" style={{ display: "inline-block" }}>All birds in {stateName} →</Link>
              <Link href="/feeders" className="region-pill" style={{ display: "inline-block" }}>Feeder guides →</Link>
              <Link href={`/plants/${state}/native-plants`} className="region-pill" style={{ display: "inline-block" }}>{stateName} native plants →</Link>
            </div>
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ background: "var(--card)" }}>
          <div className="loc-section-header">
            <h2>{Kw}: FAQ</h2>
          </div>
          <div className="prose">
            {faq.map((f) => (
              <div key={f.q} className="faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-section-header">
            <h3>More birds in {stateName}</h3>
          </div>
          <div className="city-pills">
            {data.otherGroups.map((g) => (
              <Link key={g.slug} href={`/birds-by-location/${state}/${g.slug}`} className="city-pill" style={{ textDecoration: "none" }}>
                {cap(g.name)} in {stateName} ({g.count})
              </Link>
            ))}
          </div>
          <div className="loc-section-header" style={{ marginTop: "24px" }}>
            <h3>{G} in other states</h3>
          </div>
          <div className="city-pills">
            {data.otherStates.map((s) => (
              <Link key={s.slug} href={`/birds-by-location/${s.slug}/${group.slug}`} className="city-pill" style={{ textDecoration: "none" }}>
                {G} in {s.name} ({s.count})
              </Link>
            ))}
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ paddingBottom: "64px" }}>
          <div className="loc-section-header">
            <h2>{Kw}: sources</h2>
          </div>
          <div className="prose">
            <p>
              Every number on this page comes from the{" "}
              <a href={data.source.url} rel="noopener noreferrer" target="_blank">{data.source.name}</a> published by the{" "}
              <a href="https://www.birds.cornell.edu/" rel="noopener noreferrer" target="_blank">{data.source.publisher}</a> and distributed through GBIF under a{" "}
              <a href={data.source.licenseUrl} rel="noopener noreferrer" target="_blank">{data.source.license}</a> license: {stateName} records from {data.yearsLabel}, retrieved {data.retrievedAt}.
              Species are drawn from the families {list(group.families)}; only species with at least {data.minRecords} records are listed, and a species is called a year-round resident when its monthly share of state records stays above 30% of its own peak in ten or more months.
              &ldquo;Records&rdquo; are individual eBird observations, so they reflect how often birders report a species, not a population count.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
