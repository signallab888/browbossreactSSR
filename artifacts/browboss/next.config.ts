import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.kirk.replit.dev", "*.replit.dev"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "browboss.com" },
    ],
  },
};

export default nextConfig;
