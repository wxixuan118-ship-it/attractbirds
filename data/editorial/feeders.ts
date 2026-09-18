import type { EditorialContent, EditorialImage } from "./types";
import topicImages from "../topic-images.json";
import groupImages from "../group-images.json";

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const TOPIC = topicImages as Record<string, Img>;
const BIRD = groupImages as Record<string, Img & { species: string }>;
const timg = (key: string, alt: string): EditorialImage | undefined => { const m = TOPIC[key]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };
const bimg = (slug: string, alt: string): EditorialImage | undefined => { const m = BIRD[slug]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };

/**
 * Shared sources. Project FeederWatch (Cornell Lab of Ornithology / Birds
 * Canada) is the primary source for feeder types, foods, placement, cleaning
 * and disease; All About Birds for window collisions and species tips.
 */
const FW = { id: 1, label: "Project FeederWatch (Cornell Lab of Ornithology) — Feeding Birds: feeder types, food types, placement and cleaning", url: "https://feederwatch.org/learn/feeding-birds/" };
const FW_SICK = { id: 2, label: "Project FeederWatch — Sick Birds and Bird Diseases", url: "https://feederwatch.org/learn/sick-birds-and-bird-diseases/" };
const AAB_WINDOWS = { id: 3, label: "All About Birds (Cornell Lab of Ornithology) — Why Birds Hit Windows, and How You Can Help Prevent It", url: "https://www.allaboutbirds.org/news/why-birds-hit-windows-and-how-you-can-help-prevent-it/" };
const aabSpecies = (id: number, slug: string, name: string) => ({ id, label: `All About Birds (Cornell Lab of Ornithology) — ${name}: Overview and Life History`, url: `https://www.allaboutbirds.org/guide/${slug}/overview` });
const EBIRD = (id: number) => ({ id, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); state records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" });

/** Paragraphs every feeder page shares, cited to FeederWatch and All About Birds. */
const CLEANING = "Clean seed and suet feeders regularly — every week or two, and more often during heavy use or wet weather — by scrubbing off debris and washing the parts thoroughly with warm water and dish soap [1]. Hummingbird feeders need cleaning far more often, every couple of days and ideally every time they are refilled; discard the solution and clean immediately at any sign of cloudy water or black mold [1].";
const SICK = "If a sick bird appears — House Finch eye disease shows as red, swollen, runny or crusty eyes, and avian pox as wart-like growths around the eye, bill, legs and feet — remove the feeders the bird is using for a couple of weeks and clean the feeders and the area thoroughly, so disease is not spread at the feeder [2]. Salmonellosis, caused by Salmonella bacteria, is a common cause of mortality in feeder birds and spreads the same way [2].";
const PLACEMENT = "Place feeders close to natural cover such as trees or shrubs, which offer birds refuge from predators, but not so close to strong branches that squirrels can jump across — a distance of about 10 feet is the usual guidance [1]. Windows are the other hazard: collisions kill perhaps a billion or more birds a year in North America, and older rules about safe feeder-to-window distances are no longer thought valid — if a window is near a feeder, treat the glass with markings spaced no more than 2 inches apart, external screens or cords, rather than worrying about the distance [3].";
const SQUIRRELS = "Squirrel baffles — barriers placed between squirrels and feeders — are usually the best defense. Squirrels can jump to feeders placed less than ten feet from a tree or building, so a pole-mounted feeder in the open with a baffle below it, or a tilting baffle at least 18 inches in diameter above a hanging feeder, is the arrangement that works [1].";

const commonFaq = [
  { question: "How often should I clean a bird feeder?", answer: "Every week or two for seed and suet feeders, more often in wet weather or heavy use; every couple of days for hummingbird feeders. Scrub, then wash with warm water and dish soap [1]." },
  { question: "How far should a feeder be from a window?", answer: "Distance rules are no longer considered valid; instead make any nearby window bird-safe with markings spaced no more than 2 inches apart, exterior screens, or hanging cords [3]." },
];

type FeederSpec = { path: string; keyword: string; title: string; description: string; image?: EditorialImage; intro: string[]; sections: { heading: string; paragraphs: string[] }[]; faq: { question: string; answer: string }[]; extraSources?: { id: number; label: string; url: string }[] };

function build(spec: FeederSpec): EditorialContent {
  return {
    path: spec.path,
    keyword: spec.keyword,
    title: spec.title,
    description: spec.description,
    image: spec.image,
    intro: spec.intro,
    sections: [
      ...spec.sections,
      { heading: "Placement, squirrels and windows", paragraphs: [PLACEMENT, SQUIRRELS] },
      { heading: "Keeping the feeder clean and the birds healthy", paragraphs: [CLEANING, SICK] },
    ],
    faq: [...spec.faq, ...commonFaq],
    sources: [FW, FW_SICK, AAB_WINDOWS, ...(spec.extraSources ?? [])],
  };
}

export const feederEditorial: Record<string, EditorialContent> = {
  // ── Feeder types ──────────────────────────────────────────────
  "/feeders/finch-mesh-feeder": build({
    path: "/feeders/finch-mesh-feeder",
    keyword: "finch feeder",
    title: "Finch Feeder Guide: Nyjer, Mesh Socks & Which Finches Come",
    description: "How a finch feeder works: nyjer (thistle) in a mesh sock or fine-port tube, which finches it attracts, why other birds ignore it, and keeping the seed fresh.",
    image: timg("finch-mesh-feeder", "American goldfinch clinging to a finch feeder — a fine-port tube filled with nyjer seed"),
    intro: [
      "A finch feeder is the one feeder that is deliberately hard for most birds to use: a mesh sock or a tube with tiny ports that only small-billed finches can work, filled with nyjer (thistle) or sunflower chips [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch, the Cornell Lab of Ornithology's long-running feeder survey [1][2], and from All About Birds on window safety [3].",
    ],
    sections: [
      {
        heading: "How a finch feeder works",
        paragraphs: [
          "Feeders with short perches accommodate small birds such as finches but exclude larger birds such as grackles and jays [1]. A mesh sock takes that further: there are no perches at all, and finches simply cling to the fabric and pull seed through it. Tube feeders also keep seed fairly dry, which matters with nyjer, a fine seed that clumps and molds when wet [1].",
          "The seed is the point. Nyjer, an imported seed, has become increasingly popular largely because of its ability to attract finches including American Goldfinch, Pine Siskin and Common Redpoll [1]. Black-oil sunflower is the preferred food for a wide variety of birds and is among the favorites of finches too [1], so a second tube with sunflower chips beside the nyjer sock covers both.",
        ],
      },
      {
        heading: "Which finches come to a finch feeder",
        paragraphs: [
          "American Goldfinches are the classic finch-feeder bird; at feeders they prefer nyjer and sunflower, and they do not mind feeders that sway in the wind [4]. House Finches take black-oil sunflower over striped sunflower, along with millet and milo, and once they find a feeder they may bring flocks of 50 or more [5]. In winter, Pine Siskins and — in irruption years — Common Redpolls join them at the same ports [1].",
          "Because House Finches are especially prone to mycoplasmal conjunctivitis, an eye disease spread at feeders, keeping a finch feeder clean is not optional: birds with red, swollen or crusty eyes mean the feeder comes down for a couple of weeks [2].",
        ],
      },
    ],
    faq: [
      { question: "What seed goes in a finch feeder?", answer: "Nyjer (thistle) is the seed that attracts American Goldfinch, Pine Siskin and Common Redpoll; sunflower chips work in fine-port tubes as well [1]." },
      { question: "Why are no finches coming to my nyjer feeder?", answer: "Nyjer goes stale and molds when wet; finches ignore old seed. Replace it, dry the feeder, and keep it out of driving rain [1]." },
    ],
    extraSources: [aabSpecies(4, "American_Goldfinch", "American Goldfinch"), aabSpecies(5, "House_Finch", "House Finch")],
  }),

  "/feeders/ground-feeder": build({
    path: "/feeders/ground-feeder",
    keyword: "ground feeder",
    title: "Ground Feeder Guide: Doves, Sparrows, Juncos & Towhees",
    description: "How a ground feeder or low tray works, which birds only feed on the ground, what to scatter (millet, cracked corn), and keeping it clean and cat-safe.",
    image: timg("ground-feeder", "Mourning dove picking seed from the ground — the classic ground feeder bird"),
    intro: [
      "A ground feeder is either a low tray or simply seed scattered on bare ground, and it serves the birds that never use a hanging feeder: doves, juncos, sparrows and towhees [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Which birds use a ground feeder",
        paragraphs: [
          "Trays attract most species of feeder birds, and placed near the ground they are most likely to attract juncos, doves and sparrows [1]. Song Sparrows, Fox Sparrows and many towhee species will readily eat fallen seed from the ground beneath your feeders [1]. Mourning Doves feed on the ground and in the open, pecking or pushing aside litter rather than scratching, and seeds make up 99 percent of their diet [4].",
        ],
      },
      {
        heading: "What to put in a ground feeder",
        paragraphs: [
          "Millet is a favored food of many smaller ground-foraging birds, and cracked corn attracts doves, quail and sparrows [1]. All About Birds' advice for Mourning Doves is exactly this: scatter seed, particularly millet, on the ground or on platform feeders [4]. Skip milo — it is not a favorite of most birds and the seed often goes to waste [1].",
          "Because the food sits in the open, offer only what is eaten in a day. Wet seed on the ground molds quickly, and a moldy feeding area is where salmonellosis spreads [1][2].",
        ],
      },
      {
        heading: "Ground feeding and cats",
        paragraphs: [
          "Birds that spend much of their time on the ground are particularly vulnerable to prowling cats [4], and cats kill hundreds of millions of birds each year in North America [1]. A ground feeder belongs in an open spot a few feet from cover — close enough for birds to escape a hawk, far enough that a cat cannot ambush from it — and only in a yard where cats stay indoors.",
        ],
      },
    ],
    faq: [
      { question: "What birds eat from the ground?", answer: "Mourning Doves, Dark-eyed Juncos, Song, Fox and other sparrows, and towhees are the regular ground feeders; cardinals and robins take ground food too [1][4]." },
      { question: "What seed should I scatter on the ground?", answer: "Millet for small ground-foraging birds and cracked corn for doves, quail and sparrows; avoid milo, which mostly goes to waste [1]." },
    ],
    extraSources: [aabSpecies(4, "Mourning_Dove", "Mourning Dove")],
  }),

  "/feeders/peanut-feeder": build({
    path: "/feeders/peanut-feeder",
    keyword: "peanut feeder",
    title: "Peanut Feeder Guide: Jays, Woodpeckers, Chickadees & Titmice",
    description: "How a peanut feeder works, whole vs shelled peanuts, which birds take them (jays, woodpeckers, chickadees, nuthatches, titmice), and keeping peanuts mold-free.",
    image: timg("peanut-feeder", "Blue jay grabbing a peanut from a peanut feeder"),
    intro: [
      "A peanut feeder is a wire-mesh cylinder or tray that offers whole or shelled peanuts — the food that brings in the birds with the strongest bills: jays, woodpeckers, nuthatches, chickadees and titmice [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Whole peanuts or shelled peanuts?",
        paragraphs: [
          "The two forms serve different birds. Larger birds like jays may grab several peanuts at a time and fly off to hide them for later, while smaller birds like chickadees, nuthatches and titmice have more success feeding on shelled peanuts [1]. A wire-mesh peanut feeder holds shelled pieces so small birds can peck at them; a tray or hopper takes whole peanuts in the shell for jays.",
        ],
      },
      {
        heading: "Which birds come to a peanut feeder",
        paragraphs: [
          "Blue Jays prefer tray or hopper feeders on a post rather than hanging feeders, and they prefer peanuts, sunflower seeds and suet; they cache what they cannot eat, so a tray of whole peanuts empties fast [4]. Downy Woodpeckers, the woodpecker most likely to visit a feeder, take peanuts and chunky peanut butter as well as suet [5]. Black-capped Chickadees take mostly sunflower seeds, peanuts, suet and peanut butter at feeders [6], and Tufted Titmice take suet, peanuts and other seeds besides their preferred sunflower [7].",
        ],
      },
      {
        heading: "Keeping peanuts safe",
        paragraphs: [
          "Peanuts spoil and can grow mold when they stay damp, so use a feeder that drains, offer small amounts, and discard anything that smells musty or shows discoloration. Squirrels take peanuts readily, so give a peanut feeder the standard defenses: a spot at least ten feet from trees and buildings and a baffle between the squirrels and the feeder [1].",
        ],
      },
    ],
    faq: [
      { question: "Which birds eat peanuts from a feeder?", answer: "Jays take whole peanuts and cache them; chickadees, nuthatches, titmice and woodpeckers do better with shelled peanuts in a mesh feeder [1]." },
      { question: "Are salted or roasted peanuts okay for birds?", answer: "Use plain, unsalted peanuts. Keep them dry — damp peanuts mold, and moldy food should always be discarded [1]." },
    ],
    extraSources: [aabSpecies(4, "Blue_Jay", "Blue Jay"), aabSpecies(5, "Downy_Woodpecker", "Downy Woodpecker"), aabSpecies(6, "Black-capped_Chickadee", "Black-capped Chickadee"), aabSpecies(7, "Tufted_Titmouse", "Tufted Titmouse")],
  }),

  "/feeders/window-feeder": build({
    path: "/feeders/window-feeder",
    keyword: "window feeder",
    title: "Window Feeder Guide: Which Birds Use One & Safe Glass",
    description: "How a suction-cup window feeder works, the birds that use it (chickadees, titmice, finches, nuthatches), why treated glass removes the collision risk.",
    image: timg("window-feeder", "A suction-cup window feeder mounted on the outside of a window, with a bird feeding inches from the glass"),
    intro: [
      "A window feeder is a small tray or hopper stuck to the outside of the glass with suction cups, bringing chickadees, titmice and finches to within inches of the room [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Which birds use a window feeder",
        paragraphs: [
          "The birds that use tiny hanging feeders use window feeders too. Black-capped Chickadees do not mind tiny hanging feeders that swing in the wind and also readily visit window feeders [4]; Tufted Titmice, House Finches, nuthatches and American Goldfinches follow. Feeders with short perches accommodate small birds such as finches but exclude larger birds such as grackles and jays [1], which is exactly what a window feeder does.",
          "Fill it with black-oil sunflower — the preferred food item for a wide variety of birds and a favorite of cardinals, chickadees, finches and sparrows [1] — or sunflower chips, which leave no hulls on the sill.",
        ],
      },
      {
        heading: "Window feeders and collisions",
        paragraphs: [
          "The worry with a window feeder is the window. Collisions kill perhaps a billion or more birds a year in North America, and far more die at low-rise buildings and homes than at high-rises because there are so many of them [3]. The current advice from the Cornell Lab is that older recommendations about safe feeder distances are no longer valid: if you have windows near a feeder, make them bird-friendly and do not worry about how far away they are [3].",
          "Practically, that means treating the glass around the feeder so it stops reflecting sky and branches: markings spaced no more than 2 inches apart across the outer surface, tape or dot products, closely spaced cords, or a mosquito screen over the whole outside of the window [3].",
        ],
      },
    ],
    faq: [
      { question: "Will a window feeder make birds hit the glass?", answer: "Not if the glass is treated. All About Birds now advises making nearby windows bird-friendly with markings 2 inches apart, screens or cords rather than relying on distance [3]." },
      { question: "What birds come to a window feeder?", answer: "Chickadees, titmice, nuthatches, House Finches and goldfinches — the small birds that use tiny hanging feeders [1][4]." },
    ],
    extraSources: [aabSpecies(4, "Black-capped_Chickadee", "Black-capped Chickadee")],
  }),

  // ── Problem pages ─────────────────────────────────────────────
  "/feeders/squirrel-proof": build({
    path: "/feeders/squirrel-proof",
    keyword: "squirrel proof bird feeder",
    title: "Squirrel Proof Bird Feeder: Baffles, Distances & What Works",
    description: "What makes a squirrel proof bird feeder work: pole baffles, the 10-foot rule, weight-activated ports and the foods squirrels skip — per Project FeederWatch.",
    image: timg("squirrel-baffle", "Squirrel eating black-oil sunflower seed — the reason a squirrel proof bird feeder needs a baffle"),
    intro: [
      "No feeder is truly a squirrel proof bird feeder on its own; what works is a system of placement, a correctly sized baffle and a feeder built to resist chewing [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "What makes a squirrel proof bird feeder: distance and a baffle",
        paragraphs: [
          "Squirrels can jump to feeders placed less than ten feet from a tree or building, so the first move is to put the feeding station in the open, on a pole [1]. Then add the barrier: squirrel baffles, placed between squirrels and feeders, are usually the best way to keep them off, and for a hanging feeder a tilting baffle at least 18 inches in diameter placed above the feeder might work [1].",
          "The feeder itself matters less than the baffle, but chew-resistant metal ports and a weight-activated closing perch buy time when a squirrel does reach the feeder.",
        ],
      },
      {
        heading: "Foods and habits that reduce the problem",
        paragraphs: [
          "A common switch when a feeder is overrun is safflower. FeederWatch's own note is that safflower attracts cardinals and other big-billed birds, but most birds prefer sunflower seeds over safflower [1] — so expect fewer birds overall, not only fewer squirrels, and treat seed choice as a supplement to placement and a baffle rather than a substitute. Cleaning up spilled seed removes the easy reward that brings squirrels back daily.",
          "If your mammal visitors appear only at night, FeederWatch's advice is to take feeders inside at dusk; and in bear country it recommends against feeding at all except when bears are hibernating [1].",
        ],
      },
    ],
    faq: [
      { question: "How far from a tree should a bird feeder be to stop squirrels?", answer: "At least ten feet from any tree or building, since squirrels can jump that far; then add a baffle on the pole or above the feeder [1]." },
      { question: "What size baffle stops squirrels?", answer: "For a hanging feeder, a tilting baffle at least 18 inches in diameter above the feeder; for a pole, a baffle below the feeder that a squirrel cannot climb past [1]." },
    ],
  }),

  "/feeders/raccoon-resistant": build({
    path: "/feeders/raccoon-resistant",
    keyword: "raccoon resistant bird feeder",
    title: "Raccoon Resistant Bird Feeder: Poles, Baffles & Night Rules",
    description: "How to run a raccoon resistant bird feeder: bring feeders in at dusk, pole-mount with a predator baffle, latch the lid, and know when to stop feeding.",
    image: timg("hopper-feeder", "Northern cardinal at a pole-mounted hopper — the mount a raccoon resistant bird feeder needs"),
    intro: [
      "A raccoon resistant bird feeder is mostly a question of when the food is out: raccoons work at night, and the simplest fix is a feeder that is not there after dark [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Take it in at dusk",
        paragraphs: [
          "If your mammalian visitors appear only at night, FeederWatch's first recommendation is to try taking your feeders inside at dusk [1]. Raccoons learn a reliable food source fast; a feeder that is empty or absent for a week usually breaks the habit. Offering only what birds eat in a day means there is little left to raid.",
        ],
      },
      {
        heading: "A raccoon resistant bird feeder mount: pole and baffle",
        paragraphs: [
          "Raccoons climb poles and trees and reach farther than squirrels, so the same rules apply with more margin: a smooth metal pole at least ten feet from any tree, fence or building, with a large baffle below the feeder [1]. Hanging feeders under a tilting baffle of at least 18 inches are squirrel measures [1]; against raccoons, a pole with a stovepipe-style baffle is the more reliable mount, and lids need a latch a raccoon cannot lift.",
          "Where the problem is bears rather than raccoons, FeederWatch recommends against any feeding except when bears are hibernating [1].",
        ],
      },
    ],
    faq: [
      { question: "How do I stop raccoons emptying my feeder?", answer: "Bring feeders in at dusk, put out only a day's food, and pole-mount with a baffle at least ten feet from anything a raccoon can climb [1]." },
      { question: "Should I stop feeding if raccoons keep coming?", answer: "Yes if it becomes a wildlife conflict — and in bear country, only feed while bears are hibernating [1]." },
    ],
  }),

  "/feeders/weather-resistant": build({
    path: "/feeders/weather-resistant",
    keyword: "weather resistant bird feeder",
    title: "Weather Resistant Bird Feeder: Dry Seed in Rain & Snow",
    description: "What makes a weather resistant bird feeder — drainage, a roof, tube design, sheltered placement — and why wet seed must be thrown out, per Project FeederWatch.",
    image: timg("platform-feeder", "Roofed feeder with junco, chickadee and cardinal — a roof and drainage make a weather resistant bird feeder"),
    intro: [
      "A weather resistant bird feeder is less about a label than about three things: a roof that sheds rain, a base that drains, and seed that is replaced as soon as it gets wet [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Weather resistant bird feeder designs that keep seed dry",
        paragraphs: [
          "Tube feeders keep seed fairly dry [1], because the seed is enclosed and only the ports are exposed; a tube with a dome or weather guard above it is the driest common design. Hoppers add a roof over an open tray, and large hoppers attract most species of feeder birds including larger ones like doves and grackles [1]. Open platforms are the wettest: they attract the widest range of birds [1], but need drainage holes or a mesh floor and only a day's seed at a time.",
        ],
      },
      {
        heading: "Wet seed is not a storage problem, it is a health problem",
        paragraphs: [
          "Clean feeders more often during wet weather [1]. Damp seed and hulls mold, and mold plus crowded birds is how salmonellosis, a common cause of mortality in feeder birds, spreads [2]. Discard wet or clumped seed rather than letting birds finish it, move the feeder out of driving rain, and let a washed feeder dry completely before refilling [1].",
          "For nectar feeders the rule is stricter still: at any sign of cloudy water or black mold, discard the solution and clean immediately [1].",
        ],
      },
    ],
    faq: [
      { question: "What kind of feeder keeps seed dry?", answer: "A tube feeder, ideally with a weather dome above it; hoppers with a roof are next best, and open platforms need drainage and daily refills [1]." },
      { question: "Can birds eat wet birdseed?", answer: "Throw it out. Wet seed molds and moldy feeders spread salmonellosis; clean feeders more often in wet weather [1][2]." },
    ],
  }),

  "/feeders/for-windy-areas": build({
    path: "/feeders/for-windy-areas",
    keyword: "bird feeder for windy areas",
    title: "Bird Feeder for Windy Areas: Weighted, Mounted & Sheltered",
    description: "Choosing a bird feeder for windy areas: pole-mounted hoppers and platforms over swinging tubes, birds that tolerate a swaying feeder, sheltered placement.",
    image: timg("hopper-feeder", "Pole-mounted feeder with a northern cardinal — a fixed mount is the best bird feeder for windy areas"),
    intro: [
      "The right bird feeder for windy areas is one that does not swing: a hopper or platform on a pole, or a small feeder that the birds using it simply do not mind moving [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "A bird feeder for windy areas should be mounted, not hung",
        paragraphs: [
          "Large hoppers attract most species of feeder birds and let larger species like doves and grackles feed [1]; on a pole they are also the steadiest feeder in wind, and a pole with a baffle solves squirrels at the same time [1]. Trays attract most species too, and placed near the ground they draw juncos, doves and sparrows [1] — a low, heavy platform in the lee of a shrub is the most wind-proof feeder there is.",
        ],
      },
      {
        heading: "Birds that do not mind a swinging feeder",
        paragraphs: [
          "Suet cages are the other wind-proof option: a block in a wire cage cannot spill or blow out, and suet is a good choice for attracting insect-eating birds such as woodpeckers, nuthatches and chickadees [1].",
          "If a hanging tube is your only option, the good news is that its main customers do not care. Black-capped Chickadees don't mind using tiny hanging feeders that swing in the wind [4], and American Goldfinches don't mind feeders that sway in the wind either [5]. What wind does do is blow rain into ports and empty open trays, so keep the feeder close to cover — trees or shrubs that also give birds refuge — and about ten feet from branches squirrels could use [1].",
        ],
      },
    ],
    faq: [
      { question: "What feeder is best for a windy yard?", answer: "A pole-mounted hopper or a low platform sheltered by shrubs; if you hang a tube, chickadees and goldfinches will use it even when it swings [1][4][5]." },
      { question: "Where should I put a feeder in wind?", answer: "Close to natural cover such as trees or shrubs, but about ten feet from strong branches a squirrel could jump from [1]." },
    ],
    extraSources: [aabSpecies(4, "Black-capped_Chickadee", "Black-capped Chickadee"), aabSpecies(5, "American_Goldfinch", "American Goldfinch")],
  }),

  "/feeders/for-small-balcony": build({
    path: "/feeders/for-small-balcony",
    keyword: "bird feeder for small balcony",
    title: "Bird Feeder for Small Balcony Spaces: What Works Up High",
    description: "The best bird feeder for small balcony spaces: window and small tube feeders, hulled seed to avoid mess, the birds that come up high, and safe glass doors.",
    image: timg("balcony-feeder", "Male house finch at a small feeder — the most reliable visitor to a bird feeder for small balcony spaces"),
    intro: [
      "A bird feeder for small balcony spaces has to be small, tidy and safe next to glass — which points to a window feeder or a short tube filled with hulled seed rather than a big hopper [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Choosing a bird feeder for small balcony spaces",
        paragraphs: [
          "Feeders with short perches accommodate small birds such as finches but exclude larger birds such as grackles and jays [1] — on a balcony that is a feature, because the birds you can host are the small ones anyway. A suction-cup window feeder on the glass door or a small tube on a railing bracket are the two workable formats. Use sunflower chips or hulled seed so there are no shells on the floor or on the neighbor's balcony below.",
        ],
      },
      {
        heading: "Which birds come to a balcony feeder",
        paragraphs: [
          "House Finches are the most dependable: fill feeders with small black-oil sunflower seed, and if they discover it they may bring flocks of 50 or more [4]. Black-capped Chickadees do not mind tiny hanging feeders that swing in the wind and readily visit window feeders [5], and American Goldfinches use almost any feeder type and do not mind feeders that sway [6]. Doves and sparrows will find spilled seed on the balcony floor [1].",
        ],
      },
      {
        heading: "The glass door",
        paragraphs: [
          "A balcony feeder sits next to a large pane of glass, which is the one real risk. Older rules about safe feeder distances are no longer thought valid; the advice is to make the glass bird-friendly — markings spaced no more than 2 inches apart, dot tape, hanging cords or an exterior screen — rather than move the feeder [3].",
        ],
      },
    ],
    faq: [
      { question: "Can I put a feeder on an apartment railing?", answer: "Yes — a window feeder or small tube with hulled seed keeps it clean; House Finches, chickadees and goldfinches are the likely visitors [1][4][5][6]." },
      { question: "How do I stop mess under a balcony feeder?", answer: "Use sunflower chips or hulled seed (no shells), offer a day's worth at a time, and sweep spilled seed so it does not mold or attract pigeons [1]." },
    ],
    extraSources: [aabSpecies(4, "House_Finch", "House Finch"), aabSpecies(5, "Black-capped_Chickadee", "Black-capped Chickadee"), aabSpecies(6, "American_Goldfinch", "American Goldfinch")],
  }),

  // ── Comparisons ───────────────────────────────────────────────
  "/feeders/compare/tube-vs-hopper": build({
    path: "/feeders/compare/tube-vs-hopper",
    keyword: "tube vs hopper feeder",
    title: "Tube vs Hopper Feeder: Which Birds Each One Attracts",
    description: "Tube vs hopper feeder compared: which birds use each, how they handle rain and squirrels, seed capacity, and the case for owning both, from Project FeederWatch.",
    image: timg("tube-feeder", "American goldfinch at a tube feeder — in the tube vs hopper feeder choice, short perches keep tubes to small birds"),
    intro: [
      "The tube vs hopper feeder question comes down to who you want to feed: a tube with short perches serves finches and chickadees and keeps out jays and grackles, while a large hopper feeds almost everything, doves and grackles included [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Tube feeder: small birds, dry seed",
        paragraphs: [
          "Feeders with short perches accommodate small birds such as finches but exclude larger birds such as grackles and jays [1]. Tube feeders keep seed fairly dry [1], and with fine ports they can be dedicated to nyjer for goldfinches, siskins and redpolls [1]. The limits are capacity — a tube holds a few days' seed for a small flock — and the fact that cardinals, doves and jays cannot use the perches.",
        ],
      },
      {
        heading: "Hopper feeder: everything, with a roof",
        paragraphs: [
          "Large hoppers attract most species of feeder birds and will allow larger species, like doves and grackles, to feed [1]. Blue Jays prefer tray or hopper feeders on a post rather than hanging feeders [4], and Northern Cardinals, which particularly use sunflower seeds, need a ledge to stand on [5]. The cost is that a hopper lets in the birds some people would rather not feed, and its open tray needs cleaning more often in wet weather [1].",
        ],
      },
      {
        heading: "Tube vs hopper feeder: what is the difference and which to choose",
        paragraphs: [
          "Choose a tube if your goal is finches and chickadees, a clean sill and dry seed; choose a hopper if you want cardinals, jays and doves and can mount it on a baffled pole. Most yards end up with both, filled with black-oil sunflower — the preferred food for a wide variety of birds [1].",
        ],
      },
    ],
    faq: [
      { question: "Do cardinals use tube feeders?", answer: "Rarely — they need a perch or ledge, so a hopper or platform with sunflower seed serves them; tube perches are sized for finches and chickadees [1][5]." },
      { question: "Which holds more seed, tube or hopper?", answer: "A hopper: it stores seed in a covered reservoir above the tray, while a tube holds only what fits in the cylinder [1]." },
    ],
    extraSources: [aabSpecies(4, "Blue_Jay", "Blue Jay"), aabSpecies(5, "Northern_Cardinal", "Northern Cardinal")],
  }),

  "/feeders/compare/hopper-vs-platform": build({
    path: "/feeders/compare/hopper-vs-platform",
    keyword: "hopper vs platform feeder",
    title: "Hopper vs Platform Feeder: Cover, Capacity & Ground Birds",
    description: "Hopper vs platform feeder compared: a hopper adds storage and a roof, a platform serves doves, juncos and sparrows; birds, foods and the wet-weather trade-off.",
    image: timg("platform-feeder", "Junco, chickadee and cardinal on a roofed platform — the hopper vs platform feeder question in one photo"),
    intro: [
      "In the hopper vs platform feeder choice, the platform wins on variety and the hopper on protection: trays attract most species and, near the ground, juncos, doves and sparrows, while a hopper keeps a reserve of seed dry under a roof [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Platform feeder: the widest guest list",
        paragraphs: [
          "Trays attract most species of feeder birds; placed near the ground they are most likely to attract juncos, doves and sparrows [1]. All About Birds' advice for Mourning Doves — scatter seed, particularly millet, on the ground or on platform feeders [4] — and for Blue Jays, which prefer tray or hopper feeders on a post [5], both point to the platform. The weakness is weather: an open tray needs drainage and daily portions, and cleaning more often in wet weather [1].",
        ],
      },
      {
        heading: "Hopper feeder: a covered reserve",
        paragraphs: [
          "Large hoppers attract most species of feeder birds and let doves and grackles feed [1], and their roof keeps several days of black-oil sunflower dry. What a hopper does not do well is serve the ground birds: juncos and sparrows will still take the seed that falls beneath it [1], but they rarely climb onto the tray.",
        ],
      },
      {
        heading: "Hopper vs platform feeder: the verdict",
        paragraphs: [
          "A platform is the better single feeder for variety and for doves, juncos and sparrows; a hopper is the better single feeder for a busy yard that cannot be refilled daily. Either one on a baffled pole, ten feet from branches, with a day's worth of millet scattered below, covers nearly every backyard bird [1].",
        ],
      },
    ],
    faq: [
      { question: "Which feeder is best for mourning doves?", answer: "A platform, or seed scattered on the ground — doves feed on the ground and take millet and cracked corn [1][4]." },
      { question: "Does a platform feeder waste more seed?", answer: "It exposes seed to rain, so it needs drainage and small daily refills; wet seed should be discarded [1]." },
    ],
    extraSources: [aabSpecies(4, "Mourning_Dove", "Mourning Dove"), aabSpecies(5, "Blue_Jay", "Blue Jay")],
  }),

  "/feeders/compare/suet-vs-seed": build({
    path: "/feeders/compare/suet-vs-seed",
    keyword: "suet vs seed feeder",
    title: "Suet vs Seed Feeder: Insect-eaters vs Seed-eaters",
    description: "Suet vs seed feeder compared: suet brings woodpeckers, nuthatches and chickadees; seed brings finches, cardinals and sparrows. Starling cages and running both.",
    image: timg("suet-feeder", "Hairy woodpecker on a suet cage — the suet vs seed feeder choice is about which birds you want"),
    intro: [
      "Suet vs seed feeder is not an either/or: suet is a good choice for attracting insect-eating birds — woodpeckers, nuthatches and chickadees — while seed feeds the cardinals, finches and sparrows that suet does not [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Suet feeder: for the clingers",
        paragraphs: [
          "Suet is a good choice for attracting insect-eating birds [1]. Downy Woodpeckers, the woodpecker most likely to visit a feeder, prefer suet feeders [4]; Black-capped Chickadees take suet and peanut butter alongside sunflower [5]. The starling problem has a design fix: suet cages that are only accessible from the bottom tend to be starling-resistant but still let woodpeckers, nuthatches and chickadees feed [1].",
        ],
      },
      {
        heading: "Seed feeder: for everyone else",
        paragraphs: [
          "Black-oil sunflower is the preferred food item for a wide variety of birds and among the favorites of cardinals, chickadees, finches and sparrows [1]; nyjer adds goldfinches, siskins and redpolls, millet the ground-foraging birds, and safflower cardinals and other big-billed birds [1]. Cardinals and finches do not cling to a suet cage, so a seed feeder is the only way to hold them.",
        ],
      },
      {
        heading: "Suet vs seed feeder: the verdict",
        paragraphs: [
          "Run both: a bottom-access suet cage for woodpeckers, nuthatches and chickadees, and a sunflower feeder for the rest. Plain suet is a fat, so in hot weather watch for softening or an off smell and replace it — many people switch to rendered ‘no-melt’ cakes in summer — and clean both feeders every week or two, more often when wet [1].",
        ],
      },
    ],
    faq: [
      { question: "Which birds eat suet but not seed?", answer: "Woodpeckers and nuthatches are mostly suet birds; chickadees and titmice take both [1][4][5]." },
      { question: "How do I keep starlings off suet?", answer: "Use a cage that is only accessible from the bottom — FeederWatch finds these starling-resistant while still allowing woodpeckers, nuthatches and chickadees to feed [1]." },
    ],
    extraSources: [aabSpecies(4, "Downy_Woodpecker", "Downy Woodpecker"), aabSpecies(5, "Black-capped_Chickadee", "Black-capped Chickadee")],
  }),

  "/feeders/compare/window-vs-hanging": build({
    path: "/feeders/compare/window-vs-hanging",
    keyword: "window feeder vs hanging feeder",
    title: "Window Feeder vs Hanging Feeder: Close Views vs More Birds",
    description: "Window feeder vs hanging feeder compared: which birds use each, glass safety, capacity and cleaning — a suction-cup feeder for close views vs a hanging tube.",
    image: timg("window-feeder", "Suction-cup window feeder with a bird inches from the glass — the window feeder vs hanging feeder trade-off"),
    intro: [
      "Window feeder vs hanging feeder is a question of what you want from the birds: a window feeder puts chickadees and finches inches away, a hanging feeder in the yard draws more species and more of them [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Window feeder: small birds, close up",
        paragraphs: [
          "A window feeder is a small tray with suction cups, so its guests are the small birds: Black-capped Chickadees readily visit window feeders [4], and titmice, nuthatches and finches follow. Feeders with short perches accommodate small birds but exclude larger birds such as grackles and jays [1]. It holds little seed and needs cleaning like any tray, but it never has a squirrel problem.",
        ],
      },
      {
        heading: "Hanging feeder: more birds, more upkeep",
        paragraphs: [
          "A hanging tube or hopper in the yard, close to natural cover such as trees or shrubs [1], reaches the birds that will not come to a window — cardinals on a hopper ledge, jays that prefer tray or hopper feeders on a post [5], doves under it. It needs a baffle, since squirrels jump to feeders less than ten feet from a tree or building [1], and a spot about ten feet from strong branches.",
        ],
      },
      {
        heading: "Window feeder vs hanging feeder: glass safety applies to both",
        paragraphs: [
          "Because collisions kill perhaps a billion or more birds a year and older feeder-distance rules are no longer thought valid, the answer for either feeder is the same: make any nearby window bird-friendly with markings spaced no more than 2 inches apart, exterior screens or hanging cords [3].",
        ],
      },
    ],
    faq: [
      { question: "Are window feeders safe for birds?", answer: "Yes, if the glass is treated — 2-inch-spaced markings, screens or cords. Distance from the window is no longer the recommended fix [3]." },
      { question: "Which attracts more birds, a window or hanging feeder?", answer: "A hanging hopper in the yard: large hoppers attract most species, while a window feeder is limited to small birds [1]." },
    ],
    extraSources: [aabSpecies(4, "Black-capped_Chickadee", "Black-capped Chickadee"), aabSpecies(5, "Blue_Jay", "Blue Jay")],
  }),

  // ── Feeders for foods ─────────────────────────────────────────
  "/feeders/for/black-oil-sunflower": build({
    path: "/feeders/for/black-oil-sunflower",
    keyword: "black oil sunflower feeder",
    title: "Black Oil Sunflower Feeder: Birds, Types & Why It Works",
    description: "The best black oil sunflower feeder types (tube, hopper, platform, window), the birds it attracts — cardinals, chickadees, finches, sparrows — and dry storage.",
    image: timg("black-oil-sunflower", "Black-capped chickadee taking a seed from a black oil sunflower feeder"),
    intro: [
      "A black oil sunflower feeder is the one to start with: black-oil sunflower is the preferred food item for a wide variety of birds and among the favorite feeder foods of cardinals, chickadees, finches and sparrows [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Which black oil sunflower feeder to choose",
        paragraphs: [
          "All of them. In a tube with short perches it serves finches and chickadees while excluding grackles and jays; in a large hopper it feeds most species including doves and grackles; on a tray it attracts most species and, near the ground, juncos, doves and sparrows [1]. Tubes keep it driest [1]; hoppers hold the most.",
        ],
      },
      {
        heading: "The birds that come for it",
        paragraphs: [
          "Northern Cardinals eat many kinds of birdseed, particularly black oil sunflower seed [4]. House Finches take black oil sunflower over the larger striped sunflower, and a feeder full of it may bring flocks of 50 or more [5]. Black-capped Chickadees take mostly sunflower seeds, peanuts and suet at feeders [6], Tufted Titmice prefer sunflower seeds above all [7], and American Goldfinches are most attracted to sunflower and nyjer [8]. Blue Jays prefer peanuts, sunflower seeds and suet on a tray or hopper [9].",
        ],
      },
      {
        heading: "Hulls, chips and mess",
        paragraphs: [
          "Whole black-oil seed leaves a carpet of hulls; sunflower chips (shelled pieces) avoid it and suit balconies and window feeders, but spoil faster when damp, so offer less at a time and clean feeders more often in wet weather [1]. Fallen whole seed is not wasted — Song Sparrows, Fox Sparrows and towhees readily eat it from the ground [1].",
        ],
      },
    ],
    faq: [
      { question: "What birds eat black oil sunflower seeds?", answer: "Cardinals, chickadees, finches and sparrows above all, plus titmice, jays, nuthatches, grosbeaks and doves [1][4][5][6][7][8][9]." },
      { question: "Black oil vs striped sunflower — which is better in a black oil sunflower feeder?", answer: "Black oil: thinner shells and more oil, and House Finches choose it over striped sunflower at feeders [5]." },
    ],
    extraSources: [aabSpecies(4, "Northern_Cardinal", "Northern Cardinal"), aabSpecies(5, "House_Finch", "House Finch"), aabSpecies(6, "Black-capped_Chickadee", "Black-capped Chickadee"), aabSpecies(7, "Tufted_Titmouse", "Tufted Titmouse"), aabSpecies(8, "American_Goldfinch", "American Goldfinch"), aabSpecies(9, "Blue_Jay", "Blue Jay")],
  }),

  "/feeders/for/safflower": build({
    path: "/feeders/for/safflower",
    keyword: "safflower feeder",
    title: "Safflower Feeder: Cardinals Yes, Squirrels & Grackles No",
    description: "How a safflower feeder works: the white seed cardinals and big-billed birds take, why most birds still prefer sunflower, and why it is used against squirrels.",
    image: timg("safflower", "Carolina chickadee taking a seed from a safflower feeder"),
    intro: [
      "A safflower feeder is the compromise feeder: safflower attracts cardinals and other big-billed birds, though most birds prefer sunflower seeds over safflower — and that lower appeal is exactly why people use it against squirrels and grackles [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Who eats from a safflower feeder",
        paragraphs: [
          "FeederWatch's summary is blunt: safflower attracts cardinals and other big-billed birds, but in their experience most birds prefer sunflower seeds over safflower [1]. Northern Cardinals, which eat many kinds of birdseed, are the reliable takers [4]; chickadees, titmice, House Finches and doves accept it in smaller numbers, especially once they are used to it.",
        ],
      },
      {
        heading: "Why switch to safflower",
        paragraphs: [
          "The reason people fill a feeder with safflower rather than the more popular sunflower is the birds and mammals that do not want it: where grackles and squirrels have taken over a hopper, many feeder-keepers switch to safflower so that cardinals keep coming while the crowd thins. FeederWatch does not list seed choice as a squirrel remedy — its guidance is placement at least ten feet from trees and a baffle [1] — so use safflower alongside those, not instead of them. Serve it in a hopper or on a platform, since cardinals need a ledge rather than a tube perch [1].",
        ],
      },
    ],
    faq: [
      { question: "Do cardinals use a safflower feeder?", answer: "Yes — safflower attracts cardinals and other big-billed birds, although most birds still prefer sunflower [1][4]." },
      { question: "Does safflower stop squirrels?", answer: "It is widely used for that, but FeederWatch's squirrel guidance is placement and baffles — ten feet from trees, a baffle on the pole or above the feeder — not seed choice [1]." },
    ],
    extraSources: [aabSpecies(4, "Northern_Cardinal", "Northern Cardinal")],
  }),

  "/feeders/for/millet": build({
    path: "/feeders/for/millet",
    keyword: "millet bird feeder",
    title: "Millet Bird Feeder: Ground Trays for Doves & Sparrows",
    description: "How to run a millet bird feeder: white proso millet on a low tray or the ground for doves, juncos, sparrows and towhees, why tubes waste it, and keeping it dry.",
    image: timg("millet", "Mourning dove feeding on small seed scattered on the ground — the simplest millet bird feeder"),
    intro: [
      "A millet bird feeder is a tray or a patch of ground, not a tube: millet is a favored food of many smaller, ground-foraging birds, and the doves, juncos and sparrows that eat it feed at or near ground level [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Which birds eat millet",
        paragraphs: [
          "Millet is a favored food of many smaller ground-foraging birds [1]. Trays placed near the ground are most likely to attract juncos, doves and sparrows, and Song Sparrows, Fox Sparrows and many towhee species readily eat fallen seed beneath feeders [1]. For Mourning Doves the All About Birds advice is to scatter seed, particularly millet, on the ground or on platform feeders [4]; House Finches take millet too [5].",
        ],
      },
      {
        heading: "How to set up a millet bird feeder",
        paragraphs: [
          "Millet in a hanging tube mostly ends up on the ground anyway, kicked out by finches looking for sunflower. Put it where its birds are: a low platform or a cleared patch of ground, a day's worth at a time, and pair it with cracked corn, which attracts doves, quail and sparrows [1]. Skip milo in the same mix; it is not a favorite of most birds and often goes to waste [1].",
          "Ground feeding needs the same hygiene as any feeder: clean the tray every week or two and more often in wet weather, and never let millet clump and mold, because a moldy feeding area is where salmonellosis spreads [1][2].",
        ],
      },
    ],
    faq: [
      { question: "What birds come to a millet bird feeder?", answer: "Ground-foraging birds: Mourning Doves, juncos, Song and Fox sparrows, towhees, and House Finches [1][4][5]." },
      { question: "Should millet go in a tube feeder?", answer: "No — serve it on a low tray or the ground, where the birds that want it feed; in a tube it is mostly scattered as waste [1]." },
    ],
    extraSources: [aabSpecies(4, "Mourning_Dove", "Mourning Dove"), aabSpecies(5, "House_Finch", "House Finch")],
  }),

  "/feeders/for/suet": build({
    path: "/feeders/for/suet",
    keyword: "suet bird feeder",
    title: "Suet Bird Feeder: Woodpeckers, Nuthatches & Starling-proof",
    description: "How a suet bird feeder works, the insect-eating birds it attracts (woodpeckers, nuthatches, chickadees, titmice), bottom-access cages that beat starlings.",
    image: timg("suet", "Two suet cakes in a wire suet bird feeder hanging from a branch"),
    intro: [
      "A suet bird feeder is a wire cage holding a block of rendered fat, and it is the feeder for insect-eating birds — suet is a good choice for attracting them, and woodpeckers, nuthatches and chickadees are its regulars [1].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3].",
    ],
    sections: [
      {
        heading: "Which birds come to suet",
        paragraphs: [
          "Downy Woodpeckers, the woodpecker most likely to visit a backyard feeder, prefer suet feeders [4]. Black-capped Chickadees take suet and peanut butter along with sunflower and peanuts [5], and Tufted Titmice take suet, peanuts and other seeds besides their favorite sunflower [6]. Nuthatches are the other regulars FeederWatch names at suet [1].",
        ],
      },
      {
        heading: "Choosing and placing a suet bird feeder",
        paragraphs: [
          "The standard cage lets starlings monopolize a block; cages that are only accessible from the bottom tend to be starling-resistant while still letting woodpeckers, nuthatches and chickadees feed [1]. Hang it near a tree trunk — woodpeckers approach along wood — but about ten feet from branches squirrels could jump from, with a baffle above [1].",
          "Plain suet is rendered fat and softens in heat, so in summer many people switch to ‘no-melt’ cakes or pause; in any season, clean the cage every week or two and discard blocks that smell or show mold, since mold is how salmonellosis spreads at feeders [1][2].",
        ],
      },
    ],
    faq: [
      { question: "What birds come to a suet bird feeder?", answer: "Woodpeckers, nuthatches, chickadees and titmice above all — suet is the food for insect-eating birds [1][4][5][6]." },
      { question: "How do I keep starlings and squirrels off suet?", answer: "Use a bottom-access-only cage for starlings, and hang it under a baffle ten feet from anything squirrels can jump from [1]." },
    ],
    extraSources: [aabSpecies(4, "Downy_Woodpecker", "Downy Woodpecker"), aabSpecies(5, "Black-capped_Chickadee", "Black-capped Chickadee"), aabSpecies(6, "Tufted_Titmouse", "Tufted Titmouse")],
  }),

  // ── Feeders for birds ─────────────────────────────────────────
  "/feeders/for/mourning-dove": build({
    path: "/feeders/for/mourning-dove",
    keyword: "mourning dove feeder",
    title: "Mourning Dove Feeder: What to Feed Doves & Feeders They Use",
    description: "The right mourning dove feeder is a platform or the ground: what mourning doves eat (millet, cracked corn, sunflower), how much they eat, and safe feeding.",
    image: bimg("mourning-dove", "Mourning dove on the ground — the best mourning dove feeder is a platform or scattered seed"),
    intro: [
      "The best mourning dove feeder is not a hanging one: doves feed on the ground and in the open, and All About Birds' advice is to scatter seed, particularly millet, on the ground or on platform feeders [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What mourning doves eat",
        paragraphs: [
          "Seeds make up 99 percent of a Mourning Dove's diet — cultivated grains and even peanuts, wild grasses, weeds and herbs, occasionally berries — and a dove eats roughly 12 to 20 percent of its body weight per day, about 71 calories [4]. They swallow seed whole and store it in the crop, then fly to a safe perch to digest; the record is 17,200 bluegrass seeds in one crop [4].",
          "At the feeder that means millet, a favored food of smaller ground-foraging birds, and cracked corn, which attracts doves, quail and sparrows [1]; black-oil sunflower is taken as well. Skip milo, which most birds leave to waste [1].",
        ],
      },
      {
        heading: "The mourning dove feeder itself",
        paragraphs: [
          "Trays attract most species of feeder birds, and placed near the ground they are most likely to attract juncos, doves and sparrows [1]; large hoppers also let larger species like doves and grackles feed [1]. A tube feeder does nothing for a dove — it cannot use the perches — though it will clean up the seed that finches drop beneath it.",
          "Keep cats indoors: birds that spend much of their time on the ground are particularly vulnerable to prowling cats [4], and cats kill hundreds of millions of birds a year [1]. Plant dense shrubs or evergreens nearby for nesting sites [4].",
        ],
      },
    ],
    faq: [
      { question: "What do you feed mourning doves?", answer: "Millet and cracked corn on the ground or a platform, plus black-oil sunflower; seeds are 99 percent of their diet [1][4]." },
      { question: "Will mourning doves use a hanging mourning dove feeder?", answer: "Not the perches of a tube; they use platforms, large hoppers and the ground beneath other feeders [1]." },
    ],
    extraSources: [aabSpecies(4, "Mourning_Dove", "Mourning Dove")],
  }),

  "/feeders/for/black-capped-chickadee": build({
    path: "/feeders/for/black-capped-chickadee",
    keyword: "chickadee bird feeder",
    title: "Chickadee Bird Feeder: Best Feeders & Foods for Chickadees",
    description: "The best chickadee bird feeder types (tube, window, suet cage), what chickadees eat at feeders (sunflower, peanuts, suet, mealworms), and a nest box for them.",
    image: bimg("black-capped-chickadee", "Black-capped chickadee — one of the easiest birds to bring to a chickadee bird feeder"),
    intro: [
      "Almost any chickadee bird feeder works: chickadees are one of the easiest birds to attract to feeders, for suet, sunflower and peanuts, and they do not mind tiny hanging feeders that swing in the wind or window feeders [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What chickadees eat at feeders",
        paragraphs: [
          "At feeders Black-capped Chickadees take mostly sunflower seeds, peanuts, suet, peanut butter and mealworms; they peck a hole in a seed's shell and chip out tiny bits [4]. In the wild, insects and spiders make up 80–90 percent of the diet outside winter, and about half of it in winter, when seeds and berries fill the rest [4] — so suet, which is a good choice for insect-eating birds [1], is as important as seed.",
        ],
      },
      {
        heading: "Which chickadee bird feeder to choose",
        paragraphs: [
          "A tube with short perches suits them and keeps out grackles and jays [1]; a window feeder brings them to the glass [4]; a suet cage that is only accessible from the bottom keeps starlings off while chickadees hang from it [1]. Shelled peanuts in a mesh feeder work better for chickadees than whole ones, which jays carry off [1].",
          "Chickadees also use nest boxes: put one up well before the breeding season with a predator guard, and fill it with sawdust or wood shavings — they are especially attracted to a box they can excavate — at least 60 feet into a wooded area if House Wrens are around [4].",
        ],
      },
    ],
    faq: [
      { question: "What do black-capped chickadees eat at feeders?", answer: "Sunflower seeds, peanuts, suet, peanut butter and mealworms [4]." },
      { question: "What is the best chickadee bird feeder?", answer: "Any small feeder: a tube, a window feeder or a bottom-access suet cage; they even use feeders that swing in the wind [1][4]." },
    ],
    extraSources: [aabSpecies(4, "Black-capped_Chickadee", "Black-capped Chickadee")],
  }),

  "/feeders/for/blue-jay": build({
    path: "/feeders/for/blue-jay",
    keyword: "blue jay feeder",
    title: "Blue Jay Feeder: Tray & Hopper Feeders, Peanuts & Sunflower",
    description: "The right blue jay feeder is a tray or hopper on a post, not a hanging tube: what blue jays eat (peanuts, sunflower, suet, acorns), caching, and feeding them.",
    image: bimg("blue-jay", "Blue jay — a bird that prefers a tray or hopper blue jay feeder on a post"),
    intro: [
      "A blue jay feeder needs a ledge: Blue Jays prefer tray feeders or hopper feeders on a post rather than hanging feeders, and they prefer peanuts, sunflower seeds and suet [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What blue jays eat",
        paragraphs: [
          "Jays glean insects and take nuts, seeds and grain; over a year stomach contents are about 22 percent insect, with acorns, nuts, fruit and grain nearly all the rest [4]. At feeders: peanuts, sunflower seeds and suet [4]. Larger birds like jays may grab several peanuts at a time and fly off to hide them for later [1] — jays cache food, so a tray of whole peanuts disappears faster than it is eaten.",
        ],
      },
      {
        heading: "Which blue jay feeder to choose",
        paragraphs: [
          "Large hoppers attract most species of feeder birds and allow larger species to feed [1], and a post-mounted hopper or tray is exactly what jays prefer [4]. Feeders with short perches exclude larger birds such as grackles and jays [1], so if you want jays, do not rely on a tube. Jays often take drinks from birdbaths, and planting oaks provides acorns for future jays [4].",
          "Jays sometimes dominate a feeder; at Florida feeders they are themselves dominated by Red-headed Woodpeckers, scrub-jays, grackles and squirrels [4]. If they crowd out smaller birds, add a second, short-perch tube the jays cannot use [1].",
        ],
      },
    ],
    faq: [
      { question: "Do blue jays like apples at a blue jay feeder?", answer: "Fruit is a small part of their diet; at feeders All About Birds lists peanuts, sunflower seeds and suet as their preferences [4]." },
      { question: "What is the best feeder for blue jays?", answer: "A tray or hopper feeder on a post with whole peanuts and sunflower; they avoid hanging tube feeders [1][4]." },
    ],
    extraSources: [aabSpecies(4, "Blue_Jay", "Blue Jay")],
  }),

  "/feeders/for/house-finch": build({
    path: "/feeders/for/house-finch",
    keyword: "feeding house finches",
    title: "Feeding House Finches: Foods, Feeder Types & Eye Disease",
    description: "Feeding house finches: black-oil sunflower in a tube or hopper, the flocks of 50 they bring, millet and milo as extras, and cleaning that prevents eye disease.",
    image: bimg("house-finch", "Male house finch — feeding house finches starts with small black-oil sunflower seed"),
    intro: [
      "Feeding house finches is easy: fill it with small black-oil sunflower seed, and if House Finches discover it they might bring flocks of 50 or more birds with them [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What house finches eat",
        paragraphs: [
          "House Finches eat almost exclusively plant material — seeds, buds and fruit — and at feeders they take black-oil sunflower over the larger striped sunflower, plus millet and milo [4]. Black-oil sunflower is the preferred food for a wide variety of birds and a favorite of finches [1]; nyjer in a finch feeder draws them alongside goldfinches [1].",
        ],
      },
      {
        heading: "Feeding house finches safely: feeder type and eye disease",
        paragraphs: [
          "Any tube, hopper or window feeder with sunflower will do; feeders with short perches suit finches while excluding grackles and jays [1]. The issue with House Finches is hygiene: some populations have declined steeply since 1994 because of mycoplasmal conjunctivitis, an eye disease spread at feeders [4]. Infected birds have red, swollen, runny or crusty eyes; when you see one, remove the feeders it uses for a couple of weeks and clean them and the area thoroughly [2].",
          "Routine cleaning every week or two, and more often in heavy use or wet weather, with warm water and dish soap, is the prevention [1].",
        ],
      },
    ],
    faq: [
      { question: "What foods work when feeding house finches?", answer: "Black-oil sunflower first, plus millet, milo and nyjer; they are almost entirely seed-eaters [1][4]." },
      { question: "Why do house finches have swollen eyes?", answer: "Mycoplasmal conjunctivitis, a disease spread at feeders. Take the feeder down for two weeks and clean it thoroughly [2][4]." },
    ],
    extraSources: [aabSpecies(4, "House_Finch", "House Finch")],
  }),

  "/feeders/for/american-goldfinch": build({
    path: "/feeders/for/american-goldfinch",
    keyword: "goldfinch feeder",
    title: "Goldfinch Feeder: Nyjer, Sunflower & Feeders Goldfinches Use",
    description: "The best goldfinch feeder: nyjer in a mesh or tube, sunflower in any hopper or platform, ground feeding on spilled seed, and native thistles to keep them near.",
    image: bimg("american-goldfinch", "American goldfinch on a coneflower seed head — a seed specialist at any goldfinch feeder"),
    intro: [
      "Almost any goldfinch feeder works: American Goldfinches use hopper, platform and hanging feeders, do not mind feeders that sway in the wind, and are most attracted to sunflower seed and nyjer [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What goldfinches eat",
        paragraphs: [
          "Goldfinches eat seeds almost exclusively — composites such as sunflowers, thistle and asters, grasses, and tree seeds from alder, birch, western red cedar and elm — and at feeders prefer nyjer and sunflower [4]. Nyjer's popularity as a feeder seed is largely due to its ability to attract finches including American Goldfinch, Pine Siskin and Common Redpoll [1]. They are also happy feeding on the ground beneath feeders on spilled seed [4].",
        ],
      },
      {
        heading: "The goldfinch feeder and the garden",
        paragraphs: [
          "A mesh sock or fine-port tube keeps nyjer dry and limits it to finches; tube feeders keep seed fairly dry and short perches exclude larger birds [1]. For sunflower, any hopper or platform serves them. To keep goldfinches beyond the feeder, plant native thistles and other composite plants, as well as native milkweed — they nest late, in June or July, when those plants have set the fibrous seed they line nests with and feed to their young [4].",
        ],
      },
    ],
    faq: [
      { question: "What seed goes in a goldfinch feeder?", answer: "Nyjer (thistle) and sunflower, offered in a mesh or fine-port feeder for nyjer and any feeder for sunflower [1][4]." },
      { question: "Why did goldfinches stop coming to my nyjer feeder?", answer: "Stale or damp nyjer; replace it, dry the feeder, and keep it out of the rain [1]." },
    ],
    extraSources: [aabSpecies(4, "American_Goldfinch", "American Goldfinch")],
  }),

  "/feeders/for/american-robin": build({
    path: "/feeders/for/american-robin",
    keyword: "robin feeder",
    title: "Robin Feeder: Mealworms, Fruit & Why Robins Skip Seed",
    description: "What a robin feeder should offer — mealworms, fruit, a ground tray and a bird bath — because American robins eat earthworms and fruit, not seed; plus setup.",
    image: bimg("american-robin", "American robin on a lawn — a robin feeder offers fruit and mealworms, not birdseed"),
    intro: [
      "A robin feeder is not a seed feeder: American Robins eat invertebrates and fruit, so a low tray of mealworms or cut fruit, a bird bath and a pesticide-free lawn do more than any hopper [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What robins eat",
        paragraphs: [
          "Robins eat large numbers of both invertebrates and fruit: earthworms, insects and some snails, especially in spring and summer, and an enormous variety of fruit — chokecherries, hawthorn, dogwood, sumac and juniper berries [4]. They eat more earthworms in the morning and more fruit later in the day [4]. Because they forage largely on lawns, they are vulnerable to pesticide poisoning [4] — the strongest reason a robin-friendly yard is an unsprayed one.",
        ],
      },
      {
        heading: "A robin feeder that actually works",
        paragraphs: [
          "All About Birds notes the species often comes to bird feeders [4], but what it comes for is not seed. A ground tray or low platform — trays attract most species of feeder birds [1] — with mealworms, soaked raisins or cut fruit is the format; fruit-bearing native shrubs are the long-term feeder. Robins also take readily to a nest structure put up well before the breeding season [4]. Keep any tray clean every week or two, since fruit spoils faster than seed [1].",
        ],
      },
    ],
    faq: [
      { question: "Will robins use a seed feeder or a robin feeder?", answer: "Rarely — their diet is earthworms, insects and fruit. Offer mealworms and fruit on a low tray instead [4]." },
      { question: "How do I attract robins to my yard?", answer: "A pesticide-free lawn, fruiting native shrubs such as dogwood and sumac, water, and a nest shelf put up before spring [4]." },
    ],
    extraSources: [aabSpecies(4, "American_Robin", "American Robin")],
  }),

  "/feeders/for/downy-woodpecker": build({
    path: "/feeders/for/downy-woodpecker",
    keyword: "downy woodpecker feeder",
    title: "Downy Woodpecker Feeder: Suet First, Then Seed & Peanuts",
    description: "The best downy woodpecker feeder is a suet cage: what downy woodpeckers eat at feeders (suet, sunflower, millet, peanuts, peanut butter), starling-proof cages.",
    image: bimg("downy-woodpecker", "Downy woodpecker — the woodpecker most likely to visit a downy woodpecker feeder in a backyard"),
    intro: [
      "A downy woodpecker feeder starts with suet: where they occur, Downy Woodpeckers are the most likely woodpecker species to visit a backyard bird feeder, and they prefer suet feeders [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "What downy woodpeckers eat",
        paragraphs: [
          "Mainly insects — beetle larvae inside wood or bark, ants and caterpillars — with about a quarter of the diet plant material such as berries, acorns and grain [4]. At feeders they prefer suet but are also fond of black-oil sunflower seeds, millet, peanuts and chunky peanut butter, and occasionally drink from oriole and hummingbird feeders [4]. Suet is a good choice for attracting insect-eating birds generally [1].",
        ],
      },
      {
        heading: "The downy woodpecker feeder and where to hang it",
        paragraphs: [
          "Suet cages that are only accessible from the bottom tend to be starling-resistant but allow woodpeckers, nuthatches and chickadees to feed [1]. Hang the cage near a trunk so the bird can approach along wood, close to natural cover but about ten feet from branches squirrels can jump from, with a baffle above [1]. A mesh feeder of shelled peanuts beside it adds a second food they take [1][4].",
        ],
      },
    ],
    faq: [
      { question: "What goes in a downy woodpecker feeder?", answer: "Suet first, then black-oil sunflower, millet, peanuts and chunky peanut butter [4]." },
      { question: "How do I keep starlings off the woodpecker suet?", answer: "Use a suet cage that is only accessible from the bottom; FeederWatch finds these starling-resistant while woodpeckers, nuthatches and chickadees still feed [1]." },
    ],
    extraSources: [aabSpecies(4, "Downy_Woodpecker", "Downy Woodpecker")],
  }),

  "/feeders/for/ruby-throated-hummingbird": build({
    path: "/feeders/for/ruby-throated-hummingbird",
    keyword: "hummingbird feeder",
    title: "Hummingbird Feeder Guide: Sugar Water, Cleaning & Placement",
    description: "How to run a hummingbird feeder for ruby-throated hummingbirds: the 1:4 sugar-water recipe, no dye, cleaning every couple of days, cat and window safety.",
    image: timg("hummingbird-feeder", "Male ruby-throated hummingbird hovering at a red hummingbird feeder"),
    intro: [
      "A hummingbird feeder is the simplest feeder to fill and the most demanding to keep: about one-quarter cup of table sugar per cup of water, no food coloring, changed before it grows cloudy [4].",
      "Everything below about feeder design, foods, placement and cleaning is drawn from Project FeederWatch [1][2] and All About Birds [3][4].",
    ],
    sections: [
      {
        heading: "The recipe and the rules",
        paragraphs: [
          "Make the mixture with about one-quarter cup of sugar per cup of water; food coloring is unnecessary and table sugar is the best choice [4]. Ruby-throated Hummingbirds prefer red or orange flowers, but there is no need to color the sugar water [4]. Change it before it grows cloudy or discolored, and remember that in hot weather sugar water ferments rapidly to produce toxic alcohol [4]. At any sign of cloudy water or black mold, discard the solution and clean immediately [1].",
        ],
      },
      {
        heading: "Choosing, cleaning and placing a hummingbird feeder",
        paragraphs: [
          "Choose a feeder that is easy to take apart and clean, because it should be washed or run through the dishwasher frequently — every couple of days, ideally every time it is refilled [1]. Feeders are generally safe for hummingbirds, but can be a problem if they make the birds easy targets for cats or are placed near windows the birds might fly into [4]; some cats learn to lie in wait, so place feeders where a cat cannot ambush, and treat nearby glass with markings spaced no more than 2 inches apart [3][4].",
          "Planting tubular flowers — trumpet creeper, cardinal flower, honeysuckle, jewelweed and bee-balm — feeds the same birds without maintenance, and they also catch insects in midair for protein [4].",
        ],
      },
    ],
    faq: [
      { question: "What is the ratio for hummingbird sugar water?", answer: "About one-quarter cup of plain table sugar per cup of water; no dye, no honey [4]." },
      { question: "How often should a hummingbird feeder be cleaned?", answer: "Every couple of days, ideally at every refill, and immediately if the water clouds or black mold appears [1]." },
    ],
    extraSources: [aabSpecies(4, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird")],
  }),
};

/** Feeder guide pages that keep the old template but need the same eBird state note; placeholder for future entries. */
export const feederEbirdSource = EBIRD;
