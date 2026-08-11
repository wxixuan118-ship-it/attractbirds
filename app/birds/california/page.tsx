import { redirect } from "next/navigation";

/**
 * Redirect the old /birds/california URL to the new /birds-by-location/california.
 * Preserves SEO link equity via a 308 permanent redirect.
 */
export default function CaliforniaRedirect() {
  redirect("/birds-by-location/california");
}
