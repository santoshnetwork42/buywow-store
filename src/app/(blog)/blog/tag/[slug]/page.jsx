import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogCard3 from "@/components/partials/Blog/BlogCard3";
import { fetchBlogs } from "@/lib/wordPressAPIs";
import React from "react";

export default async function BlogByCategory({ params }) {
  const { slug } = params;

  const blogs = await fetchBlogs({
    first: 10,
    tags: [slug],
  });

  return (
    <div className="grid gap-4">
      <BlogBreadCrumb
        links={[
          { label: "Blog", url: "/blog" },
          { label: slug, url: `/blog/tag/${slug}` },
        ]}
      />
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => <BlogCard3 key={blog.id} blog={blog.node} />)}
    </div>
  );
}
