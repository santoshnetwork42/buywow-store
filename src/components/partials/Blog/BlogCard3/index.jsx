import { Heading, Text } from "@/components/elements";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard3({
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
    <Link href={`/blog/${blog.slug}`}>
      <div className="grid grid-cols-[2fr,4fr] items-center gap-4">
        <div className="relative aspect-video w-full">
          <Image
            src={blog.featuredImage?.node?.mediaItemUrl}
            alt={blog.title}
            fill
            className="rounded-md"
          />
        </div>

        <div>
          <Text as={"p"} className="line-clamp-3" size="sm">
            {dayjs(blog.date).format("MMMM DD, YYYY")} | {blog.author.node.name}
          </Text>

          <Heading
            as="h5"
            size="2xl"
            className="my-3 line-clamp-3 text-base normal-case"
          >
            {blog.title}
          </Heading>

          <Text as={"p"} className="line-clamp-3" size="sm">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.excerpt,
              }}
            />
          </Text>
        </div>
      </div>
    </Link>
  );
}
