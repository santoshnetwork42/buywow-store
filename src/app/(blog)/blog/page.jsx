import BlogCard from "@/components/partials/Blog/BlogCard";
import { fetchBlogs, fetchFeaturedBlogs } from "@/lib/wordPressAPIs";

import React from "react";

export const revalidate = 3600;

export default async function Blogs() {
  const blogs = await fetchBlogs({
    tags: ["english"],
    first: 49,
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog.node} />)}
    </div>
  );
}
