import Link from "next/link";

export function Header() {
  return <header className="site-header">
    <Link className="brand" href="/"><span className="brand-mark">a</span><span>attract<strong>birds</strong><small>.app</small></span></Link>
    <nav aria-label="Primary navigation"><Link href="/birds">Birds</Link><Link href="/plants/attract-hummingbirds">Plants</Link><Link href="/feeders/platform-feeder">Feeders</Link><Link href="/bird-problems/no-birds-at-feeder">Bird problems</Link></nav>
    <Link className="header-cta" href="/#planner">Plan my yard <span>→</span></Link>
  </header>;
}
