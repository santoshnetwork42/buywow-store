// src/components/BlogSection.jsx

import React from "react";
import { Button, Heading } from "@/components/common";
import BlogCard from "@/components/features/Card/BlogCard";

const BlogSection = ({ sectionData }) => {
  const { title, buttonText, articles } = sectionData;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Heading size="heading" as="h1" responsive>
        {title}
      </Heading>
      <div className="flex w-full flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-7">
        <div className="no-scrollbar w-full overflow-x-auto">
          <div className="m-auto flex w-max gap-3 sm:gap-4 lg:gap-5">
            {articles.map((article) => (
              <BlogCard
                key={article.id}
                className="flex w-[80vw] max-w-[330px] sm:w-[58vw] sm:max-w-[434px] md:w-[50vw] lg:w-[42vw]"
                article={article}
              />
            ))}
          </div>
        </div>
        <Button className="rounded-full bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default BlogSection;
