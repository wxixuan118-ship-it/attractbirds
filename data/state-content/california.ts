import type { StateContent } from "./types";

/** California state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const californiaContent: StateContent = {
  state: "california",
  keyword: "birds in California",
  title: "Birds in California: Common Backyard Birds & Best Spots",
  description:
    "Birds in California: the most-reported backyard species from 62 million eBird records, the two endemic birds, a monthly calendar, and where to see them.",
  hero: {
    src: "/images/states/california-california-quail.webp",
    width: 1280,
    height: 960,
    alt: "California Quail, the state bird of California and one of the most recognisable birds in California, photographed in Orange County",
    credit: "Michael Hurben",
    creditUrl: "https://commons.wikimedia.org/wiki/File:California_Quail,_Orange_County,_CA.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
  },
  intro: [
    "Birds in California are as varied as the state itself. The California Bird Records Committee's official checklist includes 696 species, 19 of which are established introductions [1], and the state holds two birds found nowhere else on Earth [4][5].",
    "This guide covers the birds you are most likely to meet in a California backyard from San Diego to the Bay Area, how the mix shifts through the year, and the places worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for California, not from a generic template [8].",
  ],
  sections: [
    {
      heading: "What makes birds in California different",
      paragraphs: [
        "California's state bird is the California Quail, also known as the valley quail, which became the official state bird in 1931. Plump, gray-colored, and smaller than a pigeon, it sports a downward-curving black plume on top of its head, and its flocks number from a few to 60 or more in the fall and winter months before breaking into pairs in spring [2].",
        "Two species are endemic to the state. The Yellow-billed Magpie lives only in California, in an area about 500 miles from north to south and less than 150 miles wide, and is most numerous in open oak savanna [5]. The Island Scrub-Jay lives only on Santa Cruz Island in Channel Islands National Park, which gives it the smallest range of any North American bird species and makes it the only island-endemic bird species in North America [4].",
        "The backyard cast is western. On eBird, the most-reported birds in California are House Finch, Black Phoebe, American Crow, Anna's Hummingbird, and Mourning Dove, followed by California Scrub-Jay, White-crowned Sparrow, California Towhee, Common Raven, and Lesser Goldfinch [8]. Anna's Hummingbird is present year-round — it is the fourth most-reported bird in the state — which is why California feeders can host hummingbirds in January [8].",
      ],
    },
    {
      heading: "When the birds in California change with the seasons",
      paragraphs: [
        "eBird's California records are heaviest in April, January, and December, and lightest in August and July [8]. Most of the familiar backyard birds are year-round residents, so the seasonal signal comes from the winter visitors: White-crowned Sparrow and Yellow-rumped Warbler are both among the eleven most-reported birds in the state, present from October through April and largely gone in summer [8].",
        "Summer brings the mountain and foothill breeders instead. Western Tanager and Mountain Chickadee are reported mainly from late spring into early fall [8], and Yosemite's exceptional bird diversity — 262 documented species — is explained by its extreme elevation gradient from 2,000 feet to more than 13,000 feet [7].",
        "For backyard birders this means two things: winter is the season to watch feeders for sparrows and warblers, and hummingbird feeders should stay up all year, because Anna's Hummingbirds do not leave.",
      ],
    },
    {
      heading: "Where to see birds in California",
      paragraphs: [
        "The four sites below span the coast, the Sierra Nevada, and the Colorado Desert; the first of them holds the greatest avian diversity of any U.S. national park [3].",
      ],
    },
    {
      heading: "Birds in California: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using California records from 2020 through 2024 [8]. A species' seasonal status is judged from its own monthly share of all California records. The state list total, the state bird, the endemic species, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Point Reyes National Seashore",
      blurb: "With nearly 490 species recorded — over 50% of the bird species in North America — Point Reyes claims the greatest avian diversity of any U.S. national park [3].",
      url: "https://www.nps.gov/pore/learn/nature/birds.htm",
    },
    {
      name: "Sonny Bono Salton Sea National Wildlife Refuge",
      blurb: "Established in 1930; over 400 species recorded and one of the most important nesting sites and stopovers along the Pacific Flyway [6].",
      url: "https://www.fws.gov/refuge/sonny-bono-salton-sea",
    },
    {
      name: "Yosemite National Park",
      blurb: "262 documented bird species across an elevation gradient from 2,000 feet to more than 13,000 feet [7].",
      url: "https://www.nps.gov/yose/learn/nature/birds.htm",
    },
    {
      name: "Channel Islands National Park",
      blurb: "Santa Cruz Island is the only place in the world to see the Island Scrub-Jay, North America's only island-endemic bird [4].",
      url: "https://www.nps.gov/chis/learn/nature/island-scrub-jay.htm",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in California?",
      answer: "The California Bird Records Committee's official checklist includes 696 species, 19 of which are established introductions and one of which has been extirpated within historical times [1].",
    },
    {
      question: "What is the state bird of California?",
      answer: "The California Quail, also known as the valley quail, became the official state bird in 1931 [2].",
    },
    {
      question: "Which birds are found only in California?",
      answer: "The Yellow-billed Magpie, which lives only in California in an area about 500 miles long and less than 150 miles wide [5], and the Island Scrub-Jay, found only on Santa Cruz Island in Channel Islands National Park [4].",
    },
    {
      question: "What are the most common backyard birds in California?",
      answer: "By eBird records, the most-reported birds in California are House Finch, Black Phoebe, American Crow, Anna's Hummingbird, and Mourning Dove, followed by California Scrub-Jay, White-crowned Sparrow, California Towhee, Common Raven, and Lesser Goldfinch [8].",
    },
  ],
  sources: [
    { id: 1, label: "California Bird Records Committee — Official California Checklist", url: "https://californiabirds.org/ca_list.asp" },
    { id: 2, label: "California State Library — State Symbols", url: "https://www.library.ca.gov/california-history/state-symbols/" },
    { id: 3, label: "National Park Service — Point Reyes National Seashore: Birds", url: "https://www.nps.gov/pore/learn/nature/birds.htm" },
    { id: 4, label: "National Park Service — Channel Islands: Island Scrub-Jay", url: "https://www.nps.gov/chis/learn/nature/island-scrub-jay.htm" },
    { id: 5, label: "Audubon Field Guide — Yellow-billed Magpie", url: "https://www.audubon.org/field-guide/bird/yellow-billed-magpie" },
    { id: 6, label: "U.S. Fish and Wildlife Service — Sonny Bono Salton Sea National Wildlife Refuge", url: "https://www.fws.gov/refuge/sonny-bono-salton-sea" },
    { id: 7, label: "National Park Service — Yosemite National Park: Birds", url: "https://www.nps.gov/yose/learn/nature/birds.htm" },
    { id: 8, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); California records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
