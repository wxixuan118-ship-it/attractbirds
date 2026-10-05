import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import topicImages from "../../../data/topic-images.json";
import { SITE } from "../../../lib/url-registry";

const title = "Bird of Paradise Plant: Care, Blooms & Value for Birds";
const description = "Bird of paradise plant (Strelitzia reginae) care: light, soil, water, getting blooms, pet safety, indoor growing, and what this plant offers birds.";

export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/plants/bird-of-paradise" }, openGraph: { title, description, type: "article" } };

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const image = (topicImages as Record<string, Img>)["bird-of-paradise"];
const NCSU = "https://plants.ces.ncsu.edu/plants/strelitzia-reginae/";

export default function BirdOfParadise() {
  const faq = [
    { q: "Is Strelitzia native to North America?", a: "No. Strelitzia reginae is native to South Africa; in the United States it grows outdoors only in frost-free areas such as southern California, Florida and Hawaii." },
    { q: "Does bird of paradise attract birds?", a: "In South Africa its flowers are pollinated by birds that perch on them. In North American gardens hummingbirds may probe the flowers, but native nectar plants are far more valuable for local birds." },
    { q: "Can Strelitzia grow indoors?", a: "Yes. It needs very bright light, well-drained soil and careful watering; indoor plants often take years to bloom." },
    { q: "Is bird of paradise toxic to pets?", a: "NC State Extension lists it as toxic to cats, dogs and horses, with low-severity toxicity for people, mainly from the fruit and seeds." },
  ];
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, about: { "@type": "Thing", name: "Bird of paradise", alternateName: "Strelitzia reginae" }, ...(image ? { image: `${SITE.origin}${image.src}` } : {}), author: { "@type": "Organization", name: SITE.brand, url: SITE.origin } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "Plants", item: `${SITE.origin}/plants` },
      { "@type": "ListItem", position: 3, name: "Bird of paradise plant", item: `${SITE.origin}/plants/bird-of-paradise` },
    ] },
  ];
  return (
    <div className="site-shell">
      <Header />
      <main className="content-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/plants">Plants</Link> / Bird of Paradise</div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> Plant encyclopedia · Strelitzia reginae · Strelitziaceae</p>
            <h1>Bird of Paradise Plant</h1>
            <p className="lede">
              The bird of paradise plant (Strelitzia reginae) is a clumping evergreen perennial from South Africa, named for its orange-and-blue flowers that look like the head of a crested bird. It is a striking ornamental and houseplant, but not a native plant for North American bird habitat.
            </p>
          </div>
          {image && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="Bird of paradise plant flower with orange sepals and blue petals" width={image.width} height={image.height} decoding="async" />
              <figcaption>
                Strelitzia reginae flower. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>Growing it outdoors: climate, soil and blooms</h2></div>
          <div className="prose">
            <p>
              Outdoors, the plant is hardy only in frost-free climates — roughly USDA zones 10 to 12, which in the United States means southern California, southern Florida and Hawaii. It grows about 3 to 5 feet tall and wide from a clump of upright, paddle-shaped leaves, in full sun to partial shade. Give it fertile, loamy, well-drained soil and steady water while it is growing, then water less in winter; waterlogged soil causes root rot.
            </p>
            <p>
              Each flower emerges from a stiff, beak-like green bract: bright orange sepals rise like a crest and blue petals form an arrow-shaped tongue. Established plants bloom on and off through much of the year in warm climates. Plants usually flower best once they are mature and somewhat crowded, so dividing clumps too often delays blooming. Feed during the growing season and remove spent flower stalks to keep the clump tidy. A related species, the giant white bird of paradise (Strelitzia nicolai), grows into a tree-like clump up to about 20 feet tall with white and blue flowers and is often confused with it in nurseries.
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
          <div className="loc-section-header"><h2>Indoors, pets and common problems</h2></div>
          <div className="prose">
            <p>
              As a houseplant, a bird of paradise needs the brightest window you have, plenty of room, well-drained potting mix, and watering only when the top of the soil has dried. Indoor plants grow well but often take several years to bloom. Watch for scale, mealybugs and spider mites, especially in dry indoor air.
            </p>
            <p>
              NC State Extension lists the plant as toxic to cats, dogs and horses, with low-severity toxicity for people, mainly from the fruit and seeds — keep it away from pets that chew plants. See the{" "}
              <a href={NCSU} rel="noopener noreferrer" target="_blank">NC State Extension plant profile</a> for full details.
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>Does the bird of paradise plant help birds?</h2></div>
          <div className="prose">
            <p>
              In its native South Africa the flower is built for birds: a sunbird or weaver perches on the blue petals, which open under its weight and dust its feet with pollen as it reaches the nectar. In North American gardens, hummingbirds may visit the flowers, but the plant supports few local insects and offers little fruit or seed, so its value for local birds is limited.
            </p>
            <p>
              If your goal is a yard that feeds birds, plant regionally native nectar, fruit and seed plants instead — for hummingbirds, red tubular natives such as cardinal flower and trumpet honeysuckle; for songbirds, berry shrubs and seed-bearing flowers. Grow a bird of paradise for its looks, and pair it with natives for the birds.
            </p>
          </div>
          <div className="chip-list" style={{ marginTop: "16px" }}>
            <Link href="/plants/native-plants">Native plants for birds →</Link>
            <Link href="/plants/nectar-plants">Nectar plants for birds →</Link>
            <Link href="/plants/cardinal-flower">Cardinal flower →</Link>
            <Link href="/plants/trumpet-honeysuckle">Trumpet honeysuckle →</Link>
            <Link href="/plants">All plants →</Link>
          </div>
        </section>

        <section className="loc-section">
          <div className="loc-section-header"><h2>Frequently asked questions</h2></div>
          {faq.map((x) => <div key={x.q} className="faq-item"><h3>{x.q}</h3><p>{x.a}</p></div>)}
        </section>
      </main>
      <Footer />
    </div>
  );
}
