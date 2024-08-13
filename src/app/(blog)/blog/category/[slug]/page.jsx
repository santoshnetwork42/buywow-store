import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import { fetchBlogs, fetchCategories } from "@/lib/wordPressAPIs";
import React from "react";

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
    first: 10,
  });

  if (!blogs || blogs.length === 0) {
    return {
      notFound: true,
    };
  }

  return (
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
  );
}
