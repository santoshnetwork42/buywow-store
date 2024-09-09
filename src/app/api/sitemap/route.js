import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  // Define your sitemaps here
  const sitemaps = [
    {
      loc: `${baseUrl}/landing/sitemap.xml`,
    },
    {
      loc: `${baseUrl}/products/sitemap.xml`,
    },
    {
      loc: `${baseUrl}/collections/sitemap.xml`,
    },
    {
      loc: `${baseUrl}/blog/sitemap.xml`,
    },
    {
      loc: `${baseUrl}/policies/sitemap.xml`,
    },
    {
      loc: `${baseUrl}/pages/sitemap.xml`,
    },
  ];

  const content = sitemaps
    .map((sitemap) => {
      return `
          <sitemap>
            <loc>${sitemap.loc}</loc>
          </sitemap>`;
    })
    .join("\n");

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${content}
    </sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, must-revalidate", // Caching for 1 hour
    },
  });
}
