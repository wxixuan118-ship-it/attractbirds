# SEO Index Eligibility Audit

Audit date: 2026-08-13

## Location inventory

| Route class | Audited | Index eligible now | Decision |
|---|---:|---:|---|
| Location hub | 1 | 1 | Keep indexed |
| State hubs | 50 | 50 | Keep indexed; continue source review |
| City pages | 191 | 0 | `noindex, follow`; exclude from sitemap until unique city evidence and review fields exist |
| State × bird pages | 5,000 | 0 | `noindex, follow`; exclude until real occurrence statistics pass the relationship gate |
| Total | 5,242 | 51 | 5,191 remain accessible but are not submitted for indexing |

State × bird eligibility requires real observation data, positive frequency, a current dataset version, source provenance, non-inferred seasonality, and reviewed location-specific copy. Static fallback months never qualify.

## Bird inventory

| Route class | Audited | Index eligible now | Decision |
|---|---:|---:|---|
| Bird encyclopedia hub | 1 | 1 | Keep indexed |
| Species profiles | 1,000 | 12 | Only profiles with quality score ≥80, a tracked source, specific identification, nesting, food, plant, and feeder data qualify |

The remaining 988 taxonomy profiles stay accessible as `noindex, follow`, retain self-canonicals, and are excluded from the sitemap until editorial review raises their data completeness.

## How-to URL consolidation

The Pillar remains `/how-to-attract-birds`. All eleven child guides now use `/how-to-attract/{intent}`. Previous root-level guide URLs permanently redirect to the matching canonical route and are excluded from the sitemap.
