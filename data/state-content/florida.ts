import type { StateContent } from "./types";

/**
 * Florida state-page editorial content.
 *
 * Every factual claim below carries a [n] citation into `sources`. Figures
 * about which species are reported most, and when, come from the eBird
 * occurrence data in data/occurrences/florida.json and are rendered by the
 * page from that file — they are not restated here so they can never drift.
 */
export const floridaContent: StateContent = {
  state: "florida",
  keyword: "birds in Florida",
  title: "Birds in Florida: Common Backyard Birds & Where to See Them",
  description:
    "Birds in Florida: the most-reported backyard and wading birds from 32 million eBird records, a month-by-month calendar, and the best places to see them.",
  hero: {
    src: "/images/states/florida-northern-mockingbird.webp",
    width: 1280,
    height: 853,
    alt: "Northern Mockingbird, the state bird of Florida and one of the most-reported birds in Florida, perched at Loxahatchee National Wildlife Refuge",
    credit: "Korall",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Northern_Mockingbird,_Loxahatchee.JPG",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
  },
  intro: [
    "Birds in Florida are unusually varied. The official state checklist stands at 545 extant species [1], and because Florida sits at the southern end of the Atlantic Flyway, it hosts migrants stopping over on their way south as well as year-round residents — one of which lives nowhere else on Earth [2].",
    "This guide covers the birds you are most likely to meet in a Florida backyard, how the mix changes through the year, and where to go when you want more than the feeder can offer. The species rankings and the monthly calendar on this page are computed from eBird observation records for Florida, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Florida different",
      paragraphs: [
        "Start with the sheer size of the list. The Florida Ornithological Society's official checklist runs to 559 taxa, of which nine are subspecies, four are extinct, and one is a disestablished exotic, leaving 545 extant species; 17 of those are established exotics that now breed in the wild [1].",
        "Florida's state bird is the Northern Mockingbird, designated by Senate Concurrent Resolution No. 3 of the 1927 legislative session; it is a year-round Florida resident known for its fierce defense of the family nest [3]. It is also the fourth most-reported bird in the state on eBird, behind only the Northern Cardinal, Red-bellied Woodpecker, and Mourning Dove [7].",
        "The Florida Scrub-Jay is the only species of bird that is endemic to Florida, and it is listed as Threatened under the federal Endangered Species Act [4]. It inhabits sand pine and xeric oak scrub and scrubby flatwoods in some of the highest and driest parts of the state, habitat that degrades when fire is suppressed, and its population has declined 90% in the past century [4] — so you will not find it in a typical suburban yard, but it is a reason many visiting birders plan a trip here.",
        "What surprises people arriving from northern states is how much of the everyday birdlife is wading birds. Sixteen different species of wading birds live in the Everglades alone [5], and on eBird the White Ibis and Great Egret rank among the ten most-reported birds statewide — ahead of familiar backyard species like the Carolina Wren and Tufted Titmouse [7]. In much of Florida, an ibis walking across the lawn is as ordinary as a robin is in Ohio.",
      ],
    },
    {
      heading: "When the birds in Florida change with the seasons",
      paragraphs: [
        "Florida's bird year runs opposite to the northern intuition of \"summer is bird season.\" eBird's Florida records are heaviest in January, February, and April, and lightest in July and August [7]. Winter brings warblers, robins, catbirds, and phoebes that breed far to the north; spring sends them back and brings in the breeders; summer is the quiet season, dominated by the year-round residents and the wading-bird colonies.",
        "Spring migration is the spectacle. At Dry Tortugas National Park, migration increases substantially during March and peaks during April through mid-May, with more than 200 species passing through the area [6].",
        "For backyard birders this means two practical things: keep feeders and water going through the winter, when the greatest variety of songbirds is present, and expect a lull from June through August when many yards hold little beyond cardinals, mockingbirds, doves, and woodpeckers.",
      ],
    },
    {
      heading: "Where to see birds in Florida",
      paragraphs: [
        "The Great Florida Birding and Wildlife Trail, a program of the Florida Fish and Wildlife Conservation Commission, is a network of more than 500 wildlife viewing sites across the state, divided into four regions: East, West, Panhandle, and South [8]. It is the best starting point for finding a site near you; the four spots below are the ones most worth a dedicated trip.",
      ],
    },
    {
      heading: "Birds in Florida: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Florida records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Florida records, so a bird reported at a steady rate all year is labelled year-round even if it is uncommon. State list totals, the state bird, refuge and park facts, and the birding trail description come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Everglades National Park",
      blurb: "More than 360 different species of birds have been sighted in the park, including sixteen species of wading birds [5].",
      url: "https://www.nps.gov/ever/learn/nature/birds.htm",
    },
    {
      name: "Merritt Island National Wildlife Refuge",
      blurb: "140,000 acres of coastal dunes, saltwater marshes, managed impoundments, scrub, pine flatwoods, and hardwood hammocks, established as an overlay of NASA's Kennedy Space Center [9].",
      url: "https://www.fws.gov/refuge/merritt-island",
    },
    {
      name: "Dry Tortugas National Park",
      blurb: "Almost 70 miles west of Key West; a bird list of 299 species, and masses of Sooty Terns nesting on Bush Key from late January through early July [6][10].",
      url: "https://www.nps.gov/drto/learn/nature/birds.htm",
    },
    {
      name: "Corkscrew Swamp Sanctuary",
      blurb: "Audubon sanctuary protecting the largest remaining old-growth bald cypress forest in the world, home to species from the Wood Stork down [11].",
      url: "https://www.audubon.org/corkscrew",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Florida?",
      answer:
        "The Florida Ornithological Society's official state list contains 559 taxa, of which 545 are extant species; 17 of those are established exotics [1].",
    },
    {
      question: "What is the state bird of Florida?",
      answer:
        "The Northern Mockingbird. Senate Concurrent Resolution No. 3 of the 1927 legislative session designated the mockingbird as the state bird, and it is a year-round Florida resident [3].",
    },
    {
      question: "What is the best time of year to see birds in Florida?",
      answer:
        "Winter and spring. eBird records for Florida peak in January, February, and April and are lowest in July and August [7]; spring migration at Dry Tortugas peaks from April through mid-May, with more than 200 species passing through [6].",
    },
    {
      question: "Which bird is found only in Florida?",
      answer:
        "The Florida Scrub-Jay is the only species of bird that is endemic to Florida. It is federally listed as Threatened [4].",
    },
  ],
  sources: [
    { id: 1, label: "Florida Ornithological Society — FOS Bird Checklist (official state list)", url: "https://fosbirds.org/fos-bird-checklist/" },
    { id: 2, label: "Florida Fish and Wildlife Conservation Commission — Birds (Florida's Wildlife Conservation Guide)", url: "https://myfwc.com/conservation/value/fwcg/wildlife/birds/" },
    { id: 3, label: "Florida Department of State — State Bird", url: "https://dos.fl.gov/florida-facts/florida-state-symbols/state-bird/" },
    { id: 4, label: "Florida Fish and Wildlife Conservation Commission — Florida Scrub-Jay species profile", url: "https://myfwc.com/wildlifehabitats/profiles/birds/songbirds/florida-scrub-jay/" },
    { id: 5, label: "National Park Service — Everglades National Park: Birds", url: "https://www.nps.gov/ever/learn/nature/birds.htm" },
    { id: 6, label: "National Park Service — Dry Tortugas National Park: Birds", url: "https://www.nps.gov/drto/learn/nature/birds.htm" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Florida records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
    { id: 8, label: "Great Florida Birding and Wildlife Trail — About", url: "https://floridabirdingtrail.com/about/" },
    { id: 9, label: "U.S. Fish and Wildlife Service — Merritt Island National Wildlife Refuge", url: "https://www.fws.gov/refuge/merritt-island" },
    { id: 10, label: "National Park Service — Dry Tortugas National Park", url: "https://www.nps.gov/drto/index.htm" },
    { id: 11, label: "Audubon — Corkscrew Swamp Sanctuary", url: "https://www.audubon.org/corkscrew" },
  ],
};
