import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BirdProfileLink } from "../components/BirdProfileLink";
import { getPublishedBirds } from "../../lib/bird-repository";

export const metadata: Metadata = {
  title: "A–Z Bird Encyclopedia — 1,000 Species",
  description: "Browse 1,000 birds from the North and Middle American checklist, with taxonomy, identification, habitat, diet, nesting, and seasonal guidance.",
  alternates: { canonical: "/birds" },
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function BirdsPage() {
  const birds = (await getPublishedBirds()).sort((a, b) => a.commonName.localeCompare(b.commonName));
  const groups = alphabet
    .map((letter) => ({ letter, birds: birds.filter((bird) => bird.commonName.toUpperCase().startsWith(letter)) }))
    .filter((group) => group.birds.length > 0);
  const availableLetters = new Set(groups.map((group) => group.letter));

  return (
    <div>
      <Header />
      <main className="content-main bird-encyclopedia" id="top">
        <div className="breadcrumb"><Link href="/">Home</Link> / Bird Encyclopedia</div>

        <section className="encyclopedia-hero">
          <div>
            <p className="eyebrow"><span /> Bird encyclopedia</p>
            <h1>Backyard birds,<br /><em>from A to Z.</em></h1>
          </div>
          <div className="encyclopedia-intro">
            <p>Identify the birds outside your window and learn what helps them thrive. Every profile brings together field marks, natural diet, useful plants, feeders, nesting, and seasonal movement.</p>
            <div className="encyclopedia-stats">
              <div><strong>{birds.length}</strong><span>species directory</span></div>
              <div><strong>{birds.filter((bird) => bird.sourceCount > 0).length}</strong><span>sourced profiles</span></div>
              <div><strong>{groups.length}</strong><span>active letters</span></div>
            </div>
          </div>
        </section>

        <nav className="alphabet-nav" aria-label="Browse birds alphabetically">
          <span className="alphabet-label">Jump to</span>
          <div className="alphabet-links">
            {alphabet.map((letter) => availableLetters.has(letter) ? (
              <a className="alphabet-link" href={`#letter-${letter.toLowerCase()}`} key={letter}>{letter}</a>
            ) : (
              <span className="alphabet-link is-disabled" aria-disabled="true" key={letter}>{letter}</span>
            ))}
          </div>
        </nav>

        <div className="bird-directory">
          {groups.map((group) => (
            <section className="letter-section" id={`letter-${group.letter.toLowerCase()}`} key={group.letter}>
              <header className="letter-heading">
                <span>{group.letter}</span>
                <p>{group.birds.length} species</p>
                <a href="#top" aria-label="Back to the top of the encyclopedia">Back to top ↑</a>
              </header>
              <div className="encyclopedia-grid">
                {group.birds.map((bird) => (
                  <BirdProfileLink className="species-card" href={`/birds/${bird.slug}`} key={bird.slug}>
                    <div className="species-card-visual">
                      {bird.imageUrl ? (
                        // The repository supplies reviewed, attributed bird imagery when available.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={bird.imageUrl} alt={bird.imageAlt ?? bird.commonName} />
                      ) : (
                        <span>{bird.initials}</span>
                      )}
                    </div>
                    <div className="species-card-body">
                      <div className="species-card-meta"><span>{bird.family}</span><span>{bird.size}</span></div>
                      <h2>{bird.commonName}</h2>
                      <p className="species-scientific">{bird.scientificName}</p>
                      <p className="species-summary">{bird.summary}</p>
                      <div className="species-card-footer">
                        <span>{bird.residentStatus}</span>
                        <strong>View profile →</strong>
                      </div>
                    </div>
                  </BirdProfileLink>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
