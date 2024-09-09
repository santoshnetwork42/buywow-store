/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    const paylolad = [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      {
        source: "/landing/sitemap.xml",
        destination: "/api/landing-sitemap",
      },
    ];
    return paylolad;
  },

  async redirects() {
    const allRedirects = [
      {
        source: "/blog/robots.txt",
        destination: "/robots.txt",
        permanent: true,
      },
      {
        source: "/blog/tag/:slug/page/:page",
        destination: "/blog/tag/:slug",
        permanent: true,
      },
      {
        source: "/blog/category/:slug/page/:page",
        destination: "/blog/category/:slug",
        permanent: true,
      },
      {
        source: "/blog/:slug/feed",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/blog/:slug/1000",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/blog/page/:number",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/product/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/pages/login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pages/cart",
        destination: "/?cart=1",
        permanent: false,
      },
      {
        source: "/pages/checkout",
        destination: "/checkout",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/?cart=1",
        permanent: false,
      },
      {
        source: "/shop",
        destination: "/collections/all",
        permanent: true,
      },
      {
        source: "/shop/:slug*",
        destination: "/collections/all",
        permanent: true,
      },
      {
        source: "/categories/:slug*",
        destination: "/collections/:slug*",
        permanent: true,
      },
      {
        source: "/buywow/orders",
        destination: "/pages/account",
        permanent: true,
      },
      {
        source: "/buywow/bag",
        destination: "/",
        permanent: true,
      },
      {
        source: "/buywow/account",
        destination: "/pages/account",
        permanent: true,
      },
      {
        source: "/buywow/categories",
        destination: "/collections/all",
        permanent: true,
      },
      {
        source: "/p/:any",
        destination: "/pages/:any",
        permanent: true,
      },
      {
        source: "/p/terms-of-service",
        destination: "/policies/terms-of-service",
        permanent: true,
      },
      {
        source: "/p/privacy-policy",
        destination: "/policies/privacy-policy",
        permanent: true,
      },
      {
        source: "/elements",
        destination: "/",
        permanent: true,
      },
      {
        source: "/elements/:any",
        destination: "/",
        permanent: true,
      },
      {
        source: "/collections/search",
        destination: "/search",
        permanent: true,
      },
    ];

    return allRedirects;
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
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
