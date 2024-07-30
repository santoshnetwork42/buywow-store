"use client";

import { Heading, Text } from "@/components/elements";
import AddToCart from "@/components/common/ATC";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import Link from "next/link";

const TestimonialProductCard = ({ fetchedProduct }) => {
  const { price, listingPrice, title, slug } = fetchedProduct;
  const showStrikePrice = listingPrice && price < listingPrice;

  return (
    <div>
      <Link
        href={`/products/${slug}`}
        className="flex justify-center gap-2 rounded bg-lime-100_01 p-2"
      >
        <div className="flex aspect-square w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-white-a700_01 md:aspect-[48/56]">
          <ProductThumbnail
            width={200}
            fetchedProduct={fetchedProduct}
            height={56}
            isStatic
            alt={"Product Image"}
          />
        </div>
        <div className="flex flex-col justify-between gap-1">
          <Heading as="h5" size="sm" className="line-clamp-1">
            {title}
          </Heading>
          <div className="flex items-center justify-between gap-4 md:gap-5 lg:gap-6">
            <div className="flex items-center gap-1">
              <Text
                size="base"
                as="p"
                className="text-sm font-semibold capitalize"
                responsive
              >
                ₹{price}
              </Text>
              {!!showStrikePrice && (
                <Text
                  size="sm"
                  as="p"
                  className="capitalize line-through"
                  responsive
                >
                  ₹{listingPrice}
                </Text>
              )}
            </div>
            <AddToCart
              fetchedProduct={fetchedProduct}
              buttonText={"Add"}
              buttonClass={"text-xs capitalize md:text-sm"}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TestimonialProductCard;
