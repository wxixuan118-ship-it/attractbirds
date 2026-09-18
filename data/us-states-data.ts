/**
 * U.S. state metadata for the Birds by Location module.
 *
 * Each entry includes:
 *  - slug, name, abbreviation
 *  - approximate lat / lng centroid (for SEO microdata and future map overlays)
 *  - region grouping (Northeast / Midwest / South / West)
 *  - flyway (Atlantic / Mississippi / Central / Pacific)
 *  - gridRow / gridCol for the tile-grid map component
 *  - popularCities, topBirdingSpots, habitats for landing & state pages
 *  - estimatedSpeciesCount for SEO copy ("California is home to more than 660 bird species")
 *
 * Grid positions approximate geographic arrangement so the tile map
 * visually resembles the continental U.S.
 */

export type USState = {
  slug: string;
  name: string;
  abbr: string;
  lat: number;
  lng: number;
  region: "Northeast" | "Midwest" | "South" | "West";
  flyway: "Atlantic" | "Mississippi" | "Central" | "Pacific";
  gridRow: number;
  gridCol: number;
  popularCities: string[];
  topBirdingSpots: { name: string; blurb: string }[];
  habitats: string[];
  speciesCount: number;
  summary: string;
};

export const US_STATES_DATA: USState[] = [
  // ── West ──────────────────────────────────────────────────────
  {
    slug: "california", name: "California", abbr: "CA", lat: 36.78, lng: -119.42, region: "West", flyway: "Pacific",
    gridRow: 5, gridCol: 1,
    popularCities: ["Los Angeles", "San Diego", "San Francisco", "Sacramento", "Fresno", "San Jose"],
    // Facts sourced in data/state-content/california.ts.
    topBirdingSpots: [
      { name: "Point Reyes National Seashore", blurb: "With nearly 490 species recorded — over 50% of the bird species in North America — Point Reyes claims the greatest avian diversity of any U.S. national park." },
      { name: "Sonny Bono Salton Sea National Wildlife Refuge", blurb: "Established in 1930; over 400 species recorded and one of the most important nesting sites and stopovers along the Pacific Flyway." },
      { name: "Yosemite National Park", blurb: "262 documented bird species across an elevation gradient from 2,000 feet to more than 13,000 feet." },
      { name: "Channel Islands National Park", blurb: "Santa Cruz Island is the only place in the world to see the Island Scrub-Jay, North America's only island-endemic bird." },
    ],
    habitats: ["Coastal", "Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 696,
    summary: "California's extraordinary habitat range—from Pacific coastline to Sierra peaks to Mojave Desert—supports the highest bird diversity of any U.S. state.",
  },
  {
    slug: "oregon", name: "Oregon", abbr: "OR", lat: 44.57, lng: -122.32, region: "West", flyway: "Pacific",
    gridRow: 4, gridCol: 2,
    popularCities: ["Portland", "Salem", "Eugene", "Bend", "Medford"],
    // Facts sourced in data/state-content/oregon.ts.
    topBirdingSpots: [
      { name: "Malheur National Wildlife Refuge", blurb: "Over 187,000 acres, established in 1908; disproportionately important as a stop along the Pacific Flyway and as a resting, breeding, and nesting area for hundreds of thousands of migratory birds." },
      { name: "Sauvie Island Wildlife Area", blurb: "11,643 acres 20 minutes from downtown Portland with at least 275 species of birds; September to March for waterfowl and Sandhill Cranes." },
      { name: "Three Arch Rocks National Wildlife Refuge", blurb: "The first National Wildlife Refuge west of the Mississippi (1907) and the largest and most diverse seabird colony in Oregon, historically with over 200,000 Common Murres in the breeding season." },
      { name: "Lower Klamath National Wildlife Refuge", blurb: "Established by President Theodore Roosevelt in 1908 as the nation's first waterfowl refuge, straddling southern Oregon and northeastern California." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Desert", "Urban"],
    speciesCount: 550,
    summary: "Oregon's Pacific coast, Cascade range, and high desert create diverse birding from puffins to sage-grouse.",
  },
  {
    slug: "washington", name: "Washington", abbr: "WA", lat: 47.40, lng: -121.49, region: "West", flyway: "Pacific",
    gridRow: 3, gridCol: 2,
    popularCities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    topBirdingSpots: [
      { name: "Nisqually National Wildlife Refuge", blurb: "Estuary boardwalks with shorebirds, waterfowl, and raptors." },
      { name: "Olympic Peninsula", blurb: "Old-growth rainforest and coastal specialties like Marbled Murrelet." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 490,
    summary: "From Puget Sound to the Cascades, Washington offers year-round birding with strong wintering waterfowl.",
  },
  {
    slug: "arizona", name: "Arizona", abbr: "AZ", lat: 34.05, lng: -111.09, region: "West", flyway: "Pacific",
    gridRow: 7, gridCol: 2,
    popularCities: ["Phoenix", "Tucson", "Mesa", "Flagstaff", "Sedona"],
    // Facts sourced in data/state-content/arizona.ts.
    topBirdingSpots: [
      { name: "Madera Canyon", blurb: "A world-class birding destination hosting over 250 species, including the Elegant Trogon and 15 hummingbird species." },
      { name: "San Pedro Riparian National Conservation Area", blurb: "Almost 57,000 acres along 40 miles of the upper San Pedro River; 100 species of breeding birds call the river home and it provides habitat for 250 species of migrant and wintering birds." },
      { name: "Saguaro National Park", blurb: "Sonoran Desert birds seen in few other places in the United States, including Gila Woodpeckers nesting inside saguaros and Elf Owls using their old cavities." },
      { name: "Ramsey Canyon Preserve", blurb: "Nature Conservancy preserve in the Huachuca Mountains; a migratory corridor and critical nesting habitat for hummingbirds including Rivoli's and Anna's." },
    ],
    habitats: ["Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 570,
    summary: "Arizona's sky islands and Sonoran Desert make it a premier destination for specialty birds found nowhere else in the U.S.",
  },
  {
    slug: "nevada", name: "Nevada", abbr: "NV", lat: 39.83, lng: -116.63, region: "West", flyway: "Pacific",
    gridRow: 5, gridCol: 3,
    popularCities: ["Las Vegas", "Reno", "Henderson", "Carson City"],
    topBirdingSpots: [
      { name: "Stillwater National Wildlife Refuge", blurb: "Wetland oasis in the Great Basin for shorebirds and waterfowl." },
    ],
    habitats: ["Desert", "Wetland", "Forest", "Urban"],
    speciesCount: 470,
    summary: "Nevada's Great Basin and desert landscapes offer surprising birding at oases and riparian corridors.",
  },
  {
    slug: "utah", name: "Utah", abbr: "UT", lat: 39.32, lng: -111.89, region: "West", flyway: "Pacific",
    gridRow: 6, gridCol: 3,
    popularCities: ["Salt Lake City", "Provo", "St. George", "Moab"],
    topBirdingSpots: [
      { name: "Bear River Migratory Bird Refuge", blurb: "One of the largest freshwater marshes west of the Mississippi." },
    ],
    habitats: ["Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 450,
    summary: "Utah's wetlands along the Great Salt Lake attract massive flocks of migrating shorebirds and waterfowl.",
  },
  {
    slug: "idaho", name: "Idaho", abbr: "ID", lat: 44.35, lng: -114.61, region: "West", flyway: "Pacific",
    gridRow: 4, gridCol: 3,
    popularCities: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
    topBirdingSpots: [
      { name: "Camas National Wildlife Refuge", blurb: "Greater Sage-Grouse leks and Sandhill Crane staging." },
    ],
    habitats: ["Forest", "Desert", "Wetland", "Urban"],
    speciesCount: 430,
    summary: "Idaho's Rocky Mountain terrain and sagebrush steppe host forest birds, grouse, and raptors.",
  },
  {
    slug: "montana", name: "Montana", abbr: "MT", lat: 46.92, lng: -110.45, region: "West", flyway: "Central",
    gridRow: 3, gridCol: 3,
    popularCities: ["Billings", "Missoula", "Great Falls", "Bozeman"],
    topBirdingSpots: [
      { name: "Freezeout Lake Wildlife Management Area", blurb: "Snow Goose migration spectacle in spring and fall." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 420,
    summary: "Montana's vast prairies and mountain valleys are home to eagles, grouse, and grassland sparrows.",
  },
  {
    slug: "wyoming", name: "Wyoming", abbr: "WY", lat: 42.76, lng: -107.29, region: "West", flyway: "Central",
    gridRow: 5, gridCol: 4,
    popularCities: ["Cheyenne", "Casper", "Laramie", "Jackson"],
    topBirdingSpots: [
      { name: "Grand Teton National Park", blurb: "Trumpeter Swans, Bald Eagles, and montane forest species." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 400,
    summary: "Wyoming's Yellowstone-Teton ecosystem and high plains support iconic western bird species.",
  },
  {
    slug: "colorado", name: "Colorado", abbr: "CO", lat: 39.06, lng: -105.55, region: "West", flyway: "Central",
    gridRow: 6, gridCol: 4,
    popularCities: ["Denver", "Colorado Springs", "Aurora", "Boulder", "Fort Collins"],
    // Facts sourced in data/state-content/colorado.ts.
    topBirdingSpots: [
      { name: "Rocky Mountain National Park", blurb: "Over 270 species reported over the last 100 years, many unique to mountainous habitats from aspen and ponderosa pine up to alpine tundra." },
      { name: "Pawnee National Grassland", blurb: "193,060 acres of shortgrass prairie where over 200 species can be found; Crow Valley Recreation Area is a very popular site with bird enthusiasts, and a 21-mile self-guided bird tour passes through a variety of bird habitats." },
      { name: "Rocky Mountain Arsenal National Wildlife Refuge", blurb: "A 15,000-acre refuge just 10 miles northeast of downtown Denver, established in 2004 in part to protect the bald eagle; bison, raptors, songbirds, and waterfowl." },
    ],
    habitats: ["Forest", "Desert", "Wetland", "Urban"],
    speciesCount: 522,
    summary: "Colorado's dramatic elevation range from plains to 14,000-foot peaks creates diverse birding across life zones.",
  },
  {
    slug: "new-mexico", name: "New Mexico", abbr: "NM", lat: 34.52, lng: -106.03, region: "West", flyway: "Central",
    gridRow: 7, gridCol: 3,
    popularCities: ["Albuquerque", "Las Cruces", "Santa Fe", "Roswell"],
    topBirdingSpots: [
      { name: "Bosque del Apache NWR", blurb: "Sandhill Crane and Snow Goose spectacle each winter." },
    ],
    habitats: ["Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 530,
    summary: "New Mexico's Rio Grande corridor and Chihuahuan Desert support wintering cranes and southwestern specialties.",
  },
  {
    slug: "alaska", name: "Alaska", abbr: "AK", lat: 64.20, lng: -149.49, region: "West", flyway: "Pacific",
    gridRow: 1, gridCol: 1,
    popularCities: ["Anchorage", "Fairbanks", "Juneau"],
    topBirdingSpots: [
      { name: "Potter Marsh Bird Sanctuary", blurb: "Easy-access wetland near Anchorage for nesting Arctic Terns." },
    ],
    habitats: ["Coastal", "Forest", "Wetland"],
    speciesCount: 500,
    summary: "Alaska hosts the world's greatest concentration of breeding seabirds and Arctic-breeding songbirds.",
  },
  {
    slug: "hawaii", name: "Hawaii", abbr: "HI", lat: 20.79, lng: -156.50, region: "West", flyway: "Pacific",
    gridRow: 5, gridCol: 0,
    popularCities: ["Honolulu", "Hilo", "Kailua"],
    topBirdingSpots: [
      { name: "Hakalau Forest NWR", blurb: "Endemic honeycreepers like ʻIʻiwi and ʻApapane in montane rainforest." },
    ],
    habitats: ["Coastal", "Forest", "Urban"],
    speciesCount: 340,
    summary: "Hawaii is the endangered species capital of the U.S.—its endemic honeycreepers are found nowhere else on Earth.",
  },

  // ── Midwest ───────────────────────────────────────────────────
  {
    slug: "north-dakota", name: "North Dakota", abbr: "ND", lat: 47.53, lng: -100.49, region: "Midwest", flyway: "Central",
    gridRow: 3, gridCol: 4,
    popularCities: ["Fargo", "Bismarck", "Grand Forks"],
    topBirdingSpots: [
      { name: "Arrowwood National Wildlife Refuge", blurb: "Prairie pothole country—North America's duck factory." },
    ],
    habitats: ["Wetland", "Forest", "Urban"],
    speciesCount: 370,
    summary: "North Dakota's prairie pothole region produces more breeding ducks than anywhere else in the lower 48.",
  },
  {
    slug: "south-dakota", name: "South Dakota", abbr: "SD", lat: 44.30, lng: -100.37, region: "Midwest", flyway: "Central",
    gridRow: 4, gridCol: 4,
    popularCities: ["Sioux Falls", "Rapid City", "Pierre"],
    topBirdingSpots: [
      { name: "Custer State Park", blurb: "Mountain Bluebirds and Wild Turkeys in the Black Hills." },
    ],
    habitats: ["Wetland", "Forest", "Urban"],
    speciesCount: 380,
    summary: "South Dakota's mix of prairie and Black Hills habitat supports grassland birds and western forest species.",
  },
  {
    slug: "nebraska", name: "Nebraska", abbr: "NE", lat: 41.49, lng: -99.90, region: "Midwest", flyway: "Central",
    gridRow: 5, gridCol: 5,
    popularCities: ["Omaha", "Lincoln", "Grand Island"],
    topBirdingSpots: [
      { name: "Rowe Sanctuary", blurb: "600,000 Sandhill Cranes on the Platte River each March." },
    ],
    habitats: ["Wetland", "Forest", "Urban"],
    speciesCount: 400,
    summary: "Nebraska's Platte River hosts one of Earth's great migration spectacles each spring.",
  },
  {
    slug: "kansas", name: "Kansas", abbr: "KS", lat: 38.53, lng: -98.40, region: "Midwest", flyway: "Central",
    gridRow: 6, gridCol: 5,
    popularCities: ["Wichita", "Overland Park", "Kansas City", "Topeka"],
    topBirdingSpots: [
      { name: "Cheyenne Bottoms Wildlife Area", blurb: "Largest interior wetland in the U.S.—key shorebird stopover." },
    ],
    habitats: ["Wetland", "Forest", "Urban"],
    speciesCount: 420,
    summary: "Kansas's Flint Hills and Cheyenne Bottoms are critical for grassland birds and migratory shorebirds.",
  },
  {
    slug: "minnesota", name: "Minnesota", abbr: "MN", lat: 46.12, lng: -94.69, region: "Midwest", flyway: "Mississippi",
    gridRow: 3, gridCol: 5,
    popularCities: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
    topBirdingSpots: [
      { name: "Hawk Ridge Nature Reserve", blurb: "Duluth's Lake Superior ridge funnels fall raptor migration." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 440,
    summary: "Minnesota's boreal forest, prairie, and Great Lakes shoreline give it the most breeding birds in the Midwest.",
  },
  {
    slug: "iowa", name: "Iowa", abbr: "IA", lat: 41.93, lng: -93.41, region: "Midwest", flyway: "Mississippi",
    gridRow: 4, gridCol: 5,
    popularCities: ["Des Moines", "Cedar Rapids", "Davenport"],
    topBirdingSpots: [
      { name: "DeSoto National Wildlife Refuge", blurb: "Missouri River floodplain—Snow Geese in fall." },
    ],
    habitats: ["Wetland", "Forest", "Urban"],
    speciesCount: 390,
    summary: "Iowa's river corridors and tallgrass prairie remnants support migrating waterfowl and grassland birds.",
  },
  {
    slug: "missouri", name: "Missouri", abbr: "MO", lat: 38.46, lng: -92.30, region: "Midwest", flyway: "Mississippi",
    gridRow: 5, gridCol: 6,
    popularCities: ["Kansas City", "Saint Louis", "Springfield", "Columbia"],
    topBirdingSpots: [
      { name: "Eagle Bluffs Conservation Area", blurb: "Missouri River floodplain wetland—shorebirds and waterfowl." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 400,
    summary: "Missouri sits at the crossroads of eastern forest, western plains, and the Mississippi Flyway.",
  },
  {
    slug: "wisconsin", name: "Wisconsin", abbr: "WI", lat: 43.78, lng: -89.19, region: "Midwest", flyway: "Mississippi",
    gridRow: 2, gridCol: 5,
    popularCities: ["Milwaukee", "Madison", "Green Bay"],
    topBirdingSpots: [
      { name: "Horicon Marsh", blurb: "Largest freshwater cattail marsh in the U.S." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 420,
    summary: "Wisconsin's Horicon Marsh and Great Lakes shoreline make it a Midwest birding hub.",
  },
  {
    slug: "illinois", name: "Illinois", abbr: "IL", lat: 40.12, lng: -89.20, region: "Midwest", flyway: "Mississippi",
    gridRow: 3, gridCol: 6,
    popularCities: ["Chicago", "Aurora", "Naperville", "Springfield"],
    topBirdingSpots: [
      { name: "Montrose Point Bird Sanctuary", blurb: "Chicago's lakefront migrant trap—warblers in May." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 440,
    summary: "Illinois's Lake Michigan shoreline funnels migrating warblers and sparrows through Chicago.",
  },
  {
    slug: "indiana", name: "Indiana", abbr: "IN", lat: 40.27, lng: -86.13, region: "Midwest", flyway: "Mississippi",
    gridRow: 4, gridCol: 6,
    popularCities: ["Indianapolis", "Fort Wayne", "Evansville"],
    topBirdingSpots: [
      { name: "Indiana Dunes National Park", blurb: "Lake Michigan shorebird and warbler migration stop." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 400,
    summary: "Indiana's Lake Michigan shoreline and interior forests support migrating songbirds.",
  },
  {
    slug: "michigan", name: "Michigan", abbr: "MI", lat: 44.31, lng: -85.60, region: "Midwest", flyway: "Mississippi",
    gridRow: 3, gridCol: 7,
    popularCities: ["Detroit", "Grand Rapids", "Warren", "Lansing"],
    // Facts sourced in data/state-content/michigan.ts.
    topBirdingSpots: [
      { name: "Whitefish Point Bird Observatory", blurb: "A Lake Superior peninsula that funnels thousands of migrating birds each spring and fall; over 340 species recorded and an identified Important Bird Area." },
      { name: "Seney National Wildlife Refuge", blurb: "95,238 acres of marshes, swamps, bogs, and forests in the Upper Peninsula, established in 1935; over 200 species of birds, with abundant Trumpeter Swans, Common Loons, Ospreys, and Bald Eagles." },
      { name: "Shiawassee National Wildlife Refuge", blurb: "A 10,000-acre refuge established in 1953; more than 280 species of migratory birds observed." },
      { name: "Kirtland's Warbler Wildlife Management Area", blurb: "125 separate tracts totaling 6,684 acres across eight counties in the northern Lower Peninsula, managed as the young jack pine forest the warbler depends on." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 466,
    summary: "Michigan's two peninsulas and Great Lakes shoreline create a migration highway for raptors and songbirds.",
  },
  {
    slug: "ohio", name: "Ohio", abbr: "OH", lat: 40.42, lng: -82.91, region: "Midwest", flyway: "Mississippi",
    gridRow: 4, gridCol: 7,
    popularCities: ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
    topBirdingSpots: [
      { name: "Magee Marsh Wildlife Area", blurb: "The Warbler Capital of the World—peak migration in May." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 420,
    summary: "Ohio's Lake Erie shoreline hosts the world-famous Magee Marsh warbler migration each May.",
  },

  // ── South ─────────────────────────────────────────────────────
  {
    slug: "texas", name: "Texas", abbr: "TX", lat: 31.49, lng: -98.34, region: "South", flyway: "Central",
    gridRow: 8, gridCol: 4,
    popularCities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
    // Facts sourced in data/state-content/texas.ts.
    topBirdingSpots: [
      { name: "Aransas National Wildlife Refuge", blurb: "More than 115,000 acres along the Texas Gulf Coast, established in 1937, and the wintering home of the last wild flock of endangered Whooping Cranes." },
      { name: "High Island (Boy Scout Woods)", blurb: "Houston Audubon's 60-acre sanctuary one mile from the Gulf; staffed daily from mid-March to early May for spring migration." },
      { name: "Santa Ana National Wildlife Refuge", blurb: "2,088 acres on the Rio Grande at the juncture of two major migratory routes; the northernmost point for many Central and South American species." },
      { name: "Big Bend National Park", blurb: "450 species reported in the park, of which only 56 live in Big Bend year-round." },
    ],
    habitats: ["Coastal", "Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 677,
    summary: "Texas has the second-highest bird diversity in the U.S., spanning Gulf Coast beaches to Chihuahuan Desert.",
  },
  {
    slug: "oklahoma", name: "Oklahoma", abbr: "OK", lat: 35.51, lng: -96.88, region: "South", flyway: "Central",
    gridRow: 7, gridCol: 4,
    popularCities: ["Oklahoma City", "Tulsa", "Norman"],
    topBirdingSpots: [
      { name: "Wichita Mountains Wildlife Refuge", blurb: "Bald Eagles and prairie birds in ancient granite mountains." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 440,
    summary: "Oklahoma's prairie-to-forest transition and reservoirs draw a mix of western and eastern species.",
  },
  {
    slug: "arkansas", name: "Arkansas", abbr: "AR", lat: 34.80, lng: -92.20, region: "South", flyway: "Mississippi",
    gridRow: 6, gridCol: 6,
    popularCities: ["Little Rock", "Fort Smith", "Fayetteville"],
    topBirdingSpots: [
      { name: "Holla Bend National Wildlife Refuge", blurb: "Bald Eagle concentration and waterfowl wintering." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 400,
    summary: "Arkansas's Ozark and Ouachita forests and river valleys offer rich interior birding.",
  },
  {
    slug: "louisiana", name: "Louisiana", abbr: "LA", lat: 30.98, lng: -91.96, region: "South", flyway: "Mississippi",
    gridRow: 7, gridCol: 6,
    popularCities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
    topBirdingSpots: [
      { name: "Sabine NWR", blurb: "Chenier plain—spectacular Gulf Coast fallouts and wintering waterfowl." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 470,
    summary: "Louisiana's coastal marshes and bottomland hardwoods are a Mississippi Flyway powerhouse.",
  },
  {
    slug: "mississippi", name: "Mississippi", abbr: "MS", lat: 32.35, lng: -89.40, region: "South", flyway: "Mississippi",
    gridRow: 7, gridCol: 7,
    popularCities: ["Jackson", "Gulfport", "Biloxi"],
    topBirdingSpots: [
      { name: "Strawberry Plains Audubon Center", blurb: "Ruby-throated Hummingbird migration spectacle in fall." },
    ],
    habitats: ["Forest", "Wetland", "Coastal", "Urban"],
    speciesCount: 410,
    summary: "Mississippi's Gulf coast and Delta bottomland forests support wintering sparrows and migrating hummingbirds.",
  },
  {
    slug: "alabama", name: "Alabama", abbr: "AL", lat: 32.62, lng: -86.68, region: "South", flyway: "Mississippi",
    gridRow: 7, gridCol: 8,
    popularCities: ["Birmingham", "Montgomery", "Mobile", "Huntsville"],
    topBirdingSpots: [
      { name: "Dauphin Island Bird Sanctuary", blurb: "Gulf Coast barrier island spring fallout hotspot." },
    ],
    habitats: ["Forest", "Wetland", "Coastal", "Urban"],
    speciesCount: 420,
    summary: "Alabama's Gulf Coast and longleaf pine forests are a haven for migrants and southeastern specialties.",
  },
  {
    slug: "florida", name: "Florida", abbr: "FL", lat: 28.50, lng: -82.51, region: "South", flyway: "Atlantic",
    gridRow: 8, gridCol: 8,
    popularCities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
    // Facts sourced in data/state-content/florida.ts (NPS, USFWS, Audubon).
    topBirdingSpots: [
      { name: "Everglades National Park", blurb: "More than 360 bird species recorded, including sixteen species of wading birds." },
      { name: "Merritt Island National Wildlife Refuge", blurb: "140,000 acres of dunes, salt marsh, impoundments, scrub, and flatwoods overlaying Kennedy Space Center." },
      { name: "Dry Tortugas National Park", blurb: "Almost 70 miles west of Key West; 299 species on the park list and a Sooty Tern colony on Bush Key." },
      { name: "Corkscrew Swamp Sanctuary", blurb: "The largest remaining old-growth bald cypress forest in the world." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    // Florida Ornithological Society official state list: 545 extant species (fosbirds.org/fos-bird-checklist/).
    speciesCount: 545,
    summary: "Florida's subtropical climate, vast wetlands, and Gulf Coast make it one of America's premier birding destinations.",
  },
  {
    slug: "georgia", name: "Georgia", abbr: "GA", lat: 32.84, lng: -83.42, region: "South", flyway: "Atlantic",
    gridRow: 7, gridCol: 9,
    popularCities: ["Atlanta", "Savannah", "Augusta", "Athens"],
    topBirdingSpots: [
      { name: "Kennesaw Mountain", blurb: "Atlanta-area raptor and warbler migration watch." },
    ],
    habitats: ["Forest", "Wetland", "Coastal", "Urban"],
    speciesCount: 420,
    summary: "Georgia's Piedmont, mountains, and coast support diverse breeding and migrating birds.",
  },
  {
    slug: "south-carolina", name: "South Carolina", abbr: "SC", lat: 33.86, lng: -80.95, region: "South", flyway: "Atlantic",
    gridRow: 6, gridCol: 9,
    popularCities: ["Charleston", "Columbia", "Greenville"],
    topBirdingSpots: [
      { name: "Hunting Island State Park", blurb: "Barrier island migrants and nesting seabirds." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 410,
    summary: "South Carolina's barrier islands and longleaf pine flatwoods host coastal migrants and Red-cockaded Woodpeckers.",
  },
  {
    slug: "north-carolina", name: "North Carolina", abbr: "NC", lat: 35.63, lng: -79.01, region: "South", flyway: "Atlantic",
    gridRow: 6, gridCol: 8,
    popularCities: ["Charlotte", "Raleigh", "Greensboro", "Winston-Salem", "Asheville"],
    topBirdingSpots: [
      { name: "Pea Island NWR", blurb: "Outer Banks wintering waterfowl and shorebird stopover." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 460,
    summary: "North Carolina's mountains to coast span the full Atlantic Flyway migration corridor.",
  },
  {
    slug: "tennessee", name: "Tennessee", abbr: "TN", lat: 35.86, lng: -86.35, region: "South", flyway: "Mississippi",
    gridRow: 6, gridCol: 7,
    popularCities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
    // Facts sourced in data/state-content/tennessee.ts.
    topBirdingSpots: [
      { name: "Great Smoky Mountains National Park", blurb: "More than 240 documented species; about 60 live in the park year-round and nearly 120 nest there in the warmer months, with high-elevation specialties along Kuwohi Road." },
      { name: "Reelfoot Lake", blurb: "The only large naturally occurring lake in Tennessee, created by the New Madrid earthquakes of 1811–1812; a wintering ground for waterfowl and bald eagles." },
      { name: "Radnor Lake State Park", blurb: "1,389 acres and a Class II Natural Area nestled in the heart of Nashville." },
      { name: "Hatchie National Wildlife Refuge", blurb: "11,556 acres in west Tennessee, including approximately 9,764 acres of bottomland hardwood forest, supplying critical habitat for wintering waterfowl and other migratory birds." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 434,
    summary: "Tennessee's Mississippi River corridor and Great Smoky Mountains offer forest and wetland birding.",
  },
  {
    slug: "kentucky", name: "Kentucky", abbr: "KY", lat: 37.67, lng: -84.27, region: "South", flyway: "Mississippi",
    gridRow: 5, gridCol: 7,
    popularCities: ["Louisville", "Lexington", "Bowling Green"],
    topBirdingSpots: [
      { name: "Land Between the Lakes", blurb: "Forested peninsula with eagles, warblers, and wild turkeys." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 380,
    summary: "Kentucky's rolling hills and reservoirs host eastern forest birds and wintering waterfowl.",
  },
  {
    slug: "west-virginia", name: "West Virginia", abbr: "WV", lat: 38.50, lng: -80.50, region: "South", flyway: "Atlantic",
    gridRow: 5, gridCol: 8,
    popularCities: ["Charleston", "Huntington", "Morgantown"],
    topBirdingSpots: [
      { name: "Cranberry Glades", blurb: "Boreal relict bog with northern species at their southern limit." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 350,
    summary: "West Virginia's Appalachian ridges and valleys host Cerulean Warblers and other forest interior species.",
  },
  {
    slug: "virginia", name: "Virginia", abbr: "VA", lat: 38.00, lng: -79.42, region: "South", flyway: "Atlantic",
    gridRow: 5, gridCol: 9,
    popularCities: ["Virginia Beach", "Norfolk", "Richmond", "Arlington"],
    topBirdingSpots: [
      { name: "Chincoteague NWR", blurb: "Atlantic Coast barrier island—Snow Geese and wild ponies." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 440,
    summary: "Virginia's coastal refuges and Appalachian mountains bookend a rich Atlantic Flyway birding corridor.",
  },
  {
    slug: "maryland", name: "Maryland", abbr: "MD", lat: 39.05, lng: -76.64, region: "South", flyway: "Atlantic",
    gridRow: 5, gridCol: 10,
    popularCities: ["Baltimore", "Frederick", "Rockville", "Annapolis"],
    topBirdingSpots: [
      { name: "Bombay Hook NWR", blurb: "Delaware Bay shorebird stopover (nearby)." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 440,
    summary: "Maryland's Chesapeake Bay and Appalachian ridges support diverse coastal and forest species.",
  },
  {
    slug: "delaware", name: "Delaware", abbr: "DE", lat: 39.20, lng: -75.53, region: "South", flyway: "Atlantic",
    gridRow: 5, gridCol: 11,
    popularCities: ["Wilmington", "Dover", "Newark"],
    topBirdingSpots: [
      { name: "Bombay Hook NWR", blurb: "Delaware Bay shorebird migration—Red Knots feed on horseshoe crab eggs." },
    ],
    habitats: ["Coastal", "Wetland", "Forest", "Urban"],
    speciesCount: 420,
    summary: "Delaware Bay is one of the most important shorebird stopovers in the Western Hemisphere.",
  },

  // ── Northeast ────────────────────────────────────────────────
  {
    slug: "maine", name: "Maine", abbr: "ME", lat: 45.25, lng: -69.45, region: "Northeast", flyway: "Atlantic",
    gridRow: 0, gridCol: 9,
    popularCities: ["Portland", "Bangor", "Augusta"],
    topBirdingSpots: [
      { name: "Acadia National Park", blurb: "Boreal species at sea level—Black Guillemot and crossbills." },
    ],
    habitats: ["Coastal", "Forest", "Wetland"],
    speciesCount: 420,
    summary: "Maine's rocky coast and boreal interior are the southern limit for many northern species.",
  },
  {
    slug: "new-hampshire", name: "New Hampshire", abbr: "NH", lat: 43.94, lng: -71.57, region: "Northeast", flyway: "Atlantic",
    gridRow: 2, gridCol: 8,
    popularCities: ["Manchester", "Nashua", "Concord"],
    topBirdingSpots: [
      { name: "Pondicherry Wildlife Refuge", blurb: "Boreal wetland and northern forest in the White Mountains." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 400,
    summary: "New Hampshire's White Mountains and Lakes Region host boreal species and migrating warblers.",
  },
  {
    slug: "vermont", name: "Vermont", abbr: "VT", lat: 44.06, lng: -72.50, region: "Northeast", flyway: "Atlantic",
    gridRow: 2, gridCol: 7,
    popularCities: ["Burlington", "Montpelier", "Rutland"],
    topBirdingSpots: [
      { name: "Missisquoi NWR", blurb: "Lake Champlain nesting Bald Eagles and Great Blue Herons." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 380,
    summary: "Vermont's Green Mountains and Lake Champlain valley support boreal and forest interior species.",
  },
  {
    slug: "massachusetts", name: "Massachusetts", abbr: "MA", lat: 42.40, lng: -71.38, region: "Northeast", flyway: "Atlantic",
    gridRow: 3, gridCol: 9,
    popularCities: ["Boston", "Worcester", "Springfield", "Cambridge"],
    topBirdingSpots: [
      { name: "Plum Island / Parker River NWR", blurb: "Barrier island with migrating shorebirds, raptors, and warblers." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 490,
    summary: "Massachusetts's coastal refuges and Cape Cod are Atlantic Flyway migration magnets.",
  },
  {
    slug: "connecticut", name: "Connecticut", abbr: "CT", lat: 41.60, lng: -73.09, region: "Northeast", flyway: "Atlantic",
    gridRow: 4, gridCol: 10,
    popularCities: ["Hartford", "New Haven", "Stamford"],
    topBirdingSpots: [
      { name: "Hammonasset Beach State Park", blurb: "Long Island Sound coastal migrant trap." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 430,
    summary: "Connecticut's coastline and river valleys funnel migrating songbirds along the Atlantic Flyway.",
  },
  {
    slug: "rhode-island", name: "Rhode Island", abbr: "RI", lat: 41.68, lng: -71.51, region: "Northeast", flyway: "Atlantic",
    gridRow: 4, gridCol: 11,
    popularCities: ["Providence", "Warwick", "Newport"],
    // Facts sourced in data/state-content/rhode-island.ts.
    topBirdingSpots: [
      { name: "Sachuest Point National Wildlife Refuge", blurb: "A 242-acre refuge in Middletown of fields, shrublands, woodlands, ponds, and sandy beaches; an important stopover and wintering area for migratory birds including Harlequin Ducks." },
      { name: "Ninigret National Wildlife Refuge", blurb: "858 acres of upland and wetland habitats on the largest coastal salt pond in Rhode Island, formerly part of Charlestown Naval Auxiliary Landing Field; over 250 species of birds recorded." },
      { name: "Block Island National Wildlife Refuge", blurb: "134 acres established in 1973 on the Atlantic Flyway, with a large concentration of over 70 species of migratory songbirds each fall." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 446,
    summary: "Rhode Island's Narragansett Bay and coastal refuges support seabirds and wintering waterfowl.",
  },
  {
    slug: "new-york", name: "New York", abbr: "NY", lat: 42.75, lng: -75.28, region: "Northeast", flyway: "Atlantic",
    gridRow: 3, gridCol: 8,
    popularCities: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
    topBirdingSpots: [
      { name: "Jamaica Bay Wildlife Refuge", blurb: "Queens salt marsh—one of the East Coast's top migration stops." },
      { name: "Braddock Bay", blurb: "Lake Ontario raptor and owl migration in spring." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 480,
    summary: "New York's Jamaica Bay, Adirondacks, and Lake Ontario create an Atlantic Flyway birding powerhouse.",
  },
  {
    slug: "new-jersey", name: "New Jersey", abbr: "NJ", lat: 40.06, lng: -74.41, region: "Northeast", flyway: "Atlantic",
    gridRow: 4, gridCol: 9,
    popularCities: ["Newark", "Jersey City", "Trenton", "Atlantic City"],
    topBirdingSpots: [
      { name: "Cape May", blurb: "The greatest bird migration spectacle on the East Coast—raptors, warblers, and seabirds." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 470,
    summary: "Cape May, New Jersey is one of the most famous birding destinations in North America.",
  },
  {
    slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", lat: 40.90, lng: -77.60, region: "Northeast", flyway: "Atlantic",
    gridRow: 4, gridCol: 8,
    popularCities: ["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg"],
    topBirdingSpots: [
      { name: "Hawk Mountain Sanctuary", blurb: "World's first raptor sanctuary—fall Broad-winged Hawk migration." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 440,
    summary: "Pennsylvania's Hawk Mountain and Appalachian ridges are legendary for fall raptor migration.",
  },
];

// ── Quick lookup helpers ───────────────────────────────────────

export const STATE_BY_SLUG = Object.fromEntries(US_STATES_DATA.map((s) => [s.slug, s]));
export const STATE_BY_ABBR = Object.fromEntries(US_STATES_DATA.map((s) => [s.abbr, s]));
export const STATE_BY_NAME = Object.fromEntries(US_STATES_DATA.map((s) => [s.name.toLowerCase(), s]));

export const REGIONS: Record<string, USState[]> = {
  West: US_STATES_DATA.filter((s) => s.region === "West"),
  Midwest: US_STATES_DATA.filter((s) => s.region === "Midwest"),
  South: US_STATES_DATA.filter((s) => s.region === "South"),
  Northeast: US_STATES_DATA.filter((s) => s.region === "Northeast"),
};

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * Static fallback: common backyard birds by region.
 * Used when the database is not available (no DATABASE_URL).
 * Each entry references a bird slug from the whitelist.
 */
export const BACKYARD_BIRDS_BY_REGION: Record<string, string[]> = {
  West: ["american-robin", "house-finch", "annas-hummingbird", "california-scrub-jay", "northern-mockingbird", "dark-eyed-junco"],
  Midwest: ["american-robin", "northern-cardinal", "black-capped-chickadee", "blue-jay", "house-finch", "downy-woodpecker"],
  South: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "tufted-titmouse", "mourning-dove", "ruby-throated-hummingbird"],
  Northeast: ["american-robin", "black-capped-chickadee", "northern-cardinal", "blue-jay", "tufted-titmouse", "dark-eyed-junco"],
};

/**
 * State-level backyard bird overrides.
 * Falls back to region defaults if a state is not listed.
 */
export const BACKYARD_BIRDS_BY_STATE: Record<string, string[]> = {
  california: ["american-robin", "house-finch", "annas-hummingbird", "california-scrub-jay", "northern-mockingbird", "dark-eyed-junco"],
  texas: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "house-finch", "mourning-dove", "ruby-throated-hummingbird"],
  florida: ["northern-mockingbird", "northern-cardinal", "carolina-wren", "mourning-dove", "red-bellied-woodpecker", "ruby-throated-hummingbird"],
  "new-york": ["american-robin", "black-capped-chickadee", "northern-cardinal", "blue-jay", "tufted-titmouse", "dark-eyed-junco"],
  arizona: ["house-finch", "northern-mockingbird", "cactus-wren", "verdin", "gambels-quail", "curve-billed-thrasher"],
  colorado: ["american-robin", "black-capped-chickadee", "house-finch", "blue-jay", "downy-woodpecker", "dark-eyed-junco"],
};

// ─── City data for Bird+City programmatic SEO pages ────────────────

export type CityData = {
  slug: string;
  name: string;
  stateSlug: string;
  stateName: string;
  lat: number;
  lng: number;
  habitats: string[];
  commonBirdSlugs: string[];
  backyardBirdSlugs: string[];
  summary: string;
  birdingSpots: { name: string; blurb: string }[];
};

/**
 * Curated city data for the largest U.S. cities.
 * Cities not listed here fall back to state-level data via getFallbackCityData().
 */
export const CITIES: CityData[] = [
  // ── California ──────────────────────────────────────────────────
  {
    slug: "los-angeles", name: "Los Angeles", stateSlug: "california", stateName: "California",
    lat: 34.05, lng: -118.24,
    habitats: ["Urban", "Coastal", "Wetland"],
    commonBirdSlugs: ["american-robin", "house-finch", "annas-hummingbird", "northern-mockingbird", "california-scrub-jay", "mourning-dove"],
    backyardBirdSlugs: ["house-finch", "annas-hummingbird", "northern-mockingbird", "mourning-dove", "lesser-goldfinch"],
    summary: "Los Angeles' Mediterranean climate and varied terrain—from coastal bluffs to chaparral hills—support year-round bird diversity with over 400 recorded species.",
    birdingSpots: [
      { name: "Kenneth Hahn State Recreation Area", blurb: "Urban oasis in Baldwin Hills with chaparral birds and migrants." },
      { name: "Ballona Creek & Wetlands", blurb: "Shorebirds, waterfowl, and coastal species minutes from LAX." },
    ],
  },
  {
    slug: "san-francisco", name: "San Francisco", stateSlug: "california", stateName: "California",
    lat: 37.77, lng: -122.42,
    habitats: ["Coastal", "Urban", "Wetland"],
    commonBirdSlugs: ["american-robin", "annas-hummingbird", "house-finch", "white-crowned-sparrow", "california-scrub-jay", "northern-mockingbird"],
    backyardBirdSlugs: ["annas-hummingbird", "house-finch", "white-crowned-sparrow", "chestnut-backed-chickadee", "dark-eyed-junco"],
    summary: "San Francisco's cool, foggy climate and bay shoreline make it a year-round birding destination with strong Pacific Flyway migration.",
    birdingSpots: [
      { name: "Golden Gate Park", blurb: "Urban green space with resident and migrating songbirds." },
      { name: "Heron's Head Park", blurb: "Shorebirds and waterfowl along the bay shoreline." },
    ],
  },
  {
    slug: "san-diego", name: "San Diego", stateSlug: "california", stateName: "California",
    lat: 32.72, lng: -117.16,
    habitats: ["Coastal", "Desert", "Urban", "Wetland"],
    commonBirdSlugs: ["house-finch", "annas-hummingbird", "northern-mockingbird", "american-robin", "mourning-dove", "california-scrub-jay"],
    backyardBirdSlugs: ["house-finch", "annas-hummingbird", "northern-mockingbird", "lesser-goldfinch", "mourning-dove"],
    summary: "San Diego's mild climate and diverse habitats—from coastal lagoons to desert canyons—make it one of the most bird-rich cities in the U.S.",
    birdingSpots: [
      { name: "San Diego River Estuary", blurb: "Shorebirds, terns, and waterfowl in the heart of the city." },
      { name: "Balboa Park", blurb: "Urban canyon and garden birding with migrants and residents." },
    ],
  },
  {
    slug: "sacramento", name: "Sacramento", stateSlug: "california", stateName: "California",
    lat: 38.58, lng: -121.49,
    habitats: ["Wetland", "Urban", "Forest"],
    commonBirdSlugs: ["american-robin", "northern-mockingbird", "house-finch", "mourning-dove", "white-crowned-sparrow", "annas-hummingbird"],
    backyardBirdSlugs: ["house-finch", "annas-hummingbird", "white-crowned-sparrow", "lesser-goldfinch", "dark-eyed-junco"],
    summary: "Sacramento's position at the confluence of two rivers and the edge of the Central Valley makes it a key stopover for Pacific Flyway migrants.",
    birdingSpots: [
      { name: "Cosumnes River Preserve", blurb: "Sandhill Cranes and wintering waterfowl in restored wetlands." },
    ],
  },
  // ── Texas ───────────────────────────────────────────────────────
  {
    slug: "houston", name: "Houston", stateSlug: "texas", stateName: "Texas",
    lat: 29.76, lng: -95.37,
    habitats: ["Wetland", "Coastal", "Urban", "Forest"],
    commonBirdSlugs: ["northern-cardinal", "northern-mockingbird", "mourning-dove", "carolina-wren", "red-bellied-woodpecker", "house-finch"],
    backyardBirdSlugs: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "house-finch", "ruby-throated-hummingbird"],
    summary: "Houston's proximity to the Gulf Coast and its subtropical climate make it a magnet for migrating birds and a year-round home for southern species.",
    birdingSpots: [
      { name: "High Island", blurb: "Legendary trans-Gulf migrant fallouts in spring." },
      { name: "Anahuac NWR", blurb: "Coastal marsh with rails, bitterns, and waterfowl." },
    ],
  },
  {
    slug: "dallas", name: "Dallas", stateSlug: "texas", stateName: "Texas",
    lat: 32.78, lng: -96.80,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["northern-cardinal", "northern-mockingbird", "mourning-dove", "carolina-wren", "blue-jay", "house-finch"],
    backyardBirdSlugs: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "house-finch", "ruby-throated-hummingbird"],
    summary: "Dallas sits at the transition of eastern forests and western plains, giving it a blend of eastern and western backyard birds.",
    birdingSpots: [
      { name: "White Rock Lake", blurb: "Urban lake with wintering waterfowl and migrating songbirds." },
    ],
  },
  {
    slug: "austin", name: "Austin", stateSlug: "texas", stateName: "Texas",
    lat: 30.27, lng: -97.74,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "mourning-dove", "house-finch", "blue-jay"],
    backyardBirdSlugs: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "house-finch", "ruby-throated-hummingbird"],
    summary: "Austin's Hill Country terrain and Colorado River corridor create rich birding in the heart of Texas.",
    birdingSpots: [
      { name: "Hornsby Bend", blurb: "Ponds and fields that attract shorebirds, raptors, and sparrows." },
    ],
  },
  // ── Florida ─────────────────────────────────────────────────────
  {
    slug: "miami", name: "Miami", stateSlug: "florida", stateName: "Florida",
    lat: 25.76, lng: -80.19,
    habitats: ["Coastal", "Wetland", "Urban"],
    commonBirdSlugs: ["northern-mockingbird", "northern-cardinal", "mourning-dove", "red-bellied-woodpecker", "boat-tailed-grackle", "white-ibis"],
    backyardBirdSlugs: ["northern-mockingbird", "northern-cardinal", "mourning-dove", "red-bellied-woodpecker", "ruby-throated-hummingbird"],
    summary: "Miami's subtropical climate makes it a hotspot for Caribbean species, wading birds, and exotics found nowhere else in the U.S.",
    birdingSpots: [
      { name: "Bill Baggs Cape Florida State Park", blurb: "Migrant trap for warblers and raptors on Key Biscayne." },
      { name: "Everglades National Park (main entrance)", blurb: "Wading birds, raptors, and specialties within an hour of downtown." },
    ],
  },
  {
    slug: "orlando", name: "Orlando", stateSlug: "florida", stateName: "Florida",
    lat: 28.54, lng: -81.38,
    habitats: ["Wetland", "Urban", "Forest"],
    commonBirdSlugs: ["northern-mockingbird", "northern-cardinal", "mourning-dove", "red-bellied-woodpecker", "carolina-wren", "boat-tailed-grackle"],
    backyardBirdSlugs: ["northern-mockingbird", "northern-cardinal", "mourning-dove", "red-bellied-woodpecker", "ruby-throated-hummingbird"],
    summary: "Orlando's lakes, wetlands, and subtropical gardens make it a year-round birding destination in central Florida.",
    birdingSpots: [
      { name: "Mead Botanical Garden", blurb: "Spring warbler fallout site in Winter Park." },
    ],
  },
  // ── New York ────────────────────────────────────────────────────
  {
    slug: "new-york-city", name: "New York City", stateSlug: "new-york", stateName: "New York",
    lat: 40.71, lng: -74.01,
    habitats: ["Urban", "Coastal", "Wetland"],
    commonBirdSlugs: ["american-robin", "northern-cardinal", "house-sparrow", "blue-jay", "mourning-dove", "red-bellied-woodpecker"],
    backyardBirdSlugs: ["american-robin", "northern-cardinal", "blue-jay", "black-capped-chickadee", "dark-eyed-junco"],
    summary: "New York City's parks and coastal location on the Atlantic Flyway make it one of the best urban birding destinations in North America.",
    birdingSpots: [
      { name: "Jamaica Bay Wildlife Refuge", blurb: "Salt marsh and ponds—one of the East Coast's top migration stops." },
      { name: "Central Park", blurb: "Famous migrant trap for warblers in spring and fall." },
    ],
  },
  // ── Arizona ─────────────────────────────────────────────────────
  {
    slug: "phoenix", name: "Phoenix", stateSlug: "arizona", stateName: "Arizona",
    lat: 33.45, lng: -112.07,
    habitats: ["Desert", "Urban", "Wetland"],
    commonBirdSlugs: ["house-finch", "northern-mockingbird", "mourning-dove", "gambels-quail", "verdin", "curve-billed-thrasher"],
    backyardBirdSlugs: ["house-finch", "northern-mockingbird", "gambels-quail", "verdin", "curve-billed-thrasher"],
    summary: "Phoenix's Sonoran Desert setting supports unique desert species alongside urban-adapted birds in one of America's sunniest cities.",
    birdingSpots: [
      { name: "Riparian Preserve at Water Ranch", blurb: "Desert oasis with waterfowl, shorebirds, and desert species." },
    ],
  },
  {
    slug: "tucson", name: "Tucson", stateSlug: "arizona", stateName: "Arizona",
    lat: 32.22, lng: -110.93,
    habitats: ["Desert", "Forest", "Urban"],
    commonBirdSlugs: ["house-finch", "northern-mockingbird", "mourning-dove", "gambels-quail", "verdin", "cactus-wren"],
    backyardBirdSlugs: ["house-finch", "northern-mockingbird", "gambels-quail", "verdin", "cactus-wren"],
    summary: "Tucson's sky island geography—desert floor to pine-clad mountains—gives it extraordinary bird diversity for a U.S. city.",
    birdingSpots: [
      { name: "Madera Canyon", blurb: "Southeast Arizona specialties like Elegant Trogon and hummingbirds." },
    ],
  },
  // ── Washington ──────────────────────────────────────────────────
  {
    slug: "seattle", name: "Seattle", stateSlug: "washington", stateName: "Washington",
    lat: 47.61, lng: -122.33,
    habitats: ["Coastal", "Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["american-robin", "chestnut-backed-chickadee", "house-finch", "dark-eyed-junco", "northern-flicker", "stellers-jay"],
    backyardBirdSlugs: ["chestnut-backed-chickadee", "house-finch", "dark-eyed-junco", "american-robin", "annas-hummingbird"],
    summary: "Seattle's Puget Sound location and temperate rainforest climate make it a year-round birding city with strong Pacific Flyway migration.",
    birdingSpots: [
      { name: "Discovery Park", blurb: "Magnolia bluff with migrants, raptors, and seabirds." },
    ],
  },
  // ── Oregon ──────────────────────────────────────────────────────
  {
    slug: "portland", name: "Portland", stateSlug: "oregon", stateName: "Oregon",
    lat: 45.52, lng: -122.67,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["american-robin", "chestnut-backed-chickadee", "house-finch", "dark-eyed-junco", "northern-flicker", "stellers-jay"],
    backyardBirdSlugs: ["chestnut-backed-chickadee", "house-finch", "dark-eyed-junco", "american-robin", "annas-hummingbird"],
    summary: "Portland's location at the confluence of two rivers, with forests and wetlands nearby, makes it a rich Pacific Northwest birding hub.",
    birdingSpots: [
      { name: "Oaks Bottom Wildlife Refuge", blurb: "Floodplain wetland with waterfowl, raptors, and songbirds." },
    ],
  },
  // ── Colorado ────────────────────────────────────────────────────
  {
    slug: "denver", name: "Denver", stateSlug: "colorado", stateName: "Colorado",
    lat: 39.74, lng: -104.99,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["american-robin", "house-finch", "black-capped-chickadee", "northern-flicker", "blue-jay", "dark-eyed-junco"],
    backyardBirdSlugs: ["house-finch", "black-capped-chickadee", "american-robin", "dark-eyed-junco", "blue-jay"],
    summary: "Denver's high-altitude Front Range location—at the junction of plains and mountains—creates diverse birding from prairie to alpine.",
    birdingSpots: [
      { name: "Chatfield State Park", blurb: "Reservoir and riparian habitat for waterfowl and migrants." },
    ],
  },
  // ── Illinois ────────────────────────────────────────────────────
  {
    slug: "chicago", name: "Chicago", stateSlug: "illinois", stateName: "Illinois",
    lat: 41.88, lng: -87.63,
    habitats: ["Urban", "Coastal", "Wetland"],
    commonBirdSlugs: ["american-robin", "northern-cardinal", "house-sparrow", "blue-jay", "black-capped-chickadee", "red-bellied-woodpecker"],
    backyardBirdSlugs: ["american-robin", "northern-cardinal", "black-capped-chickadee", "blue-jay", "dark-eyed-junco"],
    summary: "Chicago's Lake Michigan shoreline is one of the best migration corridors in the Midwest, funneling warblers and raptors through the city.",
    birdingSpots: [
      { name: "Montrose Point Bird Sanctuary", blurb: "Chicago's lakefront migrant trap—warblers in May." },
      { name: "Jackson Park", blurb: "South Side lakefront birding with migrants and nesting species." },
    ],
  },
  // ── Massachusetts ───────────────────────────────────────────────
  {
    slug: "boston", name: "Boston", stateSlug: "massachusetts", stateName: "Massachusetts",
    lat: 42.36, lng: -71.06,
    habitats: ["Coastal", "Urban", "Wetland"],
    commonBirdSlugs: ["american-robin", "house-sparrow", "northern-cardinal", "black-capped-chickadee", "blue-jay", "mourning-dove"],
    backyardBirdSlugs: ["american-robin", "black-capped-chickadee", "northern-cardinal", "blue-jay", "dark-eyed-junco"],
    summary: "Boston's harbor islands, coastal marshes, and urban parks create a rich Atlantic Flyway birding experience.",
    birdingSpots: [
      { name: "Boston Harbor Islands", blurb: "Nesting terns, gulls, and coastal migrants." },
    ],
  },
  // ── Georgia ─────────────────────────────────────────────────────
  {
    slug: "atlanta", name: "Atlanta", stateSlug: "georgia", stateName: "Georgia",
    lat: 33.75, lng: -84.39,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["northern-cardinal", "northern-mockingbird", "carolina-wren", "mourning-dove", "tufted-titmouse", "red-bellied-woodpecker"],
    backyardBirdSlugs: ["northern-cardinal", "carolina-wren", "tufted-titmouse", "northern-mockingbird", "ruby-throated-hummingbird"],
    summary: "Atlanta's dense tree canopy—the highest of any major U.S. city—makes it a haven for forest birds in an urban setting.",
    birdingSpots: [
      { name: "Kennesaw Mountain", blurb: "Raptor and warbler migration watch north of the city." },
    ],
  },
  // ── North Carolina ──────────────────────────────────────────────
  {
    slug: "charlotte", name: "Charlotte", stateSlug: "north-carolina", stateName: "North Carolina",
    lat: 35.23, lng: -80.84,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["northern-cardinal", "carolina-wren", "northern-mockingbird", "mourning-dove", "tufted-titmouse", "red-bellied-woodpecker"],
    backyardBirdSlugs: ["northern-cardinal", "carolina-wren", "tufted-titmouse", "northern-mockingbird", "ruby-throated-hummingbird"],
    summary: "Charlotte's Piedmont location and urban forest create excellent habitat for southeastern backyard birds.",
    birdingSpots: [
      { name: "Cowans Ford Wildlife Refuge", blurb: "Lakeside habitat for waterfowl and forest birds." },
    ],
  },
  {
    slug: "raleigh", name: "Raleigh", stateSlug: "north-carolina", stateName: "North Carolina",
    lat: 35.78, lng: -78.64,
    habitats: ["Urban", "Forest", "Wetland"],
    commonBirdSlugs: ["northern-cardinal", "carolina-wren", "northern-mockingbird", "mourning-dove", "tufted-titmouse", "red-bellied-woodpecker"],
    backyardBirdSlugs: ["northern-cardinal", "carolina-wren", "tufted-titmouse", "northern-mockingbird", "ruby-throated-hummingbird"],
    summary: "Raleigh's oak-filled parks and greenway system support rich bird life in North Carolina's Research Triangle.",
    birdingSpots: [
      { name: "Lake Johnson Park", blurb: "Lakeside trails with waterfowl and forest birds." },
    ],
  },
];

/** Quick city lookup by composite key `${stateSlug}:${citySlug}` */
export const CITY_MAP = new Map(CITIES.map((c) => [`${c.stateSlug}:${c.slug}`, c]));

/** Get all city slugs for a given state */
export function getCitiesForState(stateSlug: string): CityData[] {
  return CITIES.filter((c) => c.stateSlug === stateSlug);
}

/**
 * Generate fallback city data for cities not in the curated CITIES list.
 * Uses the state's popularCities array and derives slug + coordinates.
 */
export function getFallbackCityData(stateSlug: string, cityName: string): CityData | undefined {
  const state = STATE_BY_SLUG[stateSlug];
  if (!state) return undefined;
  const slug = cityName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const regionBirds = BACKYARD_BIRDS_BY_REGION[state.region] ?? [];
  const stateBirds = BACKYARD_BIRDS_BY_STATE[stateSlug] ?? regionBirds;
  return {
    slug,
    name: cityName,
    stateSlug,
    stateName: state.name,
    lat: state.lat,
    lng: state.lng,
    habitats: state.habitats,
    commonBirdSlugs: stateBirds,
    backyardBirdSlugs: stateBirds,
    summary: `${cityName} is located in ${state.name}. ${state.summary}`,
    birdingSpots: state.topBirdingSpots.slice(0, 2),
  };
}
