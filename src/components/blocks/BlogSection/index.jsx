// src/components/BlogSection.jsx
"use client";

import { Heading, Text } from "@/components/elements";
import Slider from "@/components/features/Slider";
import { getFeaturedBlogs } from "@/graphql/appSync/api";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogCard = ({
  blog = {
    featuredImage,
    date,
    author,
    title,
    excerpt,
    slug,
    seo: {
      readingTime,
    },
  },
  index,
}) => {
  const { blogClicked } = useEventsDispatch();
  return (
    <Link
      href={`/blog/${blog.slug}`}
      onClick={(e) => {
        blogClicked({
          item_name: blog.title,
          item_id: index + 1,
          item_slug: blog.slug,
          item_parent_category: "Explore Blogs",
        });
      }}
    >
      <div className="flex h-full flex-col rounded-xl">
        <div className="relative aspect-[328/212] w-[328px] md:aspect-[434/228] md:w-[434px]">
          <Image
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
            {dayjs(blog.date).format("MMMM DD, YYYY")}{" "}
          </Text>
        </div>
      </div>
    </Link>
  );
};

const BlogSection = ({ title = "Explore Blogs", buttonText = "Read More" }) => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const blogRes = await fetch("/api/blog", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            query: getFeaturedBlogs,
            variables: { first: 5 },
          }),
        });

        const blogData = await blogRes.json();
        if (blogData.data && blogData.data.posts.nodes) {
          setFeaturedBlogs(blogData.data.posts.nodes);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeaturedBlogs();
  }, []);

  return (
    <div className="container-main mb-main flex flex-col items-center justify-center gap-5">
      <Heading size="heading" as="h1" responsive>
        {title}
      </Heading>
      <div className="gap px-auto flex w-full justify-evenly overflow-scroll sm:gap-5 md:gap-6 lg:gap-7">
        <Slider
          controlsContainerClassName="mb-2 md:mb-3"
          sliderClassName="gap-[10px] sm:gap-3 lg:gap-5"
        >
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </Slider>
      </div>
      <Link
        href={`/blog`}
        className="mt-2 rounded-[24px] bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3"
      >
        <Heading as="h3" size="xl" className="text-white-a700_01" responsive>
          {buttonText}
        </Heading>
      </Link>
    </div>
  );
};

export default BlogSection;
