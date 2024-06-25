import { Img, Text } from "@/components/common";
import Link from "next/link";
import React from "react";

const ProductCategory = ({ image, label }) => (
  <Link
    href="/products"
    className="flex flex-grow-0 w-20 flex-col items-center">
    <div className="rounded-full overflow-hidden">
      <Img
        src={image}
        alt={label}
        width={56}
        height={56}
        className="w-14 h-14 object-contain"
      />
    </div>
    <Text
      size="textxl"
      as="span"
      className="capitalize text-center mt-1.5 line-clamp-2 w-[74px] leading-[18px]">
      {label}
    </Text>
  </Link>
);

const ProductCategories = ({ categories }) => {
  return (
    <div className="lg:hidden w-full overflow-x-scroll no-scrollbar">
      <div className="flex justify-center w-max mx-auto items-start p-3">
        {categories.map((category, index) => (
          <React.Fragment key={category.label}>
            <ProductCategory {...category} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
