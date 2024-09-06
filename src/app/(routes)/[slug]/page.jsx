import PageBlock from "@/components/page";
import { getPageBySlugAPI, getStoreAPI } from "@/lib/appSyncAPIs";
import { generateSEOAndJSONLD } from "@/utils/helpers/generateSEOAndJSONLD";

export const revalidate = 900;

export async function generateMetadata() {
  const pageData = await getPageBySlugAPI("index");

  if (!pageData?.blocks) {
    return null;
  }

  const store = await getStoreAPI();
  const { webUrl, name } = store || {};

  const findBlock = (typeName) =>
    pageData?.blocks?.find((block) => block?.__typename === typeName) || {};

  const seoComponent = findBlock("ComponentCommonSeo");

  const seoData =
    generateSEOAndJSONLD({
      isProduct: false,
      isCollection: false,
      seoComponent,
      extractedSlug: "index",
      webUrl,
      name,
    }) || {};

  return seoData;
}

export default async function Page({ params }) {
  return <PageBlock {...params} pageType="landing" />;
}
