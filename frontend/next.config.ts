import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // For static export on Netlify
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
