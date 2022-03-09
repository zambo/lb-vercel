/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["wp.leadboxer.com", "secure.gravatar.com"],
  },
};

module.exports = withBundleAnalyzer(withPlaiceholder(nextConfig));
