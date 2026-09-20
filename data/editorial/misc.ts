import type { EditorialContent, EditorialImage } from "./types";
import topicImages from "../topic-images.json";
import groupImages from "../group-images.json";

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const TOPIC = topicImages as Record<string, Img>;
const BIRD = groupImages as Record<string, Img & { species: string }>;
const timg = (key: string, alt: string): EditorialImage | undefined => { const m = TOPIC[key]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };
const bimg = (slug: string, alt: string): EditorialImage | undefined => { const m = BIRD[slug]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };

const FW = { id: 1, label: "Project FeederWatch (Cornell Lab of Ornithology) — Feeding Birds: feeders, foods, water, placement, cleaning and safety", url: "https://feederwatch.org/learn/feeding-birds/" };
const FW_SICK = { id: 2, label: "Project FeederWatch — Sick Birds and Bird Diseases", url: "https://feederwatch.org/learn/sick-birds-and-bird-diseases/" };
const AAB_WINDOWS = { id: 3, label: "All About Birds (Cornell Lab of Ornithology) — Why Birds Hit Windows, and How You Can Help Prevent It", url: "https://www.allaboutbirds.org/news/why-birds-hit-windows-and-how-you-can-help-prevent-it/" };
const AUDUBON_YARD = { id: 4, label: "National Audubon Society — How to Make Your Yard Bird-Friendly", url: "https://www.audubon.org/news/how-make-your-yard-bird-friendly-0" };
const AUDUBON_NATIVE = { id: 5, label: "National Audubon Society — Why Native Plants Matter", url: "https://www.audubon.org/content/why-native-plants-matter" };
const EBIRD = { id: 6, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); state records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" };
const AOS = { id: 7, label: "American Ornithological Society — Checklist of North and Middle American Birds (taxa list, accessed 2026-08-11)", url: "https://checklist.americanornithology.org/taxa/" };

export const miscEditorial: Record<string, EditorialContent> = {
  "/": {
    path: "/", keyword: "how to attract birds",
    title: "How to Attract Birds to Your Backyard: Food, Water & Plants",
    h1: "How to attract birds to your backyard",
    description: "How to attract birds in five steps: the right food and feeder, water, native plants, nest sites and safe glass — with FeederWatch, Audubon and eBird sources.",
    image: timg("platform-feeder", "How to attract birds: a junco, chickadee and cardinal share a platform feeder placed near cover"),
    schemaType: "HowTo",
    steps: [
      { name: "Offer the right food in the right feeder", text: "Start with black-oil sunflower, the seed most backyard birds prefer, in a hopper or tube placed near cover but about ten feet from branches squirrels can jump from [1]." },
      { name: "Add water at ground level", text: "A shallow bath, ideally with dripping water, draws birds as reliably as a feeder; change the water daily [1]." },
      { name: "Plant natives in layers", text: "Canopy trees, fruiting shrubs, seed-bearing perennials and leaf litter supply insects, fruit and seed through the year [4][5]." },
      { name: "Give birds somewhere to nest", text: "Dense shrubs, dead wood left standing where safe, and a well-built nest box add the fourth thing birds need [4]." },
      { name: "Remove the two hazards", text: "Make glass near feeders visible with markings no more than two inches apart, and keep cats indoors [1][3]." },
    ],
    intro: [
      "How to attract birds comes down to supplying the four things every species needs — food, water, cover and a place to nest — and removing the two hazards that kill the birds you attract: glass and cats. Everything on this site is built from that list and from sources you can check.",
      "Feeding and water advice comes from Project FeederWatch [1][2], window safety from All About Birds [3], planting from Audubon [4][5], and the state-by-state bird lists from eBird records retrieved through GBIF [6].",
    ],
    sections: [
      { heading: "Step 1 — Food that attracts birds", paragraphs: [
        "The fastest way to attract birds is food they already prefer. Black-oil sunflower is the preferred food item for a wide variety of birds and a favorite of cardinals, chickadees, finches and sparrows; nyjer draws goldfinches, siskins and redpolls; millet and cracked corn feed the ground birds; suet brings woodpeckers, nuthatches and chickadees [1]. Large hoppers attract most species, tubes with short perches keep to small birds and keep seed dry, and trays near the ground draw juncos, doves and sparrows [1].",
        "Placement matters as much as seed. Put the feeder near cover such as trees or shrubs but about ten feet from branches squirrels can jump from, keep the seed dry, and clean the feeder every week or two — more often in wet weather — because leftover seed and hulls harbor pathogens [1][2]. A new feeder can sit unvisited for days while birds find it by sight and by watching each other, so give it time before changing anything [1].",
      ]},
      { heading: "Step 2 — Water that attracts birds", paragraphs: [
        "Water works as well as seed, and it attracts species that never visit a feeder. Birds are attracted to water just as they are to feeders, prefer baths at ground level, and come fastest to dripping or moving water; keep the bath shallow — an inch or two — add a stone or branch so small birds can drink without getting wet, and change the water daily [1].",
      ]},
      { heading: "Step 3 — Native plants that attract birds", paragraphs: [
        "Nothing provides an easier or more dependable food supply than birdscaping with native vegetation [1]. Audubon's method is habitat in layers — canopy trees, fruiting shrubs, seed-bearing perennials, and leaf litter for insects — with fruit staggered from serviceberry in summer to cedar and holly in winter [4]; a native oak supports over 500 caterpillar species against five for a ginkgo, and a chickadee brood needs more than 6,000 caterpillars [5].",
        "Cover is what turns a visit into a habit. Feeder birds want evergreens or dense shrubs within a short flight of the food, ground birds want a brush pile to dive into, and fledglings need thickets to hide in — so leave some of the yard untidy, and lay off pesticides that remove the insects nestlings are fed [1][4].",
      ]},
      { heading: "Step 4 — Nest sites for the birds you attract", paragraphs: [
        "Food and water bring birds through; nest sites keep them. Shrubs and small trees hold songbird nests, dead trees and limbs left standing where they are safe give woodpeckers and chickadees cavities, and a nest box built to the right dimensions — with ventilation, drainage, no perch and a guard against predators — adds the fourth thing cavity nesters need [4]. Which birds nest in your area, and when, is in the state pages below.",
      ]},
      { heading: "Step 5 — Keep attracted birds safe", paragraphs: [
        "Window collisions kill perhaps a billion or more birds a year in North America, and older rules about safe feeder-to-window distances are no longer thought valid; make glass near feeders visible with markings no more than 2 inches apart, exterior screens or hanging cords [3]. Cats kill hundreds of millions of birds a year — keep them indoors [1]. If birds with swollen eyes or fluffed, lethargic postures appear, take feeders down for a couple of weeks and disinfect them [2].",
      ]},
      { heading: "Birds you can attract in your state", paragraphs: [
        "Which birds you can attract depends on where you live, so this site's state pages are built from eBird checklists reported 2020–2024 and retrieved through GBIF [6]: for each of nine states so far — Florida, Arizona, California, Colorado, Oregon, Tennessee, Texas, Michigan and Rhode Island — the most-reported backyard species, their month-by-month presence, and pages for hummingbirds, woodpeckers, owls, hawks, warblers, sparrows, wrens, finches, doves, ducks, herons, jays, chickadees, orioles, magpies and eagles. Bird profiles draw on the Cornell Lab's All About Birds, and the species catalog follows the American Ornithological Society checklist [7].",
      ]},
    ],
    faq: [
      { question: "What is the fastest way to attract birds to a backyard?", answer: "A feeder of black-oil sunflower near cover plus a shallow bird bath with dripping water — the two resources FeederWatch says draw birds most reliably [1]." },
      { question: "How long does it take to attract birds to a new feeder?", answer: "Anywhere from a day to a few weeks. Birds find feeders by sight and by watching other birds, so a feeder near cover in a yard that already has birds fills fastest; keep the seed fresh and dry while you wait [1]." },
      { question: "Do I need a feeder to attract birds?", answer: "No. FeederWatch says feeders are not the only way, or even the best way, to feed birds; native plants supply insects, fruit and seed more dependably [1][4]." },
      { question: "How do I keep the birds I attract from hitting windows?", answer: "Distance rules are no longer considered valid; instead make the glass visible with 2-inch-spaced markings, screens or cords [3]." },
      { question: "How do I attract birds to a balcony or small yard?", answer: "A window or railing feeder, a shallow dish of water and a few native plants in containers; Audubon notes even very small patches of habitat help migrating birds [4]." },
    ],
    sources: [FW, FW_SICK, AAB_WINDOWS, AUDUBON_YARD, AUDUBON_NATIVE, EBIRD, AOS],
  },

  "/birds": {
    path: "/birds", keyword: "backyard birds",
    title: "Backyard Birds A–Z: Reviewed Profiles & 1,000-Species List",
    description: "Backyard birds A–Z: eleven sourced profiles of the commonest feeder birds — cardinal, chickadee, goldfinch, robin, jay, hummingbird — plus the AOS checklist.",
    image: bimg("northern-cardinal", "Male northern cardinal — among the most familiar backyard birds in eastern North America"),
    intro: [
      "The backyard birds most people meet are a short list — cardinal, chickadee, titmouse, goldfinch, house finch, robin, blue jay, mourning dove, downy woodpecker, hummingbird, oriole — and each has a reviewed profile here built from the Cornell Lab's All About Birds accounts and eBird records [6][8].",
      "Below them is the full A–Z catalog: the first 1,000 living species of the American Ornithological Society's North and Middle American checklist [7], most of which are not backyard birds at all, kept for identification and completeness.",
    ],
    sections: [
      { heading: "How to identify backyard birds", paragraphs: [
        "Start with the feeder, because feeders sort birds by food: black-oil sunflower brings cardinals, chickadees, finches and sparrows; nyjer brings goldfinches, siskins and redpolls; suet brings woodpeckers, nuthatches and chickadees; millet on the ground brings juncos, doves and sparrows [1]. Then use size and shape against a bird you know — the profiles here give size in centimeters and the family — and finally color and field marks from the All About Birds accounts each profile cites [8].",
        "Season matters too. Goldfinches molt twice a year and are olive-brown in winter; robins that stay north roost in trees and feed on berries rather than lawns; blue jays may migrate one year and not the next [8]. The seasonal pages on this site cover spring, summer and fall for the commonest species.",
      ]},
      { heading: "Backyard birds by state", paragraphs: [
        "Which backyard birds you actually see depends on where you live. For nine states — Florida, Arizona, California, Colorado, Oregon, Tennessee, Texas, Michigan and Rhode Island — this site computes the most-reported species, month by month, from eBird checklists reported 2020–2024 and retrieved through GBIF [6]. The Black-capped Chickadee ranks third among all species reported in Michigan and has no records at all in Florida; the Northern Cardinal is the single most-reported bird in both Florida and Tennessee and has only a few hundred records in California [6]. Each of the eleven reviewed profiles shows its own nine-state eBird summary.",
      ]},
    ],
    faq: [
      { question: "What are the most common backyard birds?", answer: "In much of the East: Northern Cardinal, Black-capped or Carolina Chickadee, Tufted Titmouse, American Goldfinch, House Finch, American Robin, Blue Jay, Mourning Dove and Downy Woodpecker — all profiled here; the state pages show local rankings from eBird [6]." },
      { question: "Are all 1,000 birds in the A–Z list backyard birds?", answer: "No — the A–Z follows the AOS checklist, which includes seabirds, tropical species and rarities; the reviewed profiles at the top are the backyard species [7]." },
    ],
    sources: [FW, FW_SICK, AAB_WINDOWS, AUDUBON_YARD, AUDUBON_NATIVE, EBIRD, AOS, { id: 8, label: "All About Birds (Cornell Lab of Ornithology) — Bird Guide species accounts (cited on each profile)", url: "https://www.allaboutbirds.org/guide/" }],
  },

  "/bird-food": {
    path: "/bird-food", keyword: "bird feed",
    title: "Bird Feed Guide: Which Seed, Suet & Nectar Attracts What",
    description: "Bird feed explained with Project FeederWatch: black-oil sunflower, safflower, nyjer, millet, cracked corn, peanuts, suet and sugar water.",
    image: timg("black-oil-sunflower", "Black-capped chickadee taking a sunflower seed — black-oil sunflower is the bird feed most species prefer"),
    intro: [
      "Bird feed is not one thing: each seed, nut and fat draws a different set of birds, and Project FeederWatch — the Cornell Lab's decades-long feeder survey — has ranked them by what actually comes to the feeder [1].",
      "The preferences below are FeederWatch's [1]; the cleaning and disease rules are FeederWatch's too [1][2]; window safety is from All About Birds [3].",
    ],
    sections: [
      { heading: "Bird feed by seed: what each one attracts", paragraphs: [
        "Black-oil sunflower is the preferred food item for a wide variety of birds and among the favorite feeder foods of cardinals, chickadees, finches and sparrows [1]. Safflower attracts cardinals and other big-billed birds, though most birds prefer sunflower [1]. Nyjer (thistle), an imported seed, is popular largely for its ability to attract finches including American Goldfinch, Pine Siskin and Common Redpoll [1]. Millet is a favored food of many smaller ground-foraging birds — a handful on the ground keeps juncos and sparrows happy — and cracked corn attracts doves, quail and sparrows [1]. Milo is not a favorite of most birds and often goes to waste, so mixes heavy in it are poor value [1].",
      ]},
      { heading: "Beyond seed: suet, peanuts, nectar and grit", paragraphs: [
        "Suet is a good choice for attracting insect-eating birds; cages that open only from the bottom are starling-resistant but still let woodpeckers, nuthatches and chickadees feed [1]. Peanuts: jays grab several whole ones and cache them, while chickadees, nuthatches and titmice do better with shelled pieces [1]. For hummingbirds, one part sugar to four parts boiling water, cooled, with no red food coloring, which is harmful; orioles take a more dilute one-to-six mix [1]. Grit — sand, small pebbles, crushed eggshell or oyster shell — helps birds grind food in the gizzard, and eggshell adds calcium birds need during nesting [1].",
        "Match the food to the feeder as well as the bird. Tube feeders keep seed fairly dry and their short perches suit small birds while excluding grackles and jays; large hoppers let doves and grackles feed; trays attract most species and, near the ground, juncos, doves and sparrows [1]. Sunflower chips — hulled pieces — leave no shells but spoil faster when damp, so offer less at a time [1]. Millet in a hanging tube is mostly kicked out by finches; put it on a low tray or the ground where its birds feed [1].",
        "Whatever the feed, keep it dry and fresh: clean feeders every week or two, more often in wet weather, discard wet or moldy seed, and if birds with swollen eyes or fluffed, lethargic postures appear, take feeders down for a couple of weeks and disinfect them [1][2].",
      ]},
    ],
    faq: [
      { question: "What is the best all-round bird feed?", answer: "Black-oil sunflower — FeederWatch calls it the preferred food for a wide variety of birds [1]." },
      { question: "What should I avoid putting out?", answer: "Mixes heavy in milo, which most birds leave to waste; red-dyed nectar, which is harmful; and any seed that is wet or moldy [1]." },
    ],
    sources: [FW, FW_SICK, AAB_WINDOWS],
  },

  "/bird-problems/no-birds-at-feeder": {
    path: "/bird-problems/no-birds-at-feeder", keyword: "no birds at feeder",
    title: "No Birds at Feeder? Seven Causes & Fixes From FeederWatch",
    description: "No birds at feeder: the seven usual causes — stale seed, natural food in season, no cover, a hawk or cat, a dirty feeder, a new feeder, disease — and the fixes.",
    image: timg("tube-feeder", "American goldfinch on a tube feeder — when there are no birds at feeder, seed, placement and cleanliness are the first checks"),
    intro: [
      "No birds at feeder is usually one of seven problems, and most are fixed in a day: the seed, the spot, the cover, a predator, the dirt, the calendar, or a feeder that is simply new.",
      "The checks below follow Project FeederWatch's guidance on foods, placement, cleaning and sick birds [1][2] and All About Birds on windows [3].",
    ],
    sections: [
      { heading: "No birds at feeder: the seven causes", paragraphs: [
        "1. The seed. Wet, moldy or stale seed is ignored, and mixes heavy in milo go to waste; switch to fresh black-oil sunflower, the preferred food for a wide variety of birds [1]. 2. Natural food. In late summer and fall wild seed and fruit are everywhere and feeder visits drop; they return as natural food thins [1]. 3. No cover. Feeders should be close to natural cover such as trees or shrubs that offer refuge — evergreens are ideal — but about ten feet from strong branches that give squirrels and cats a jump-off [1]. 4. A predator. A cat watching from cover or a hawk working the yard empties a feeder; cats kill hundreds of millions of birds a year and should stay indoors [1].",
        "5. A dirty feeder. Debris such as leftover seed and hulls harbors pathogens; take the feeder apart and wash with warm water and dish soap every week or two, more often in wet weather [1]. 6. Disease. Birds with red, swollen or crusty eyes, wart-like growths, or fluffed-up lethargic postures mean the feeder comes down for a couple of weeks and is disinfected — one part bleach to nine parts water for ten minutes, then rinsed and dried [1][2]. 7. A new feeder. Birds find feeders by sight and by each other; a new one can sit unvisited for days to weeks, and placing it in a quiet spot that is easy to see from cover shortens the wait [1].",
      ]},
      { heading: "When the feeder is fine and the yard is the problem", paragraphs: [
        "Two things outside the feeder matter. Windows: if a feeder is near glass that reflects sky or trees, birds may be hitting it — collisions kill perhaps a billion or more birds a year, and the fix is markings spaced no more than 2 inches apart, screens or cords, not distance [3]. And habitat: FeederWatch's own advice is that feeders are not the only way, or even the best way, to feed birds — native plants, water and cover bring birds a feeder alone cannot [1]. A shallow bath with dripping water is the single addition that draws birds fastest [1].",
      ]},
    ],
    faq: [
      { question: "Why are no birds coming to my feeder?", answer: "Most often stale seed, no nearby cover, a cat or hawk, a dirty feeder, or natural food in season; a brand-new feeder may just need days to weeks to be found [1]." },
      { question: "How long does it take birds to find a new feeder?", answer: "Days to a few weeks; fresh black-oil sunflower placed near cover and easy to see shortens it [1]." },
      { question: "Should I take my feeder down if birds look sick?", answer: "Yes — for a couple of weeks, cleaning and disinfecting it before it goes back up [2]." },
    ],
    sources: [FW, FW_SICK, AAB_WINDOWS],
  },

  "/tools/bird-feeder-calculator": {
    path: "/tools/bird-feeder-calculator", keyword: "bird feeder calculator",
    title: "Bird Feeder Calculator: How Many Feeders & Where to Put Them",
    description: "A bird feeder calculator for planning a feeding station: how many feeders for your space and birds, which types, plus FeederWatch placement and cleaning rules.",
    image: timg("hopper-feeder", "Northern cardinal at a pole-mounted hopper — the bird feeder calculator starts with one hopper near cover"),
    intro: [
      "This bird feeder calculator gives a conservative starting layout — how many feeders, of which types, for the birds you want — and deliberately does not estimate pounds of seed, because weather, species and spoilage make fixed quantities unsafe.",
      "The rules it applies are Project FeederWatch's on feeder types, foods, placement and cleaning [1][2] and All About Birds' on windows [3].",
    ],
    sections: [
      { heading: "What the bird feeder calculator assumes", paragraphs: [
        "One feeder per food, because foods sort birds: a hopper or tray of black-oil sunflower for cardinals, chickadees, finches and sparrows; a tube or mesh of nyjer for goldfinches, siskins and redpolls; a suet cage for woodpeckers, nuthatches and chickadees; millet on a low tray or the ground for juncos, doves and sparrows [1]. Large hoppers attract most species and let doves and grackles feed; tubes with short perches exclude jays and grackles [1]. It adds a bird bath to every plan, since birds are attracted to water just as they are to feeders [1].",
        "The station also assumes cover. Feeders belong close to natural cover such as trees or shrubs that offer refuge to birds as they wait their turn to feed — evergreens are ideal, hiding birds from predators and buffering winter wind — and a loosely stacked brush pile nearby gives ground birds such as Song Sparrows resting and escape cover [1]. If the yard has none, the plan's first item is a shrub, not a second feeder.",
        "Placement: a quiet area, easy to see and refill, close to natural cover such as trees or shrubs — evergreens are ideal — but about ten feet from strong branches that squirrels and cats can jump from [1]. Squirrels can jump to feeders less than ten feet from a tree or building, so a pole with a baffle is assumed for any station in the open [1].",
      ]},
      { heading: "Why the bird feeder calculator caps the count", paragraphs: [
        "More feeders mean more cleaning: each seed or suet feeder needs washing every week or two and more often in heavy use or wet weather, hummingbird feeders every couple of days, and bird baths a water change every day [1]. FeederWatch's advice is that if you cannot follow those practices year-round, limit feeding to the times you can [1]. A plan you can keep clean beats a bigger one, and if several sick birds appear, all of it comes down for a couple of weeks [2]. Any window near the station needs markings 2 inches apart, screens or cords [3].",
      ]},
    ],
    faq: [
      { question: "How many bird feeders should I have?", answer: "Start with one per food type you offer — sunflower, nyjer, suet, millet — plus a bath, and add only what you can clean every week or two [1]." },
      { question: "How far apart should bird feeders be?", answer: "FeederWatch's placement rule is about cover, not spacing: near shrubs or evergreens, ten feet from branches squirrels can jump from; spreading feeders out also reduces crowding and disease [1][2]." },
    ],
    sources: [FW, FW_SICK, AAB_WINDOWS],
  },
};
