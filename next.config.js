const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    config.resolve.fallback = { fs: false };
    return config
  },
}

module.exports = withMarkdoc()(nextConfig)
