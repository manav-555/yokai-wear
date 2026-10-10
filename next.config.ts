import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable eslint blocking on production build to prevent dependency mismatches
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensure strict builds
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
