import { memo } from "react";
import { Button, Heading } from "@/components/elements";
import SectionHeading from "@/components/common/SectionHeading";
import ProductCard from "@/components/partials/Card/ProductCard";
import Slider from "@/components/features/Slider";
import { getBgColor } from "@/utils/helpers";

const UpsellProducts = memo(
  ({ title, upsellProductsBgColor: bgColor, upsellProductItems }) => {
    if (!Array.isArray(upsellProductItems) || upsellProductItems.length === 0)
      return null;

    const bgColorClass = getBgColor(bgColor);
    const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

    const renderProductItem = (item, index) => {
      const { product, text } = item;
      const isMiddleItem = (index - 1) % 3 === 1;

      return (
        <div
          key={`product-${index}`}
          className={`col-span-2 flex h-full flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 ${
            isMiddleItem ? "col-start-2" : ""
          }`}
        >
          <Heading size="xl" as="h3" className="text-lg" responsive>
            <span className="font-light">Step {index + 1}:</span> {text}
          </Heading>
          <ProductCard
            className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
            showBenefitTags={false}
            {...product?.data?.attributes}
          />
        </div>
      );
    };

    return (
      <div
        className={`container-main mb-main flex flex-col items-center justify-center gap-2 ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
      >
        <SectionHeading title={title} />
        <Slider
          controlsContainerClassName="mb-2 md:mb-3"
          sliderClassName="gap-[5px] sm:gap-2 lg:gap-3"
          className="max-md:hidden"
        >
          {upsellProductItems.map((item, index) =>
            renderProductItem(item, index),
          )}
        </Slider>
        <div className="mb-3 grid w-full grid-cols-4 gap-x-[5px] gap-y-5 sm:mb-4 sm:gap-x-2 sm:gap-y-6 md:hidden">
          {upsellProductItems.map((item, index) =>
            renderProductItem(item, index),
          )}
        </div>
        <Button variant="primary" size="large" className="mt-2">
          ₹1695 | Add 5 products to cart
        </Button>
      </div>
    );
  },
);

UpsellProducts.displayName = "UpsellProducts";

export default UpsellProducts;
