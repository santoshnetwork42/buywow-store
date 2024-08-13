import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import { fetchBlogs, fetchTags } from "@/lib/wordPressAPIs";
import React from "react";

export const revalidate = 3600;

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
    return {
      notFound: true,
    };
  }

  return (
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
  );
}
