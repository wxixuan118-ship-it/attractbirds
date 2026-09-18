import Link from "next/link";
import { getStateOccurrences, MONTH_NAMES } from "../../lib/occurrence-data";
import { US_STATES_DATA } from "../../data/us-states-data";
import { SEASON_MONTHS } from "../../data/editorial/seasonal";

const DATA_STATES = ["florida", "arizona", "california", "colorado", "oregon", "tennessee", "texas", "michigan", "rhode-island"];
const stateName = (slug: string) => US_STATES_DATA.find((s) => s.slug === slug)?.name ?? slug;
const monthLabel = (season: string) => { const m = SEASON_MONTHS[season]; return `${MONTH_NAMES[m[0]]}–${MONTH_NAMES[m[m.length - 1]]}`; };
const pct = (x: number) => `${(100 * x).toFixed(x < 0.01 ? 2 : 1)}%`;

/** Share of a state's eBird records in the season's months belonging to the species, vs. its share across the year. */
function seasonShare(stateSlug: string, birdSlug: string, season: string) {
  const d = getStateOccurrences(stateSlug); if (!d) return null;
  const b = d.birds.find((x) => x.slug === birdSlug); if (!b) return null;
  const months = SEASON_MONTHS[season];
  const seasonRecords = months.reduce((n, m) => n + b.months[m], 0);
  const seasonTotal = months.reduce((n, m) => n + d.totalByMonth[m], 0);
  return { state: stateSlug, name: stateName(stateSlug), seasonRecords, seasonShare: seasonTotal ? seasonRecords / seasonTotal : 0, yearShare: d.totalRecords ? b.total / d.totalRecords : 0 };
}

/** One species across the nine states in one season. */
export function SeasonSpeciesData({ season, birdSlug, birdName }: { season: string; birdSlug: string; birdName: string }) {
  const rows = DATA_STATES.map((st) => seasonShare(st, birdSlug, season)).filter((r): r is NonNullable<typeof r> => r !== null && r.seasonRecords >= 200 && r.seasonShare >= 0.0005).sort((a, b) => b.seasonShare - a.seasonShare);
  if (rows.length === 0) return null;
  const up = rows.filter((r) => r.seasonShare > r.yearShare * 1.1);
  const top = rows[0];
  return (
    <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
      <div className="loc-section-header"><h2>eBird records by state: {birdName}, {monthLabel(season)}</h2></div>
      <div className="prose">
        <p>
          In {monthLabel(season)} the {birdName} makes up the largest share of eBird records in {top.name} ({pct(top.seasonShare)} of all records, against {pct(top.yearShare)} across the year).
          {up.length > 0 ? ` The season raises its share above the annual figure in ${up.map((r) => r.name).join(", ")}.` : " In no state does the season raise its share above the annual figure — this is a bird seen in every month."}
          {" "}Records are eBird checklists reported 2020–2024 and retrieved through GBIF.
        </p>
        <div className="loc-bird-grid">
          {rows.map((r) => (
            <Link key={r.state} href={`/birds-by-location/${r.state}/${birdSlug}`} className="loc-bird-card" style={{ textDecoration: "none" }}>
              <span className="loc-bird-name">{r.name}</span>
              <span className="loc-bird-status">{pct(r.seasonShare)} of {season} records</span>
              <span className="loc-bird-meta">{r.seasonRecords.toLocaleString("en-US")} records · {pct(r.yearShare)} year-round</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The species most concentrated in the season, per state. */
export function SeasonTopBirds({ season }: { season: string }) {
  const months = SEASON_MONTHS[season];
  const states = DATA_STATES.map((st) => {
    const d = getStateOccurrences(st); if (!d) return null;
    const seasonTotal = months.reduce((n, m) => n + d.totalByMonth[m], 0);
    const rows = d.birds.filter((b) => b.slug && b.total >= 500).map((b) => {
      const s = months.reduce((n, m) => n + b.months[m], 0);
      return { slug: b.slug as string, name: b.commonName, records: s, share: seasonTotal ? s / seasonTotal : 0, ratio: b.total ? (s / seasonTotal) / (b.total / d.totalRecords) : 0 };
    }).filter((r) => r.records >= 100).sort((a, b) => b.ratio - a.ratio).slice(0, 4);
    return { state: st, name: stateName(st), rows };
  }).filter((s): s is NonNullable<typeof s> => s !== null);
  return (
    <section className="loc-section loc-prose" style={{ background: "var(--green-light)" }}>
      <div className="loc-section-header"><h2>The most seasonal {season} birds by state, from eBird</h2></div>
      <div className="prose">
        <p>For each state with eBird data on this site, these are the backyard species whose share of {monthLabel(season)} records rises most above their year-round share — the birds that are most a {season} bird there. Records are eBird checklists reported 2020–2024, retrieved through GBIF.</p>
        {states.map((s) => (
          <p key={s.state}>
            <strong>{s.name}:</strong>{" "}
            {s.rows.map((r, i) => (
              <span key={r.slug}>{i > 0 && ", "}<Link href={`/birds-by-location/${s.state}/${r.slug}`}>{r.name}</Link> ({r.ratio.toFixed(1)}× its annual share)</span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
