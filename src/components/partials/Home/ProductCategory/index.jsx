import { Img, Text } from "@/components/common";
import Link from "next/link";
import React from "react";

const ProductCategory = ({ image, label }) => (
  <Link
    href="/products"
    className="flex w-20 flex-grow-0 flex-col items-center"
  >
    <div className="overflow-hidden rounded-full">
      <Img
        src={image}
        alt={label}
        width={56}
        height={56}
        className="h-14 w-14 object-contain"
      />
    </div>
    <Text
      size="textxl"
      as="span"
      className="mt-1.5 line-clamp-2 w-[74px] text-center capitalize leading-[18px]"
    >
      {label}
    </Text>
  </Link>
);

const ProductCategories = ({ categories }) => {
  return (
    <div className="no-scrollbar w-full overflow-x-scroll lg:hidden">
      <div className="mx-auto flex w-max items-start justify-center p-3">
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
