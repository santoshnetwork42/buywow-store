"use client";

import { Img } from "@/components/elements";
import React from "react";
import { twMerge } from "tailwind-merge";

const ProductThumbnail = React.memo(
  ({ width, height, imageKey, url, className, alt, ...props }) => {
    const mergedClassName = twMerge(
      "object-contain h-auto w-full mix-blend-darken",
      className,
      url && "aspect-square",
    );

    return (
      <Img
        src={url || imageKey}
        width={width}
        height={height}
        alt={alt}
        isStatic
        className={mergedClassName}
        addPrefix={url ? false : true}
        {...props}
      />
    );
  },
);

ProductThumbnail.displayName = "ProductThumbnail";

export default ProductThumbnail;
