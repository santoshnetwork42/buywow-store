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
        userAgent: ["Applebot"],
        disallow: ["/"],
      },
    ],

    sitemap: [
      `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
      `${NEXT_PUBLIC_SITE_URL}/landing/sitemap.xml`,
      `${NEXT_PUBLIC_SITE_URL}/products/sitemap.xml`,
      `${NEXT_PUBLIC_SITE_URL}/collections/sitemap.xml`,
      `${NEXT_PUBLIC_SITE_URL}/blog/sitemap.xml`,
      `${NEXT_PUBLIC_SITE_URL}/policies/sitemap.xml`,
      `${NEXT_PUBLIC_SITE_URL}/pages/sitemap.xml`,
    ],
  };
}
