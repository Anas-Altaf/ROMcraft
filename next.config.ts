import type { NextConfig } from "next";

// GitHub Pages project sites are served at /<repo>/; user/organization sites
// (and custom domains) are usually served at /. Set at BUILD time.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || process.env.PAGES_BASE_PATH || "").replace(/\/$/, "");
if (basePath && (!basePath.startsWith("/") || basePath.includes("//"))) {
  throw new Error(`Invalid NEXT_PUBLIC_BASE_PATH: ${basePath}`);
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Static hosts do not apply Next.js headers() directives. Configure security
  // headers in the hosting service if it supports them (GitHub Pages does not).
};

export default nextConfig;
