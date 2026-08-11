"use client";

import Link from "next/link";
import { useState } from "react";
import { US_STATES_DATA, REGIONS } from "../../data/us-states-data";

/**
 * Tile-grid US Map — each state is a clickable tile arranged to
 * approximate its geographic position. This approach is:
 *  - Lightweight (no heavy SVG path data / map libraries)
 *  - Mobile-friendly (consistent touch targets)
 *  - Accessible (semantic buttons, keyboard navigable)
 *  - SEO-friendly (state names are real text links)
 */
export function USMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Grid dimensions
  const maxCol = 12;
  const maxRow = 9;

  const tiles = US_STATES_DATA.map((s) => {
    const isHovered = hovered === s.slug;
    return {
      ...s,
      isHovered,
    };
  });

  return (
    <div className="us-map-wrapper">
      {/* Tooltip / label */}
      <div className="us-map-label" aria-live="polite">
        {hovered ? (
          <span>{STATE_BY_SLUG_LABEL(hovered)}</span>
        ) : (
          <span className="us-map-label-hint">Hover or tap a state to explore birds in your area</span>
        )}
      </div>

      {/* Tile grid */}
      <div
        className="us-map-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
          gridTemplateRows: `repeat(${maxRow}, 1fr)`,
          gap: "4px",
          aspectRatio: "12 / 9",
        }}
        role="group"
        aria-label="Interactive map of United States — select a state to see local birds"
      >
        {tiles.map((s) => (
          <Link
            key={s.slug}
            href={`/birds-by-location/${s.slug}`}
            className={`us-map-tile ${s.isHovered ? "tile-hovered" : ""}`}
            style={{
              gridColumn: `${s.gridCol + 1} / span 1`,
              gridRow: `${s.gridRow + 1} / span 1`,
            }}
            onMouseEnter={() => setHovered(s.slug)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(s.slug)}
            onBlur={() => setHovered(null)}
            aria-label={`Birds in ${s.name}`}
          >
            <span className="tile-abbr">{s.abbr}</span>
          </Link>
        ))}
      </div>

      {/* Legend */}
      <div className="us-map-legend">
        {(Object.entries(REGIONS) as [string, typeof US_STATES_DATA][]).map(([region, states]) => (
          <div key={region} className="legend-item">
            <span className={`legend-dot dot-${region.toLowerCase()}`} />
            <span>{region}</span>
            <small>{states.length} states</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function STATE_BY_SLUG_LABEL(slug: string): string {
  const state = US_STATES_DATA.find((s) => s.slug === slug);
  return state ? `${state.name} — ${state.speciesCount}+ bird species` : slug;
}
