import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import {
  fetchBlogs,
  fetchCategories,
  fetchFeaturedBlogs,
} from "@/lib/wordPressAPIs";
import { notFound } from "next/navigation";
import React from "react";
import BlogSidebar from "@/components/partials/Blog/BlogSidebar";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await fetchCategories();

  if (!categories || categories.length === 0) {
    return [];
  }

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function BlogsByCategory({ params }) {
  const { slug } = params;

  const { blogs, pageInfo } = await fetchBlogs({
    category: slug,
    first: 9,
  });

  if (!blogs || blogs.length === 0) {
    notFound();
  }

  const featuredBlogs = await fetchFeaturedBlogs(5);

  return (
    <React.Fragment>
      <div className="col-span-12 lg:col-span-9">
        <div className="grid gap-y-6">
          <BlogBreadCrumb
            links={[
              { label: "Blog", url: "/blog" },
              { label: slug, url: `/blog/category/${slug}` },
            ]}
          />

          <BlogInfiniteScroll2
            blogsData={blogs}
            pageInfoData={pageInfo}
            category={slug}
          />
        </div>
      </div>

      <BlogSidebar featuredBlogs={featuredBlogs} />
    </React.Fragment>
  );
}
