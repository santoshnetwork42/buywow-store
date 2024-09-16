import awsExport from "@/aws-exports";
import AnnouncementBar from "@/components/blocks/AnnouncementBar";
import ClientSideEffects from "@/components/ClientSideEffects";
import ToastComponent from "@/components/common/ToastComponent";
import CartDrawer from "@/components/partials/CartDrawer";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Scripts from "@/components/scripts";
import { AUDITZ, AWS_CLIENT_ID, GOKWIK_SCRIPT } from "@/config";
import {
  getCartUpsellProductsAPI,
  getNavbarAndFooterAPI,
} from "@/lib/appSyncAPIs";
import { Provider } from "@/store/Provider";
import "@/styles/index.css";
import "@/styles/tailwind.css";
import { AnnouncementProvider } from "@/utils/context/AnnouncementContext";
import GoKwikProvider from "@/utils/context/gokwik";
import NavbarProvider from "@/utils/context/navbar";
import { Amplify } from "aws-amplify";
import { Outfit } from "next/font/google";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: {
    default: "Buy Wow",
    template: "%s | Buy Wow",
  },
  metadataBase: new URL("https://buywow.in"),
};

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

async function RootLayout({ children }) {
  const { data } = (await getNavbarAndFooterAPI()) || {};
  const upsellProducts = await getCartUpsellProductsAPI();

  const {
    announcementBar: announcementData = {},
    navbar: headerData = {},
    footer: footerData = {},
    carousel: carouselData = {},
  } = data || {};

  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        {!!GOKWIK_SCRIPT && (
          <Script strategy="lazyOnload" defer src={GOKWIK_SCRIPT} />
        )}
      </head>
      <body>
        <Provider data={{ headerData, carouselData }}>
          <NavbarProvider headerData={headerData}>
            <GoKwikProvider>
              <AnnouncementProvider>
                <ClientSideEffects />
                <div className="flex min-h-dvh w-full flex-col">
                  <AnnouncementBar data={announcementData} />
                  {headerData?.data && <Header data={headerData} />}
                  <CartDrawer upsellProducts={upsellProducts} />
                  <ToastComponent />
                  <div className="mx-auto flex w-full flex-1 flex-col bg-white-a700">
                    {children}
                  </div>
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
