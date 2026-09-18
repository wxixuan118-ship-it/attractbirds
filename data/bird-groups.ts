/**
 * Colloquial bird groups used for "{group} in {state}" pages.
 *
 * Each group maps to one or more taxonomic families on the GBIF backbone,
 * optionally narrowed by a common-name pattern (e.g. "jays" are the Corvidae
 * whose name contains "Jay"). The fetch script uses `families` to pull every
 * species of those families recorded in a state; the page uses `include` /
 * `exclude` to keep only the birds a reader means by the group name.
 */
export type BirdGroup = {
  slug: string;
  /** Plural, lower-case, as people search it: "hummingbirds". */
  name: string;
  singular: string;
  families: string[];
  /** Keep only species whose common name matches (case-insensitive). */
  include?: RegExp;
  /** Drop species whose common name matches. */
  exclude?: RegExp;
  /** One-paragraph, state-independent description used in the page intro. Keep to widely known, non-numeric facts. */
  intro: string;
  /** What a backyard reader can do; state-independent, non-numeric. */
  backyard: string;
};

export const BIRD_GROUPS: BirdGroup[] = [
  {
    slug: "hummingbirds", name: "hummingbirds", singular: "hummingbird", families: ["Trochilidae"],
    intro: "Hummingbirds are the smallest birds in North America and the only ones that routinely hover. They feed on flower nectar and small insects, and almost every species is migratory, so which hummingbirds you see — and when — depends heavily on where you live.",
    backyard: "A clean nectar feeder (plain sugar water, no dye) and native tubular flowers are the two things that reliably bring hummingbirds into a yard. Put feeders up a couple of weeks before the first arrivals listed below and keep them up until the last departures.",
  },
  {
    slug: "woodpeckers", name: "woodpeckers", singular: "woodpecker", families: ["Picidae"],
    intro: "Woodpeckers are the birds you hear before you see: drumming on trunks, excavating nest cavities, and calling loudly from the canopy. Most are year-round residents, and the holes they leave behind become homes for owls, bluebirds, and other cavity nesters.",
    backyard: "Suet is the food that brings woodpeckers to feeders, with peanuts and black-oil sunflower seed close behind. Leaving a dead tree or large dead limb standing, where it is safe to do so, is the single most effective habitat step.",
  },
  {
    slug: "owls", name: "owls", singular: "owl", families: ["Strigidae", "Tytonidae"],
    intro: "Owls are mostly nocturnal hunters, so they are far more often heard than seen; learning the calls is how most people find them. Several species nest in tree cavities or old woodpecker holes, and a few use open nest boxes.",
    backyard: "You cannot feed owls, but you can host them: mature trees, a nest box of the right dimensions for the local species, and a yard without rodenticide (which poisons the owls that eat the rodents) are what matter.",
  },
  {
    slug: "hawks", name: "hawks", singular: "hawk", families: ["Accipitridae"], exclude: /Eagle|Kite/i,
    intro: "Hawks range from the crow-sized accipiters that ambush songbirds at feeders to the broad-winged soaring buteos you see circling over highways. Many are year-round residents; others pass through in large numbers during spring and fall migration.",
    backyard: "A hawk visiting a feeder is part of a healthy yard, not a problem to solve. Dense shrubs and brush piles within a few feet of feeders give small birds cover; if a hawk keys in on your feeder, taking it down for a few days usually moves the hawk along.",
  },
  {
    slug: "warblers", name: "warblers", singular: "warbler", families: ["Parulidae"],
    intro: "Wood-warblers are small, active, often brightly colored insect-eaters, and for many birders they define spring migration. A few species winter in the southern states; most breed in the north and pass through in April–May and again in September–October.",
    backyard: "Warblers rarely visit seed feeders. Native trees and shrubs that host insects, a shallow moving-water feature, and no pesticides are what bring them into a yard, especially during migration.",
  },
  {
    slug: "sparrows", name: "sparrows", singular: "sparrow", families: ["Passerellidae", "Passeridae"], exclude: /Towhee|Junco/i,
    intro: "Sparrows are the streaky brown birds that spend most of their time on or near the ground. The group mixes year-round residents, winter visitors from the north, and one introduced species — the House Sparrow — that lives almost entirely around people.",
    backyard: "Sparrows feed on the ground, so scatter millet or cracked corn under a feeder or on a low platform rather than in a hanging tube. Brush piles and unmown corners give them the cover they need to stay.",
  },
  {
    slug: "wrens", name: "wrens", singular: "wren", families: ["Troglodytidae"],
    intro: "Wrens are small, brown, energetic birds with cocked tails and remarkably loud songs for their size. Some are year-round residents that sing all winter; others arrive in spring and nest in cavities, boxes, and any sheltered nook they can find.",
    backyard: "Wrens are insect-eaters that mostly ignore seed, though some take suet and mealworms. A small-holed nest box, brush piles, and leaving leaf litter under shrubs bring them in.",
  },
  {
    slug: "finches", name: "finches", singular: "finch", families: ["Fringillidae"],
    intro: "Finches are the seed specialists of the feeder: goldfinches, House Finches, siskins, grosbeaks, and crossbills. Some are among the most common backyard birds; others are irruptive, appearing in large numbers one winter and vanishing the next.",
    backyard: "Nyjer (thistle) in a mesh or tube feeder for the small finches, black-oil sunflower for the larger ones. Keep feeders clean and dry — finches are especially prone to eye disease spread at dirty feeders.",
  },
  {
    slug: "doves", name: "doves", singular: "dove", families: ["Columbidae"],
    intro: "Doves and pigeons are the plump, small-headed birds that walk rather than hop and feed almost entirely on seeds. The Mourning Dove is among the most widespread birds in the country; several other species are regional, and the Eurasian Collared-Dove and Rock Pigeon are introduced.",
    backyard: "Doves feed on the ground and on platform feeders, taking millet, cracked corn, and sunflower. A shallow bird bath matters as much as food; doves drink more than most songbirds.",
  },
  {
    slug: "ducks", name: "ducks", singular: "duck", families: ["Anatidae"], include: /Duck|Teal|Mallard|Wigeon|Gadwall|Pintail|Shoveler|Scaup|Merganser|Bufflehead|Goldeneye|Canvasback|Redhead|Scoter|Eider|Whistling/i,
    intro: "Ducks divide into dabblers, which tip up in shallow water, and divers, which disappear underwater for their food. Most species breed far to the north and are winter visitors across much of the country, so the best duck-watching is usually from late fall through early spring.",
    backyard: "Unless you have a pond, ducks are birds to go and see rather than attract. Local reservoirs, sewage ponds, and coastal inlets in winter are where the variety is.",
  },
  {
    slug: "herons", name: "herons", singular: "heron", families: ["Ardeidae"],
    intro: "Herons, egrets, and bitterns are the long-legged wading birds that stalk fish and frogs in shallow water. The large species are conspicuous year-round in the South; farther north, most arrive in spring and leave when the water freezes.",
    backyard: "A garden pond with fish will attract the Great Blue Heron whether you want it or not. Otherwise, herons are birds of marshes, lakeshores, and estuaries — look for them at dawn and dusk when they feed most actively.",
  },
  {
    slug: "jays", name: "jays", singular: "jay", families: ["Corvidae"], include: /Jay/i,
    intro: "Jays are the loud, intelligent, boldly colored members of the crow family. The Blue Jay dominates the East; the West has its own set — scrub-jays, Steller's Jay, Pinyon Jay, and the Canada Jay of the high forests — and the two sides overlap only along the Rockies.",
    backyard: "Peanuts in the shell are the classic jay food; whole corn and sunflower work too. Jays cache what they cannot eat, so a platform feeder will empty faster than you expect.",
  },
  {
    slug: "chickadees", name: "chickadees", singular: "chickadee", families: ["Paridae"], include: /Chickadee/i,
    intro: "Chickadees are the small, round, black-capped birds that visit feeders all winter and lead the mixed flocks of nuthatches and kinglets moving through the woods. Each region has its own species, and their ranges barely overlap.",
    backyard: "Black-oil sunflower seed, suet, and a nest box with a small entrance hole are the three things chickadees want. They are among the first birds to find a new feeder and among the tamest at it.",
  },
  {
    slug: "orioles", name: "orioles", singular: "oriole", families: ["Icteridae"], include: /Oriole/i,
    intro: "Orioles are the brilliant orange-and-black (or yellow-and-black) blackbird relatives that weave hanging pouch nests high in shade trees. They are summer birds across most of the country, arriving in spring and leaving by early fall.",
    backyard: "Orange halves, grape jelly in small amounts, and a nectar feeder with larger ports bring orioles in during spring arrival. Once nesting, they switch mostly to insects and fruit from native trees.",
  },
  {
    slug: "magpies", name: "magpies", singular: "magpie", families: ["Corvidae"], include: /Magpie/i,
    intro: "Magpies are the long-tailed black-and-white members of the crow family. The Black-billed Magpie is a common bird across the West and northern Plains but essentially absent from the East, which is why so many people ask whether magpies occur in their state.",
    backyard: "Where magpies live, they need no encouragement: they take suet, pet food, scraps, and anything else left out. Where they do not live, no feeder will bring one.",
  },
  {
    slug: "eagles", name: "eagles", singular: "eagle", families: ["Accipitridae"], include: /Eagle/i,
    intro: "Two eagles occur regularly in the United States: the Bald Eagle, which nests near open water and has recovered strongly from its mid-twentieth-century decline, and the Golden Eagle of western mountains and open country. Both are among the largest raptors on the continent.",
    backyard: "Eagles are birds to go and see. Bald Eagles concentrate below dams and on open water in winter and at nest sites in late winter and spring; most states now have well-known nest-viewing spots.",
  },
];

export const BIRD_GROUP_BY_SLUG: Record<string, BirdGroup> = Object.fromEntries(BIRD_GROUPS.map((g) => [g.slug, g]));

/** All families the fetch script needs, deduplicated. */
export const GROUP_FAMILIES = Array.from(new Set(BIRD_GROUPS.flatMap((g) => g.families)));

/** Does this species (by family + common name) belong to the group? */
export function speciesInGroup(group: BirdGroup, family: string, commonName: string): boolean {
  if (!group.families.includes(family)) return false;
  if (group.include && !group.include.test(commonName)) return false;
  if (group.exclude && group.exclude.test(commonName)) return false;
  return true;
}
