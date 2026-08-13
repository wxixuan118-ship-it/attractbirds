# Keyword-to-URL Map

## Canonical decisions

| Keyword cluster | Canonical URL | Template | Status | Notes |
|---|---|---|---|---|
| how to attract birds | `/how-to-attract-birds` | Pillar guide | Index | Primary educational hub linking Birds, Plants, Feeders, Food, Problems, and Tools |
| how to attract birds to a feeder | `/how-to-attract/birds-to-a-feeder` | Intent guide | Index | All grammatical variants consolidate here |
| how to attract birds to a new feeder | `/how-to-attract/birds-to-a-new-feeder` | Problem guide | Index | Separate new-feeder intent |
| oriole bird | `/birds/oriole` | Bird collection | Index | Disambiguates the group and links species pages |
| Baltimore Oriole | `/birds/baltimore-oriole` | Bird species | Index | Reviewed species data |
| Orchard Oriole | `/birds/orchard-oriole` | Bird species | Index | Taxonomic profile; expand after editorial review |
| bird of paradise plant | `/plants/bird-of-paradise` | Plant profile | Index | Explicitly distinguishes ornamental value from North American native-habitat value |
| bird feeder / feeder bird feeder | `/feeders` | Feeder hub | Index | Do not create `/bird-feeders`; it would compete with the established hub |
| bird food | `/bird-food` | Food hub | Index | Links reviewed food–feeder and bird–feeder pages |
| hummingbird feeder | `/feeders/hummingbird-feeder` | Feeder type | Index | Existing canonical route; no shorter duplicate |
| jungle bird | none yet | Bird collection | Hold | Intent is ambiguous and global; requires scoped taxonomy and geography before publishing |
| killdeer bird | `/birds/killdeer` | Bird species | Index | Reviewed identification, habitat, diet, nesting, and non-feeder guidance |

## Rules for the 99,715-keyword export

The full export should be classified before any new route is generated. Required columns:

`keyword`, `volume`, `intent`, `entity_type`, `entity_id`, `template`, `canonical_url`, `existing_url`, `action`, `evidence_status`, `content_status`, `index_status`, `parent_hub`, `notes`.

Allowed actions are `map_existing`, `create`, `merge`, `redirect`, `hold`, and `reject`. A keyword does not earn a page merely because it has volume.

### Classification order

1. Normalize case, punctuation, plurals, common misspellings, and year modifiers.
2. Resolve exact bird, plant, feeder, food, problem, location, seasonal, or guide entities.
3. Detect mixed or ambiguous entities such as “bird of paradise.”
4. Map synonyms to one canonical URL.
5. Compare with current routes to prevent cannibalization.
6. Require evidence and content-depth gates before `create` becomes indexable.

### Index gate

An indexable URL needs a resolved entity or clearly defined collection, unique search intent, authoritative sources, non-duplicative body content, useful internal links, canonical metadata, and a human review decision. Ambiguous/global clusters such as “jungle birds” remain on hold until they can deliver a defensible scope rather than a thin list.
