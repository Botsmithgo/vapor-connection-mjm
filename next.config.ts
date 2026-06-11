import type { NextConfig } from "next";

// GitHub Pages serves a project repo under /<repo>/, so assets need that
// prefix. Gated behind GH_PAGES so local dev + other hosts stay at root.
const ghPages = process.env.GH_PAGES === "true";
const repo = "/vapor-connection-mjm";

const nextConfig: NextConfig = {
  // Static export so the demo deploys as plain files (host-agnostic,
  // no server runtime needed). The site is fully static already.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(ghPages ? { basePath: repo, assetPrefix: repo } : {}),
};

export default nextConfig;
