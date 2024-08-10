import React from "react";
import ProductItem from "@/components/partials/CartDrawer/MainCartSection/CartProductList/ProductItem";
import LimitedTimeProductDeal from "./LimitedTimeProductDeal";

const CartProductList = ({ cartItems, inventoryMapping, handleCartClose }) => {
  if (!cartItems || !Array.isArray(cartItems)) return null;

  const validLtoProducts = cartItems?.filter((item) => item.ltoProduct);
  const validLtoDeals = cartItems?.filter((item) => item.ltoDeal);

  // const isOutOfStock =
  //   validLtoProduct?.qty >
  //   (inventoryMapping?.[validLtoProduct?.recordKey] || 99);

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

      {/* {!!validLtoProduct?.ltoDeal && !isOutOfStock && (
        <div className="pt-2">
          <LimitedTimeProductDeal
            parentRecordKey={validLtoProduct?.recordKey}
            product={validLtoProduct?.ltoDeal}
            addedAt={validLtoProduct?.addedAt}
          />
        </div>
      )} */}
    </div>
  );
};

export default React.memo(CartProductList);
