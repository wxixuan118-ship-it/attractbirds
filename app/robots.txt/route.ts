export async function GET() {
  return new Response([
    "User-agent: *",
    "Allow: /",
    "Disallow: /_next/",
    "Disallow: /_vinext/",
    "",
    "Sitemap: https://attractbirds.app/sitemap.xml",
    "",
  ].join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
