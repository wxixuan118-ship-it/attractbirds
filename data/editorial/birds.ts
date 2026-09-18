import type { EditorialContent } from "./types";
import groupImages from "../group-images.json";

type Img = { species: string; src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const IMG = groupImages as Record<string, Img>;
const img = (slug: string, alt: string) => {
  const m = IMG[slug];
  return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined;
};

/** All About Birds pages (Cornell Lab of Ornithology) are the primary source for every species below; facts are paraphrased and cited by section. */
const aab = (slug: string, name: string) => [
  { id: 1, label: `All About Birds (Cornell Lab of Ornithology) — ${name}: Overview`, url: `https://www.allaboutbirds.org/guide/${slug}/overview` },
  { id: 2, label: `All About Birds (Cornell Lab of Ornithology) — ${name}: Life History`, url: `https://www.allaboutbirds.org/guide/${slug}/lifehistory` },
  { id: 3, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); state records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
];

export const birdEditorial: Record<string, EditorialContent> = {
  "black-capped-chickadee": {
    path: "/birds/black-capped-chickadee",
    keyword: "black-capped chickadee",
    title: "Black-capped Chickadee: ID, Food, Nesting & How to Attract",
    description: "Black-capped chickadee facts from Cornell's All About Birds and eBird: identification, diet, nesting, and the feeders and nest boxes that bring it in.",
    image: img("black-capped-chickadee", "Black-capped chickadee perched on a conifer branch — the black cap and bib, white cheeks and gray back are its field marks"),
    intro: [
      "The black-capped chickadee is, for many people, the first bird they learn: a tiny, round-headed bird with a black cap and bib, white cheeks, gray back and wings, and buffy sides, curious about everything in its territory including humans, and quick to find a new feeder [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts for identification, diet, nesting and conservation [1][2], and on eBird records from the nine states covered on this site to show where the species is actually reported [3].",
    ],
    sections: [
      {
        heading: "Black-capped chickadee identification and behavior",
        paragraphs: [
          "The combination of black cap and bib with bright white cheeks is distinctive; the back, wings and tail are gray and the underparts whitish with buff flanks [1]. Chickadees are active, acrobatic and social, living in flocks that often include woodpeckers, nuthatches, warblers, vireos and other small woodland birds, and they seldom perch within a few feet of each other while eating [2].",
          "The calls are complex: the familiar chickadee-dee-dee carries information about flock identity and threats, and the more dee notes in the call, the higher the threat level [1]. Because migrating songbirds join chickadee flocks, listening for chickadees in spring and fall is a reliable way to find other species [1].",
          "Two facts explain why chickadees are such good winter birds. They hide seeds and other food items to eat later, each in a different spot, and can remember thousands of hiding places; and even when temperatures are far below zero they sleep alone in their own individual cavities, which they can excavate themselves in rotten wood [1]. The oldest known wild black-capped chickadee was at least 11 years, 8 months old [1].",
        ],
      },
      {
        heading: "Black-capped chickadee habitat and range",
        paragraphs: [
          "Black-capped chickadees are found in deciduous and mixed forests, open woods, parks, willow thickets, cottonwood groves and disturbed areas [2]. In the nine states with eBird data on this site they are among the most-reported birds in Michigan, Colorado, Oregon and Rhode Island, and essentially unrecorded in Florida, Texas and Arizona, where other chickadee species take their place [3].",
        ],
      },
      {
        heading: "Black-capped chickadee diet and feeder foods",
        paragraphs: [
          "In winter about half the diet is seeds, berries and other plant matter and half animal food — insects, spiders, suet and occasionally fat from carcasses; in spring, summer and fall, insects, spiders and other animal food make up 80–90 percent of what they eat [2]. At feeders they take mostly sunflower seeds, peanuts, suet, peanut butter and mealworms, pecking a hole in a seed's shell and chipping out tiny bits [2].",
          "Chickadees are one of the easiest birds to attract to feeders with suet, sunflower and peanuts; they do not mind tiny hanging feeders that swing in the wind and readily use window feeders [1].",
        ],
      },
      {
        heading: "Black-capped chickadee nesting",
        paragraphs: [
          "Chickadees nest in nest boxes, small natural cavities or abandoned Downy Woodpecker holes, and often excavate their own cavity in dead snags or rotten branches, frequently alder or birch; nests are usually 1.5–7 m up [2]. Both sexes excavate and the female builds a cup of moss lined with softer material such as rabbit fur [2].",
          "Clutches run from 1 to 13 eggs, white with fine reddish-brown dots, incubated 12–13 days; the young leave the nest after 12–16 days, and there is one brood a year [2]. To host a pair, put up a box well before the breeding season, add a predator guard, and fill it with sawdust or wood shavings — chickadees are especially attracted to a box they can excavate; placing it at least 60 feet into woodland keeps House Wrens from taking it over [1].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Black-capped chickadees are common, and overall populations increased slightly between 1966 and 2019 according to the North American Breeding Bird Survey; Partners in Flight estimates the global breeding population at 43 million and rates the species 7 out of 20 on the Continental Concern Score, a species of low conservation concern that also benefits from people who keep feeders [2].",
        ],
      },
    ],
    faq: [
      { question: "What does a black-capped chickadee eat?", answer: "Insects, spiders and other animal food make up 80–90 percent of the diet outside winter; in winter about half is seeds and berries. At feeders: sunflower seeds, peanuts, suet, peanut butter and mealworms [2]." },
      { question: "Where do black-capped chickadees live?", answer: "In deciduous and mixed forests, open woods, parks and thickets across the northern United States and Canada, year-round [1][2]." },
      { question: "How long do black-capped chickadees live?", answer: "The oldest known wild bird was at least 11 years, 8 months old when recaptured in New York in 2021 [1]." },
      { question: "What is the best feeder for chickadees?", answer: "Almost any: they take suet, sunflower and peanuts from small hanging feeders, window feeders and tube feeders alike [1]." },
    ],
    sources: aab("Black-capped_Chickadee", "Black-capped Chickadee"),
  },

  "northern-cardinal": {
    path: "/birds/northern-cardinal",
    keyword: "northern cardinal",
    title: "Northern Cardinal: ID, Food, Nesting & How to Attract",
    description: "Northern cardinal facts from Cornell's All About Birds and eBird: identification, diet, nesting, why cardinals attack windows, and the feeders they use.",
    image: img("northern-cardinal", "Male northern cardinal, crimson with a black face and orange-red bill, perched in a shrub"),
    intro: [
      "The northern cardinal is the crested red songbird of eastern and central North America, abundant in backyards and the state bird of seven states — Illinois, Indiana, Kentucky, North Carolina, Ohio, Virginia and West Virginia [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Northern cardinal identification and behavior",
        paragraphs: [
          "Cardinals hop through low branches and forage on or near the ground, and sing and preen from a high branch of a shrub; the crest is raised when the bird is agitated and lowered almost flat at rest [2]. They move in pairs during the breeding season, but in fall and winter form flocks of a dozen to several dozen birds, sometimes foraging with juncos, sparrows, titmice and goldfinches [2].",
          "Unusually among North American songbirds, the female cardinal sings, often while on the nest, which may tell the male when to bring food; her song can be longer and more complex than his [1]. Cardinals are also the bird most often seen attacking their own reflection in a window or car mirror in spring and early summer, when both sexes are defending territory; the attacks stop a few weeks later as hormone levels fall [1].",
        ],
      },
      {
        heading: "Northern cardinal habitat and range",
        paragraphs: [
          "Look for cardinals in dense shrubby areas: forest edges, overgrown fields, hedgerows, backyards, marshy thickets, mesquite, regrowing forest and ornamental landscaping. They nest in dense foliage and look for conspicuous, fairly high perches for singing. The growth of towns and suburbs across eastern North America has helped the species expand its range northward [2].",
        ],
      },
      {
        heading: "Northern cardinal diet and feeder foods",
        paragraphs: [
          "Cardinals eat mainly seeds and fruit, supplemented with insects, and feed their nestlings mostly insects. Wild foods include dogwood, wild grape, buckwheat, grasses, sedges, mulberry, hackberry, blackberry, sumac, tulip-tree and corn; insect prey includes beetles, crickets, katydids, leafhoppers, cicadas, flies, spiders, butterflies and moths [2]. At feeders they eat many kinds of birdseed, particularly black oil sunflower [2].",
          "Nearly any feeder within their range ought to attract cardinals, but they particularly use sunflower seeds; leaving undergrowth in the yard or around its edges can bring a nesting pair [1].",
        ],
      },
      {
        heading: "Northern cardinal nesting",
        paragraphs: [
          "A week or two before building, the female visits possible sites with the male following, the pair calling back and forth and holding nesting material as they assess each spot. Nests are wedged into a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up and hidden in dense foliage [2].",
          "Clutches are 2–5 eggs, grayish, buffy or greenish white speckled with gray to brown, incubated 11–13 days; the young leave after 7–13 days and pairs raise 1–2 broods a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "The expansion of agricultural and suburban habitat over the last two centuries has been good for cardinals, which are abundant in eastern and central North America. Breeding Bird Survey numbers have increased by an estimated 0.32% per year since 1966; Partners in Flight estimates a global breeding population of 130 million and rates the species 6 out of 20 on the Continental Concern Score [2]. The oldest recorded northern cardinal was a female of 15 years, 9 months [1].",
        ],
      },
    ],
    faq: [
      { question: "What do northern cardinals eat?", answer: "Mainly seeds and fruit — dogwood, wild grape, mulberry, sumac, grasses and many others — plus insects, which are the main food for nestlings. At feeders, black oil sunflower seed above all [2]." },
      { question: "Why is a cardinal attacking my window?", answer: "It is fighting its own reflection while defending territory in spring and early summer; both males and females do it, and it stops as aggressive hormone levels subside a few weeks later [1]." },
      { question: "Do female cardinals sing?", answer: "Yes — the northern cardinal is one of the few North American songbirds in which the female sings, often from the nest [1]." },
      { question: "Where do cardinals nest?", answer: "In a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up and hidden in dense foliage; 2–5 eggs, 1–2 broods a year [2]." },
    ],
    sources: aab("Northern_Cardinal", "Northern Cardinal"),
  },

  "american-robin": {
    path: "/birds/american-robin",
    keyword: "american robin",
    title: "American Robin: ID, Diet, Nesting & Facts",
    description: "American robin facts from Cornell's All About Birds and eBird: diet, habitat, nesting, lifespan, and why you see fewer robins in winter.",
    image: img("american-robin", "American robin standing on a lawn, showing the orange breast and gray-brown back"),
    intro: [
      "The american robin (Turdus migratorius) is the large orange-breasted thrush of lawns and parks across the continent — and, contrary to the \"first robin of spring\" tradition, a bird many people have all year without noticing [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "American robin identification and behavior",
        paragraphs: [
          "On the ground a robin runs a few steps, then stops abruptly; in long grass it may hop or fly just above the ground with slow, powerful wingbeats. Robins find worms by staring motionless at the ground with the head cocked, and will fight over worms other robins have caught [2]. In spring, males attract females by singing, raising and spreading the tail, shaking the wings and inflating the white-striped throat [2].",
          "Robins eat different foods at different times of day — more earthworms in the morning, more fruit later — and when they feed exclusively on honeysuckle berries they sometimes become intoxicated [1].",
        ],
      },
      {
        heading: "American robin habitat and range, and why they seem to vanish in winter",
        paragraphs: [
          "Robins are common across the continent on lawns, fields and city parks as well as in woodlands, forests, mountains up to near treeline, recently burned forests and tundra; in winter many move to moist woods where berry-producing trees and shrubs are common [2].",
          "Many robins spend the whole winter in their breeding range, but they spend more time roosting in trees and less on lawns, so you are much less likely to see them; winter roosts can be huge, sometimes a quarter-million birds [1]. How many stay in the north varies each year with local conditions [1].",
        ],
      },
      {
        heading: "American robin diet and feeder foods",
        paragraphs: [
          "Robins eat large numbers of both invertebrates and fruit. In spring and summer they take earthworms, insects and some snails; year-round they eat an enormous variety of fruit including chokecherries, hawthorn, dogwood, sumac and juniper berries, and one study suggests they may select fruits that have bugs in them [2].",
          "Because robins forage largely on lawns, they are vulnerable to pesticide poisoning and can be an indicator of chemical pollution — the strongest reason to keep a robin-friendly yard pesticide-free [2].",
        ],
      },
      {
        heading: "American robin nesting",
        paragraphs: [
          "Females choose the site, typically on one or several horizontal branches hidden in or just below a layer of dense leaves, usually in the lower half of a tree; robins also nest in gutters, eaves, on outdoor light fixtures and other structures [2]. Clutches are 3–5 sky-blue or blue-green eggs, incubated 12–14 days, with the young leaving after about 13 days; a pair can raise 1–3 broods a year [2].",
          "Success is low: on average only 40 percent of nests produce young, only a quarter of fledglings survive to November, and about half the robins alive in a year make it to the next, so the whole population turns over about every six years even though a lucky robin can live 14 years [1].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "American robins are numerous and widespread; populations increased slightly, by about 0.13% per year from 1966 to 2019, according to the North American Breeding Bird Survey. Partners in Flight estimates the global breeding population at 370 million and rates the species 5 out of 20 on the Continental Concern Score [2].",
        ],
      },
    ],
    faq: [
      { question: "What does an american robin eat?", answer: "Earthworms, insects and snails — especially in spring and summer — plus a wide range of fruit such as chokecherry, hawthorn, dogwood, sumac and juniper [2]." },
      { question: "What is the scientific name of the american robin?", answer: "Turdus migratorius. It is a thrush, not a close relative of the European robin [1]." },
      { question: "Do robins migrate?", answer: "Some do, but many spend the whole winter in their breeding range, roosting in trees and feeding on fruit rather than on lawns, which is why they seem to disappear [1]." },
      { question: "How long do american robins live?", answer: "A lucky robin can reach 14 years, but on average the population turns over every six years [1]." },
    ],
    sources: aab("American_Robin", "American Robin"),
  },

  "blue-jay": {
    path: "/birds/blue-jay",
    keyword: "blue jay",
    title: "Blue Jay: ID, Food, Nesting & How to Attract",
    description: "Blue jay facts from Cornell's All About Birds and eBird: identification, diet, hawk mimicry, migration, nesting, and the feeders that attract them.",
    image: img("blue-jay", "Blue jay on a lawn, showing the crest, blue wings barred with black and white, and black necklace"),
    intro: [
      "The blue jay is a large, crested, noisy songbird of eastern and central forests and suburbs, known for its intelligence, tight family bonds and habit of imitating hawks [1][2].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Blue jay identification and behavior",
        paragraphs: [
          "The perky crest and blue, white, gray and black plumage are unmistakable; the blue is not a pigment at all — the feathers contain brown melanin, and the blue is produced by light scattering in the feather structure [1]. Jays lower the crest when feeding peacefully with family or tending nestlings [1].",
          "Blue jays often mate for life and stay with their mate all year. Only the female incubates, fed entirely by the male; for the first 8–12 days after hatching she broods the young while he provides food [2]. The jay frequently mimics the calls of hawks, especially the Red-shouldered Hawk, either to warn other jays or to fool other species into thinking a hawk is present [1].",
          "Thousands of blue jays migrate in flocks along the Great Lakes and Atlantic coasts, yet much about it remains a mystery: some are present all winter everywhere in the range, and an individual may migrate south one year, stay north the next, and migrate again the year after [1].",
        ],
      },
      {
        heading: "Blue jay habitat and range",
        paragraphs: [
          "Blue jays occur in all kinds of forests but especially near oaks, and are more abundant near forest edges than in deep forest; they are common in urban and suburban areas, particularly where oaks or bird feeders are found [2].",
        ],
      },
      {
        heading: "Blue jay diet and feeder foods",
        paragraphs: [
          "Jays glean insects and take nuts, seeds and grains in trees, shrubs and on the ground. Stomach contents are about 22 percent insect over the year, with acorns, nuts, fruit and grain making up almost all the rest [2]. The reputation for raiding nests is overstated: in an extensive study only 1% of jays showed evidence of eggs or birds in their stomachs, and of 530 stomachs examined, traces were found in just six [1][2].",
          "At feeders, blue jays prefer tray or hopper feeders on a post rather than hanging feeders, and take peanuts, sunflower seeds and suet; they often drink from birdbaths, and planting oaks provides acorns for future jays [1].",
        ],
      },
      {
        heading: "Blue jay nesting",
        paragraphs: [
          "Jays build in the crotch or thick outer branches of a deciduous or coniferous tree, usually 10–25 feet up; both sexes gather material and build, the male doing more gathering and the female more building [2]. Clutches are 2–7 bluish or light brown eggs with brownish spots, incubated 17–18 days, with the young leaving after 17–21 days; one brood a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Blue jays are common, but populations declined by an estimated 0.6% per year, about 27% in total, between 1966 and 2019 according to the North American Breeding Bird Survey. Partners in Flight estimates a global breeding population of 17 million and rates the species 9 out of 20 on the Continental Concern Score; the most frequent human-associated cause of death is attacks by cats and dogs [2].",
        ],
      },
    ],
    faq: [
      { question: "What do blue jays eat?", answer: "Mostly acorns, nuts, seeds, grain and fruit, with insects about a fifth of the diet; at feeders, peanuts, sunflower seeds and suet [1][2]." },
      { question: "Do blue jays like apples?", answer: "Fruit is part of the diet, but All About Birds lists peanuts, sunflower seeds and suet as the foods they prefer at feeders, offered on a tray or hopper feeder rather than a hanging one [1]." },
      { question: "Why do blue jays sound like hawks?", answer: "They mimic hawks, especially the Red-shouldered Hawk — possibly to warn other jays, possibly to scare other birds away [1]." },
      { question: "Do blue jays migrate?", answer: "Some do, in flocks along the Great Lakes and Atlantic coasts, but others stay all winter, and the same bird may migrate one year and not the next [1]." },
    ],
    sources: aab("Blue_Jay", "Blue Jay"),
  },

  "american-goldfinch": {
    path: "/birds/american-goldfinch",
    keyword: "american goldfinch",
    title: "American Goldfinch: ID, Food, Nesting & How to Attract",
    description: "American goldfinch facts from Cornell's All About Birds and eBird: twice-a-year molt, all-seed diet, late nesting, and the feeders and plants that attract it.",
    image: img("american-goldfinch", "American goldfinch feeding on a coneflower seed head"),
    intro: [
      "The american goldfinch is the small bright-yellow finch of weedy fields and feeders, one of the strictest vegetarians in the bird world and one of the latest nesters in North America [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "American goldfinch identification and behavior",
        paragraphs: [
          "Goldfinches are unusual among finches in molting their body feathers twice a year, once in late winter and again in late summer, so the brightening yellow of males each spring is a mark of approaching warm months [1]. They are active, acrobatic birds that balance on the seedheads of thistles and dandelions to pluck seeds, with a bouncy flight and the frequent po-ta-to-chip call; unlike most songbirds they do not join in mobbing predators [2].",
          "Paired goldfinches make virtually identical flight calls, and may recognise members of other pairs by them [1]. The oldest known bird was 10 years, 9 months old [1].",
        ],
      },
      {
        heading: "Where american goldfinches live",
        paragraphs: [
          "Weedy fields, open floodplains and other overgrown areas with sunflower, aster and thistle for food and some shrubs and trees for nesting; goldfinches are also common in suburbs, parks and backyards [2]. In winter they move south in a pattern that seems to track the line where January minimum temperature averages no colder than 0 °F [1].",
        ],
      },
      {
        heading: "What american goldfinches eat",
        paragraphs: [
          "Goldfinches eat seeds almost exclusively — composites such as sunflowers, thistle and asters, grasses, and trees like alder, birch, western red cedar and elm — swallowing an occasional insect only inadvertently [1][2]. Their all-seed diet is so complete that when a Brown-headed Cowbird lays in a goldfinch nest, the cowbird chick seldom survives more than three days on it [1].",
          "At feeders they prefer nyjer and sunflower, and use almost any feeder type — hopper, platform or hanging — and happily feed on spilled seed on the ground; planting native thistles, other composites and milkweed brings them in [1][2].",
        ],
      },
      {
        heading: "American goldfinch nesting",
        paragraphs: [
          "Goldfinches breed later than most North American birds, waiting until June or July when milkweed, thistle and other plants have produced the fibrous seeds they weave into nests and feed to their young [1]. The female builds, usually high in a shrub where two or three vertical branches join, in a fairly open setting rather than forest interior [2]. Clutches are 2–7 pale bluish-white eggs, incubated 12–14 days; young leave after 11–17 days, with 1–2 broods a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "American goldfinches are common, but numbers decreased by an estimated 0.6% per year between 1966 and 2019, a cumulative 27%, according to the North American Breeding Bird Survey; Partners in Flight estimates a global breeding population of 44 million and rates the species 6 out of 20 on the Continental Concern Score [2].",
        ],
      },
    ],
    faq: [
      { question: "What do american goldfinches eat?", answer: "Seeds almost exclusively — thistle, sunflower, aster, grasses and tree seeds such as alder and birch; at feeders, nyjer and sunflower [2]." },
      { question: "Why do goldfinches turn brown in winter?", answer: "They molt twice a year; the late-summer molt replaces the male's bright yellow with dull olive-brown, and the late-winter molt brings the yellow back [1]." },
      { question: "When do goldfinches nest?", answer: "Later than almost any other North American songbird — June or July, once thistle and milkweed have set seed [1]." },
      { question: "What feeder is best for goldfinches?", answer: "Any type works, including swaying hanging feeders; nyjer in a mesh or tube feeder and sunflower are the preferred foods [1]." },
    ],
    sources: aab("American_Goldfinch", "American Goldfinch"),
  },

  "tufted-titmouse": {
    path: "/birds/tufted-titmouse",
    keyword: "tufted titmouse",
    title: "Tufted Titmouse: ID, Food, Nesting & How to Attract",
    description: "Tufted titmouse facts from Cornell's All About Birds and eBird: identification, diet, seed-hoarding, cavity nesting, range expansion, and how to attract it.",
    image: img("tufted-titmouse", "Tufted titmouse, a small gray bird with a pointed crest and peach flanks, perched on a twig"),
    intro: [
      "The tufted titmouse is the small gray crested bird of eastern woodlands and feeders, a regular winter visitor to sunflower feeders that hoards what it takes [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Tufted titmouse identification and behavior",
        paragraphs: [
          "Titmice flit from branch to branch of the canopy looking for food, often with nuthatches, chickadees, kinglets and woodpeckers; when they find a large seed such as a sunflower seed from a feeder, they hold it with their feet and hammer it open [2]. They are acrobatic foragers that hang upside down or sideways to check cones, undersides of branches and leaf clusters, and sometimes drop to the ground [2].",
          "Unlike chickadees, titmouse pairs do not gather into larger flocks outside the breeding season; most stay on their territory as a pair, often with one of that year's young, and occasionally a young bird stays into the next breeding season to help raise the brood [1].",
        ],
      },
      {
        heading: "Where tufted titmice live",
        paragraphs: [
          "Tufted titmice live in deciduous or mixed evergreen-deciduous woods with a dense canopy and many tree species, and are common in orchards, parks and suburbs; they are rarely reported above 2,000 feet [2]. The range has been expanding northward over the last half-century, possibly because of a warming climate, farmland reverting to forest and the popularity of backyard feeders [2].",
        ],
      },
      {
        heading: "What tufted titmice eat",
        paragraphs: [
          "In summer titmice eat mainly insects — caterpillars, beetles, ants and wasps, stink bugs and treehoppers — plus spiders and snails; they also eat seeds, nuts and berries including acorns and beech nuts, and experiments show they always choose the largest seeds they can [2].",
          "Titmice are regulars at feeders, especially in winter, preferring sunflower seeds but also taking suet, peanuts and other seeds [1]. They hoard: in fall and winter they store shelled seeds in bark crevices, usually within 130 feet of the feeder, taking one seed per trip [1][2].",
        ],
      },
      {
        heading: "Tufted titmouse nesting",
        paragraphs: [
          "Titmice nest in cavities but cannot excavate their own, so they use natural holes and old nest holes of woodpeckers including Pileated Woodpecker and Northern Flicker, as well as nest boxes, fence posts and metal pipes [2]. Clutches are 3–9 white eggs spotted with chestnut, brown or lilac, incubated 12–14 days; the young leave after 15–16 days, one brood a year [2].",
          "Putting up a nest box well before the breeding season, with a predator guard, is a good way to attract a breeding pair; the species' dependence on dead wood is a reason to leave dead trees standing where it is safe [1].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Tufted titmice are common and populations increased between 1966 and 2019 according to the North American Breeding Bird Survey; Partners in Flight estimates a global breeding population of 12 million and rates the species 7 out of 20 on the Continental Concern Score [2].",
        ],
      },
    ],
    faq: [
      { question: "What do tufted titmice eat?", answer: "Insects, spiders and snails in summer; seeds, nuts, acorns and berries otherwise. At feeders they prefer sunflower seeds, and also take suet and peanuts [1][2]." },
      { question: "Where do tufted titmice nest?", answer: "In natural cavities, old woodpecker holes and nest boxes — they cannot dig their own cavity [2]." },
      { question: "Do tufted titmice migrate?", answer: "No; pairs stay on their territory year-round, and the range has been spreading north [1][2]." },
      { question: "How do I attract tufted titmice?", answer: "Sunflower seed in winter, a nest box with a predator guard put up before spring, and standing dead wood [1]." },
    ],
    sources: aab("Tufted_Titmouse", "Tufted Titmouse"),
  },

  "house-finch": {
    path: "/birds/house-finch",
    keyword: "house finch",
    title: "House Finch: ID, Food, Nesting & How to Attract",
    description: "House finch facts from Cornell's All About Birds and eBird: its spread from the West, why males vary from red to yellow, diet, nesting, and feeder eye disease.",
    image: img("house-finch", "House finch feeding on fruit, showing the streaked flanks and red-washed head of a male"),
    intro: [
      "The house finch is the streaky, red-headed finch of feeders and buildings across the United States — originally a western bird that reached the East through a failed pet-trade release in 1940 [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "House finch identification and behavior",
        paragraphs: [
          "The red of a male house finch comes from pigments in its food during molt — birds cannot make red or yellow directly — so the more pigment in the diet, the redder the male, and orange or yellowish males turn up where the food is poor in it; females prefer the reddest male they can find [1]. Highly social, house finches are rarely seen alone outside the breeding season and may form flocks of several hundred, feeding on the ground, at feeders or in fruiting trees and perching on the highest point available [2].",
        ],
      },
      {
        heading: "Where house finches live",
        paragraphs: [
          "House finches are birds of human-created habitats — buildings, lawns, small conifers and urban centers — and around barns and stables in rural areas; in their native western range they also live in desert, chaparral, oak savannah and open conifer forest below 6,000 feet [2].",
          "The species was originally western. In 1940 a small number were released on Long Island, New York after failed attempts to sell them as cage birds, and within 50 years they had spread across almost the whole eastern United States and southern Canada; they were also introduced to Hawaii before 1870 [1].",
        ],
      },
      {
        heading: "What house finches eat",
        paragraphs: [
          "House finches eat almost exclusively plant material: seeds, buds and fruit, including wild mustard, knotweed, thistle and mulberry, and orchard fruit such as cherries, apricots, peaches and figs. At feeders they take black oil sunflower over striped sunflower, plus millet and milo [2]. They feed their nestlings entirely plant foods, which is rare among birds [1].",
          "Fill feeders with small black oil sunflower seed; once house finches find them, they may bring flocks of 50 or more [1]. Keep feeders clean and dry: some populations have declined steeply since 1994 because of mycoplasmal conjunctivitis, an eye disease spread at feeders [2].",
        ],
      },
      {
        heading: "House finch nesting",
        paragraphs: [
          "House finches nest in deciduous and coniferous trees, on cactus and rock ledges, and in or on buildings — vents, ledges, street lamps, ivy and hanging planters — and occasionally reuse other birds' nests [2]. Clutches are 2–6 pale blue-to-white eggs speckled black and purple, incubated 13–14 days; young leave after 12–19 days, and pairs can raise as many as six broods in a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "House finches are common throughout the U.S., parts of Canada and Mexico, but populations appear to have decreased slightly between 1966 and 2019 according to the North American Breeding Bird Survey; Partners in Flight estimates a global breeding population of 40 million and rates the species 6 out of 20 on the Continental Concern Scale [2]. The oldest known bird was a female of at least 11 years, 7 months [1].",
        ],
      },
    ],
    faq: [
      { question: "What do house finches eat?", answer: "Almost entirely seeds, buds and fruit; at feeders, small black oil sunflower seed is their favorite [1][2]." },
      { question: "Why is my house finch orange or yellow instead of red?", answer: "Male color comes from pigments in the food eaten during molt; a diet low in those pigments produces orange or yellow males [1]." },
      { question: "Are house finches native to the eastern United States?", answer: "No — they were released on Long Island in 1940 and spread across the East within 50 years [1]." },
      { question: "What is the eye disease in house finches?", answer: "Mycoplasmal conjunctivitis, which has caused steep declines in some populations since 1994; clean feeders regularly and take them down if you see sick birds [2]." },
    ],
    sources: aab("House_Finch", "House Finch"),
  },

  "mourning-dove": {
    path: "/birds/mourning-dove",
    keyword: "mourning dove",
    title: "Mourning Dove: ID, Food, Nesting & How to Attract",
    description: "Mourning dove facts from Cornell's All About Birds and eBird: diet, nesting, up to six broods a year, and the ground and platform feeding that attracts them.",
    image: img("mourning-dove", "Mourning dove perched on a branch, showing the slim tan body, small head and long pointed tail"),
    intro: [
      "The mourning dove is the slender tan dove with the soft, sad-sounding coo, one of the most abundant birds in North America with a U.S. population estimated at 350 million [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Mourning dove identification and behavior",
        paragraphs: [
          "Mourning doves feed on the ground and in the open, pecking or pushing aside litter rather than scratching. Males defend favorite cooing perches from other males, and pairs preen each other around the neck before grasping beaks and bobbing heads in unison [2]. In the breeding season you may see three doves flying in tight formation: a mated male in the lead, an unmated rival chasing him, and the female following [1].",
          "Doves swallow seeds and store them in the crop, an enlargement of the esophagus — the record is 17,200 bluegrass seeds in one crop — then fly to a safe perch to digest [1]. They can drink brackish water up to almost half the salinity of seawater without dehydrating, one reason they survive in deserts [1].",
        ],
      },
      {
        heading: "Mourning dove habitat and range",
        paragraphs: [
          "Primarily a bird of open country, scattered trees and woodland edges, though large numbers roost in woodlots in winter; they feed on the ground in grasslands, agricultural fields, backyards and roadsides [2].",
        ],
      },
      {
        heading: "Mourning dove diet and feeder foods",
        paragraphs: [
          "Seeds make up 99 percent of the diet — cultivated grains, peanuts, wild grasses, weeds and herbs, occasionally berries and snails — and a dove eats roughly 12 to 20 percent of its body weight per day, about 71 calories on average [2].",
          "To attract them, scatter seed, particularly millet, on the ground or on platform feeders, plant dense shrubs or evergreens for nesting, and keep cats indoors, because ground-feeding birds are especially vulnerable [1].",
        ],
      },
      {
        heading: "Mourning dove nesting",
        paragraphs: [
          "Doves nest amid dense foliage on the branch of an evergreen, orchard tree, mesquite, cottonwood or vine, quite often on the ground in the West, and untroubled by people — on gutters, eaves or abandoned equipment; the nest is a flimsy assembly of pine needles and twigs [2]. The clutch is two unmarked white eggs, incubated 14 days, with young leaving after 12–15 days; a pair can raise up to six broods a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Mourning doves are common across the continent and have generally prospered as people settled the landscape, though populations declined by an estimated 0.4% per year from 1966 to 2019, about 20% in total, according to the North American Breeding Bird Survey; Partners in Flight estimates the global breeding population at 150 million and rates the species 6 out of 20 [2]. It is also the continent's most popular game bird, with hunters taking more than 20 million a year [1][2]. The oldest known dove was at least 30 years, 4 months old [1].",
        ],
      },
    ],
    faq: [
      { question: "What do mourning doves eat?", answer: "Seeds — 99 percent of the diet — including grain, peanuts, grass and weed seeds; at feeders, millet scattered on the ground or on a platform [1][2]." },
      { question: "How many times a year do mourning doves nest?", answer: "Up to six broods a year, each of two white eggs incubated for 14 days [2]." },
      { question: "Where do mourning doves nest?", answer: "On branches in dense foliage, on the ground in the West, and readily on gutters, eaves and other human structures [2]." },
      { question: "What feeder is best for mourning doves?", answer: "A platform feeder or seed scattered on the ground; they do not use tube feeders well [1]." },
    ],
    sources: aab("Mourning_Dove", "Mourning Dove"),
  },

  "downy-woodpecker": {
    path: "/birds/downy-woodpecker",
    keyword: "downy woodpecker",
    title: "Downy Woodpecker: ID, Food, Nesting & How to Attract",
    description: "Downy woodpecker facts from Cornell's All About Birds and eBird: identification, diet, drumming, cavity nesting, and the suet feeders that attract it.",
    image: img("downy-woodpecker", "Downy woodpecker clinging to a branch, showing the black-and-white back and short bill"),
    intro: [
      "The downy woodpecker is the small black-and-white woodpecker most likely to visit a backyard feeder, and the one that eats foods larger woodpeckers cannot reach [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Downy woodpecker identification and behavior",
        paragraphs: [
          "An active woodpecker that moves quickly over trunks, branches and even the stems of grasses and wildflowers, leaning on its stiff tail feathers for support, and more willing than most woodpeckers to move horizontally and downwards on a tree [2]. In late summer you may see one atop a goldenrod hammering at a plant gall for the fly larva inside [1][2].",
          "Woodpeckers do not sing; they drum loudly on wood or metal for the same purpose, and feeding birds make surprisingly little noise [1]. In winter downies join mixed flocks, and males and females divide the work — males on small branches and weed stems, females on larger branches and trunks [1].",
        ],
      },
      {
        heading: "Downy woodpecker habitat and range",
        paragraphs: [
          "Open woodlands, particularly deciduous woods and along streams, plus orchards, parks and suburbs; they also use open areas, nesting along fencerows and feeding among tall weeds [2].",
        ],
      },
      {
        heading: "Downy woodpecker diet and feeder foods",
        paragraphs: [
          "Mainly insects, including beetle larvae inside wood or bark, ants and caterpillars, and pest species such as corn earworm, tent caterpillars, bark beetles and apple borers; about a quarter of the diet is plant material — berries, acorns and grain [2].",
          "Where they occur, downies are the most likely woodpecker to visit a feeder: they prefer suet, and also take black oil sunflower seeds, millet, peanuts and chunky peanut butter, occasionally drinking from oriole and hummingbird feeders [1][2].",
        ],
      },
      {
        heading: "Downy woodpecker nesting",
        paragraphs: [
          "Downies nest in dead trees or dead parts of live trees, typically choosing a small stub about 7 inches in diameter that leans away from vertical and placing the entrance on the underside; the wood is often softened by fungus [2]. Clutches are 3–8 white eggs, incubated 12 days, with the young leaving after 18–21 days; one brood a year [2]. They have even been found nesting inside the walls of buildings [1].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Downy woodpeckers are numerous and populations were stable between 1966 and 2015 according to the North American Breeding Bird Survey; Partners in Flight estimates a global breeding population of 13 million and rates the species 7 out of 20. The shift from wooden to metal fence posts may have reduced numbers, while forest clearing and thinning has helped, since downies do well in young forest [2].",
        ],
      },
    ],
    faq: [
      { question: "What do downy woodpeckers eat?", answer: "Mostly insects, including wood-boring beetle larvae, ants and caterpillars, plus berries, acorns and grain; at feeders, suet first, then sunflower, peanuts and peanut butter [1][2]." },
      { question: "How do I tell a downy from a hairy woodpecker?", answer: "Size and bill: the downy is much smaller with a short, stubby bill, and it forages on twigs and weed stems that the hairy cannot use [1][2]." },
      { question: "Why does a woodpecker drum on my house?", answer: "Drumming is communication, not feeding; woodpeckers drum on resonant wood or metal in place of song [1]." },
      { question: "What feeder attracts downy woodpeckers?", answer: "A suet feeder; they also take black oil sunflower, peanuts and millet [1]." },
    ],
    sources: aab("Downy_Woodpecker", "Downy Woodpecker"),
  },

  "ruby-throated-hummingbird": {
    path: "/birds/ruby-throated-hummingbird",
    keyword: "ruby-throated hummingbird",
    title: "Ruby-throated Hummingbird: ID, Food, Nesting & Feeders",
    description: "Ruby-throated hummingbird facts from Cornell's All About Birds and eBird: flowers and feeders, the sugar-water recipe, nesting, and migration timing.",
    image: img("ruby-throated-hummingbird", "Ruby-throated hummingbird hovering at a red bee balm flower"),
    intro: [
      "The ruby-throated hummingbird is eastern North America's only breeding hummingbird, yet it occupies the largest breeding range of any hummingbird on the continent [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Ruby-throated hummingbird identification and behavior",
        paragraphs: [
          "Like all hummingbirds, ruby-throats are precision flyers that can stop in an instant, hang motionless, and move up, down, sideways and backwards; they dart between nectar sources or sit on a twig keeping watch [2]. The wings beat about 53 times a second, and the legs are so short the bird cannot walk or hop — the best it can do is shuffle along a perch [1].",
          "Males aggressively defend flowers and feeders, leading to spectacular chases [2], and they do not stay: pairs are together only days to weeks for courtship and mating, after which the male leaves and may begin migrating by early August [1]. The oldest known bird was a female of at least 9 years, 2 months [1].",
        ],
      },
      {
        heading: "Ruby-throated hummingbird habitat and range",
        paragraphs: [
          "They breed in deciduous woodlands of eastern North America and across the Canadian prairies, in old fields, forest edges, meadows, orchards, stream borders and backyards; on their tropical wintering grounds they live in dry forest, citrus groves, hedgerows and scrub [2].",
        ],
      },
      {
        heading: "Ruby-throated hummingbird diet and feeder foods",
        paragraphs: [
          "Nectar of red or orange tubular flowers — trumpet creeper, cardinal flower, honeysuckle, jewelweed, bee-balm, red buckeye and red morning glory — plus hummingbird feeders and sometimes tree sap; they also catch mosquitoes, gnats, fruit flies and small bees in midair, pull insects from spider webs, and pick caterpillars and aphids from leaves [2]. They prefer red or orange flowers, though there is no need to color feeder water [1].",
          "Feeder recipe: about one-quarter cup of table sugar per cup of water, no food coloring; change the water before it grows cloudy, and remember that in hot weather sugar water ferments rapidly into toxic alcohol. Place feeders where cats cannot lie in wait and away from windows [1][2].",
        ],
      },
      {
        heading: "Ruby-throated hummingbird nesting",
        paragraphs: [
          "Females build the nest alone on a slender, often descending branch of a deciduous tree such as oak, hornbeam, birch, poplar or hackberry, usually 10–40 feet up — and sometimes on loops of chain, wire or extension cord [1][2]. The nest takes 6–10 days to finish; clutches are 1–3 tiny white eggs weighing about half a gram, incubated 12–14 days, with the young leaving after 18–22 days; 1–2 broods a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Ruby-throated hummingbird populations steadily increased every year from 1966 to 2019 according to the North American Breeding Bird Survey; Partners in Flight estimates a global breeding population of 36 million and rates the species 8 out of 20. Feeders are generally safe, but can be a problem if they make birds easy targets for cats or are placed near windows [2].",
        ],
      },
    ],
    faq: [
      { question: "What is the correct sugar-water recipe for hummingbirds?", answer: "About one-quarter cup of plain table sugar per cup of water, with no food coloring; replace it before it turns cloudy, and more often in hot weather [1]." },
      { question: "When do ruby-throated hummingbirds leave?", answer: "Males may begin migrating by early August; the species winters in Mexico and Central America [1][2]." },
      { question: "What flowers attract ruby-throated hummingbirds?", answer: "Red or orange tubular flowers: trumpet creeper, cardinal flower, honeysuckle, jewelweed, bee-balm, red buckeye and red morning glory [2]." },
      { question: "Do hummingbirds eat insects?", answer: "Yes — mosquitoes, gnats, fruit flies, small bees, spiders, caterpillars and aphids [2]." },
    ],
    sources: aab("Ruby-throated_Hummingbird", "Ruby-throated Hummingbird"),
  },

  "baltimore-oriole": {
    path: "/birds/baltimore-oriole",
    keyword: "baltimore oriole",
    title: "Baltimore Oriole: ID, Food, Nesting & How to Attract",
    description: "Baltimore oriole facts from Cornell's All About Birds and eBird: identification, the woven hanging nest, diet, migration, and the fruit that attracts it.",
    image: img("baltimore-oriole", "Male Baltimore oriole, flame-orange and black, perched on a bare branch"),
    intro: [
      "The baltimore oriole's rich, whistling song from the treetops is a herald of spring across eastern North America, and the male's brilliant orange plumage blazes from high branches like a torch [1].",
      "This profile draws on the Cornell Lab of Ornithology's All About Birds accounts [1][2] and on eBird records from the nine states covered on this site [3].",
    ],
    sections: [
      {
        heading: "Baltimore oriole identification and behavior",
        paragraphs: [
          "Orioles are agile, acrobatic feeders that comb the high branches for insects, flowers and fruit, clambering across twigs, hanging upside down and fluttering to extend their reach, and flying out from perches to snatch insects in the air; males sing from conspicuous posts at the tops of trees [2]. Young males do not molt into bright orange until the fall of their second year, and females become deeper orange with every molt — some older females are almost as bright as males [1].",
          "The Baltimore oriole hybridizes extensively with Bullock's Oriole where their ranges meet on the Great Plains; the two were lumped as the Northern Oriole for a time and separated again after genetic studies in the 1990s [1]. American orioles are not related to Old World orioles: they belong to the blackbird and meadowlark family [1].",
        ],
      },
      {
        heading: "Baltimore oriole habitat and range",
        paragraphs: [
          "On their breeding grounds in eastern and east-central North America, orioles are found high in leafy deciduous trees but not in deep forest — open woodland, forest edge, river banks and small groves — and they have adapted well to people, feeding and nesting in parks, orchards and backyards [2]. On their winter range in Central America they occupy open woodlands, gardens and shade-grown coffee and cacao plantations [2].",
        ],
      },
      {
        heading: "Baltimore oriole diet and feeder foods",
        paragraphs: [
          "Insects, fruit and nectar, in proportions that change with the season: in summer, while feeding young, much of the diet is protein-rich insects — beetles, crickets, grasshoppers, moths, flies, spiders and snails, including pests such as tent caterpillars and gypsy moth caterpillars; in spring and fall, nectar and ripe fruit make up more of the diet because their sugars convert readily to migration fat [2]. Unlike robins, orioles seem to prefer only ripe, dark-colored fruit — the darkest mulberries, reddest cherries and deepest-purple grapes — and ignore green grapes and yellow cherries even when ripe [1].",
          "To attract them, cut oranges in half and hang them from trees, offer sugar water in an oriole feeder, and put out small amounts of jelly — not so much that it can soil their feathers; planting raspberries, crab apples and trumpet vines can bring orioles back year after year [1].",
        ],
      },
      {
        heading: "Baltimore oriole nesting",
        paragraphs: [
          "The female chooses a site within her mate's territory and anchors the nest to a fork in slender upper branches, often in an American elm but also maples and cottonwoods; the remarkable sock-like nest is woven from slender fibers, usually 3–4 inches deep with a small opening on top and a bulging bottom chamber, and usually hangs below a branch [2]. Clutches are 3–7 pale grayish or bluish-white eggs blotched with brown, black or lavender, incubated 11–14 days, with the young leaving after 11–14 days; one brood a year [2].",
        ],
      },
      {
        heading: "Conservation status",
        paragraphs: [
          "Baltimore oriole populations have declined throughout the range by an estimated 0.84% per year, a cumulative 36% between 1966 and 2019, according to the North American Breeding Bird Survey. Partners in Flight estimates the global breeding population at 12 million and rates the species 10 out of 20 on the Continental Concern Score; because it breeds in North America and winters in Central and South America, it is vulnerable to deforestation in many countries [2].",
        ],
      },
    ],
    faq: [
      { question: "What do baltimore orioles eat?", answer: "Insects in summer, nectar and ripe dark fruit in spring and fall; at feeders, orange halves, sugar water and small amounts of jelly [1][2]." },
      { question: "When do baltimore orioles arrive?", answer: "In spring, when the male's song from the treetops is one of the first signs of the season in eastern North America; they winter in Central America [1][2]." },
      { question: "What does a baltimore oriole nest look like?", answer: "A sock-like pouch woven from slender fibers, 3–4 inches deep, hanging from a fork in the upper branches of a tall tree, often an elm, maple or cottonwood [2]." },
      { question: "Why is my oriole not fully orange?", answer: "Young males keep drab, female-like plumage until the fall of their second year [1]." },
    ],
    sources: aab("Baltimore_Oriole", "Baltimore Oriole"),
  },
};
