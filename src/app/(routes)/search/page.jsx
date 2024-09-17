import SearchResults from "@/components/partials/Others/SearchResult";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";

export const revalidate = 3600;

export const metadata = {
  title: "Search",
  description:
    "Search for products using our advanced search engine. Start your search here.",
};

async function getInitialSearchData() {
  try {
    const initialSearchData = await getPageBySlugAPI("search");
    return (
      (initialSearchData?.blocks &&
        initialSearchData?.blocks[0]?.products?.data) ||
      []
    );
  } catch (error) {
    console.error("Error fetching initial search data:", error);
    return [];
  }
}

export default async function SearchPage() {
  const initialProducts = await getInitialSearchData();

  return (
    <div className="container-main mb-main mt-3 flex flex-1 sm:mt-4 lg:mt-5">
      <SearchResults initialProducts={initialProducts} />
    </div>
  );
}
