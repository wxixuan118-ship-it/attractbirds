/**
 * Editorial content for a state hub page. Only states with researched,
 * cited copy get an entry; the rest render the shared template.
 *
 * Paragraph strings may contain [n] markers that reference `sources[n]`;
 * the page turns them into footnote links.
 */
export type StateContent = {
  state: string;
  /** Primary search phrase the page targets, used verbatim in the opening paragraph. */
  keyword: string;
  title: string;
  description: string;
  hero: {
    src: string;
    width: number;
    height: number;
    alt: string;
    credit: string;
    creditUrl: string;
    license: string;
    licenseUrl: string;
  };
  intro: string[];
  sections: { heading: string; paragraphs: string[] }[];
  spots: { name: string; blurb: string; url: string }[];
  faq: { question: string; answer: string }[];
  sources: { id: number; label: string; url: string }[];
};
