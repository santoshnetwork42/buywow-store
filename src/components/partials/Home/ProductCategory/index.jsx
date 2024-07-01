import { Img, Text } from "@/components/common";
import Link from "next/link";
import React from "react";

const ProductCategory = ({ image, label }) => (
  <Link
    href="/products"
    className="flex w-20 grow-0 flex-col items-center gap-1.5"
  >
    <div className="overflow-hidden rounded-full">
      <Img
        src={image}
        alt={label}
        width={56}
        height={56}
        className="aspect-square w-14 object-contain"
      />
    </div>
    <Text size="sm" as="span" className="line-clamp-2 text-center capitalize">
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
