import awsExport from "@/aws-exports";
import AnnouncementBar from "@/components/blocks/AnnouncementBar";
import ClientSideEffects from "@/components/ClientSideEffects";
import ToastComponent from "@/components/common/ToastComponent";
import CartDrawer from "@/components/partials/CartDrawer";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Scripts from "@/components/scripts";
import { AUDITZ, AWS_CLIENT_ID, GOKWIK_SCRIPT, STORE_ID } from "@/config";
import {
  getCartUpsellProductsAPI,
  getInitialDataAPI,
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
import Script from "next/script";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

async function RootLayout({ children }) {
  const { data } = (await getNavbarAndFooterAPI()) || {};
  const initialData = await getInitialDataAPI(STORE_ID, "WEB");

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
        <Provider headerData={headerData}>
          <NavbarProvider initialData={initialData?.data}>
            <GoKwikProvider>
              <AnnouncementProvider>
                <ClientSideEffects />
                <div className="flex min-h-dvh w-full flex-col bg-white-a700">
                  <AnnouncementBar data={announcementData} />
                  {headerData?.data && <Header data={headerData} />}
                  <CartDrawer upsellProducts={upsellProducts} />
                  <ToastComponent />
                  <div className="flex-1">{children}</div>
                  {footerData?.data && <Footer data={footerData} />}
                </div>
                {AUDITZ && (
                  <Script
                    id="adz_rum"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `(() => {
                          const s = document.createElement("script");
                          s.src = "https://rum.auditzy.com/GcPricZc-www.buywow.in.js";
                          document.head.appendChild(s);
                          })()`,
                    }}
                  />
                )}
                <Scripts />
              </AnnouncementProvider>
            </GoKwikProvider>
          </NavbarProvider>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
