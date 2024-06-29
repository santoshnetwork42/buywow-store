"use client"; // added this just for static data as of now - "productData"

import { Text } from "@/components/common";
import { productData } from "@/data/productData";
import React from "react";

const ProductDetail = () => {
  const productDetail = productData[0];
  console.log("productDetail :>> ", productDetail);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="order-2 bg-red-500 md:order-1 md:row-span-2">
        <p>First Column Content</p>
      </div>

      <div className="order-1 md:order-2">
        <div className="flex flex-col">
          <Text className="line-clamp-2 font-medium" as="p" size="text2xl">
            {productDetail.title}
          </Text>

          <Text as="p" className="line-clamp-3 w-full !font-light" size="texts">
            {productDetail?.benefits}
          </Text>
        </div>
      </div>

      <div className="order-3 bg-green-500 md:order-3">
        <p>Second Column, Second Row Content</p>
      </div>
    </div>
  );
};

export default ProductDetail;
