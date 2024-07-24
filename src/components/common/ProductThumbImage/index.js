"use client";
import React from "react";
import { Img } from "@/components/common";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";

const ProductThumbImage = ({ width, height, fetchedProduct }) => {
  const [selectedVariant] = useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);
  const { slug, thumbImage } = packageProduct || {};

  return (
    <Img
      src={`${thumbImage.imageKey}`}
      width={width}
      height={height}
      alt={slug}
      isStatic
      className="h-auto w-full object-contain"
      addPrefix
    />
  );
};

export default ProductThumbImage;
