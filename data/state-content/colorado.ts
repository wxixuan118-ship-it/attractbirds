import type { StateContent } from "./types";

/** Colorado state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const coloradoContent: StateContent = {
  state: "colorado",
  keyword: "birds in Colorado",
  title: "Birds in Colorado: Common Backyard Birds & Where to See Them",
  description:
    "Birds in Colorado: the most-reported backyard, plains, and mountain species from 16 million eBird records, a monthly calendar, and where to see them.",
  hero: {
    src: "/images/states/colorado-lark-bunting.webp",
    width: 1280,
    height: 853,
    alt: "Male Lark Bunting, the state bird of Colorado, on the Pawnee National Grassland — one of the signature summer birds in Colorado",
    credit: "Bettina Arrigoni",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Lark_Bunting_(male)_Pawnee_National_Grasslands_CO_2018-06-06_18-12-23_(47069651944).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  intro: [
    "Birds in Colorado change with altitude as much as with the calendar. The state list maintained by the Colorado Bird Records Committee stands at 522 species [1], spread from the shortgrass prairie of the eastern plains, through the Front Range foothills where most people live, to alpine tundra above the tree line.",
    "This guide covers the birds you are most likely to see in a Denver or Colorado Springs backyard, how the mix changes through the year, and the places worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Colorado, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Colorado different",
      paragraphs: [
        "Colorado's state bird is the Lark Bunting, adopted on April 29, 1931 by House Bill 222. The male is black with snowy white wing patches, performs a spectacular courtship flight while warbling and trilling a distinctive mating song, and changes to a gray-brown like the female in winter. Flocks arrive in April, inhabit the plains and areas up to 8,000 feet in elevation, and fly south again in September [2].",
        "The backyard cast is a mix of East and West. On eBird, the most-reported birds in Colorado are American Robin, House Finch, Northern Flicker, Mallard, and Black-capped Chickadee, followed by Red-winged Blackbird, Canada Goose, Black-billed Magpie, American Crow, and Red-tailed Hawk; Blue Jay ranks fourteenth and Mountain Chickadee twenty-sixth [7]. The Black-billed Magpie, a rarity people search for in eastern states, is simply an everyday yard bird here — the eighth most-reported bird in the state [7].",
        "Rocky Mountain National Park shows the altitude effect in one place: over 270 species have been reported there over the last 100 years, many of them unique to mountainous habitats — aspen, ponderosa pine, high-elevation willow, spruce, fir, and alpine tundra [3].",
      ],
    },
    {
      heading: "When the birds in Colorado change with the seasons",
      paragraphs: [
        "Unlike the southern states, Colorado's bird year peaks in summer. eBird's Colorado records are heaviest in May, April, and June, and lightest in December and February [7]. Mourning Doves and House Wrens are summer birds here rather than year-round residents, reported mainly from spring through early fall, and Western Tanagers are present from May through September [7].",
        "Winter has its own visitor: the Dark-eyed Junco is the fifteenth most-reported bird in Colorado and is reported mainly from October through March [7]. Northern Mockingbirds, common across the South, are an uncommon summer bird here, reported chiefly from May through July [7].",
        "For backyard birders this means summer is the busy season at feeders and birdbaths, while winter feeding is about the hardy residents — chickadees, finches, flickers, magpies — plus juncos.",
      ],
    },
    {
      heading: "Where to see birds in Colorado",
      paragraphs: [
        "The four sites below run from the shortgrass prairie to the tundra, and one of them is ten miles from downtown Denver [5].",
      ],
    },
    {
      heading: "Birds in Colorado: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Colorado records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Colorado records. The state list total, the state bird, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Rocky Mountain National Park",
      blurb: "Over 270 species reported over the last 100 years, many unique to mountainous habitats from aspen and ponderosa pine up to alpine tundra [3].",
      url: "https://www.nps.gov/romo/learn/nature/birds.htm",
    },
    {
      name: "Pawnee National Grassland",
      blurb: "193,060 acres of shortgrass prairie where over 200 species can be found; Crow Valley Recreation Area is a very popular site with bird enthusiasts [4], and a 21-mile self-guided bird tour passes through a variety of bird habitats [6].",
      url: "https://www.fs.usda.gov/r02/arp/recreation/pawnee-national-grassland",
    },
    {
      name: "Rocky Mountain Arsenal National Wildlife Refuge",
      blurb: "A 15,000-acre refuge just 10 miles northeast of downtown Denver, established in 2004 in part to protect the bald eagle; bison, raptors, songbirds, and waterfowl [5].",
      url: "https://www.fws.gov/refuge/rocky-mountain-arsenal",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Colorado?",
      answer: "The Colorado Bird Records Committee's state list stands at 522 species [1].",
    },
    {
      question: "What is the state bird of Colorado?",
      answer: "The Lark Bunting (Calamospiza melanocorys), adopted April 29, 1931. Flocks arrive in April and fly south again in September [2].",
    },
    {
      question: "What is the best time of year to see birds in Colorado?",
      answer: "Late spring and early summer. eBird records for Colorado peak in May, April, and June and are lowest in December and February [7], and the state bird itself is present only from April to September [2].",
    },
    {
      question: "What are the most common backyard birds in Colorado?",
      answer: "By eBird records, the most-reported birds in Colorado are American Robin, House Finch, Northern Flicker, Mallard, and Black-capped Chickadee, followed by Red-winged Blackbird, Canada Goose, Black-billed Magpie, American Crow, and Red-tailed Hawk [7].",
    },
  ],
  sources: [
    { id: 1, label: "Colorado Bird Records Committee — Colorado state list", url: "https://cobrc.org/" },
    { id: 2, label: "Colorado State Archives — Symbols & Emblems: Lark Bunting", url: "https://archives.colorado.gov/collections/symbols-emblems" },
    { id: 3, label: "National Park Service — Rocky Mountain National Park: Birds", url: "https://www.nps.gov/romo/learn/nature/birds.htm" },
    { id: 4, label: "USDA Forest Service — Pawnee National Grassland", url: "https://www.fs.usda.gov/r02/arp/recreation/pawnee-national-grassland" },
    { id: 5, label: "U.S. Fish and Wildlife Service — Rocky Mountain Arsenal National Wildlife Refuge", url: "https://www.fws.gov/refuge/rocky-mountain-arsenal" },
    { id: 6, label: "USDA Forest Service — Pawnee National Grassland Bird Tour", url: "https://www.fs.usda.gov/r02/arp/recreation/pawnee-bird-tour" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Colorado records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
