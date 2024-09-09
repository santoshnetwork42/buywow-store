"use client";

import { Heading, Img, Text } from "@/components/elements";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import dayjs from "dayjs";
import Link from "next/link";

export default function BlogCard4({ blog, index }) {
  const { blogClicked } = useEventsDispatch();

  const handleClick = () => {
    blogClicked({
      item_name: blog.title,
      item_id: index + 1,
      item_slug: blog.slug,
      item_parent_category: "Explore Blogs",
    });
  };

  return (
    <Link prefetch={false} href={`/blog/${blog.slug}`} onClick={handleClick}>
      <div className="flex h-full flex-col rounded-xl">
        <div className="relative aspect-[328/212] w-[328px] md:aspect-[434/228] md:w-[434px]">
          <Img
            src={blog.featuredImage?.node?.mediaItemUrl}
            alt={blog.title}
            width={434}
            height={227}
            className="aspect-[328/212] h-auto w-full rounded-md object-cover md:aspect-[434/228]"
          />
        </div>
        <Heading
          as="h5"
          size="2xl"
          className="line-clamp-1 pr-3 pt-5 text-base normal-case"
        >
          {blog.title}
        </Heading>
        <div className="mt-3 line-clamp-3 flex justify-between">
          <Text as="span" size="sm">
            {blog?.author?.node?.name}
          </Text>
          <Text as="span" size="sm">
            {dayjs(blog.date).format("MMMM DD, YYYY")}
          </Text>
        </div>
      </div>
    </Link>
  );
}
