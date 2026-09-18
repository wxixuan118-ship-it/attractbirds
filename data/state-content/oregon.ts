import type { StateContent } from "./types";

/** Oregon state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const oregonContent: StateContent = {
  state: "oregon",
  keyword: "birds in Oregon",
  title: "Birds in Oregon: Common Backyard Birds & Where to See Them",
  description:
    "Birds in Oregon: the most-reported backyard species from 17 million eBird records, the state songbird, a monthly calendar, and the refuges worth a trip.",
  hero: {
    src: "/images/states/oregon-western-meadowlark.webp",
    width: 1280,
    height: 914,
    alt: "Western Meadowlark, Oregon's state songbird and one of the classic grassland birds in Oregon, photographed by the Oregon Department of Fish and Wildlife",
    credit: "Kathy Munsel, Oregon Department of Fish and Wildlife",
    creditUrl: "https://commons.wikimedia.org/wiki/File:0298_meadowlark_munsel_ODFW_(4421085274).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
  },
  intro: [
    "Birds in Oregon come in three distinct sets: the rainforest and estuary birds of the coast, the backyard birds of the Willamette Valley where most Oregonians live, and the sagebrush and marsh birds of the high desert east of the Cascades. The Oregon Bird Records Committee's official checklist, dated September 2025, lists 550 species [1].",
    "This guide covers the birds you are most likely to see in a Portland, Salem, or Eugene backyard, how the mix changes through the year, and the refuges worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Oregon, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Oregon different",
      paragraphs: [
        "Oregon has two official birds. The Western Meadowlark was chosen as the state bird by the Oregon Audubon Society-sponsored schoolchildren's election of 1927, proclaimed by Governor Patterson that July, and the 2017 Legislature declared it the State Songbird; the same Legislature designated the Osprey as the state raptor, calling it a fitting symbol of Oregon's rugged independence, strength, and resilience [2].",
        "The backyard cast is Pacific Northwest through and through. On eBird, the most-reported birds in Oregon are American Robin, Song Sparrow, American Crow, Dark-eyed Junco, and Northern Flicker, followed by Spotted Towhee, Black-capped Chickadee, Mallard, California Scrub-Jay, and European Starling, with Anna's Hummingbird and Steller's Jay just behind [7]. Dark-eyed Juncos, a winter-only bird across most of the East, are year-round residents here and the fourth most-reported species in the state [7].",
        "Oregon also holds a piece of conservation history: Three Arch Rocks was established in October 1907 as the first National Wildlife Refuge west of the Mississippi River, and Lower Klamath — straddling the California line — was established by President Theodore Roosevelt in 1908 as the nation's first waterfowl refuge [4][6].",
      ],
    },
    {
      heading: "When the birds in Oregon change with the seasons",
      paragraphs: [
        "eBird's Oregon records are heaviest in May, April, and June, and lightest in February and November [7]. Most of the top backyard species are year-round residents, so the seasonal signal comes from summer breeders such as Western Tanager and House Wren, both reported mainly from May into September [7].",
        "The other seasonal show is waterfowl. Sauvie Island Wildlife Area, 20 minutes from downtown Portland, is best from September to March for viewing waterfowl and Sandhill Cranes [5], and Malheur National Wildlife Refuge in the southeastern high desert is a resting, breeding, and nesting area for hundreds of thousands of migratory birds on the Pacific Flyway [3].",
        "For backyard birders west of the Cascades this means a steady year-round cast — robins, juncos, chickadees, towhees, scrub-jays, Anna's Hummingbirds — with the mild, wet winters keeping feeders busy rather than empty.",
      ],
    },
    {
      heading: "Where to see birds in Oregon",
      paragraphs: [
        "The four sites below run from the Pacific seabird colonies to the high-desert marshes, and one of them is a short drive from Portland [5].",
      ],
    },
    {
      heading: "Birds in Oregon: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Oregon records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Oregon records. The state list total, the state birds, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Malheur National Wildlife Refuge",
      blurb: "Over 187,000 acres, established in 1908; disproportionately important as a stop along the Pacific Flyway and as a resting, breeding, and nesting area for hundreds of thousands of migratory birds [3].",
      url: "https://www.fws.gov/refuge/malheur",
    },
    {
      name: "Sauvie Island Wildlife Area",
      blurb: "11,643 acres 20 minutes from downtown Portland with at least 275 species of birds; September to March for waterfowl and Sandhill Cranes [5].",
      url: "https://myodfw.com/sauvie-island-wildlife-area-visitors-guide",
    },
    {
      name: "Three Arch Rocks National Wildlife Refuge",
      blurb: "The first National Wildlife Refuge west of the Mississippi (1907) and the largest and most diverse seabird colony in Oregon, historically with over 200,000 Common Murres in the breeding season [4].",
      url: "https://www.fws.gov/refuge/three-arch-rocks",
    },
    {
      name: "Lower Klamath National Wildlife Refuge",
      blurb: "Established by President Theodore Roosevelt in 1908 as the nation's first waterfowl refuge, straddling southern Oregon and northeastern California [6].",
      url: "https://www.fws.gov/refuge/lower-klamath",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Oregon?",
      answer: "The Oregon Bird Records Committee's official checklist of Oregon birds, dated September 2025, lists 550 species [1].",
    },
    {
      question: "What is the state bird of Oregon?",
      answer: "The Western Meadowlark, chosen in a 1927 schoolchildren's election and declared the State Songbird by the 2017 Legislature. The Osprey was designated the state raptor the same year [2].",
    },
    {
      question: "What is the best time of year to see birds in Oregon?",
      answer: "Late spring for songbirds and fall through winter for waterfowl. eBird records for Oregon peak in May, April, and June [7], while Sauvie Island is best from September to March for waterfowl and Sandhill Cranes [5].",
    },
    {
      question: "What are the most common backyard birds in Oregon?",
      answer: "By eBird records, the most-reported birds in Oregon are American Robin, Song Sparrow, American Crow, Dark-eyed Junco, and Northern Flicker, followed by Spotted Towhee, Black-capped Chickadee, Mallard, California Scrub-Jay, and European Starling [7].",
    },
  ],
  sources: [
    { id: 1, label: "Oregon Bird Records Committee — Checklist of Oregon Birds (September 2025, PDF)", url: "https://oregonbirding.org/wp-content/uploads/2025/09/one-page-checklist-2025Sep.pdf" },
    { id: 2, label: "Oregon Blue Book (Secretary of State) — Oregon Almanac: state bird and state raptor", url: "https://sos.oregon.gov/blue-book/explore/pages/almanac-a-c.aspx" },
    { id: 3, label: "U.S. Fish and Wildlife Service — Malheur National Wildlife Refuge", url: "https://www.fws.gov/refuge/malheur" },
    { id: 4, label: "U.S. Fish and Wildlife Service — Three Arch Rocks National Wildlife Refuge", url: "https://www.fws.gov/refuge/three-arch-rocks" },
    { id: 5, label: "Oregon Department of Fish and Wildlife — Sauvie Island Wildlife Area Visitors Guide", url: "https://myodfw.com/sauvie-island-wildlife-area-visitors-guide" },
    { id: 6, label: "U.S. Fish and Wildlife Service — Lower Klamath National Wildlife Refuge", url: "https://www.fws.gov/refuge/lower-klamath" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Oregon records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
