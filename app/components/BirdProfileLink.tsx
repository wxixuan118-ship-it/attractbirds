"use client";

import type { MouseEvent, ReactNode } from "react";

type BirdProfileLinkProps = { children: ReactNode; className: string; href: string };

export function BirdProfileLink({ children, className, href }: BirdProfileLinkProps) {
  function openProfile(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(href);
  }

  return <a className={className} href={href} onClick={openProfile}>{children}</a>;
}
