/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static optimization to avoid prerendering issues
  experimental: {
    disableOptimizedLoading: true,
  },
  // Force all pages to be SSR for now
  async redirects() {
    return []
  },
}

module.exports = nextConfig
