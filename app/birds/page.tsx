import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage, editorialMetadata } from "../components/Editorial";
import { BirdProfileLink } from "../components/BirdProfileLink";
import { miscEditorial } from "../../data/editorial/misc";
import { birdEditorial } from "../../data/editorial/birds";
import { getPublishedBirds } from "../../lib/bird-repository";

const content = miscEditorial["/birds"];
export const metadata: Metadata = editorialMetadata(content);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function BirdsPage() {
  // Copy before sorting: the static fallback is a shared module-level array and the homepage relies on its curated order.
  const birds = [...(await getPublishedBirds())].sort((a, b) => a.commonName.localeCompare(b.commonName));
  const reviewed = birds.filter((b) => birdEditorial[b.slug]);
  const groups = alphabet
    .map((letter) => ({ letter, birds: birds.filter((bird) => bird.commonName.toUpperCase().startsWith(letter)) }))
    .filter((group) => group.birds.length > 0);

  return (
    <EditorialPage content={content} eyebrow={`Bird encyclopedia · ${reviewed.length} reviewed profiles · ${birds.length} species`} breadcrumbs={[{ name: "Backyard birds", path: "/birds" }]}
      before={
        <section className="loc-section">
          <div className="loc-section-header"><h2>Reviewed backyard birds</h2></div>
          <div className="bird-grid">
            {reviewed.map((bird) => (
              <BirdProfileLink className="bird-card" href={`/birds/${bird.slug}`} birdName={bird.commonName} key={bird.slug}>
                <div className="bird-circle"><div className="bird-circle-inner">{bird.initials}</div></div>
                <span className="bird-card-name">{bird.commonName}</span>
                <span className="bird-card-sci">{bird.scientificName}</span>
                {bird.family && <span className="bird-card-tag">{bird.family}</span>}
              </BirdProfileLink>
            ))}
          </div>
        </section>
      }
    >
      <section className="loc-section">
        <div className="loc-section-header"><h2>Backyard birds by state and group</h2></div>
        <div className="chip-list">
          {["florida", "arizona", "california", "colorado", "oregon", "tennessee", "texas", "michigan", "rhode-island"].map((st) => (
            <Link href={`/birds-by-location/${st}`} key={st}>Birds in {st.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())} →</Link>
          ))}
          <Link href="/birds-by-location">All states →</Link>
          <Link href="/seasonal-birds/spring">Spring birds →</Link>
          <Link href="/seasonal-birds/summer">Summer birds →</Link>
          <Link href="/seasonal-birds/fall">Fall birds →</Link>
        </div>
      </section>
      <section className="loc-section bird-encyclopedia" id="top">
        <div className="loc-section-header"><h2>All {birds.length} species A–Z</h2></div>
        <nav className="alphabet-nav" aria-label="Browse birds alphabetically">
          <span className="alphabet-label">Jump to</span>
          <div className="alphabet-links">
            {groups.map((g) => <a className="alphabet-link" href={`/birds#letter-${g.letter.toLowerCase()}`} key={g.letter}>{g.letter}</a>)}
          </div>
        </nav>
        {groups.map((group) => (
          <div className="letter-section" id={`letter-${group.letter.toLowerCase()}`} key={group.letter}>
            <header className="letter-heading"><span>{group.letter}</span><p>{group.birds.length} species</p></header>
            <div className="chip-list">
              {group.birds.map((bird) => <BirdProfileLink className="species-chip" href={`/birds/${bird.slug}`} birdName={bird.commonName} key={bird.slug}>{bird.commonName}</BirdProfileLink>)}
            </div>
          </div>
        ))}
      </section>
    </EditorialPage>
  );
}
