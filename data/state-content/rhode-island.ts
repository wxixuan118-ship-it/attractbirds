import type { StateContent } from "./types";

/** Rhode Island state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const rhodeIslandContent: StateContent = {
  state: "rhode-island",
  keyword: "birds in Rhode Island",
  title: "Birds in Rhode Island: Backyard Birds & Where to See Them",
  description:
    "Birds in Rhode Island: the most-reported backyard species from 2.3 million eBird records, the coastal refuges and Block Island, and a monthly calendar.",
  hero: {
    src: "/images/states/rhode-island-harlequin-ducks.webp",
    width: 1280,
    height: 819,
    alt: "Harlequin Ducks at Sachuest Point National Wildlife Refuge in Middletown — among the most sought-after winter birds in Rhode Island",
    credit: "Andrew C",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Harlequin_Ducks_(Histrionicus_histrionicus)_(15461575474).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  intro: [
    "Birds in Rhode Island punch well above the state's size. The official state list maintained by the Rhode Island Avian Records Committee stood at 446 species as of July 2021, of which 175 have nested in the state [1]. The second Rhode Island breeding bird atlas, completed between 2015 and 2019 with over 200 volunteers, detected 173 species [3].",
    "This guide covers the birds you are most likely to see in a Providence, Warwick, or Newport backyard, how the mix changes through the year, and the refuges worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Rhode Island, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Rhode Island different",
      paragraphs: [
        "Rhode Island's state bird is not a wild bird at all. The Rhode Island Red, a breed of chicken, was adopted on May 3, 1954; Rhode Island Reds lay up to 300 brown eggs a year [2].",
        "The wild birds in Rhode Island backyards are classic southern New England. On eBird, the most-reported birds in Rhode Island are Song Sparrow, American Robin, Northern Cardinal, Black-capped Chickadee, and American Herring Gull, followed by Blue Jay, Carolina Wren, American Crow, Tufted Titmouse, and Mourning Dove, with American Goldfinch, Canada Goose, Gray Catbird, Red-winged Blackbird, and Downy Woodpecker completing the top fifteen [7]. A gull in the top five is the coastline talking.",
        "The coast is also where Rhode Island's special birds are. Sachuest Point National Wildlife Refuge in Middletown provides an important stopover and wintering area for migratory birds, including Harlequin Ducks, Piping Plovers, Saltmarsh Sparrows, and Snowy Owls [4], and Block Island lies in the Atlantic Flyway, where many young, inexperienced songbirds overfly the mainland and land on the island each fall [5].",
      ],
    },
    {
      heading: "When the birds in Rhode Island change with the seasons",
      paragraphs: [
        "eBird's Rhode Island records are heaviest in May, April, and June, and lightest in February and December [7]. Several top-fifteen birds are summer visitors: Gray Catbirds are reported mainly from May through October and Red-winged Blackbirds from February through July, while Ruby-throated Hummingbirds and House Wrens are present from May through September [7]. The Dark-eyed Junco is the winter counterpart, reported mainly from October through April [7].",
        "Fall is Block Island's season: the refuge there hosts a large concentration — over 70 species — of migratory songbirds which visit the area each fall [5]. Winter belongs to the rocky shore at Sachuest Point, a wintering area for migratory birds including the Harlequin Ducks in the photo above [4].",
        "For anyone feeding birds in Rhode Island this means hummingbird feeders from May to September, and a winter feeder season from October to April when juncos join the cardinals, chickadees, titmice, and Carolina Wrens that stay all year.",
      ],
    },
    {
      heading: "Where to see birds in Rhode Island",
      paragraphs: [
        "The three national wildlife refuges below are where to see the coastal birds in Rhode Island: the rocky shore of Aquidneck Island, the south-coast salt ponds, and Block Island.",
      ],
    },
    {
      heading: "Birds in Rhode Island: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Rhode Island records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Rhode Island records. The state list total is the Rhode Island Avian Records Committee figure as reported in the reference below; the state bird, the breeding atlas, and every refuge fact come from the primary sources listed.",
      ],
    },
  ],
  spots: [
    {
      name: "Sachuest Point National Wildlife Refuge",
      blurb: "A 242-acre refuge in Middletown of fields, shrublands, woodlands, ponds, and sandy beaches; an important stopover and wintering area for migratory birds including Harlequin Ducks [4].",
      url: "https://www.fws.gov/refuge/sachuest-point/about-us",
    },
    {
      name: "Ninigret National Wildlife Refuge",
      blurb: "858 acres of upland and wetland habitats on the largest coastal salt pond in Rhode Island, formerly part of Charlestown Naval Auxiliary Landing Field; over 250 species of birds recorded [6].",
      url: "https://www.fws.gov/refuge/ninigret/about-us",
    },
    {
      name: "Block Island National Wildlife Refuge",
      blurb: "134 acres established in 1973 on the Atlantic Flyway, with a large concentration of over 70 species of migratory songbirds each fall [5].",
      url: "https://www.fws.gov/refuge/block-island/about-us",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Rhode Island?",
      answer: "The Rhode Island Avian Records Committee's state list stood at 446 species as of July 2021, of which 175 have nested in the state [1]. The 2015–2019 breeding bird atlas detected 173 species [3].",
    },
    {
      question: "What is the state bird of Rhode Island?",
      answer: "The Rhode Island Red, a breed of domestic chicken, adopted on May 3, 1954 [2].",
    },
    {
      question: "What is the best time of year to see birds in Rhode Island?",
      answer: "Late spring for songbirds and fall for migration. eBird records for Rhode Island peak in May, April, and June [7], and Block Island hosts over 70 species of migratory songbirds each fall [5]. Winter is the season for Harlequin Ducks at Sachuest Point [4].",
    },
    {
      question: "What are the most common backyard birds in Rhode Island?",
      answer: "By eBird records, the most-reported birds in Rhode Island are Song Sparrow, American Robin, Northern Cardinal, Black-capped Chickadee, and American Herring Gull, followed by Blue Jay, Carolina Wren, American Crow, Tufted Titmouse, and Mourning Dove [7].",
    },
  ],
  sources: [
    { id: 1, label: "List of birds of Rhode Island (Wikipedia), reporting the Rhode Island Avian Records Committee state list as of July 2021", url: "https://en.wikipedia.org/wiki/List_of_birds_of_Rhode_Island" },
    { id: 2, label: "Rhode Island Secretary of State — State Symbols", url: "https://www.sos.ri.gov/divisions/civics-and-education/reference-desk/state-symbols" },
    { id: 3, label: "Rhode Island Department of Environmental Management — The Second Atlas of Breeding Birds in Rhode Island", url: "https://dem.ri.gov/natural-resources-bureau/fish-wildlife/reports-publications/bird-atlas-2" },
    { id: 4, label: "U.S. Fish and Wildlife Service — Sachuest Point National Wildlife Refuge: About Us", url: "https://www.fws.gov/refuge/sachuest-point/about-us" },
    { id: 5, label: "U.S. Fish and Wildlife Service — Block Island National Wildlife Refuge: About Us", url: "https://www.fws.gov/refuge/block-island/about-us" },
    { id: 6, label: "U.S. Fish and Wildlife Service — Ninigret National Wildlife Refuge: About Us", url: "https://www.fws.gov/refuge/ninigret/about-us" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Rhode Island records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
