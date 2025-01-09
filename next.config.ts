import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Other config options here */
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true, // Disable ESLint checks during builds
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
