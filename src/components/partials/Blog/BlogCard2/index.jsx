import { Heading, Text } from "@/components/elements";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard2({
  blog = {
    id,
    featuredImage,
    date,
    title,
    excerpt,
    slug,
  },
}) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="grid grid-cols-[1fr_3fr] gap-x-3">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={blog.featuredImage?.node?.mediaItemUrl}
            alt={blog.title}
            fill
            className="rounded-md"
          />
        </div>

        <div className="space-y-2">
          <Text as={"p"} className="line-clamp-1" size="sm">
            {dayjs(blog.date).format("MMMM DD, YYYY")}
          </Text>

          <Heading
            as="h6"
            size="sm"
            className="line-clamp-2 text-base normal-case"
            responsive
          >
            {blog.title}
          </Heading>
        </div>
      </div>
    </Link>
  );
}
