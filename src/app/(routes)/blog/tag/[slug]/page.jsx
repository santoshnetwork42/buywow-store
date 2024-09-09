import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";
import { PREBUILD_ALL_PAGES } from "@/config";
import {
  fetchBlogs,
  fetchFeaturedBlogs,
  fetchTag,
  fetchTags,
} from "@/lib/wordPressAPIs";
import handleRedirect from "@/utils/handleRedirect";

export const revalidate = 86400;

export async function generateStaticParams() {
  if (!PREBUILD_ALL_PAGES) {
    return [];
  }

  const tags = await fetchTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function BlogsByTag({ params }) {
  const { slug } = params;

  const tag = await fetchTag(slug);

  if (!tag) {
    return handleRedirect(`/blog/tag/${slug}`);
  }

  const { blogs, pageInfo } = await fetchBlogs({
    first: 9,
    tags: [slug],
  });

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
