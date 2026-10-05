import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { feederComparisons, feederFoods, feederGuides, feederProblems } from "../../data/pilot-feeders";
import { pilotBirds } from "../../data/pilot-birds";
import topicImages from "../../data/topic-images.json";
import { SITE } from "../../lib/url-registry";

const title = "Types of Bird Feeders: Which Feeder Attracts Which Birds";
const description = "The main types of bird feeders compared — tube, hopper, platform, suet, nyjer, peanut and hummingbird — with the birds each attracts, best foods and placement.";

export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/feeders" }, openGraph: { title, description, type: "website" } };

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const hero = (topicImages as Record<string, Img>)["hopper-feeder"];
const birdName = (slug: string) => pilotBirds.find((b) => b.slug === slug)?.commonName ?? slug.replaceAll("-", " ");

export default function Feeders() {
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${SITE.origin}/feeders`,
      hasPart: feederGuides.map((f) => ({ "@type": "WebPage", name: f.name, url: `${SITE.origin}/feeders/${f.slug}` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "Feeders", item: `${SITE.origin}/feeders` },
    ] },
  ];
  return (
    <div className="site-shell">
      <Header />
      <main className="content-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="breadcrumb"><Link href="/">Home</Link> / Feeders</div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> Feeder guides</p>
            <h1>Types of Bird Feeders</h1>
            <p className="lede">
              The types of bird feeders differ in one thing that matters: which birds can use them. Choose a feeder by the birds you want and the food they eat, then by how easy it is to keep clean, dry and out of reach of squirrels.
            </p>
          </div>
          {hero && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.src} alt="A hopper feeder, one of the most versatile types of bird feeders" width={hero.width} height={hero.height} decoding="async" />
              <figcaption>
                Hopper feeder. Photo: <a href={hero.creditUrl} rel="noopener noreferrer" target="_blank">{hero.credit}</a>,{" "}
                <a href={hero.licenseUrl} rel="noopener noreferrer license" target="_blank">{hero.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="loc-section">
          <div className="loc-section-header">
            <h2>The main types of bird feeders</h2>
            <p>What each design is, the birds it suits and the foods it holds.</p>
          </div>
          <div className="index-grid">
            {feederGuides.map((f) => (
              <Link className="index-card" href={`/feeders/${f.slug}`} key={f.slug}>
                <small>Feeder type</small>
                <h3>{f.name}</h3>
                <p>{f.summary} Best for {f.bestFor.slice(0, 3).map(birdName).join(", ")}.</p>
                <span>Read the guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>How to choose between types of bird feeders</h2></div>
          <div className="prose">
            <p>
              Start with the birds. Small clinging and perching birds — goldfinches, chickadees, titmice, nuthatches — use tube feeders with short perches, which also keep out larger birds such as grackles and jays. Trays attract most species of feeder birds, and set near the ground they bring juncos, doves and sparrows. Hoppers feed almost everything, from finches to cardinals and jays, while suet feeders are for woodpeckers, nuthatches and chickadees, and nyjer feeders are mainly for goldfinches, siskins and redpolls.
            </p>
            <p>
              Then match the food. Black-oil sunflower is the preferred food for the widest variety of birds and works in tubes, hoppers and trays; millet and cracked corn belong low down for ground feeders; nectar needs a dedicated hummingbird feeder. Cheap mixes heavy in milo and wheat mostly end up on the ground.
            </p>
            <p>
              Finally, think about upkeep. Every type of feeder needs washing every week or two, and platforms and hummingbird feeders more often. Place feeders close to shrubs or trees that give birds cover but about ten feet from branches squirrels can jump from, and make nearby windows bird-safe. This guidance follows{" "}
              <a href="https://feederwatch.org/learn/feeding-birds/" rel="noopener noreferrer" target="_blank">Project FeederWatch</a>, the Cornell Lab of Ornithology&rsquo;s feeder survey.
            </p>
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-section-header"><h2>Feeders by bird, food and problem</h2></div>
          <p className="city-pills-label"><strong>By bird:</strong></p>
          <div className="chip-list">{pilotBirds.map((b) => <Link href={`/feeders/for/${b.slug}`} key={b.slug}>{b.commonName}</Link>)}</div>
          <p className="city-pills-label"><strong>By food:</strong></p>
          <div className="chip-list">{Object.entries(feederFoods).map(([slug, x]) => <Link href={`/feeders/for/${slug}`} key={slug}>{x.name}</Link>)}</div>
          <p className="city-pills-label"><strong>By problem:</strong></p>
          <div className="chip-list">{Object.entries(feederProblems).map(([slug, x]) => <Link href={`/feeders/${slug}`} key={slug}>{x.title}</Link>)}</div>
          <p className="city-pills-label"><strong>Comparisons and tools:</strong></p>
          <div className="chip-list">
            {Object.entries(feederComparisons).map(([slug, x]) => <Link href={`/feeders/compare/${slug}`} key={slug}>{x.title}</Link>)}
            <Link href="/tools/bird-feeder-calculator">Bird feeder calculator</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
