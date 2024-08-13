import React from "react";
import BlogInfiniteScroll from "@/components/partials/Blog/BlogInfiniteScroll";
import { fetchBlogs, fetchFeaturedBlogs } from "@/lib/wordPressAPIs";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";

export const revalidate = 3600;

export default async function Blogs() {
  const { blogs, pageInfo } = await fetchBlogs({
    tags: ["english"],
    first: 49,
  });
  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <React.Fragment>
      <div className="col-span-12 lg:col-span-9">
        <BlogInfiniteScroll blogsData={blogs} pageInfoData={pageInfo} />
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} />
    </React.Fragment>
  );
}
