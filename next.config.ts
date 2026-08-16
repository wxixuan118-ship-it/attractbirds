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
    ];
  },
};

export default nextConfig;
