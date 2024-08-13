import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { Heading, Text } from "@/components/elements";
import BlogBreadCrumb from "@/components/partials/Blog/BlogBreadCrumb";
import { fetchBlog, fetchBlogs } from "@/lib/wordPressAPIs";
import BlogAuthor from "@/components/partials/Blog/BlogAuthor";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { blogs } = await fetchBlogs({});

  if (!blogs || blogs.length === 0) {
    return [];
  }

  return blogs.map((blog) => ({
    slug: blog.node.slug,
  }));
}

export default async function ReadBlog({ params }) {
  const { slug } = params;

  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="blog blog-font-size-convention grid gap-y-6">
      <BlogBreadCrumb
        links={[
          { label: "Blog", url: "/blog" },
          { label: blog.title, url: `/blog/${blog.slug}` },
        ]}
      />

      <div className="space-y-3">
        <div className="flex flex-wrap gap-4">
          {blog?.categories?.nodes?.map((category) => (
            <Link
              href={`/blog/category/${category.slug}`}
              key={category.id}
              className="rounded bg-yellow-900 px-2 py-1 text-sm text-white-a700"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <Heading as="h1" size="2xl">
          {blog.title}
        </Heading>

        <Text as={"p"} size="sm">
          {blog.author.node.name} |{" "}
          {dayjs(blog.date).format("MMMM D, YYYY h:mm A")}
        </Text>
      </div>

      <div className="relative aspect-video w-full">
        <Image
          src={blog.featuredImage?.node?.mediaItemUrl}
          alt={blog.title}
          fill
          className="rounded-md"
        />
      </div>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: blog?.content,
        }}
      />

      <hr className="my-6 border-t border-gray-300" />

      <BlogAuthor
        name={blog.author.node.name}
        avatar={blog.author.node.avatar.url}
        description={blog.author.node.description}
        slug={blog.author.node.slug}
      />
    </div>
  );
}
