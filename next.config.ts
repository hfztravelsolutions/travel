import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Other config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during builds
  },
};

export default nextConfig;
