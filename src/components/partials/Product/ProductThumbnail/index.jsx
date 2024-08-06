"use client";

import React, { useMemo } from "react";
import { Img } from "@/components/elements";
import { twMerge } from "tailwind-merge";

const ProductThumbnail = React.memo(
  ({ width, height, imageKey, className, alt, ...props }) => {
    const mergedClassName = useMemo(() => {
      return twMerge(
        "object-contain h-auto w-full mix-blend-multiply",
        className,
      );
    }, [className]);

    if (!imageKey) {
      return null;
    }

    return (
      <Img
        src={imageKey}
        width={width}
        height={height}
        alt={alt}
        isStatic
        className={mergedClassName}
        addPrefix
        {...props}
      />
    );
  },
);

ProductThumbnail.displayName = "ProductThumbnail";

export default ProductThumbnail;
