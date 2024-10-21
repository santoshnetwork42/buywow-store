"use client";

import Carousel from "@/components/blocks/Carousel";
import Header from "@/components/partials/Header";
import store, { persistor } from "@/store/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider as ReactProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const LoadingState = ({ data }) => {
  // Your existing loading state components here
  const { headerData, carouselData } = data || {};

  return (
    <div className="max-h-[100dvh] overflow-hidden">
      {headerData?.data && <Header data={headerData} />}
      {carouselData?.showComponent && (
        <Carousel
          carousalItems={carouselData?.carousalItems}
          isPersistLoading
        />
      )}
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
      <PersistGate persistor={persistor} loading={<LoadingState data={data} />}>
        {children}
      </PersistGate>
    </ReactProvider>
  );
};
