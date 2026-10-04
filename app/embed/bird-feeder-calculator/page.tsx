import type { Metadata } from "next";
import { Calculator } from "../../tools/bird-feeder-calculator/Calculator";
import { HeightReporter } from "./HeightReporter";
import { SITE, URL_REGISTRY } from "../../../lib/url-registry";

// Framed on other sites; the full tool page is the one that should rank.
export const metadata: Metadata = {
  title: { absolute: `Bird Feeder Calculator | ${SITE.brand}` },
  description: "Embeddable bird feeder calculator: how many feeders and which types for your space and birds.",
  alternates: { canonical: URL_REGISTRY.tools.feederCalculator },
  robots: { index: false, follow: true },
};

export default function EmbedFeederCalculator() {
  return (
    <main className="embed-shell">
      <Calculator />
      <p className="embed-credit">
        Bird feeder calculator by{" "}
        <a href={`${SITE.origin}${URL_REGISTRY.tools.feederCalculator}`} target="_blank" rel="noopener noreferrer">{SITE.brand}</a>
        {" · "}
        <a href={`${SITE.origin}${URL_REGISTRY.feeders.hub}`} target="_blank" rel="noopener noreferrer">Feeder guides</a>
      </p>
      <HeightReporter />
    </main>
  );
}
