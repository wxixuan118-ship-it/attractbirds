import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEASONS, seasonSlugs, indexedSeasonalBirds } from "../../lib/seasonal-repository";
import { getBirdImage } from "../../lib/group-data";
import { SITE } from "../../lib/url-registry";

const title = "Seasonal Birds: What Visits Your Yard in Each Season";
const description = "Seasonal birds through the year: which backyard birds arrive, nest, flock and leave in spring, summer, fall and winter, and what to feed seasonal birds in each.";

export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/seasonal-birds" }, openGraph: { title, description, type: "website" } };

/** What changes for backyard birds in each season; species facts are from the linked species guides. */
const SEASON_COPY: Record<string, string> = {
  spring: "Spring brings the biggest change of the year. Ruby-throated Hummingbirds and orioles return from Central America, robins start singing before dawn, goldfinches molt back into bright yellow, and resident cardinals, chickadees and titmice begin nesting. Seasonal birds in spring need insects for their young, fresh water and safe nesting cover more than they need seed.",
  summer: "Summer is nesting season. Most backyard birds are feeding young on insects, so the best support is pesticide-free habitat, native plants that host caterpillars, and a clean bird bath. Goldfinches nest last of all, in July and August, when thistle and milkweed go to seed; hummingbird feeders are busiest at the end of summer.",
  fall: "Fall is migration and flocking season. Hummingbirds and orioles leave, Blue Jays cache acorns, goldfinches turn olive-brown, and chickadees, titmice and woodpeckers form the mixed flocks that will visit feeders all winter. Seed heads, berries and a restocked feeder carry seasonal birds through the change.",
  winter: "Winter belongs to the residents and to northern visitors such as Dark-eyed Juncos. Cardinals gather in loose flocks, chickadees survive cold nights by lowering their body temperature, and robins leave lawns for berry-laden woods. High-fat foods, open water and evergreen shelter matter most.",
};

export default function SeasonalBirdsHub() {
  const image = getBirdImage("american-goldfinch");
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: `${SITE.origin}/seasonal-birds`,
      hasPart: seasonSlugs.map((slug) => ({ "@type": "WebPage", name: `${SEASONS[slug].name} birds`, url: `${SITE.origin}/seasonal-birds/${slug}` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "Seasonal birds", item: `${SITE.origin}/seasonal-birds` },
    ] },
  ];
  return (
    <div className="site-shell">
      <Header />
      <main className="content-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="breadcrumb"><Link href="/">Home</Link> / Seasonal Birds</div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> Seasonal bird guides</p>
            <h1>Seasonal Birds Through the Year</h1>
            <p className="lede">
              Seasonal birds are the reason a backyard never looks the same for long: some species arrive to nest, some only pass through on migration, some turn up in winter, and even the year-round residents change their behavior, plumage and food from one season to the next.
            </p>
          </div>
          {image && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="American Goldfinch on a coneflower — one of the most seasonal birds, bright yellow in summer and olive-brown in winter" width={image.width} height={image.height} decoding="async" />
              <figcaption>
                American Goldfinch. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>Seasonal birds, season by season</h2></div>
          <div className="prose">
            {seasonSlugs.map((slug) => (
              <p key={slug}>
                <strong><Link href={`/seasonal-birds/${slug}`}>{SEASONS[slug].name} birds</Link> ({SEASONS[slug].months}).</strong> {SEASON_COPY[slug]}
              </p>
            ))}
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Seasonal guides for common backyard birds</h2>
            <p>Each guide covers what the bird is doing that season, what to feed it, the plants and shelter it needs, and eBird records by state.</p>
          </div>
          <div className="content-grid">
            {indexedSeasonalBirds.map((bird) => (
              <div className="info-block" key={bird.slug}>
                <p><strong>{bird.commonName}</strong></p>
                <div className="chip-list">
                  {seasonSlugs.map((slug) => <Link key={slug} href={`/seasonal-birds/${slug}/${bird.slug}`}>{SEASONS[slug].name}</Link>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>Residents, migrants and winter visitors</h2></div>
          <div className="prose">
            <p>
              It helps to sort the birds in your yard into three groups. Year-round residents — cardinals, chickadees, titmice, Downy Woodpeckers, most House Finches — are there every month but nest in spring, flock in fall and depend on feeders and shelter in winter. Summer visitors such as Ruby-throated Hummingbirds, orioles and many warblers arrive in spring, nest, and leave for the tropics in fall. Winter visitors such as Dark-eyed Juncos and, in some years, Pine Siskins and redpolls come south from Canada and the mountains when food runs short there. A few species, like Blue Jays and American Robins, mix all three: some individuals migrate and others stay, so the same yard can hold them in every season.
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>How to plan a yard for seasonal birds</h2></div>
          <div className="prose">
            <p>
              Plan for the whole year rather than one season. Native trees and shrubs that flower in spring, fruit in late summer and hold berries into winter — serviceberry, dogwood, elderberry, winterberry, eastern red cedar — feed different seasonal birds at different times. Leaving seed heads standing in fall and brush piles over winter costs nothing and helps more than an extra feeder.
            </p>
            <p>
              Feeders work best when they follow the calendar: nectar from just before hummingbirds arrive in spring until two weeks after the last one leaves in fall, sunflower and suet from fall through spring, and nyjer whenever goldfinches and siskins are around. Clean water is useful in every season. To see which species are actually present near you this week, check recent sightings on{" "}
              <a href="https://ebird.org/explore" rel="noopener noreferrer" target="_blank">eBird</a>, or use the state guides on this site.
            </p>
          </div>
          <div className="chip-list" style={{ marginTop: "16px" }}>
            <Link href="/birds-by-location">Birds by state →</Link>
            <Link href="/tools/backyard-bird-finder">Backyard bird finder →</Link>
            <Link href="/plants">Plants for birds →</Link>
            <Link href="/feeders">Feeder guide →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
