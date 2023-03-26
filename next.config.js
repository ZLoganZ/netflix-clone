/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "mango.blender.org",
      "uhdtv.io",
      "download.blender.org",
    ],
  },
};

module.exports = nextConfig;
