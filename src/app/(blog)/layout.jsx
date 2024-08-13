import React, { Suspense } from "react";
import { Heading } from "@/components/elements";
import BlogCard2 from "@/components/partials/Blog/BlogCard2";
import BlogCard2Skeleton from "@/components/partials/Blog/BlogCard2Skeleton";
import { fetchFeaturedBlogs } from "@/lib/wordPressAPIs";

export default async function BlogLayout({ children }) {
  return (
    <div className={`container-main mb-main grid grid-cols-12 gap-8 py-6`}>
      <div className="col-span-12 lg:col-span-9">{children}</div>

      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}

async function SidebarFallback() {
  return (
    <div className="col-span-3 hidden lg:block">
      <div className="sticky top-12">
        <Heading as="h3" size="xl" className="mb-6">
          Top Blogs
        </Heading>

        <div className="grid gap-y-4">
          <BlogCard2Skeleton />
          <BlogCard2Skeleton />
          <BlogCard2Skeleton />
          <BlogCard2Skeleton />
        </div>
      </div>
    </div>
  );
}

async function Sidebar() {
  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <div className="col-span-3 hidden lg:block">
      <div className="sticky top-12">
        <Heading as="h3" size="xl" className="mb-6">
          Top Blogs
        </Heading>

        <div className="grid gap-y-4">
          {featuredBlogs &&
            featuredBlogs.length > 0 &&
            featuredBlogs.map((blog) => (
              <BlogCard2 blog={blog} key={blog.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
