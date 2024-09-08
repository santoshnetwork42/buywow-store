"use client";

import { Heading } from "@/components/elements";
import BlogCard2 from "@/components/partials/Blog/BlogCard2";
import Link from "next/link";
import React, { useState } from "react";

export default function BlogSidebar({ featuredBlogs = [], tags = [] }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      {/* Floating button for small screens */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <button
          aria-expanded={open}
          aria-controls="sidebar"
          onClick={toggle}
          className="rounded-full bg-yellow-900 px-3 py-2 text-sm text-white-a700 shadow-lg"
        >
          {open ? "Close" : "View More"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          open
            ? "fixed right-0 top-0 z-40 h-full w-3/4 bg-white-a700 p-4"
            : "hidden"
        } overflow-y-auto lg:relative lg:col-span-3 lg:block lg:h-auto lg:w-full lg:overflow-y-visible lg:bg-transparent lg:p-0`}
      >
        <div className="lg:sticky lg:top-12">
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

          {tags && tags.length > 0 && (
            <React.Fragment>
              <hr className="my-8 border-t" />

              <Heading as="h3" size="xl" className="mb-6">
                Tags
              </Heading>

              <div className="flex flex-wrap gap-4">
                {tags.map((tag) => (
                  <Link
                    prefetch={false}
                    href={`/blog/tag/${tag.slug}`}
                    key={tag.slug}
                    className="border border-yellow-900 px-2 py-1 text-sm text-yellow-900"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      {/* Overlay to close sidebar on small screens */}
      {open && (
        <div
          onClick={toggle}
          className="fixed inset-0 z-30 bg-black-900 opacity-50 lg:hidden"
        />
      )}
    </React.Fragment>
  );
}
