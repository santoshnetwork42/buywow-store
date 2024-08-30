import SearchResults from "@/components/partials/Others/SearchResult";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import { unstable_cache } from "next/cache";

export const revalidate = 60;

export const metadata = {
  title: "Search",
  description:
    "Search for products using our advanced search engine. Start your search here.",
};

const cachedGetPageBySlugAPI = unstable_cache(
  async (slug) => getPageBySlugAPI(slug),
  ["page-by-slug-search"],
  { revalidate: 60 },
);

async function getInitialSearchData() {
  try {
    const initialSearchData = await cachedGetPageBySlugAPI("search");
    return initialSearchData?.blocks[0]?.products?.data || [];
  } catch (error) {
    console.error("Error fetching initial search data:", error);
    return [];
  }
}

export default async function SearchPage() {
  const initialProducts = await getInitialSearchData();

  return (
    <div className="container-main mb-main mt-3 sm:mt-4 lg:mt-5">
      <SearchResults initialProducts={initialProducts} />
    </div>
  );
}
