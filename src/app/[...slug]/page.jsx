import dynamic from "next/dynamic";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
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
  () => import("@/components/blocks/Product/ProductEffectiveness"),
);
const ProductHighlights = dynamic(
  () => import("@/components/blocks/Product/ProductHighlights"),
);
const ProductBenefits = dynamic(
  () => import("@/components/blocks/Product/ProductBenefits"),
);
const ProductKeyIngredients = dynamic(
  () => import("@/components/blocks/Product/ProductKeyIngredients"),
);
const InfoDropdown = dynamic(
  () => import("@/components/blocks/Accordion/InfoDropdown"),
);
const CollectionLinks = dynamic(
  () => import("@/components/blocks/CollectionLinks"),
);
const ProductDetailView = dynamic(
  () => import("@/components/blocks/ProductDetailView"),
);
const ProductCollectionSection = dynamic(
  () => import("@/components/blocks/ProductCollectionByTab"),
);
const InfoSection = dynamic(() => import("@/components/blocks/InfoSection"));
const Reviews = dynamic(
  () => import("@/components/blocks/Product/ProductReviews"),
);
const UpsellProducts = dynamic(
  () => import("@/components/blocks/UpsellProducts"),
);
const AccordionDescription = dynamic(
  () => import("@/components/blocks/Accordion/AccordionDescription"),
);
const AccordionIngredients = dynamic(
  () => import("@/components/blocks/Accordion/AccordionIngredients"),
);
const AccordionUsageInstructions = dynamic(
  () => import("@/components/blocks/Accordion/AccordionUsageInstructions"),
);
const AccordionFaQs = dynamic(
  () => import("@/components/blocks/Accordion/AccordionFaQs"),
);
const Breadcrumb = dynamic(() => import("@/components/blocks/Breadcrumb"));
const VideoSection = dynamic(
  () => import("@/components/partials/Others/VideoSection"),
);
const BlogSection = dynamic(
  () => import("@/components/partials/Others/BlogSection"),
);

export const metadata = {
  title: "Natural Skincare Products - Flash Sale Up To 60% OFF",
  description:
    "Revitalize your skin with Vitamin C face wash and natural ingredients. Cruelty-free, dermatologically tested skincare on sale. Free shipping on orders above ₹999.",
};

const renderBlock = (block, index, slug) => {
  switch (block?.__typename) {
    case "ComponentBannerCarousal":
      return <Carousal key={index} slug={slug} {...block} />;
    case "ComponentBannerSingleBanner":
      return <SingleBanner key={index} slug={slug} {...block} />;
    case "ComponentBannerMiniBanners":
      return <MiniBanners key={index} slug={slug} {...block} />;
    case "ComponentCategoriesTrendingCategories":
      return <TrendingCategories key={index} slug={slug} {...block} />;
    case "ComponentBlocksFeaturedList":
      return <FeaturedList key={index} slug={slug} {...block} />;
    case "ComponentCategoriesIngredientCategories":
      return <IngredientCategories key={index} slug={slug} {...block} />;
    case "ComponentCategoriesFeaturedCategories":
      return <FeaturedCategories key={index} slug={slug} {...block} />;
    case "ComponentBlocksTestimonialSection":
      return <TestimonialSection key={index} slug={slug} {...block} />;
    case "ComponentBlocksFeaturedProducts":
      return <FeaturedProducts key={index} slug={slug} {...block} />;
    case "ComponentBlocksFeaturedProductsByTab":
      return <FeaturedProductsByTab key={index} slug={slug} {...block} />;
    case "ComponentProductProductEffectivenessImages":
      return <ProductEffectiveness key={index} slug={slug} {...block} />;
    case "ComponentProductProductHighlightImages":
      return <ProductHighlights key={index} slug={slug} {...block} />;
    case "ComponentProductProductBenefits":
      return <ProductBenefits key={index} slug={slug} {...block} />;
    case "ComponentProductProductKeyIngredientImages":
      return <ProductKeyIngredients key={index} slug={slug} {...block} />;
    case "ComponentAccordionInfoDropdownSection":
      return <InfoDropdown key={index} slug={slug} {...block} />;
    case "ComponentBlocksCollectionLinks":
      return <CollectionLinks key={index} slug={slug} {...block} />;
    case "ComponentBlocksPdp":
      return <ProductDetailView key={index} slug={slug} {...block} />;
    case "ComponentBlocksProductCollectionByTab":
      return <ProductCollectionSection key={index} slug={slug} {...block} />;
    case "ComponentBlocksInfoSection":
      return <InfoSection key={index} slug={slug} {...block} />;
    case "ComponentProductProductReviews":
      return <Reviews key={index} slug={slug} {...block} />;
    case "ComponentBlocksUpsellProducts":
      return <UpsellProducts key={index} slug={slug} {...block} />;
    case "ComponentAccordionDescriptionSection":
      return <AccordionDescription key={index} slug={slug} {...block} />;
    case "ComponentAccordionIngredientsSection":
      return <AccordionIngredients key={index} slug={slug} {...block} />;
    case "ComponentAccordionUsageInstructionsSection":
      return <AccordionUsageInstructions key={index} slug={slug} {...block} />;
    case "ComponentAccordionFaQsSection":
      return <AccordionFaQs key={index} slug={slug} {...block} />;
    case "ComponentBlocksBreadcrumb":
      return <Breadcrumb key={index} slug={slug} {...block} />;
    case "ComponentVideoSection":
      return <VideoSection key={index} slug={slug} {...block} />;
    case "ComponentBlogSection":
      return <BlogSection key={index} slug={slug} {...block} />;
    default:
      return null;
  }
};

const getPageData = unstable_cache(getPageBySlugAPI, ["pageData"], {
  revalidate: 1,
});

export default async function Page({ params }) {
  const { slug } = params;
  try {
    // const responseData = await landingPageCMSAPI();
    // const { blocks } = responseData?.data?.pages.data[0].attributes;

    const pageData = await getPageData(slug[slug.length - 1]);
    const { blocks } = pageData || {};

    if (!Array.isArray(blocks) || blocks.length === 0) {
      throw new Error("No blocks found or invalid blocks data");
    }

    return <>{blocks.map((block, index) => renderBlock(block, index, slug))}</>;
  } catch (error) {
    console.error("Error in Page component:", error);
    // throw error;
  }
}
