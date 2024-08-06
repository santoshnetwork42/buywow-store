import React from "react";
import ProductItem from "@/components/partials/CartDrawer/MainCartSection/CartProductList/ProductItem";

const CartProductList = ({ cartItems, inventoryMapping, handleCartClose }) => {
  if (!cartItems || !Array.isArray(cartItems)) return null;

  return (
    <div className="flex flex-col gap-3">
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
};

export default CartProductList;
