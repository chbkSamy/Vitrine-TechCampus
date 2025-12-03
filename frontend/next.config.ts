import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Port de Strapi par défaut
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1", // Ajoute aussi l'IP au cas où
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
