import { AlertInfoIcon } from "@/assets/svg/icons";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import { unstable_cache } from "next/cache";
import dynamic from "next/dynamic";
import Link from "next/link";

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

const renderBlock = (block, index) => {
  switch (block?.__typename) {
    case "ComponentBannerCarousal":
      return <Carousal key={index} slug={["index"]} {...block} />;
    case "ComponentBannerSingleBanner":
      return <SingleBanner key={index} slug={["index"]} {...block} />;
    case "ComponentBannerMiniBanners":
      return <MiniBanners key={index} slug={["index"]} {...block} />;
    case "ComponentCategoriesTrendingCategories":
      return <TrendingCategories key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksFeaturedList":
      return <FeaturedList key={index} slug={["index"]} {...block} />;
    case "ComponentCategoriesIngredientCategories":
      return <IngredientCategories key={index} slug={["index"]} {...block} />;
    case "ComponentCategoriesFeaturedCategories":
      return <FeaturedCategories key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksTestimonialSection":
      return <TestimonialSection key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksFeaturedProducts":
      return <FeaturedProducts key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksFeaturedProductsByTab":
      return <FeaturedProductsByTab key={index} slug={["index"]} {...block} />;
    case "ComponentProductProductEffectivenessImages":
      return <ProductEffectiveness key={index} slug={["index"]} {...block} />;
    case "ComponentProductProductHighlightImages":
      return <ProductHighlights key={index} slug={["index"]} {...block} />;
    case "ComponentProductProductBenefits":
      return <ProductBenefits key={index} slug={["index"]} {...block} />;
    case "ComponentProductProductKeyIngredientImages":
      return <ProductKeyIngredients key={index} slug={["index"]} {...block} />;
    case "ComponentAccordionInfoDropdownSection":
      return <InfoDropdown key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksCollectionLinks":
      return <CollectionLinks key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksPdp":
      return <ProductDetailView key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksProductCollectionByTab":
      return (
        <ProductCollectionSection key={index} slug={["index"]} {...block} />
      );
    case "ComponentBlocksInfoSection":
      return <InfoSection key={index} slug={["index"]} {...block} />;
    case "ComponentProductProductReviews":
      return <Reviews key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksUpsellProducts":
      return <UpsellProducts key={index} slug={["index"]} {...block} />;
    case "ComponentAccordionDescriptionSection":
      return <AccordionDescription key={index} slug={["index"]} {...block} />;
    case "ComponentAccordionIngredientsSection":
      return <AccordionIngredients key={index} slug={["index"]} {...block} />;
    case "ComponentAccordionUsageInstructionsSection":
      return (
        <AccordionUsageInstructions key={index} slug={["index"]} {...block} />
      );
    case "ComponentAccordionFaQsSection":
      return <AccordionFaQs key={index} slug={["index"]} {...block} />;
    case "ComponentBlocksBreadcrumb":
      return <Breadcrumb key={index} slug={slug} {...block} />;
    case "ComponentVideoSection":
      return <VideoSection key={index} slug={["index"]} {...block} />;
    case "ComponentBlogSection":
      return <BlogSection key={index} slug={["index"]} {...block} />;
    default:
      return null;
  }
};

const getPageData = unstable_cache(getPageBySlugAPI, ["pageData"], {
  revalidate: 1,
});

export default async function Page() {
  try {
    // const responseData = await landingPageCMSAPI();
    // const { blocks } = responseData?.data?.pages.data[0].attributes;

    const pageData = await getPageData("index");
    const { blocks } = pageData || {};

    if (!!blocks) {
      if (!Array.isArray(blocks) || blocks.length === 0) return null;

      return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
    } else {
      return (
        <div>
          <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r to-pink-50 p-6 text-center">
            <AlertInfoIcon size={64} />
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Oops! Something went wrong
            </h2>
            <p className="mb-6 text-gray-600">
              {`We're having trouble loading the page you requested.`}
            </p>
            <p className="mb-8 text-gray-600">
              {`Don't worry, it's not you - it's us. Our team has been notified
              and we're working on a fix.`}
            </p>
            <Link
              href="/"
              className="text-white transform rounded-full px-6 py-3 font-semibold text-white-a700_01 transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Try Again
            </Link>
            <p className="mt-8 text-sm text-gray-500">
              If the problem persists, please contact our{" "}
              <a href="#" className="text-yellow-900 hover:underline">
                customer support
              </a>
              .
            </p>
          </div>
        </div>
      );
    }
  } catch (error) {
    console.error(error);
    return <p>Something went wrong...</p>;
  }
}
