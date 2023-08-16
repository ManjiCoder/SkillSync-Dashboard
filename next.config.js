/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "d1tl44nezj10jx.cloudfront.net"],
  },
};

module.exports = nextConfig;
