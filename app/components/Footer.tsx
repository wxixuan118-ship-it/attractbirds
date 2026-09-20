import Link from "next/link";
import { SITE, URL_REGISTRY } from "../../lib/url-registry";

const links = {
  Birds: [
    { label: "Bird Encyclopedia", href: "/birds" },
    { label: "By Location", href: "/birds-by-location" },
    { label: "Seasonal Birds", href: "/seasonal-birds" },
    { label: "Attraction Guides", href: "/birds" },
  ],
  Garden: [
    { label: "Bird-Friendly Plants", href: "/plants" },
    { label: "Feeder Guide", href: "/feeders" },
    { label: "Water Sources", href: "/#planner" },
    { label: "Nesting & Shelter", href: "/birds" },
    { label: "Bird Food Guide", href: "/bird-food" },
  ],
  Tools: [
    { label: "AI Yard Planner", href: "/#planner" },
    { label: "Problem Diagnosis", href: "/bird-problems/no-birds-at-feeder" },
    { label: "Species Identifier", href: "/birds" },
    { label: "Seasonal Calendar", href: "/seasonal-birds" },
    { label: "Feeder Planner", href: "/tools/bird-feeder-calculator" },
    { label: "How to Attract Birds", href: URL_REGISTRY.howTo.hub },
    { label: "Species Attraction Guides", href: "/how-to-attract/species" },
  ],
};

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" href="/" style={{ color: "white" }}>
              <span className="brand-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 3 6 3 10c0 2.5 1.5 4.5 3.5 5.5L4 22l4-2 2 2 2-2 2 2 4-2-2.5-6.5C17.5 14.5 19 12.5 19 10c0-4-3.5-8-7-8z"/><circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"/></svg>
              </span>
              <span>{SITE.brand}</span>
            </Link>
            <p>Build a bird-friendly backyard — personalized for where you live, what you have, and which birds you love.</p>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div className="footer-col" key={section}>
              <h4>{section}</h4>
              {items.map((item) => (
                <Link href={item.href} key={item.label}>{item.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-partners">
          <h4>Partners</h4>
          <div className="footer-partners-badges">
            <a href="https://best-ai.org" target="_blank" rel="dofollow noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://best-ai.org/images/badge-best-ai-org.png"
                srcSet="https://best-ai.org/images/badge-best-ai-org.png 1x, https://best-ai.org/images/badge-best-ai-org@2x.png 2x"
                alt="Listed on Best-AI.org"
                width={200}
                height={48}
                loading="lazy"
              />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {SITE.brand}. All rights reserved.</span>
          <span>Built for birds. Backed by science.</span>
        </div>
      </div>
    </footer>
  );
}
