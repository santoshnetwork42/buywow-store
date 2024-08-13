"use client";

import { useState } from "react";
import BlogCard from "../BlogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBlogs } from "@/graphql/appSync/api";
import BlogCard3 from "../BlogCard3";

export default function BlogInfiniteScroll2({
  blogsData,
  pageInfoData,
  category = "",
  tags = [],
  author,
}) {
  const [blogs, setBlog] = useState(blogsData);
  const [pageInfo, setPageInfo] = useState(pageInfoData);

  async function loadMore(after = "") {
    try {
      const blogRes = await fetch("/api/blog", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: getBlogs,
          variables: {
            first: 10,
            after,
            ...(category ? { category } : {}),
            ...(tags && tags.length > 0 ? { tags } : {}),
            ...(author ? { author } : {}),
          },
        }),
      });

      if (!blogRes.ok) {
        throw new Error("Error fetching data");
      }

      const blogData = await blogRes.json();

      if (blogData.data && blogData.data.posts.edges) {
        if (loadMore) {
          setBlog([...blogs, ...blogData.data.posts.edges]);
          setPageInfo(blogData.data.posts.pageInfo);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <InfiniteScroll
      dataLength={blogs?.length}
      next={() => loadMore(pageInfo?.endCursor)}
      hasMore={pageInfo?.hasNextPage}
      loader={
        <div className="flex h-12 w-full items-center justify-center">
          <h4>Loading...</h4>
        </div>
      }
    >
      <div className="grid gap-4">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => (
            <BlogCard3 key={blog.node.id} blog={blog.node} />
          ))}
      </div>
    </InfiniteScroll>
  );
}
