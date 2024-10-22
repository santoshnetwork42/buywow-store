"use client";

import AddToCart from "@/components/common/AddToCart";
import { Heading, Text } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import Link from "next/link";

const TestimonialProductCard = ({ fetchedProduct }) => {
  const [selectedVariant] = useProductVariantGroups(fetchedProduct);
  const packageProduct = useProduct(fetchedProduct, selectedVariant?.id);

  const { price, listingPrice, title, slug, thumbImage } = packageProduct || {};

  if (!fetchedProduct?.id || !packageProduct) return null;

  return (
    <Link
      prefetch={false}
      href={`/products/${slug}`}
      className="flex max-w-[75%] justify-center gap-2 rounded bg-lime-100_01 p-2 md:max-w-[70%]"
    >
      <div className="flex aspect-square w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-white-a700_01 md:aspect-[48/56]">
        <ProductThumbnail
          width={200}
          imageKey={thumbImage?.imageKey}
          height={56}
          alt={"Product Image"}
        />
      </div>
      <div className="flex flex-col justify-between gap-1">
        <Heading as="h5" size="sm" className="line-clamp-1 break-all">
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
            {listingPrice > price && (
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
            buttonClassName="px-2 h-[26px] sm:h-[27px] md:px-2.5 md:h-[28px] lg:h-[29px] xl:px-3 xl:h-[30px]"
            quantityClassName="grid-cols-[repeat(3,24px)] sm:grid-cols-[repeat(3,26px)] md:grid-cols-[repeat(3,28px)] h-[26px] sm:h-[27px] md:h-[28px] lg:h-[29px] xl:h-[30px] lg:grid-cols-[repeat(3,30px)] xl:grid-cols-[repeat(3,32px)]"
            section={{
              name: "testimonial_product_card",
              tabValue: "testimonial_product_card",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default TestimonialProductCard;
