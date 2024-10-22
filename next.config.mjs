/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //   This pattern below that accepts all hostname is not recommended for production
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
