export default function robots() {
  const { NEXT_PUBLIC_SITE_URL, STORE_ENV } = process.env;

  if (STORE_ENV !== "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/bundles/*",
          "/*bag$",
          "/bundles/*",
          "/public/*",
          "/search",
          "/pages/account",
          "/pages/addresses",
          "/pages/account-details",
          "/pages/loyalty",
          "/order/*",
          "/pages/orders",
          "/offers/*",
        ],
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: ["/"],
      },
    ],

    sitemap: [
      `${NEXT_PUBLIC_SITE_URL}/sitemap/product.xml`,
      `${NEXT_PUBLIC_SITE_URL}/sitemap/static.xml`,
      `${NEXT_PUBLIC_SITE_URL}/sitemap/collection.xml`,
      `${NEXT_PUBLIC_SITE_URL}/sitemap/blog.xml`,
    ],
  };
}
