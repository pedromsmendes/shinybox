/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
    API_GQL_ENDPOINT: process.env.API_GQL_ENDPOINT,
  },
  images: {
    domains: ['poketch-cdn-assets.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
