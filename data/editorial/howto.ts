import type { EditorialContent, EditorialImage } from "./types";
import topicImages from "../topic-images.json";
import groupImages from "../group-images.json";

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const TOPIC = topicImages as Record<string, Img>;
const BIRD = groupImages as Record<string, Img & { species: string }>;
const timg = (key: string, alt: string): EditorialImage | undefined => { const m = TOPIC[key]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };
const bimg = (slug: string, alt: string): EditorialImage | undefined => { const m = BIRD[slug]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };

/**
 * Sources shared by the how-to guides. Every guide carries FeederWatch [1],
 * All About Birds on windows [2] and Audubon's yard guide [3]; the rest are
 * per-page.
 */
const FW = { id: 1, label: "Project FeederWatch (Cornell Lab of Ornithology) — Feeding Birds: feeders, foods, water, placement, cleaning and safety", url: "https://feederwatch.org/learn/feeding-birds/" };
const AAB_WINDOWS = { id: 2, label: "All About Birds (Cornell Lab of Ornithology) — Why Birds Hit Windows, and How You Can Help Prevent It", url: "https://www.allaboutbirds.org/news/why-birds-hit-windows-and-how-you-can-help-prevent-it/" };
const AUDUBON_YARD = { id: 3, label: "National Audubon Society — How to Make Your Yard Bird-Friendly", url: "https://www.audubon.org/news/how-make-your-yard-bird-friendly-0" };
const AUDUBON_NATIVE = (id: number) => ({ id, label: "National Audubon Society — Why Native Plants Matter", url: "https://www.audubon.org/content/why-native-plants-matter" });
const NESTWATCH = (id: number) => ({ id, label: "NestWatch (Cornell Lab of Ornithology) — Features of a Good Birdhouse", url: "https://nestwatch.org/learn/all-about-birdhouses/features-of-a-good-birdhouse/" });
const ABA = (id: number) => ({ id, label: "American Birding Association — ABA Code of Birding Ethics", url: "https://www.aba.org/aba-code-of-birding-ethics/" });
const aab = (id: number, slug: string, name: string) => ({ id, label: `All About Birds (Cornell Lab of Ornithology) — ${name}: Overview and Life History`, url: `https://www.allaboutbirds.org/guide/${slug}/overview` });

/** Shared closing section: the three safety rules every guide ends with. */
const SAFETY = {
  heading: "Keep the birds you attract safe: windows, cats, clean feeders",
  paragraphs: [
    "Window collisions kill perhaps a billion or more birds a year in North America, and far more die at homes and low-rise buildings than at high-rises simply because there are so many of them [2]. Older rules about safe feeder-to-window distances are no longer thought valid; the fix is to make the glass visible — markings spaced no more than 2 inches apart on the outside, exterior screens, or hanging cords [1][2].",
    "Cats are the most numerous pet in North America and kill hundreds of millions of birds each year; ground-feeding birds, ground-nesting birds and fledglings are at greatest risk, and feeder birds are easy prey, so FeederWatch strongly recommends keeping cats indoors [1]. Clean seed and suet feeders every week or two — more often in heavy use or wet weather — with warm water and dish soap, since leftover seed and hulls harbor pathogens [1].",
  ],
};

type Spec = { path: string; keyword: string; title: string; h1?: string; description: string; image?: EditorialImage; intro: string[]; sections: { heading: string; paragraphs: string[] }[]; faq: { question: string; answer: string }[]; extraSources?: { id: number; label: string; url: string }[]; noSafety?: boolean };
const guide = (s: Spec): EditorialContent => ({
  path: s.path, keyword: s.keyword, title: s.title, h1: s.h1, description: s.description, image: s.image, intro: s.intro,
  sections: s.noSafety ? s.sections : [...s.sections, SAFETY],
  faq: s.faq,
  sources: [FW, AAB_WINDOWS, AUDUBON_YARD, ...(s.extraSources ?? [])],
});

export const howtoEditorial: Record<string, EditorialContent> = {
  "/how-to-attract": guide({
    path: "/how-to-attract", keyword: "bird attraction guides",
    title: "Bird Attraction Guides: Feeder, Bath, Balcony & Species",
    h1: "Bird attraction guides, one situation at a time",
    description: "Bird attraction guides for a feeder, new feeder, bird bath, balcony, birdhouse and winter, plus goldfinch, cardinal, chickadee, hummingbird and bluebird guides.",
    image: timg("platform-feeder", "Junco, chickadee and cardinal sharing a feeder — every bird attraction guide starts with food near cover"),
    intro: [
      "These bird attraction guides each take one situation — a feeder that stays empty, a balcony with no yard, a winter garden, one species you want — and answer it with the four things every bird needs: food, water, cover and a place to nest. The complete beginner method is on the home page; this hub is the index of the guides.",
      "The guides below draw on Project FeederWatch for feeders, foods and water [1], All About Birds for window safety [2], and Audubon's yard-habitat guidance for plants and layers [3].",
    ],
    sections: [
      { heading: "Guides for attracting birds with food and water", paragraphs: [
        "Black-oil sunflower is the preferred food item for a wide variety of birds and a favorite of cardinals, chickadees, finches and sparrows; nyjer draws goldfinches, siskins and redpolls; millet and cracked corn feed the ground birds; suet brings the insect-eaters [1]. Large hoppers attract most species, tubes with short perches keep to small birds, and trays near the ground draw juncos, doves and sparrows [1] — see the guide to attracting birds to a new feeder.",
        "Because birds need water for drinking and bathing, they are attracted to water just as they are to feeders; a dish or shallow pan works, birds seem to prefer baths at ground level, and dripping water is one of the best ways to make a bath more attractive [1]. The bird-bath guide covers depth, placement and the every-couple-of-days water change.",
      ]},
      { heading: "Guides for attracting birds with cover, plants and nest sites", paragraphs: [
        "Nothing provides an easier or more dependable food supply than birdscaping the yard with native vegetation, and because habitat loss is the leading cause of decline for many species, planting natives is one of the best ways to support local birds [1]. Audubon's plan is habitat layers — canopy trees for nuts and cavities, shrubs for fruit and nests, herbaceous plants for seed, and leaf litter for the insects birds eat — with fruit staggered through the seasons: serviceberry and cherry in summer, dogwood and spicebush for fall migrants, cedar and holly for winter [3].",
        "A well-built nest box adds the fourth need for cavity nesters; the birdhouse guide follows NestWatch's checklist. And if you have no yard, the balcony guide shows what a container garden and a window feeder can do — Audubon notes even very small patches of habitat give tired, hungry birds what they need during migration [3].",
      ]},
      { heading: "Species guides: attracting one bird at a time", paragraphs: [
        "Species guides on this site cover goldfinches, cardinals, chickadees, ruby-throated hummingbirds, Baltimore orioles and bluebirds, each built from the Cornell Lab's backyard tips for that species and the eBird records that show where it actually occurs. The links at the foot of this page reach every guide.",
      ]},
    ],
    faq: [
      { question: "Which bird attraction guide should I start with?", answer: "If you have a yard, the yard guide; if you have a feeder nobody visits, the new-feeder guide; if you have only a balcony, the balcony guide — each is a complete method for that situation." },
      { question: "What is the fastest way to attract birds?", answer: "A feeder of black-oil sunflower placed about ten feet from cover, plus a shallow bird bath — the two resources FeederWatch says draw birds most reliably [1]." },
      { question: "What do birds need most in a yard?", answer: "Food, water, cover and nest sites, in that order of speed; native plants supply all four over time [1][3]." },
    ],
  }),

  "/how-to-attract/birds-to-your-yard": guide({
    path: "/how-to-attract/birds-to-your-yard", keyword: "how to attract birds to your yard",
    title: "How to Attract Birds to Your Yard: Habitat Layers That Work",
    description: "How to attract birds to your yard the Audubon way: native plants in layers, staggered fruit and seed, water, brush piles, dead wood, no pesticides.",
    image: timg("hopper-feeder", "Northern cardinal at a yard feeder — how to attract birds to your yard begins with cover and native plants"),
    intro: [
      "How to attract birds to your yard is a habitat question before it is a feeder question: Audubon's guidance is to think of the garden as habitat that provides food, shelter and nesting sites through the whole year [3].",
      "This guide follows Audubon's five steps [3], FeederWatch's feeder and water advice [1], and All About Birds on windows [2].",
    ],
    sections: [
      { heading: "How to attract birds to your yard with native plants in layers", paragraphs: [
        "Choose locally native plants, which brim with the insects, berries, nectar and seeds birds need [3]. Audubon groups them by food: native trees such as oaks, willows, birches and maples and herbaceous plants like goldenrod, milkweed and sunflowers host the caterpillars that feed nestlings; serviceberry and cherry fruit in summer, dogwood and spicebush for southbound migrants, cedar and holly through winter; oaks, hickories and walnuts give nuts birds cache; native sunflowers, asters and coneflowers give finch and sparrow seed; red tubular columbine, penstemon and honeysuckle give hummingbird nectar [3].",
        "Then build layers as a natural habitat has them: large canopy trees for nuts, cavities and roosts; shrubs and small trees for fruit and songbird nests; perennials, annuals and groundcovers for seed; and decaying leaves and wood at the base, home to the invertebrates birds eat, including the pupae of most moth caterpillars [3]. Lose some lawn — larger patches of habitat with lawn pathways — and cluster five or more of one species together [3].",
      ]},
      { heading: "Attract birds to your yard with water, feeders and messy corners", paragraphs: [
        "Water is a resource birds need year-round; a bird bath, a hollowed boulder that catches rain, or a drip or fountain — the sound of running water is particularly attractive and may bring birds flocking during migration [3]. Change bath water every day to keep it fresh, and add stones or branches in a ground-level bath so birds can drink without getting wet [1].",
        "Place feeders in a quiet area near natural cover such as trees or shrubs — evergreens are ideal — but about ten feet from strong branches that squirrels and cats can jump from, and stack a loose brush pile nearby as escape cover for ground birds [1]. Then do not be too neat: leave fallen leaves as mulch and insect habitat, leave seed heads standing through fall and winter, leave dead trees and branches where safe for cavity nesters, and lay off pesticides — a bird-friendly garden is a bug-friendly garden [3].",
      ]},
    ],
    faq: [
      { question: "What attracts birds to a yard the most?", answer: "Native plants that supply insects, fruit, seed and nectar in layers, plus water and cover; feeders speed things up but habitat keeps birds [1][3]." },
      { question: "Should I rake leaves if I want birds?", answer: "No — Audubon advises leaving fallen leaves and woody debris as a habitat layer that holds the insects and moth pupae baby birds eat [3]." },
    ],
  }),

  "/how-to-attract/birds-to-a-new-feeder": guide({
    path: "/how-to-attract/birds-to-a-new-feeder", keyword: "how to attract birds to a new feeder",
    title: "How to Attract Birds to a New Feeder: Seed & Placement",
    description: "How to attract birds to a new feeder: start with black-oil sunflower, place it near cover ten feet from jump-off branches, keep it clean and dry.",
    image: timg("tube-feeder", "American goldfinch on a tube feeder — how to attract birds to a new feeder is mostly seed choice and placement"),
    intro: [
      "How to attract birds to a new feeder is a short list: the right seed, a spot near cover, dry fresh food, and time — birds find feeders by sight and by watching each other, and a new one can sit unvisited for days.",
      "Everything below about foods, feeder types, placement and cleaning is from Project FeederWatch [1]; window advice is from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract birds to a new feeder with the right seed", paragraphs: [
        "Start with black-oil sunflower: it is the preferred food item for a wide variety of birds and among the favorite feeder foods of cardinals, chickadees, finches and sparrows [1]. Skip mixes heavy in milo, which is not a favorite of most birds and often goes to waste [1]. Once regulars arrive, add a second feeder for a second crowd — nyjer for goldfinches, siskins and redpolls; suet for woodpeckers, nuthatches and chickadees; millet on the ground for juncos and sparrows [1].",
        "Match the feeder to the birds: large hoppers attract most species and let doves and grackles feed; tubes with short perches suit finches and exclude jays and grackles; trays attract most species and, near the ground, juncos, doves and sparrows [1].",
      ]},
      { heading: "Feeder placement and the wait for the first birds", paragraphs: [
        "Place the feeder in a quiet area where it is easy to see and convenient to refill, close to natural cover such as trees or shrubs — evergreens are ideal — but not so close to strong branches that squirrels and cats have a jump-off point; about 10 feet is a good compromise [1]. A loosely stacked brush pile near the feeder gives ground birds resting and escape cover [1].",
        "Then wait. Keep the seed dry and fresh — clean feeders more often in wet weather and discard wet seed [1] — because stale food will not draw a first visitor. If nothing comes after two or three weeks, the site guide on why no birds are coming to a feeder walks through the usual causes: natural food in season, a hawk or cat, a window reflection, or simply a feeder that is hard to see from cover.",
      ]},
    ],
    faq: [
      { question: "How long does it take birds to find a new feeder?", answer: "There is no fixed time; days to a few weeks is typical. Fresh black-oil sunflower near cover shortens the wait [1]." },
      { question: "What seed attracts the most birds to a new feeder?", answer: "Black-oil sunflower — FeederWatch calls it the preferred food for a wide variety of birds [1]." },
    ],
  }),

  "/how-to-attract/birds-to-a-bird-bath": guide({
    path: "/how-to-attract/birds-to-a-bird-bath", keyword: "how to attract birds to a bird bath",
    title: "How to Attract Birds to a Bird Bath: Depth, Drips & Cleaning",
    description: "How to attract birds to a bird bath: keep it shallow, near cover, add a dripper for moving water, change the water every day or two, and scrub it weekly.",
    image: timg("bird-bath", "American robin at a bird bath — how to attract birds to a bird bath starts with shallow, fresh, moving water"),
    intro: [
      "How to attract birds to a bird bath rests on one FeederWatch sentence: because birds need water for drinking and bathing, they are attracted to water just as they are to feeders [1].",
      "The setup and cleaning advice below is FeederWatch's [1]; the case for water as year-round habitat is Audubon's [3]; window safety is from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract birds to a bird bath: shape and placement", paragraphs: [
        "You can buy a bird bath or simply use dishes or shallow pans; birds seem to prefer baths at ground level, but raised baths attract birds as well [1]. If the bath is on the ground, arrange a few branches or stones in the water so birds can stand on them and drink without getting wet — particularly important in winter [1]. Like a feeder, a bath belongs near cover that birds can retreat to, but not beside branches a cat can ambush from [1].",
        "One of the best ways to make a bird bath more attractive is dripping water: buy a dripper or sprayer, or recycle a bucket or plastic container by punching a tiny hole in the bottom, filling it and hanging it above the bath so water drips out [1]. Audubon adds that the sound of running water is particularly attractive to birds and may bring them flocking during migration [3].",
      ]},
      { heading: "Keeping bird bath water safe", paragraphs: [
        "Change the water every day to keep it fresh and clean [1]. Replace it as often as possible — every couple of days at minimum — and if you see cloudy water, mold growth or bird droppings, empty the bath and scrub it out; scrub baths regularly, weekly [1]. Keep the ground below feeders and baths clean as well [1].",
        "In freezing climates a bird-bath heater keeps ice from forming. Never add antifreeze; it is poisonous to all animals, including birds [1].",
      ]},
    ],
    faq: [
      { question: "Why won't birds use my bird bath?", answer: "Usually depth, stillness or exposure: keep it shallow with stones to stand on, add a dripper, and place it near cover birds can retreat to [1]." },
      { question: "How often should I change bird bath water?", answer: "Every day to keep it fresh, and scrub the bath weekly or whenever it is cloudy, moldy or fouled [1]." },
    ],
  }),

  "/how-to-attract/birds-without-a-feeder": guide({
    path: "/how-to-attract/birds-without-a-feeder", keyword: "how to attract birds without a feeder",
    title: "How to Attract Birds Without a Feeder: Plants, Water & Cover",
    description: "How to attract birds without a feeder: native plants for insects, fruit, seed and nectar, a bird bath with moving water, brush piles.",
    image: timg("purple-coneflower", "Goldfinch on a coneflower seed head — how to attract birds without a feeder means growing the food instead"),
    intro: [
      "How to attract birds without a feeder is, in FeederWatch's own words, not a compromise: bird feeders are not the only way — or even the best way — to feed birds, and planting native plants is one of the best ways to support bird populations [1].",
      "This guide follows Audubon's native-plant habitat steps [3][4] and FeederWatch's water advice [1]; window safety is from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract birds without a feeder: grow the food", paragraphs: [
        "Native plants brim with insects, berries, nectar and seeds [3]. For insects — the protein 96 percent of land birds rely on to feed chicks — plant native trees such as oaks, willows, birches and maples and herbaceous natives like goldenrod, milkweed and sunflowers [3]; a native oak supports over 500 caterpillar species against five for a ginkgo, and one chickadee brood needs more than 6,000 caterpillars [4]. For fruit, stagger the season: serviceberry and cherry in summer, dogwood and spicebush for fall migrants, cedar and holly for winter [3]. For seed, native sunflowers, asters and coneflowers — and do not deadhead them, since seedheads are fall and winter food [3]. For nectar, red tubular natives such as columbine, penstemon and honeysuckle [3].",
      ]},
      { heading: "Attract birds with water, cover and the things you stop doing", paragraphs: [
        "Water draws birds just as feeders do: a shallow dish or bath, ideally with a dripper for moving water, the water changed daily [1]. Cover comes from shrubs, evergreens and a brush pile — Audubon recommends building one for shelter [3] — and from what you leave alone: fallen leaves as mulch and insect habitat, dead trees and branches where safe for cavity nesters, and no pesticides, because a bird-friendly garden is a bug-friendly garden [3].",
        "The payoff is a food supply FeederWatch calls easier and more dependable than any feeder, and one that does not need weekly scrubbing [1].",
      ]},
    ],
    faq: [
      { question: "Can you attract birds without feeding them?", answer: "Yes — FeederWatch says feeders are not the best way to feed birds; native plants, water and cover do it more dependably [1][3]." },
      { question: "What plants attract birds without a feeder?", answer: "Oaks, birches and goldenrod for insects; serviceberry, dogwood, cedar and holly for fruit; sunflowers, asters and coneflowers for seed; columbine and honeysuckle for nectar [3]." },
    ],
    extraSources: [AUDUBON_NATIVE(4)],
  }),

  "/how-to-attract/birds-with-sounds": guide({
    path: "/how-to-attract/birds-with-sounds", keyword: "bird calls to attract birds",
    title: "Bird Calls to Attract Birds: What Works, What the Ethics Say",
    description: "Using bird calls to attract birds: why playback works, why the ABA code says to limit it near nests and for rare species, and the sound that draws birds.",
    image: bimg("northern-cardinal", "Male northern cardinal singing from a perch — the reason bird calls to attract birds work, and why they stress the singer"),
    intro: [
      "Bird calls to attract birds do work — a recorded song tells a territorial male an intruder has arrived and he comes to see it off — which is exactly why birding ethics treat playback as something to limit rather than a backyard tool.",
      "The ethics below are the American Birding Association's code [4]; the alternative sounds and setups are from Project FeederWatch [1] and Audubon [3]; window safety is from All About Birds [2].",
    ],
    sections: [
      { heading: "Bird calls to attract birds: what the ABA code says", paragraphs: [
        "The ABA Code of Birding Ethics asks birders to avoid stressing birds or exposing them to danger, to be particularly cautious around active nests, roosts, display sites and feeding sites, and to limit the use of recordings and other audio methods of attracting birds — particularly in heavily birded areas, for species that are rare in the area, and for species that are threatened or endangered [4]. It also asks birders to know and follow local regulations, including those on the use of audio or food lures, which some parks and refuges prohibit [4].",
        "Practically, a bird that answers playback is defending a territory or a mate; every minute it spends chasing a phantom rival is a minute not feeding young. In a backyard the birds you want are the ones already nearby, and repeated playback in the same spot risks driving them off rather than settling them in.",
      ]},
      { heading: "Bird sounds that attract birds without stressing them", paragraphs: [
        "The sound that reliably attracts birds is water. FeederWatch says one of the best ways to make a bird bath more attractive is to provide dripping water — a dripper, a sprayer, or a bucket with a pinhole hung above the bath [1] — and Audubon notes the sound of running water is particularly attractive to birds and may bring them flocking during migration [3].",
        "The second is other birds: feeders draw flocks by sight and sound, and once chickadees and titmice are calling at a feeder, other species follow them in. A quiet corner near cover, fresh black-oil sunflower and a dripping bath will bring in more birds than any recording, and keep them [1].",
      ]},
    ],
    faq: [
      { question: "Is it okay to play bird calls to attract birds?", answer: "The ABA code says to limit playback, especially near nests, in heavily birded areas and for rare or threatened species, and to follow local rules on audio lures [4]." },
      { question: "What sound attracts birds the most?", answer: "Moving water — a dripper or fountain on a bird bath — which FeederWatch and Audubon both single out [1][3]." },
    ],
    extraSources: [ABA(4)],
  }),

  "/how-to-attract/birds-to-a-balcony": guide({
    path: "/how-to-attract/birds-to-a-balcony", keyword: "balcony birding",
    title: "Balcony Birding: Attracting Birds to an Apartment Balcony",
    description: "Balcony birding: a window feeder or small tube with hulled seed, a shallow water dish, native plants in containers and safe glass.",
    image: timg("balcony-feeder", "Male house finch at a small feeder — the most reliable bird in balcony birding"),
    intro: [
      "Balcony birding works because birds do not need a yard: Audubon says that if you have no yard you can still help birds with a native plant container garden on a patio or balcony, and that even very small patches of habitat give tired, hungry birds what they need during migration [3].",
      "Feeder, food and water advice below is FeederWatch's [1]; plant advice is Audubon's [3]; glass safety is from All About Birds [2]; the birds are from All About Birds species accounts [4][5].",
    ],
    sections: [
      { heading: "Balcony birding setup: feeder, water, containers", paragraphs: [
        "Use a small feeder: feeders with short perches accommodate small birds such as finches but exclude larger birds such as grackles and jays [1] — a suction-cup window feeder on the door glass or a short tube on a railing bracket. Fill it with sunflower chips or hulled seed so no shells fall on the floor below, and offer only what is eaten in a day. Add a shallow dish of water with a stone in it; birds are attracted to water just as they are to feeders [1]. In containers, choose natives: Audubon suggests sunflowers, asters and coneflowers for seed and red tubular flowers such as columbine and honeysuckle for hummingbirds [3].",
      ]},
      { heading: "Balcony birding: which birds come", paragraphs: [
        "House Finches are the most dependable: they are birds of human-created habitats, and if they discover a feeder of small black-oil sunflower they may bring flocks of 50 or more [4]. Black-capped Chickadees do not mind tiny hanging feeders that swing in the wind and readily visit window feeders [5]; goldfinches use almost any feeder type; doves and sparrows find spilled seed on the floor [1]. Height matters less than a clear approach — birds want to see the feeder from a tree or roofline and have somewhere to retreat.",
        "The one real hazard is the glass door. Treat it with markings no more than 2 inches apart, dot tape, cords or an exterior screen rather than trying to keep the feeder far from it [1][2].",
      ]},
    ],
    faq: [
      { question: "Can you attract birds to a high balcony?", answer: "Yes — house finches, chickadees, goldfinches and doves all use upper-floor feeders; Audubon notes even tiny habitat patches help migrants [3][4][5]." },
      { question: "How do I keep a balcony feeder from making a mess?", answer: "Hulled seed or sunflower chips, a day's portion at a time, and a sweep of the floor so spilled seed does not mold [1]." },
    ],
    extraSources: [aab(4, "House_Finch", "House Finch"), aab(5, "Black-capped_Chickadee", "Black-capped Chickadee")],
  }),

  "/how-to-attract/birds-to-a-birdhouse": guide({
    path: "/how-to-attract/birds-to-a-birdhouse", keyword: "how to attract birds to a birdhouse",
    title: "How to Attract Birds to a Birdhouse: NestWatch Box Rules",
    description: "How to attract birds to a birdhouse: NestWatch's checklist — untreated wood, thick walls, drainage, no perch, the right hole size.",
    image: timg("nest-box", "Wooden nest box mounted on a pole — how to attract birds to a birdhouse depends on build, hole size and a predator guard"),
    intro: [
      "How to attract birds to a birdhouse is mostly about building and mounting it right: NestWatch's checklist is untreated wood, thick walls, drainage and ventilation holes, an extended sloped roof, rough interior walls, no outside perch, a predator guard, and a metal pole [4].",
      "Box specifications are NestWatch's [4]; species tips are from All About Birds for chickadees and titmice [5][6] and NestWatch for bluebirds [7]; safety rules from FeederWatch and All About Birds [1][2].",
    ],
    sections: [
      { heading: "How to attract birds to a birdhouse: build it to the checklist", paragraphs: [
        "Use untreated, unpainted wood — cedar, pine or cypress — with galvanized screws rather than nails, walls at least ¾ inch thick to insulate the nest, and a sloped roof that overhangs the front by 2–4 inches and the sides by 2 [4]. Add at least four drainage holes of ⅜ to ½ inch in the floor, recess the floor ¼ inch, and cut two ⅝-inch ventilation holes near the top of each side wall [4]. Roughen the interior wall below the entrance so nestlings can climb out, and give the box a hinged side with a latch for monitoring and cleaning [4].",
        "Leave off the perch: it is unnecessary for the birds and can help predators gain access [4]. Size the hole for the bird you want — 1 9/16 inches is the smallest a European Starling fits through and 1¼ inches the smallest a House Sparrow fits, so go smaller to exclude them [4].",
      ]},
      { heading: "Birdhouse mounting, predators and which birds use it", paragraphs: [
        "Mount the box on a metal pole with a baffle — a cone baffle about 3 feet across, or a stovepipe baffle 8 inches in diameter and 24–36 inches long — rather than on a tree or fence post; raccoons remember box locations year to year, chipmunks compete for boxes, snakes climb unguarded poles, and cats leap to box tops from nearby trees [4]. Keep boxes away from brush piles [4].",
        "Then match the bird. Black-capped Chickadees take a box put up well before the breeding season, with a predator guard, filled with sawdust or wood shavings they can excavate, at least 60 feet into woodland to keep House Wrens out [5]. Tufted Titmice cannot dig their own cavity and readily use a box with a predator guard [6]. Eastern Bluebirds take a box built to NestWatch's bluebird plan — 5½ by 5½ inches inside, 9 inches deep, with the entrance size the plan specifies — mounted 4–6 feet up, facing east toward open habitat, boxes 300 feet apart, cleaned out as soon as a brood fledges [7].",
      ]},
    ],
    faq: [
      { question: "Why won't birds use my birdhouse?", answer: "Usually a perch, a wrong-sized hole, a tree mount predators can climb, or a box put up too late; NestWatch's checklist fixes each [4]." },
      { question: "Which way should a birdhouse face?", answer: "For bluebirds NestWatch says east, toward open habitat; for most boxes, away from prevailing wind and driving rain [4][7]." },
    ],
    extraSources: [NESTWATCH(4), aab(5, "Black-capped_Chickadee", "Black-capped Chickadee"), aab(6, "Tufted_Titmouse", "Tufted Titmouse"), { id: 7, label: "NestWatch (Cornell Lab of Ornithology) — Eastern Bluebird: nest box placement and measurements", url: "https://nestwatch.org/learn/all-about-birdhouses/birds/eastern-bluebird/" }],
  }),

  "/how-to-attract/birds-that-eat-yard-pests": guide({
    path: "/how-to-attract/birds-that-eat-yard-pests", keyword: "how to attract birds that eat yard pests",
    title: "How to Attract Birds That Eat Yard Pests: 5 Insect-eaters",
    description: "How to attract birds that eat yard pests: chickadees, titmice, downy woodpeckers, robins and bluebirds eat caterpillars, beetles and borers.",
    image: bimg("black-capped-chickadee", "Black-capped chickadee — an insect-eater that shows how to attract birds that eat yard pests"),
    intro: [
      "How to attract birds that eat yard pests starts with a number from Audubon: 96 percent of land birds rely on insects to feed their chicks [3]. The birds are already hunting; the job is to give them cover, water, dead wood and a pesticide-free yard.",
      "Diets below are from All About Birds species accounts [4][5][6][7] and Audubon's field guide [8]; habitat advice is Audubon's [3]; feeders and safety from FeederWatch and All About Birds [1][2].",
    ],
    sections: [
      { heading: "The birds that eat yard pests, and the pests they take", paragraphs: [
        "Black-capped Chickadees eat 80–90 percent insects and spiders outside winter [4]. Tufted Titmice eat caterpillars, beetles, ants, wasps, stink bugs and treehoppers in summer [5]. Downy Woodpeckers eat beetle larvae in wood and bark, ants and caterpillars, including pest species — corn earworm, tent caterpillars, bark beetles and apple borers — and in late summer hammer goldenrod galls for the larva inside [6]. American Robins take earthworms, insects and snails from lawns [7]. Eastern Bluebirds feed on crickets, grasshoppers, beetles and many other insects, dropping from a low perch to the ground [8].",
      ]},
      { heading: "How to attract birds that eat yard pests: habitat, not bait", paragraphs: [
        "Lay off the pesticides — a bird-friendly garden is a bug-friendly garden, and a diversity of native plants attracts the birds, frogs, bats and predatory insects that keep plant-eating bugs in check [3]. Robins in particular are vulnerable to pesticide poisoning because they forage on lawns [7]. Plant the natives that host caterpillars — oaks, willows, birches, maples, goldenrod, milkweed, sunflowers [3] — and leave fallen leaves, which shelter the moth pupae baby birds eat, and dead trees and branches for cavity nesters [3].",
        "Add perches and water: bluebirds hunt from low perches over open ground [8], and a bird bath with a dripper draws every insect-eater on the list [1]. Suet is the feeder food for insect-eating birds [1] and holds chickadees, titmice and woodpeckers through winter so they are on site when the caterpillars hatch.",
      ]},
    ],
    faq: [
      { question: "Which birds eat the most garden pests?", answer: "Chickadees, titmice, downy woodpeckers, robins and bluebirds — caterpillars, beetles, borers, grubs and grasshoppers between them [4][5][6][7][8]." },
      { question: "Do birds control insects in a yard?", answer: "They help — 96 percent of land birds feed insects to chicks — but only in a yard that is not sprayed, since pesticides remove their food and poison the birds [3][7]." },
    ],
    extraSources: [aab(4, "Black-capped_Chickadee", "Black-capped Chickadee"), aab(5, "Tufted_Titmouse", "Tufted Titmouse"), aab(6, "Downy_Woodpecker", "Downy Woodpecker"), aab(7, "American_Robin", "American Robin"), { id: 8, label: "National Audubon Society — Guide to North American Birds: Eastern Bluebird", url: "https://www.audubon.org/field-guide/bird/eastern-bluebird" }],
  }),

  // ── Species guides ────────────────────────────────────────────
  "/how-to-attract/american-goldfinch": guide({
    path: "/how-to-attract/american-goldfinch", keyword: "how to attract american goldfinches",
    title: "How to Attract American Goldfinches: Nyjer, Thistle & Timing",
    description: "How to attract American goldfinches: nyjer and sunflower in any feeder, native thistles, milkweed and composites for seed and nest fiber.",
    image: bimg("american-goldfinch", "American goldfinch on a coneflower — how to attract american goldfinches is a seed question"),
    intro: [
      "How to attract American goldfinches is unusually simple, because they are one of the strictest vegetarians in the bird world: seeds almost exclusively, from composites like sunflowers, thistle and asters, grasses, and trees such as alder, birch, western red cedar and elm [4].",
      "Species facts are from All About Birds [4]; feeder facts from FeederWatch [1]; plants from Audubon [3]; windows from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract American goldfinches to feeders", paragraphs: [
        "At feeders goldfinches prefer nyjer and sunflower, use almost any feeder type — hopper, platform or hanging — do not mind feeders that sway in the wind, and happily feed on spilled seed on the ground [4]. FeederWatch credits nyjer's popularity largely to its ability to attract finches including American Goldfinch, Pine Siskin and Common Redpoll [1]; a mesh sock or fine-port tube keeps it dry, and tube feeders keep seed fairly dry generally [1]. Replace nyjer that has gone stale or damp — goldfinches ignore it.",
      ]},
      { heading: "Plants that attract goldfinches, and their late nest", paragraphs: [
        "All About Birds' planting advice is native thistles, other composite plants and native milkweed [4]; Audubon's seed list — native sunflowers, asters and coneflowers — adds the garden composites, left standing after bloom [3]. Goldfinches breed later than most North American birds, waiting until June or July when milkweed, thistle and other plants have produced the fibrous seeds they weave into nests and feed to their young [4], so a yard that only feeds them in winter is missing the season they settle in.",
        "They molt body feathers twice a year, in late winter and late summer, so the drab winter birds at the nyjer feeder in February are the same ones that turn bright yellow in April [4].",
      ]},
    ],
    faq: [
      { question: "What is the best food to attract goldfinches?", answer: "Nyjer (thistle) and sunflower, in any feeder — even one that sways; plus native thistles and composites in the garden [1][4]." },
      { question: "Why do goldfinches disappear in summer?", answer: "They nest late — June or July — and spend that time in weedy fields with thistle and milkweed; they return to feeders once the young fledge [4]." },
    ],
    extraSources: [aab(4, "American_Goldfinch", "American Goldfinch")],
  }),

  "/how-to-attract/northern-cardinal": guide({
    path: "/how-to-attract/northern-cardinal", keyword: "how to attract northern cardinals",
    title: "How to Attract Northern Cardinals: Sunflower & Shrubs",
    description: "How to attract northern cardinals: black-oil sunflower on a hopper or platform, dense shrubs for nesting, native fruit like dogwood and mulberry.",
    image: bimg("northern-cardinal", "Male northern cardinal in a shrub — how to attract northern cardinals means sunflower and dense cover"),
    intro: [
      "How to attract northern cardinals, per All About Birds, is direct: nearly any feeder within their range ought to attract them, they particularly use sunflower seeds, and leaving undergrowth in the yard or around its edges can bring a nesting pair [4].",
      "Species facts are from All About Birds [4]; feeder facts from FeederWatch [1]; plant advice from Audubon [3]; window guidance from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract northern cardinals with the right feeder and seed", paragraphs: [
        "Cardinals eat many kinds of birdseed, particularly black oil sunflower [4], which FeederWatch calls the preferred food for a wide variety of birds and a cardinal favorite [1]; safflower attracts cardinals and other big-billed birds too, though most birds prefer sunflower [1]. Serve it where a cardinal can stand: large hoppers let larger species feed, and trays attract most species [1] — a tube's short perches are for finches.",
      ]},
      { heading: "Cover and fruit for cardinals, and the window problem", paragraphs: [
        "Cardinals live in dense shrubby areas — forest edges, hedgerows, thickets and ornamental landscaping — and nest in a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up and hidden in dense foliage [4]. Their wild foods include dogwood, wild grape, mulberry, hackberry, blackberry and sumac [4], so Audubon's staggered fruit shrubs — serviceberry, dogwood, cedar and holly — feed them in every season [3], and they feed nestlings mostly insects, which native plants supply [4].",
        "Cardinals are the bird most often seen attacking their own reflection in a window or car mirror in spring and early summer, when both sexes defend territory; the attacks stop a few weeks later as hormone levels fall [4]. Exterior markings, screens or a covered mirror end it sooner, and protect the bird from collisions as well [2].",
      ]},
    ],
    faq: [
      { question: "What is the best way to attract cardinals?", answer: "Black-oil sunflower on a hopper or platform, plus dense shrubs or undergrowth left for nesting [1][4]." },
      { question: "Why does a cardinal keep attacking my window?", answer: "It is fighting its reflection while defending territory in spring; it stops in a few weeks, sooner if you cover the glass from outside [2][4]." },
    ],
    extraSources: [aab(4, "Northern_Cardinal", "Northern Cardinal")],
  }),

  "/how-to-attract/black-capped-chickadee": guide({
    path: "/how-to-attract/black-capped-chickadee", keyword: "how to attract black-capped chickadees",
    title: "How to Attract Black-capped Chickadees: Feeders & Nest Boxes",
    description: "How to attract black-capped chickadees: sunflower, peanuts and suet in any small feeder, a nest box with shavings and a predator guard.",
    image: bimg("black-capped-chickadee", "Black-capped chickadee — how to attract black-capped chickadees is one of the easiest jobs in backyard birding"),
    intro: [
      "How to attract black-capped chickadees barely needs a guide: All About Birds calls them one of the easiest birds to attract to feeders, for suet, sunflower and peanuts, and notes they do not mind tiny hanging feeders that swing in the wind and readily visit window feeders [4].",
      "Species facts are from All About Birds [4]; feeder and safety facts from FeederWatch [1] and All About Birds [2]; native-plant guidance from Audubon [3][5].",
    ],
    sections: [
      { heading: "How to attract black-capped chickadees to a feeder", paragraphs: [
        "At feeders chickadees take mostly sunflower seeds, peanuts, suet, peanut butter and mealworms, pecking a hole in a seed's shell and chipping out tiny bits [4]. Suet is a good choice for attracting insect-eating birds, and shelled peanuts in a mesh feeder suit small birds better than whole ones jays carry off [1]. A tube with short perches keeps larger birds off [1], and a window feeder brings them to the glass — treat the glass with 2-inch-spaced markings first [2].",
        "Chickadees hide seeds to eat later, each in a different spot, and remember thousands of hiding places, which is why a feeder empties faster than the flock could eat [4].",
      ]},
      { heading: "Nest boxes for chickadees and the caterpillar supply", paragraphs: [
        "Put up a nest box well before the breeding season, with a predator guard, and fill it with sawdust or wood shavings — chickadees are especially attracted to a box they can excavate — at least 60 feet into a wooded area if House Wrens are around [4]. They also excavate their own cavities in dead snags or rotten branches, frequently alder or birch, so leave dead wood standing where safe [4].",
        "Outside winter, insects, spiders and other animal food are 80–90 percent of the diet [4], and Audubon's figure is more than 6,000 caterpillars to raise one brood of chickadees — which a native oak (over 500 caterpillar species) supplies and a ginkgo (five) does not [5]. Native trees are the long-term chickadee plan; the feeder is the short-term one.",
      ]},
    ],
    faq: [
      { question: "What attracts black-capped chickadees?", answer: "Sunflower, peanuts and suet in almost any feeder, plus a nest box with shavings and a predator guard put up before spring [1][4]." },
      { question: "Do chickadees use birdhouses?", answer: "Yes — a box with a predator guard, filled with sawdust or shavings they can excavate, placed 60 feet into woodland to avoid House Wrens [4]." },
    ],
    extraSources: [aab(4, "Black-capped_Chickadee", "Black-capped Chickadee"), AUDUBON_NATIVE(5)],
  }),

  "/how-to-attract/ruby-throated-hummingbird": guide({
    path: "/how-to-attract/ruby-throated-hummingbird", keyword: "how to attract ruby-throated hummingbirds",
    title: "How to Attract Ruby-throated Hummingbirds: Feeders & Flowers",
    description: "How to attract ruby-throated hummingbirds: a 1:4 sugar-water feeder with no dye, cleaned every couple of days, red tubular natives like cardinal flower.",
    image: timg("hummingbird-feeder", "Male ruby-throated hummingbird at a red feeder — how to attract ruby-throated hummingbirds with sugar water and flowers"),
    intro: [
      "How to attract ruby-throated hummingbirds combines a feeder and a garden: All About Birds' advice is a sugar-water feeder plus tubular flowers such as trumpet creeper, cardinal flower, honeysuckle, jewelweed and bee-balm [4].",
      "Species facts are from All About Birds [4]; feeder recipe and cleaning from FeederWatch [1]; plants from Audubon [3]; windows from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract ruby-throated hummingbirds with a feeder", paragraphs: [
        "Make the mixture with about one-quarter cup of sugar per cup of water — FeederWatch's version is one part sugar to four parts boiling water, cooled — with no food coloring, which is unnecessary and, per FeederWatch, harmful; red portals or a red ribbon attract the birds just as well [1][4]. Change the water before it grows cloudy or discolored, and remember that in hot weather sugar water ferments rapidly into toxic alcohol [4]. Hummingbird feeders need cleaning more often than seed feeders — every couple of days, ideally at every refill — and at any sign of cloudy water or black mold, discard the solution and clean immediately [1].",
        "Feeders are generally safe for hummingbirds but can be a problem if they make the birds easy targets for cats — some cats learn to lie in wait — or if placed near windows the birds might fly into [4]; treat nearby glass with 2-inch-spaced markings [2].",
      ]},
      { heading: "Flowers that attract hummingbirds, and the garden", paragraphs: [
        "Ruby-throated Hummingbirds prefer red or orange flowers, and plant nectar sources: trumpet creeper, cardinal flower, honeysuckle, jewelweed and bee-balm [4]; Audubon's list adds native columbine and penstemon [3]. Cardinal flower depends on hummingbirds for pollination because most insects cannot navigate its long tubular flowers, and blooms May through October. They also catch insects in midair for protein [4], so an unsprayed garden feeds them twice.",
      ]},
    ],
    faq: [
      { question: "What is the sugar-water ratio for hummingbirds?", answer: "One part sugar to four parts water — about a quarter cup per cup — with no dye; change it before it clouds and clean the feeder every couple of days [1][4]." },
      { question: "What flowers attract ruby-throated hummingbirds?", answer: "Red or orange tubular natives: trumpet creeper, cardinal flower, honeysuckle, jewelweed, bee-balm, columbine and penstemon [3][4]." },
    ],
    extraSources: [aab(4, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird")],
  }),

  "/how-to-attract/baltimore-oriole": guide({
    path: "/how-to-attract/baltimore-oriole", keyword: "how to attract baltimore orioles",
    title: "How to Attract Baltimore Orioles: Oranges, Jelly & Nectar",
    description: "How to attract Baltimore orioles: halved oranges, an oriole feeder of 1:6 sugar water, small amounts of jelly, and raspberries.",
    image: bimg("baltimore-oriole", "Male Baltimore oriole in a treetop — how to attract baltimore orioles is a fruit-and-nectar question"),
    intro: [
      "How to attract Baltimore orioles, per All About Birds: cut oranges in half and hang them from trees, offer sugar water in an oriole feeder, put out small amounts of jelly, and plant raspberries, crab apples and trumpet vines to bring orioles back year after year [4].",
      "Species facts are from All About Birds [4]; feeder recipe and cleaning from FeederWatch [1]; plants from Audubon [3]; windows from All About Birds [2].",
    ],
    sections: [
      { heading: "How to attract Baltimore orioles when they arrive", paragraphs: [
        "Timing is everything. Orioles eat insects, fruit and nectar in proportions that change with the season: in spring and fall, nectar and ripe fruit make up more of the diet because their sugars convert readily to fat for migration, while in summer, feeding young, much of the diet is protein-rich insects [4]. So oranges, jelly and nectar work best in the first weeks after spring arrival; once nesting begins, orioles shift to caterpillars — including tent caterpillars and gypsy moth caterpillars — and visit less [4].",
        "For the nectar feeder, FeederWatch gives a slightly more diluted mixture for orioles than for hummingbirds: one part sugar to six parts water, no red food coloring [1]. Clean it as often as a hummingbird feeder — every couple of days — and never let jelly build up where it can soil feathers [1][4].",
      ]},
      { heading: "Trees and fruit for orioles, and the hanging nest", paragraphs: [
        "Orioles live high in leafy deciduous trees but not deep forest — open woodland, forest edge, river banks and small groves — and have adapted well to parks, orchards and backyards [4]. The female anchors the sock-like woven nest to a fork in slender upper branches, often an American elm but also maples and cottonwoods [4]; a tall deciduous tree at the yard edge is the nest site. For fruit, All About Birds' raspberries, crab apples and trumpet vines [4] fit Audubon's native-fruit layer — serviceberry and cherry for the breeding season, dogwood for fall [3].",
      ]},
    ],
    faq: [
      { question: "What is the best food to attract orioles?", answer: "Halved oranges, 1:6 sugar water in an oriole feeder, and small amounts of jelly — especially in the first weeks of spring [1][4]." },
      { question: "Why did the orioles stop coming to my feeder?", answer: "Nesting: in summer they switch to insects for their young and visit fruit and nectar less; they return in late summer before migration [4]." },
    ],
    extraSources: [aab(4, "Baltimore_Oriole", "Baltimore Oriole")],
  }),

  "/how-to-attract/bluebirds": guide({
    path: "/how-to-attract/bluebirds", keyword: "how to attract bluebirds",
    title: "How to Attract Bluebirds: Nest Boxes, Open Ground & Food",
    description: "How to attract bluebirds: a NestWatch-spec box 4–6 feet up facing east over open ground, 300 feet apart, cleaned after each brood; low perches, winter berries.",
    image: timg("nest-box", "Bluebird nest box on a pole facing open ground — how to attract bluebirds starts with the box"),
    intro: [
      "How to attract bluebirds begins with a box: Audubon notes that a high percentage of Eastern Bluebirds in North America today nest in birdhouses put up especially for them along bluebird trails, and that the species' recovery has undoubtedly been helped by birdhouses [4].",
      "Box specifications are from NestWatch [5][6]; bluebird diet, habitat and nesting from Audubon's field guide [4]; feeders, water and safety from FeederWatch and All About Birds [1][2].",
    ],
    sections: [
      { heading: "How to attract bluebirds with the right box in the right place", paragraphs: [
        "NestWatch's Eastern Bluebird specification: a box 5½ by 5½ inches inside and 9 inches deep with a 2¼-inch entrance as drawn in its plan, mounted on a pole 4–6 feet from the ground with the entrance facing east and toward open habitat, boxes spaced 300 feet apart [5]. Build it to the general checklist — untreated wood, ¾-inch walls, drainage and ventilation holes, sloped overhanging roof, rough interior, no perch — and mount it on a metal pole with a cone or stovepipe baffle, never on a tree or fence post [6].",
        "Clean out old nests as soon as a brood fledges so the box can be used for a second attempt — bluebirds raise two broods a year, sometimes three [4][5]. To reduce competition from Tree Swallows, pair boxes 15–20 feet apart with pairs 300 feet apart; if House Sparrows are a problem, a second identical entrance hole beside the first helps bluebirds defend the box [5].",
      ]},
      { heading: "Bluebird habitat, food and water", paragraphs: [
        "Bluebirds are birds of open country with scattered trees — farms, roadsides, clearings, open pine woods, and suburbs with extensive lawns and good nest sites [4]. They forage by perching low and fluttering down to the ground for insects — crickets, grasshoppers, beetles, spiders, earthworms — and eat many berries, especially in winter [4]. So the yard needs open, unsprayed ground, low perches, and winter fruit: Audubon's cedar and holly, and the dogwood and serviceberry that fruit earlier [3].",
        "Mealworms on a tray are the feeder food bluebirds take, since they do not eat seed; a shallow bird bath with a dripper, changed daily, completes the setup [1]. Keep cats indoors — cats leap to box tops from nearby trees, and ground-foraging birds are at greatest risk [1][6].",
      ]},
    ],
    faq: [
      { question: "Which direction should a bluebird house face?", answer: "East, toward open habitat, 4–6 feet up on a baffled metal pole, per NestWatch [5][6]." },
      { question: "What do bluebirds eat at feeders?", answer: "Not seed — mostly insects and berries; offer mealworms on a tray and plant winter berries like cedar and holly [3][4]." },
    ],
    extraSources: [{ id: 4, label: "National Audubon Society — Guide to North American Birds: Eastern Bluebird", url: "https://www.audubon.org/field-guide/bird/eastern-bluebird" }, { id: 5, label: "NestWatch (Cornell Lab of Ornithology) — Eastern Bluebird: nest box placement and measurements", url: "https://nestwatch.org/learn/all-about-birdhouses/birds/eastern-bluebird/" }, NESTWATCH(6)],
  }),
};
