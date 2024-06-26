// src/components/BlogCard.jsx
import React from "react";
import { Text, Heading, Img } from "@/components/common";
import Link from "next/link";

const BlogCard = ({ article, className, ...props }) => {
  const { image, title, author, publishDate, link } = article;

  return (
    <Link href={link} className={`${className}`}>
      <div {...props} className="flex w-full flex-col gap-3 sm:gap-4 lg:gap-5">
        <Img
          src={image}
          width={434}
          height={228}
          alt={`Article image for ${title}`}
          className="aspect-[434/228] h-full w-full object-contain"
        />
        <div className="flex flex-col items-start gap-[7px] self-stretch">
          <Heading
            size="heading2xl"
            as="h5"
            className="w-full truncate text-lg capitalize"
          >
            {title}
          </Heading>
          <div className="flex justify-between gap-5 self-stretch">
            <Text size="text3xl" as="p" className="truncate text-sm capitalize">
              {author}
            </Text>
            <Text size="text3xl" as="p" className="truncate text-sm capitalize">
              {publishDate}
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
