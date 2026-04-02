/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/firstnationalbankdemo",
  assetPrefix: "/firstnationalbankdemo",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
