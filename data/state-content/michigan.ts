import type { StateContent } from "./types";

/** Michigan state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const michiganContent: StateContent = {
  state: "michigan",
  keyword: "birds in Michigan",
  title: "Birds in Michigan: Common Backyard Birds & Where to See Them",
  description:
    "Birds in Michigan: the most-reported backyard species from 20 million eBird records, the Kirtland's Warbler story, a monthly calendar, and where to see them.",
  hero: {
    src: "/images/states/michigan-american-robin.webp",
    width: 1280,
    height: 783,
    alt: "American Robin, the state bird of Michigan and the second most-reported of all birds in Michigan, at Lake Lansing Park",
    credit: "Phoenix-Five",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Robin_eating_worm_at_Lake_Lansing_Park_South.jpg",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  intro: [
    "Birds in Michigan are shaped by the Great Lakes, whose shores funnel migrating birds along two peninsulas. The Michigan Bird Records Committee's checklist, updated 7 July 2025, totals 466 species [1].",
    "This guide covers the birds you are most likely to see in a Detroit, Grand Rapids, or Ann Arbor backyard, how the mix changes through the year, and the places worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Michigan, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Michigan different",
      paragraphs: [
        "Michigan's state bird is the American Robin, chosen in 1931 after being favored by the Michigan Audubon Society; its sponsors called it \"the best-known and best-loved of all the birds in the state of Michigan\" [2]. The data agrees: on eBird the robin is the second most-reported bird in Michigan, behind only the Blue Jay [7].",
        "The backyard cast is the classic northern one. After the Blue Jay and robin come Black-capped Chickadee, Northern Cardinal, Mourning Dove, American Crow, Red-winged Blackbird, American Goldfinch, Canada Goose, and Downy Woodpecker, with White-breasted Nuthatch, Red-bellied Woodpecker, Song Sparrow, and Tufted Titmouse close behind [7].",
        "Michigan's signature species is the Kirtland's Warbler, which nests only in young jack pine stands in Michigan, Wisconsin, and Ontario. Its population dipped to a low of 167 pairs in 1974 and again in 1987; after decades of habitat management it was estimated at around 2,000 pairs — double the recovery goal — and on October 8, 2019 the U.S. Fish and Wildlife Service removed it from the endangered species list [3].",
      ],
    },
    {
      heading: "When the birds in Michigan change with the seasons",
      paragraphs: [
        "eBird's Michigan records are heaviest in May, April, and June, and lightest in November and December [7]. Even top-ten birds turn over with the seasons here: Red-winged Blackbirds and Song Sparrows are reported mainly from March through October, Ruby-throated Hummingbirds and House Wrens from May through September, and Dark-eyed Juncos from October through April [7]. Yellow-rumped Warblers are passage migrants, peaking in April–May and September–October [7].",
        "The Upper Peninsula adds a migration spectacle. Whitefish Point, a peninsula that stretches out into Lake Superior, creates a natural corridor that funnels thousands of birds through the Great Lakes region during spring and fall migrations; over 340 species have been seen at the Point, and it has been identified as an Important Bird Area [4].",
        "For backyard birders this means feeders matter most from October through April, when juncos join the chickadees, cardinals, jays, and woodpeckers, and hummingbird feeders go up in May and come down in September.",
      ],
    },
    {
      heading: "Where to see birds in Michigan",
      paragraphs: [
        "The four sites below run from the Saginaw Bay marshes to Lake Superior; two are in the Upper Peninsula.",
      ],
    },
    {
      heading: "Birds in Michigan: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Michigan records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Michigan records. The state list total, the state bird, the Kirtland's Warbler history, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Whitefish Point Bird Observatory",
      blurb: "A Lake Superior peninsula that funnels thousands of migrating birds each spring and fall; over 340 species recorded and an identified Important Bird Area [4].",
      url: "https://wpbo.org/about/",
    },
    {
      name: "Seney National Wildlife Refuge",
      blurb: "95,238 acres of marshes, swamps, bogs, and forests in the Upper Peninsula, established in 1935; over 200 species of birds, with abundant Trumpeter Swans, Common Loons, Ospreys, and Bald Eagles [5].",
      url: "https://www.fws.gov/refuge/seney",
    },
    {
      name: "Shiawassee National Wildlife Refuge",
      blurb: "A 10,000-acre refuge established in 1953; more than 280 species of migratory birds observed [6].",
      url: "https://www.fws.gov/refuge/shiawassee",
    },
    {
      name: "Kirtland's Warbler Wildlife Management Area",
      blurb: "125 separate tracts totaling 6,684 acres across eight counties in the northern Lower Peninsula, managed as the young jack pine forest the warbler depends on [8].",
      url: "https://www.fws.gov/refuge/kirtlands-warbler-wildlife-management-area/about-us",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Michigan?",
      answer: "The Michigan Bird Records Committee's checklist, updated 7 July 2025, totals 466 species, including one extinct, one probably extinct, and two extirpated species [1].",
    },
    {
      question: "What is the state bird of Michigan?",
      answer: "The American Robin (Turdus migratorius), chosen in 1931 [2]. It is the second most-reported bird in Michigan on eBird [7].",
    },
    {
      question: "What is the best time of year to see birds in Michigan?",
      answer: "Late spring. eBird records for Michigan peak in May, April, and June and are lowest in November and December [7]; Whitefish Point funnels migrants in both spring and fall [4].",
    },
    {
      question: "What are the most common backyard birds in Michigan?",
      answer: "By eBird records, the most-reported birds in Michigan are Blue Jay, American Robin, Black-capped Chickadee, Northern Cardinal, and Mourning Dove, followed by American Crow, Red-winged Blackbird, American Goldfinch, Canada Goose, and Downy Woodpecker [7].",
    },
  ],
  sources: [
    { id: 1, label: "Michigan Bird Records Committee — Michigan Checklist", url: "https://mibirdrecords.com/michigan-checklist/" },
    { id: 2, label: "State of Michigan — State Facts and Symbols", url: "https://www.michigan.gov/som/about-michigan/state-facts-and-symbols" },
    { id: 3, label: "U.S. Fish and Wildlife Service — Partners celebrate successful recovery of beloved songbird (Kirtland's warbler, October 2019)", url: "https://www.fws.gov/press-release/2019-10/partners-celebrate-successful-recovery-beloved-songbird" },
    { id: 4, label: "Whitefish Point Bird Observatory — About", url: "https://wpbo.org/about/" },
    { id: 5, label: "U.S. Fish and Wildlife Service — Seney National Wildlife Refuge", url: "https://www.fws.gov/refuge/seney" },
    { id: 6, label: "U.S. Fish and Wildlife Service — Shiawassee National Wildlife Refuge", url: "https://www.fws.gov/refuge/shiawassee" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Michigan records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
    { id: 8, label: "U.S. Fish and Wildlife Service — Kirtland's Warbler Wildlife Management Area: About Us", url: "https://www.fws.gov/refuge/kirtlands-warbler-wildlife-management-area/about-us" },
  ],
};
