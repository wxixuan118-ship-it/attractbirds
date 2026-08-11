"use client";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Bird Encyclopedia", href: "/birds" },
  { label: "By Location", href: "/birds-by-location" },
  { label: "Seasonal Birds", href: "/birds/seasonal" },
  { label: "Plants", href: "/plants/attract-hummingbirds" },
  { label: "Feeders", href: "/feeders/platform-feeder" },
  { label: "Problems", href: "/bird-problems/no-birds-at-feeder" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="brand" href="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 3 6 3 10c0 2.5 1.5 4.5 3.5 5.5L4 22l4-2 2 2 2-2 2 2 4-2-2.5-6.5C17.5 14.5 19 12.5 19 10c0-4-3.5-8-7-8z"/><circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/></svg>
        </span>
        <span>Bird<strong>GardenAI</strong></span>
      </Link>

      <nav className="main-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <Link href={item.href} className="nav-link" key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-right">
        <Link className="header-cta" href="/#planner">Plan My Garden</Link>
        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {nav.map((item) => (
            <Link href={item.href} className="mobile-nav-link" key={item.label} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="header-cta mobile-cta" href="/#planner" onClick={() => setOpen(false)}>
            Plan My Garden →
          </Link>
        </div>
      )}
    </header>
  );
}
