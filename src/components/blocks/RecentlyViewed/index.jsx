"use client";

import SectionHeading from "@/components/common/SectionHeading";
import Slider from "@/components/features/Slider";
import ProductCard from "@/components/partials/Card/ProductCard";
import { getPageBySlugAPI } from "@/lib/appSyncAPIs";
import { useRecentlyViewedDispatch } from "@/store/sagas/dispatch/recentlyViewed.dispatch";
import { extractAttributes, getBgColor } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const fetchFreshProducts = async (products) => {
  return Promise.all(
    products?.map(async (item) => {
      const productPage = await getPageBySlugAPI(item.slug);
      const pdpBlock = productPage?.blocks?.find(
        (block) => block.__typename === "ComponentBlocksPdp",
      );
      return extractAttributes(pdpBlock?.product?.pdpProduct);
    }),
  );
};

const RecentlyViewed = ({
  recentlyViewedTitle: title,
  recentlyViewedBgColor: bgColor,
}) => {
  const { setRecentlyViewedStalePeriod } = useRecentlyViewedDispatch();
  const recentlyViewedProducts = useSelector(
    (state) => state.recentlyViewed?.recentlyViewedProducts,
  );
  const recentlyViewedStalePeriod = useSelector(
    (state) => state.recentlyViewed?.stalePeriod,
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const oneHourAgo = Date.now() - 1 * 60 * 60 * 1000;
        if (!(recentlyViewedStalePeriod < oneHourAgo)) {
          setProducts(recentlyViewedProducts?.slice(1) || []);
        } else {
          const freshProducts = await fetchFreshProducts(
            recentlyViewedProducts?.slice(1),
          );
          setProducts(freshProducts || []);
          // Update stale period after fetching fresh data
          setRecentlyViewedStalePeriod(Date.now());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to cached data
        setProducts(recentlyViewedProducts?.slice(1) || []);
      }
    };

    getProducts();
  }, [recentlyViewedProducts]);

  if (products.length === 0) return null;

  const bgColorClass = getBgColor(bgColor);
  const isPaddedColor = bgColor === "LIME" || bgColor === "BLUE";

  return (
    <div
      className={`container-main mb-main flex flex-col items-center justify-center ${bgColorClass} ${isPaddedColor ? "py-5" : ""}`}
    >
      <SectionHeading title={title} />
      <Slider sliderClassName="gap-[5px] sm:gap-2 lg:gap-3" isContainShadow>
        {products?.map((product, index) => (
          <ProductCard
            key={`product-${index}`}
            className="w-[calc(50vw-16px)] max-w-[356px] bg-white-a700_01 sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24.5px)] lg:w-[calc(33vw-30px)] xl:w-[calc(25vw-34px)]"
            {...product}
            section={{
              name: "recently_viewed",
              tabValue: "recently_viewed",
            }}
          />
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(RecentlyViewed);
