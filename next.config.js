/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Disable telemetry
  telemetry: {
    disabled: true,
  },

  // Strict mode for better error handling
  reactStrictMode: true,

  // Environment variables exposed to the browser (if needed)
  env: {
    // Add any public env vars here
  },

  // Performance optimizations
  swcMinify: true,

  // Experimental features
  experimental: {
    // Enable server actions if needed in future
    // serverActions: true,
  },
}

module.exports = nextConfig
