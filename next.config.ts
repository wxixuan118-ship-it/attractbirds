import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.attractbirds.app" }],
        destination: "https://attractbirds.app/:path*",
        permanent: true,
      },
      // Duplicate noindex hub retired in favour of the indexed seasonal hub.
      { source: "/birds/seasonal", destination: "/seasonal-birds", permanent: true },
      // Was a temporary (307) redirect from a page component.
      { source: "/birds/california", destination: "/birds-by-location/california", permanent: true },
    ];
  },
};

export default nextConfig;
