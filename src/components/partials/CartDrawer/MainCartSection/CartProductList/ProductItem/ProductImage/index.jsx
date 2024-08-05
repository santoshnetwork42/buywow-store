import React from "react";
import Link from "next/link";
import { Heading } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";

const ProductImage = ({ slug, outOfStock, imageKey, handleCartClose }) => (
  <Link
    href={outOfStock ? "#" : `/product/${slug}`}
    className={`relative flex aspect-[66/88] h-fit w-20 shrink-0 overflow-hidden rounded-lg bg-lime-50 md:w-24 ${
      outOfStock ? "cursor-auto" : ""
    }`}
    onClick={outOfStock ? () => {} : handleCartClose}
  >
    {!!outOfStock && (
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black-900/55">
        <Heading
          size="2xl"
          as="h2"
          className="text-center text-white-a700"
          responsive
        >
          Out Of Stock
        </Heading>
      </div>
    )}
    <ProductThumbnail
      width={300}
      height={300}
      imageKey={imageKey}
      className="aspect-[66/88] h-auto w-full object-contain"
      isStatic
      alt="Product Image"
    />
  </Link>
);

export default React.memo(ProductImage);
