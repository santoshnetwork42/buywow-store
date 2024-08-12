/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-dev.buywow.in",
        port: "",
        pathname: "/public/wow-cms/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WP_MEDIA_URL,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WP_AVATAR_URL,
      },
    ],
  },
};

export default nextConfig;
