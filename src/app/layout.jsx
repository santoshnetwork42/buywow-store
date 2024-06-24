import React from "react";
import "@/styles/tailwind.css";
import "@/styles/index.css";
import "@/styles/font.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AnnouncementBar from "@/components/common/AnnouncementBar";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="theme-color"
          content="#000000"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </head>
      <body>
        <div className="w-full min-h-screen flex flex-col bg-white-a700">
          <AnnouncementBar
            leftText="Free Shipping On Orders Above ₹999"
            centerContent={{
              isTimer: true,
              centerText: "Free Shipping On Orders Above ₹999",
              days: 1,
              hours: 5,
              minutes: 54,
              seconds: 24,
            }}
            rightText="100% Refund on returns"
            flashSaleDiscount={60}
          />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
export default RootLayout;
