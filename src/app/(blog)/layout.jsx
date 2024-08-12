import { Heading } from "@/components/elements";
import BlogCard2 from "@/components/partials/Blog/BlogCard2";
import { fetchFeaturedBlogs } from "@/lib/wordPressAPIs";
import React from "react";

export default async function BlogLayout({ children }) {
  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="container-main mb-main grid grid-cols-12 gap-8 py-6">
      <div className="col-span-12 md:col-span-9">{children}</div>

      <div className="col-span-3 hidden md:block">
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
