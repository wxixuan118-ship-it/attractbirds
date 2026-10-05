import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { getBirdImage } from "../../../lib/group-data";
import { isBirdProfilePublished } from "../../../lib/indexing";
import { SITE } from "../../../lib/url-registry";

const title = "Oriole Birds: U.S. Species, Identification & Feeders";
const description = "Oriole birds of the United States: Baltimore, Orchard, Bullock's, Hooded and Scott's orioles, how to tell them apart, where they live, and what to feed orioles.";

export const metadata: Metadata = { title: { absolute: title }, description, alternates: { canonical: "/birds/oriole" }, openGraph: { title, description, type: "article" } };

const species = [
  { name: "Baltimore Oriole", slug: "baltimore-oriole", scientific: "Icterus galbula", range: "Breeds in the East and Great Plains; winters in Mexico, Central America and the Caribbean.", id: "Adult male flame-orange with a solid black head and back; females and young yellow-orange." },
  { name: "Orchard Oriole", slug: "orchard-oriole", scientific: "Icterus spurius", range: "Breeds across the central and eastern United States; one of the earliest fall migrants, leaving in July and August.", id: "The smallest U.S. oriole; adult male deep chestnut and black, first-year male yellow-green with a black throat." },
  { name: "Bullock's Oriole", slug: "bullocks-oriole", scientific: "Icterus bullockii", range: "The common oriole of the West, from the Great Plains to the Pacific.", id: "Male orange with a black crown, black eye-line and a large white wing patch." },
  { name: "Hooded Oriole", slug: "hooded-oriole", scientific: "Icterus cucullatus", range: "California and the Southwest, often in towns with palms.", id: "Male orange or yellow with a black face and throat; often sews its nest to the underside of a palm frond." },
  { name: "Scott's Oriole", slug: "scotts-oriole", scientific: "Icterus parisorum", range: "Desert hills and grasslands of the Southwest, closely tied to yuccas.", id: "Male lemon-yellow and black, unlike the orange of other orioles." },
];

export default function Oriole() {
  const image = getBirdImage("baltimore-oriole");
  const faq = [
    { q: "Are oriole birds related to Old World orioles?", a: "No. American orioles belong to the blackbird family, Icteridae, with meadowlarks and grackles; the Old World orioles of Europe and Asia are a separate family that happens to look similar." },
    { q: "What do orioles eat?", a: "Insects and spiders, especially caterpillars, plus ripe fruit and flower nectar. At feeders they take orange halves, small amounts of grape jelly, and sugar-water nectar." },
    { q: "When do orioles arrive and leave?", a: "Most U.S. orioles arrive in April and May and leave by September; Orchard Orioles are among the earliest to go, often by late July." },
  ];
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Article", headline: title, about: { "@type": "Thing", name: "Orioles", alternateName: "Icterus" }, ...(image ? { image: `${SITE.origin}${image.src}` } : {}), author: { "@type": "Organization", name: SITE.brand, url: SITE.origin } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin },
      { "@type": "ListItem", position: 2, name: "Birds", item: `${SITE.origin}/birds` },
      { "@type": "ListItem", position: 3, name: "Oriole birds", item: `${SITE.origin}/birds/oriole` },
    ] },
  ];
  return (
    <div className="site-shell">
      <Header />
      <main className="content-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/birds">Birds</Link> / Orioles</div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> Bird collection · Icterus</p>
            <h1>Oriole Birds</h1>
            <p className="lede">
              Oriole birds in the United States are bright orange, yellow and black songbirds of the genus Icterus, in the blackbird family. Most arrive in spring from Mexico and Central America, sing from the treetops, weave hanging nests, and come to feeders for fruit, jelly and nectar.
            </p>
          </div>
          {image && (
            <figure className="state-hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="Baltimore Oriole, the best-known of the oriole birds in the eastern United States" width={image.width} height={image.height} decoding="async" />
              <figcaption>
                Baltimore Oriole. Photo: <a href={image.creditUrl} rel="noopener noreferrer" target="_blank">{image.credit}</a>,{" "}
                <a href={image.licenseUrl} rel="noopener noreferrer license" target="_blank">{image.license}</a>, via Wikimedia Commons.
              </figcaption>
            </figure>
          )}
        </section>

        <section className="loc-section">
          <div className="loc-section-header">
            <h2>Oriole birds of the United States</h2>
            <p>Eight orioles occur regularly in the U.S.; these five are the ones most backyard birders meet.</p>
          </div>
          <div className="index-grid">
            {species.map((x) => {
              const body = (
                <>
                  <small>{x.scientific}</small>
                  <strong>{x.name}</strong>
                  <p>{x.id} {x.range}</p>
                </>
              );
              return isBirdProfilePublished(x.slug) ? (
                <Link className="index-card" href={`/birds/${x.slug}`} key={x.slug}>{body}<span>Profile →</span></Link>
              ) : (
                <div className="index-card" key={x.slug}>{body}</div>
              );
            })}
          </div>
          <p style={{ marginTop: "16px" }}>
            Three more reach the far south: Altamira and Audubon&rsquo;s Orioles in the Lower Rio Grande Valley of Texas, and the introduced Spot-breasted Oriole in southeastern Florida.
          </p>
        </section>

        <section className="loc-section loc-prose">
          <div className="loc-section-header"><h2>How to identify oriole birds</h2></div>
          <div className="prose">
            <p>
              Start with range and season: in the East in summer an orange oriole is almost always a Baltimore, while in the West it is usually a Bullock&rsquo;s. The two meet and hybridize on the Great Plains, and were once treated as a single species, the Northern Oriole. Then look at the head pattern: a solid black hood marks a male Baltimore, a black crown and eye-line with orange cheeks a male Bullock&rsquo;s, and a black face on an orange or yellow head a Hooded Oriole.
            </p>
            <p>
              Females and first-year males are the hard part. They are yellow to orange with grayish backs and white wing bars, and Orchard Oriole females are greener and smaller with a shorter bill. Shape and voice help more than color — orioles are slimmer than tanagers, with long tails and sharply pointed bills, and each species has a distinctive whistled song. The{" "}
              <a href="https://www.allaboutbirds.org/guide/Baltimore_Oriole/" rel="noopener noreferrer" target="_blank">All About Birds species accounts</a> have songs and photos for comparison.
            </p>
          </div>
        </section>

        <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
          <div className="loc-section-header"><h2>Feeding orioles safely</h2></div>
          <div className="prose">
            <p>
              Orioles eat mostly insects in the breeding season — caterpillars are a favorite — plus ripe fruit and flower nectar. To attract them, put out orange halves on a spike, a small dish of grape jelly, or an oriole nectar feeder (one part white sugar to four parts water, no dye) when they return in spring. Offer jelly sparingly: a spoonful at a time, refreshed daily, so it does not spoil or coat feathers.
            </p>
            <p>
              Clean nectar feeders every couple of days and remove fruit before it ferments. Native plants that host caterpillars and produce berries — serviceberry, mulberry, elderberry — support orioles all season and feed their nestlings.
            </p>
          </div>
          <div className="chip-list" style={{ marginTop: "16px" }}>
            <Link href="/how-to-attract/baltimore-oriole">How to attract Baltimore Orioles →</Link>
            <Link href="/feeders/hummingbird-feeder">Nectar feeder care →</Link>
            <Link href="/plants/berry-producing-plants">Berry plants for birds →</Link>
            <Link href="/birds-by-location">Birds by state →</Link>
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
