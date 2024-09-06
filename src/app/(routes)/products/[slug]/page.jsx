import PageBlock from "@/components/page";
import { getPageBySlugAPI, getStoreAPI } from "@/lib/appSyncAPIs";
import { generateSEOAndJSONLD } from "@/utils/helpers/generateSEOAndJSONLD";

export const revalidate = 900;

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
  const pdpSection = findBlock("ComponentBlocksPdp");
  const pageFaqs = findBlock("ComponentAccordionFaQsSection");

  const seoData =
    generateSEOAndJSONLD({
      isProduct: true,
      isCollection: false,
      pdpSection,
      seoComponent,
      extractedSlug: slug,
      webUrl,
      pageFaqs,
      name,
    }) || {};

  return seoData;
}

export default async function Page({ params }) {
  return <PageBlock {...params} pageType="products" />;
}
