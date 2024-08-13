import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogCard3 from "@/components/partials/Blog/BlogCard3";
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

  const { blogs } = await fetchBlogs({
    first: 10,
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
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => <BlogCard3 key={blog.node.id} blog={blog.node} />)}
    </div>
  );
}
