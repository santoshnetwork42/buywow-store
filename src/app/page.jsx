import IntroCarousal from "@/components/partials/Home/IntroCarousal";
import ShopBanner from "@/components/partials/Home/ShopBanner";
import ShopCategories from "@/components/partials/Home/ShopCategories";
import ShopIngredients from "@/components/partials/Home/ShopIngredients";
import VideoSection from "@/components/partials/Home/VideoSection";
import WowFeatures from "@/components/partials/Home/WowFeatures";
import React from "react";
import NewLaunchSection from "@/components/partials/Home/NewLaunchSection";
import OfferCarousal from "@/components/features/Carousel/OfferCarousel";
import ConcernSection from "@/components/partials/Home/ConcernSection";
import BestSellerSection from "@/components/partials/Home/BestSellerSection";
import CustomerReviewSection from "@/components/partials/Home/CustomerReviewSection";
import BlogSection from "@/components/partials/Home/BlogSection";
import DeliveryInfoSection from "@/components/common/partials/DeliveryInfoSection";
import ProductCategories from "@/components/partials/Home/ProductCategory";
import {
  bestSellerData,
  concernSectionData,
  customerReviewSectionData,
  introCarousalData,
  newLaunchData,
  offersData,
  portfolioBannerData,
  productCategoryItems,
  shopCategoriesData,
  shopIngredientsData,
  tabProductData,
  testimonialBannerData,
} from "@/data/homeData";
import TabProductSection from "@/components/partials/Home/TabProductSection";

export const metadata = {
  title: "Natural Skincare Products - Flash Sale Up To 60% OFF",
  description:
    "Revitalize your skin with Vitamin C face wash and natural ingredients. Cruelty-free, dermatologically tested skincare on sale. Free shipping on orders above ₹999.",
  //ogTitle:'...'
};

const Home = () => {
  return (
    <>
      {/* main content section */}
      <div className="container-fluid mb-12 flex w-full flex-col items-center">
        {/* categories section */}
        <ProductCategories categories={productCategoryItems} />

        {/* promo section */}
        <div className="self-stretch">
          {/* hero slider section */}
          <IntroCarousal carousalData={introCarousalData} />
        </div>

        {/* features list section */}
        <WowFeatures />

        <div className="container-xs flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* new launches section */}
          <BestSellerSection
            title={bestSellerData.title}
            categories={bestSellerData.categories}
            products={bestSellerData.products}
          />

          {/* ingredients section */}
          <ShopIngredients shopIngredientsData={shopIngredientsData} />

          {/* offers section */}
          <OfferCarousal offers={offersData} />

          {/* concerns section */}
          <ConcernSection sectionData={concernSectionData} />

          {/* featured products section */}
          <NewLaunchSection newLaunchData={newLaunchData} />
        </div>

        {/* testimonials section */}
        <ShopBanner
          {...testimonialBannerData}
          className="my-8 sm:my-10 lg:my-12"
        />

        <div className="container-xs flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* categories section */}
          <ShopCategories sectionData={shopCategoriesData} />
          {/* tabbed product section */}
          <TabProductSection {...tabProductData} />
        </div>

        {/* brand statement section */}
        <ShopBanner
          {...portfolioBannerData}
          className="my-8 sm:my-10 lg:my-12"
        />

        <div className="container-xs flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* customer reviews section */}
          <CustomerReviewSection sectionData={customerReviewSectionData} />
          {/* blog section */}
          {/* <BlogSection /> */}
          {/* instagram feed section */}
          {/* <VideoSection /> */}
          {/* value proposition section */}
          {/* <DeliveryInfoSection className="w-[64%]" /> */}
        </div>
      </div>
    </>
  );
};
export default Home;
