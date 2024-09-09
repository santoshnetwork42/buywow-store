import { getCMSPagesForSitemapAPI } from "@/lib/appSyncAPIs";
import { NextResponse } from "next/server";

const buildSitemapXml = (fields) => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<url>${field.join("")}</url>\n`;
    })
    .join("");

  return withXMLTemplate(content);
};

const withXMLTemplate = (content) => {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- This is the parent sitemap containing all entries. -->
     \n${content}</urlset>`;
};

export async function GET() {
  const pages = (await getCMSPagesForSitemapAPI("landing")) || [];
  const { NEXT_PUBLIC_SITE_URL } = process.env;

  try {
    const sitemapEntries = pages?.map((page) => ({
      loc: `${NEXT_PUBLIC_SITE_URL}/${page}`,
      lastmod: page?.updatedAt,
      changefreq: "daily",
    }));

    const siteMapLinks = [
      {
        loc: `${NEXT_PUBLIC_SITE_URL}`,
      },
      ...sitemapEntries,
    ];

    const sitemapContent = buildSitemapXml(siteMapLinks);
    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=60, must-revalidate", // Caching for 1 mins
      },
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    return new NextResponse("Error fetching data", {
      status: 500,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
}
