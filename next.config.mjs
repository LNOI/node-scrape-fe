/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.*",
      },
    ],
  },
};

export default nextConfig;
