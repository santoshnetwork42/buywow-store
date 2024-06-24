import IntroCarousal from "@/components/partials/Home/IntroCarousal";
import ShopBanner from "@/components/partials/Home/ShopBanner";
import ShopBannerBT from "@/components/partials/Home/ShopBannerBT";
import ShopCategories from "@/components/partials/Home/ShopCategories";
import ShopIngredients from "@/components/partials/Home/ShopIngredients";
import VideoSection from "@/components/partials/Home/VideoSection";
import WowFeatures from "@/components/partials/Home/WowFeatures";
import React from "react";
import NewLaunchSection from "@/components/partials/Home/NewLaunchSection";
import OfferCarousal from "@/components/features/Carousal/OfferCarousal";
import ConcernSection from "@/components/partials/Home/ConcernSection";
import BestSellerSection from "@/components/partials/Home/BestSellerSection";
import CustomerReviewSection from "@/components/partials/Home/CustomerReviewSection";
import BlogSection from "@/components/partials/Home/BlogSection";
import DeliveryInfoSection from "@/components/common/partials/DeliveryInfoSection";
import ProductCategories from "@/components/partials/Home/ProductCategory";
import { bestSellerData, introCarousalData, productCategoryItems } from "@/data/homeData";

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
      <div className="flex flex-col container-fluid w-full items-center mb-12">
        {/* categories section */}
        <ProductCategories categories={productCategoryItems} />

        {/* promo section */}
        <div className="self-stretch">
          {/* hero slider section */}
          <IntroCarousal carousalData={introCarousalData} />
        </div>

        {/* features list section */}
        <WowFeatures />

        <div className="container-xs">
          {/* new launches section */}
          <BestSellerSection
            title={bestSellerData.title}
            categories={bestSellerData.categories}
            products={bestSellerData.products}
          />
          {/* ingredients section */}
          {/* <ShopIngredients /> */}
          {/* offers section */}
          {/* <OfferCarousal /> */}
          {/* concerns section */}
          {/* <ConcernSection /> */}
          {/* featured products section */}
          {/* <NewLaunchSection /> */}
        </div>
        {/* testimonials section */}
        {/* <ShopBanner /> */}
        {/* <div className="container-xs flex flex-col items-center gap-12 md:p-5"> */}
        {/* categories section */}
        {/* <ShopCategories /> */}
        {/* tabbed product section */}
        {/* <BestSellerSection /> */}
        {/* </div> */}
        {/* brand statement section */}
        {/* <ShopBannerBT /> */}
        {/* <div className="container-xs flex flex-col items-center gap-12 md:p-5"> */}
        {/* customer reviews section */}
        {/* <CustomerReviewSection /> */}
        {/* blog section */}
        {/* <BlogSection /> */}
        {/* instagram feed section */}
        {/* <VideoSection /> */}
        {/* value proposition section */}
        {/* <DeliveryInfoSection className="w-[64%]" /> */}
        {/* </div> */}
      </div>
    </>
  );
};
export default Home;
