/**
 * Cited editorial content for a single page, keyed by its path.
 *
 * Same contract as the state guides: paragraph strings may carry [n]
 * markers that reference `sources[n]`; the page turns them into links to the
 * source. Numbers that come from site data (eBird counts, plant relationships)
 * are rendered by the template from that data, not restated here.
 */
export type EditorialImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  creditUrl: string;
  license: string;
  licenseUrl: string;
};

export type EditorialContent = {
  path: string;
  /** Primary search phrase; used verbatim in title, H1 and opening paragraph. */
  keyword: string;
  title: string;
  description: string;
  /** Optional H1 override; defaults to the template's H1. */
  h1?: string;
  image?: EditorialImage;
  /** Opening paragraphs — the first one must contain `keyword`. */
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faq: { question: string; answer: string }[];
  sources: { id: number; label: string; url: string }[];
  /** schema.org type for the page-level JSON-LD. */
  schemaType?: "Article" | "HowTo";
  /** For HowTo pages: ordered steps rendered as HowToStep. */
  steps?: { name: string; text: string }[];
};
