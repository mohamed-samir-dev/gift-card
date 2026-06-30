/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/:path*`,
      },
    ];
  },
  // Environment variables for client-side
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8080',
  },
};

module.exports = nextConfig;