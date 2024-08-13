import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogCard3 from "@/components/partials/Blog/BlogCard3";
import { fetchBlogs, fetchCategories } from "@/lib/wordPressAPIs";
import React from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await fetchCategories();

  if (!categories || categories.length === 0) {
    return {
      notFound: true,
    };
  }

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function BlogsByCategory({ params }) {
  const { slug } = params;

  const blogs = await fetchBlogs({
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

      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => <BlogCard3 key={blog.node.id} blog={blog.node} />)}
    </div>
  );
}
