import { HOW_TO_REDIRECTS } from "../../lib/url-registry";

export function GET(request: Request) {
  return Response.redirect(new URL(HOW_TO_REDIRECTS["/how-to-attract-birds"], request.url), 301);
}
