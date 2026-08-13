import { HOW_TO_REDIRECTS, SITE } from "../../lib/url-registry";

export function GET() {
  return Response.redirect(new URL(HOW_TO_REDIRECTS["/how-to-attract-birds"], SITE.origin), 301);
}
