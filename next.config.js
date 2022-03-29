const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
    API_GQL_ENDPOINT: process.env.API_GQL_ENDPOINT,
  },
  i18n,
};

module.exports = nextConfig;
