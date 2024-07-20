import dynamic from "next/dynamic";
import React from "react";
import { extractAttributes } from "@/utils/helpers";
import { searchCMSProductsAPI } from "@/lib/appSyncAPIs";
import { landingPageCMSAPI } from "@/lib/strapiAPIs";

// Dynamically import components
const Carousal = dynamic(() => import("@/components/blocks/Carousel"));
const Banner = dynamic(() => import("@/components/blocks/Banner"));
const TrendingCategories = dynamic(
  () => import("@/components/blocks/TrendingCategories"),
);
const FeatureList = dynamic(() => import("@/components/blocks/FeatureList"));
const IngredientCategories = dynamic(
  () => import("@/components/blocks/IngredientCategories"),
);
const ShopCategories = dynamic(
  () => import("@/components/partials/Home/ShopCategories"),
);
const VideoSection = dynamic(
  () => import("@/components/partials/Home/VideoSection"),
);
const NewLaunchSection = dynamic(
  () => import("@/components/partials/Home/NewLaunchSection"),
);
const OfferCarousal = dynamic(
  () => import("@/components/features/Carousel/OfferCarousel"),
);
const ConcernSection = dynamic(
  () => import("@/components/partials/Home/ConcernSection"),
);
const CustomerReviewSection = dynamic(
  () => import("@/components/partials/Home/CustomerReviewSection"),
);
const BlogSection = dynamic(
  () => import("@/components/partials/Home/BlogSection"),
);
const DeliveryInfoSection = dynamic(
  () => import("@/components/common/partials/DeliveryInfoSection"),
);

const TabProductSection = dynamic(
  () => import("@/components/partials/Home/TabProductSection"),
);

export const metadata = {
  title: "Natural Skincare Products - Flash Sale Up To 60% OFF",
  description:
    "Revitalize your skin with Vitamin C face wash and natural ingredients. Cruelty-free, dermatologically tested skincare on sale. Free shipping on orders above ₹999.",
};

const renderBlock = (block, index) => {
  switch (block.__typename) {
    case "ComponentBannerCarousal":
      return <Carousal key={index} {...block} />;
    case "ComponentBannerBanners":
      return <Banner key={index} {...block} />;
    case "ComponentShopCategories":
      return <ShopCategories key={index} {...block} />;
    case "ComponentCategoriesIngredientCategories":
      return <IngredientCategories key={index} {...block} />;
    case "ComponentVideoSection":
      return <VideoSection key={index} {...block} />;
    case "ComponentNewLaunchSection":
      return <NewLaunchSection key={index} {...block} />;
    case "ComponentOfferCarousal":
      return <OfferCarousal key={index} {...block} />;
    case "ComponentConcernSection":
      return <ConcernSection key={index} {...block} />;
    case "ComponentCustomerReviewSection":
      return <CustomerReviewSection key={index} {...block} />;
    case "ComponentBlogSection":
      return <BlogSection key={index} {...block} />;
    case "ComponentDeliveryInfoSection":
      return <DeliveryInfoSection key={index} {...block} />;
    case "ComponentCategoriesTrendingCategories":
      return <TrendingCategories key={index} {...block} />;
    case "ComponentTabProductSection":
      return <TabProductSection key={index} {...block} />;
    case "ComponentBlocksFeaturedList":
      return <FeatureList key={index} {...block} />;
    case "ComponentBlocksFeaturedProducts":
      return <></>;
    default:
      return null;
  }
};

const Page = async () => {
  const responseData = await landingPageCMSAPI();

  //pass "productSlugs" fetched from CMS -> input to searchCMSProductsAPI
  //shift this call in "featuredProducts...." component
  const products = await searchCMSProductsAPI();

  const { blocks } = responseData?.data?.pages.data[0].attributes;

  if (!blocks || blocks.length === 0) return null;

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
};
export default Page;

{
  /* <div className="mb-8 flex w-full flex-col items-center">
        <ProductCategories categories={productCategoryItems} />
        <Carousal className="w-full" carousalData={introCarousalData} />
        <ProductFeatures
          className="container-main mb-7 mt-[22px] sm:mt-6 md:mt-7 lg:my-8"
          features={productFeaturesData.features}
        />
        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <TabProductSection
            title={bestSellerData.title}
            categories={bestSellerData.categories}
            products={bestSellerData.products}
          />
          <ShopIngredients shopIngredientsData={shopIngredientsData} />
          <OfferCarousal offers={offersData} />
          <ConcernSection sectionData={concernSectionData} />
          <NewLaunchSection newLaunchData={newLaunchData} />
        </div>
        <ShopBanner
          {...testimonialBannerData}
          className="my-8 sm:my-10 lg:my-12"
        />
        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <ShopCategories sectionData={shopCategoriesData} />
          <TabProductSection {...tabProductData} />
        </div>
        <ShopBanner
          {...portfolioBannerData}
          className="my-8 sm:my-10 lg:my-12"
        />
        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <CustomerReviewSection sectionData={customerReviewSectionData} />
          <BlogSection sectionData={blogSectionData} />
          <VideoSection sectionData={instagramFeedData} />
          <DeliveryInfoSection data={deliveryInfoData} />
        </div>
      </div> */
}
