// ─── eBird ────────────────────────────────────────────────────────────────────

export interface EBirdTaxon {
  sciName: string;
  comName: string;
  speciesCode: string;
  category: "species" | "issf" | "spuh" | "slash" | "hybrid" | "intergrade" | "domestic" | "form";
  taxonOrder: number;
  order: string;
  familyComName: string;
  familySciName: string;
  bandingCodes?: string[];
  comNameCodes?: string[];
  sciNameCodes?: string[];
  extinct?: boolean;
  extinctYear?: number;
}

export interface EBirdRegionSpecies {
  speciesCode: string;
  comName: string;
  sciName: string;
  locName?: string;
  obsDt?: string;
  howMany?: number;
}

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
}

// ─── Wikimedia Commons ────────────────────────────────────────────────────────

export interface WikimediaPage {
  pageid: number;
  title: string;
  imageinfo?: Array<{
    url: string;
    descriptionurl: string;
    extmetadata?: {
      License?: { value: string };
      LicenseUrl?: { value: string };
      Artist?: { value: string };
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
