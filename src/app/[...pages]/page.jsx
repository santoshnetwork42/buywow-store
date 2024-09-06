import { MEDIA_BASE_URL } from "@/config";
import {
  getCMSPagesAPI,
  getPageBySlugAPI,
  getStoreAPI,
} from "@/lib/appSyncAPIs";
import handleRedirect from "@/utils/handleRedirect";
import { removeHtmlTags } from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
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
  ComponentVideoSection: VideoSection,
  ComponentBlogSection: BlogSection,
  ComponentBlocksRecentlyViewed: RecentlyViewed,
};

export const revalidate = 100;

//function for getting
const pageType = {
  HOME: "",
  COLLECTION: "collections",
  PRODUCT: "products",
  LANDING: "",
  PAGES: "pages",
  POLICIES: "policies",
};

const renderBlock = (block, slug) => {
  const { showComponent, __typename, id } = block || {};
  if (!showComponent) return null;

  const Component = componentMap[__typename];
  if (!Component) return null;

  return <Component key={`${__typename}-${id}`} slug={slug} {...block} />;
};

export async function generateStaticParams() {
  const pages = await getCMSPagesAPI();

  const allowedTypes = ["pages", "policies"];

  const filteredPages = (pages || []).filter(
    (page) =>
      Array.isArray(page) &&
      page.length === 2 &&
      allowedTypes.includes(page[0]) &&
      page[1] !== "search" &&
      page[1] !== "health" &&
      page[1] !== "index",
  );

  const result = filteredPages.map((page) => ({
    pages: page,
  }));

  return result;
}

async function generateSEOAndJSONLD(params) {
  const {
    isProduct,
    isCollection,
    pdpSection,
    seoComponent,
    extractedSlug,
    webUrl,
    collectionInfoSection,
    pageFaqs,
    collectionProducts,
    MEDIA_BASE_URL,
    getPublicImageURL,
    name,
    removeHtmlTags,
  } = params;

  const faqsPageJsonLd = {
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    mainEntity: [],
  };

  let breadcrumbListJsonLd = {};
  let productJsonLd = {};

  if (isProduct) {
    const { fetchedProduct, productDetailView } =
      pdpSection?.product?.pdpProduct?.data?.attributes || {};

    const productFAQs = productDetailView?.find(
      (item) => item?.__typename === "ComponentAccordionFaQsSection",
    );

    faqsPageJsonLd.mainEntity =
      productFAQs?.FAQs?.map((faq) => ({
        "@type": "Question",
        name: faq?.question,
        acceptedAnswer: { "@type": "Answer", text: faq?.answer },
      })) || [];

    const defaultCollection = seoComponent?.schemaDefaultCollection;

    breadcrumbListJsonLd = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: webUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: defaultCollection,
          item: `${webUrl}/collections/${defaultCollection}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: fetchedProduct?.title,
          item: `${webUrl}/products/${extractedSlug}`,
        },
      ],
    };

    const productImgs =
      fetchedProduct?.images?.items?.map((img) =>
        getPublicImageURL({ key: img.imageKey, resize: 100, addPrefix: true }),
      ) || [];

    productJsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: fetchedProduct?.title || "",
      image: productImgs,
      description:
        fetchedProduct?.longDescription?.replace(/(<([^>]+)>)/gi, "") || "",
      sku: fetchedProduct?.sku || "",
      mpn: fetchedProduct?.sku || "",
      brand: fetchedProduct?.brand || "",
      url: `${webUrl}/products/${extractedSlug}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${webUrl}/products/${extractedSlug}`,
        price: fetchedProduct?.price,
        priceValidUntil: new Date().toISOString(),
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 3.5,
            currency: "INR",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "IN",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            businessDays: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "https://schema.org/Monday",
                "https://schema.org/Tuesday",
                "https://schema.org/Wednesday",
                "https://schema.org/Thursday",
                "https://schema.org/Friday",
                "https://schema.org/Saturday",
                "https://schema.org/Sunday",
              ],
            },
            cutoffTime: "19:00:00+05:30",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 0,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 5,
              unitCode: "DAY",
            },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "IN",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 7,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
      gtin: fetchedProduct?.barcode || "",
      gtin8: fetchedProduct?.barcode || "",
      gtin13: fetchedProduct?.barcode || "",
      gtin14: fetchedProduct?.barcode || "",
    };
  } else if (isCollection) {
    faqsPageJsonLd.mainEntity =
      pageFaqs?.FAQs?.map((faq) => ({
        "@type": "Question",
        name: faq?.question,
        acceptedAnswer: { "@type": "Answer", text: faq?.answer },
      })) || [];

    breadcrumbListJsonLd = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://${MEDIA_BASE_URL}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: extractedSlug,
          item: `https://${MEDIA_BASE_URL}/collections/${extractedSlug}`,
        },
      ],
    };
  }

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    // numberOfItems: searchProducts?.total,
    itemListOrder: "Unordered",
    // itemListElement: [
    //   ...searchProducts?.items?.map((product, index) => {
    //     const { thumbImage } = getProductMeta(product);
    //     return {
    //       "@type": "ListItem",
    //       position: index + 1,
    //       name: product?.title,
    //       url: `https://${MEDIA_BASE_URL}/products/${product?.slug}`,
    //       image: {
    //         "@type": "ImageObject",
    //         contentUrl: getPublicImageURL(thumbImage?.imageKey),
    //       },
    //     };
    //   }),
    // ],
  };

  return {
    siteName: name,
    url: extractedSlug,
    title: seoComponent?.seoTitle,
    description: removeHtmlTags(seoComponent?.seoDescription),
    metaTitle: seoComponent?.seoMetaTitle,
    noIndex: seoComponent?.noIndex,
    content: collectionInfoSection?.information || "",
    faqsPageJsonLd,
    breadcrumbListJsonLd,
    productJsonLd,
    alternates: {
      canonical:
        seoComponent?.seoCanonical ||
        `${webUrl}/${isProduct ? "products" : "collections"}/${extractedSlug}`,
    },
    openGraph: {
      title: seoComponent?.seoTitle,
      description: seoComponent?.seoDescription,
    },
    collectionPageJsonLd,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = params;

  if (!Array.isArray(slug) || slug.length <= 1) {
    return null;
  }

  const extractedSlug = slug[slug.length - 1];
  const pageData = await getPageBySlugAPI(extractedSlug);
  const store = await getStoreAPI();
  const { webUrl, name } = store || {};

  const type = slug[0];
  const isProduct = type === "products";
  const isCollection = type === "collections";

  if (!pageData?.blocks) {
    return null;
  }

  const findBlock = (typeName) =>
    pageData?.blocks?.find((block) => block?.__typename === typeName) || {};

  const seoComponent = findBlock("ComponentCommonSeo");
  const collectionInfoSection = findBlock("ComponentBlocksInfoSection");
  const pdpSection = findBlock("ComponentBlocksPdp");
  const pageFaqs = findBlock("ComponentAccordionFaQsSection");
  const collectionProducts = findBlock("ComponentBlocksProductCollectionByTab");

  const seoData =
    (await generateSEOAndJSONLD({
      isProduct,
      isCollection,
      pdpSection,
      seoComponent,
      extractedSlug,
      webUrl,
      collectionInfoSection,
      pageFaqs,
      collectionProducts,
      MEDIA_BASE_URL,
      getPublicImageURL,
      name,
      removeHtmlTags,
    })) || {};

  return seoData;
}

export default async function Page({ params }) {
  const { pages } = params;

  const fullSlug = pages.join("/");
  const lastSlug = pages[pages.length - 1];

  // if (pages.length > 2) {
  //   return await handleRedirect(`/${fullSlug}`);
  // }

  const pageData = await getPageBySlugAPI(lastSlug);
  const { blocks, slug, type } = pageData || {};

  // if (!slug) {
  //   console.log("Page not found: >>>", fullSlug);
  //   return await handleRedirect(`/${fullSlug}`, false);
  // }

  const expectedPath =
    type === "PRODUCT" ||
    type === "COLLECTION" ||
    type === "PAGES" ||
    type === "POLICIES"
      ? `${pageType[type]}/${slug}`
      : slug;

  const actualPath = fullSlug === "index" ? "" : fullSlug;

  if (expectedPath !== actualPath) {
    return await handleRedirect(`/${expectedPath}`);
  }

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    throw new Error(`Blocks not found on ${fullSlug} page`);
  }

  return (
    <React.Fragment>
      {blocks.map((block, index) => renderBlock(block, pages, index))}
    </React.Fragment>
  );
}
