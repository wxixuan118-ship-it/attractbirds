import type { EditorialContent, EditorialImage } from "./types";
import groupImages from "../group-images.json";
import topicImages from "../topic-images.json";

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const TOPIC = topicImages as Record<string, Img>;
const BIRD = groupImages as Record<string, Img & { species: string }>;
const timg = (key: string, alt: string): EditorialImage | undefined => { const m = TOPIC[key]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };
const bimg = (slug: string, alt: string): EditorialImage | undefined => { const m = BIRD[slug]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };

/**
 * Sources. Seasonal behavior is from All About Birds species accounts;
 * feeding advice from Project FeederWatch; occurrence data from the eBird
 * Observation Dataset via GBIF (rendered by the page template).
 */
const EBIRD = { id: 1, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); monthly records 2020–2024 for the nine states on this site", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" };
const FW = { id: 2, label: "Project FeederWatch (Cornell Lab of Ornithology) — Feeding Birds", url: "https://feederwatch.org/learn/feeding-birds/" };
const aab = (id: number, slug: string, name: string) => ({ id, label: `All About Birds (Cornell Lab of Ornithology) — ${name}: Overview and Life History`, url: `https://www.allaboutbirds.org/guide/${slug}/overview` });
const CARDINAL = (id: number) => aab(id, "Northern_Cardinal", "Northern Cardinal");
const CHICKADEE = (id: number) => aab(id, "Black-capped_Chickadee", "Black-capped Chickadee");
const TITMOUSE = (id: number) => aab(id, "Tufted_Titmouse", "Tufted Titmouse");
const HUMMER = (id: number) => aab(id, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird");
const GOLDFINCH = (id: number) => aab(id, "American_Goldfinch", "American Goldfinch");
const ROBIN = (id: number) => aab(id, "American_Robin", "American Robin");
const ORIOLE = (id: number) => aab(id, "Baltimore_Oriole", "Baltimore Oriole");
const JAY = (id: number) => aab(id, "Blue_Jay", "Blue Jay");

const DATA_NOTE = "The eBird section on this page is computed from the dataset itself: for each of the nine states with occurrence data on this site, it shows the species' share of all eBird records in these months against its share across the year, so you can see where the season actually concentrates the bird [1].";

export const seasonalEditorial: Record<string, EditorialContent> = {
  // ── Season hubs ───────────────────────────────────────────────
  "/seasonal-birds/fall": {
    path: "/seasonal-birds/fall", keyword: "fall birds",
    title: "Fall Birds: Migration, Molt, Flocks & What to Feed Them",
    description: "Fall birds explained: which backyard birds leave, which arrive and which flock up from September to November, what to feed them, and eBird data by state.",
    image: bimg("american-goldfinch", "American goldfinch on a seed head — fall birds shift from nesting to flocking and feeding"),
    intro: [
      "Fall birds are birds in transition: hummingbirds and orioles leaving, goldfinches going dull, robins gathering into roosts, cardinals and chickadees forming the flocks that will visit feeders all winter [3][4][5][6].",
      "The behavior below is from All About Birds species accounts [3–8], feeding advice from Project FeederWatch [2], and the state-by-state numbers from eBird records on this site [1].",
    ],
    sections: [
      { heading: "Fall birds that leave, and the ones that change", paragraphs: [
        "Ruby-throated Hummingbird males may begin migrating by early August, and the species winters in Mexico and Central America [3]; Baltimore Orioles shift to nectar and ripe fruit in fall because their sugars convert readily to migration fat, then leave for Central America [4]. American Goldfinches molt their body feathers in late summer, replacing the male's bright yellow with dull olive-brown, and in winter move south along a line that tracks a January minimum of about 0 °F [5]. Thousands of Blue Jays migrate in flocks along the Great Lakes and Atlantic coasts, yet some stay all winter everywhere in the range, and the same bird may migrate one year and not the next [6].",
      ]},
      { heading: "Fall birds that flock up and stay", paragraphs: [
        "Northern Cardinals move in pairs during the breeding season but in fall and winter form flocks of a dozen to several dozen, sometimes foraging with juncos, sparrows, titmice and goldfinches [7]. Black-capped Chickadees live in flocks that include woodpeckers, nuthatches, warblers and vireos, and because migrating songbirds join them, listening for chickadees in fall is a reliable way to find other species [8]; they also begin hiding seeds to eat later, remembering thousands of spots [8]. American Robins that stay north move to moist woods where berry-producing trees and shrubs are common and gather in roosts that can reach a quarter-million birds [9].",
        "For the feeder, fall is when to restock: black-oil sunflower for the cardinals, chickadees and finches arriving, nyjer for goldfinches, siskins and redpolls, suet for the insect-eaters as insects vanish [2]. Take hummingbird feeders down only after the last bird has gone; keep them clean every couple of days until then [2].",
      ]},
    ],
    faq: [
      { question: "When do hummingbirds leave in the fall?", answer: "Ruby-throated males may begin migrating by early August; females and young follow, and the species winters in Mexico and Central America [3]." },
      { question: "Why do goldfinches turn brown in fall?", answer: "A late-summer molt replaces the male's yellow with olive-brown; a late-winter molt brings it back [5]." },
      { question: "Do robins leave for the winter?", answer: "Many stay in their breeding range but roost in trees and feed on berries rather than lawns, so they seem to disappear [9]." },
    ],
    sources: [EBIRD, FW, HUMMER(3), ORIOLE(4), GOLDFINCH(5), JAY(6), CARDINAL(7), CHICKADEE(8), ROBIN(9)],
  },
  "/seasonal-birds/spring": {
    path: "/seasonal-birds/spring", keyword: "spring birds",
    title: "Spring Birds: Arrivals, Song, Nesting & Window Fights",
    description: "Spring birds from March to May: orioles and hummingbirds arriving, goldfinches turning yellow, cardinals fighting windows, chickadees nesting.",
    image: bimg("baltimore-oriole", "Male Baltimore oriole in a treetop — one of the first spring birds by song in the East"),
    intro: [
      "Spring birds announce themselves: the Baltimore Oriole's whistling song from the treetops is a herald of spring across eastern North America, and the brightening yellow of male goldfinches is a mark of approaching warm months [3][4].",
      "The behavior below is from All About Birds species accounts [3–8], feeding advice from Project FeederWatch [2], and the state-by-state numbers from eBird records on this site [1].",
    ],
    sections: [
      { heading: "Spring birds arriving and changing", paragraphs: [
        "Orioles return from Central America in spring, when nectar and ripe fruit make up more of the diet than in summer — the window for orange halves and jelly [3]. Goldfinches finish their late-winter molt and the males turn yellow [4]. Ruby-throated Hummingbirds arrive to breed in deciduous woodlands, old fields, forest edges, orchards and backyards; the pairs stay together only days to weeks [5]. Robins are singing: in spring males attract females by singing, raising and spreading the tail and inflating the white-striped throat, and the birds shift from winter fruit back to earthworms on lawns [6].",
      ]},
      { heading: "Spring birds settling in to nest", paragraphs: [
        "Northern Cardinals are the bird most often seen attacking their own reflection in windows and car mirrors in spring and early summer, when both sexes defend territory; it stops a few weeks later as hormone levels fall [7]. A week or two before building, the female visits possible sites with the male following, and nests go into a fork of small branches in a sapling, shrub or vine tangle [7]. Black-capped Chickadees excavate their own cavities in dead snags or rotten branches, frequently alder or birch, or take a nest box put up well before the breeding season and filled with sawdust or shavings [8]. Tufted Titmice, which cannot excavate, take natural holes, old woodpecker holes and boxes [9].",
        "Spring is also when feeder hygiene matters most: clean feeders more often in wet weather, and switch hummingbird feeders to a one-to-four sugar-water mix with no dye as the first birds arrive [2].",
      ]},
    ],
    faq: [
      { question: "What are the first spring birds to arrive?", answer: "In the East, Baltimore Orioles by song, ruby-throated hummingbirds at feeders, and robins singing on lawns; cardinals and chickadees never left [3][5][6]." },
      { question: "Why is a cardinal attacking my window in spring?", answer: "It is fighting its reflection while defending territory; both sexes do it, and it stops as hormone levels subside a few weeks later [7]." },
    ],
    sources: [EBIRD, FW, ORIOLE(3), GOLDFINCH(4), HUMMER(5), ROBIN(6), CARDINAL(7), CHICKADEE(8), TITMOUSE(9)],
  },
  "/seasonal-birds/summer": {
    path: "/seasonal-birds/summer", keyword: "summer birds",
    title: "Summer Birds: Nesting, Feeding Young & Late Nesters",
    description: "Summer birds from June to August: cardinals raising broods, chickadees and titmice hunting insects, goldfinches nesting late, hummingbird males leaving early.",
    image: bimg("ruby-throated-hummingbird", "Ruby-throated hummingbird at a flower — among summer birds, one whose males leave by early August"),
    intro: [
      "Summer birds are busy and quieter: cardinals on a second brood, chickadees and titmice eating almost nothing but insects, goldfinches only now starting to nest, and hummingbird males already heading south [3][4][5][6].",
      "The behavior below is from All About Birds species accounts [3–8], feeding advice from Project FeederWatch [2], and the state-by-state numbers from eBird records on this site [1].",
    ],
    sections: [
      { heading: "Summer birds raising young", paragraphs: [
        "Northern Cardinals raise one to two broods a year; clutches of 2–5 eggs hatch in 11–13 days and the young leave after 7–13, fed mostly insects [3]. Black-capped Chickadees eat 80–90 percent insects and spiders in spring, summer and fall and raise one brood [4]; Tufted Titmice eat caterpillars, beetles, ants, wasps, stink bugs and treehoppers in summer, and occasionally a young bird stays to help raise the next year's brood [5]. Baltimore Orioles feed their young protein-rich insects — beetles, crickets, moths, tent caterpillars — and visit fruit feeders less until late summer [6].",
      ]},
      { heading: "Summer birds on their own schedule", paragraphs: [
        "American Goldfinches breed later than most North American birds, waiting until June or July when milkweed, thistle and other plants have produced the fibrous seeds they weave into nests and feed to their young [7]. Ruby-throated Hummingbirds are the opposite: pairs stay together only days to weeks, and males may begin migrating by early August while females are still feeding young [8].",
        "At the feeder, summer means heat: sugar water ferments rapidly to produce toxic alcohol in hot weather, so change it before it clouds and clean hummingbird feeders every couple of days [2][8]; clean seed feeders every week or two, more often in heavy use, and never let wet seed sit [2].",
      ]},
    ],
    faq: [
      { question: "Why are there fewer birds at my feeder in summer?", answer: "Insects: chickadees, titmice, orioles and cardinals switch to insects to feed young, and natural food is everywhere; they return as it thins in fall [3][4][5][6]." },
      { question: "When do goldfinches nest?", answer: "June or July — later than almost any other North American songbird — once thistle and milkweed have set seed [7]." },
    ],
    sources: [EBIRD, FW, CARDINAL(3), CHICKADEE(4), TITMOUSE(5), ORIOLE(6), GOLDFINCH(7), HUMMER(8)],
  },

  // ── Species × season ──────────────────────────────────────────
  "/seasonal-birds/fall/northern-cardinal": {
    path: "/seasonal-birds/fall/northern-cardinal", keyword: "northern cardinal in fall",
    title: "Northern Cardinal in Fall: Flocks, Foods & eBird Records",
    description: "The northern cardinal in fall: pairs dissolve into flocks of a dozen or more, seeds and fruit replace insects, and eBird records show where cardinals.",
    image: bimg("northern-cardinal", "Male northern cardinal in fall — the season cardinals join winter flocks"),
    intro: [
      "The northern cardinal in fall stops being a pair: cardinals move in pairs during the breeding season, but in fall and winter form flocks of a dozen to several dozen birds, sometimes foraging with juncos, sparrows, titmice and goldfinches [3].",
      "Behavior is from All About Birds [3], feeding from Project FeederWatch [2], and the state numbers from eBird records on this site [1]. " + DATA_NOTE,
    ],
    sections: [
      { heading: "What the northern cardinal in fall is doing", paragraphs: [
        "Nesting is over — cardinals raise one to two broods a year [3] — and the flocks form. Cardinals hop through low branches and forage on or near the ground, and sing and preen from a high branch of a shrub, the crest lowered almost flat at rest [3]. The diet is mainly seeds and fruit with insects as a supplement, and fall is when wild foods peak: dogwood, wild grape, mulberry, hackberry, blackberry and sumac are all on the All About Birds list [3].",
      ]},
      { heading: "Where to look for cardinals in fall", paragraphs: ["Look in dense shrubby areas: forest edges, overgrown fields, hedgerows, backyards, marshy thickets, mesquite, regrowing forest and ornamental landscaping [3]. Cardinals do not migrate, and the growth of towns and suburbs across eastern North America has helped the species expand its range northward [3], so a fall flock in a suburban hedge is the same birds that will be singing there in March. In the West and Southwest the eBird cards below show how thin the species becomes: it is a regular bird in Arizona but essentially absent from Colorado, California and Oregon [1]."] },
      { heading: "Feeding cardinals in fall", paragraphs: [
        "At feeders cardinals eat many kinds of birdseed, particularly black oil sunflower [3], which FeederWatch calls the preferred food for a wide variety of birds and a cardinal favorite; safflower attracts cardinals and other big-billed birds too [2]. Serve it on a large hopper or a tray, where larger species can feed [2], and clean the feeder every week or two, more often in wet fall weather [2]. Leaving undergrowth at the yard's edges holds the flock through winter and can bring a nesting pair next spring [3].",
      ]},
    ],
    faq: [
      { question: "Do cardinals migrate in the fall?", answer: "No — they form flocks in fall and winter and stay on their range; the growth of towns has helped them expand northward [3]." },
      { question: "What do cardinals eat in fall?", answer: "Seeds and fruit — dogwood, wild grape, mulberry, sumac and others — plus black-oil sunflower at feeders [2][3]." },
    ],
    sources: [EBIRD, FW, CARDINAL(3)],
  },
  "/seasonal-birds/summer/northern-cardinal": {
    path: "/seasonal-birds/summer/northern-cardinal", keyword: "northern cardinal in summer",
    title: "Northern Cardinal in Summer: Nesting, Broods & eBird Records",
    description: "The northern cardinal in summer: second broods, nestlings fed insects, the female singing from the nest, window attacks fading, and eBird records by state.",
    image: bimg("northern-cardinal", "Male northern cardinal in summer — the season of second broods and insect-fed nestlings"),
    intro: [
      "The northern cardinal in summer is a parent: pairs raise one to two broods a year, clutches of 2–5 eggs hatch in 11–13 days, and the young leave the nest after 7–13 days, fed mostly insects [3].",
      "Behavior is from All About Birds [3], feeding from Project FeederWatch [2], and the state numbers from eBird records on this site [1]. " + DATA_NOTE,
    ],
    sections: [
      { heading: "What the northern cardinal in summer is doing", paragraphs: [
        "Nests are wedged into a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up and hidden in dense foliage [3]. Unusually among North American songbirds, the female sings, often while on the nest, which may tell the male when to bring food [3]. Cardinals eat mainly seeds and fruit but feed their nestlings mostly insects — beetles, crickets, katydids, leafhoppers, cicadas, flies, spiders, butterflies and moths [3] — so an unsprayed yard is a cardinal nursery.",
        "The window attacks of spring and early summer, when both sexes fight their reflection while defending territory, stop as hormone levels fall a few weeks into the season [3].",
      ]},
      { heading: "Where to look for cardinals in summer", paragraphs: ["Cardinals hop through low branches and forage on or near the ground, and sing and preen from a high branch of a shrub, the crest raised when the bird is agitated [3]. In summer the pair works its territory alone rather than in the winter flock, and the fledglings follow the adults through hedgerows, forest edges, thickets and ornamental landscaping [3]. The eBird cards below show the species holding a steady share of records through June–August in every eastern state on this site, the signature of a resident rather than a migrant [1]."] },
      { heading: "Feeding cardinals in summer", paragraphs: [
        "Black oil sunflower on a hopper or tray still draws the adults [2][3], but visits thin while they hunt insects for young. Clean feeders every week or two and more often in heavy use, and discard seed that gets wet in summer storms [2]. Water matters more than seed in July: a shallow bath, changed daily, brings the whole family [2].",
      ]},
    ],
    faq: [
      { question: "How many broods do cardinals have in summer?", answer: "One to two a year, with 2–5 eggs each; young leave the nest after 7–13 days [3]." },
      { question: "What do cardinals feed their babies?", answer: "Mostly insects — beetles, crickets, katydids, cicadas, caterpillars — even though adults eat mainly seeds and fruit [3]." },
    ],
    sources: [EBIRD, FW, CARDINAL(3)],
  },
  "/seasonal-birds/spring/black-capped-chickadee": {
    path: "/seasonal-birds/spring/black-capped-chickadee", keyword: "black-capped chickadee in spring",
    title: "Black-capped Chickadee in Spring: Nests, Flocks & eBird Data",
    description: "The black-capped chickadee in spring: flocks break up, pairs excavate nest cavities in rotten birch or alder or take a box, the diet turns to insects.",
    image: bimg("black-capped-chickadee", "Black-capped chickadee in spring — the season pairs leave the flock to excavate a nest"),
    intro: [
      "The black-capped chickadee in spring leaves the winter flock: pairs excavate their own cavity in dead snags or rotten branches, frequently alder or birch, or take a nest box put up well before the breeding season [3].",
      "Behavior is from All About Birds [3], feeding from Project FeederWatch [2], and the state numbers from eBird records on this site [1]. " + DATA_NOTE,
    ],
    sections: [
      { heading: "What the black-capped chickadee in spring is doing", paragraphs: [
        "Both sexes excavate and the female builds a cup of moss lined with softer material such as rabbit fur, usually 1.5–7 meters up; clutches run from 1 to 13 eggs, incubated 12–13 days, with the young leaving after 12–16 days and one brood a year [3]. The diet swings to animal food: in spring, summer and fall, insects, spiders and other animal food make up 80–90 percent of what chickadees eat, against about half in winter [3]. Because migrating songbirds join chickadee flocks, listening for chickadees in spring is a reliable way to find other species passing through [3].",
      ]},
      { heading: "Where to look for chickadees in spring", paragraphs: ["Chickadees are active, acrobatic and social, and in spring the winter flock — which often included woodpeckers, nuthatches, warblers, vireos and other small woodland birds — thins to pairs on territory [3]. The chickadee-dee-dee call carries information about flock identity and threats, and the more dee notes, the higher the threat [3]. Because migrating songbirds join chickadee flocks, listening for chickadees in spring is a reliable way to find other species [3]; the eBird cards below show where the species is a regular spring bird, and that in Florida, Texas and Arizona it is essentially absent [1]."] },
      { heading: "Hosting chickadees in spring", paragraphs: [
        "Put up a box with a predator guard before the season and fill it with sawdust or wood shavings — chickadees are especially attracted to a box they can excavate — at least 60 feet into woodland if House Wrens are around [3]. They stay easy to feed: suet, sunflower and peanuts from tiny hanging feeders or window feeders [3], with suet the food FeederWatch recommends for insect-eating birds [2]. Clean feeders every week or two and more often in wet spring weather [2].",
      ]},
    ],
    faq: [
      { question: "When do black-capped chickadees nest?", answer: "Spring — they excavate a cavity in rotten wood or take a box put up before the breeding season; one brood a year [3]." },
      { question: "Do chickadees use nest boxes?", answer: "Yes, especially a box with a predator guard filled with sawdust or shavings they can dig out, placed 60 feet into woodland [3]." },
    ],
    sources: [EBIRD, FW, CHICKADEE(3)],
  },
  "/seasonal-birds/summer/black-capped-chickadee": {
    path: "/seasonal-birds/summer/black-capped-chickadee", keyword: "black-capped chickadee in summer",
    title: "Black-capped Chickadee in Summer: Insects, Young & Data",
    description: "The black-capped chickadee in summer: 80–90 percent insects and spiders, fledglings out of the cavity after 12–16 days, family groups at suet.",
    image: bimg("black-capped-chickadee", "Black-capped chickadee in summer — the season of insect hunting and fledglings"),
    intro: [
      "The black-capped chickadee in summer is an insect-eater: in spring, summer and fall, insects, spiders and other animal food make up 80–90 percent of the diet, and the single brood of the year has left the cavity after 12–16 days [3].",
      "Behavior is from All About Birds [3], feeding from Project FeederWatch [2], and the state numbers from eBird records on this site [1]. " + DATA_NOTE,
    ],
    sections: [
      { heading: "What the black-capped chickadee in summer is doing", paragraphs: [
        "Chickadees are active, acrobatic and social, and after the brood fledges the family forages together through the canopy, often with nuthatches and other small birds, seldom perching within a few feet of each other while eating [3]. The familiar chickadee-dee-dee carries information about flock identity and threats — the more dee notes, the higher the threat [3]. By late summer they begin hiding seeds to eat later, each in a different spot, remembering thousands of hiding places for the winter [3].",
      ]},
      { heading: "Where to look for chickadees in summer", paragraphs: ["Chickadees live in flocks that often include woodpeckers, nuthatches, warblers and vireos, and they seldom perch within a few feet of each other while eating [3]. They can also excavate their own sleeping cavities in rotten wood and sleep alone in them [3]. The eBird cards below show the species is a bird of the northern states on this site and absent from the Southeast and Southwest [1]."] },
      { heading: "Feeding chickadees in summer", paragraphs: [
        "Summer is also when the next generation learns the yard. Fledglings follow the adults to feeders and baths within days of leaving the cavity, and a family group of six or seven chickadees at a suet cage in July is the year's single brood [3]. Keep cats indoors — fledglings are among the birds at greatest risk from cats, and feeder birds are easy prey [2].",
        "At feeders chickadees take mostly sunflower seeds, peanuts, suet, peanut butter and mealworms [3]; suet is the food for insect-eating birds [2], and in heat use rendered cakes and watch for softening. They do not mind tiny hanging feeders that swing in the wind and readily visit window feeders [3]. Clean feeders every week or two and more often in heavy use [2], and keep a shallow bath changed daily [2].",
      ]},
    ],
    faq: [
      { question: "What do chickadees eat in summer?", answer: "80–90 percent insects and spiders; at feeders, sunflower, peanuts, suet, peanut butter and mealworms [3]." },
      { question: "Do chickadees have more than one brood?", answer: "No — one brood a year; young leave the cavity after 12–16 days [3]." },
    ],
    sources: [EBIRD, FW, CHICKADEE(3)],
  },
  "/seasonal-birds/spring/tufted-titmouse": {
    path: "/seasonal-birds/spring/tufted-titmouse", keyword: "tufted titmouse in spring",
    title: "Tufted Titmouse in Spring: Cavities, Nest Boxes & eBird Data",
    description: "The tufted titmouse in spring: pairs on territory taking old woodpecker holes or a nest box, 3–9 eggs, the shift from hoarded seed to insects.",
    image: bimg("tufted-titmouse", "Tufted titmouse in spring — a cavity nester that cannot dig its own hole"),
    intro: [
      "The tufted titmouse in spring needs a hole it cannot make: titmice nest in cavities but cannot excavate their own, so they use natural holes and old nest holes of woodpeckers including Pileated Woodpecker and Northern Flicker, as well as nest boxes, fence posts and metal pipes [3].",
      "Behavior is from All About Birds [3], feeding from Project FeederWatch [2], and the state numbers from eBird records on this site [1]. " + DATA_NOTE,
    ],
    sections: [
      { heading: "What the tufted titmouse in spring is doing", paragraphs: [
        "Unlike chickadees, titmouse pairs do not gather into larger flocks outside the breeding season; most stay on their territory as a pair, often with one of the previous year's young, and occasionally a young bird stays into the next breeding season to help raise the brood [3]. Clutches are 3–9 white eggs spotted with chestnut, brown or lilac, incubated 12–14 days; the young leave after 15–16 days, one brood a year [3]. By summer the diet is mainly insects — caterpillars, beetles, ants, wasps, stink bugs and treehoppers — plus spiders and snails, after a winter of seeds, nuts and hoarded sunflower [3].",
      ]},
      { heading: "Where to look for titmice in spring", paragraphs: ["Titmice live in deciduous or mixed evergreen-deciduous woods with a dense canopy and many tree species, and are common in orchards, parks and suburbs; they are rarely reported above 2,000 feet [3]. They flit from branch to branch of the canopy, often with nuthatches, chickadees, kinglets and woodpeckers, and are acrobatic foragers that hang upside down or sideways to check cones and leaf clusters [3]. The range has been expanding northward over the last half-century, possibly because of a warming climate, farmland reverting to forest and the popularity of backyard feeders [3]; the eBird cards below show it as an eastern bird, absent from the western states on this site [1]."] },
      { heading: "Hosting titmice in spring", paragraphs: [
        "Putting up a nest box well before the breeding season, with a predator guard, is a good way to attract a breeding pair, and the species' dependence on dead wood is a reason to leave dead trees standing where it is safe [3]. Titmice remain feeder regulars, preferring sunflower seeds and also taking suet and peanuts [3]; they hold a seed with their feet and hammer it open [3]. Clean feeders every week or two and more often in wet weather [2].",
      ]},
    ],
    faq: [
      { question: "When do tufted titmice nest?", answer: "Spring; 3–9 eggs incubated 12–14 days in a natural cavity, old woodpecker hole or nest box, one brood a year [3]." },
      { question: "Will a tufted titmouse use a birdhouse?", answer: "Yes — put up a box with a predator guard well before the breeding season [3]." },
    ],
    sources: [EBIRD, FW, TITMOUSE(3)],
  },
  "/seasonal-birds/summer/ruby-throated-hummingbird": {
    path: "/seasonal-birds/summer/ruby-throated-hummingbird", keyword: "ruby-throated hummingbird in summer",
    title: "Ruby-throated Hummingbird in Summer: Nests, Heat & Data",
    description: "The ruby-throated hummingbird in summer: females nesting alone on a slender branch, males leaving by early August, sugar water fermenting in heat.",
    image: timg("hummingbird-feeder", "Male ruby-throated hummingbird in summer at a feeder — he may be gone by early August"),
    intro: [
      "The ruby-throated hummingbird in summer is two different birds: a female building and tending a nest alone, and a male that pairs for only days to weeks, then leaves and may begin migrating by early August [3].",
      "Behavior is from All About Birds [3], feeding from Project FeederWatch [2], and the state numbers from eBird records on this site [1]. " + DATA_NOTE,
    ],
    sections: [
      { heading: "What the ruby-throated hummingbird in summer is doing", paragraphs: [
        "Females build the nest alone on a slender, often descending branch of a deciduous tree such as oak, hornbeam, birch, poplar or hackberry, usually 10–40 feet up; the nest takes 6–10 days, clutches are 1–3 eggs weighing about half a gram, incubated 12–14 days, with the young leaving after 18–22 days and 1–2 broods a year [3]. Males aggressively defend flowers and feeders, leading to spectacular chases [3]. They feed at tubular red and orange flowers — trumpet creeper, cardinal flower, honeysuckle, jewelweed, bee-balm — and catch insects in midair for protein [3].",
      ]},
      { heading: "Where to look for hummingbirds in summer", paragraphs: ["Ruby-throated Hummingbirds breed in deciduous woodlands of eastern North America and across the Canadian prairies, in old fields, forest edges, meadows, orchards, stream borders and backyards [3]. Watch flower patches and feeders for the chases — males aggressively defend both — and slender, often descending branches of oaks, hornbeams, birches and poplars for the nest, usually 10–40 feet up [3]. The eBird cards below show it as a bird of the eastern states on this site, replaced in Arizona, California, Colorado and Oregon by other hummingbird species [1]."] },
      { heading: "Feeding hummingbirds in summer", paragraphs: [
        "Use about one-quarter cup of sugar per cup of water, no food coloring, and change it before it grows cloudy or discolored — in hot weather sugar water ferments rapidly to produce toxic alcohol [3]. FeederWatch's rule is a cleaning every couple of days, ideally at every refill, and an immediate wash at any sign of cloudy water or black mold [2]. Place feeders where cats cannot lie in wait and away from windows the birds might fly into [3].",
      ]},
    ],
    faq: [
      { question: "Why did the male hummingbirds disappear in summer?", answer: "Males leave after mating and may begin migrating by early August, while females are still raising young [3]." },
      { question: "How often should I change hummingbird nectar in summer?", answer: "Every couple of days at least — sugar water ferments quickly in heat — and immediately if it clouds or molds [2][3]." },
    ],
    sources: [EBIRD, FW, HUMMER(3)],
  },
};

export const SEASON_MONTHS: Record<string, number[]> = { spring: [2, 3, 4], summer: [5, 6, 7], fall: [8, 9, 10], winter: [11, 0, 1] };
