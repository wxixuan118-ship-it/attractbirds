import type { StateContent } from "./types";

/** Arizona state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const arizonaContent: StateContent = {
  state: "arizona",
  keyword: "birds in Arizona",
  title: "Birds in Arizona: Common Backyard Birds & Where to See Them",
  description:
    "Birds in Arizona: the most-reported desert and backyard species from 20 million eBird records, a month-by-month calendar, and the canyons worth a trip.",
  hero: {
    src: "/images/states/arizona-cactus-wren.webp",
    width: 1280,
    height: 853,
    alt: "Cactus Wren, the state bird of Arizona and one of the signature birds in Arizona's Sonoran Desert",
    credit: "lwolfartist",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Cactus_wren_Arizona-Sonora_Desert_Museum_4.14.22_DSC_5312.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  intro: [
    "Birds in Arizona draw birders from across the country. The Arizona Bird Committee's official list contains 570 species accepted as of January 2024 [1], and the southeastern canyons hold hummingbirds, trogons, and other birds that reach the United States only here.",
    "This guide covers the birds you are most likely to see in a Phoenix or Tucson backyard, how the desert's bird year runs, and the four places worth a dedicated trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Arizona, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Arizona different",
      paragraphs: [
        "Arizona's state bird is the Cactus Wren, brown with a speckled chest, a white line over each eye, and about 7 to 8 inches long — a little bigger than a new pencil [2].",
        "The everyday backyard birds of the Sonoran Desert are their own cast. On eBird, the five most-reported birds in Arizona are Mourning Dove, House Finch, Gila Woodpecker, Lesser Goldfinch, and Verdin, with Anna's Hummingbird, Curve-billed Thrasher, Abert's Towhee, and Gambel's Quail all inside the top twelve [7]. Anyone arriving from the East will find the Northern Cardinal down at sixteenth and the American Robin at forty-fourth [7].",
        "The Gila Woodpecker is the architect of the desert: it makes nest cavities in the sides of saguaros, between the skin and the inner ribs of the cactus, and its abandoned holes become nests for Elf Owls, kestrels, and Purple Martins [5]. The Elf Owl, the world's smallest owl, migrates to southern Mexico before the end of October and returns to the Sonoran Desert by March to breed [5].",
      ],
    },
    {
      heading: "When the birds in Arizona change with the seasons",
      paragraphs: [
        "eBird's Arizona records are heaviest in April, May, and March, and lightest in July and June — the desert's birding season is spring, not summer [7]. Winter is the second season: White-crowned Sparrows and Yellow-rumped Warblers are among the most-reported birds in the state from October through April and are essentially absent in summer, while White-winged Doves arrive in March and are gone by September [7].",
        "In Madera Canyon, May is commonly the peak of migration, and spring is the best time to find the Elegant Trogon [3]. Hummingbird diversity is the state's other headline: the canyon alone hosts 15 hummingbird species [3], and Ramsey Canyon serves as a migratory corridor and critical nesting habitat for a myriad of species of birds, including hummingbirds [6].",
        "For backyard birders this means keeping water available year-round — it matters more than seed in the desert — and expecting the richest mix of feeder visitors from October through April, when the wintering sparrows and warblers join the resident finches, doves, and thrashers.",
      ],
    },
    {
      heading: "Where to see birds in Arizona",
      paragraphs: [
        "Southeastern Arizona's sky-island canyons and the San Pedro River are the state's birding heartland; the four sites below cover a desert national park, a riparian corridor, and two mountain canyons.",
      ],
    },
    {
      heading: "Birds in Arizona: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Arizona records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Arizona records. The state list total, the state bird, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Madera Canyon",
      blurb: "A world-class birding destination hosting over 250 species, including the Elegant Trogon and 15 hummingbird species [3].",
      url: "https://friendsofmaderacanyon.org/birding/",
    },
    {
      name: "San Pedro Riparian National Conservation Area",
      blurb: "Almost 57,000 acres along 40 miles of the upper San Pedro River; 100 species of breeding birds call the river home and it provides habitat for 250 species of migrant and wintering birds [4].",
      url: "https://www.blm.gov/national-conservation-lands/arizona/san-pedro",
    },
    {
      name: "Saguaro National Park",
      blurb: "Sonoran Desert birds seen in few other places in the United States, including Gila Woodpeckers nesting inside saguaros and Elf Owls using their old cavities [5].",
      url: "https://www.nps.gov/sagu/learn/nature/birds.htm",
    },
    {
      name: "Ramsey Canyon Preserve",
      blurb: "Nature Conservancy preserve in the Huachuca Mountains; a migratory corridor and critical nesting habitat for hummingbirds including Rivoli's and Anna's [6].",
      url: "https://www.nature.org/en-us/get-involved/how-to-help/places-we-protect/ramsey-canyon-preserve/",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Arizona?",
      answer: "The Arizona Bird Committee's state list contains 570 species accepted as of January 2024, including 7 introduced species [1].",
    },
    {
      question: "What is the state bird of Arizona?",
      answer: "The Cactus Wren (Campylorhynchus brunneicapillus), a brown bird with a speckled chest and white lines over each eye, about 7 to 8 inches long [2].",
    },
    {
      question: "What is the best time of year to see birds in Arizona?",
      answer: "Spring. eBird records for Arizona peak in March, April, and May and are lowest in June and July [7]; in Madera Canyon, May is commonly the peak of migration [3]. Winter is the second-best season, when White-crowned Sparrows and Yellow-rumped Warblers are among the most-reported birds in the state [7].",
    },
    {
      question: "What are the most common backyard birds in Arizona?",
      answer: "By eBird records, the most-reported birds in Arizona are Mourning Dove, House Finch, Gila Woodpecker, Lesser Goldfinch, and Verdin, followed by Common Raven, White-winged Dove, Anna's Hummingbird, Curve-billed Thrasher, and Abert's Towhee [7].",
    },
  ],
  sources: [
    { id: 1, label: "Arizona Bird Committee — Arizona State List (January 2024)", url: "https://arizonabirdcommittee.org/ABC/lists/state_list_2024.html" },
    { id: 2, label: "Arizona State Library — State Bird", url: "https://azlibrary.gov/state-bird/7089" },
    { id: 3, label: "Friends of Madera Canyon — Birding", url: "https://friendsofmaderacanyon.org/birding/" },
    { id: 4, label: "Bureau of Land Management — San Pedro Riparian National Conservation Area", url: "https://www.blm.gov/national-conservation-lands/arizona/san-pedro" },
    { id: 5, label: "National Park Service — Saguaro National Park: Birds", url: "https://www.nps.gov/sagu/learn/nature/birds.htm" },
    { id: 6, label: "The Nature Conservancy — Ramsey Canyon Preserve", url: "https://www.nature.org/en-us/get-involved/how-to-help/places-we-protect/ramsey-canyon-preserve/" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Arizona records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
