import {
  getCMSPagesForSitemapAPI,
  getPageMetadataBySlugAPI,
} from "@/lib/appSyncAPIs";

const { NEXT_PUBLIC_SITE_URL } = process.env;

const productsLink = async () => {
  try {
    const productsPages = (await getCMSPagesForSitemapAPI("product")) || [];
    const allSitemapEntries = (
      await Promise.all(productsPages.map((slug) => processPage(slug)))
    ).filter((entry) => entry !== null);
    return allSitemapEntries;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    };
  }
};

const processPage = async (slug) => {
  const metadata = await getPageMetadataBySlugAPI(slug);
  if (!!Object.keys(metadata)?.length) {
    // If metadata has noIndex false & not seoCanonical, then add to sitemap
    if (!metadata.noIndex && !metadata.seoCanonical) {
      return {
        url: `${NEXT_PUBLIC_SITE_URL}/products/${slug}`,
        lastModified: metadata.updatedAt,
        changeFrequency: "daily",
      };
    }
  }
  return null;
};

export default async function sitemap() {
  return await productsLink();
}
export const revalidate = 120;
