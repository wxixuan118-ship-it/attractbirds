import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { SeasonSpeciesData } from "../../../components/SeasonData";
import { SEASONS, type SeasonSlug } from "../../../../lib/seasonal-repository";
import { pilotBirds } from "../../../../data/pilot-birds";
import { SEASON_NOTES, AAB_SLUG } from "../../../../data/seasonal-bird-notes";
import { getBirdImage } from "../../../../lib/group-data";
import { pluralizeBird } from "../../../../lib/bird-names";
import { SITE } from "../../../../lib/url-registry";

type PilotBird = (typeof pilotBirds)[number];

const lower = (s: string) => s.toLowerCase();
const sentences = (text: string) => text.split(/(?<=\.)\s/);

/** Split a note into an opening of at least ~25 words and the remainder. */
function splitOpening(text: string): [string, string] {
  const parts = sentences(text);
  let n = 1;
  while (n < parts.length && parts.slice(0, n).join(" ").split(/\s+/).length < 25) n++;
  return [parts.slice(0, n).join(" "), parts.slice(n).join(" ")];
}
const list = (items: readonly string[]) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

/** Title hooks, longest first; the first that keeps the title within 60 characters wins. */
const HOOKS: Record<SeasonSlug, string[]> = {
  spring: ["Arrival, Nesting & What to Feed", "Nesting & What to Feed", "What to Feed"],
  summer: ["Nesting, Food & Feeder Tips", "Food & Feeder Tips", "Feeder Tips"],
  fall: ["Migration, Food & Feeder Tips", "Food & Feeder Tips", "Feeder Tips"],
  winter: ["Where They Go & What to Feed", "Range & What to Feed", "What to Feed"],
};

function titleFor(bird: PilotBird, season: SeasonSlug) {
  const base = `${bird.commonName} in ${SEASONS[season].name}`;
  const hook = HOOKS[season].find((h) => base.length + 2 + h.length <= 60);
  return hook ? `${base}: ${hook}` : base;
}

function descriptionFor(bird: PilotBird, season: SeasonSlug) {
  const note = SEASON_NOTES[bird.slug]?.[season];
  const parts = note ? sentences(note.life) : [`${bird.commonName} activity changes with the season.`];
  const tail = " What to feed, where to watch, and eBird records by state.";
  const lead = `${bird.commonName} in ${lower(SEASONS[season].name)}: `;
  let text = lead + parts[0];
  if (text.length + tail.length <= 160) text += tail;
  if (text.length < 120 && parts[1]) text = `${lead}${parts[0]} ${parts[1]}`;
  return text.length > 160 ? text.slice(0, 157).replace(/\s+\S*$/, "") + "…" : text;
}

export function seasonalBirdMetadata(bird: PilotBird, season: SeasonSlug): Metadata {
  const title = titleFor(bird, season);
  const description = descriptionFor(bird, season);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/seasonal-birds/${season}/${bird.slug}` },
    robots: { index: true, follow: true },
    openGraph: { title, description, type: "article" },
  };
}

export function SeasonalBirdGuide({ bird, season }: { bird: PilotBird; season: SeasonSlug }) {
  const config = SEASONS[season];
  const seasonName = lower(config.name);
  const kw = `${bird.commonName} in ${seasonName}`;
  const plural = pluralizeBird(bird.commonName);
  const note = SEASON_NOTES[bird.slug]?.[season];
  const image = getBirdImage(bird.slug);
  const aab = AAB_SLUG[bird.slug];
  const breeding = season === "spring" || season === "summer";
  const b = bird.behavior;
  const [opening, rest] = note ? splitOpening(note.life) : [bird.summary, ""];
  const otherSeasons = (["spring", "summer", "fall", "winter"] as const).filter((s) => s !== season);

  const faq = [
    {
      q: `Where are ${plural} in ${seasonName}?`,
      a: note ? sentences(note.life).slice(0, 2).join(" ") : `${bird.residentStatus}.`,
    },
    {
      q: `What do ${plural} eat in ${seasonName}?`,
      a: `${bird.dietSummary}. At feeders they take ${list(bird.foods)}. ${note?.feed ?? ""}`.trim(),
    },
    {
      q: `How do I attract ${plural} in ${seasonName}?`,
      a: `Offer ${list(bird.foods)} in a ${bird.feeders[0]}, plant ${list(bird.plants)}, and keep fresh water available. ${config.focus.charAt(0).toUpperCase() + config.focus.slice(1)} matter most in ${seasonName}.`,
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: titleFor(bird, season),
      about: { "@type": "Thing", name: bird.commonName, alternateName: bird.scientificName },
      ...(image ? { image: `${SITE.origin}${image.src}` } : {}),
      author: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
        { "@type": "ListItem", position: 2, name: "Seasonal birds", item: `${SITE.origin}/seasonal-birds` },
        { "@type": "ListItem", position: 3, name: `${config.name} birds`, item: `${SITE.origin}/seasonal-birds/${season}` },
        { "@type": "ListItem", position: 4, name: kw, item: `${SITE.origin}/seasonal-birds/${season}/${bird.slug}` },
      ],
    },
  ];

  return (
    <div className="site-shell">
      <Header />
      <main className="content-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/seasonal-birds">Seasonal Birds</Link> / <Link href={`/seasonal-birds/${season}`}>{config.name}</Link> / {bird.commonName}
        </div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> {config.name} · {config.months} · {bird.scientificName}</p>
            <h1>{bird.commonName} in {config.name}</h1>
            <p className="lede">
              The {kw}: {opening}
            </p>
          </div>
          {image && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={`${bird.commonName} — what to look for when you watch the ${kw}`} width={image.width} height={image.height} decoding="async" />
              <figcaption>
                {bird.commonName}. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>The {kw}: what changes</h2></div>
          <div className="prose">
            {rest && <p>{rest}</p>}
            <p>
              Across North America, {seasonName} ({config.months}) is a season of {config.activity}. The {bird.commonName} is {b.migratory ? `a ${b.migrationPattern === "partial" ? "partial migrant" : b.migrationPattern === "irruptive" ? "irregular, irruptive migrant" : `${b.migrationPattern}-distance migrant`}` : "a year-round resident across most of its range"}; {lower(bird.residentStatus)}.
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
          <div className="loc-section-header"><h2>What to feed the {kw}</h2></div>
          <div className="prose">
            <p>{note?.feed}</p>
            <p>
              Year-round, {plural} eat {lower(bird.dietSummary)}. The foods they take most readily at feeders are {list(bird.foods)}, offered in a {list(bird.feeders)}. Serve small amounts that are eaten within a day or two, keep seed dry, and wash feeders every week or two so food does not spoil or spread disease.
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>Plants, water and shelter for the {bird.commonName}</h2></div>
          <div className="prose">
            <p>
              Natural food and cover do more than a feeder. For {plural}, useful plants include {list(bird.plants)} — choose species native to your region. In {seasonName} the priority is {config.focus}.
            </p>
            <p>
              {plural} are found in {list(bird.habitats)}. {config.watching}
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>{breeding ? "Nesting" : "How to recognize them"}</h2></div>
          <div className="prose">
            {breeding ? (
              <p>
                {plural} build a {b.nestType} nest, usually in a {list(b.nestLocations)}. A typical clutch is {b.clutchSize} eggs, incubated for about {b.incubationDays} days, with up to {b.broodsPerYear} {b.broodsPerYear === 1 ? "brood" : "broods"} a year. Keep pruning and yard work away from active nests, keep cats indoors, and leave fledglings on the ground alone unless they are in danger.
              </p>
            ) : (
              <p>
                {bird.identification.features} Size is about {bird.size[0]}–{bird.size[1]} cm. In {seasonName} light and plumage can make familiar birds look different, so check shape and behavior as well as color.
              </p>
            )}
          </div>
        </section>

        <SeasonSpeciesData season={season} birdSlug={bird.slug} birdName={bird.commonName} />

        <section className="loc-section">
          <div className="loc-section-header"><h2>Frequently asked questions</h2></div>
          {faq.map((x) => (
            <div key={x.q} className="faq-item"><h3>{x.q}</h3><p>{x.a}</p></div>
          ))}
          <p style={{ marginTop: "16px" }}>
            Facts on this page are checked against the Cornell Lab of Ornithology&rsquo;s{" "}
            {aab ? <a href={`https://www.allaboutbirds.org/guide/${aab}/`} rel="noopener noreferrer" target="_blank">All About Birds account for the {bird.commonName}</a> : "All About Birds"}{" "}
            and eBird records.
          </p>
        </section>

        <section className="loc-section">
          <div className="loc-section-header"><h3>More on the {bird.commonName}</h3></div>
          <div className="chip-list">
            <Link href={`/birds/${bird.slug}`}>{bird.commonName} profile →</Link>
            <Link href={`/feeders/for/${bird.slug}`}>Feeders for {lower(plural)} →</Link>
            <Link href={`/plants/for/${bird.slug}`}>Plants for {lower(plural)} →</Link>
            <Link href={`/how-to-attract/${bird.slug}`}>How to attract {lower(plural)} →</Link>
            {otherSeasons.map((s) => <Link key={s} href={`/seasonal-birds/${s}/${bird.slug}`}>{bird.commonName} in {s} →</Link>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
