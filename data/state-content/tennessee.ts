import type { StateContent } from "./types";

/** Tennessee state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const tennesseeContent: StateContent = {
  state: "tennessee",
  keyword: "birds in Tennessee",
  title: "Birds in Tennessee: Common Backyard Birds & Best Spots",
  description:
    "Birds in Tennessee: the most-reported backyard species from 8.7 million eBird records, the state bird, a monthly calendar, and where to see them.",
  hero: {
    src: "/images/states/tennessee-northern-mockingbird.webp",
    width: 1280,
    height: 960,
    alt: "Northern Mockingbird, the state bird of Tennessee and one of the ten most-reported birds in Tennessee, in Concord Park, Knoxville",
    credit: "David Ratledge",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Northern_Mockingbird_(Mimus_polyglottos)_-_Knoxville,_TN.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
  },
  intro: [
    "Birds in Tennessee change from the Mississippi bottomlands in the west to the Smokies in the east. The Official List of the Birds of Tennessee, updated December 2024, includes 434 species recorded in the state [1].",
    "This guide covers the birds you are most likely to see in a Nashville, Memphis, or Knoxville backyard, how the mix changes through the year, and the places worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Tennessee, not from a generic template [8].",
  ],
  sections: [
    {
      heading: "What makes birds in Tennessee different",
      paragraphs: [
        "Tennessee's state bird is the Mockingbird, selected as the official state bird in 1933; it is ashen gray above with darker, white-edged wings, about 10 inches long including the tail, and one of the finest singers among North American birds, noted for its skill in mimicking the songs of other birds. The Bobwhite Quail has been the official state game bird since 1987 [2].",
        "The backyard cast is classic eastern woodland. On eBird, the most-reported birds in Tennessee are Northern Cardinal, Carolina Wren, Carolina Chickadee, American Crow, and Blue Jay, followed by Tufted Titmouse, American Robin, Mourning Dove, Red-bellied Woodpecker, and Northern Mockingbird; Eastern Bluebird ranks twelfth [8]. Note that the chickadee here is the Carolina Chickadee; the Black-capped Chickadee is a rare bird in Tennessee [8], found at high elevation in the Smokies [3].",
        "Those high elevations are the state's special habitat. Great Smoky Mountains National Park has more than 240 documented bird species; approximately 60 live in the park year-round while nearly 120 nest there in the warmer months, and Kuwohi Road is known for high-elevation species such as the Canada Warbler and Black-capped Chickadee [3].",
      ],
    },
    {
      heading: "When the birds in Tennessee change with the seasons",
      paragraphs: [
        "eBird's Tennessee records are heaviest in May, April, and March, and lightest in July and August [8]. The year-round residents dominate the top of the list, so the seasonal signal comes from two groups: winter visitors such as Yellow-rumped Warbler and Dark-eyed Junco, reported mainly from late fall through early spring, and summer breeders such as Ruby-throated Hummingbird, present from May through September [8].",
        "West Tennessee adds a wintering spectacle. Reelfoot Lake, born from the New Madrid earthquakes of 1811 and 1812 and the only large naturally occurring lake in Tennessee, is where visitors go to observe American Bald Eagles [4], and the national wildlife refuge on its upper third is a wintering ground for migratory waterfowl and bald eagles [5].",
        "For backyard birders this means hummingbird feeders from May to September, and a winter feeder season from November to March when juncos and Yellow-rumped Warblers join the cardinals, wrens, chickadees, and titmice that never leave.",
      ],
    },
    {
      heading: "Where to see birds in Tennessee",
      paragraphs: [
        "The four sites below run from the Mississippi bottomlands to the Smokies, and one of them sits inside Nashville's city limits [6].",
      ],
    },
    {
      heading: "Birds in Tennessee: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Tennessee records from 2020 through 2024 [8]. A species' seasonal status is judged from its own monthly share of all Tennessee records. The state list total, the state birds, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Great Smoky Mountains National Park",
      blurb: "More than 240 documented species; about 60 live in the park year-round and nearly 120 nest there in the warmer months, with high-elevation specialties along Kuwohi Road [3].",
      url: "https://www.nps.gov/grsm/learn/nature/birds.htm",
    },
    {
      name: "Reelfoot Lake",
      blurb: "The only large naturally occurring lake in Tennessee, created by the New Madrid earthquakes of 1811–1812; a wintering ground for waterfowl and bald eagles [4][5].",
      url: "https://tnstateparks.com/parks/reelfoot-lake",
    },
    {
      name: "Radnor Lake State Park",
      blurb: "1,389 acres and a Class II Natural Area nestled in the heart of Nashville [6].",
      url: "https://tnstateparks.com/parks/radnor-lake",
    },
    {
      name: "Hatchie National Wildlife Refuge",
      blurb: "11,556 acres in west Tennessee, including approximately 9,764 acres of bottomland hardwood forest, supplying critical habitat for wintering waterfowl and other migratory birds [7].",
      url: "https://www.fws.gov/refuge/hatchie",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Tennessee?",
      answer: "The Official List of the Birds of Tennessee, updated December 2024, includes 434 species recorded in the state [1].",
    },
    {
      question: "What is the state bird of Tennessee?",
      answer: "The Mockingbird (Mimus polyglottos), selected as the official state bird in 1933. The Bobwhite Quail is the official state game bird (1987) [2].",
    },
    {
      question: "What is the best time of year to see birds in Tennessee?",
      answer: "Spring. eBird records for Tennessee peak in March, April, and May and are lowest in July and August [8]. Winter is the season for bald eagles and waterfowl at Reelfoot Lake [5].",
    },
    {
      question: "What are the most common backyard birds in Tennessee?",
      answer: "By eBird records, the most-reported birds in Tennessee are Northern Cardinal, Carolina Wren, Carolina Chickadee, American Crow, and Blue Jay, followed by Tufted Titmouse, American Robin, Mourning Dove, Red-bellied Woodpecker, and Northern Mockingbird [8].",
    },
  ],
  sources: [
    { id: 1, label: "Tennessee Ornithological Society — Official List of the Birds of Tennessee (December 2024, PDF)", url: "https://tnbirds.org/wp-content/uploads/2024/12/UPDATED-_OFFICIAL-LIST-OF-THE-BIRDS-OF-TENNESSEE-Dec2024.pdf" },
    { id: 2, label: "TN.gov — Tennessee State Symbols", url: "https://www.tn.gov/about-tn/state-symbols.html" },
    { id: 3, label: "National Park Service — Great Smoky Mountains National Park: Birds", url: "https://www.nps.gov/grsm/learn/nature/birds.htm" },
    { id: 4, label: "Tennessee State Parks — Reelfoot Lake State Park", url: "https://tnstateparks.com/parks/reelfoot-lake" },
    { id: 5, label: "U.S. Fish and Wildlife Service — Reelfoot National Wildlife Refuge", url: "https://www.fws.gov/refuge/reelfoot" },
    { id: 6, label: "Tennessee State Parks — Radnor Lake State Park", url: "https://tnstateparks.com/parks/radnor-lake" },
    { id: 7, label: "U.S. Fish and Wildlife Service — Hatchie National Wildlife Refuge", url: "https://www.fws.gov/refuge/hatchie" },
    { id: 8, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Tennessee records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
