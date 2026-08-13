# AttractBirds.app URL Registry

The executable source of truth is `lib/url-registry.ts`. Navigation, canonical URLs, structured data, sitemap generation, and redirects must consume that registry instead of defining paths independently.

## Canonical families

| Content family | Canonical pattern |
| --- | --- |
| How-to hub | `/how-to-attract` |
| How-to guides | `/how-to-attract/{intent}` |
| Bird encyclopedia | `/birds/{bird}` |
| Locations | `/birds-by-location/{state}` and `/birds-by-location/{state}/{location-or-bird}` |
| Seasonal birds | `/seasonal-birds/{season}` and `/seasonal-birds/{season}/{bird-or-state}` |
| Plants | `/plants/{plant}`, `/plants/for/{bird}`, `/plants/{state}/native-plants` |
| Feeders | `/feeders/{guide}`, `/feeders/for/{target}`, `/feeders/compare/{comparison}` |
| Tools | `/tools/{tool}` |

## How-to 301 map

| Previous URL | Canonical URL |
| --- | --- |
| `/how-to-attract-birds` | `/how-to-attract` |
| `/how-to-attract-birds-to-your-yard` | `/how-to-attract/birds-to-your-yard` |
| `/how-to-attract-birds-to-feeder` | `/how-to-attract/birds-to-a-feeder` |
| `/new-bird-feeder-tips` | `/how-to-attract/birds-to-a-new-feeder` |
| `/attract-birds-to-bird-bath` | `/how-to-attract/birds-to-a-bird-bath` |
| `/attract-birds-without-feeder` | `/how-to-attract/birds-without-a-feeder` |
| `/attract-birds-with-sounds` | `/how-to-attract/birds-with-sounds` |
| `/attract-birds-to-your-hand` | `/how-to-attract/birds-to-your-hand` |
| `/attract-birds-in-winter` | `/how-to-attract/birds-in-winter` |
| `/attract-birds-to-balcony` | `/how-to-attract/birds-to-a-balcony` |
| `/attract-birds-to-birdhouse` | `/how-to-attract/birds-to-a-birdhouse` |
| `/birds-that-eat-yard-pests` | `/how-to-attract/birds-that-eat-yard-pests` |

Old URLs must never appear in navigation, internal links, canonical tags, structured data, or the sitemap. They exist only as redirect keys.
