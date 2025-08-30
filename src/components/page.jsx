import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import handleRedirect from "@/utils/handleRedirect";
import dynamic from "next/dynamic";
import React from "react";

// First fold imports
import FFAccordionDescription from "@/components/blocks/Accordion/AccordionDescription";
import FFAccordionFaQs from "@/components/blocks/Accordion/AccordionFaQs";
import FFAccordionIngredients from "@/components/blocks/Accordion/AccordionIngredients";
import FFAccordionUsageInstructions from "@/components/blocks/Accordion/AccordionUsageInstructions";
import FFInfoDropdown from "@/components/blocks/Accordion/InfoDropdown";
import FFProductLegalInfo from "@/components/blocks/Accordion/ProductLegalInfo";
import FFPageAnnouncementBar from "@/components/blocks/AnnouncementBar/PageAnnouncementBar";
import FFBlogSection from "@/components/blocks/BlogSection";
import FFBreadcrumb from "@/components/blocks/Breadcrumb";
import FFCarousal from "@/components/blocks/Carousel";
import FFCollectionLinks from "@/components/blocks/CollectionLinks";
import FFFeaturedCategories from "@/components/blocks/FeaturedCategories";
import FFFeaturedList from "@/components/blocks/FeaturedList";
import FFFeaturedProducts from "@/components/blocks/FeaturedProducts";
import FFFeaturedProductsByTab from "@/components/blocks/FeaturedProductsByTab";
import FFInfoSection from "@/components/blocks/InfoSection";
import FFIngredientCategories from "@/components/blocks/IngredientCategories";
import FFMiniBanners from "@/components/blocks/MiniBanners";
import FFProductBenefits from "@/components/blocks/Product/ProductBenefits";
import FFProductEffectiveness from "@/components/blocks/Product/ProductEffectiveness";
import FFProductHighlights from "@/components/blocks/Product/ProductHighlights";
import FFProductKeyIngredients from "@/components/blocks/Product/ProductKeyIngredients";
import FFReviews from "@/components/blocks/Product/ProductReviews";
import FFProductCollectionSection from "@/components/blocks/ProductCollectionByTab";
import FFProductDetailView from "@/components/blocks/ProductDetailView";
import FFRecentlyViewed from "@/components/blocks/RecentlyViewed";
import FFQuizPersonalizerQuiz from "@/components/blocks/QuizPersonalizer";
import FFSingleBanner from "@/components/blocks/SingleBanner";
import FFTestimonialSection from "@/components/blocks/TestimonialSection";
import FFTrendingCategories from "@/components/blocks/TrendingCategories";
import FFUpsellProducts from "@/components/blocks/UpsellProducts";
import FFVideoSection from "@/components/partials/Others/VideoSection";
import FFImageSection from "@/components/partials/Others/ImageSection";
import FFVideoHeroBanner from "@/components/blocks/Carousel/VideoHeroBanner";
import { generateSEOAndJSONLD } from "@/utils/helpers/generateSEOAndJSONLD";
import { isSchemaValid } from "@/utils/helpers";

const PAGETYPE = {
  HOME: "home",
  LANDING: "landing",
  PAGES: "pages",
  POLICIES: "policies",
  OFFERS: "offers",
  COLLECTION: "collections",
  PRODUCT: "products",
};

const componentMap = {
  ComponentBlocksAnnouncementBar: {
    FF: FFPageAnnouncementBar,
    Lazy: dynamic(
      () => import("@/components/blocks/AnnouncementBar/PageAnnouncementBar"),
    ),
  },
  ComponentBannerCarousal: {
    FF: FFCarousal,
    Lazy: dynamic(() => import("@/components/blocks/Carousel")),
  },
  ComponentBannerVideoBanner: {
    FF: FFVideoHeroBanner,
    Lazy: dynamic(() => import("@/components/blocks/Carousel/VideoHeroBanner")),
  },
  ComponentBannerSingleBanner: {
    FF: FFSingleBanner,
    Lazy: dynamic(() => import("@/components/blocks/SingleBanner")),
  },
  ComponentBannerMiniBanners: {
    FF: FFMiniBanners,
    Lazy: dynamic(() => import("@/components/blocks/MiniBanners")),
  },
  ComponentCategoriesTrendingCategories: {
    FF: FFTrendingCategories,
    Lazy: dynamic(() => import("@/components/blocks/TrendingCategories")),
  },
  ComponentBlocksFeaturedList: {
    FF: FFFeaturedList,
    Lazy: dynamic(() => import("@/components/blocks/FeaturedList")),
  },
  ComponentCategoriesIngredientCategories: {
    FF: FFIngredientCategories,
    Lazy: dynamic(() => import("@/components/blocks/IngredientCategories")),
  },
  ComponentCategoriesFeaturedCategories: {
    FF: FFFeaturedCategories,
    Lazy: dynamic(() => import("@/components/blocks/FeaturedCategories")),
  },
  ComponentBlocksTestimonialSection: {
    FF: FFTestimonialSection,
    Lazy: dynamic(() => import("@/components/blocks/TestimonialSection")),
  },
  ComponentBlocksFeaturedProducts: {
    FF: FFFeaturedProducts,
    Lazy: dynamic(() => import("@/components/blocks/FeaturedProducts")),
  },
  ComponentBlocksFeaturedProductsByTab: {
    FF: FFFeaturedProductsByTab,
    Lazy: dynamic(() => import("@/components/blocks/FeaturedProductsByTab")),
  },
  ComponentProductProductEffectivenessImages: {
    FF: FFProductEffectiveness,
    Lazy: dynamic(
      () => import("@/components/blocks/Product/ProductEffectiveness"),
    ),
  },
  ComponentProductProductHighlightImages: {
    FF: FFProductHighlights,
    Lazy: dynamic(
      () => import("@/components/blocks/Product/ProductHighlights"),
    ),
  },
  ComponentProductProductBenefits: {
    FF: FFProductBenefits,
    Lazy: dynamic(() => import("@/components/blocks/Product/ProductBenefits")),
  },
  ComponentProductProductKeyIngredientImages: {
    FF: FFProductKeyIngredients,
    Lazy: dynamic(
      () => import("@/components/blocks/Product/ProductKeyIngredients"),
    ),
  },
  ComponentAccordionInfoDropdownSection: {
    FF: FFInfoDropdown,
    Lazy: dynamic(() => import("@/components/blocks/Accordion/InfoDropdown")),
  },
  ComponentProductProductLegalInfo: {
    FF: FFProductLegalInfo,
    Lazy: dynamic(
      () => import("@/components/blocks/Accordion/ProductLegalInfo"),
    ),
  },
  ComponentBlocksCollectionLinks: {
    FF: FFCollectionLinks,
    Lazy: dynamic(() => import("@/components/blocks/CollectionLinks")),
  },
  ComponentBlocksPdp: {
    FF: FFProductDetailView,
    Lazy: dynamic(() => import("@/components/blocks/ProductDetailView")),
  },
  ComponentBlocksProductCollectionByTab: {
    FF: FFProductCollectionSection,
    Lazy: dynamic(() => import("@/components/blocks/ProductCollectionByTab")),
  },
  ComponentBlocksInfoSection: {
    FF: FFInfoSection,
    Lazy: dynamic(() => import("@/components/blocks/InfoSection")),
  },
  ComponentProductProductReviews: {
    FF: FFReviews,
    Lazy: dynamic(() => import("@/components/blocks/Product/ProductReviews")),
  },
  ComponentBlocksUpsellProducts: {
    FF: FFUpsellProducts,
    Lazy: dynamic(() => import("@/components/blocks/UpsellProducts")),
  },
  ComponentAccordionDescriptionSection: {
    FF: FFAccordionDescription,
    Lazy: dynamic(
      () => import("@/components/blocks/Accordion/AccordionDescription"),
    ),
  },
  ComponentAccordionIngredientsSection: {
    FF: FFAccordionIngredients,
    Lazy: dynamic(
      () => import("@/components/blocks/Accordion/AccordionIngredients"),
    ),
  },
  ComponentAccordionUsageInstructionsSection: {
    FF: FFAccordionUsageInstructions,
    Lazy: dynamic(
      () => import("@/components/blocks/Accordion/AccordionUsageInstructions"),
    ),
  },
  ComponentAccordionFaQsSection: {
    FF: FFAccordionFaQs,
    Lazy: dynamic(() => import("@/components/blocks/Accordion/AccordionFaQs")),
  },
  ComponentBlocksBreadcrumb: {
    FF: FFBreadcrumb,
    Lazy: dynamic(() => import("@/components/blocks/Breadcrumb")),
  },
  ComponentBlocksVideoSection: {
    FF: FFVideoSection,
    Lazy: dynamic(() => import("@/components/partials/Others/VideoSection")),
  },
  ComponentBlocksImageSection: {
    FF: FFImageSection,
    Lazy: dynamic(() => import("@/components/partials/Others/ImageSection")),
  },
  ComponentBlocksBlogSection: {
    FF: FFBlogSection,
    Lazy: dynamic(() => import("@/components/blocks/BlogSection")),
  },
  ComponentBlocksRecentlyViewed: {
    FF: FFRecentlyViewed,
    Lazy: dynamic(() => import("@/components/blocks/RecentlyViewed")),
  },
  ComponentQuizPersonalizedQuiz: {
    FF: FFQuizPersonalizerQuiz,
    Lazy: dynamic(() => import("@/components/blocks/QuizPersonalizer")),
  },
};

const renderBlock = ({ block, pageType, slug, index, marketPlaceLinks }) => {
  const {
    showComponentInWeb,
    showImageComponentInWeb = false,
    __typename,
    id,
  } = block || {};
  if (!showComponentInWeb && !showImageComponentInWeb) return null;

  const ComponentInfo = componentMap[__typename];
  if (!ComponentInfo) return null;

  const Component = index < 4 ? ComponentInfo.FF : ComponentInfo.Lazy;

  return (
    <Component
      key={`${__typename}-${id}`}
      slug={slug}
      {...block}
      pageType={pageType}
      lazyBlock={index > 3}
      marketPlaceLinks={marketPlaceLinks}
    />
  );
};

export default async function PageBlock({ pageType, slug }) {
  const pageData = await getPageBySlugAPI(slug);
  const {
    blocks,
    slug: fetchedSlug,
    type: fetchedPageType,
    marketPlaceLinks,
  } = pageData || {};

  if (pageType === "landing" && !fetchedSlug) {
    await handleRedirect(`/${slug}`, pageData);
    return;
  }

  if (!fetchedSlug || fetchedSlug !== slug) {
    await handleRedirect(`/${pageType}/${slug}`, pageData);
    return;
  }

  if (!fetchedPageType || PAGETYPE[fetchedPageType] !== pageType) {
    await handleRedirect(`/${pageType}/${slug}`, pageData);
    return;
  }

  if (!Array.isArray(blocks)) {
    await handleRedirect(`/${pageType}/${slug}`, pageData);
  }

  const findBlock = (typeName) =>
    pageData?.blocks?.find((block) => block?.__typename === typeName) || {};

  const seoComponent = findBlock("ComponentCommonSeo");
  const pdpSection = findBlock("ComponentBlocksPdp");
  const pageFaqs = findBlock("ComponentAccordionFaQsSection");
  const collectionInfoSection = findBlock("ComponentBlocksInfoSection");
  const collectionProducts =
    findBlock("ComponentBlocksProductCollectionByTab") || [];

  const allCollectionProducts = (
    collectionProducts?.productCollectionTabItems || []
  ).find((i) => i?.tab?.data?.attributes?.title === "All");

  const {
    faqsPageJsonLd,
    breadcrumbListJsonLd,
    productJsonLd,
    collectionPageJsonLd,
    organizationJsonLd,
    websiteJsonLd,
  } =
    generateSEOAndJSONLD({
      isProduct: pageType === "products",
      isCollection: pageType === "collections",
      isMain: pageType === "home",
      seoComponent,
      pdpSection,
      collectionInfoSection,
      pageFaqs,
      extractedSlug: slug,
      webUrl: "https://www.buywow.in",
      name: "Buy Wow",
      collectionProducts: allCollectionProducts,
      variantId: "",
    }) || {};

  const schemas = [
    faqsPageJsonLd,
    breadcrumbListJsonLd,
    productJsonLd,
    collectionPageJsonLd,
    organizationJsonLd,
    websiteJsonLd,
  ];

  const validSchemas = schemas.filter(isSchemaValid);

  return (
    <React.Fragment>
      <head>
        {validSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      {blocks.map((block, index) =>
        renderBlock({
          block,
          slug: fetchedSlug,
          pageType: fetchedPageType,
          index,
          marketPlaceLinks,
        }),
      )}
    </React.Fragment>
  );
}
