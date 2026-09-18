import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { BirdProfileLink } from "../../components/BirdProfileLink";
import { getPublishedBirds } from "../../../lib/bird-repository";

export const metadata: Metadata = {
  title: "Seasonal Backyard Birds",
  description: "Learn how backyard bird activity changes through spring, summer, fall, and winter, then explore reviewed species profiles.",
  alternates: { canonical: "/seasonal-birds" },
  robots: { index: false, follow: true },
};

const seasons = [
  {
    name: "Spring",
    timing: "March–May",
    copy: "Migration and nesting accelerate. Offer fresh water, native insects, and safe nesting cover while keeping disturbance low.",
  },
  {
    name: "Summer",
    timing: "June–August",
    copy: "Adults raise young and natural food becomes abundant. Keep water clean and support insect-rich, pesticide-free habitat.",
  },
  {
    name: "Fall",
    timing: "September–November",
    copy: "Migrants refuel on insects, seeds, and fruit. Leave seed heads standing and add region-appropriate berry-producing plants.",
  },
  {
    name: "Winter",
    timing: "December–February",
    copy: "Resident and visiting birds need reliable calories, water, and shelter. Clean feeders regularly and protect dense cover.",
  },
];

export default async function SeasonalBirdsPage() {
  const birds = (await getPublishedBirds()).slice(0, 6);

  return (
    <div>
      <Header />
      <main className="content-main">
        <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/birds">Birds</Link> / Seasonal birds</div>
        <section className="content-hero">
          <div>
            <p className="eyebrow"><span /> Seasonal birds</p>
            <h1>What to expect<br />in every season.</h1>
            <p className="lede">Bird activity changes with migration, nesting, weather, and natural food. This legacy overview has moved to the expanded Seasonal Birds guide.</p>
          </div>
          <aside className="fact-panel">
            <div><small>Spring focus</small><strong>Migration + nesting</strong></div>
            <div><small>Summer focus</small><strong>Water + insects</strong></div>
            <div><small>Fall and winter</small><strong>Fuel + shelter</strong></div>
          </aside>
        </section>

        <div className="content-grid">
          {seasons.map((season) => (
            <section className="info-block" key={season.name}>
              <p className="eyebrow"><span /> {season.timing}</p>
              <h2>{season.name}</h2>
              <p>{season.copy}</p>
            </section>
          ))}
          <section className="info-block wide">
            <a className="button button-primary" href="/seasonal-birds">Open the new Seasonal Birds guide →</a>
            <h2>Explore birds you may see through the year</h2>
            <div className="index-grid">
              {birds.map((bird) => (
                <BirdProfileLink className="index-card" href={`/birds/${bird.slug}`} birdName={bird.commonName} key={bird.slug}>
                  <small>{bird.scientificName}</small>
                  <h2>{bird.commonName}</h2>
                  <p>{bird.hook}</p>
                  <span>View bird profile →</span>
                </BirdProfileLink>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
