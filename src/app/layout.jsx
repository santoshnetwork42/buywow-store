import React from "react";
import "@/styles/tailwind.css";
import "@/styles/index.css";
import "@/styles/font.css";
import { Amplify } from "aws-amplify";
import awsExport from "../../aws-exports";
import { AWS_CLIENT_ID } from "../../config";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import { Provider } from "@/store/Provider";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { getNavbarAndFooterAPI } from "@/lib/appSyncAPIs";
import { unstable_cache } from "next/cache";

Amplify.configure({
  ...awsExport,
  ssr: true,
  aws_user_pools_web_client_id: AWS_CLIENT_ID,
});

const getNavbarAndFooter = unstable_cache(
  getNavbarAndFooterAPI,
  ["navbar", "footer"],
  { revalidate: 900 },
);

async function RootLayout({ children }) {
  const { data } = await getNavbarAndFooter();
  const { navbar: headerData, footer: footerData } = data;

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
          <div className="flex min-h-dvh w-full flex-col bg-white-a700">
            <AnnouncementBar
              leftText="Free Shipping On Orders Above ₹999"
              centerContent={{
                isTimer: true,
                centerText: "⚡ Flash Sale up to 60% OFF for",
                targetDate: "2024-08-05T00:00:00",
              }}
              rightText="100% Refund on returns"
              flashSaleDiscount={60}
            />
            {headerData?.data && <Header data={headerData} />}
            <div className="flex-1">{children}</div>
            {footerData?.data && <Footer data={footerData} />}
          </div>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
