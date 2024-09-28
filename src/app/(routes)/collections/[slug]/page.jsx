import PageBlock from "@/components/page";
import { PREBUILD_ALL_PAGES } from "@/config";
import {
  getCMSPagesAPI,
  getPageBySlugAPI,
  getStoreAPI,
} from "@/lib/appSyncAPIs";
import { generateSEOAndJSONLD } from "@/utils/helpers/generateSEOAndJSONLD";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = params;

  const pageData = await getPageBySlugAPI(slug);

  if (!pageData?.blocks) {
    return null;
  }

  const store = await getStoreAPI();
  const { webUrl, name } = store || {};

  const findBlock = (typeName) =>
    pageData?.blocks?.find((block) => block?.__typename === typeName) || {};

  const seoComponent = findBlock("ComponentCommonSeo");
  const collectionInfoSection = findBlock("ComponentBlocksInfoSection");
  const pageFaqs = findBlock("ComponentAccordionFaQsSection");
  const collectionProducts = findBlock("ComponentBlocksProductCollectionByTab");

  const seoData =
    generateSEOAndJSONLD({
      isProduct: false,
      isCollection: true,
      seoComponent,
      extractedSlug: slug,
      webUrl,
      collectionInfoSection,
      pageFaqs,
      collectionProducts,
      name,
    }) || {};

  return seoData;
}

export async function generateStaticParams() {
  if (!PREBUILD_ALL_PAGES) {
    return [];
  }
  const pages = await getCMSPagesAPI("COLLECTION");
  return pages.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }) {
  return <PageBlock {...params} pageType="collections" />;
}
