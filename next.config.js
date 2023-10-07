/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "jghdcweypzxylqpmrvsn.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  ...nextConfig,
};





