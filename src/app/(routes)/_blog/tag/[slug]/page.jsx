import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import { fetchBlogs, fetchFeaturedBlogs, fetchTags } from "@/lib/wordPressAPIs";
import handleRedirect from "@/utils/handleRedirect";

// export const revalidate = 86400;

export async function generateStaticParams() {
  const tags = await fetchTags();

  if (!tags || tags.length === 0) {
    return [];
  }

  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function BlogsByTag({ params }) {
  const { slug } = params;

  const { blogs, pageInfo } = await fetchBlogs({
    first: 9,
    tags: [slug],
  });

  if (!blogs || blogs.length === 0) {
    return await handleRedirect(`/blog/tag/${slug}`);
  }

  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      <div className="col-span-12 lg:col-span-9">
        <div className="grid gap-y-6">
          <BlogBreadCrumb
            links={[
              { label: "Blog", url: "/blog" },
              { label: slug, url: `/blog/tag/${slug}` },
            ]}
          />

          <BlogInfiniteScroll2
            blogsData={blogs}
            pageInfoData={pageInfo}
            tags={[slug]}
          />
        </div>
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} />
    </div>
  );
}
