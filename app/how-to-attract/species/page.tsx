import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { speciesAttractionGuides } from "../../../data/species-attraction-guides";
import { getBirdImage } from "../../../lib/group-data";
import { SITE, URL_REGISTRY } from "../../../lib/url-registry";

const title = `How to Attract Specific Birds: ${speciesAttractionGuides.length} Species Guides`;
const description = "How to attract specific birds to your yard — cardinals, chickadees, goldfinches, bluebirds, hummingbirds, orioles, robins, jays and more — with food, plants and nest sites.";

export const metadata: Metadata = { title: { absolute: title }, description: description.length > 160 ? description.slice(0, 157) + "…" : description, alternates: { canonical: "/how-to-attract/species" }, openGraph: { title, description, type: "website" } };

export default function SpeciesAttractionIndex() {
  const image = getBirdImage("northern-cardinal");
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: `${SITE.origin}/how-to-attract/species`,
      hasPart: speciesAttractionGuides.map((g) => ({ "@type": "Article", name: `How to attract ${g.name}`, url: `${SITE.origin}${URL_REGISTRY.howTo.species(g.slug)}` })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "How to attract birds", item: `${SITE.origin}${URL_REGISTRY.howTo.hub}` },
      { "@type": "ListItem", position: 3, name: "Species guides", item: `${SITE.origin}/how-to-attract/species` },
    ] },
  ];
  return (
    <div className="site-shell">
      <Header />
      <main className="content-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href={URL_REGISTRY.howTo.hub}>How to attract birds</Link> / Species guides</div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> Species attraction guides</p>
            <h1>How to Attract Specific Birds</h1>
            <p className="lede">
              Knowing how to attract specific birds means starting from what each species eats, where it nests and whether it lives near you in the season you care about. A cardinal wants sunflower and dense shrubs, a robin wants worms and fruit, a bluebird wants open ground and a nest box — one feeder will not serve them all.
            </p>
          </div>
          {image && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="Northern cardinal — how to attract specific birds like this one starts with food and cover" width={image.width} height={image.height} decoding="async" />
              <figcaption>
                Northern Cardinal. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="loc-section">
          <div className="loc-section-header">
            <h2>How to attract specific birds, species by species</h2>
            <p>Each guide covers food, feeders, native plants, water, nest sites and the safety steps that matter for that species.</p>
          </div>
          <div className="index-grid">
            {speciesAttractionGuides.map((guide) => (
              <Link className="index-card" href={URL_REGISTRY.howTo.species(guide.slug)} key={guide.slug}>
                <small>Species guide</small>
                <p><strong>{guide.name}</strong></p>
                <p>{guide.priority}.</p>
                <span>How to attract {guide.name.toLowerCase()} →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>Before you plan for one species</h2></div>
          <div className="prose">
            <p>
              First check that the bird actually occurs where you live, and in which months. A Ruby-throated Hummingbird plan is wasted in winter, and Western and Mountain Bluebirds need a different setup from Eastern Bluebirds. The state guides on this site list the birds reported near you by month, and{" "}
              <a href="https://ebird.org/explore" rel="noopener noreferrer" target="_blank">eBird</a> shows current sightings.
            </p>
            <p>
              Then build habitat before adding food. Native plants that fruit, seed or host insects feed far more birds than a feeder, and most songbirds raise their young on insects even if the adults eat seed. Feeders, nest boxes and water make a yard easier to use; cover, food plants and the absence of pesticides make it worth using.
            </p>
            <p>
              Match the season, too. Most species guides here are for year-round residents — cardinals, chickadees, titmice, Downy Woodpeckers, House Finches, Blue Jays — which can be attracted in any month, with winter the easiest. Summer visitors such as hummingbirds and orioles need their food in place before they arrive in spring, and ground birds such as Mourning Doves and Killdeer need open ground more than any feeder.
            </p>
            <p>
              Finally, keep the birds you attract safe. Treat windows near feeders from the outside, keep cats indoors, and wash feeders every week or two. The general guides — attracting birds to a feeder, to a bird bath, in winter, or without a feeder at all — cover the steps that apply to every species.
            </p>
          </div>
          <div className="chip-list" style={{ marginTop: "16px" }}>
            <Link href={URL_REGISTRY.howTo.hub}>All attraction guides →</Link>
            <Link href={URL_REGISTRY.locations.hub}>Birds by state →</Link>
            <Link href={URL_REGISTRY.feeders.hub}>Types of bird feeders →</Link>
            <Link href={URL_REGISTRY.plants.hub}>Plants that attract birds →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
