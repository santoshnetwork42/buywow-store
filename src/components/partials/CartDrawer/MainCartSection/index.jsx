import React from "react";
import CartProductList from "@/components/partials/CartDrawer/MainCartSection/CartProductList";
import CouponsAndOffers from "./CouponsAndOffers";

const MainCartSection = ({ cartItems, inventoryMapping, handleCartClose }) => {
  return (
    <div className="mb-5 flex flex-1 flex-col gap-4">
      <CartProductList
        cartItems={cartItems}
        inventoryMapping={inventoryMapping}
        handleCartClose={handleCartClose}
      />
      {/* done */}
      <CouponsAndOffers />
    </div>
  );
};

export default MainCartSection;
