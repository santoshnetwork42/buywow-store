"use client"; // added this just for static data as of now - "productData"

import { IndiaMapIcon, StarIcon, VehicelIcon } from "@/assets/svg/icons";
import { Button, Text } from "@/components/common";
import { productData } from "@/data/productData";
import React from "react";
import HighLights from "@/components/partials/Product/HighLights";

const ProductDetail = () => {
  const productDetail = productData[0];
  console.log("productDetail :>> ", productDetail);
  return (
    <div className="container-main grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="order-2 bg-red-500 md:order-1 md:row-span-2">
        <p>First Column Content</p>
      </div>

      <div className="order-1 md:order-2">
        <div className="flex flex-col gap-3">
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

      <div className="order-3 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 md:justify-normal">
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
                <Text
                  as="p"
                  size="md"
                  responsive={false}
                  className="rounded-full bg-lime-100 px-2 py-1"
                >
                  {productDetail.pricing.discount}% Off
                </Text>
              </div>
            )}
          </div>
          <Text as="p" size="sm" responsive={false} className="font-light">
            MRP incl. of all taxes
          </Text>
        </div>
        {/* Add to cart */}
        <div className="flex flex-col gap-1">
          <Button className="w-full py-4 sm:py-2">Add To Cart</Button>
          <div className="flex justify-evenly gap-4">
            <div className="flex items-center gap-1">
              <VehicelIcon size={30} />
              <Text as="p" size="sm" responsive={false}>
                Ships within 1-2 days
              </Text>
            </div>
            <div className="flex items-center gap-1">
              <IndiaMapIcon size={22} />
              <Text as="p" size="sm" responsive={false}>
                Shipping Across india
              </Text>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <HighLights />

        {/* Product MetaData */}
      </div>
    </div>
  );
};

export default ProductDetail;
