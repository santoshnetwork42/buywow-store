import React from "react";
import CartProductList from "@/components/partials/CartDrawer/MainCartSection/CartProductList";

const MainCartSection = ({ cartData, inventoryMapping, handleCartClose }) => {
  return (
    <div className="flex flex-col gap-4">
      <CartProductList
        cartItems={cartData}
        inventoryMapping={inventoryMapping}
        handleCartClose={handleCartClose}
      />
    </div>
  );
};

export default MainCartSection;
