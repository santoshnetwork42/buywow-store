import dynamic from "next/dynamic";
import React from "react";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import { landingPageCMSAPI } from "@/lib/strapiAPIs";
import { unstable_cache } from "next/cache";

// Dynamically import components
const Carousal = dynamic(() => import("@/components/blocks/Carousel"));
const SingleBanner = dynamic(() => import("@/components/blocks/SingleBanner"));
const MiniBanners = dynamic(() => import("@/components/blocks/MiniBanners"));
const TrendingCategories = dynamic(
  () => import("@/components/blocks/TrendingCategories"),
);
const FeaturedList = dynamic(() => import("@/components/blocks/FeaturedList"));
const IngredientCategories = dynamic(
  () => import("@/components/blocks/IngredientCategories"),
);
const FeaturedCategories = dynamic(
  () => import("@/components/blocks/FeaturedCategories"),
);
const TestimonialSection = dynamic(
  () => import("@/components/blocks/TestimonialSection"),
);
const FeaturedProducts = dynamic(
  () => import("@/components/blocks/FeaturedProducts"),
);
const FeaturedProductsByTab = dynamic(
  () => import("@/components/blocks/FeaturedProductsByTab"),
);
const ProductEffectiveness = dynamic(
  () => import("@/components/blocks/ProductEffectiveness"),
);
const ProductHighlights = dynamic(
  () => import("@/components/blocks/ProductHighlights"),
);
const ProductBenefits = dynamic(
  () => import("@/components/blocks/ProductBenefits"),
);
const ProductKeyIngredients = dynamic(
  () => import("@/components/blocks/ProductKeyIngredients"),
);
const InfoDropdown = dynamic(
  () => import("@/components/blocks/Accordion/InfoDropdown"),
);
const CollectionLinks = dynamic(
  () => import("@/components/blocks/CollectionLinks"),
);
const VideoSection = dynamic(
  () => import("@/components/partials/Home/VideoSection"),
);
const BlogSection = dynamic(
  () => import("@/components/partials/Home/BlogSection"),
);

export const metadata = {
  title: "Natural Skincare Products - Flash Sale Up To 60% OFF",
  description:
    "Revitalize your skin with Vitamin C face wash and natural ingredients. Cruelty-free, dermatologically tested skincare on sale. Free shipping on orders above ₹999.",
};

const renderBlock = (block, index) => {
  switch (block?.__typename) {
    case "ComponentBannerCarousal":
      return <Carousal key={index} {...block} />;
    case "ComponentBannerSingleBanner":
      return <SingleBanner key={index} {...block} />;
    case "ComponentBannerMiniBanners":
      return <MiniBanners key={index} {...block} />;
    case "ComponentCategoriesTrendingCategories":
      return <TrendingCategories key={index} {...block} />;
    case "ComponentBlocksFeaturedList":
      return <FeaturedList key={index} {...block} />;
    case "ComponentCategoriesIngredientCategories":
      return <IngredientCategories key={index} {...block} />;
    case "ComponentCategoriesFeaturedCategories":
      return <FeaturedCategories key={index} {...block} />;
    case "ComponentBlocksTestimonialSection":
      return <TestimonialSection key={index} {...block} />;
    case "ComponentBlocksFeaturedProducts":
      return <FeaturedProducts key={index} {...block} />;
    case "ComponentBlocksFeaturedProductsByTab":
      return <FeaturedProductsByTab key={index} {...block} />;
    case "ComponentProductProductEffectivenessImages":
      return <ProductEffectiveness key={index} {...block} />;
    case "ComponentProductProductHighlightImages":
      return <ProductHighlights key={index} {...block} />;
    case "ComponentProductProductBenefits":
      return <ProductBenefits key={index} {...block} />;
    case "ComponentProductProductKeyIngredientImages":
      return <ProductKeyIngredients key={index} {...block} />;
    case "ComponentAccordionInfoDropdownSection":
      return <InfoDropdown key={index} {...block} />;
    case "ComponentBlocksCollectionLinks":
      return <CollectionLinks key={index} {...block} />;
    case "ComponentVideoSection":
      return <VideoSection key={index} {...block} />;
    case "ComponentBlogSection":
      return <BlogSection key={index} {...block} />;
    default:
      return null;
  }
};

const getPageData = unstable_cache(
  async (slug) => await getPageBySlugAPI(slug),
  ["pageData"],
  { revalidate: 10 },
);

export default async function Page() {
  try {
    // const responseData = await landingPageCMSAPI();
    // const { blocks } = responseData?.data?.pages.data[0].attributes;

    const pageData = await getPageData("index");
    const { blocks } = pageData || {};

    if (!blocks?.length) return null;

    return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
  } catch (error) {
    console.error(error);
    return <p>Something went wrong...</p>;
  }
}
