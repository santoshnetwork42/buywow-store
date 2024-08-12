import { Heading, Text } from "@/components/elements";
import { fetchBlog } from "@/lib/wordPressAPIs";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }) {
  const { slug } = params;

  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="grid gap-y-4">
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

      <div className="relative aspect-video w-full">
        <Image
          src={blog.featuredImage?.node?.mediaItemUrl}
          alt={blog.featuredImage.node.altText}
          fill
          className="rounded-md"
        />
      </div>

      {
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      }

      <hr className="my-6 border-t border-gray-300" />

      <div className="grid grid-cols-[auto,1fr] gap-4">
        <Image
          src={blog.author.node.avatar.url}
          alt={blog.author.node.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <Heading as="h4" size="lg" className="mb-2">
            {blog.author.node.name}
          </Heading>

          <Text as="p" size="sm">
            {blog.author.node.description}
          </Text>
        </div>
      </div>
    </div>
  );
}
