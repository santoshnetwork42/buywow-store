import dynamic from "next/dynamic";
import React from "react";
import { getClient } from "@/lib/client";
import { landingPage } from "@/graphql/strapi/queries";
import { extractAttributes } from "@/utils/helpers";

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
    default:
      return null;
  }
};

// export const dynamicParams = false;

export function generateStaticParams() {
  return [
    // { slug: [] },
    { slug: ["a"] },
    { slug: ["a", "1"] },
    { slug: ["b", "2"] },
    { slug: ["c", "3"] },
  ];
}

const Page = async ({ params }) => {
  console.log(params);
  // const responseData = await getClient().query({
  //   query: landingPage,
  //   context: {
  //     fetchOptions: {
  //       next: { revalidate: 0 },
  //     },
  //   },
  // });

  // const { blocks } = extractAttributes(responseData.data.landingPage);

  // if (!blocks || blocks.length === 0) return null;

  // return <>{blocks.map((block, index) => renderBlock(block, index))}</>;

  return <div className="">WOW {Object.values(params).join(" ")} </div>;
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
