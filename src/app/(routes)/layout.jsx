import awsExport from "@/aws-exports";
import ClientSideEffects from "@/components/ClientSideEffects";
import Header from "@/components/partials/Header";
import Scripts from "@/components/scripts";
import { AWS_CLIENT_ID } from "@/config";
import {
  getNavbarAndFooterAPI,
  getStoreConfigurationsAPI,
} from "@/lib/appSyncAPIs";
import { Provider } from "@/store/Provider";
import { AnnouncementProvider } from "@/utils/context/AnnouncementContext";
import GoKwikProvider from "@/utils/context/gokwik";
import NavbarProvider from "@/utils/context/navbar";
import { Amplify } from "aws-amplify";
import dynamic from "next/dynamic";

const AnnouncementBar = dynamic(
  () => import("@/components/blocks/AnnouncementBar"),
);
const CartDrawer = dynamic(() => import("@/components/partials/CartDrawer"));
const Footer = dynamic(() => import("@/components/partials/Footer"));
const ToastComponent = dynamic(
  () => import("@/components/common/ToastComponent"),
);

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

async function PageLayout({ children }) {
  const { data } = (await getNavbarAndFooterAPI()) || {};
  const { data: storeConfig } = (await getStoreConfigurationsAPI()) || {};

  const {
    announcementBar: announcementData = {},
    navbar: headerData = {},
    footer: footerData = {},
    carousel: carouselData = {},
    trendingCategories: categories = {},
    thankYouPage: thankYouPageData = {},
    mobileFooterBar: mobileFooterBarData = {},
  } = data || {};

  return (
    <Provider data={{ headerData, carouselData, categories, announcementData }}>
      <NavbarProvider
        headerData={headerData}
        storeConfig={storeConfig}
        thankYouPageData={thankYouPageData?.data?.attributes}
      >
        <GoKwikProvider>
          <AnnouncementProvider>
            <ClientSideEffects />
            <div className="flex min-h-dvh w-full flex-col">
              <AnnouncementBar data={announcementData} />
              {!!headerData?.data && (
                <Header
                  data={headerData}
                  mobileFooterBarData={mobileFooterBarData}
                />
              )}
              <CartDrawer />
              <ToastComponent />
              <div className="mx-auto flex w-full flex-1 flex-col bg-white-a700">
                {children}
              </div>
              {!!footerData?.data && <Footer data={footerData} />}
            </div>

            <Scripts />
          </AnnouncementProvider>
        </GoKwikProvider>
      </NavbarProvider>
    </Provider>
  );
}

export default PageLayout;
