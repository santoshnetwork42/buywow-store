import Breadcrumb from "@/components/common/Breadcrumb";
import CollectionPageBanner from "@/components/partials/Collection/CollectionPageBanner";
import ProductCollectionSection from "@/components/partials/Collection/ProductCollectionSection";
import {
  bannerData,
  breadcrumbItems,
  productCollectionData,
} from "@/data/collectionData";
import React from "react";

export const metadata = {
  title: "Skin Care Collection - Nourish and Revitalize Your Skin",
  description:
    "Explore our exclusive collection of skin care products designed to nourish and revitalize your skin. Discover natural, cruelty-free, and dermatologically tested products for a radiant complexion. Enjoy free shipping on orders above ₹999.",
};

const Collections = () => {
  return (
    <>
      <div className="mb-10 flex w-full flex-col items-center">
        {/* main navigation header section */}
        <div className="container-xs mb-7 mt-3 flex flex-col gap-3">
          {/* breadcrumb section */}
          <Breadcrumb items={breadcrumbItems} />

          {/* introductory section */}
          <CollectionPageBanner
            bannerData={bannerData}
            className="relative sm:-left-1.5 sm:w-[calc(100%+12px)] lg:-left-2.5 lg:w-[calc(100%+20px)]"
          />
        </div>

        {/* main content section */}
        <div className="container-xs flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* product category header section */}
          <ProductCollectionSection collectionData={productCollectionData} />
        </div>

        {/* explore more section */}
        {/* <ShopCategories sectionData={exploreMoreData} /> */}

        {/* recently viewed section */}
        {/* <RecentlyViewedSection recentlyViewedData={recentlyViewedData} /> */}

        {/* blog content section */}
        {/* <CollectionMetadata metadataData={metadataData} /> */}
      </div>
    </>
  );
};

export default Collections;
