import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import handleRedirect from "@/utils/handleRedirect";
import React from "react";

// Dynamically import components
import AccordionDescription from "@/components/blocks/Accordion/AccordionDescription";
import AccordionFaQs from "@/components/blocks/Accordion/AccordionFaQs";
import AccordionIngredients from "@/components/blocks/Accordion/AccordionIngredients";
import AccordionUsageInstructions from "@/components/blocks/Accordion/AccordionUsageInstructions";
import InfoDropdown from "@/components/blocks/Accordion/InfoDropdown";
import ProductLegalInfo from "@/components/blocks/Accordion/ProductLegalInfo";
import PageAnnouncementBar from "@/components/blocks/AnnouncementBar/PageAnnouncementBar";
import BlogSection from "@/components/blocks/BlogSection";
import Breadcrumb from "@/components/blocks/Breadcrumb";
import Carousal from "@/components/blocks/Carousel";
import CollectionLinks from "@/components/blocks/CollectionLinks";
import FeaturedCategories from "@/components/blocks/FeaturedCategories";
import FeaturedList from "@/components/blocks/FeaturedList";
import FeaturedProducts from "@/components/blocks/FeaturedProducts";
import FeaturedProductsByTab from "@/components/blocks/FeaturedProductsByTab";
import InfoSection from "@/components/blocks/InfoSection";
import IngredientCategories from "@/components/blocks/IngredientCategories";
import MiniBanners from "@/components/blocks/MiniBanners";
import ProductBenefits from "@/components/blocks/Product/ProductBenefits";
import ProductEffectiveness from "@/components/blocks/Product/ProductEffectiveness";
import ProductHighlights from "@/components/blocks/Product/ProductHighlights";
import ProductKeyIngredients from "@/components/blocks/Product/ProductKeyIngredients";
import Reviews from "@/components/blocks/Product/ProductReviews";
import ProductCollectionSection from "@/components/blocks/ProductCollectionByTab";
import ProductDetailView from "@/components/blocks/ProductDetailView";
import RecentlyViewed from "@/components/blocks/RecentlyViewed";
import SingleBanner from "@/components/blocks/SingleBanner";
import TestimonialSection from "@/components/blocks/TestimonialSection";
import TrendingCategories from "@/components/blocks/TrendingCategories";
import UpsellProducts from "@/components/blocks/UpsellProducts";
import VideoSection from "@/components/partials/Others/VideoSection";

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

  if (!fetchedSlug) {
    return handleRedirect(`/${pageType}/${slug}`);
  }

  if (PAGETYPE[fetchedPageType] !== pageType) {
    return handleRedirect(`/${pageType}/${slug}`);
  }

  return (
    <React.Fragment>
      {blocks.map((block) => renderBlock({ block, slug, pageType }))}
    </React.Fragment>
  );
}
