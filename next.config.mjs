/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-uat.buywow.in",
        port: "",
        pathname: "/public/wow-cms/**",
      },
    ],
  },
};

export default nextConfig;
