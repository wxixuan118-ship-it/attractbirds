// ─── GBIF ─────────────────────────────────────────────────────────────────────

export interface GbifSpeciesMatch {
  usageKey: number;
  scientificName: string;
  canonicalName: string;
  rank: string;
  status: string;
  confidence: number;
  matchType: "EXACT" | "FUZZY" | "HIGHERRANK" | "NONE";
  kingdom: string;
  phylum: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export interface GbifMedia {
  type: "StillImage" | "Sound" | "MovingImage";
  format?: string;
  identifier: string;       // direct image URL
  references?: string;      // page URL
  title?: string;
  description?: string;
  created?: string;
  creator?: string;
  contributor?: string;
  publisher?: string;
  license: string;          // e.g. "http://creativecommons.org/licenses/by-sa/4.0/"
  rightsHolder?: string;
}

export interface GbifOccurrence {
  key: number;
  speciesKey: number;
  scientificName: string;
  countryCode: string;
  stateProvince?: string;
  decimalLatitude?: number;
  decimalLongitude?: number;
  month?: number;
  year?: number;
  media?: GbifMedia[];
}

export interface GbifOccurrenceSearchResult {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  count: number;
  results: GbifOccurrence[];
  facets?: Array<{ field: string; counts: Array<{ name: string; count: number }> }>;
}

// ─── Wikimedia Commons ────────────────────────────────────────────────────────

export interface WikimediaPage {
  pageid: number;
  title: string;
  imageinfo?: Array<{
    url: string;
    thumburl?: string;
    descriptionurl: string;
    extmetadata?: {
      License?: { value: string };
      LicenseShortName?: { value: string };
      LicenseUrl?: { value: string };
      Artist?: { value: string };
      Credit?: { value: string };
      ImageDescription?: { value: string };
    };
  }>;
}

export interface WikimediaQueryResult {
  query: {
    categorymembers?: Array<{ pageid: number; title: string }>;
    pages?: Record<string, WikimediaPage>;
  };
  continue?: { cmcontinue: string };
}

// ─── Import result ────────────────────────────────────────────────────────────

export interface ImportResult {
  source: string;
  inserted: number;
  updated: number;
  skipped: number;
  errors: string[];
}
