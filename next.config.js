/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: { appDir: true },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/webp"],
    domains: [
      "images.unsplash.com",
      "profile.bugtech.ir",
      "bugtech.ir",
      "shopsoo.ir",
      "str.shopsoo.ir",
      "str.bugtech.ir",
      "unsplash.com",
      "socialistmodernism.com",
      "via.placeholder.com",
      "api.bugtech.ir",
      "localhost",
    ],
    loader: "custom",
    // path: "/public/",
  },
};

module.exports = nextConfig;
