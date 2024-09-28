import { getCMSPagesForSitemapAPI } from "@/lib/appSyncAPIs";

const { NEXT_PUBLIC_SITE_URL } = process.env;

export default async function sitemap() {
  try {
    const pages = await getCMSPagesForSitemapAPI("PAGES");

    const allSitemapEntries = pages
      .filter(({ metadata }) => !(metadata?.noIndex || metadata?.seoCanonica))
      .map(({ slug }) => ({
        url: `${NEXT_PUBLIC_SITE_URL}/pages/${slug}`,
        changeFrequency: "daily",
      }));

    return [
      {
        url: `${NEXT_PUBLIC_SITE_URL}/pages/contact-us`,
        changeFrequency: "daily",
      },
      {
        url: `${NEXT_PUBLIC_SITE_URL}/pages/query-us`,
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
