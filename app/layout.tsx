import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "../lib/url-registry";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: `Attract Birds to Your Backyard | ${SITE.brand}`, template: `%s | ${SITE.brand}` },
  description: "Find the right native plants, food, feeders, and shelter to attract birds where you live.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { type: "website", siteName: SITE.brand, title: "Bring more birds to your backyard", description: "Local, practical guidance for building a backyard birds will return to.", images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.brand} — Bring more birds to your backyard` }] },
  twitter: { card: "summary_large_image", title: "Bring more birds to your backyard", description: "Local, practical guidance for building a backyard birds will return to.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
