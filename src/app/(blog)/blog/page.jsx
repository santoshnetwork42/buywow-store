import { Heading } from "@/components/elements";
import BlogCard from "@/components/partials/Blog/BlogCard";
import BlogCard2 from "@/components/partials/Blog/BlogCard2";
import { fetchBlogs, fetchFeaturedBlogs } from "@/lib/wordPressAPIs";

import React from "react";

export const revalidate = 3600;

export default async function Blog() {
  const blogs = await fetchBlogs({
    tag: ["english"],
    first: 49,
  });

  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-6 py-6">
      <div className="col-span-12 grid gap-4 md:col-span-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog.node} />)}
      </div>

      <div className="col-span-4 hidden md:block">
        {
          <div className="sticky top-12">
            <Heading as="h3" size="xl" className="mb-4">
              Top Blogs
            </Heading>

            <div className="grid gap-y-4">
              {featuredBlogs &&
                featuredBlogs.length > 0 &&
                featuredBlogs.map((blog) => (
                  <div key={blog.id}>
                    <BlogCard2 blog={blog} />
                  </div>
                ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
