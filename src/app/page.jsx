import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import dynamic from "next/dynamic";

// Dynamically import components
const PageAnnouncementBar = dynamic(
  () => import("@/components/blocks/AnnouncementBar/PageAnnouncementBar"),
);
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
const RecentlyViewed = dynamic(
  () => import("@/components/blocks/RecentlyViewed"),
);

export const metadata = {
  title: "Natural Skincare Products - Flash Sale Up To 60% OFF",
  description:
    "Revitalize your skin with Vitamin C face wash and natural ingredients. Cruelty-free, dermatologically tested skincare on sale. Free shipping on orders above ₹999.",
};

const componentMap = {
  ComponentBlocksAnnouncementBar: PageAnnouncementBar,
  ComponentBannerCarousal: Carousal,
  ComponentBannerSingleBanner: SingleBanner,
  ComponentBannerMiniBanners: MiniBanners,
  ComponentCategoriesTrendingCategories: TrendingCategories,
  ComponentBlocksFeaturedList: FeaturedList,
  ComponentCategoriesIngredientCategories: IngredientCategories,
  ComponentCategoriesFeaturedCategories: FeaturedCategories,
  ComponentBlocksTestimonialSection: TestimonialSection,
  ComponentBlocksFeaturedProducts: FeaturedProducts,
  ComponentBlocksFeaturedProductsByTab: FeaturedProductsByTab,
  ComponentProductProductEffectivenessImages: ProductEffectiveness,
  ComponentProductProductHighlightImages: ProductHighlights,
  ComponentProductProductBenefits: ProductBenefits,
  ComponentProductProductKeyIngredientImages: ProductKeyIngredients,
  ComponentAccordionInfoDropdownSection: InfoDropdown,
  ComponentBlocksCollectionLinks: CollectionLinks,
  ComponentBlocksPdp: ProductDetailView,
  ComponentBlocksProductCollectionByTab: ProductCollectionSection,
  ComponentBlocksInfoSection: InfoSection,
  ComponentProductProductReviews: Reviews,
  ComponentBlocksUpsellProducts: UpsellProducts,
  ComponentAccordionDescriptionSection: AccordionDescription,
  ComponentAccordionIngredientsSection: AccordionIngredients,
  ComponentAccordionUsageInstructionsSection: AccordionUsageInstructions,
  ComponentAccordionFaQsSection: AccordionFaQs,
  ComponentBlocksBreadcrumb: Breadcrumb,
  ComponentVideoSection: VideoSection,
  ComponentBlocksBlogSection: BlogSection,
  ComponentBlocksRecentlyViewed: RecentlyViewed,
};

const renderBlock = (block, index, slug) => {
  if (!block?.showComponent) return null;

  const Component = componentMap[block?.__typename];
  if (!Component) return null;

  return <Component key={index} slug={slug} {...block} />;
};

export default async function Page() {
  try {
    const pageData = await getPageBySlugAPI("index");
    const { blocks } = pageData || {};

    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      throw new Error("No blocks found or invalid blocks data");
    }

    return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
  } catch (error) {
    console.error("Error in Page component:", error);
  }
}
