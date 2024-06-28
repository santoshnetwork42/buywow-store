"use client";

import {
  Button,
  Heading,
  Img,
  SelectBox,
  Slider,
  Text,
} from "@/components/common";
import Breadcrumb from "@/components/common/Breadcrumb";
import Header from "@/components/common/Header";
import ProductCard from "@/components/features/Card/ProductCard";
import AutoHomepageWireframeProductCard from "@/components/partials/CollectionPage/AutoHomepageWireframeProductCard";
import CollectionMetadata from "@/components/partials/CollectionPage/CollectionMetadata";
import CollectionPageBanner from "@/components/partials/CollectionPage/CollectionPageBanner";
import AutoHomepageWireframeKeywords from "@/components/partials/CollectionPage/DeliveryInfoSection";
import RecentlyViewedSection from "@/components/partials/CollectionPage/RecentlyViewedSection";
import ShopCategories from "@/components/partials/Home/ShopCategories";
import {
  exploreMoreData,
  metadataData,
  recentlyViewedData,
} from "@/data/collectionData";
import { breadcrumbItems, productData } from "@/data/productData";
import Link from "next/link";
import React, { Suspense } from "react";

// export const metadata = {
//   title: "Skin Care Collection - Nourish and Revitalize Your Skin",
//   description:
//     "Explore our exclusive collection of skin care products designed to nourish and revitalize your skin. Discover natural, cruelty-free, and dermatologically tested products for a radiant complexion. Enjoy free shipping on orders above ₹999.",
// };

const data = [
  { productImage: "img_image_2054.png", productTitle: "hair care" },
  { productImage: "img_image_2055.png", productTitle: "skin care" },
  { productImage: "img_image_2056.png", productTitle: "bath & body" },
];
const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const Collections = () => {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <>
      {/* main content section */}
      <div className="mb-10 flex w-full flex-col items-center">
        {/* main navigation header section */}
        <div className="container-xs flex flex-col">
          {/* breadcrumb section */}
          <div className="my-3 sm:ml-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* introductory section */}
          <CollectionPageBanner />
        </div>

        {/* product category header section */}
        <div className="container-xs p-5">
          {/* product filter section */}
          <div className="flex flex-col gap-[46px]">
            {/* <div className="flex flex-col items-start justify-between gap-5 px-[5px]">
              <div className="flex w-[67%] w-full flex-col justify-center gap-10">
                <Heading size="heading4xl" as="h1" className="capitalize">
                  Shop By Concern
                </Heading>
                <div className="flex flex-1 flex-col justify-center gap-5 self-stretch">
                  <Button className="flex h-[31px] min-w-[42px] flex-row items-center justify-center rounded-[15px] border border-solid border-lime-100 px-[11px] text-center text-base font-light capitalize text-black-900">
                    all
                  </Button>
                  <Button className="flex h-[31px] min-w-[79px] flex-row items-center justify-center rounded-[15px] border border-solid border-blue-50 bg-blue-50 px-[11px] text-center text-base capitalize text-black-900">
                    Hair Oil
                  </Button>
                  <Button className="flex h-[31px] w-full flex-1 flex-row items-center justify-center self-stretch rounded-[15px] border border-solid border-lime-100 px-[11px] text-center text-base font-light capitalize text-black-900">
                    shampoo
                  </Button>
                  <Button className="flex h-[31px] min-w-[108px] flex-row items-center justify-center rounded-[15px] border border-solid border-lime-100 px-[11px] text-center text-base font-light capitalize text-black-900">
                    conditioner
                  </Button>
                  <Button className="flex h-[31px] min-w-[70px] flex-row items-center justify-center rounded-[15px] border border-solid border-lime-100 px-[11px] text-center text-base font-light capitalize text-black-900">
                    serum
                  </Button>
                  <Button className="flex h-[31px] min-w-[62px] flex-row items-center justify-center rounded-[15px] border border-solid border-lime-100 px-[11px] text-center text-base font-light capitalize text-black-900">
                    mask
                  </Button>
                  <Button className="flex h-[31px] w-full flex-1 flex-row items-center justify-center self-stretch rounded-[15px] border border-solid border-lime-100 px-[11px] text-center text-base font-light capitalize text-black-900">
                    combos
                  </Button>
                </div>
              </div>
              <div className="flex w-[13%] w-full items-center justify-center gap-[7px]">
                <Text as="p" className="self-end">
                  Sort By:
                </Text>
                <SelectBox
                  indicator={
                    <Img
                      src="img_arrowdown_black_900_1.svg"
                      width={9}
                      height={4}
                      alt="arrow_down"
                      className="h-[4px] w-[9px]"
                    />
                  }
                  name="Sort Dropdown"
                  placeholder={`Highest Rating`}
                  options={dropDownOptions}
                  className="flex flex-grow gap-px border-b border-solid border-black-900 py-0.5 pr-[19px] text-sm font-medium text-black-900"
                />
              </div>
            </div> */}

            {/* product listing section */}
            {/* <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 justify-center gap-3">
              <ProductCard
                {...productData[0]}
                className="cursor-pointer gap-3 bg-lime-50_01 hover:shadow-xs"
              />
            </div> */}
          </div>
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
