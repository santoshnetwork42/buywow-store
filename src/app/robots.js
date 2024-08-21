export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/sitemap.xml`,
  };
}
