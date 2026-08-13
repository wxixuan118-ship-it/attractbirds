import { HOW_TO_REDIRECTS } from "../../../lib/url-registry";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = HOW_TO_REDIRECTS[`/${slug}`];
  if (!destination) return new Response("Not Found", { status: 404 });
  return Response.redirect(new URL(destination, request.url), 301);
}
