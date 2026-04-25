import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.32'],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
