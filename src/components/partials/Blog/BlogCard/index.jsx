import { Heading, Text } from "@/components/elements";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard({
  blog = {
    id,
    featuredImage,
    date,
    author,
    title,
    excerpt,
    slug,
  },
}) {
  return (
    <div
      key={blog.id}
      className="flex flex-col rounded-xl border p-3 shadow-xs"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={blog.featuredImage?.node?.mediaItemUrl}
          alt={blog.title}
          fill
          className="rounded-md"
        />
      </div>

      <Text as={"p"} className="mt-3 line-clamp-3" size="sm">
        {dayjs(blog.date).format("MMMM DD, YYYY")} | {blog.author.node.name}
      </Text>

      <Heading
        as="h5"
        size="2xl"
        className="my-2 line-clamp-3 text-base normal-case"
      >
        {blog.title}
      </Heading>

      <Text as={"p"} className="mb-3 line-clamp-3" size="sm">
        <div
          dangerouslySetInnerHTML={{
            __html: blog.excerpt,
          }}
        />
      </Text>

      <Link href={`/blog/${blog.slug}`}>Read More</Link>
    </div>
  );
}
