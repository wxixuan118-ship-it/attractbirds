import Link from "next/link";
import { classifyPresence, getStateOccurrences, relativeByMonth, MONTH_NAMES, OCCURRENCE_STATES } from "../../lib/occurrence-data";
import { birdInStateHref } from "../../lib/indexing";
import { US_STATES_DATA } from "../../data/us-states-data";
import { SEASON_MONTHS } from "../../data/editorial/seasonal";

const PER_LIST = 8;
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const monthLabel = (season: string) => { const m = SEASON_MONTHS[season]; return `${MONTH_NAMES[m[0]]}–${MONTH_NAMES[m[m.length - 1]]}`; };

type SeasonBird = { slug: string | null; name: string; records: number; resident: boolean };

/** Birds regularly recorded in a state during the season (≥30% of their own monthly peak), most-reported first. */
function seasonBirds(stateSlug: string, season: string): SeasonBird[] {
  const d = getStateOccurrences(stateSlug);
  if (!d) return [];
  const months = SEASON_MONTHS[season];
  return d.birds
    .map((b) => {
      const { presence, abundance } = classifyPresence(b, d.totalRecords);
      if (presence === "absent" || abundance === "rare") return null;
      const rel = relativeByMonth(b);
      if (Math.max(...months.map((m) => rel[m])) < 0.3) return null;
      return { slug: b.slug, name: b.commonName, records: months.reduce((n, m) => n + b.months[m], 0), resident: presence === "resident" };
    })
    .filter((b): b is SeasonBird => b !== null)
    .sort((a, b) => b.records - a.records)
    // A species can appear twice in the source data (ranked and whitelisted rows); keep one, preferring the row with a slug.
    .filter((b, i, all) => {
      const withSlug = all.findIndex((x) => x.name === b.name && x.slug);
      return withSlug === -1 ? all.findIndex((x) => x.name === b.name) === i : withSlug === i;
    });
}

function BirdList({ stateSlug, birds }: { stateSlug: string; birds: SeasonBird[] }) {
  return (
    <>
      {birds.slice(0, PER_LIST).map((b, i) => {
        const href = b.slug ? birdInStateHref(stateSlug, b.slug) : null;
        return <span key={b.name}>{i > 0 && ", "}{href ? <Link href={href}>{b.name}</Link> : b.name}</span>;
      })}
    </>
  );
}

/** For each state with eBird data, the birds seen there in the season; every other state links to its month-by-month guide. */
export function SeasonStateBirds({ season }: { season: string }) {
  const name = capitalize(season);
  const states = [...US_STATES_DATA].sort((a, b) => a.name.localeCompare(b.name)).filter((s) => OCCURRENCE_STATES.includes(s.slug))
    .map((s) => ({ state: s, birds: seasonBirds(s.slug, season) }))
    .filter((s) => s.birds.length > 0);
  const others = [...US_STATES_DATA].sort((a, b) => a.name.localeCompare(b.name)).filter((s) => !states.some((x) => x.state.slug === s.slug));
  return (
    <section className="loc-section loc-prose">
      <div className="loc-section-header">
        <h2>{name} birds by state</h2>
        <p>
          Birds regularly reported in each state from {monthLabel(season)}, most-reported first, from eBird checklists 2020–2024
          retrieved through GBIF. &ldquo;Here for {season}&rdquo; birds are migrants or seasonal visitors; the rest stay all year.
        </p>
      </div>
      <div className="prose">
        {states.map(({ state, birds }) => {
          const visitors = birds.filter((b) => !b.resident);
          const residents = birds.filter((b) => b.resident);
          const label = `${name} birds in ${state.name}`;
          return (
            <div key={state.slug}>
              <h3><Link href={`/birds-by-location/${state.slug}`} title={label}>{label}</Link> ({birds.length} species)</h3>
              {visitors.length > 0 && <p><strong>Here for {season}:</strong> <BirdList stateSlug={state.slug} birds={visitors} /></p>}
              {residents.length > 0 && <p><strong>Year-round:</strong> <BirdList stateSlug={state.slug} birds={residents} /></p>}
            </div>
          );
        })}
        {others.length > 0 && (
          <>
            <h3>{name} birds in other states</h3>
            <p>Each state guide lists its birds month by month:</p>
            <div className="city-pills">
              {others.map((s) => (
                <Link key={s.slug} href={`/birds-by-location/${s.slug}`} className="city-pill" title={`Birds in ${s.name}`} style={{ textDecoration: "none" }}>{s.name}</Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
