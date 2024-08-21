"use client";

import { useState } from "react";
import BlogCard from "../BlogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBlogs } from "@/graphql/appSync/api";
import { LoaderIcon } from "@/assets/svg/icons";

export default function BlogInfiniteScroll({ blogsData, pageInfoData }) {
  const [blogs, setBlog] = useState(blogsData);
  const [pageInfo, setPageInfo] = useState(pageInfoData);

  async function loadMore(fetchMore = false, after = "") {
    try {
      const blogRes = await fetch("/api/blog", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: getBlogs,
          variables: { first: 9, after },
        }),
      });

      if (!blogRes.ok) {
        throw new Error("Error fetching data");
      }

      const blogData = await blogRes.json();

      if (blogData.data && blogData.data.posts.edges) {
        if (fetchMore) {
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
      dataLength={blogs?.length || 0}
      next={() => loadMore(!!pageInfo?.endCursor, pageInfo?.endCursor)}
      hasMore={pageInfo?.hasNextPage || false}
      loader={
        <div className="flex h-12 w-full items-center justify-center">
          <div className="animate-spin">
            <LoaderIcon size={32} />
          </div>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => <BlogCard key={blog.node.id} blog={blog.node} />)}
      </div>
    </InfiniteScroll>
  );
}
