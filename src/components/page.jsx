import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import handleRedirect from "@/utils/handleRedirect";
import dynamic from "next/dynamic";
import React from "react";

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
const ProductLegalInfo = dynamic(
  () => import("@/components/blocks/Accordion/ProductLegalInfo"),
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
const BlogSection = dynamic(() => import("@/components/blocks/BlogSection"));
const RecentlyViewed = dynamic(
  () => import("@/components/blocks/RecentlyViewed"),
);

const PAGETYPE = {
  HOME: "home",
  LANDING: "landing",
  PAGES: "pages",
  POLICIES: "policies",
  COLLECTION: "collections",
  PRODUCT: "products",
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
  ComponentProductProductLegalInfo: ProductLegalInfo,
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
  ComponentBlocksVideoSection: VideoSection,
  ComponentBlocksBlogSection: BlogSection,
  ComponentBlocksRecentlyViewed: RecentlyViewed,
};

const renderBlock = ({ block, pageType, slug }) => {
  const { showComponent, __typename, id } = block || {};
  if (!showComponent) return null;

  const Component = componentMap[__typename];
  if (!Component) return null;

  return (
    <Component
      key={`${__typename}-${id}`}
      slug={slug}
      {...block}
      pageType={pageType}
    />
  );
};

export default async function PageBlock({ pageType, slug }) {
  const pageData = await getPageBySlugAPI(slug);
  const { blocks, slug: fetchedSlug, type: fetchedPageType } = pageData;

  if (!fetchedSlug || fetchedSlug !== slug) {
    await handleRedirect(`/${pageType}/${slug}`);
  }

  if (!fetchedPageType || PAGETYPE[fetchedPageType] !== pageType) {
    await handleRedirect(`/${pageType}/${slug}`);
  }

  if (!Array.isArray(blocks)) {
    await handleRedirect(`/${pageType}/${slug}`);
  }

  return (
    <React.Fragment>
      {blocks.map((block) => renderBlock({ block, slug, pageType }))}
    </React.Fragment>
  );
}
