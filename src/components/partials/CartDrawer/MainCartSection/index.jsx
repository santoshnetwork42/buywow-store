import React from "react";
import CouponsAndOffers from "./CouponsAndOffers";
import ProductItem from "@/components/partials/CartDrawer/MainCartSection/ProductItem";

const CartProductList = React.memo(
  ({ cartItems, inventoryMapping, handleCartClose }) => {
    if (!cartItems || !Array.isArray(cartItems)) return null;

    return (
      <div className="flex flex-col gap-3">
        {/* done */}
        {cartItems.map((item, index) => (
          <ProductItem
            key={`cart-item-${item?.id}-${index}`}
            item={item}
            inventory={inventoryMapping?.[item?.recordKey]}
            inventoryMapping={inventoryMapping}
            handleCartClose={handleCartClose}
          />
        ))}
      </div>
    );
  },
);

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
