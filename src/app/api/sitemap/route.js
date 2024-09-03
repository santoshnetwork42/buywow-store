import { getCMSPagesAPI, getPageMetadataBySlugAPI } from "@/lib/appSyncAPIs";
import { NextResponse } from "next/server";

const { NEXT_PUBLIC_SITE_URL } = process.env;

const getEntiresForSitemap = async () => {
  const pages = await getCMSPagesAPI();

  const allSitemapEntries = [];

  const filteredPages = pages?.filter(
    (page) =>
      page?.attributes?.type === "PRODUCT" ||
      page?.attributes?.type === "COLLECTION",
  );
  console.log(pages, "_+________+++");

  for (const page of filteredPages) {
    const isProduct = page?.attributes?.type === "PRODUCT";

    const metadata = await getPageMetadataBySlugAPI(
      page?.attributes?.slug,
      page?.attributes?.type,
    );
    // if metadata is not empty object
    if (!!Object.keys(metadata)?.length) {
      // if metadata has noIndex false & not seoCanonical  then add to sitemap
      if (!metadata.noIndex && !metadata.seoCanonical) {
        allSitemapEntries.push({
          loc: `${NEXT_PUBLIC_SITE_URL}/${isProduct ? "products" : "collections"}/${page?.attributes?.slug}`,
          lastmod: metadata.updatedAt,
          changefreq: "daily",
        });
      }
    }
  }

  return allSitemapEntries;
};

export async function GET(req, res) {
  try {
    const entries = await getEntiresForSitemap();

    const siteMapLinks = [
      {
        loc: `${NEXT_PUBLIC_SITE_URL}`,
      },
      ...entries,
    ];

    const sitemapContent = buildSitemapXml(siteMapLinks);
    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

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
