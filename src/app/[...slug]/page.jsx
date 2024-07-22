import dynamic from "next/dynamic";
import React, { cache } from "react";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import { landingPageCMSAPI } from "@/lib/strapiAPIs";

// Dynamically import components
const Carousal = dynamic(() => import("@/components/blocks/Carousel"));
const Banner = dynamic(() => import("@/components/blocks/Banner"));
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
    case "ComponentShopCategories":
      return <ShopCategories key={index} {...block} />;
    case "ComponentVideoSection":
      return <VideoSection key={index} {...block} />;
    case "ComponentBlocksFeaturedProducts":
      return <NewLaunchSection key={index} {...block} />;
    case "ComponentOfferCarousal":
      return <OfferCarousal key={index} {...block} />;
    case "ComponentBlogSection":
      return <BlogSection key={index} {...block} />;
    case "ComponentDeliveryInfoSection":
      return <DeliveryInfoSection key={index} {...block} />;
    case "ComponentTabProductSection":
      return <TabProductSection key={index} {...block} />;
    case "ComponentBlocksFeaturedProducts":
      return <div key={index}></div>;
    default:
      return null;
  }
};

const getPageData = cache(async (slug) => {
  const response = await getPageBySlugAPI(slug);
  return response || {};
});

export default async function Page({ params }) {
  try {
    console.log(params);
    const responseData = await landingPageCMSAPI();

    const { blocks } = responseData?.data?.pages.data[0].attributes;
    // const pageData = await getPageData("index");
    // console.log(blocks);
    // const { blocks } = pageData || {};

    if (!blocks?.length) return null;

    return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
  } catch (error) {
    console.error(error);
    return <p>Something went wrong...</p>;
  }
}

export const revalidate = 3600;

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
          <TestimonialSection sectionData={TestimonialSectionData} />
          <BlogSection sectionData={blogSectionData} />
          <VideoSection sectionData={instagramFeedData} />
          <DeliveryInfoSection data={deliveryInfoData} />
        </div>
      </div> */
}
