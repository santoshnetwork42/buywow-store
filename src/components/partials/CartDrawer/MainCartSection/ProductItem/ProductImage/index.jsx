import { FreeIcon } from "@/assets/svg/icons";
import { Heading } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import Link from "next/link";
import React from "react";

const ProductImage = ({
  slug,
  outOfStock,
  imageKey,
  handleCartClose,
  isFreeProduct,
}) => {
  return (
    <Link
      prefetch
      href={outOfStock ? "#" : `/product/${slug}`}
      className={`relative flex aspect-[66/88] h-fit w-20 shrink-0 overflow-visible rounded-lg bg-lime-50 md:w-24 ${
        outOfStock ? "cursor-auto" : ""
      }`}
      onClick={outOfStock ? () => {} : handleCartClose}
    >
      {!!isFreeProduct && (
        <div className="absolute left-0 top-0 z-10 size-8 -translate-x-1/4 -translate-y-1/4 sm:size-9 md:size-10">
          <FreeIcon className="aspect-square h-auto w-full" />
        </div>
      )}
      {!!outOfStock && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-lg bg-black-900/55">
          <Heading
            size="xl"
            as="h2"
            className="text-center text-lg text-white-a700"
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
        className="aspect-[66/88] h-auto w-full rounded-lg object-contain"
        alt="Product Image"
      />
    </Link>
  );
};

export default React.memo(ProductImage);
