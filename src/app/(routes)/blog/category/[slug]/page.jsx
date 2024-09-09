import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import {
  fetchBlogs,
  fetchCategory,
  fetchFeaturedBlogs,
} from "@/lib/wordPressAPIs";
import handleRedirect from "@/utils/handleRedirect";

export const revalidate = 86400;

export default async function BlogsByCategory({ params }) {
  const { slug } = params;

  const category = await fetchCategory(slug);

  if (!category) {
    return handleRedirect(`/blog/category/${slug}`);
  }

  const { blogs, pageInfo } = await fetchBlogs({
    category: slug,
    first: 9,
  });

  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      <div className="col-span-12 lg:col-span-9">
        <div className="grid gap-y-6">
          <BlogBreadCrumb
            links={[
              { label: "Blog", url: "/blog" },
              { label: slug, url: `/blog/category/${slug}` },
            ]}
          />

          <BlogInfiniteScroll2
            blogsData={blogs}
            pageInfoData={pageInfo}
            category={slug}
          />
        </div>
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} />
    </div>
  );
}
