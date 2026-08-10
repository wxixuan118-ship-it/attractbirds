import Link from "next/link";

export function Footer() {
  return <footer className="site-footer">
    <div><Link className="brand brand-footer" href="/"><span className="brand-mark">a</span><span>attract<strong>birds</strong><small>.app</small></span></Link><p>Build a healthier backyard habitat, one thoughtful choice at a time.</p></div>
    <div className="footer-links"><div><strong>Explore</strong><Link href="/birds">Birds</Link><Link href="/birds/california">Birds by location</Link><Link href="/plants/attract-hummingbirds">Plants</Link></div><div><strong>Get help</strong><Link href="/bird-problems/no-birds-at-feeder">Bird problems</Link><Link href="/#planner">Backyard planner</Link><Link href="/feeders/platform-feeder">Feeder guide</Link></div></div>
    <div className="footer-bottom"><span>© 2026 AttractBirds.app</span><span>Made for birds, backed by better habitat.</span></div>
  </footer>;
}
