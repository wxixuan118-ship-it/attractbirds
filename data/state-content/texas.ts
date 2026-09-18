import type { StateContent } from "./types";

/** Texas state-page content. Every factual sentence carries a [n] citation into `sources`. */
export const texasContent: StateContent = {
  state: "texas",
  keyword: "birds in Texas",
  title: "Birds in Texas: Common Backyard Birds & Where to See Them",
  description:
    "Birds in Texas: the most-reported backyard species from 35 million eBird records, the state bird, a monthly calendar, and the coast and valley sites to visit.",
  hero: {
    src: "/images/states/texas-northern-mockingbird.webp",
    width: 1280,
    height: 853,
    alt: "Northern Mockingbird, the state bird of Texas and the second most-reported of all birds in Texas, at Falcon State Park",
    credit: "cricketsblog",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Northern_mockingbird_at_Falcon_State_Park,_Roma,_Texas.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
  },
  intro: [
    "Birds in Texas are a long list. The Texas Bird Records Committee's state list stood at 677 species as of August 2025 [1], because Texas reaches from Gulf Coast marshes to desert mountains and, in the Rio Grande Valley, to the northernmost outposts of tropical birds.",
    "This guide covers the birds you are most likely to see in a Houston, Dallas, Austin, or San Antonio backyard, how the mix changes through the year, and the places worth a trip. The species rankings and the monthly calendar on this page are computed from eBird observation records for Texas, not from a generic template [7].",
  ],
  sections: [
    {
      heading: "What makes birds in Texas different",
      paragraphs: [
        "Texas's state bird is the Mockingbird, designated by Senate Concurrent Resolution No. 8 of the 40th Legislature in 1927 [2]. It is not a token choice: on eBird the Northern Mockingbird is the second most-reported bird in the state, behind only the Northern Cardinal [7].",
        "The rest of the backyard cast blends East and Southwest. After the cardinal and mockingbird come Mourning Dove, Turkey Vulture, White-winged Dove, Great-tailed Grackle, Carolina Wren, Carolina Chickadee, Blue Jay, and Great Egret, with Black Vulture eleventh [7]. White-winged Doves and Great-tailed Grackles, both top-six birds here, are species most northern birders have never had in a yard [7].",
        "The Rio Grande Valley is where Texas becomes tropical. Santa Ana National Wildlife Refuge is positioned along an east–west and north–south juncture of two major migratory routes and is the northernmost point for many species whose range extends south into Central and South America — Green Jays, chachalacas, and Great Kiskadees among its residents [5].",
      ],
    },
    {
      heading: "When the birds in Texas change with the seasons",
      paragraphs: [
        "eBird's Texas records are heaviest in April, January, and May, and lightest in August and July [7]. Winter brings Yellow-rumped Warblers, House Wrens, and Dark-eyed Juncos, all reported mainly from late fall through March; the Ruby-throated Hummingbird, a summer bird farther north, passes through Texas chiefly in April and again from August to October [7].",
        "Spring on the upper coast is the famous part. At High Island, one mile from the Gulf of Mexico, volunteers host Houston Audubon's 60-acre Boy Scout Woods sanctuary daily from mid-March to early May, when birdwatchers from all over the world come to see the many species of migrating birds that come to drink and bathe [6].",
        "Winter on the central coast is the other pilgrimage: Aransas National Wildlife Refuge is best known as the wintering home of the last wild flock of endangered Whooping Cranes [3].",
      ],
    },
    {
      heading: "Where to see birds in Texas",
      paragraphs: [
        "The four sites below cover the Gulf Coast, the Rio Grande Valley, and the Big Bend; together they explain why the Texas list is as long as it is.",
      ],
    },
    {
      heading: "Birds in Texas: data and sources",
      paragraphs: [
        "Species rankings, seasonal status labels, and the monthly calendar on this page are derived from the eBird Observation Dataset published by the Cornell Lab of Ornithology and distributed through GBIF under a CC BY 4.0 license, using Texas records from 2020 through 2024 [7]. A species' seasonal status is judged from its own monthly share of all Texas records. The state list total, the state bird, and every site fact come from the primary sources listed below.",
      ],
    },
  ],
  spots: [
    {
      name: "Aransas National Wildlife Refuge",
      blurb: "More than 115,000 acres along the Texas Gulf Coast, established in 1937, and the wintering home of the last wild flock of endangered Whooping Cranes [3].",
      url: "https://www.fws.gov/refuge/aransas",
    },
    {
      name: "High Island (Boy Scout Woods)",
      blurb: "Houston Audubon's 60-acre sanctuary one mile from the Gulf; staffed daily from mid-March to early May for spring migration [6].",
      url: "https://birdshouston.org/conservation/sanctuaries/high-island/boy-scout-woods.html",
    },
    {
      name: "Santa Ana National Wildlife Refuge",
      blurb: "2,088 acres on the Rio Grande at the juncture of two major migratory routes; the northernmost point for many Central and South American species [5].",
      url: "https://www.fws.gov/refuge/santa-ana",
    },
    {
      name: "Big Bend National Park",
      blurb: "450 species reported in the park, of which only 56 live in Big Bend year-round [4].",
      url: "https://www.nps.gov/bibe/learn/nature/birds.htm",
    },
  ],
  faq: [
    {
      question: "How many bird species are there in Texas?",
      answer: "The Texas Bird Records Committee's state list stood at 677 species as of August 14, 2025 [1].",
    },
    {
      question: "What is the state bird of Texas?",
      answer: "The Mockingbird, designated by Senate Concurrent Resolution No. 8 of the 40th Legislature in 1927 [2]. It is the second most-reported bird in Texas on eBird [7].",
    },
    {
      question: "What is the best time of year to see birds in Texas?",
      answer: "Spring and winter. eBird records for Texas peak in April, January, and May and are lowest in July and August [7]; High Island's spring migration season runs from mid-March to early May [6], and Whooping Cranes winter at Aransas [3].",
    },
    {
      question: "What are the most common backyard birds in Texas?",
      answer: "By eBird records, the most-reported birds in Texas are Northern Cardinal, Northern Mockingbird, Mourning Dove, Turkey Vulture, and White-winged Dove, followed by Great-tailed Grackle, Carolina Wren, Carolina Chickadee, Blue Jay, and Great Egret [7].",
    },
  ],
  sources: [
    { id: 1, label: "Texas Bird Records Committee — Texas state list", url: "https://www.texasbirdrecordscommittee.org/" },
    { id: 2, label: "Texas State Library and Archives Commission — Texas State Symbols", url: "https://tsl.texas.gov/ref/abouttx/symbols" },
    { id: 3, label: "U.S. Fish and Wildlife Service — Aransas National Wildlife Refuge", url: "https://www.fws.gov/refuge/aransas" },
    { id: 4, label: "National Park Service — Big Bend National Park: Birds", url: "https://www.nps.gov/bibe/learn/nature/birds.htm" },
    { id: 5, label: "U.S. Fish and Wildlife Service — Santa Ana National Wildlife Refuge", url: "https://www.fws.gov/refuge/santa-ana" },
    { id: 6, label: "Houston Audubon — Boy Scout Woods, High Island", url: "https://birdshouston.org/conservation/sanctuaries/high-island/boy-scout-woods.html" },
    { id: 7, label: "EOD – eBird Observation Dataset, Cornell Lab of Ornithology, via GBIF.org (CC BY 4.0); Texas records 2020–2024", url: "https://www.gbif.org/dataset/4fa7b334-ce0d-4e88-aaae-2e0c138d049e" },
  ],
};
