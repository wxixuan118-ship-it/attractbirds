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
    { label: "All Tools", href: URL_REGISTRY.tools.hub },
    { label: "Backyard Bird Finder", href: URL_REGISTRY.tools.birdFinder },
    { label: "Nectar Calculator", href: URL_REGISTRY.tools.nectarCalculator },
    { label: "Feeder Planner", href: URL_REGISTRY.tools.feederCalculator },
    { label: "How to Attract Birds", href: URL_REGISTRY.howTo.hub },
    { label: "Species Attraction Guides", href: "/how-to-attract/species" },
  ],
};

// Partner badges render on the homepage only, so directory backlinks are not repeated site-wide.
export function Footer({ showPartners = false }: { showPartners?: boolean }) {
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
        {showPartners && (
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
            <a href="https://www.indietools.app/products/attract-birds-to-your-backyard-plants-feeders-water" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.indietools.app/badges/listed-on-indietools-light.png"
                alt="Listed on IndieTools"
                width={176}
                height={56}
                loading="lazy"
              />
            </a>
            <a href="https://awesomeindie.com/?ref=badge" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://awesomeindie.com/images/badges/awesome-indie-launching-soon-light.svg"
                alt="AttractBirds.app — Launching soon on Awesome Indie"
                width={184}
                height={54}
                loading="lazy"
              />
            </a>
            <a href="https://acidtools.com/ai/attractbirds" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://acidtools.com/assets/images/badge.png"
                alt="Acid Tools"
                height={54}
                loading="lazy"
              />
            </a>
            {/* Markup kept identical to Aura++'s snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://auraplusplus.com/projects/attractbirds-backyard-planning" target="_blank" rel="noopener" title="View this project on Aura++">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://auraplusplus.com/images/badges/featured-on-light.svg"
                alt="Featured on Aura++"
                width={265}
                height={58}
              />
            </a>
            {/* Markup kept identical to DailyPings' snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://dailypings.com/p/attract-birds-to-your-backyard-plants-feeders-water" target="_blank" rel="noopener" title="Featured on DailyPings">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://dailypings.com/badge.svg"
                alt="Featured on DailyPings"
                width={179}
                height={32}
              />
            </a>
            {/* Markup kept identical to DodoDirectory's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://dododirectory.com" target="_blank" rel="dofollow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://dododirectory.com/badge-light.png"
                alt="Featured on DodoDirectory"
                width={200}
                height={54}
              />
            </a>
            {/* Markup kept identical to FoundrList's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://www.foundrlist.com/product/attractbirds?utm_source=badge&utm_medium=embed" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.foundrlist.com/api/badge/attractbirds"
                alt="Featured on FoundrList"
                width={150}
                height={48}
              />
            </a>
            {/* Markup kept identical to EarlyHunt's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://earlyhunt.com/project/attract-birds-to-your-backyard" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://earlyhunt.com/badges/earlyhunt-badge-light.svg"
                alt="Featured on EarlyHunt"
                width={265}
                height={58}
              />
            </a>
            {/* Markup kept identical to NxGn Tools' snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://www.nxgntools.com/tools/attractbirds-app?utm_source=attractbirds-app" target="_blank" rel="noopener" style={{ display: "inline-block", width: "auto" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.nxgntools.com/api/embed/attractbirds-app?type=LAUNCHING_SOON_ON"
                alt="Launching soon on NxGn Tools"
                style={{ height: "48px", width: "auto" }}
              />
            </a>
            {/* Markup kept identical to Pro Launch's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://prolaunch.net" target="_blank" title="Pro Launch Featured Badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://prolaunch.net/images/badges/featured-light.svg"
                alt="Pro Launch Featured Badge"
                style={{ width: "240px", height: "auto" }}
              />
            </a>
            {/* Markup kept identical to Unite List's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a target="_blank" href="https://unitelist.com/product/attractbirds">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://unitelist.com/assets/images/badge.png"
                alt="Unite List"
                height={54}
                loading="lazy"
              />
            </a>
            {/* Markup kept identical to Uno Directory's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://uno.directory" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://uno.directory/uno-directory.svg"
                alt="Listed on Uno Directory"
                width={120}
                height={30}
              />
            </a>
            {/* Markup kept identical to Twelve Tools' snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://twelve.tools" target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://twelve.tools/badge1-light.svg"
                alt="Featured on Twelve Tools"
                width={148}
                height={40}
              />
            </a>
            {/* Markup kept identical to Startup Fame's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://startupfa.me/s/attractbirds?utm_source=attractbirds.app" target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://startupfa.me/badges/featured-badge-small.webp"
                alt="AttractBirds - Featured on Startup Fame"
                width={224}
                height={36}
              />
            </a>
            {/* Markup kept identical to TinyLaunch's snippet so their badge verifier can match it. */}
            <a href="https://tinylaunch.com" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://tinylaunch.com/tinylaunch_badge_launching_soon.svg"
                alt="TinyLaunch Badge"
                style={{ width: "202px", height: "auto" }}
              />
            </a>
            {/* Markup kept identical to Whatsthebigdata's snippet so their badge verifier can match it. */}
            <a href="https://whatsthebigdata.com/ai-tools/" target="_blank" rel="noopener" title="Whatsthebigdata AI Tools Directory">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://whatsthebigdata.com/badges/featured-on-whatsthebigdata-color.png"
                alt="Featured on Whatsthebigdata"
                width={240}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </a>
            {/* Markup kept identical to LaunchIgniter's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://launchigniter.com/product/attractbirds?ref=badge-attractbirds" target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://launchigniter.com/api/badge/attractbirds?theme=light"
                alt="Featured on LaunchIgniter"
                width={212}
                height={55}
              />
            </a>
            {/* Markup kept identical to Turbo0's snippet so their badge verifier can match it. */}
            <a href="https://turbo0.com/item/attractbirdsapp" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.turbo0.com/badge-listed-light.svg"
                alt="Listed on Turbo0"
                style={{ height: "54px", width: "auto" }}
              />
            </a>
            {/* Markup kept identical to Fazier's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://fazier.com/launches/attractbirds.app" target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light"
                width={120}
                alt="Fazier badge"
              />
            </a>
            {/* Markup kept identical to Launch Streak's snippet so their badge verifier can match it. */}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://launchstreak.dev/education/attractbirds" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://launchstreak.dev/badge/launch-streak-badge-light.svg"
                alt="Launched on Launch Streak"
                width={248}
                height={68}
              />
            </a>
          </div>
        </div>
        )}
        <div className="footer-bottom">
          <span>© 2026 {SITE.brand}. All rights reserved.</span>
          <span>Built for birds. Backed by science.</span>
        </div>
      </div>
    </footer>
  );
}
