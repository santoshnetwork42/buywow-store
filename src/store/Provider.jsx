"use client";

import AnnouncementBar from "@/components/blocks/AnnouncementBar";
import Carousel from "@/components/blocks/Carousel";
import TrendingCategories from "@/components/blocks/TrendingCategories";
import Header from "@/components/partials/Header";
import store, { persistor } from "@/store/store";
import { AnnouncementProvider } from "@/utils/context/AnnouncementContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider as ReactProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const LoadingState = ({ data, pathname }) => {
  const { headerData, carouselData, categories, announcementData } = data || {};

  return (
    <div className="max-h-[100dvh] overflow-hidden">
      <AnnouncementProvider>
        <AnnouncementBar
          data={announcementData}
          announcementData={announcementData}
        />
        {headerData?.data && <Header data={headerData} />}
        {pathname === "/" &&
          categories?.showComponent &&
          !!categories?.trendingCategoryItems?.length && (
            <TrendingCategories
              trendingCategoryItems={categories?.trendingCategoryItems}
              lazyBlock={false}
            />
          )}
        {carouselData?.showComponent && (
          <Carousel
            carousalItems={carouselData?.carousalItems}
            isPersistLoading
          />
        )}
      </AnnouncementProvider>
    </div>
  );
};

export const Provider = ({ children, data }) => {
  const pathname = usePathname();
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setIsInteracted(true);
      // Remove event listeners after first interaction
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return (
    <ReactProvider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<LoadingState data={data} pathname={pathname} />}
      >
        {children}
      </PersistGate>
    </ReactProvider>
  );
};
