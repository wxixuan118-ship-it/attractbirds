import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getPublishedBirds } from "../../lib/bird-repository";

export const metadata: Metadata = { title: "Backyard Bird Encyclopedia", description: "Identify backyard birds and learn how to attract them with suitable food, plants, feeders, and shelter." };

export default async function BirdsPage() { const birds=await getPublishedBirds(); return <div><Header /><main className="content-main"><p className="eyebrow"><span /> Bird encyclopedia</p><div className="section-heading"><h1 style={{fontFamily:"Georgia,serif",fontWeight:400,fontSize:"clamp(54px,7vw,90px)",letterSpacing:"-4px",lineHeight:.95}}>Know the birds<br />outside your window.</h1><p className="lede">Explore {birds.length} reviewed backyard bird profiles, with practical food, plant, feeder, and habitat guidance.</p></div><div className="index-grid">{birds.map(bird=><Link className="index-card" href={`/birds/${bird.slug}`} key={bird.slug}><small>{bird.scientificName}</small><h2>{bird.commonName}</h2><p>{bird.summary.slice(0,145)}…</p><span>View bird profile →</span></Link>)}<Link className="index-card" href="/birds/california"><small>Birds by location</small><h2>California backyard birds</h2><p>Meet common year-round residents and seasonal visitors, then plan a habitat for your part of the state.</p><span>Explore California →</span></Link></div></main><Footer /></div>; }
