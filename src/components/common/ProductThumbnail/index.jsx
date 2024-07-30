"use client";

import React, { useMemo } from "react";
import { Img } from "@/components/common";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { twMerge } from "tailwind-merge";

const ProductThumbnail = React.memo(
  ({ width, height, fetchedProduct, className, alt, ...props }) => {
    const [selectedVariant] = useProductVariantGroups(fetchedProduct);
    const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

    const { slug, thumbImage } = useMemo(() => {
      return packageProduct || {};
    }, [packageProduct]);

    const imageUrl = useMemo(() => {
      return thumbImage?.imageKey ? `${thumbImage.imageKey}` : "";
    }, [thumbImage]);

    const mergedClassName = useMemo(() => {
      return twMerge(
        "object-contain h-auto w-full mix-blend-multiply",
        className,
      );
    }, [className]);

    if (!imageUrl) {
      return null;
    }

    return (
      <Img
        src={imageUrl}
        width={width}
        height={height}
        alt={slug || alt}
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
