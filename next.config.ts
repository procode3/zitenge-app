import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false,
  },
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINTER === 'true',
  },
  typescript: {
    ignoreBuildErrors: process.env.SKIP_LINTER === 'true',
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer()(nextConfig)
  : nextConfig;
