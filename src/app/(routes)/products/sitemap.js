import { getCMSPagesForSitemapAPI } from "@/lib/appSyncAPIs";

const { NEXT_PUBLIC_SITE_URL } = process.env;

export default async function sitemap() {
  try {
    const pages = await getCMSPagesForSitemapAPI("PRODUCT");

    const allSitemapEntries = pages
      .filter(({ metadata }) => !(metadata?.noIndex || metadata?.seoCanonica))
      .map(({ slug }) => ({
        url: `${NEXT_PUBLIC_SITE_URL}/products/${slug}`,
        changeFrequency: "daily",
      }));

    return allSitemapEntries;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${NEXT_PUBLIC_SITE_URL}`,
    };
  }
}

export const revalidate = 86400;
