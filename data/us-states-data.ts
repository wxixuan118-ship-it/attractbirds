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
    topBirdingSpots: [
      { name: "Point Reyes National Seashore", blurb: "Coastal migrants and pelagic species along one of California's richest flyways." },
      { name: "Salton Sea", blurb: "Critical stopover for millions of migratory waterbirds in the Colorado Desert." },
      { name: "Yosemite National Park", blurb: "Sierra Nevada specialities like Black-backed Woodpecker and Cassin's Finch." },
    ],
    habitats: ["Coastal", "Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 660,
    summary: "California's extraordinary habitat range—from Pacific coastline to Sierra peaks to Mojave Desert—supports the highest bird diversity of any U.S. state.",
  },
  {
    slug: "oregon", name: "Oregon", abbr: "OR", lat: 44.57, lng: -122.32, region: "West", flyway: "Pacific",
    gridRow: 4, gridCol: 2,
    popularCities: ["Portland", "Salem", "Eugene", "Bend", "Medford"],
    topBirdingSpots: [
      { name: "Malheur National Wildlife Refuge", blurb: "Southeast Oregon oasis that draws rarities and western migrants." },
      { name: "Cannon Beach", blurb: "Tufted Puffins and seabird colonies nest on Haystack Rock." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Desert", "Urban"],
    speciesCount: 510,
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
    topBirdingSpots: [
      { name: "Madera Canyon", blurb: "Southeast Arizona specialty birds like Elegant Trogon and Painted Redstart." },
      { name: "Ramsey Canyon Preserve", blurb: "Hummingbird haven in the Huachuca Mountains." },
      { name: "San Pedro River", blurb: "Riparian corridor drawing tropical species at their northern range limit." },
    ],
    habitats: ["Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 550,
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
    topBirdingSpots: [
      { name: "Rocky Mountain National Park", blurb: "White-tailed Ptarmigan and alpine tundra species above treeline." },
      { name: "Barr Lake State Park", blurb: "Bald Eagle nest and fall hawk migration along the Front Range." },
    ],
    habitats: ["Forest", "Desert", "Wetland", "Urban"],
    speciesCount: 490,
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
    topBirdingSpots: [
      { name: "Whitefish Point Bird Observatory", blurb: "Owl and raptor migration funnel at Lake Superior's tip." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 450,
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
    topBirdingSpots: [
      { name: "Bolivar Flats Shorebird Sanctuary", blurb: "Gulf Coast shorebird magnet with thousands of peep and terns." },
      { name: "Santa Ana NWR", blurb: "Lower Rio Grande Valley—Mexican species at their northern limit." },
      { name: "High Island", blurb: "Trans-Gulf migrant fallouts in spring after storms." },
    ],
    habitats: ["Coastal", "Desert", "Forest", "Wetland", "Urban"],
    speciesCount: 640,
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
    topBirdingSpots: [
      { name: "Corkscrew Swamp Sanctuary", blurb: "Old-growth cypress and nesting Wood Storks in spring." },
      { name: "Merritt Island NWR", blurb: "Florida Scrub-Jay and massive wintering waterfowl near Kennedy Space Center." },
      { name: "Dry Tortugas National Park", blurb: "Sooty Tern and Brown Noddy colonies 70 miles west of Key West." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 530,
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
    topBirdingSpots: [
      { name: "Reelfoot NWR", blurb: "Cypress swamp Bald Eagle nest site and waterfowl wintering." },
    ],
    habitats: ["Forest", "Wetland", "Urban"],
    speciesCount: 410,
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
    topBirdingSpots: [
      { name: "Sachuest Point NWR", blurb: "Rocky coastline with wintering Purple Sandpipers and harlequin Ducks." },
    ],
    habitats: ["Coastal", "Forest", "Wetland", "Urban"],
    speciesCount: 410,
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
