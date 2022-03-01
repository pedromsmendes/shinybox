/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['poketch-cdn-assets.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
