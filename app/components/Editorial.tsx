import type { ReactNode } from "react";
import type { EditorialContent } from "../../data/editorial/types";
import Link from "next/link";
import { SITE } from "../../lib/url-registry";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Render "[n]" citation markers as links straight to the cited source. */
export function Cited({ text, sources }: { text: string; sources: EditorialContent["sources"] }): ReactNode {
  return text.split(/(\[\d+\])/g).map((part, i) => {
    const m = part.match(/^\[(\d+)\]$/);
    if (!m) return part;
    const source = sources.find((s) => s.id === Number(m[1]));
    if (!source) return null;
    return (
      <sup key={i} className="cite">
        <a href={source.url} rel="noopener noreferrer" target="_blank" title={source.label} aria-label={`Source ${m[1]}: ${source.label}`}>{m[1]}</a>
      </sup>
    );
  });
}

export function EditorialHero({ content }: { content: EditorialContent }) {
  if (!content.image) return null;
  const img = content.image;
  return (
    <figure className="state-hero-figure">
      {/* Static, licensed image committed to the repo. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} alt={img.alt} width={img.width} height={img.height} fetchPriority="high" decoding="async" />
      <figcaption>
        Photo: <a href={img.creditUrl} rel="noopener noreferrer" target="_blank">{img.credit}</a>,{" "}
        <a href={img.licenseUrl} rel="noopener noreferrer license" target="_blank">{img.license}</a>, via Wikimedia Commons.
      </figcaption>
    </figure>
  );
}

/** Opening paragraphs with citations, for use inside a template's hero. */
export function EditorialIntro({ content }: { content: EditorialContent }) {
  return (
    <>
      {content.intro.map((p, i) => (
        <p key={i} className="lede"><Cited text={p} sources={content.sources} /></p>
      ))}
    </>
  );
}

/** Body sections, FAQ and source list. */
export function EditorialBody({ content, children, faqHeading = "Frequently asked questions", sourcesHeading = "Sources" }: { content: EditorialContent; children?: ReactNode; /** Override the FAQ / Sources H2s (e.g. to keep them on the page's keyword). */ faqHeading?: string; sourcesHeading?: string }) {
  return (
    <>
      {content.sections.map((section) => (
        <section key={section.heading} className="loc-section loc-prose">
          <div className="loc-section-header"><h2>{section.heading}</h2></div>
          <div className="prose">
            {section.paragraphs.map((p, i) => (
              <p key={i}><Cited text={p} sources={content.sources} /></p>
            ))}
          </div>
        </section>
      ))}
      {children}
      {content.faq.length > 0 && (
        <section className="loc-section loc-prose" style={{ background: "var(--card)" }}>
          <div className="loc-section-header"><h2>{faqHeading}</h2></div>
          <div className="prose">
            {content.faq.map((f) => (
              <div key={f.question} className="faq-item">
                <h3>{f.question}</h3>
                <p><Cited text={f.answer} sources={content.sources} /></p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="loc-section loc-prose" style={{ paddingBottom: "64px" }}>
        <div className="loc-section-header"><h2>{sourcesHeading}</h2></div>
        <div className="prose">
          <ol className="source-list">
            {content.sources.map((s) => (
              <li key={s.id} id={`source-${s.id}`}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.label}</a></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

/** Page-level JSON-LD: Article or HowTo, plus FAQPage and BreadcrumbList. */
export function editorialJsonLd(content: EditorialContent, breadcrumbs: { name: string; path: string }[], extra: Record<string, unknown>[] = []): Record<string, unknown>[] {
  const pageUrl = `${SITE.origin}${content.path}`;
  const stripCites = (s: string) => s.replace(/\s*\[\d+\]/g, "");
  const blocks: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...breadcrumbs].map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: `${SITE.origin}${b.path}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": content.schemaType ?? "Article",
      ...(content.schemaType === "HowTo" ? { name: content.title } : { headline: content.title }),
      description: content.description,
      mainEntityOfPage: pageUrl,
      ...(content.image ? { image: `${SITE.origin}${content.image.src}` } : {}),
      ...(content.schemaType === "HowTo" && content.steps ? { step: content.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: stripCites(s.text) })) } : {}),
      author: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
      publisher: { "@type": "Organization", name: SITE.brand, url: SITE.origin },
      citation: content.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
    },
    ...extra,
  ];
  if (content.faq.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: stripCites(f.answer) } })),
    });
  }
  return blocks;
}

export function JsonLd({ blocks }: { blocks: Record<string, unknown>[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
    </>
  );
}

export function editorialMetadata(content: EditorialContent) {
  return {
    title: { absolute: content.title },
    description: content.description,
    alternates: { canonical: content.path },
    robots: { index: true, follow: true },
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article" as const,
      ...(content.image ? { images: [{ url: content.image.src, width: content.image.width, height: content.image.height, alt: content.image.alt }] } : {}),
    },
  };
}

/**
 * Full page layout for an editorial entry: hero (eyebrow, H1, intro, image),
 * body sections, optional extra sections (children), FAQ and sources.
 */
export function EditorialPage({ content, eyebrow, breadcrumbs, children, extraJsonLd = [], aside, before, hero }: { content: EditorialContent; eyebrow: string; breadcrumbs: { name: string; path: string }[]; children?: ReactNode; extraJsonLd?: Record<string, unknown>[]; aside?: ReactNode; /** Rendered between the hero and the editorial body (tools, grids). */ before?: ReactNode; /** Replaces the default hero entirely. */ hero?: ReactNode }) {
  const blocks = editorialJsonLd(content, breadcrumbs, extraJsonLd);
  const last = breadcrumbs[breadcrumbs.length - 1];
  return (
    <div className="site-shell">
      <Header />
      <main>
        <JsonLd blocks={blocks} />
        {breadcrumbs.length > 0 && <div className="breadcrumb">
          <Link href="/">Home</Link>
          {breadcrumbs.slice(0, -1).map((b) => (<span key={b.path}> / <Link href={b.path}>{b.name}</Link></span>))}
          {last && <span> / {last.name}</span>}
        </div>}
        {hero ?? (
          <section className="location-hero">
            <p className="eyebrow" style={{ marginBottom: "12px" }}><span /> {eyebrow}</p>
            <h1>{content.h1 ?? content.title.split(":")[0]}</h1>
            <EditorialIntro content={content} />
            <EditorialHero content={content} />
            {aside}
          </section>
        )}
        {before}
        <EditorialBody content={content}>{children}</EditorialBody>
      </main>
      <Footer />
    </div>
  );
}
