"use client"; // added this just for static data as of now - "productData"

import { StarIcon } from "@/assets/svg/icons";
import { Text } from "@/components/common";
import { productData } from "@/data/productData";
import React from "react";

const ProductDetail = () => {
  const productDetail = productData[0];
  console.log("productDetail :>> ", productDetail);
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="order-2 bg-red-500 md:order-1 md:row-span-2">
        <p>First Column Content</p>
      </div>

      <div className="order-1 md:order-2">
        <div className="flex flex-col gap-1">
          <Text
            className="line-clamp-2 font-medium"
            as="p"
            size="2xl"
            responsive={false}
          >
            {productDetail.title}
          </Text>

          <Text
            as="p"
            className="line-clamp-3 font-light"
            size="sm"
            responsive={false}
          >
            {productDetail?.benefits}
          </Text>
          <div className="flex items-center gap-1">
            <StarIcon size={14} />
            <Text className="font-light" size="sm" responsive={false}>
              {productDetail.rating} ({productDetail.reviewCount} Reviews)
            </Text>
          </div>
        </div>
      </div>

      <div className="order-3">
        <div className="flex items-center gap-2">
          <Text as="p" size="xl" className="font-medium" responsive={false}>
            {productDetail.pricing.current}
          </Text>
          {productDetail.pricing.original && (
            <div className="flex items-center gap-1">
              <Text
                as="p"
                size="md"
                className="font-light capitalize"
                responsive={false}
              >
                MRP:
              </Text>
              <Text
                as="p"
                size="md"
                className="line-through"
                responsive={false}
              >
                {productDetail.pricing.original}
              </Text>
            </div>
          )}
          {productDetail.pricing.discount && (
            <div className="flex items-center gap-1">
              <Text as="p" size="md" responsive={false}>
                {productDetail.pricing.discount}% Off
              </Text>
            </div>
          )}
          <Text as="p" size="sm" responsive={false} className="font-light">
            MRP incl. of all taxes
          </Text>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDetail;
