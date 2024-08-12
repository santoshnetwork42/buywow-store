import { Heading, Text } from "@/components/elements";
import dayjs from "dayjs";
import Image from "next/image";
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
    <div key={blog.id} className="grid grid-cols-[auto_1fr] gap-x-3">
      <div className="relative aspect-video w-full">
        <Image
          src={blog.featuredImage?.node?.mediaItemUrl}
          alt={blog.title}
          fill
          className="rounded-md"
        />
      </div>

      <div>
        <Text as={"p"} className="line-clamp-1" size="sm">
          {dayjs(blog.date).format("MMMM DD, YYYY")}
        </Text>

        <Heading
          as="h6"
          size="base"
          className="my-2 line-clamp-1 text-base normal-case"
          responsive
        >
          {blog.title}
        </Heading>
      </div>
    </div>
  );
}
