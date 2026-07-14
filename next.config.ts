import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export only when BUILD_STATIC=true (for Cloudflare deployment)
  // In development mode (npm run dev), API routes are available for Prismic preview
  ...(process.env.BUILD_STATIC === "true" ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
