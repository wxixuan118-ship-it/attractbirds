"use client";
import { useState } from "react";
import { getSeasonalPattern, isEarlyMigrant, monthlyPresence, stateClimate } from "../../../data/bird-seasonality";

export type FinderBird = { slug: string; name: string; href?: string };
export type FinderState = { slug: string; name: string };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type Hit = FinderBird & { note?: string };

function classify(birds: FinderBird[], state: string, month: number) {
  const climate = stateClimate(state);
  const groups = { resident: [] as Hit[], seasonal: [] as Hit[], migrant: [] as Hit[], next: [] as Hit[] };
  for (const bird of birds) {
    const pattern = getSeasonalPattern(bird.slug, state);
    if (!pattern || pattern === "absent") continue;
    if (pattern === "resident") { groups.resident.push(bird); continue; }
    const year = monthlyPresence(pattern, climate, isEarlyMigrant(bird.slug));
    const now = year[month];
    const next = year[(month + 1) % 12];
    if (now.status === "seasonal") {
      const season = pattern === "summer" ? "Summer visitor" : pattern === "winter" ? "Winter visitor" : "Migrant";
      const note = now.arrives ? `${season} · arriving` : now.departs ? `${season} · leaving` : season;
      (pattern === "migrant" ? groups.migrant : groups.seasonal).push({ ...bird, note });
    } else if (next.status === "seasonal") {
      groups.next.push({ ...bird, note: pattern === "summer" ? "Summer visitor" : pattern === "winter" ? "Winter visitor" : "Migrant" });
    }
  }
  return groups;
}

function BirdList({ title, intro, birds }: { title: string; intro: string; birds: Hit[] }) {
  if (birds.length === 0) return null;
  return (
    <div className="finder-group">
      <h3>{title} <span>{birds.length}</span></h3>
      <p>{intro}</p>
      <ul className="finder-list">
        {birds.map((b) => (
          <li key={b.slug}>
            {b.href ? <a href={b.href}>{b.name}</a> : <span>{b.name}</span>}
            {b.note && <small>{b.note}</small>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BirdFinder({ birds, states }: { birds: FinderBird[]; states: FinderState[] }) {
  const [state, setState] = useState("");
  const [monthChoice, setMonthChoice] = useState("now");
  // Resolved only after the visitor picks a state, so the server render never depends on today's date.
  const month = monthChoice === "now" ? new Date().getMonth() : Number(monthChoice);
  const stateName = states.find((s) => s.slug === state)?.name;
  const groups = state ? classify(birds, state, month) : null;
  const total = groups ? groups.resident.length + groups.seasonal.length + groups.migrant.length : 0;

  return (
    <div className="calculator finder">
      <label>Your state
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Choose a state…</option>
          {states.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </label>
      <label>Month
        <select value={monthChoice} onChange={(e) => setMonthChoice(e.target.value)}>
          <option value="now">This month</option>
          {MONTHS.map((m, i) => <option key={m} value={String(i)}>{m}</option>)}
        </select>
      </label>
      <div className="calculator-result" aria-live="polite">
        {!groups || !stateName ? (
          <>
            <small>Backyard birds near you</small>
            <strong>Choose your state to see the list</strong>
            <p>About a hundred common backyard species, sorted into year-round residents, seasonal visitors and migrants for the month you pick.</p>
          </>
        ) : (
          <>
            <small>{stateName} · {MONTHS[month]}</small>
            <strong>{total} common backyard birds to expect</strong>
            <BirdList title="Year-round residents" intro="Present every month — the core of your feeder flock." birds={groups.resident} />
            <BirdList title="Seasonal visitors" intro="Here this month for the breeding season or the winter." birds={groups.seasonal} />
            <BirdList title="Passing through" intro="Migrants that stop over in spring or fall." birds={groups.migrant} />
            <BirdList title={`Arriving in ${MONTHS[(month + 1) % 12]}`} intro="Not here yet — get feeders and nectar ready." birds={groups.next} />
            <p><a href={`/birds-by-location/${state}`}>See eBird-ranked birds for {stateName} →</a></p>
          </>
        )}
      </div>
    </div>
  );
}
