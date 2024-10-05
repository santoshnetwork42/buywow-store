/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    const paylolad = [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/api/apple-app-site-association",
      },
      {
        source: "/apple-app-site-association",
        destination: "/api/apple-app-site-association",
      },
      {
        source: "/.well-known/assetlinks.json",
        destination: "/api/assetlinks",
      },
    ];
    return paylolad;
  },

  async redirects() {
    const allRedirects = [
      {
        source: "/:path*\\.json",
        destination: "/404",
        permanent: true,
        has: [
          {
            type: "query",
            key: "path",
            value: "(?!^\\.well-known/assetlinks$).*",
          },
        ],
      },
      {
        source:
          "/:path*\\.(tgz|gz|bz|php|zip|tar|bak|rar|atom|cgi|env|php7|html|php8|asp|pl|save|swp|tmp|php~|exe|orig|old|bkp|copy|cfm|php4)",
        destination: "/404",
        permanent: false,
      },
      {
        source:
          "/:path(manager|user|new|home|old|backup|main|bk|bc|wp|wordpress|admin|administrator|pma|max|login|static|concat|downloadapp|wp-content|wp-admin|gallery|chosen|sw.js|career|careers|client|roundcube|ispmgr|security|trust-security|termsandconditions|privacy-policy|security.txt|ads.txt|jobs)",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/:path(products|collections)",
        destination: "/collections/all",
        permanent: true,
      },
      {
        source: "/:path*(.*phpmyadmin.*)",
        destination: "/404",
        permanent: false,
      },
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
        source: "/collections/search",
        destination: "/search",
        permanent: true,
      },
      {
        source: "/query-us",
        destination: "/pages/query-us",
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
