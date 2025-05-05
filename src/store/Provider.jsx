"use client";

import AnnouncementBar from "@/components/blocks/AnnouncementBar";
import Carousel from "@/components/blocks/Carousel";
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
          categories?.showComponentInWeb &&
          !!categories?.trendingCategoryItems?.length && (
            <div className="no-scrollbar w-full overflow-x-scroll lg:hidden">
              <div className="mx-auto flex w-max animate-pulse items-start justify-center p-3 py-4">
                {Array.from({
                  length: categories?.trendingCategoryItems?.length,
                }).map((_, index) => (
                  <div
                    className="flex w-20 flex-col items-center gap-2"
                    key={index}
                  >
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="h-3 w-14 rounded-md bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        {carouselData?.showComponentInWeb && (
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
