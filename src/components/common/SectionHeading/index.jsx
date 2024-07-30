import React, { memo } from "react";
import { Heading } from "@/components/elements";
import { twMerge } from "tailwind-merge";

const SectionHeading = memo(({ title, ...props }) => {
  if (!title) return null;
  return (
    <Heading
      size="heading"
      as="h1"
      className={twMerge(`mb-4 lg:mb-5`, props.className)}
      responsive
      {...props}
    >
      {title}
    </Heading>
  );
});

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
