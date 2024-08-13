import BlogAuthor from "@/components/partials/Blog/BlogAuthor";
import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import BlogInfiniteScroll2 from "@/components/partials/Blog/BlogInfiniteScroll2";
import { fetchAuthor, fetchAuthors, fetchBlogs } from "@/lib/wordPressAPIs";
import { notFound } from "next/navigation";
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
    notFound();
  }

  const { blogs, pageInfo } = await fetchBlogs({
    author: slug,
    first: 9,
  });

  if (!blogs || blogs.length === 0) {
    notFound();
  }

  return (
    <div className="grid gap-y-8">
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

      <BlogInfiniteScroll2
        blogsData={blogs}
        pageInfoData={pageInfo}
        author={slug}
      />
    </div>
  );
}
