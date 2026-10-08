import Link from "next/link";
import { US_STATES_DATA } from "../../data/us-states-data";
import { OCCURRENCE_STATES } from "../../lib/occurrence-data";
import { URL_REGISTRY } from "../../lib/url-registry";

/** [column, row] of each state on a 12 × 8 tile-grid map of the U.S. */
const TILES: Record<string, [number, number]> = {
  AK: [1, 1], ME: [12, 1],
  WI: [7, 2], VT: [11, 2], NH: [12, 2],
  WA: [2, 3], ID: [3, 3], MT: [4, 3], ND: [5, 3], MN: [6, 3], IL: [7, 3], MI: [8, 3], NY: [10, 3], MA: [11, 3],
  OR: [2, 4], NV: [3, 4], WY: [4, 4], SD: [5, 4], IA: [6, 4], IN: [7, 4], OH: [8, 4], PA: [9, 4], NJ: [10, 4], CT: [11, 4], RI: [12, 4],
  CA: [2, 5], UT: [3, 5], CO: [4, 5], NE: [5, 5], MO: [6, 5], KY: [7, 5], WV: [8, 5], VA: [9, 5], MD: [10, 5], DE: [11, 5],
  AZ: [3, 6], NM: [4, 6], KS: [5, 6], AR: [6, 6], TN: [7, 6], NC: [8, 6], SC: [9, 6],
  OK: [5, 7], LA: [6, 7], MS: [7, 7], AL: [8, 7], GA: [9, 7],
  HI: [1, 8], TX: [5, 8], FL: [10, 8],
};

/** Every state as a linked tile; states ranked from eBird records are filled. */
export function StateTileMap() {
  return (
    <div className="state-tile-map">
      {US_STATES_DATA.map((state) => {
        const [col, row] = TILES[state.abbr];
        const ranked = OCCURRENCE_STATES.includes(state.slug);
        return (
          <Link
            key={state.slug}
            href={URL_REGISTRY.locations.state(state.slug)}
            title={`Birds in ${state.name}`}
            aria-label={`Birds in ${state.name}`}
            className={ranked ? "state-tile is-ranked" : "state-tile"}
            style={{ gridColumn: col, gridRow: row }}
          >
            {state.abbr}
          </Link>
        );
      })}
    </div>
  );
}
