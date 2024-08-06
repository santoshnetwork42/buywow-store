"use client";

import { Heading, Text } from "@/components/elements";
import AddToCart from "@/components/common/AddToCart";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import Link from "next/link";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";

const TestimonialProductCard = ({ fetchedProduct }) => {
  const [selectedVariant] = useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

  const { price, listingPrice, title, slug, thumbImage } = packageProduct;
  const showStrikePrice = listingPrice && price < listingPrice;

  if (!fetchedProduct || !packageProduct) return null;

  return (
    <div>
      <Link
        href={`/products/${slug}`}
        className="flex justify-center gap-2 rounded bg-lime-100_01 p-2"
      >
        <div className="flex aspect-square w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-white-a700_01 md:aspect-[48/56]">
          <ProductThumbnail
            width={200}
            imageKey={thumbImage?.imageKey}
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
              product={packageProduct}
              buttonText={"Add"}
              buttonSize="small"
              quantityClassName="grid-cols-[repeat(3,24px)] sm:grid-cols-[repeat(3,26px)] md:grid-cols-[repeat(3,28px)] h-[26px] sm:h-[27px] md:h-[28px] lg:h-[29px] xl:h-[30px] lg:grid-cols-[repeat(3,30px)] xl:grid-cols-[repeat(3,32px)]"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TestimonialProductCard;
