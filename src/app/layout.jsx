import awsExport from "@/aws-exports";
import AnnouncementBar from "@/components/blocks/AnnouncementBar";
import ToastComponent from "@/components/common/ToastComponent";
import CartDrawer from "@/components/partials/CartDrawer";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import { AWS_CLIENT_ID, GOKWIK_SCRIPT } from "@/config";
import {
  getCartUpsellProductsAPI,
  getNavbarAndFooterAPI,
} from "@/lib/appSyncAPIs";
import { Provider } from "@/store/Provider";
import "@/styles/font.css";
import "@/styles/index.css";
import "@/styles/tailwind.css";
import { AnnouncementProvider } from "@/utils/context/AnnouncementContext";
import GoKwikProvider from "@/utils/context/gokwik";
import NavbarProvider from "@/utils/context/navbar";
import { Amplify } from "aws-amplify";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

// const getNavbarAndFooter = unstable_cache(
//   getNavbarAndFooterAPI,
//   ["navbar", "footer"],
//   { revalidate: 1800 },
// );

export const revalidate = 30;

async function RootLayout({ children }) {
  // const { data } = (await getNavbarAndFooter()) || {};
  const { data } = (await getNavbarAndFooterAPI()) || {};
  const upsellProducts = await getCartUpsellProductsAPI();
  const {
    announcementBar: announcementData = {},
    navbar: headerData = {},
    footer: footerData = {},
  } = data || {};

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        {!!GOKWIK_SCRIPT && <script defer src={GOKWIK_SCRIPT} />}
      </head>
      <body>
        <Provider>
          <NavbarProvider ignoreLazyLoadNavbar={false}>
            <GoKwikProvider>
              <AnnouncementProvider>
                <div className="flex min-h-dvh w-full flex-col bg-white-a700">
                  <AnnouncementBar data={announcementData} />
                  {headerData?.data && <Header data={headerData} />}
                  <CartDrawer upsellProducts={upsellProducts} />
                  <ToastComponent />
                  <div className="flex-1">{children}</div>
                  {footerData?.data && <Footer data={footerData} />}
                </div>
              </AnnouncementProvider>
            </GoKwikProvider>
          </NavbarProvider>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
