import IntroCarousal from "@/components/common/partials/IntroCarousal";
import ShopBanner from "@/components/partials/Home/ShopBanner";
import ShopCategories from "@/components/partials/Home/ShopCategories";
import ShopIngredients from "@/components/partials/Home/ShopIngredients";
import VideoSection from "@/components/partials/Home/VideoSection";
import React from "react";
import NewLaunchSection from "@/components/partials/Home/NewLaunchSection";
import OfferCarousal from "@/components/features/Carousel/OfferCarousel";
import ConcernSection from "@/components/partials/Home/ConcernSection";
import CustomerReviewSection from "@/components/partials/Home/CustomerReviewSection";
import BlogSection from "@/components/partials/Home/BlogSection";
import DeliveryInfoSection from "@/components/common/partials/DeliveryInfoSection";
import ProductCategories from "@/components/partials/Home/ProductCategory";
import {
  bestSellerData,
  blogSectionData,
  concernSectionData,
  customerReviewSectionData,
  deliveryInfoData,
  instagramFeedData,
  introCarousalData,
  newLaunchData,
  offersData,
  portfolioBannerData,
  productCategoryItems,
  productFeaturesData,
  shopCategoriesData,
  shopIngredientsData,
  tabProductData,
  testimonialBannerData,
} from "@/data/homeData";
import TabProductSection from "@/components/partials/Home/TabProductSection";
import ProductFeatures from "@/components/partials/Home/ProductFeatures";

export const metadata = {
  title: "Natural Skincare Products - Flash Sale Up To 60% OFF",
  description:
    "Revitalize your skin with Vitamin C face wash and natural ingredients. Cruelty-free, dermatologically tested skincare on sale. Free shipping on orders above ₹999.",
};

const Home = () => {
  return (
    <>
      {/* Main Content Section */}
      <div className="mb-8 flex w-full flex-col items-center">
        {/* Product Categories Display */}
        <ProductCategories categories={productCategoryItems} />

        {/* Promotional Carousal Section */}
        <IntroCarousal className="w-full" carousalData={introCarousalData} />

        {/* Product Features List */}
        <ProductFeatures
          className="container-main mb-7 mt-[22px] sm:mt-6 md:mt-7 lg:my-8"
          features={productFeaturesData.features}
        />

        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* New Launches Tabbed Product Section */}
          <TabProductSection
            title={bestSellerData.title}
            categories={bestSellerData.categories}
            products={bestSellerData.products}
          />

          {/* Ingredients Section */}
          <ShopIngredients shopIngredientsData={shopIngredientsData} />

          {/* Offers Section */}
          <OfferCarousal offers={offersData} />

          {/* Concerns Section */}
          <ConcernSection sectionData={concernSectionData} />

          {/* Featured Products Section */}
          <NewLaunchSection newLaunchData={newLaunchData} />
        </div>

        {/* Testimonials Section */}
        <ShopBanner
          {...testimonialBannerData}
          className="my-8 sm:my-10 lg:my-12"
        />

        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Shop Categories Section */}
          <ShopCategories sectionData={shopCategoriesData} />
          {/* Tabbed Product Section */}
          <TabProductSection {...tabProductData} />
        </div>

        {/* Brand Statement Section */}
        <ShopBanner
          {...portfolioBannerData}
          className="my-8 sm:my-10 lg:my-12"
        />

        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Customer Reviews Section */}
          <CustomerReviewSection sectionData={customerReviewSectionData} />

          {/* Blog Section */}
          <BlogSection sectionData={blogSectionData} />

          {/* Instagram Feed Section */}
          <VideoSection sectionData={instagramFeedData} />

          {/* Delivery Information Section */}
          <DeliveryInfoSection data={deliveryInfoData} />
        </div>
      </div>
    </>
  );
};
export default Home;
