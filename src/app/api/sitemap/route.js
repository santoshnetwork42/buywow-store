import { getCMSPagesAPI, getPageMetadataBySlugAPI } from "@/lib/appSyncAPIs";
import { NextResponse } from "next/server";

const { NEXT_PUBLIC_SITE_URL } = process.env;

const processPage = async (page) => {
  const { slug, type } = page || {};
  const metadata = await getPageMetadataBySlugAPI(slug);
  if (!!Object.keys(metadata)?.length) {
    // If metadata has noIndex false & not seoCanonical, then add to sitemap
    if (!metadata.noIndex && !metadata.seoCanonical) {
      return {
        loc: `${NEXT_PUBLIC_SITE_URL}${type === "PRODUCT" ? "/products" : type === "COLLECTION" ? "/collections" : ""}/${slug}`,
        lastmod: metadata.updatedAt,
        changefreq: "daily",
      };
    }
  }
  return null;
};

const getEntiresForSitemap = async () => {
  const productsPages = (await getCMSPagesAPI("product")) || [];
  const collectionPages = (await getCMSPagesAPI("collection")) || [];

  const allSitemapEntries = [];

  const filteredPages = [
    ...productsPages?.map((slug) => {
      return {
        slug,
        type: "PRODUCT",
      };
    }),
    ...collectionPages?.map((slug) => {
      return {
        slug,
        type: "COLLECTION",
      };
    }),
  ];
  const promises = filteredPages.map((page, index) => {
    return processPage(page);
  });
  const results = await Promise.all(promises); // Wait for all API calls to finish
  allSitemapEntries.push(...results.filter((entry) => entry !== null));
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
