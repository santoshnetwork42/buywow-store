import React from "react";
import CartProductList from "@/components/partials/CartDrawer/MainCartSection/CartProductList";
import CouponsAndOffers from "./CouponsAndOffers";

const MainCartSection = ({ cartData, inventoryMapping, handleCartClose }) => {
  return (
    <div className="mb-5 flex flex-1 flex-col gap-4">
      <CartProductList
        cartItems={cartData}
        inventoryMapping={inventoryMapping}
        handleCartClose={handleCartClose}
      />
      <CouponsAndOffers />
    </div>
  );
};

export default MainCartSection;
