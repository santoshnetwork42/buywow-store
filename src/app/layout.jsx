import AnnouncementBar from "@/components/blocks/AnnouncementBar";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import { getNavbarAndFooterAPI } from "@/lib/appSyncAPIs";
import { Provider } from "@/store/Provider";
import "@/styles/font.css";
import "@/styles/index.css";
import "@/styles/tailwind.css";
import NavbarProvider from "@/utils/context/navbar";
import { Amplify } from "aws-amplify";
import { unstable_cache } from "next/cache";
import awsExport from "../../aws-exports";
import { AWS_CLIENT_ID } from "@/config";
import CartDrawer from "@/components/partials/CartDrawer";
import ToastComponent from "@/components/common/ToastComponent";
import { AnnouncementProvider } from "@/utils/context/AnnouncementContext";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

// const getNavbarAndFooter = unstable_cache(
//   getNavbarAndFooterAPI,
//   ["navbar", "footer"],
//   { revalidate: 1 },
// );

async function RootLayout({ children }) {
  // const { data } = (await getNavbarAndFooter()) || {};
  const { data } = await getNavbarAndFooterAPI();
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
      </head>
      <body>
        <Provider>
          <NavbarProvider ignoreLazyLoadNavbar={false}>
            <AnnouncementProvider>
              <div className="flex min-h-dvh w-full flex-col bg-white-a700">
                <AnnouncementBar data={announcementData} />
                {headerData?.data && <Header data={headerData} />}
                <CartDrawer />
                <ToastComponent />
                <div className="flex-1">{children}</div>
                {footerData?.data && <Footer data={footerData} />}
              </div>
            </AnnouncementProvider>
          </NavbarProvider>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
