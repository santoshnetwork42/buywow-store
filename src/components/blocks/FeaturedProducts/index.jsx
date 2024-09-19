import SectionHeading from "@/components/common/SectionHeading";
import { Heading } from "@/components/elements";
import Slider from "@/components/features/Slider";
import ProductCard from "@/components/partials/Card/ProductCard";
import { getBgColor } from "@/utils/helpers";
import { setSoldOutLast } from "@/utils/helpers/products";
import Link from "next/link";

const FeaturedProducts = ({
  title,
  featuredProductsBgColor: bgColor,
  button,
  products: { data: products },
  promotion,
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
        isContainShadow
      >
        {setSoldOutLast(products, true).map((product, index) => (
          <ProductCard
            key={`product-${index}`}
            className="w-[calc(50vw-16px)] max-w-[326px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
            parentPromotionTag={promotion}
            {...product.attributes}
          />
        ))}
      </Slider>
      {!!button?.text && (
        <Link
          prefetch={false}
          href={`/collections/${button.slug}`}
          className="mt-1 rounded-[24px] bg-yellow-900 px-4 py-2 text-center md:px-5 md:py-3"
        >
          <Heading as="h3" size="xl" className="text-white-a700_01" responsive>
            {button.text}
          </Heading>
        </Link>
      )}
    </div>
  );
};

FeaturedProducts.displayName = "FeaturedProducts";

export default FeaturedProducts;
