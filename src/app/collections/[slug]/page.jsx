import Breadcrumb from "@/components/common/Breadcrumb";
import CollectionMetadata from "@/components/partials/Collection/CollectionMetadata";
import CollectionPageBanner from "@/components/partials/Collection/CollectionPageBanner";
import ProductCollectionSection from "@/components/partials/Collection/ProductCollectionSection";
import RecentlyViewedSection from "@/components/partials/Collection/RecentlyViewedSection";
import ShopCategories from "@/components/partials/Home/ShopCategories";
import {
  bannerData,
  breadcrumbItems,
  exploreMoreData,
  metadataData,
  productCollectionData,
  recentlyViewedData,
} from "@/data/collectionData";
import React from "react";

export const metadata = {
  title: "Skin Care Collection - Nourish and Revitalize Your Skin",
  description:
    "Explore our exclusive collection of skin care products designed to nourish and revitalize your skin. Discover natural, cruelty-free, and dermatologically tested products for a radiant complexion. Enjoy free shipping on orders above ₹999.",
};

const Collections = ({ params }) => {
  return (
    <>
      <div className="mb-8 flex w-full flex-col items-center">
        {/* Main navigation header */}
        <div className="container-main mb-7 mt-3 flex flex-col gap-3">
          {/* Breadcrumb navigation */}
          <Breadcrumb items={breadcrumbItems} currentPage={params.slug} />

          {/* Introductory section */}
          <CollectionPageBanner
            bannerData={bannerData}
            className="relative sm:-left-1.5 sm:w-[calc(100%+12px)] lg:-left-2.5 lg:w-[calc(100%+20px)]"
          />
        </div>

        {/* Main content section */}
        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Product category header */}
          <ProductCollectionSection collectionData={productCollectionData} />
        </div>

        <div className="container-main my-8 w-full bg-lime-50 pb-4 pt-3 sm:my-10 md:pb-5 md:pt-4 lg:my-12">
          {/* Explore more section */}
          <ShopCategories sectionData={exploreMoreData} />
        </div>

        <div className="container-main flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Recently viewed section */}
          <RecentlyViewedSection recentlyViewedData={recentlyViewedData} />

          {/* Collection metadata section */}
          <CollectionMetadata metadataData={metadataData} />
        </div>
      </div>
    </>
  );
};

export default Collections;
