import type { EditorialContent, EditorialImage } from "./types";
import topicImages from "../topic-images.json";
import groupImages from "../group-images.json";

type Img = { src: string; width: number; height: number; credit: string; creditUrl: string; license: string; licenseUrl: string };
const TOPIC = topicImages as Record<string, Img>;
const BIRD = groupImages as Record<string, Img & { species: string }>;
const timg = (key: string, alt: string): EditorialImage | undefined => { const m = TOPIC[key]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };
const bimg = (slug: string, alt: string): EditorialImage | undefined => { const m = BIRD[slug]; return m ? { src: m.src, width: m.width, height: m.height, alt, credit: m.credit, creditUrl: m.creditUrl, license: m.license, licenseUrl: m.licenseUrl } : undefined; };

/**
 * Sources. Plant facts come from the Lady Bird Johnson Wildflower Center's
 * Native Plant Database (University of Texas at Austin), one record per
 * species, keyed by USDA PLANTS symbol; native-plant rationale from Audubon;
 * bird diet and backyard tips from All About Birds; feeder facts from
 * Project FeederWatch.
 */
const wf = (id: number, sci: string, sym: string) => ({ id, label: `Lady Bird Johnson Wildflower Center, Native Plant Database — ${sci} (USDA symbol ${sym})`, url: `https://www.wildflower.org/plants/result.php?id_plant=${sym}` });
const AUDUBON = (id: number) => ({ id, label: "National Audubon Society — Why Native Plants Matter", url: "https://www.audubon.org/content/why-native-plants-matter" });
const aab = (id: number, slug: string, name: string) => ({ id, label: `All About Birds (Cornell Lab of Ornithology) — ${name}: Overview and Life History`, url: `https://www.allaboutbirds.org/guide/${slug}/overview` });
const FW = (id: number) => ({ id, label: "Project FeederWatch (Cornell Lab of Ornithology) — Feeding Birds", url: "https://feederwatch.org/learn/feeding-birds/" });

/** Shared, cited paragraphs. [W] = Wildflower record id, [A] = Audubon id. */
const whyNative = (A: number) => `Native plants are those that occur naturally in the region where they evolved, and Audubon calls them the ecological basis on which birds depend: without them and the insects that co-evolved with them, local birds cannot survive [${A}]. The scale matters — a native oak supports over 500 species of caterpillars where a ginkgo hosts five, and it takes more than 6,000 caterpillars to raise one brood of chickadees [${A}]. Most nursery landscaping plants are alien species, so choosing natives is the single landscaping decision with the clearest effect on bird populations [${A}].`;
const lawnNote = (A: number) => `The alternative is what most yards already have. Audubon notes that manicured lawn now covers over 40 million acres of the United States as a green monoculture, that the traditional suburban lawn carries on average ten times more chemical pesticide per acre than farmland, and that the continental U.S. has lost 150 million acres of habitat and farmland to sprawl [${A}]. Every bed of natives that replaces turf is habitat that lawn cannot be, and long-lived native trees such as oaks and maples also store carbon [${A}].`;
const nativeCheck = (W: number, A: number) => `Check the native range before buying: the Wildflower Center record for this species lists the states and provinces where it occurs naturally [${W}], and Audubon's zip-code native plant database narrows that to your area and the bird groups each plant attracts [${A}]. Once established, native plants generally need little maintenance and far less water than lawn, and they do not need the pesticides that make a yard poor bird habitat [${A}].`;

type PlantSpec = { slug: string; keyword: string; sci: string; sym: string; title: string; description: string; imageKey?: string; alt: string; intro: string[]; sections: { heading: string; paragraphs: string[] }[]; faq: { question: string; answer: string }[]; extraSources?: { id: number; label: string; url: string }[] };

function plant(p: PlantSpec): EditorialContent {
  return {
    path: `/plants/${p.slug}`,
    keyword: p.keyword,
    title: p.title,
    description: p.description,
    image: timg(p.imageKey ?? p.slug, p.alt),
    intro: p.intro,
    sections: [...p.sections, { heading: "Planting it for birds: native range and care", paragraphs: [nativeCheck(1, 2), whyNative(2)] }],
    faq: p.faq,
    sources: [wf(1, p.sci, p.sym), AUDUBON(2), ...(p.extraSources ?? [])],
  };
}

export const plantEditorial: Record<string, EditorialContent> = {};

const SPECIES: PlantSpec[] = [
  {
    slug: "cardinal-flower", keyword: "cardinal flower", sci: "Lobelia cardinalis", sym: "LOCA2",
    title: "Cardinal Flower for Hummingbirds: Growing Lobelia cardinalis",
    description: "Cardinal flower (Lobelia cardinalis): the red native perennial pollinated by hummingbirds — bloom time, wet-soil needs, native range, toxicity.",
    alt: "Cardinal flower — a spike of red tubular Lobelia cardinalis blooms that hummingbirds pollinate",
    intro: [
      "Cardinal flower is the native perennial built for hummingbirds: most insects find its long tubular red flowers difficult to navigate, so the plant depends on hummingbirds, which feed on the nectar, for pollination [1].",
      "The growing facts below come from the Lady Bird Johnson Wildflower Center's record for Lobelia cardinalis [1]; the case for planting natives is Audubon's [2]; hummingbird feeding behavior is from All About Birds [3].",
    ],
    sections: [
      { heading: "What cardinal flower looks like", paragraphs: [
        "A 1–6 foot perennial with showy red flowers in 8-inch terminal spikes; each flower has three spreading lower petals and two upper petals united into a tube at the base, on erect leafy stems that often grow in clusters and look like flaming red spires [1]. It blooms May through October depending on latitude, with dark green foliage and a seed capsule after flowering [1].",
        "Although relatively common, overpicking has made it scarce in some areas — one reason to buy nursery-grown plants or seed rather than dig wild ones [1].",
      ]},
      { heading: "What cardinal flower does for birds", paragraphs: [
        "The Wildflower Center's wildlife note is short and specific: in bloom, cardinal flower attracts hummingbirds, and it is listed as a nectar source for hummingbirds and as attracting birds and butterflies [1]. All About Birds lists cardinal flower among the tubular red or orange flowers — with trumpet creeper, honeysuckle, jewelweed and bee-balm — that Ruby-throated Hummingbirds feed at, alongside the sugar-water feeder [3].",
        "All parts are poisonous, though toxic only if eaten in large quantities [1]; deer resistance is moderate [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from southern New Brunswick to Ontario and southeastern Minnesota, south to Florida, Texas and southern California, and on through Mexico and Central America [1]. Its habitats are ditches, ravines, stream banks, wet meadows, swamps and the edges of lakes and ponds [1].",
        "It needs moist to wet, humus-rich soil — the soil must be kept moist or wet at all times — in sun, part shade or shade, with medium-to-high water use and low drought tolerance [1]. A winter mulch helps in northern climates, and it can be propagated by pinning a stem into mud, or from seed given three months of cold-moist stratification [1].",
      ]},
    ],
    faq: [
      { question: "Do hummingbirds use it?", answer: "Yes — it depends on hummingbirds for pollination because most insects cannot work its long tubular flowers, and it is listed as a hummingbird nectar source [1][3]." },
      { question: "Does cardinal flower need wet soil?", answer: "Yes. The Wildflower Center says the soil must be kept moist or wet at all times; it has low drought tolerance [1]." },
      { question: "Is cardinal flower poisonous?", answer: "All parts are poisonous, but toxic only if eaten in large quantities [1]." },
    ],
    extraSources: [aab(3, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird")],
  },
  {
    slug: "trumpet-honeysuckle", keyword: "trumpet honeysuckle", sci: "Lonicera sempervirens", sym: "LOSE",
    title: "Trumpet Honeysuckle for Birds: Growing Lonicera sempervirens",
    description: "Trumpet honeysuckle (Lonicera sempervirens): the native vine whose red tubular flowers feed hummingbirds and whose berries feed robins and finches.",
    alt: "Trumpet honeysuckle — red tubular Lonicera sempervirens flowers on a twining native vine",
    intro: [
      "Trumpet honeysuckle (also called coral honeysuckle) is the native alternative to invasive Japanese honeysuckle: a slender twining vine whose red trumpet flowers attract hummingbirds and whose red berries feed quail, Purple Finch, goldfinch, Hermit Thrush and American Robin [1].",
      "The growing facts below come from the Wildflower Center's record for Lonicera sempervirens [1]; the native-plant rationale is Audubon's [2]; hummingbird notes are from All About Birds [3].",
    ],
    sections: [
      { heading: "What trumpet honeysuckle looks like", paragraphs: [
        "A high-climbing, twining vine 3–20 feet long with smooth, glossy, paired, semi-evergreen leaves and clusters of red tubular blooms — red outside, yellow inside — followed by bright red berries about a quarter inch across [1]. The bark is papery, orange-brown and exfoliating [1]. It blooms March through June, and stems reach about 20 feet [1].",
      ]},
      { heading: "What trumpet honeysuckle does for birds", paragraphs: [
        "The flowers attract hummingbirds, bees and butterflies; the fruits attract quail, Purple Finch, goldfinch, Hermit Thrush and American Robin [1]. All About Birds names honeysuckle among the tubular flowers Ruby-throated Hummingbirds feed at [3], and robins eat an enormous variety of fruit [4]. It is also a larval host for the Spring Azure butterfly and Snowberry Clearwing moth, which means caterpillars — the food nesting songbirds need most [1][2].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from southern Maine to Florida and east Texas, scattered inland to Illinois, in zones 6 to 9 [1]. It takes sun or part shade, medium water and various soils, rich preferred, both lime and acid [1].",
        "It needs light, good air circulation and adequate drainage to prevent powdery mildew, may need some structural help to begin climbing, flowers best with more sun, and tolerates poor drainage for short periods [1].",
      ]},
    ],
    faq: [
      { question: "Is trumpet honeysuckle invasive?", answer: "No — Lonicera sempervirens is native to the eastern United States, unlike the invasive Japanese honeysuckle; the Wildflower Center lists it as native in the lower 48 [1]." },
      { question: "Which birds eat trumpet honeysuckle berries?", answer: "Quail, Purple Finch, goldfinch, Hermit Thrush and American Robin, per the Wildflower Center; hummingbirds take the nectar [1]." },
      { question: "Does trumpet honeysuckle need a trellis?", answer: "Usually some support to start climbing; it twines to about 20 feet and flowers best in more sun [1]." },
    ],
    extraSources: [aab(3, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird"), aab(4, "American_Robin", "American Robin")],
  },
  {
    slug: "american-elderberry", keyword: "elderberry habitat", sci: "Sambucus nigra ssp. canadensis", sym: "SANIC4",
    title: "Elderberry Habitat: Where It Grows & the Birds It Feeds",
    description: "Elderberry habitat and care: the wet-soil native shrub whose purple-black berries are relished by many birds — native range, growing conditions, pruning.",
    alt: "American elderberry in fruit — typical elderberry habitat is wet, rich ground where birds eat the purple berries",
    intro: [
      "Elderberry habitat is wet ground: alluvial forests, bogs, ditches, the edges of riparian thickets — and, planted in a yard, a fast-growing shrub whose berries are relished by many bird species and mammals [1].",
      "The growing facts below come from the Wildflower Center's record for Sambucus nigra ssp. canadensis, the current name for American elderberry [1]; the native-plant case is Audubon's [2]; bird diets are from All About Birds [3][4].",
    ],
    sections: [
      { heading: "Elderberry habitat in the wild", paragraphs: [
        "The Wildflower Center lists its native habitat as alluvial forests, bogs, ditches, drier old fields, and the edges of riparian thickets, across a native range from Nova Scotia to Florida and west to southern Manitoba, the eastern Dakotas, eastern Oklahoma and Texas [1]. It is a forest-edge species that will grow in full sun if the soil is well tilled and watered [1].",
      ]},
      { heading: "What elderberry does for birds", paragraphs: [
        "The purple-black fruit is attractive to birds that spread the seeds, and the berries are relished by many bird species and mammals; deer browse the twigs and leaves [1]. Among the birds profiled on this site, Northern Cardinals eat fruit including dogwood, mulberry, sumac and blackberry [3], and American Robins eat an enormous variety of fruit [4] — an elderberry in fruit from late summer draws both. The shrub also provides nesting structure for native bees [1].",
        "Leaves, twigs, roots and unripe fruit are poisonous (low toxicity); the ripe berries are inedible raw for people but reputedly used for jelly and wine [1].",
      ]},
      { heading: "Growing elderberry in a yard", paragraphs: [
        "It reaches about 12 feet, blooms white in May and June, and takes part shade, medium water and wet soil, tolerating a wide variety of wet to dry soils but preferring rich, moist, slightly acid ground [1].",
        "Elderberry is a fast grower and an aggressive competitor; prune heavily in winter to keep a thick form, and cutting the whole bush to the ground every other year may be needed to keep it in check [1]. Individual plants are short-lived but root masses keep producing new shoots, and it can be planted as a hedge [1].",
      ]},
    ],
    faq: [
      { question: "What is the habitat of American elderberry?", answer: "Wet, rich ground — alluvial forests, bogs, ditches, riparian thicket edges — from Nova Scotia to Florida and west to the Dakotas and Texas [1]." },
      { question: "Which birds eat elderberries?", answer: "The Wildflower Center says the berries are relished by many bird species; cardinals and robins are fruit-eaters that take similar berries [1][3][4]." },
      { question: "Is elderberry poisonous?", answer: "Leaves, twigs, roots and unripe fruit have low toxicity; ripe fruit is used cooked for jelly and wine [1]." },
    ],
    extraSources: [aab(3, "Northern_Cardinal", "Northern Cardinal"), aab(4, "American_Robin", "American Robin")],
  },
  {
    slug: "canadian-serviceberry", keyword: "canada serviceberry", sci: "Amelanchier canadensis", sym: "AMCA4",
    title: "Canada Serviceberry for Birds: Growing Amelanchier",
    description: "Canada serviceberry (shadblow, Amelanchier canadensis): early white bloom, early-summer fruit birds take, native range from Maine to Georgia.",
    alt: "Canada serviceberry — white spring blossoms of Amelanchier canadensis, an important bird food plant",
    intro: [
      "Canada serviceberry — shadblow — is a small understory tree or large multi-trunked shrub whose white spring blossoms are followed by small, crimson, apple-like fruit, and the Wildflower Center calls it an important browse and food plant for birds and other wildlife [1].",
      "The growing facts below come from the Wildflower Center's record for Amelanchier canadensis [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3].",
    ],
    sections: [
      { heading: "What Canada serviceberry looks like", paragraphs: [
        "A deciduous plant of 6–20 feet, sometimes taller (the record allows up to about 30 feet), usually growing in clumps with many upright branches and a delicate, open crown [1]. Long-petaled white blossoms open in April and May before the leaves emerge, the fruit ripens red to purple in early summer, and fall foliage is an enduring orange to rusty red [1].",
      ]},
      { heading: "What serviceberry does for birds", paragraphs: [
        "An important browse and food plant for birds and other wildlife, attracting birds and with special value to native bees [1]. The fruit ripens in early summer, weeks before most berries — American Robins, which eat an enormous variety of fruit and feed fruit to their young [3], are the classic serviceberry bird, and cardinals take similar small fruits [4].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "An East Coast plant, native from Maine to Georgia and west to central New York, in wood borders and moist upland woods [1]. It takes sun, part shade or shade, medium water, and moist but well-drained soils [1].",
        "Serviceberries are subject to many disease and insect problems, but the damage is usually cosmetic rather than life-threatening [1].",
      ]},
    ],
    faq: [
      { question: "What birds eat serviceberries?", answer: "The Wildflower Center calls it an important food plant for birds; robins and other fruit-eaters take the early-summer fruit [1][3]." },
      { question: "How big does Canada serviceberry get?", answer: "Usually 6–20 feet, occasionally to about 30, as a clump-forming shrub or small tree [1]." },
      { question: "Is Canada serviceberry native to my area?", answer: "Its native range is Maine to Georgia and west to central New York; other Amelanchier species cover the rest of the continent [1]." },
    ],
    extraSources: [aab(3, "American_Robin", "American Robin"), aab(4, "Northern_Cardinal", "Northern Cardinal")],
  },
  {
    slug: "flowering-dogwood", keyword: "flowering dogwood", sci: "Cornus florida", sym: "COFL2",
    title: "Flowering Dogwood for Birds: Growing Cornus florida",
    description: "Flowering dogwood (Cornus florida): spring blooms, red fall fruit that cardinals and robins eat, native range from Florida to Maine, shade and soil needs.",
    alt: "Flowering dogwood — white spring bracts of Cornus florida, whose red fruit feeds birds in fall",
    intro: [
      "Flowering dogwood is sometimes considered the most spectacular of the native flowering trees, and its red fall fruit is on the wild diet list of both the Northern Cardinal and the American Robin [1][3][4].",
      "The growing facts below come from the Wildflower Center's record for Cornus florida [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3][4].",
    ],
    sections: [
      { heading: "What flowering dogwood looks like", paragraphs: [
        "A 20–40 foot, sometimes taller, single- or multi-trunked deciduous tree with a spreading crown of nearly horizontal, graceful tiered branches, long-lasting showy white and pink spring blooms, red half-inch fruits and scarlet-red fall foliage [1]. It blooms February through June depending on latitude [1].",
      ]},
      { heading: "What flowering dogwood does for birds", paragraphs: [
        "The Wildflower Center lists its wildlife use as fruit for birds, mammals and deer, and it is a larval host for the Spring Azure butterfly [1]. All About Birds lists dogwood among the wild foods of the Northern Cardinal [3] and among the fruits — with chokecherries, hawthorn, sumac and juniper — that American Robins eat year-round [4]. As a native tree it also supports the caterpillars that nesting birds feed their young [2].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Florida to east Texas and north to southern Maine and Ontario, with the range resuming in eastern Mexico [1]. Its habitats are thickets, stream and river banks, shaded deciduous woods, bluffs and dry uplands [1].",
        "It wants part shade to shade, low water use, dry to moist conditions, and rich, well-drained acid soil — sandy, sandy loam or medium loam [1]. It is cold tolerant [1].",
      ]},
    ],
    faq: [
      { question: "Do birds eat flowering dogwood berries?", answer: "Yes — the Wildflower Center lists fruit for birds, and All About Birds names dogwood in the diets of cardinals and robins [1][3][4]." },
      { question: "Does flowering dogwood need shade?", answer: "Part shade to shade, with rich, well-drained acid soil; it is an understory tree in the wild [1]." },
      { question: "How tall does it grow?", answer: "Typically 20–40 feet, occasionally much taller [1]." },
    ],
    extraSources: [aab(3, "Northern_Cardinal", "Northern Cardinal"), aab(4, "American_Robin", "American Robin")],
  },
  {
    slug: "winterberry", keyword: "winterberry holly", sci: "Ilex verticillata", sym: "ILVE",
    title: "Winterberry Holly for Birds: Growing Ilex verticillata",
    description: "Winterberry holly (Ilex verticillata): the deciduous native holly whose red berries persist through winter for birds — male and female plants, wet soil, range.",
    alt: "Winterberry holly — bright red Ilex verticillata berries on bare winter branches",
    intro: [
      "Winterberry holly is the holly that drops its leaves: after the first frost the foliage turns black and falls, leaving dense clusters of bright red berries that remain on the branches through winter — cover, nesting site and fruit for birds [1].",
      "The growing facts below come from the Wildflower Center's record for Ilex verticillata [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3].",
    ],
    sections: [
      { heading: "What winterberry holly looks like", paragraphs: [
        "A globular, upright, medium-sized shrub typically 6–10 feet tall (to 20 feet in some circumstances) with leaves that lack the sharp teeth of other hollies and are not evergreen [1]. Its inconspicuous white-to-greenish flowers appear April through July; the red or orange fruit — technically drupes, commonly called berries — is extremely showy in late fall and early winter [1].",
      ]},
      { heading: "What winterberry does for birds", paragraphs: [
        "The Wildflower Center's wildlife uses are cover, nesting site, nectar for insects and fruit for birds [1]. Because the fruit persists into winter it feeds birds when little else does; American Robins, which eat a wide range of fruit and in winter move to moist woods where berry-producing trees and shrubs are common, are regular winterberry visitors [3]. It is also a larval host for Henry's Elfin butterfly [1].",
        "Like all Ilex, it may be somewhat toxic if ingested; children are most vulnerable [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Nova Scotia to the Florida panhandle and west to Minnesota, southeastern Missouri and east Texas, in swamps, along streams and rivers and near lakes and ponds [1]. It takes sun to shade, high water use, and moist acidic soils from sand to clay, tolerating poor drainage; it is quite winter-hardy [1].",
        "You must have both a male and a female plant to get berries — the male must be the same species and bloom at the same time [1].",
      ]},
    ],
    faq: [
      { question: "Why doesn't my winterberry have berries?", answer: "Winterberry is dioecious: you need a female plant and a male of the same species blooming at the same time nearby [1]." },
      { question: "Which birds eat winterberry?", answer: "The Wildflower Center lists fruit for birds; robins, which feed on berry-producing shrubs in winter, are typical [1][3]." },
      { question: "Does winterberry need wet soil?", answer: "It is a swamp and streambank shrub with high water use; it tolerates poor drainage and prefers moist acidic soil [1]." },
    ],
    extraSources: [aab(3, "American_Robin", "American Robin")],
  },
  {
    slug: "common-sunflower", keyword: "common sunflower", sci: "Helianthus annuus", sym: "HEAN3",
    title: "Common Sunflower for Birds: Growing Helianthus annuus",
    description: "Common sunflower (Helianthus annuus): the native annual whose seeds are sought by many wild birds — goldfinches, chickadees, cardinals — plus bloom time.",
    alt: "Common sunflower — a Helianthus annuus flower head whose seeds many wild birds seek",
    intro: [
      "Common sunflower is the wild parent of the black-oil sunflower in your feeder: a stout native annual up to 10 feet tall whose seeds are sought by many species of wild birds [1].",
      "The growing facts below come from the Wildflower Center's record for Helianthus annuus [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3][4] and feeder preferences from Project FeederWatch [5].",
    ],
    sections: [
      { heading: "What common sunflower looks like", paragraphs: [
        "A widely branching, stout annual 1½ to 10 feet tall with coarsely hairy leaves and stems and large terminal flower heads up to 5 inches across, a maroon central disc ringed by bright yellow rays [1]. It blooms July through October [1]. The cultivated giant sunflower is a member of the same species, derived through artificial selection, and contrary to myth the mature heads do not follow the sun [1].",
      ]},
      { heading: "What common sunflower does for birds", paragraphs: [
        "Seeds are sought by many species of wild birds, and sunflowers intermixed with other annuals provide good cover for many species of wildlife [1]. American Goldfinches eat seeds almost exclusively — composites such as sunflowers, thistle and asters — and balance on the seedheads to pluck them [3]; Black-capped Chickadees take mostly sunflower seeds at feeders [4]. FeederWatch calls black-oil sunflower the preferred food item for a wide variety of birds [5]. Leave the heads standing into fall rather than deadheading.",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Manitoba and Minnesota to Texas and westward, naturalized to the Atlantic, in dry, open and disturbed areas [1]. It wants full sun, dry disturbed clays or heavy sands, and medium water [1].",
        "It spreads rapidly by seed, especially in disturbed sites, and has an allelopathic effect on other plants — give it its own bed rather than a mixed border [1].",
      ]},
    ],
    faq: [
      { question: "Which birds eat sunflower seeds from the plant?", answer: "Many wild birds seek the seeds; goldfinches and chickadees are the regulars, and cardinals, finches and sparrows favor sunflower at feeders [1][3][4][5]." },
      { question: "Is common sunflower native?", answer: "Yes, native from the Plains westward and naturalized east to the Atlantic [1]." },
      { question: "Should I deadhead sunflowers?", answer: "Not if you want birds — leave the seed heads to ripen and dry on the stalk through fall." },
    ],
    extraSources: [aab(3, "American_Goldfinch", "American Goldfinch"), aab(4, "Black-capped_Chickadee", "Black-capped Chickadee"), FW(5)],
  },
  {
    slug: "purple-coneflower", keyword: "purple coneflower", sci: "Echinacea purpurea", sym: "ECPU",
    title: "Purple Coneflower for Birds: Growing Echinacea purpurea",
    description: "Purple coneflower (Echinacea purpurea): the prairie perennial whose spiny seed heads feed goldfinches and whose flowers draw butterflies and hummingbirds.",
    alt: "Purple coneflower — Echinacea purpurea blooms with the spiny seed heads goldfinches feed on",
    intro: [
      "Purple coneflower is a prairie perennial that works twice for a bird garden: long-lasting lavender flowers that attract butterflies and hummingbirds, then domed, spiny seed heads that goldfinches pick through into winter [1][3].",
      "The growing facts below come from the Wildflower Center's record for Echinacea purpurea [1]; the native-plant case is Audubon's [2]; goldfinch diet from All About Birds [3].",
    ],
    sections: [
      { heading: "What purple coneflower looks like", paragraphs: [
        "A popular perennial with smooth 2–4 foot stems and long-lasting lavender flowers, each borne singly with a domed, purplish-brown, spiny center and drooping rays; the genus name comes from the Greek for hedgehog [1]. It blooms April through September [1].",
      ]},
      { heading: "What purple coneflower does for birds", paragraphs: [
        "The Wildflower Center lists it as a nectar source attracting butterflies and hummingbirds, with special value to native bees [1]. The bird value is in the seed: American Goldfinches eat seeds almost exclusively — composites such as sunflowers, thistle and asters — plucking them from seedheads [3], and coneflower is a composite in the same family. Leave the heads standing through fall and winter.",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Georgia to extreme northeastern Texas, north to North Carolina, Ohio, Illinois and Iowa, in rocky open woods, thickets and prairies [1]. It takes sun or part shade, medium water, and well-drained sandy or richer soils [1].",
        "It suits a prairie garden and cut-flower arrangements, but it can become very aggressive, and it is not deer resistant [1]. The Wildflower Center lists seed as the propagation material, so a patch left to seed will spread itself as well as feed the finches [1].",
      ]},
    ],
    faq: [
      { question: "Do goldfinches eat coneflower seeds?", answer: "Goldfinches eat composite seeds almost exclusively and pluck them from seedheads; coneflower is a composite — leave the heads standing [3]." },
      { question: "Is purple coneflower deer resistant?", answer: "No, per the Wildflower Center record [1]." },
      { question: "How much sun does purple coneflower need?", answer: "Sun or part shade, in well-drained soil [1]." },
    ],
    extraSources: [aab(3, "American_Goldfinch", "American Goldfinch")],
  },
  {
    slug: "american-holly", keyword: "native american holly", sci: "Ilex opaca", sym: "ILOP",
    title: "Native American Holly for Birds: Growing Ilex opaca",
    description: "Native American holly (Ilex opaca): the evergreen whose red berries, cover and nesting sites serve many birds — height, male and female plants, range.",
    alt: "Native American holly — Ilex opaca evergreen leaves and red berries that feed and shelter birds",
    intro: [
      "Native American holly is the Christmas holly of the eastern United States, a pyramidal evergreen whose berries attract many bird and small mammal species and which also provides cover and nesting sites [1].",
      "The growing facts below come from the Wildflower Center's record for Ilex opaca [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3].",
    ],
    sections: [
      { heading: "What American holly looks like", paragraphs: [
        "Height ranges from 25 feet to as tall as 60 in warmer parts of its range, with stout stiff branches bearing dark green, non-glossy, spine-tipped leaves and light gray bark; a shorter multi-trunked form grows in lower light [1]. It blooms white-green from March to June, and bright red berries — a quarter to a third of an inch — occur on female plants [1].",
      ]},
      { heading: "What native American holly does for birds", paragraphs: [
        "Berries attract many bird and small mammal species, and the tree provides cover and nesting sites; it is a larval plant for Henry's Elfin butterfly [1]. Evergreen structure is winter shelter, and the persistent fruit feeds robins — fruit-eaters that in winter concentrate where berry-producing trees and shrubs are common [3] — and other thrushes. All Ilex may be somewhat toxic if ingested [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Virginia to northern Florida and west to southeastern Missouri and east Texas, plus coastal areas from Massachusetts to Maryland; primarily an understory tree of shaded woods and stream banks [1]. It takes sun to shade and medium water in moist, well-drained, acidic soils — sandy to medium loam, not so good in clay [1].",
        "You must have male and female plants for berries; for clay soils in humid areas the cultivar 'Savannah' is recommended [1].",
      ]},
    ],
    faq: [
      { question: "Is American holly native?", answer: "Yes — Ilex opaca is native to the lower 48, from Virginia to Florida and Texas plus the mid-Atlantic coast [1]." },
      { question: "Which birds eat American holly berries?", answer: "Many bird species per the Wildflower Center; robins and other thrushes that winter on berries are typical [1][3]." },
      { question: "Why does my holly have no berries?", answer: "Only female plants fruit, and they need a male nearby [1]." },
    ],
    extraSources: [aab(3, "American_Robin", "American Robin")],
  },
  {
    slug: "eastern-red-cedar", keyword: "eastern red cedar", sci: "Juniperus virginiana", sym: "JUVI",
    title: "Eastern Red Cedar for Birds: Growing Juniperus virginiana",
    description: "Eastern red cedar (Juniperus virginiana): the tough native evergreen whose blue berries are a staple for many birds, including the cedar waxwing — range.",
    alt: "Eastern red cedar — blue seed cones of Juniperus virginiana, a staple food for many birds",
    intro: [
      "Eastern red cedar is the most widely distributed eastern conifer, native in 37 states, and its juicy blue 'berries' are consumed by many kinds of wildlife including the Cedar Waxwing, which is named for the tree [1].",
      "The growing facts below come from the Wildflower Center's record for Juniperus virginiana [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3][4].",
    ],
    sections: [
      { heading: "What eastern red cedar looks like", paragraphs: [
        "An evergreen, aromatic tree, usually 30–40 feet but reaching 90, pyramidal when young and variable when mature, with fragrant scale-like foliage from gray-green to blue-green that browns in winter and soft silvery bark [1]. Pale blue fruits — seed cones, commonly called berries — occur on female plants [1].",
      ]},
      { heading: "What the tree does for birds", paragraphs: [
        "The fruits are a staple for many birds and small mammals, and the tree also provides nesting material and cover [1]. American Robins eat juniper berries among their year-round fruits [3], and American Goldfinches take the seeds of western red cedar in the same genus [4]. The dense evergreen foliage is the kind of cover Mourning Doves nest in [5] and feeder birds shelter in.",
        "Fleshy cones and leaves have low toxicity if eaten; the tree can also injure nearby apple trees by carrying cedar-apple rust [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Nova Scotia to South Dakota and south to northern Florida and central Texas, in fence rows, woodland edges, prairies and pastures [1]. It is resistant to extremes of drought, heat and cold, takes sun to shade, low water, and dry soils from sand to limestone and caliche [1].",
      ]},
    ],
    faq: [
      { question: "Which birds eat eastern red cedar berries?", answer: "Many — the Wildflower Center calls them a staple for birds and names the Cedar Waxwing; robins eat juniper berries too [1][3]." },
      { question: "Is it drought tolerant?", answer: "Yes — high drought tolerance and resistance to extremes of heat and cold [1]." },
      { question: "Does eastern red cedar harm apple trees?", answer: "It can, by hosting cedar-apple rust; keep it away from orchards [1]." },
    ],
    extraSources: [aab(3, "American_Robin", "American Robin"), aab(4, "American_Goldfinch", "American Goldfinch"), aab(5, "Mourning_Dove", "Mourning Dove")],
  },
  {
    slug: "black-eyed-susan", keyword: "black eyed susan", sci: "Rudbeckia hirta", sym: "RUHI2",
    title: "Black Eyed Susan for Birds: Growing Rudbeckia hirta",
    description: "Black eyed susan (Rudbeckia hirta): the native daisy whose ripe seeds feed granivorous birds like goldfinches — bloom time, sun, drought tolerance, range.",
    alt: "Black eyed susan — golden Rudbeckia hirta flowers whose ripe seeds birds enjoy",
    intro: [
      "Black eyed susan (Rudbeckia hirta) is the easy native: bright yellow daisy-like flowers with dark centers from June to October, high drought tolerance, high deer resistance — and, in the Wildflower Center's words, birds enjoy the ripe seeds [1].",
      "The growing facts below come from the Wildflower Center's record for Rudbeckia hirta [1]; the native-plant case is Audubon's [2]; goldfinch diet from All About Birds [3].",
    ],
    sections: [
      { heading: "What black eyed susan looks like", paragraphs: [
        "Depending on conditions it acts as an annual, biennial or short-lived perennial; 2–3 inch yellow flowers with dark brown central cones sit singly atop 1–2+ foot bristly-haired stems [1]. It blooms June through October and grows to about 3 feet [1].",
      ]},
      { heading: "What the flowers and seeds do for birds", paragraphs: [
        "The Wildflower Center lists nectar for bees, butterflies and insects, and seeds for granivorous birds; its comments add that birds enjoy the ripe seeds of Rudbeckia [1]. American Goldfinches eat seeds almost exclusively, especially composites [3] — Rudbeckia is one. It is also a larval host for the Gorgone Checkerspot and Bordered Patch butterflies, so it feeds the caterpillars nesting songbirds need [1][2].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from western Massachusetts to Manitoba and Wyoming, south to Florida and New Mexico, and widely naturalized elsewhere, in prairies, meadows, pastures and woodland edges [1]. It wants sun, medium water, and moist to dry well-drained soils, and tolerates juglone from walnuts [1].",
        "It may bloom longer with some afternoon shade, and can become aggressive if given too perfect an environment and not enough competition [1].",
      ]},
    ],
    faq: [
      { question: "Do birds eat the seeds?", answer: "Yes — listed as seeds for granivorous birds, and goldfinches feed on composite seedheads [1][3]." },
      { question: "Is Rudbeckia hirta deer resistant?", answer: "High deer resistance and high drought tolerance per the Wildflower Center [1]." },
      { question: "Is it an annual or a perennial?", answer: "It can act as an annual, biennial or short-lived perennial depending on growing conditions [1]." },
    ],
    extraSources: [aab(3, "American_Goldfinch", "American Goldfinch")],
  },
  {
    slug: "common-buttonbush", keyword: "common buttonbush", sci: "Cephalanthus occidentalis", sym: "CEOC2",
    title: "Common Buttonbush for Birds: Growing Cephalanthus",
    description: "Common buttonbush (Cephalanthus occidentalis): the wet-soil native shrub with globe flowers for pollinators and nutlets that ducks and water birds eat — range.",
    alt: "Common buttonbush — white globe-shaped Cephalanthus flowers on a native wetland shrub",
    intro: [
      "Common buttonbush is the shrub for the wet corner of the yard: it tolerates poor drainage and standing water, its pincushion flowers are a nectar and honey plant, and ducks, other water birds and shorebirds consume the seeds [1].",
      "The growing facts below come from the Wildflower Center's record for Cephalanthus occidentalis [1]; the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "What common buttonbush looks like", paragraphs: [
        "A multi-stemmed shrub of 6–12 feet, occasionally taller, with glossy dark green leaves in pairs or threes and small flowers in dense spherical one-inch heads, white or pale pink, with pistils protruding like pins [1]. It blooms June through September, and the rounded masses of nutlets persist through winter; trunks are often twisted [1].",
      ]},
      { heading: "What buttonbush does for birds", paragraphs: [
        "The Wildflower Center's wildlife uses are nectar for butterflies, bees and insects, and fruit for birds; its comments add that ducks and other water birds and shorebirds consume the seeds [1]. It is a nectar source with special value to native, bumble and honey bees, and an adult food source for two sphinx moths [1] — the insect life that in turn feeds insectivorous songbirds [2]. The foliage is poisonous and unpalatable to livestock [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from New Brunswick and Quebec to the upper Mississippi valley, eastern Nebraska and Kansas, south to Florida and Texas, in swamps, around ponds and on the margins of streams, marshes and lakes [1]. It takes part shade to shade, high water, moist to wet soils of any texture including limestone, and is fine with poor drainage or standing water [1]. It is cold tolerant [1].",
      ]},
    ],
    faq: [
      { question: "Can buttonbush grow in standing water?", answer: "Yes — moist, poor drainage or standing water are all listed as acceptable [1]." },
      { question: "Which birds use buttonbush?", answer: "Fruit for birds generally; ducks, other water birds and shorebirds consume the seeds [1]." },
      { question: "Is buttonbush poisonous?", answer: "The foliage is poisonous and unpalatable to livestock [1]." },
    ],
  },
  {
    slug: "virginia-creeper", keyword: "virginia creeper", sci: "Parthenocissus quinquefolia", sym: "PAQU2",
    title: "Virginia Creeper for Birds: Growing Parthenocissus",
    description: "Virginia creeper (Parthenocissus quinquefolia): the native vine whose winter berries feed chickadees, nuthatches, thrushes and woodpeckers — range, care.",
    alt: "Virginia creeper — five-leaflet Parthenocissus foliage turning red, with berries birds eat through winter",
    intro: [
      "Virginia creeper is the native vine with the longest bird list on this site: the Wildflower Center records its fruit feeding birds through the winter, including chickadees, nuthatches, mockingbirds, catbirds, finches, flycatchers, tanagers, swallows, vireos, warblers, woodpeckers and thrushes [1].",
      "The growing facts below come from the Wildflower Center's record for Parthenocissus quinquefolia [1]; the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "What Virginia creeper looks like", paragraphs: [
        "A woody deciduous vine, high-climbing or trailing 3–40 feet, that climbs by tendrils with adhesive discs that fasten to bark or rock [1]. Leaves have five leaflets (occasionally three or seven) radiating from the petiole, coarsely toothed, turning brilliant mauve, red and purple early in fall; flowers are small and greenish in May–June, and the fruit is bluish, about a quarter inch [1]. It is often confused with poison ivy, which has three leaflets [1].",
      ]},
      { heading: "What the vine does for birds", paragraphs: [
        "Fruit for birds through the winter — chickadees, nuthatches, mockingbirds, catbirds, finches, flycatchers, tanagers, swallows, vireos, warblers, woodpeckers and thrushes — and a larval host for several sphinx moths: Abbott's, Pandora, Virginia Creeper and White-lined [1]. Those caterpillars are what native plants uniquely supply to nesting birds [2].",
        "The berries are highly toxic to people and may be fatal if eaten, and the plant's tissues contain raphides that irritate some people's skin [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Quebec and Ontario south to Florida, west to southeastern Minnesota and Texas, and on to Guatemala, in zones 5 to 11; habitats run from chaparral and open woodlands to shaded woods and streamsides [1]. It tolerates most soils and climatic conditions — sun to shade, low water, moist well-drained soils of any texture — and works as a climbing vine or a ground cover; the structure it climbs is the limiting factor on size [1].",
      ]},
    ],
    faq: [
      { question: "Which birds eat Virginia creeper berries?", answer: "Chickadees, nuthatches, mockingbirds, catbirds, finches, flycatchers, tanagers, swallows, vireos, warblers, woodpeckers and thrushes, through the winter [1]." },
      { question: "Are the berries poisonous?", answer: "The berries are highly toxic to people and may be fatal if eaten; tissues can irritate skin [1]." },
      { question: "How do I tell Virginia creeper from poison ivy?", answer: "Virginia creeper has five leaflets (occasionally three or seven); poison ivy has three [1]." },
    ],
  },
  {
    slug: "wild-bergamot", keyword: "wild bergamot growing conditions", sci: "Monarda fistulosa", sym: "MOFI",
    title: "Wild Bergamot Growing Conditions & the Birds It Attracts",
    description: "Wild bergamot growing conditions (Monarda fistulosa): sun to part shade, dry to moist soil of almost any kind, air flow against mildew — plus its hummingbird.",
    alt: "Wild bergamot (Monarda fistulosa) growing in the conditions it likes — sun and well-drained ground — with hummingbirds visiting",
    intro: [
      "Wild bergamot growing conditions are forgiving: the Wildflower Center says it thrives in a wide range of soils, from acid to lime, rich to poor, sand to clay, in sun or part shade, and its ragged lavender pompoms attract birds, hummingbirds and butterflies [1].",
      "The growing facts below come from the Wildflower Center's record for Monarda fistulosa [1]; the native-plant case is Audubon's [2]; hummingbird notes from All About Birds [3].",
    ],
    sections: [
      { heading: "Wild bergamot growing conditions in the garden", paragraphs: [
        "Sun or part shade; medium water use; dry to moist soil; a wide range of soils from acid to lime, rich to poor, sand to clay; less tolerant of flooding but able to take it in winter; medium drought tolerance; zones 4 to 8 [1]. The one management note is to prevent mildew by providing good drainage and air circulation [1]. It propagates by root division or seed [1].",
        "In the wild it grows in dry open woods, fields, wet meadows and ditches, and at the edges of woods and marshes [1].",
      ]},
      { heading: "What wild bergamot looks like", paragraphs: [
        "A showy perennial with clusters of lavender, pink or white flowers like ragged pompoms atop 2–5 foot open-branched stems, blooming May through September; the gray-green leaves smell minty and were used for tea [1]. It is highly deer resistant [1].",
      ]},
      { heading: "Wild bergamot for hummingbirds and other birds", paragraphs: [
        "The Wildflower Center lists its wildlife use as birds, hummingbirds and butterflies, marks it a nectar source, and notes special value to native bees and bumble bees [1]. All About Birds names bee-balm — Monarda — among the tubular flowers Ruby-throated Hummingbirds feed at [3]. After bloom the nutlet heads hold seed that finches pick over, and as a native it supports the insects nesting birds need [2].",
      ]},
    ],
    faq: [
      { question: "What conditions does wild bergamot grow best in?", answer: "Sun to part shade, dry to moist soil of almost any type, good drainage and air circulation to prevent mildew; zones 4–8 [1]." },
      { question: "Do hummingbirds like Monarda?", answer: "Yes — it is listed as attracting hummingbirds, and All About Birds lists bee-balm among the flowers ruby-throats feed at [1][3]." },
      { question: "Is it deer resistant?", answer: "High deer resistance per the Wildflower Center [1]." },
    ],
    extraSources: [aab(3, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird")],
  },
  {
    slug: "american-beech", keyword: "american beech", sci: "Fagus grandifolia", sym: "FAGR",
    title: "American Beech for Birds: Growing Fagus grandifolia",
    description: "American beech (Fagus grandifolia): the long-lived native shade tree whose beechnuts are among the most important wildlife foods for jays and titmice — range.",
    alt: "American beech — smooth gray bark and glossy leaves of Fagus grandifolia, whose nuts feed birds",
    intro: [
      "American beech is a sturdy, imposing 50–80 foot tree whose beechnuts are among the most important of wildlife foods — eaten by birds, mammals and rodents — and which also offers nesting sites and cover [1].",
      "The growing facts below come from the Wildflower Center's record for Fagus grandifolia [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3][4].",
    ],
    sections: [
      { heading: "What American beech looks like", paragraphs: [
        "A large tree, 50–80 feet with a maximum of 120, with very smooth light gray bark that stays smooth with age, a rounded crown of long spreading horizontal branches, and dark green glossy leaves that turn copper in fall and hang on most of the winter [1]. It blooms April–May and bears edible beechnuts [1].",
      ]},
      { heading: "What American beech does for birds", paragraphs: [
        "Beech nuts are eaten by many forms of wildlife; the Wildflower Center lists nesting site, fruit for birds, mammals, rodents and deer, cover and browse, and notes it was the tree most associated with the extinct Passenger Pigeon [1]. Among today's birds, Tufted Titmice eat beech nuts and acorns and always choose the largest seeds they can [3], and Blue Jays' diet is mostly acorns, nuts, seeds and grain [4]. It is a larval host for the Early Hairstreak butterfly [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Florida to east Texas and north to southeastern Massachusetts, southern Ohio and Illinois, Indiana and Missouri, on moist or wet lowland sites [1]. It wants part shade to shade, medium water and moist, rich, well-drained acid soils [1].",
        "It is shade tolerant and long-lived but not suitable for small areas: it suckers from a vast surface root system, is extremely susceptible to root-zone disturbance and drought, leans toward the strongest light, and grass will not grow beneath it; a bark fungus disease has proven fatal [1].",
      ]},
    ],
    faq: [
      { question: "Which birds eat beechnuts?", answer: "Many — the Wildflower Center lists fruit for birds; titmice and jays are nut-eaters that take them [1][3][4]." },
      { question: "Is American beech a good yard tree?", answer: "Only with room: it is long-lived and handsome but suckers widely, dislikes root disturbance and drought, and is not suitable for small areas [1]." },
      { question: "How big does American beech get?", answer: "50–80 feet, up to 120 [1]." },
    ],
    extraSources: [aab(3, "Tufted_Titmouse", "Tufted Titmouse"), aab(4, "Blue_Jay", "Blue Jay")],
  },
  {
    slug: "paper-birch", keyword: "paper birch", sci: "Betula papyrifera", sym: "BEPA",
    title: "Paper Birch for Birds: Growing Betula papyrifera",
    description: "Paper birch (Betula papyrifera): the white-barked northern native whose seeds feed goldfinches and whose soft wood chickadees excavate — cool-summer needs.",
    alt: "Paper birch — white peeling bark of Betula papyrifera, a tree songbirds and chickadees use",
    intro: [
      "Paper birch is the white-barked tree of the Northwoods, used by songbirds, ground birds and mammals, and one of the trees whose seeds goldfinches eat and whose rotten branches chickadees excavate for nests [1][3][4].",
      "The growing facts below come from the Wildflower Center's record for Betula papyrifera [1]; the native-plant case is Audubon's [2]; bird notes from All About Birds [3][4].",
    ],
    sections: [
      { heading: "What paper birch looks like", paragraphs: [
        "A 50–75 foot single- or multi-trunked deciduous tree with conspicuous white peeling bark, loosely pyramidal when young and irregular and rounded in maturity, with bright green leaves that turn yellow in fall [1]. It blooms in April and bears small brown samaras [1].",
      ]},
      { heading: "What paper birch does for birds", paragraphs: [
        "Songbirds, ground birds and mammals use this species, and it is a larval host for the Eastern Tiger Swallowtail and Luna moth [1]. American Goldfinches eat tree seeds including alder and birch [3]; Black-capped Chickadees often excavate their own nest cavity in dead snags or rotten branches, frequently alder or birch [4]. Caterpillars from its two moth and butterfly hosts feed nesting birds [2].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from Newfoundland and Labrador to Alaska, south to New Jersey, the Virginia mountains, northeastern Indiana, Wyoming and northeastern Oregon, in low wet areas, moist hillsides and stream banks [1]. It wants sun to shade, high water, and moist, fertile, cool soils [1].",
        "It requires cool summers where average July temperatures are below 70 °F, is short-lived and sensitive to the bronze birch borer and birch dieback under unfavorable conditions, and should not be pruned until summer when the sap has stopped flowing [1].",
      ]},
    ],
    faq: [
      { question: "Which birds use paper birch?", answer: "Songbirds and ground birds generally; goldfinches eat birch seed and chickadees excavate nest cavities in rotten birch [1][3][4]." },
      { question: "Can I grow paper birch in a warm climate?", answer: "It needs cool summers with average July temperatures below 70 °F; elsewhere it is short-lived and borer-prone [1]." },
      { question: "When should I prune paper birch?", answer: "Not until summer, after the sap has stopped flowing [1]." },
    ],
    extraSources: [aab(3, "American_Goldfinch", "American Goldfinch"), aab(4, "Black-capped_Chickadee", "Black-capped Chickadee")],
  },
  {
    slug: "red-mulberry", keyword: "red mulberry", sci: "Morus rubra", sym: "MORU2",
    title: "Red Mulberry for Birds: Growing Morus rubra",
    description: "Red mulberry (Morus rubra): the native fruit tree cardinals and house finches eat from — fruit, bloom, native range from Ontario to Florida and Texas.",
    alt: "Red mulberry — ripening Morus rubra fruit that cardinals and finches eat",
    intro: [
      "Red mulberry is the native mulberry, a medium-sized tree with milky sap and inch-long fruit for mammals and birds — mulberry is on All About Birds' wild-food list for both the Northern Cardinal and the House Finch [1][3][4].",
      "The growing facts below come from the Wildflower Center's record for Morus rubra [1]; the native-plant case is Audubon's [2]; bird diets from All About Birds [3][4].",
    ],
    sections: [
      { heading: "What red mulberry looks like", paragraphs: [
        "A medium-sized tree, up to about 65 feet but often shorter, with a short trunk, broad rounded crown and milky sap; leaves up to 8 inches, ovate with or without lobes, soft-hairy beneath, turning bright yellow in fall [1]. It blooms March through August, and the fruit — black, purple or red syncarps — is ¾ to 1¼ inches long [1].",
      ]},
      { heading: "What red mulberry does for birds", paragraphs: [
        "The Wildflower Center lists fruit for mammals and birds, and the tree is a larval host for the Mourning Cloak butterfly [1]. Northern Cardinals' wild foods include dogwood, wild grape, mulberry, hackberry, blackberry and sumac [3]; House Finches eat seeds, buds and fruit including mulberry and orchard fruit [4]. The fruit ripens over a long season and drops, so ground-feeding birds get a share too.",
        "Unripe fruit and the milky sap have low toxicity if eaten; ripe fruit is edible [1].",
      ]},
      { heading: "Native range and growing conditions", paragraphs: [
        "Native from southern Ontario east to Massachusetts, south to southern Florida, west to central Texas and north to southeastern Minnesota, in shaded woods, along streams and rivers, in ditches and ravines [1]. It takes sun to shade, medium water, dry to moist soils from sand to clay [1]. Give it distance from paths and parked cars — the dropped fruit stains.",
      ]},
    ],
    faq: [
      { question: "Which birds eat red mulberry?", answer: "Fruit for birds generally; All About Birds lists mulberry in the diets of Northern Cardinals and House Finches [1][3][4]." },
      { question: "Is red mulberry the same as white mulberry?", answer: "No — Morus rubra is the native species; white mulberry (M. alba) is an introduced Asian tree, though the flowers and fruits are similar [1]." },
      { question: "Is red mulberry fruit edible?", answer: "Ripe fruit is edible and long used in Appalachia for pies and jams; unripe fruit and sap have low toxicity [1]." },
    ],
    extraSources: [aab(3, "Northern_Cardinal", "Northern Cardinal"), aab(4, "House_Finch", "House Finch")],
  },
];

for (const p of SPECIES) plantEditorial[`/plants/${p.slug}`] = plant(p);

// ── Collections ───────────────────────────────────────────────
const P = Object.fromEntries(SPECIES.map((p) => [p.slug, p])) as Record<string, PlantSpec>;
/** Build a collection page whose sources are the Wildflower records of the plants it names, plus Audubon. */
function collection(c: { path: string; keyword: string; title: string; description: string; imageKey: string; alt: string; plants: string[]; intro: string[]; sections: { heading: string; paragraphs: (n: (slug: string) => string) => string[] }[]; faq: (n: (slug: string) => string) => { question: string; answer: string }[]; extraSources?: { id: number; label: string; url: string }[] }): EditorialContent {
  const ids = new Map(c.plants.map((s, i) => [s, i + 2]));
  const n = (slug: string) => `[${ids.get(slug)}]`;
  const A = 1;
  const sources = [AUDUBON(A), ...c.plants.map((s) => wf(ids.get(s)!, P[s].sci, P[s].sym)), ...(c.extraSources ?? [])];
  return {
    path: c.path, keyword: c.keyword, title: c.title, description: c.description, image: timg(c.imageKey, c.alt),
    intro: c.intro,
    sections: [...c.sections.map((s) => ({ heading: s.heading, paragraphs: s.paragraphs(n) })), { heading: "Why native plants first", paragraphs: [whyNative(A), lawnNote(A), nativeCheck(2, A), `Each plant above links to its own profile with the Wildflower Center's native range, so you can confirm it occurs naturally where you live before buying [${A}].`] }],
    faq: c.faq(n),
    sources,
  };
}

const COLLECTIONS = [
  collection({
    path: "/plants/flowers", keyword: "flowers that attract birds", title: "Flowers That Attract Birds: 5 Native Perennials & Annuals",
    description: "Flowers that attract birds: cardinal flower and wild bergamot for hummingbirds, sunflower, coneflower and black-eyed susan for goldfinches — bloom.",
    imageKey: "purple-coneflower", alt: "Goldfinch on a purple coneflower seed head — flowers that attract birds feed them twice, nectar then seed",
    plants: ["cardinal-flower", "wild-bergamot", "common-sunflower", "purple-coneflower", "black-eyed-susan"],
    intro: [
      "The flowers that attract birds do it two ways: tubular red or lavender blooms feed hummingbirds on nectar, and composite daisies feed goldfinches and other finches on seed once the petals drop.",
      "Every plant here is native to North America; the growing facts are from the Lady Bird Johnson Wildflower Center's Native Plant Database and the reason to choose natives is Audubon's [1].",
    ],
    sections: [
      { heading: "Flowers that attract birds with nectar: hummingbird plants", paragraphs: (n) => [
        `Cardinal flower (Lobelia cardinalis) is the purest hummingbird plant: most insects find its long tubular red flowers difficult to navigate, so it depends on hummingbirds for pollination; it blooms May–October in moist to wet soil ${n("cardinal-flower")}. Wild bergamot (Monarda fistulosa) is listed as attracting birds, hummingbirds and butterflies, blooms May–September, and thrives in almost any soil in sun or part shade ${n("wild-bergamot")}.`,
      ]},
      { heading: "Seed flowers that attract finches", paragraphs: (n) => [
        `Common sunflower (Helianthus annuus) seeds are sought by many species of wild birds, and the plants give cover when mixed with other annuals ${n("common-sunflower")}. Purple coneflower (Echinacea purpurea) draws butterflies and hummingbirds to its flowers and leaves spiny seed heads for finches; it is a prairie plant for sun and well-drained soil ${n("purple-coneflower")}. Black-eyed susan (Rudbeckia hirta) is listed for seeds for granivorous birds — birds enjoy the ripe seeds — and is highly deer and drought resistant ${n("black-eyed-susan")}.`,
        "The management rule for all three is the same: do not deadhead. Leave seed heads standing through fall and winter.",
      ]},
    ],
    faq: (n) => [
      { question: "What flowers attract hummingbirds?", answer: `Tubular natives such as cardinal flower and wild bergamot; cardinal flower depends on hummingbirds for pollination ${n("cardinal-flower")}${n("wild-bergamot")}.` },
      { question: "What flowers attract goldfinches?", answer: `Composites with seed heads — sunflower, coneflower and black-eyed susan — left standing after bloom ${n("common-sunflower")}${n("purple-coneflower")}${n("black-eyed-susan")}.` },
    ],
  }),
  collection({
    path: "/plants/trees", keyword: "trees that attract birds", title: "Trees That Attract Birds: 6 Native Fruit, Nut & Cover Trees",
    description: "Trees that attract birds: flowering dogwood, American holly, eastern red cedar, American beech, paper birch and red mulberry — what each feeds.",
    imageKey: "flowering-dogwood", alt: "Flowering dogwood in bloom — one of the native trees that attract birds with fruit and caterpillars",
    plants: ["flowering-dogwood", "american-holly", "eastern-red-cedar", "american-beech", "paper-birch", "red-mulberry"],
    intro: [
      "Trees that attract birds do more than any feeder: they carry fruit, nuts and seed through the seasons, hold the caterpillars nesting birds need, and give evergreen cover in winter.",
      "The six below are native to eastern North America; growing facts are from the Wildflower Center's Native Plant Database, and the case for natives is Audubon's [1].",
    ],
    sections: [
      { heading: "Fruit trees that attract birds", paragraphs: (n) => [
        `Flowering dogwood (Cornus florida) carries red fruit for birds, mammals and deer beneath spring blooms and scarlet fall foliage; it wants part shade and acid soil ${n("flowering-dogwood")}. Red mulberry (Morus rubra) drops inch-long fruit for birds and mammals over a long season and grows in sun or shade on almost any soil ${n("red-mulberry")}. American holly (Ilex opaca) is evergreen, its berries attract many bird species, and it provides cover and nesting sites; only females fruit ${n("american-holly")}.`,
      ]},
      { heading: "Nut, seed and cover trees", paragraphs: (n) => [
        `American beech (Fagus grandifolia) produces beechnuts among the most important of wildlife foods, plus nesting sites and cover — but it needs room and dislikes root disturbance ${n("american-beech")}. Paper birch (Betula papyrifera) is used by songbirds and ground birds and hosts the Luna moth and Eastern Tiger Swallowtail, but only where summers are cool ${n("paper-birch")}. Eastern red cedar (Juniperus virginiana), native in 37 states, offers berries that are a staple for many birds, nesting material and cover, and tolerates drought, heat and cold ${n("eastern-red-cedar")}.`,
        "Audubon's caterpillar count is the reason to plant native trees specifically: a native oak supports over 500 caterpillar species against five for a ginkgo, and a brood of chickadees takes more than 6,000 caterpillars [1].",
      ]},
    ],
    faq: (n) => [
      { question: "What is the best tree to attract birds?", answer: `For most eastern yards, a native fruiting tree — flowering dogwood or red mulberry — plus an evergreen like eastern red cedar for winter cover and berries ${n("flowering-dogwood")}${n("red-mulberry")}${n("eastern-red-cedar")}.` },
      { question: "Which trees give birds winter food?", answer: `American holly and eastern red cedar hold fruit into winter and are evergreen ${n("american-holly")}${n("eastern-red-cedar")}.` },
    ],
  }),
  collection({
    path: "/plants/shrubs", keyword: "shrubs that attract birds", title: "Shrubs That Attract Birds: Elderberry to Winterberry",
    description: "Shrubs that attract birds: American elderberry, Canada serviceberry, winterberry holly and buttonbush — berries by season, nesting cover, wet-soil tolerance.",
    imageKey: "winterberry", alt: "Winterberry holly in fruit — shrubs that attract birds feed them from early summer to late winter",
    plants: ["american-elderberry", "canadian-serviceberry", "winterberry", "common-buttonbush"],
    intro: [
      "Shrubs that attract birds are the middle layer most yards lack: dense enough for cardinals and doves to nest in, and fruiting in sequence from serviceberry in early summer to winterberry in the snow.",
      "The four below are native shrubs of the East and Midwest; growing facts are from the Wildflower Center's Native Plant Database, and the case for natives is Audubon's [1].",
    ],
    sections: [
      { heading: "Shrubs that attract birds with berries, by season", paragraphs: (n) => [
        `Canada serviceberry (Amelanchier canadensis) blooms white in April–May and fruits red to purple in early summer; the Wildflower Center calls it an important browse and food plant for birds ${n("canadian-serviceberry")}. American elderberry (Sambucus nigra ssp. canadensis) follows in late summer with purple-black berries relished by many bird species, on a fast-growing shrub for wet ground ${n("american-elderberry")}. Winterberry (Ilex verticillata) holds bright red fruit on bare branches through winter, and offers cover and nesting sites; it needs a male and a female plant ${n("winterberry")}.`,
      ]},
      { heading: "A shrub for the wet corner", paragraphs: (n) => [
        `Common buttonbush (Cephalanthus occidentalis) takes standing water, feeds bees and butterflies with its globe flowers, and its nutlets are eaten by ducks, other water birds and shorebirds ${n("common-buttonbush")}.`,
        "Beyond food, shrubs are where birds nest: Northern Cardinals nest in a fork of small branches in a sapling, shrub or vine tangle, hidden in dense foliage [6], and Mourning Doves nest amid dense foliage in evergreens and shrubs [7].",
      ]},
    ],
    faq: (n) => [
      { question: "What shrubs attract the most birds?", answer: `Berry shrubs that fruit in sequence — serviceberry, elderberry, winterberry — with dense growth for nesting ${n("canadian-serviceberry")}${n("american-elderberry")}${n("winterberry")}.` },
      { question: "Which shrubs feed birds in winter?", answer: `Winterberry holly: its red fruit remains on the branches throughout winter ${n("winterberry")}.` },
    ],
    extraSources: [aab(6, "Northern_Cardinal", "Northern Cardinal"), aab(7, "Mourning_Dove", "Mourning Dove")],
  }),
  collection({
    path: "/plants/vines", keyword: "vines that attract birds", title: "Vines That Attract Birds: Honeysuckle & Virginia Creeper",
    description: "Vines that attract birds: trumpet honeysuckle for hummingbirds, robins and finches, and Virginia creeper, whose winter berries feed chickadees.",
    imageKey: "trumpet-honeysuckle", alt: "Trumpet honeysuckle flowers — one of two native vines that attract birds with nectar and fruit",
    plants: ["trumpet-honeysuckle", "virginia-creeper"],
    intro: [
      "Two native vines cover the whole bird year between them: trumpet honeysuckle feeds hummingbirds from March and fruit-eaters in summer, and Virginia creeper feeds a dozen bird families through winter.",
      "Growing facts are from the Wildflower Center's Native Plant Database, and the case for natives — including why these beat invasive Japanese honeysuckle and English ivy — is Audubon's [1].",
    ],
    sections: [
      { heading: "Vines that attract birds: trumpet honeysuckle", paragraphs: (n) => [
        `Lonicera sempervirens is a twining vine to 20 feet with red tubular flowers March–June that attract hummingbirds, bees and butterflies, and red berries that attract quail, Purple Finch, goldfinch, Hermit Thrush and American Robin ${n("trumpet-honeysuckle")}. It needs light, air circulation and drainage against mildew, and flowers best in more sun ${n("trumpet-honeysuckle")}.`,
      ]},
      { heading: "Virginia creeper", paragraphs: (n) => [
        `Parthenocissus quinquefolia climbs by adhesive tendrils to 40 feet or carpets the ground; its bluish fruit feeds birds through the winter, including chickadees, nuthatches, mockingbirds, catbirds, finches, flycatchers, tanagers, swallows, vireos, warblers, woodpeckers and thrushes, and it hosts four sphinx moths ${n("virginia-creeper")}. The berries are highly toxic to people, and the five-leaflet leaves are often confused with three-leaflet poison ivy ${n("virginia-creeper")}.`,
        "Both vines are larval hosts, which matters as much as fruit: Audubon's point is that birds cannot survive without the insects that co-evolved with native plants [1].",
      ]},
    ],
    faq: (n) => [
      { question: "Which of these vines attracts hummingbirds?", answer: `Trumpet (coral) honeysuckle — its flowers attract hummingbirds, and it is native, unlike Japanese honeysuckle ${n("trumpet-honeysuckle")}.` },
      { question: "Is Virginia creeper good for birds, then?", answer: `Yes — its fruit feeds at least a dozen bird groups through winter; keep children away from the toxic berries ${n("virginia-creeper")}.` },
    ],
  }),
  collection({
    path: "/plants/native-plants", keyword: "native plants for birds", title: "Native Plants for Birds: 17 Species by Layer, Season & Bird",
    description: "Native plants for birds, organized by what they provide: hummingbird nectar, finch seed, summer and winter berries, nuts and nesting cover — with native ranges.",
    imageKey: "cardinal-flower", alt: "Cardinal flower — one of the native plants for birds that depends on hummingbirds for pollination",
    plants: ["cardinal-flower", "wild-bergamot", "trumpet-honeysuckle", "common-sunflower", "purple-coneflower", "black-eyed-susan", "canadian-serviceberry", "american-elderberry", "red-mulberry", "flowering-dogwood", "winterberry", "american-holly", "eastern-red-cedar", "virginia-creeper", "american-beech", "paper-birch", "common-buttonbush"],
    intro: [
      "Native plants for birds are the plants that occur naturally in your region — and Audubon's argument is blunt: without them and the insects that co-evolved with them, local birds cannot survive [1].",
      "The 17 species profiled on this site are grouped below by what they give birds; each links to a full profile with the Wildflower Center's native range and growing conditions.",
    ],
    sections: [
      { heading: "Native plants for birds: nectar and seed", paragraphs: (n) => [
        `Hummingbirds: cardinal flower ${n("cardinal-flower")}, wild bergamot ${n("wild-bergamot")} and trumpet honeysuckle ${n("trumpet-honeysuckle")}. Finches: common sunflower ${n("common-sunflower")}, purple coneflower ${n("purple-coneflower")} and black-eyed susan ${n("black-eyed-susan")}, left standing after bloom.`,
      ]},
      { heading: "Native plants for fruit, nuts and cover", paragraphs: (n) => [
        `Early summer fruit: Canada serviceberry ${n("canadian-serviceberry")} and red mulberry ${n("red-mulberry")}. Late summer and fall: American elderberry ${n("american-elderberry")} and flowering dogwood ${n("flowering-dogwood")}. Winter: winterberry ${n("winterberry")}, American holly ${n("american-holly")}, eastern red cedar ${n("eastern-red-cedar")} and Virginia creeper ${n("virginia-creeper")}. Nuts and seed: American beech ${n("american-beech")} and paper birch ${n("paper-birch")}. Wet ground: common buttonbush ${n("common-buttonbush")}.`,
        "Audubon's benefits list for natives — low maintenance once established, less water, no need for the pesticides that make lawns poor habitat, and carbon storage by long-lived trees — applies to every plant above [1]. Use Audubon's zip-code database to confirm which are native to your county [1].",
      ]},
    ],
    faq: () => [
      { question: "Why do birds need native plants?", answer: "Because native plants host the insects birds feed their young: a native oak supports over 500 caterpillar species, a ginkgo five, and one chickadee brood needs 6,000-plus caterpillars [1]." },
      { question: "How do I find native plants for my area?", answer: "Audubon's native plants database takes a zip code and lists local natives and the bird groups they attract [1]; each profile here also lists the Wildflower Center's native range." },
    ],
  }),
  collection({
    path: "/plants/nectar-plants", keyword: "nectar plants for birds", title: "Nectar Plants for Birds: Native Hummingbird Flowers & Vines",
    description: "Nectar plants for birds: cardinal flower, wild bergamot and trumpet honeysuckle — the native tubular flowers hummingbirds feed at, with bloom times.",
    imageKey: "cardinal-flower", alt: "Cardinal flower spike — the classic of the nectar plants for birds, feeding hummingbirds",
    plants: ["cardinal-flower", "wild-bergamot", "trumpet-honeysuckle"],
    intro: [
      "Nectar plants for birds mostly mean hummingbird plants, and All About Birds lists trumpet creeper, cardinal flower, honeysuckle, jewelweed and bee-balm as the flowers Ruby-throated Hummingbirds feed at [5].",
      "The three below are native and profiled on this site; growing facts are from the Wildflower Center and the native-plant case is Audubon's [1].",
    ],
    sections: [
      { heading: "The three nectar plants for birds", paragraphs: (n) => [
        `Cardinal flower (Lobelia cardinalis): red spikes May–October, wet soil, and a plant that depends on hummingbirds for pollination ${n("cardinal-flower")}. Wild bergamot (Monarda fistulosa) — the bee-balm of All About Birds' list — lavender pompoms May–September in almost any soil, highly deer resistant ${n("wild-bergamot")}. Trumpet honeysuckle (Lonicera sempervirens): a native vine with red trumpets March–June that attract hummingbirds, then berries for finches, thrushes and robins ${n("trumpet-honeysuckle")}.`,
      ]},
      { heading: "Nectar plants and the feeder", paragraphs: () => [
        "Plants and a sugar-water feeder work together. Ruby-throated Hummingbirds prefer red or orange flowers but need no dye in feeder water — about one-quarter cup of sugar per cup of water, changed before it clouds — and they also catch insects in midair for protein, which the native plants supply [5]. Stagger bloom times so something is open from spring arrival to fall departure.",
      ]},
    ],
    faq: (n) => [
      { question: "What are the best nectar plants for hummingbirds?", answer: `Native tubular flowers: cardinal flower, wild bergamot (bee-balm) and trumpet honeysuckle ${n("cardinal-flower")}${n("wild-bergamot")}${n("trumpet-honeysuckle")}[5].` },
      { question: "Do nectar plants attract birds other than hummingbirds?", answer: "The flowers feed hummingbirds; the seed and fruit that follow feed finches and thrushes, and the insects they host feed everything else [1]." },
    ],
    extraSources: [aab(5, "Ruby-throated_Hummingbird", "Ruby-throated Hummingbird")],
  }),
  collection({
    path: "/plants/berry-producing-plants", keyword: "berry plants for birds", title: "Berry Plants for Birds: Native Shrubs & Trees by Season",
    description: "Berry plants for birds in fruiting order: serviceberry and mulberry in early summer, elderberry and dogwood in fall, winterberry, holly and red cedar in winter.",
    imageKey: "american-elderberry", alt: "American elderberry clusters — berry plants for birds ripen in sequence from summer to winter",
    plants: ["canadian-serviceberry", "red-mulberry", "american-elderberry", "flowering-dogwood", "winterberry", "american-holly", "eastern-red-cedar", "virginia-creeper", "trumpet-honeysuckle"],
    intro: [
      "The trick with berry plants for birds is sequence: a yard that fruits from June to February feeds robins, cardinals, waxwings and thrushes in every month, not one glut in August.",
      "All nine below are native; fruiting and growing facts are from the Wildflower Center's Native Plant Database, the case for natives is Audubon's [1], and robin and cardinal diets are from All About Birds [11][12].",
    ],
    sections: [
      { heading: "Berry plants for birds: early summer to fall", paragraphs: (n) => [
        `Canada serviceberry fruits red to purple in early summer and is an important food plant for birds ${n("canadian-serviceberry")}; red mulberry drops fruit for birds and mammals over a long season ${n("red-mulberry")}. American elderberry's late-summer berries are relished by many bird species ${n("american-elderberry")}; flowering dogwood's red fall fruit is listed for birds, mammals and deer ${n("flowering-dogwood")} and is on the diet lists of both Northern Cardinal and American Robin [11][12]. Trumpet honeysuckle's summer berries attract quail, Purple Finch, goldfinch, Hermit Thrush and American Robin ${n("trumpet-honeysuckle")}.`,
      ]},
      { heading: "Winter berries", paragraphs: (n) => [
        `Winterberry holds red fruit on bare branches throughout winter ${n("winterberry")}; American holly's berries attract many bird species on an evergreen that also gives cover ${n("american-holly")}; eastern red cedar's blue berries are a staple for many birds including the Cedar Waxwing ${n("eastern-red-cedar")}; Virginia creeper feeds chickadees, nuthatches, thrushes, woodpeckers and more through the winter ${n("virginia-creeper")}. Robins that stay north for winter move to moist woods where berry-producing trees and shrubs are common [12] — a berry-rich yard is why some stay.`,
      ]},
    ],
    faq: (n) => [
      { question: "Which berry plants feed birds in winter?", answer: `Winterberry, American holly, eastern red cedar and Virginia creeper all hold fruit into winter ${n("winterberry")}${n("american-holly")}${n("eastern-red-cedar")}${n("virginia-creeper")}.` },
      { question: "What berries do robins eat?", answer: "Chokecherries, hawthorn, dogwood, sumac and juniper berries, among an enormous variety of fruit [12]." },
    ],
    extraSources: [aab(11, "Northern_Cardinal", "Northern Cardinal"), aab(12, "American_Robin", "American Robin")],
  }),
  collection({
    path: "/plants/bird-seed-plants", keyword: "seed plants for birds", title: "Seed Plants for Birds: Sunflower, Coneflower & Susan",
    description: "Seed plants for birds: common sunflower, purple coneflower, black-eyed susan, plus beech, birch and buttonbush — what goldfinches, chickadees and titmice take.",
    imageKey: "common-sunflower", alt: "Common sunflower head — first among seed plants for birds, and the source of black-oil sunflower",
    plants: ["common-sunflower", "purple-coneflower", "black-eyed-susan", "american-beech", "paper-birch", "common-buttonbush"],
    intro: [
      "Seed plants for birds grow the feeder: American Goldfinches eat seeds almost exclusively — composites such as sunflowers, thistle and asters, grasses, and trees like alder and birch [8] — and a bed of native composites left standing feeds them into winter.",
      "Growing facts below are from the Wildflower Center's Native Plant Database, the case for natives is Audubon's [1], and bird diets from All About Birds [8][9] and Project FeederWatch [10].",
    ],
    sections: [
      { heading: "Seed plants for birds: composite flowers for finches", paragraphs: (n) => [
        `Common sunflower seeds are sought by many species of wild birds ${n("common-sunflower")} — FeederWatch calls black-oil sunflower the preferred food for a wide variety of birds [10]. Purple coneflower's spiny heads and black-eyed susan's cones hold seed for granivorous birds; the Wildflower Center notes birds enjoy black-eyed susan's ripe seeds ${n("purple-coneflower")}${n("black-eyed-susan")}. Leave all three standing after bloom.`,
      ]},
      { heading: "Trees and shrubs with seed and nuts", paragraphs: (n) => [
        `American beech nuts are among the most important wildlife foods ${n("american-beech")} — Tufted Titmice eat beech nuts and acorns and choose the largest seeds they can [9]. Paper birch is used by songbirds and ground birds ${n("paper-birch")}, and goldfinches eat birch seed [8]. Common buttonbush nutlets are eaten by ducks, water birds and shorebirds ${n("common-buttonbush")}.`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants produce seeds for goldfinches?", answer: `Sunflower, coneflower and black-eyed susan among composites, plus birch and alder among trees ${n("common-sunflower")}${n("purple-coneflower")}${n("black-eyed-susan")}[8].` },
      { question: "Should I deadhead flowers if I want birds?", answer: "No — the seed heads are the food. Leave them standing through fall and winter." },
    ],
    extraSources: [aab(8, "American_Goldfinch", "American Goldfinch"), aab(9, "Tufted_Titmouse", "Tufted Titmouse"), FW(10)],
  }),
  collection({
    path: "/plants/nesting-plants", keyword: "nesting plants for birds", title: "Nesting Plants for Birds: Shrubs, Evergreens & Cavity Trees",
    description: "Nesting plants for birds: dense shrubs and vine tangles where cardinals and doves nest, evergreens for cover, and the birch and beech that cavity nesters use.",
    imageKey: "eastern-red-cedar", alt: "Eastern red cedar foliage and cones — one of the densest nesting plants for birds such as doves",
    plants: ["eastern-red-cedar", "american-holly", "winterberry", "american-elderberry", "canadian-serviceberry", "american-beech", "paper-birch"],
    intro: [
      "Nesting plants for birds come in two kinds: dense shrubs, evergreens and vine tangles for open-cup nesters, and trees with dead or rotten wood for the cavity nesters that excavate.",
      "Growing facts are from the Wildflower Center's Native Plant Database, the native-plant case is Audubon's [1], and nesting habits are from All About Birds [9][10][11][12].",
    ],
    sections: [
      { heading: "Nesting plants for birds that build cup nests", paragraphs: (n) => [
        `Northern Cardinals nest in a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up and hidden in dense foliage [9]; Mourning Doves nest amid dense foliage on the branch of an evergreen or vine [10]. Eastern red cedar provides nesting material and cover ${n("eastern-red-cedar")}, American holly provides cover and nesting sites ${n("american-holly")}, winterberry is listed for cover and nesting site ${n("winterberry")}, and elderberry and serviceberry grow into the dense multi-stemmed clumps cup nesters use ${n("american-elderberry")}${n("canadian-serviceberry")}.`,
      ]},
      { heading: "Trees for cavity nesters", paragraphs: (n) => [
        `Black-capped Chickadees often excavate their own cavity in dead snags or rotten branches, frequently alder or birch [11] — paper birch is the tree ${n("paper-birch")}. Tufted Titmice cannot excavate and use natural holes and old woodpecker holes [12]; American beech, listed as a nesting site, is long-lived and holds such cavities ${n("american-beech")}. Leave dead limbs and snags standing where it is safe.`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants do cardinals nest in?", answer: "Dense shrubs, saplings and vine tangles 1–15 feet up; native shrubs like elderberry, serviceberry and winterberry fit [9]." },
      { question: "What trees do chickadees nest in?", answer: `Rotten branches and snags, frequently alder or birch — paper birch on this site ${n("paper-birch")}[11].` },
    ],
    extraSources: [aab(9, "Northern_Cardinal", "Northern Cardinal"), aab(10, "Mourning_Dove", "Mourning Dove"), aab(11, "Black-capped_Chickadee", "Black-capped Chickadee"), aab(12, "Tufted_Titmouse", "Tufted Titmouse")],
  }),
  collection({
    path: "/plants/shelter-plants", keyword: "shelter plants for birds", title: "Shelter Plants for Birds: Evergreens & Winter Cover",
    description: "Shelter plants for birds: eastern red cedar and American holly for evergreen winter cover, winterberry, elderberry and buttonbush thickets, cover by the feeder.",
    imageKey: "american-holly", alt: "American holly foliage — among the best shelter plants for birds, giving evergreen winter cover",
    plants: ["eastern-red-cedar", "american-holly", "winterberry", "american-elderberry", "common-buttonbush", "virginia-creeper"],
    intro: [
      "Shelter plants for birds are the cover that makes a feeder usable: Project FeederWatch's placement advice is to put feeders close to natural cover such as trees or shrubs, which offer birds refuge from predators [8].",
      "Growing facts are from the Wildflower Center's Native Plant Database, the native-plant case is Audubon's [1], and placement guidance from FeederWatch [8].",
    ],
    sections: [
      { heading: "Shelter plants for birds: evergreens", paragraphs: (n) => [
        `Eastern red cedar is the most widely distributed eastern conifer and provides cover and nesting material, with berries that are a staple for many birds ${n("eastern-red-cedar")}. American holly, a pyramidal evergreen to 60 feet, provides cover and nesting sites as well as berries ${n("american-holly")}. Evergreens are the only cover that works in January.`,
      ]},
      { heading: "Thickets and vine cover", paragraphs: (n) => [
        `Winterberry is listed for cover and nesting site ${n("winterberry")}; elderberry grows fast into a hedge-forming clump ${n("american-elderberry")}; buttonbush makes a multi-stemmed thicket in wet ground ${n("common-buttonbush")}; Virginia creeper carpets fences and walls with foliage and winter fruit ${n("virginia-creeper")}. Place the feeder about ten feet from this cover — close enough to flee to, far enough that squirrels cannot jump from it [8].`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants give birds shelter in winter?", answer: `Evergreens: eastern red cedar and American holly, both listed for cover ${n("eastern-red-cedar")}${n("american-holly")}.` },
      { question: "How close should cover be to a feeder?", answer: "About ten feet: near enough for refuge from predators, far enough that squirrels cannot jump across [8]." },
    ],
    extraSources: [FW(8)],
  }),
];
for (const c of COLLECTIONS) plantEditorial[c.path] = c;

// ── Plants for a bird ─────────────────────────────────────────
function forBird(b: { slug: string; aabSlug: string; name: string; plural: string; keyword: string; title: string; description: string; alt: string; plants: string[]; intro: string[]; sections: { heading: string; paragraphs: (n: (slug: string) => string) => string[] }[]; faq: (n: (slug: string) => string) => { question: string; answer: string }[] }): EditorialContent {
  const ids = new Map(b.plants.map((s, i) => [s, i + 3]));
  const n = (slug: string) => `[${ids.get(slug)}]`;
  return {
    path: `/plants/for/${b.slug}`, keyword: b.keyword, title: b.title, description: b.description, image: bimg(b.slug, b.alt),
    intro: b.intro,
    sections: [...b.sections.map((s) => ({ heading: s.heading, paragraphs: s.paragraphs(n) })), { heading: "Why native plants first", paragraphs: [whyNative(2), lawnNote(2), nativeCheck(3, 2)] }],
    faq: b.faq(n),
    sources: [aab(1, b.aabSlug, b.name), AUDUBON(2), ...b.plants.map((s) => wf(ids.get(s)!, P[s].sci, P[s].sym))],
  };
}

const FOR_BIRDS = [
  forBird({
    slug: "american-goldfinch", aabSlug: "American_Goldfinch", name: "American Goldfinch", plural: "goldfinches", keyword: "plants for goldfinches",
    title: "Plants for Goldfinches: Native Seed Flowers, Thistle & Birch",
    description: "The best plants for goldfinches: sunflower, coneflower and black-eyed susan seed heads, native thistles and milkweed for late nests, birch and cedar for seed.",
    alt: "American goldfinch on a coneflower seed head — plants for goldfinches are seed plants",
    plants: ["common-sunflower", "purple-coneflower", "black-eyed-susan", "paper-birch", "eastern-red-cedar"],
    intro: [
      "Plants for goldfinches are seed plants: American Goldfinches eat seeds almost exclusively — composites such as sunflowers, thistle and asters, grasses, and trees like alder, birch, western red cedar and elm [1].",
      "All About Birds' own advice is to plant native thistles, other composite plants and native milkweed [1]; the profiles below add the Wildflower Center's growing facts [3–7] and Audubon's case for natives [2].",
    ],
    sections: [
      { heading: "Plants for goldfinches: composite seed flowers", paragraphs: (n) => [
        `Goldfinches balance on the seedheads of thistles and dandelions to pluck seeds [1], and the garden composites do the same job: common sunflower, whose seeds are sought by many wild birds ${n("common-sunflower")}; purple coneflower, with spiny seed heads on 2–4 foot stems ${n("purple-coneflower")}; and black-eyed susan, listed for seeds for granivorous birds ${n("black-eyed-susan")}. Leave every head standing until spring.`,
      ]},
      { heading: "Thistle, milkweed and the late nest", paragraphs: (n) => [
        `Goldfinches breed later than almost any other North American bird, waiting until June or July when milkweed, thistle and other plants have produced the fibrous seeds they weave into nests and feed to their young [1]. Native thistles and milkweed are therefore nest material as much as food. Among trees, goldfinches eat birch seed [1] — paper birch, used by songbirds and ground birds ${n("paper-birch")} — and the seed of red cedars; eastern red cedar also gives dense cover ${n("eastern-red-cedar")}.`,
        "At the feeder they prefer nyjer and sunflower and use almost any feeder type, even ones that sway [1].",
      ]},
    ],
    faq: (n) => [
      { question: "What plants attract goldfinches?", answer: `Native thistles, milkweed and composites — sunflower, coneflower, black-eyed susan — plus birch and cedar for seed [1]${n("common-sunflower")}${n("purple-coneflower")}.` },
      { question: "Why do goldfinches nest so late?", answer: "They wait for thistle and milkweed to set the fibrous seed they line nests with and feed their young — June or July [1]." },
    ],
  }),
  forBird({
    slug: "american-robin", aabSlug: "American_Robin", name: "American Robin", plural: "robins", keyword: "plants for american robins",
    title: "Plants for American Robins: Berries, Dogwood & Juniper",
    description: "The best plants for American robins: dogwood, juniper (red cedar), serviceberry, elderberry, winterberry, holly, mulberry and honeysuckle berries.",
    alt: "American robin — a bird of earthworms and fruit; plants for American robins mean berries",
    plants: ["flowering-dogwood", "eastern-red-cedar", "canadian-serviceberry", "american-elderberry", "winterberry", "american-holly", "red-mulberry", "trumpet-honeysuckle"],
    intro: [
      "Plants for American robins are fruit plants: robins eat an enormous variety of fruit year-round, including chokecherries, hawthorn, dogwood, sumac and juniper berries, alongside the earthworms and insects of spring and summer [1].",
      "The eight natives below all carry fruit robins take; growing facts are from the Wildflower Center [3–10], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for American robins: berries by season", paragraphs: (n) => [
        `Early summer: Canada serviceberry, an important food plant for birds ${n("canadian-serviceberry")}, and red mulberry ${n("red-mulberry")}. Summer: trumpet honeysuckle, whose fruits are listed as attracting American Robin ${n("trumpet-honeysuckle")}. Late summer and fall: American elderberry, relished by many bird species ${n("american-elderberry")}, and flowering dogwood — dogwood is on All About Birds' robin diet list [1] ${n("flowering-dogwood")}. Winter: winterberry ${n("winterberry")}, American holly ${n("american-holly")} and eastern red cedar — the juniper of the robin's diet, a staple for many birds ${n("eastern-red-cedar")}.`,
        "In winter many robins move to moist woods where berry-producing trees and shrubs are common, and those that stay north roost in trees and feed on fruit rather than on lawns [1] — winter berries are why a robin stays.",
      ]},
      { heading: "The lawn, the worms and the nest", paragraphs: () => [
        "Robins find worms by staring at the ground with the head cocked and eat more earthworms in the morning and more fruit later in the day [1]. Because they forage on lawns they are vulnerable to pesticide poisoning [1], so an unsprayed lawn is a robin plant too. They nest on horizontal branches hidden in or just below dense leaves, usually in the lower half of a tree [1] — dogwood's tiered branches and red cedar's density both serve.",
      ]},
    ],
    faq: (n) => [
      { question: "What berries attract robins?", answer: `Dogwood, juniper (eastern red cedar), serviceberry, elderberry, winterberry, holly, mulberry and honeysuckle [1]${n("flowering-dogwood")}${n("eastern-red-cedar")}.` },
      { question: "Do robins eat from bird feeders?", answer: "Rarely seed; they take fruit and mealworms from a tray, and earthworms from an unsprayed lawn [1]." },
    ],
  }),
  forBird({
    slug: "black-capped-chickadee", aabSlug: "Black-capped_Chickadee", name: "Black-capped Chickadee", plural: "chickadees", keyword: "plants for black-capped chickadees",
    title: "Plants for Black-capped Chickadees: Birch & Sunflower",
    description: "The best plants for black-capped chickadees: birch and alder for nest cavities, sunflower for seed, Virginia creeper and red cedar for winter food.",
    alt: "Black-capped chickadee — plants for black-capped chickadees supply caterpillars, seed and nest cavities",
    plants: ["paper-birch", "common-sunflower", "virginia-creeper", "eastern-red-cedar", "american-beech"],
    intro: [
      "Plants for black-capped chickadees have to feed an insect-eater: in spring, summer and fall, insects, spiders and other animal food make up 80–90 percent of the diet, and about half of it in winter, the rest seeds and berries [1].",
      "That makes native trees the first plant — Audubon's count is more than 6,000 caterpillars to raise one brood of chickadees [2]. Growing facts are from the Wildflower Center [3–7].",
    ],
    sections: [
      { heading: "Plants for black-capped chickadees: trees for nests and caterpillars", paragraphs: (n) => [
        `Chickadees nest in small natural cavities and old Downy Woodpecker holes, and often excavate their own cavity in dead snags or rotten branches, frequently alder or birch [1]. Paper birch, used by songbirds and ground birds and host to the Luna moth and Eastern Tiger Swallowtail, is the tree for both nest and caterpillars ${n("paper-birch")}; American beech offers nesting sites and hosts the Early Hairstreak ${n("american-beech")}. Leave dead limbs standing where safe — chickadees also sleep in cavities they excavate themselves [1].`,
      ]},
      { heading: "Seed and winter food", paragraphs: (n) => [
        `At feeders chickadees take mostly sunflower seeds, peanuts and suet [1]; common sunflower grown in the yard is the same seed on the stalk ${n("common-sunflower")}. Virginia creeper's fruit feeds chickadees through the winter — they head the Wildflower Center's list ${n("virginia-creeper")} — and eastern red cedar gives dense evergreen cover and berries ${n("eastern-red-cedar")}.`,
        "Chickadees hide seeds to eat later, each in a different spot, and remember thousands of hiding places [1], so a yard with seed heads and bark crevices works all winter.",
      ]},
    ],
    faq: (n) => [
      { question: "What trees do black-capped chickadees nest in?", answer: `Rotten branches and snags, frequently alder or birch; they excavate their own cavity [1]${n("paper-birch")}.` },
      { question: "What plants feed chickadees?", answer: `Native trees for caterpillars first, then sunflower for seed and Virginia creeper for winter fruit [1][2]${n("virginia-creeper")}.` },
    ],
  }),
  forBird({
    slug: "blue-jay", aabSlug: "Blue_Jay", name: "Blue Jay", plural: "blue jays", keyword: "plants for blue jays",
    title: "Plants for Blue Jays: Oaks, Beech & Native Fruit Trees",
    description: "The best plants for blue jays: oaks for acorns above all, American beech for nuts, native fruit — dogwood, mulberry, elderberry — and the trees jays nest in.",
    alt: "Blue jay — plants for blue jays start with oaks and nut trees",
    plants: ["american-beech", "flowering-dogwood", "red-mulberry", "american-elderberry", "eastern-red-cedar"],
    intro: [
      "Plants for blue jays begin with oaks: jays occur in all kinds of forests but especially near oaks, their diet is mostly acorns, nuts, seeds, grain and fruit, and All About Birds' advice is that planting oak trees will make acorns available for jays of the future [1].",
      "Oaks are not yet profiled on this site; the five natives below are. Growing facts are from the Wildflower Center [3–7], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for blue jays: nuts and mast", paragraphs: (n) => [
        `Stomach contents are about 22 percent insect over the year, with acorns, nuts, fruit and grain nearly all the rest [1]. American beech produces beechnuts among the most important wildlife foods and offers nesting sites and cover ${n("american-beech")}; Audubon's oak figure — over 500 caterpillar species on a native oak — is the reason to add an oak beside it [2]. Jays cache what they cannot eat, so a nut tree feeds them through winter.`,
      ]},
      { heading: "Fruit and nesting trees", paragraphs: (n) => [
        `Fruit is part of the diet [1]: flowering dogwood ${n("flowering-dogwood")}, red mulberry ${n("red-mulberry")} and American elderberry ${n("american-elderberry")} all fruit for birds. Jays build in the crotch or thick outer branches of a deciduous or coniferous tree, usually 10–25 feet up [1]; eastern red cedar provides that cover and nesting material ${n("eastern-red-cedar")}. Jays often drink from birdbaths, and at feeders prefer peanuts, sunflower and suet on a tray or hopper [1].`,
      ]},
    ],
    faq: (n) => [
      { question: "What is the best tree for blue jays?", answer: `An oak — All About Birds says planting oaks makes acorns available for future jays; beech nuts are the next best mast [1]${n("american-beech")}.` },
      { question: "Do blue jays eat berries?", answer: `Yes, fruit is part of the diet; dogwood, mulberry and elderberry all fruit for birds [1]${n("flowering-dogwood")}.` },
    ],
  }),
  forBird({
    slug: "downy-woodpecker", aabSlug: "Downy_Woodpecker", name: "Downy Woodpecker", plural: "downy woodpeckers", keyword: "plants for downy woodpeckers",
    title: "Plants for Downy Woodpeckers: Dead Wood, Birch & Berry Vines",
    description: "The best plants for downy woodpeckers: trees with dead limbs for nest stubs, birch and beech, Virginia creeper and dogwood for berries, and goldenrod galls.",
    alt: "Downy woodpecker — plants for downy woodpeckers mean dead wood, insects and winter berries",
    plants: ["paper-birch", "american-beech", "virginia-creeper", "flowering-dogwood", "eastern-red-cedar"],
    intro: [
      "Plants for downy woodpeckers are mostly about wood: the diet is mainly insects — beetle larvae inside wood or bark, ants and caterpillars — with about a quarter plant material such as berries, acorns and grain [1].",
      "Downies nest in dead trees or dead parts of live trees, typically a small stub about 7 inches across, softened by fungus [1] — so the best plant is often the one you do not cut down. Growing facts are from the Wildflower Center [3–7], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for downy woodpeckers: trees with insects and nest stubs", paragraphs: (n) => [
        `Downies live in open deciduous woodlands, orchards, parks and suburbs, and feed along fencerows and among tall weeds [1]. Paper birch, short-lived and prone to the bronze birch borer ${n("paper-birch")}, is exactly the kind of tree that produces the beetle larvae and soft dead stubs downies use; American beech is long-lived with nesting sites and cover ${n("american-beech")}. Both host caterpillars, the food nesting birds need most [2]. In late summer downies hammer plant galls on goldenrod for the fly larva inside [1] — leave a patch of goldenrod standing.`,
      ]},
      { heading: "Berries and cover", paragraphs: (n) => [
        `Virginia creeper's fruit feeds woodpeckers through the winter, by name on the Wildflower Center's list ${n("virginia-creeper")}; flowering dogwood's red fruit is listed for birds ${n("flowering-dogwood")}; eastern red cedar gives evergreen cover and a staple berry ${n("eastern-red-cedar")}. At feeders they prefer suet, then sunflower, peanuts and peanut butter [1].`,
      ]},
    ],
    faq: (n) => [
      { question: "What trees attract downy woodpeckers?", answer: `Trees with dead limbs or stubs — they nest in dead wood about 7 inches across — plus birch, beech and any native tree rich in insects [1]${n("paper-birch")}.` },
      { question: "Do downy woodpeckers eat berries?", answer: `Yes, about a quarter of the diet is plant material; Virginia creeper and dogwood are listed for birds [1]${n("virginia-creeper")}.` },
    ],
  }),
  forBird({
    slug: "house-finch", aabSlug: "House_Finch", name: "House Finch", plural: "house finches", keyword: "plants for house finches",
    title: "Plants for House Finches: Sunflower, Mulberry & Seed Heads",
    description: "The best plants for house finches: sunflower, coneflower and black-eyed susan seed heads, red mulberry and other fruit, honeysuckle berries.",
    alt: "Male house finch — plants for house finches are seed heads, buds and fruit",
    plants: ["common-sunflower", "purple-coneflower", "black-eyed-susan", "red-mulberry", "trumpet-honeysuckle", "eastern-red-cedar"],
    intro: [
      "Plants for house finches are seed, bud and fruit plants: House Finches eat almost exclusively plant material — seeds, buds and fruit including wild mustard, knotweed, thistle and mulberry, and orchard fruit — and feed their nestlings entirely plant foods, which is rare among birds [1].",
      "Growing facts below are from the Wildflower Center [3–8], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for house finches: seed heads", paragraphs: (n) => [
        `At feeders they take black-oil sunflower over striped, plus millet and milo [1]; in the garden, common sunflower's seeds are sought by many wild birds ${n("common-sunflower")}, and purple coneflower ${n("purple-coneflower")} and black-eyed susan ${n("black-eyed-susan")} hold composite seed into winter. Leave the heads standing. The red of a male house finch comes from pigments in its food during molt, so a yard rich in colored fruit and seed literally makes redder males [1].`,
      ]},
      { heading: "Fruit and nesting plants", paragraphs: (n) => [
        `Mulberry is on the All About Birds diet list [1]: red mulberry fruits for birds over a long season ${n("red-mulberry")}. Trumpet honeysuckle's berries attract Purple Finch and goldfinch ${n("trumpet-honeysuckle")}, finches with the same tastes. House finches nest in deciduous and coniferous trees and on buildings and hanging planters [1]; a small conifer such as eastern red cedar is a typical site ${n("eastern-red-cedar")}.`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants attract house finches?", answer: `Sunflower and other seed heads, mulberry and fruit, and small conifers to nest in [1]${n("common-sunflower")}${n("red-mulberry")}.` },
      { question: "Why are some male house finches yellow?", answer: "Red comes from pigments in the diet during molt; males on pigment-poor food come out orange or yellow [1]." },
    ],
  }),
  forBird({
    slug: "mourning-dove", aabSlug: "Mourning_Dove", name: "Mourning Dove", plural: "mourning doves", keyword: "plants for mourning doves",
    title: "Plants for Mourning Doves: Seed Plants & Dense Evergreens",
    description: "The best plants for mourning doves: sunflower and grass seed on open ground, plus the dense shrubs and evergreens — red cedar, holly — they nest in.",
    alt: "Mourning dove on the ground — plants for mourning doves are seed on open ground and evergreens to nest in",
    plants: ["common-sunflower", "eastern-red-cedar", "american-holly", "black-eyed-susan"],
    intro: [
      "Plants for mourning doves serve two needs: seed on open ground — seeds are 99 percent of the diet, from cultivated grains and wild grasses to weeds and herbs [1] — and dense foliage to nest in.",
      "All About Birds' backyard advice is to plant dense shrubs or evergreens for nesting sites [1]; growing facts are from the Wildflower Center [3–6], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for mourning doves: seed on the ground", paragraphs: (n) => [
        `Doves feed on the ground in grasslands, fields, backyards and roadsides, pecking or pushing aside litter, and a dove eats roughly 12 to 20 percent of its body weight in seed a day [1]. Common sunflower, whose seeds are sought by many wild birds and which gives cover mixed with other annuals ${n("common-sunflower")}, drops seed doves clean up; black-eyed susan's seed for granivorous birds does the same on a smaller scale ${n("black-eyed-susan")}. Native grasses left to seed, and a patch of bare ground, complete the picture.`,
      ]},
      { heading: "Evergreens to nest in", paragraphs: (n) => [
        `Doves nest amid dense foliage on the branch of an evergreen, orchard tree or vine, and a pair can raise up to six broods a year [1]. Eastern red cedar provides nesting material and cover ${n("eastern-red-cedar")}; American holly provides cover and nesting sites ${n("american-holly")}. Keep cats indoors — birds that spend much of their time on the ground are particularly vulnerable to prowling cats [1].`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants attract mourning doves?", answer: `Seed plants on open ground — sunflower, grasses — and dense evergreens like red cedar and holly to nest in [1]${n("eastern-red-cedar")}.` },
      { question: "Where do mourning doves nest?", answer: "Amid dense foliage in evergreens, orchard trees and vines, and readily on gutters and eaves; up to six broods a year [1]." },
    ],
  }),
  forBird({
    slug: "northern-cardinal", aabSlug: "Northern_Cardinal", name: "Northern Cardinal", plural: "cardinals", keyword: "plants for northern cardinals",
    title: "Plants for Northern Cardinals: Dogwood, Mulberry, Shrubs",
    description: "The best plants for northern cardinals: dogwood, mulberry, elderberry and serviceberry for fruit, sunflower for seed, and dense shrubs and vines to nest in.",
    alt: "Male northern cardinal in a shrub — plants for northern cardinals mean fruit, seed and dense cover",
    plants: ["flowering-dogwood", "red-mulberry", "american-elderberry", "canadian-serviceberry", "common-sunflower", "winterberry", "eastern-red-cedar"],
    intro: [
      "Plants for northern cardinals come straight from their diet: cardinals eat mainly seeds and fruit, and All About Birds' wild-food list includes dogwood, wild grape, mulberry, hackberry, blackberry and sumac [1].",
      "All About Birds' backyard tip is that leaving undergrowth in the yard or around its edges can bring a nesting pair [1]; growing facts are from the Wildflower Center [3–9], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for northern cardinals: fruit and seed", paragraphs: (n) => [
        `Two plants on the All About Birds list are profiled here: flowering dogwood, with red fruit for birds ${n("flowering-dogwood")}, and red mulberry ${n("red-mulberry")}. American elderberry's berries are relished by many bird species ${n("american-elderberry")}, Canada serviceberry is an important food plant for birds ${n("canadian-serviceberry")}, and winterberry holds fruit into winter ${n("winterberry")}. For seed, common sunflower ${n("common-sunflower")} is the plant behind black oil sunflower, the feeder seed cardinals particularly use [1].`,
      ]},
      { heading: "Dense cover for the nest", paragraphs: (n) => [
        `Cardinals live in dense shrubby areas — forest edges, hedgerows, thickets, ornamental landscaping — and nest in a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up, hidden in dense foliage [1]. Elderberry grows fast into a hedge ${n("american-elderberry")}, serviceberry forms multi-trunked clumps ${n("canadian-serviceberry")}, and eastern red cedar gives evergreen density and nesting material ${n("eastern-red-cedar")}. Cardinals also feed their nestlings mostly insects [1], which native plants supply [2].`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants attract cardinals?", answer: `Fruit plants on their diet list — dogwood, mulberry — plus elderberry, serviceberry, sunflower, and dense shrubs to nest in [1]${n("flowering-dogwood")}${n("red-mulberry")}.` },
      { question: "Where do cardinals nest?", answer: "In a fork of small branches in a sapling, shrub or vine tangle, 1–15 feet up, hidden in dense foliage [1]." },
    ],
  }),
  forBird({
    slug: "tufted-titmouse", aabSlug: "Tufted_Titmouse", name: "Tufted Titmouse", plural: "titmice", keyword: "plants for tufted titmice",
    title: "Plants for Tufted Titmice: Beech, Oaks & Old Trees",
    description: "The best plants for tufted titmice: beech and oaks for nuts, sunflower for the large seeds they hoard, canopy trees with cavities to nest in.",
    alt: "Tufted titmouse — plants for tufted titmice supply nuts, large seeds and nest cavities",
    plants: ["american-beech", "common-sunflower", "paper-birch", "virginia-creeper", "eastern-red-cedar"],
    intro: [
      "Plants for tufted titmice split by season: in summer titmice eat mainly insects — caterpillars, beetles, ants, wasps — and otherwise seeds, nuts and berries including acorns and beech nuts, always choosing the largest seeds they can [1].",
      "Titmice live in deciduous or mixed woods with a dense canopy and many tree species [1], so the plant list is mostly trees. Growing facts are from the Wildflower Center [3–7], the native-plant case is Audubon's [2].",
    ],
    sections: [
      { heading: "Plants for tufted titmice: nut trees and big seeds", paragraphs: (n) => [
        `American beech, whose nuts are among the most important wildlife foods ${n("american-beech")}, is the titmouse tree on this site; an oak beside it supplies the acorns [1] and, per Audubon, over 500 caterpillar species [2]. Titmice prefer sunflower seeds at feeders and hoard shelled seeds in bark crevices within about 130 feet [1] — common sunflower grown in the yard ${n("common-sunflower")} feeds the same habit, and rough-barked trees hold the cache.`,
      ]},
      { heading: "Cavities and cover", paragraphs: (n) => [
        `Titmice nest in cavities but cannot excavate their own, using natural holes and old woodpecker holes, and their dependence on dead wood is a reason to leave dead trees standing where it is safe [1]. Paper birch rots into cavities woodpeckers open ${n("paper-birch")}; eastern red cedar gives winter cover ${n("eastern-red-cedar")}; Virginia creeper's winter fruit is taken by nuthatches and chickadees, the titmouse's flock-mates ${n("virginia-creeper")}. A nest box with a predator guard, put up before spring, substitutes for the missing snag [1].`,
      ]},
    ],
    faq: (n) => [
      { question: "What plants attract tufted titmice?", answer: `Nut trees — beech and oak — plus sunflower for large seeds and old trees or a nest box for cavities [1]${n("american-beech")}.` },
      { question: "Do tufted titmice use nest boxes?", answer: "Yes — they cannot excavate their own cavity, so a box with a predator guard put up well before the breeding season attracts a pair [1]." },
    ],
  }),
];
for (const b of FOR_BIRDS) plantEditorial[b.path] = b;
