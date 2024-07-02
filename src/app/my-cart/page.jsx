// MyCart page component
"use client";

import React from "react";
import DeliveryInfoSection from "@/components/common/partials/DeliveryInfoSection";
import { deliveryInfoData } from "@/data/homeData";
import { myCartData } from "@/data/myCartData";
import MainCartSection from "@/components/partials/MyCart/MainCartSection";
import CartSidebar from "@/components/partials/MyCart/CartSidebar";
import CartHeader from "@/components/partials/MyCart/CartHeader";

export default function MyCart() {
  return (
    <>
      {/* Main container for the cart page */}
      <div className="container-main mb-8 flex w-full flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        {/* Main cart section and sidebar */}
        <div className="mt-3 grid w-full grid-cols-1 gap-3 md:mt-4 md:grid-cols-[55%_auto] md:gap-4 md:gap-x-10 lg:grid-cols-[60%_auto] lg:gap-x-14 xl:gap-x-20">
          {/* Displays cart header and cart items count */}
          <CartHeader
            itemCount={myCartData.itemCount}
            className="max-md:ml-1 md:col-span-2"
          />

          {/* Displays cart items, shipping progress, and cart summary */}
          <MainCartSection cartData={myCartData} />

          {/* Displays offers and payment summary */}
          <CartSidebar
            offers={myCartData.offers}
            paymentSummary={myCartData.paymentSummary}
            cashback={myCartData.cashback}
          />
        </div>

        {/* Delivery information section */}
        <DeliveryInfoSection data={deliveryInfoData} />
      </div>
    </>
  );
}
