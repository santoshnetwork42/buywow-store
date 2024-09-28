import { getCMSPagesForSitemapAPI } from "@/lib/appSyncAPIs";

const { NEXT_PUBLIC_SITE_URL } = process.env;

export default async function sitemap() {
  try {
    const pages = await getCMSPagesForSitemapAPI("LANDING");

    const allSitemapEntries = pages
      .filter(
        ({ metadata, slug }) =>
          !(metadata?.noIndex || metadata?.seoCanonica) && slug !== "index",
      )
      .map(({ slug }) => ({
        url: `${NEXT_PUBLIC_SITE_URL}/${slug}`,
        changeFrequency: "daily",
      }));

    return [
      {
        url: `${NEXT_PUBLIC_SITE_URL}/`,
        changeFrequency: "daily",
      },
      ...allSitemapEntries,
    ];
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${NEXT_PUBLIC_SITE_URL}`,
    };
  }
}

export const revalidate = 86400;
