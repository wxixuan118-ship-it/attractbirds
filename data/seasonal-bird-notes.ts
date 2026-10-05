/**
 * Season-specific natural history for the backyard species × season pages that
 * have no full editorial entry. `life` is what the bird is doing that season;
 * `feed` is the practical feeding note; `aab` is the All About Birds guide slug
 * the facts are checked against.
 */
export type SeasonNote = { life: string; feed: string };

export const AAB_SLUG: Record<string, string> = {
  "american-goldfinch": "American_Goldfinch",
  "american-robin": "American_Robin",
  "black-capped-chickadee": "Black-capped_Chickadee",
  "blue-jay": "Blue_Jay",
  "downy-woodpecker": "Downy_Woodpecker",
  "house-finch": "House_Finch",
  "mourning-dove": "Mourning_Dove",
  "northern-cardinal": "Northern_Cardinal",
  "ruby-throated-hummingbird": "Ruby-throated_Hummingbird",
  "tufted-titmouse": "Tufted_Titmouse",
};

export const SEASON_NOTES: Record<string, Partial<Record<"spring" | "summer" | "fall" | "winter", SeasonNote>>> = {
  "american-goldfinch": {
    spring: {
      life: "Males molt out of their dull winter feathers between March and May and turn bright lemon-yellow with a black cap, so the same birds that looked drab all winter suddenly stand out. Winter flocks loosen, but goldfinches do not nest yet — they are among the latest-nesting songbirds in North America.",
      feed: "Keep nyjer and sunflower chips fresh as the flocks thin out, and let dandelions and early composites go to seed — goldfinches pick the seed heads clean in May.",
    },
    summer: {
      life: "Goldfinches finally nest in July and August, timing it to the peak of thistle and milkweed seed: they line the nest with plant down and feed their young almost entirely on regurgitated seed, which is unusual among songbirds.",
      feed: "This is peak season at nyjer feeders, often with whole families arriving in late summer. Leave coneflower, sunflower and native thistle heads standing rather than deadheading them.",
    },
    fall: {
      life: "In September and October goldfinches molt again, males trading the bright yellow for olive-brown with buffy wing bars. Northern birds drift south and gather into flocks that roam weedy fields and gardens.",
      feed: "Standing seed heads of coneflower, black-eyed Susan and sunflower carry them through fall; a nyjer or sunflower-chip tube keeps the flock coming back as natural seed runs out.",
    },
    winter: {
      life: "Winter goldfinches are so muted that many people think the birds have left; they are still here in drab olive-brown, traveling in flocks and tolerating cold well across most of the lower 48 states.",
      feed: "Nyjer and sunflower chips in a tube or mesh feeder are the mainstay. Keep the seed dry — wet nyjer clumps and spoils quickly — and clean feeders often while flocks are large.",
    },
  },
  "american-robin": {
    spring: {
      life: "Robins singing before dawn are one of the first signs of spring. As the ground thaws they work lawns for earthworms, and from April pairs build mud-lined cup nests in trees, shrubs and on ledges, often raising two or three broods.",
      feed: "Robins rarely eat seed. A shallow bird bath, a patch of lawn free of pesticides for earthworms, and a little mud for nest building help more than any feeder.",
    },
    summer: {
      life: "Summer robins are busy feeding nestlings worms and insects, then switching the family to ripe fruit. Speckled fledglings spend several days on the ground while the parents keep feeding them — they are not abandoned.",
      feed: "Fruiting plants such as serviceberry, mulberry, dogwood and elderberry are the best summer food; keep the bird bath clean and full in hot weather.",
    },
    fall: {
      life: "In fall robins shift almost entirely to fruit and gather into large flocks that roost together at night. Some move south, but many stay in the same region and simply stop behaving like lawn birds.",
      feed: "Berry-producing shrubs and trees — dogwood, winterberry, holly, cedar — feed fall flocks; robins may take chopped fruit or mealworms on a platform.",
    },
    winter: {
      life: "Many robins spend the winter far north of where people expect them, but they leave lawns, roam in flocks, and roost in wooded areas, so they seem to vanish. They live on berries until worms are available again.",
      feed: "Seed feeders will not attract them. Winterberry, holly, juniper and crabapple fruit, plus open water from a heated bird bath, are what bring winter robins into a yard.",
    },
  },
  "black-capped-chickadee": {
    fall: {
      life: "In fall chickadees join mixed flocks with titmice, nuthatches and kinglets and start caching food — hiding seeds one at a time in bark and crevices and remembering the locations for weeks.",
      feed: "Black-oil sunflower is the favorite; a chickadee takes one seed, flies off to eat or hide it, and returns. Hulled peanuts and suet start to matter as insects disappear.",
    },
    winter: {
      life: "To survive cold nights a chickadee can drop its body temperature by roughly 10–12°C in a controlled hypothermia, shiver to generate heat, and roost in tree cavities. Small winter flocks with a set pecking order defend a feeding territory.",
      feed: "High-fat foods — suet, black-oil sunflower and peanuts — are the core winter diet at feeders; a nest box or roost box gives shelter on the coldest nights.",
    },
  },
  "blue-jay": {
    spring: {
      life: "Some Blue Jays migrate and can be seen moving in loose flocks along lakeshores in May, while others stay put. Around the nest pairs become quiet and secretive, quite unlike their noisy winter behavior.",
      feed: "Peanuts and sunflower on a platform still draw them, but in spring jays also eat many insects; mature oaks and beeches near the yard matter more than any feeder.",
    },
    summer: {
      life: "Blue Jays raise one brood a year in a cup nest high in a tree. Young jays leave the nest noisy and clumsy and follow their parents for weeks, begging loudly.",
      feed: "Insects make up a bigger part of the summer diet; offer water and a modest amount of peanuts, and avoid pesticides that remove caterpillars.",
    },
    fall: {
      life: "Fall is acorn season: a single Blue Jay can carry several acorns at once in its throat and bury thousands over the autumn, planting oaks in the process. Visible migration flocks pass in September and October.",
      feed: "Whole peanuts in the shell, sunflower seed and acorns from native oaks keep jays busy caching; a platform feeder suits their size.",
    },
    winter: {
      life: "Whether a Blue Jay migrates varies from bird to bird and year to year, so winter numbers change a lot between years. Wintering jays are bold at feeders and often announce hawks to every other bird in the yard.",
      feed: "Peanuts, sunflower and suet on a sturdy platform or hopper are their winter staples; jays will empty a feeder quickly, so offer a separate peanut feeder to spare the small birds' seed.",
    },
  },
  "downy-woodpecker": {
    spring: {
      life: "Late winter into spring is drumming season: Downy Woodpeckers hammer on resonant branches and even metal gutters to claim territory and attract a mate, then excavate a fresh nest cavity in dead wood.",
      feed: "Suet can stay out in cool spring weather; leaving dead branches and snags where it is safe gives Downies nest sites and insect food.",
    },
    summer: {
      life: "Adults bring fledglings to suet feeders in early summer and teach them to forage; the young have a reddish patch on the crown that fools many people into thinking they are a different species.",
      feed: "Switch to no-melt suet dough in hot weather or offer suet only in shade; native plants with insect galls, such as goldenrod, are natural summer food.",
    },
    fall: {
      life: "In fall Downies dig separate roost holes for winter nights and begin traveling with chickadee and titmouse flocks.",
      feed: "Put suet feeders back out as nights cool; Downies also take peanuts and black-oil sunflower.",
    },
    winter: {
      life: "Winter Downies forage with mixed flocks; males and females split the work, with males feeding on small branches and females on larger limbs and trunks. They sleep in cavities to stay out of the wind.",
      feed: "Suet is the single best winter food for Downy Woodpeckers, with hulled peanuts and sunflower as backups. A suet feeder with a tail prop suits how they feed.",
    },
  },
  "house-finch": {
    spring: {
      life: "House Finches start nesting early, sometimes in March, in hanging baskets, ivy, porch lights and dense shrubs. A male's red comes from carotenoid pigments in his food, so the reddest males are the best-fed and the most attractive to females.",
      feed: "Black-oil sunflower in a tube or hopper is their favorite; keep feeders clean, because House Finches are prone to eye disease.",
    },
    summer: {
      life: "House Finches may raise several broods over a long season and, unusually for songbirds, feed their nestlings almost entirely on plant food rather than insects.",
      feed: "Sunflower demand stays high all summer; native seed plants and a clean bird bath help families with fledglings.",
    },
    fall: {
      life: "After nesting, House Finches gather into flocks that move between feeders and weedy areas. Mycoplasmal conjunctivitis — red, swollen, crusty eyes — becomes more common as birds crowd together.",
      feed: "Offer sunflower but wash feeders every week or two, and take them down for a couple of weeks if you see a finch with swollen eyes.",
    },
    winter: {
      life: "Winter flocks of House Finches can dominate tube feeders. Eye disease peaks in fall and winter, when flocks share feeders most closely.",
      feed: "Black-oil sunflower and hulled seed keep them coming; spreading food across several clean feeders reduces crowding and the spread of disease.",
    },
  },
  "mourning-dove": {
    spring: {
      life: "The soft cooing of Mourning Doves is a spring sound across almost all of the United States. Pairs build flimsy stick platforms in trees, shrubs, gutters and planters and can start nesting very early in the year.",
      feed: "Doves feed on the ground: scatter millet or cracked corn in the open, or use a low platform feeder away from cover where cats can hide.",
    },
    summer: {
      life: "Mourning Doves can raise up to six broods a year in warm areas. Both parents feed the young 'crop milk', a protein-rich secretion, for the first days after hatching.",
      feed: "Millet, cracked corn and sunflower on the ground or a platform, plus water; keep the feeding area clean to prevent disease spreading among doves.",
    },
    fall: {
      life: "In fall doves gather into flocks and many northern birds move south. Mourning Doves are also a hunted game bird in most states in early fall.",
      feed: "Ground feeding continues: millet and cracked corn in the open, raked up regularly so old seed and hulls do not build up.",
    },
    winter: {
      life: "Winter doves form flocks that sit puffed up on wires and branches and feed together on the ground below feeders. In the far north their bare feet are vulnerable to frostbite in extreme cold.",
      feed: "Scatter millet, cracked corn or sunflower on cleared ground or a platform; nearby conifers give roost cover, and a heated bird bath provides water when everything else is frozen.",
    },
  },
  "northern-cardinal": {
    spring: {
      life: "Male cardinals start singing in late winter, and in spring you may see a male feed a female seed beak-to-beak — part of courtship. Pairs nest in dense shrubs and vine tangles, and territorial birds sometimes fight their own reflections in windows.",
      feed: "Sunflower and safflower on a hopper or platform; plant dense native shrubs for nesting and mark windows where a cardinal keeps attacking its reflection.",
    },
    winter: {
      life: "Cardinals do not migrate, and in winter they gather into loose flocks that can number a dozen or more. They are most active at feeders early in the morning and at dusk.",
      feed: "Black-oil sunflower and safflower on a broad, stable feeder; dense evergreen shrubs nearby give the shelter cardinals need on cold nights.",
    },
  },
  "ruby-throated-hummingbird": {
    spring: {
      life: "Ruby-throated Hummingbirds return from Central America in spring, many after flying nonstop across the Gulf of Mexico. Males arrive first, reaching the Gulf Coast in March and the northern states by May, following the flowering of early nectar plants.",
      feed: "Hang clean nectar feeders (one part white sugar to four parts water, no dye) about two weeks before they usually arrive in your area, and plant early natives such as red buckeye and columbine.",
    },
    fall: {
      life: "Fall migration runs from August into October. Before crossing the Gulf a hummingbird can nearly double its weight in fat. Leaving feeders up does not stop them from migrating — day length triggers it.",
      feed: "Keep feeders fresh until about two weeks after the last one passes through; late migrants refuel on them, and late-blooming salvias and jewelweed help too.",
    },
    winter: {
      life: "Ruby-throated Hummingbirds spend the winter in southern Mexico and Central America, with a few on the Gulf Coast and in southern Florida. A hummingbird seen in the East in winter is more likely a western species such as a Rufous Hummingbird — worth photographing and reporting to eBird.",
      feed: "In most of the United States there is nothing to feed in winter. Along the Gulf Coast some people keep one clean feeder up for wintering western hummingbirds, changing the nectar often and keeping it from freezing.",
    },
  },
  "tufted-titmouse": {
    summer: {
      life: "Titmice nest in old woodpecker holes and nest boxes, lining them with soft hair — sometimes pulled from living animals. Young often stay with their parents into the next year and occasionally help raise the following brood.",
      feed: "Insects and caterpillars feed summer broods; sunflower, peanuts and a nest box with a 1¼-inch hole support them in the yard.",
    },
    fall: {
      life: "In fall titmice cache seeds, usually close to the feeder, shelling them first and tucking them into bark. They often lead the mixed flocks of chickadees, nuthatches and woodpeckers that move through yards.",
      feed: "Black-oil sunflower and hulled peanuts; a titmouse takes one seed at a time, so a steady supply in a hopper or tube works well.",
    },
    winter: {
      life: "Titmice are year-round residents and the core of many winter mixed flocks. Their range has been expanding northward over the last century, helped by backyard feeding and milder winters.",
      feed: "Sunflower, peanuts and suet sustain titmice through winter; a roost box or old nest box gives shelter on cold nights.",
    },
  },
};
