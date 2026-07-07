/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'tr', 'hu'],
    defaultLocale: 'en',
    localeDetection: false,
  },
}

module.exports = nextConfig
