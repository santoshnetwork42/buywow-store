import { getCMSPagesForSitemapAPI } from "@/lib/appSyncAPIs";

const { NEXT_PUBLIC_SITE_URL } = process.env;

export default async function sitemap() {
  try {
    const productsPages = (await getCMSPagesForSitemapAPI("policies")) || [];
    return productsPages.map((page) => ({
      url: `${NEXT_PUBLIC_SITE_URL}/policies/${page}`,
      lastModified: page.updatedAt,
      changeFrequency: "daily",
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${NEXT_PUBLIC_SITE_URL}`,
    };
  }
}
export const revalidate = 120;
