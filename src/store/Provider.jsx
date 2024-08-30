"use client";

import Carousel from "@/components/blocks/Carousel";
import Header from "@/components/partials/Header";
import store, { persistor } from "@/store/store";
import { Provider as ReactProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Provider = ({ children, headerData }) => {
  return (
    <ReactProvider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <>
            {headerData?.data && <Header data={headerData} />}
            <Carousel
              carousalItems={[
                {
                  id: "1",
                  webImage: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/banner_da03d075ef.png",
                        height: 496,
                        width: 1440,
                      },
                    },
                  },
                  mWebImage: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/image_1_cda11de928.png",
                        height: 296,
                        width: 750,
                      },
                    },
                  },
                  link: "https://wow-frontend-v3-prod.vercel.app/collections/all",
                  moeText: null,
                },
              ]}
            />
          </>
        }
      >
        {children}
      </PersistGate>
    </ReactProvider>
  );
};
