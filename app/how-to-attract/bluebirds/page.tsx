import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SITE, URL_REGISTRY } from "../../../lib/url-registry";

const canonicalPath = "/how-to-attract/bluebirds";

export const metadata: Metadata = {
  title: "How to Attract Bluebirds: Food, Houses & Habitat",
  description: "Learn how to attract bluebirds with mealworms, native berry plants, clean water, open habitat, and a properly placed bluebird house with predator protection.",
  keywords: ["how to attract bluebirds", "how to attract bluebirds to your yard", "how to attract bluebirds to a bluebird house", "what attracts bluebirds", "bluebird food", "bluebird nest box"],
  alternates: { canonical: canonicalPath },
  robots: { index: true, follow: true },
  openGraph: {
    title: "How to Attract Bluebirds to Your Yard",
    description: "A habitat-first guide to bluebird food, nest boxes, native plants, water, and predator protection.",
    url: canonicalPath,
    type: "article",
  },
};

const steps = [
  { title: "Identify the bluebird species in your region", text: "Confirm whether Eastern, Western, or Mountain Bluebirds occur locally and in which seasons before choosing habitat, food, or a nest-box plan." },
  { title: "Create open, insect-rich hunting habitat", text: "Maintain pesticide-free open ground with scattered trees, fence posts, or other safe perches from which bluebirds can watch for insects." },
  { title: "Add native berry-producing plants", text: "Choose locally native serviceberries, dogwoods, hollies, sumacs, or other appropriate fruiting plants that can support bluebirds when insects are scarce." },
  { title: "Offer mealworms in a bluebird-friendly feeder", text: "Use a shallow dish, cup, cage, or hopper-style setup that contains the worms and limits access by larger birds. Start with a small amount and keep the feeder clean." },
  { title: "Install and protect the right bluebird house", text: "Use a monitored nest box designed for the local bluebird species, with drainage, ventilation, no exterior perch, a pole mount, and effective predator protection." },
  { title: "Provide clean, easy-to-find water", text: "Use a shallow bird bath and refresh it frequently. Gentle movement from a dripper can improve visibility, but moving water still requires cleaning." },
];

const faq = [
  { q: "What is the best way to attract bluebirds?", a: "Combine open insect-rich habitat, locally native berry plants, clean shallow water, a correctly designed and protected nest box, and small portions of mealworms. First confirm which bluebird species occurs in your region." },
  { q: "What food attracts bluebirds?", a: "Bluebirds naturally eat many insects and shift toward fruit when insects are less available. Mealworms can be offered as supplemental food; some individuals also take hulled sunflower pieces, suet products, or small fruit portions." },
  { q: "How do I attract bluebirds to a bluebird house?", a: "Place a species-appropriate box in suitable open habitat, mount it securely on a pole, omit the exterior perch, provide drainage and ventilation, add predator protection, and monitor it according to a recognized bluebird or NestWatch protocol." },
  { q: "Do bluebirds eat regular bird seed?", a: "Bluebirds are primarily insect and fruit eaters, so ordinary seed mixes are not the main attraction. Some may eat hulled sunflower pieces, but habitat, insects, berries, water, and nest cavities are more important." },
  { q: "How long does it take bluebirds to find a yard or nest box?", a: "There is no guaranteed timeline. Local range, season, habitat, competition, box placement, predators, and the availability of natural cavities all influence discovery and use." },
];

export default function BluebirdAttractionGuide() {
  return <div><Header/><main className="content-main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", name: "How to attract bluebirds to your yard", description: metadata.description, mainEntityOfPage: `${SITE.origin}${canonicalPath}`, step: steps.map((step) => ({ "@type": "HowToStep", name: step.title, text: step.text })) }) }}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }}/>
    <div className="breadcrumb"><Link href="/">Home</Link> / <Link href={URL_REGISTRY.howTo.hub}>How to attract birds</Link> / <Link href="/how-to-attract/species">Species guides</Link> / Bluebirds</div>

    <section className="content-hero"><div><p className="eyebrow"><span/> Bluebird attraction guide</p><h1>How to attract bluebirds<br/><em>and keep them returning.</em></h1><p className="lede">Give bluebirds the landscape they are built to use: open insect-rich hunting space, native berries, clean water, safe perches, and a protected cavity for nesting. Mealworms can help them discover the site, but habitat is what makes it useful.</p></div><aside className="fact-panel"><div><small>Best habitat</small><strong>Open ground + scattered trees</strong></div><div><small>Supplemental food</small><strong>Mealworms</strong></div><div><small>Nesting</small><strong>Protected cavity box</strong></div></aside></section>

    <div className="content-grid">
      <section className="info-block wide"><small className="step-number">01</small><h2>Which bluebird are you trying to attract?</h2><p>North America has Eastern, Western, and Mountain Bluebirds, and their ranges overlap only in some places. Eastern Bluebirds occupy much of the area east of the Rockies; Western Bluebirds occur mainly in western open woodland; Mountain Bluebirds favor open country, meadows, and prairie landscapes in the West.</p><p>Check current local observations before buying food or installing a house. The right entrance dimensions, habitat, breeding season, and monitoring plan depend on the species and region.</p></section>

      <section className="info-block"><small className="step-number">02</small><h2>Create the open habitat bluebirds use for hunting</h2><p>Bluebirds often hunt from a low perch, dropping to open ground for beetles, caterpillars, spiders, and other invertebrates. A useful yard combines short or open vegetation with scattered trees, shrubs, posts, or safe fence lines.</p><ul><li>Avoid broad-spectrum lawn pesticides</li><li>Preserve insect habitat and some leaf litter near edges</li><li>Keep large open sight lines around feeding and nesting areas</li></ul></section>

      <section className="info-block"><small className="step-number">03</small><h2>Plant native berries for fall and winter bluebirds</h2><p>When insects become less available, bluebirds rely more heavily on fruit. Depending on your region and site, locally native serviceberries, dogwoods, hollies, sumacs, or other fruiting shrubs and small trees can extend the yard’s value beyond nesting season.</p><p>Verify local nativity, mature size, soil, moisture, and invasiveness before planting. Do not plant a species solely because its fruit appears on a generic bird list.</p></section>

      <section className="info-block"><small className="step-number">04</small><h2>What food attracts bluebirds to a feeder?</h2><p>Mealworms are the most direct supplemental food. Offer a small portion in a smooth-sided cup, shallow dish, cage feeder, or hopper-style feeder that prevents worms from escaping and reduces takeover by larger birds.</p><ul><li>Live mealworms provide more moisture than freeze-dried worms</li><li>Keep portions modest; mealworms are supplemental, not a complete diet</li><li>Remove spoiled food and wash the feeder regularly</li><li>Some bluebirds also sample hulled sunflower pieces, suet, or small fruit portions</li></ul></section>

      <section className="info-block"><small className="step-number">05</small><h2>How to attract bluebirds to a bluebird house</h2><p>All three bluebird species are cavity nesters and may use a correctly designed artificial box. Use a current plan for the target species, with appropriate internal dimensions and entrance size, drainage in the floor, ventilation near the top, and a panel that opens for monitoring and cleaning.</p><p>Do not add an exterior perch. Mount the box on a pole rather than directly on a tree where practical, and install a predator guard suited to local snakes, raccoons, squirrels, and other threats.</p></section>

      <section className="info-block"><small className="step-number">06</small><h2>Choose a safe nest-box location and spacing</h2><p>Place the house beside suitable open foraging habitat rather than inside dense woods. Face the entrance away from the strongest prevailing weather and excessive afternoon heat; local bluebird organizations can advise on regional orientation.</p><p>Bluebirds are territorial. If installing multiple boxes, follow current local spacing guidance. Where Tree Swallows compete for cavities, paired boxes may help, but only when installed and monitored using a recognized local protocol.</p></section>

      <section className="info-block"><small className="step-number">07</small><h2>Add clean water bluebirds can see</h2><p>A shallow bath can serve bluebirds year-round. Place it where birds have a clear view of danger and nearby branches for preening, without dense cover that allows cats to ambush them. A dripper or gentle fountain may make the water easier to discover.</p><p>Moving water is not self-cleaning. Refresh it every day or two, scrub away droppings and algae, and keep cats indoors.</p></section>

      <section className="info-block"><small className="step-number">08</small><h2>Monitor bluebird houses without harming the nest</h2><p>Use a recognized monitoring protocol such as NestWatch or guidance from a local bluebird society. Record nest building, eggs, hatch dates, and fledging from brief, appropriately timed checks.</p><ul><li>Never casually relocate an active nest</li><li>Do not open a box during dangerous weather or close to fledging</li><li>Address invasive House Sparrow occupation only through lawful, expert guidance</li><li>Clean the empty box at the recommended time for your region</li></ul></section>

      <section className="info-block wide safety-note"><h2>Common mistakes that keep bluebirds away</h2><p>The most common problems are choosing a location outside current bluebird range, putting a box in dense habitat, using the wrong entrance dimensions, adding a perch, skipping predator protection, applying lawn pesticides, allowing mealworms to spoil, and failing to monitor the box. Change one factor at a time and never use call playback to force a visit.</p></section>

      <section className="info-block wide"><h2>Bluebird attraction checklist</h2><ul><li>Confirm Eastern, Western, or Mountain Bluebirds occur locally</li><li>Preserve open pesticide-free hunting habitat</li><li>Add regionally native berry-producing plants</li><li>Offer a small clean portion of mealworms if appropriate</li><li>Install a species-correct, ventilated, draining nest box with no perch</li><li>Use a pole mount and effective predator guard</li><li>Add shallow clean water and maintain it frequently</li><li>Monitor the box using a recognized protocol</li></ul></section>

      <section className="info-block wide"><h2>Frequently asked questions</h2>{faq.map((item) => <div key={item.q}><h3>{item.q}</h3><p>{item.a}</p></div>)}</section>

      <section className="info-block wide"><h2>Sources and further reading</h2><p>This guide synthesizes and rewrites practical themes from the following resources, with added habitat-first and safety context:</p><ul><li><a href="https://www.audubon.org/magazine/3-easy-ways-attract-bluebirds-your-home-and-keep-them-around" target="_blank" rel="noreferrer">Audubon: 3 Easy Ways to Attract Bluebirds to Your Home</a></li><li><a href="https://www.wbu.com/birds/bluebirds/" target="_blank" rel="noreferrer">Wild Birds Unlimited: All About Bluebirds and How to Attract Them</a></li><li><a href="https://wildbirdstore.com/resources/attracting-specific-birds/attracting-bluebirds/" target="_blank" rel="noreferrer">All Seasons Wild Bird Store: Attracting Bluebirds</a></li></ul><div className="chip-list"><Link href="/how-to-attract/species">More species attraction guides</Link><Link href="/how-to-attract/birds-to-a-birdhouse">How to attract birds to a birdhouse</Link><Link href="/plants">Bird-friendly plants</Link></div></section>
    </div>
  </main><Footer/></div>;
}
