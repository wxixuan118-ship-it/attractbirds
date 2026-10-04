import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage, editorialMetadata } from "../components/Editorial";
import { TOOLS } from "../components/ToolLinks";
import { miscEditorial } from "../../data/editorial/misc";
import { SITE } from "../../lib/url-registry";

const content = miscEditorial["/tools"];
export const metadata: Metadata = editorialMetadata(content);

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE.origin}${t.href}` })),
};

export default function Page() {
  return (
    <EditorialPage
      content={content}
      eyebrow="Free interactive tools"
      breadcrumbs={[{ name: "Tools", path: content.path }]}
      extraJsonLd={[itemList]}
      before={
        <section className="loc-section">
          <div className="index-grid">
            {TOOLS.map((t) => (
              <Link href={t.href} className="index-card" key={t.href}>
                <small>{t.label}</small>
                <h2>{t.name}</h2>
                <p>{t.blurb}</p>
                <span>Open tool →</span>
              </Link>
            ))}
          </div>
        </section>
      }
    />
  );
}
