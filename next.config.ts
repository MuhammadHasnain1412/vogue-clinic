// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // Keep React compiler enabled

  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  },

  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
    serverComponentsExternalPackages: ["mysql2"], // Allow mysql2 on server only
  },

  turbopack: {}, // Avoid Turbopack errors
};

export default nextConfig;
