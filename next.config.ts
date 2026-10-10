import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ngrok tunnels during development
  experimental: {
    allowedDevOrigins: ["*.ngrok-free.dev", "*.ngrok-free.app", "*.ngrok.app"],
  },
};

export default nextConfig;
