import { memo } from "react";
import Link from "next/link";
import { Heading } from "@/components/common";
import SectionHeading from "@/components/common/partials/SectionHeading";
import ProductCard from "@/components/features/Card/ProductCard";
import Slider from "@/components/features/Slider";
import { getBgColor } from "@/utils/helpers";

const FeaturedProducts = memo(
  ({
    title,
    featuredProductsBgColor: bgColor,
    button,
    products: { data: products },
  }) => {
    if (!Array.isArray(products) || products.length === 0) return null;

    const bgColorClass = getBgColor(bgColor);
    const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

    return (
      <div
        className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
      >
        <SectionHeading title={title} />
        <Slider
          controlsContainerClassName="mb-2 md:mb-3"
          sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
        >
          {products.map((product, index) => (
            <ProductCard
              key={`product-${index}`}
              className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
              {...product.attributes}
            />
          ))}
        </Slider>
        {button && (
          <Link
            href={`/collections/${button.slug}`}
            className="mt-2 rounded-[24px] bg-yellow-900 px-4 py-2 text-center max-sm:mt-1 md:px-5 md:py-3"
          >
            <Heading
              as="h3"
              size="xl"
              className="text-white-a700_01"
              responsive
            >
              {button.text}
            </Heading>
          </Link>
        )}
      </div>
    );
  },
);

FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;
