"use client";

import Carousel from "@/components/blocks/Carousel";
import Header from "@/components/partials/Header";
import store, { persistor } from "@/store/store";
import { Provider as ReactProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Provider = ({ children, data }) => {
  const { headerData, carouselData } = data || {};

  return (
    <ReactProvider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <>
            {headerData?.data && <Header data={headerData} />}
            {carouselData?.showComponent && (
              <Carousel
                carousalItems={carouselData?.carousalItems}
                isPersistLoading
              />
            )}
          </>
        }
      >
        {children}
      </PersistGate>
    </ReactProvider>
  );
};
