import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ← Isso desativa o lint no `next build`
  },
  
  
};

export default nextConfig;
