import React from "react";
import CartProductList from "@/components/partials/CartDrawer/MainCartSection/CartProductList";
import DiscountAndLoyalty from "@/components/partials/CartDrawer/MainCartSection/DiscountAndLoyalty";

const MainCartSection = ({ cartData, inventoryMapping, handleCartClose }) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <CartProductList
        cartItems={cartData}
        inventoryMapping={inventoryMapping}
        handleCartClose={handleCartClose}
      />
      <DiscountAndLoyalty />
    </div>
  );
};

export default MainCartSection;
