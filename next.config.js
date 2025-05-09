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
      "monitorex.ir",
      "str.monitorex.ir",
      "str.bugtech.ir",
      "unsplash.com",
      "socialistmodernism.com",
      "via.placeholder.com",
      "api.bugtech.ir",
      "localhost",
    ],
    loader: "custom",
    //only for tauri mode
    images: {
      unoptimized: true,
    },
    // path: "/public/",
  },
};

module.exports = nextConfig;
