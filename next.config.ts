import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import ThreeMinifierPlugin from '@yushijinhun/three-minifier-webpack';
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
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.cache = false;
      const threeMinifier = new ThreeMinifierPlugin();
      config.plugins.unshift(threeMinifier);
      config.resolve.plugins.unshift(threeMinifier.resolver);
    }
    return config;
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer()(nextConfig)
  : nextConfig;
