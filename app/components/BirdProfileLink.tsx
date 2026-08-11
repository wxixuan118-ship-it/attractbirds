import type { ReactNode } from "react";

type BirdProfileLinkProps = { children: ReactNode; className: string; href: string };

export function BirdProfileLink({ children, className, href }: BirdProfileLinkProps) {
  return <form action={href} method="get" className="bird-profile-form"><button className={className} type="submit">{children}</button></form>;
}
