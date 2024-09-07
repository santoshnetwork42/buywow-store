import BlogInfiniteScroll from "@/components/partials/Blog/BlogInfiniteScroll";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import { fetchBlogs, fetchFeaturedBlogs } from "@/lib/wordPressAPIs";

// export const revalidate = 86400;

export function metadata() {
  return {
    siteName: "Wow Skin Science",
    title:
      "Best blogs for skin & hair care tips, products for all skin & hair Type",
    description:
      "Discover the ultimate destination for expert skin & hair care tips, along with a curated selection of products for you. Explore our blog",
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  };
}

export default async function Blogs() {
  const { blogs, pageInfo } = await fetchBlogs({
    tags: ["english"],
    first: 49,
  });
  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      <div className="col-span-12 lg:col-span-9">
        <BlogInfiniteScroll blogsData={blogs} pageInfoData={pageInfo} />
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} />
    </div>
  );
}
