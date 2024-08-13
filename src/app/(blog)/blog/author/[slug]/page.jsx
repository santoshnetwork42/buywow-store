import BlogAuthor from "@/components/partials/Blog/BlogAuthor";
import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogCard3 from "@/components/partials/Blog/BlogCard3";
import { fetchAuthor, fetchAuthors, fetchBlogs } from "@/lib/wordPressAPIs";
import React from "react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const authors = await fetchAuthors();

  if (!authors || authors.length === 0) {
    return [];
  }

  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export default async function BlogsByAuthor({ params }) {
  const { slug } = params;

  const author = await fetchAuthor(slug);

  if (!author) {
    return {
      notFound: true,
    };
  }

  const { blogs } = await fetchBlogs({
    author: slug,
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
          { label: slug, url: `/blog/author/${slug}` },
        ]}
      />
      <BlogAuthor
        name={author.name}
        avatar={author.avatar.url}
        description={author.description}
        slug={author.slug}
      />

      <hr className="border-t border-gray-200" />

      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => <BlogCard3 key={blog.node.id} blog={blog.node} />)}
    </div>
  );
}
