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
  } = data || {};

  return (
    <Provider data={{ headerData, carouselData, categories, announcementData }}>
      <NavbarProvider headerData={headerData} storeConfig={storeConfig}>
        <GoKwikProvider>
          <AnnouncementProvider>
            <ClientSideEffects />

            <div className="balloons fixed inset-0 z-[1] h-full w-full overflow-hidden">
              <img
                src="images/balloon1.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[25%] h-auto w-20 cursor-pointer select-none"
              />
              <img
                src="images/balloon2.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[85%] h-auto w-20 cursor-pointer select-none [animation-delay:2s] [animation-duration:12s]"
              />
              <img
                src="images/balloon3.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[10%] h-auto w-20 cursor-pointer select-none [animation-delay:4s]"
              />
              <img
                src="images/balloon4.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[70%] h-auto w-20 cursor-pointer select-none [animation-duration:18s]"
              />
              <img
                src="images/balloon5.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[65%] h-auto w-20 cursor-pointer select-none"
              />
              <img
                src="images/balloon6.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[35%] h-auto w-20 cursor-pointer select-none [animation-delay:3s]"
              />
              <img
                src="images/balloon4.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[30%] h-auto w-20 cursor-pointer select-none [animation-delay:6s] [animation-duration:8s]"
              />
              <img
                src="images/balloon2.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[55%] h-auto w-20 cursor-pointer select-none [animation-delay:4s]"
              />
              <img
                src="images/balloon5.svg"
                alt="Balloon"
                className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[45%] h-auto w-20 cursor-pointer select-none [animation-delay:2.5s] [animation-duration:10s]"
              />
            </div>
            <div className="flex min-h-dvh w-full flex-col">
              <AnnouncementBar data={announcementData} />
              {!!headerData?.data && <Header data={headerData} />}
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
