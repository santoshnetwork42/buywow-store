import BlogInfiniteScroll from "@/components/partials/Blog/BlogInfiniteScroll";
import { fetchBlogs } from "@/lib/wordPressAPIs";

import React from "react";

export const revalidate = 3600;

export default async function Blogs() {
  const { blogs, pageInfo } = await fetchBlogs({
    tags: ["english"],
    first: 49,
  });

  return <BlogInfiniteScroll blogsData={blogs} pageInfoData={pageInfo} />;
}
