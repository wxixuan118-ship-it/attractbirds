import type { CSSProperties, ReactNode } from "react";

type BirdProfileLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
  /** Full bird name; becomes the link's accessible name so crawlers and screen readers get a clean anchor. */
  birdName?: string;
  style?: CSSProperties;
};

/**
 * Plain crawlable anchor for bird cards. Card contents (name, scientific name,
 * family, …) render inside the link so the visible anchor text always carries
 * the bird's full common name.
 */
export function BirdProfileLink({ children, className, href, birdName, style }: BirdProfileLinkProps) {
  return (
    <a href={href} className={className} style={style} aria-label={birdName}>
      {children}
    </a>
  );
}
