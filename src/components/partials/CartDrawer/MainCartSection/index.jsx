import dynamic from "next/dynamic";
import React from "react";

const ProductItem = dynamic(
  () => import("@/components/partials/CartDrawer/MainCartSection/ProductItem"),
);

const LimitedTimeDealProductSection = dynamic(
  () => import("@/components/partials/CartDrawer/LTOProductSection"),
);

const CartProductList = React.memo(({ cartItems, inventoryMapping }) => {
  if (!cartItems || !Array.isArray(cartItems)) return null;

  return (
    <div className="flex flex-col gap-3">
      {cartItems.map((item, index) => (
        <ProductItem
          key={`cart-item-${item?.id}-${index}`}
          item={item}
          inventory={inventoryMapping?.[item?.recordKey]}
          inventoryMapping={inventoryMapping}
        />
      ))}
    </div>
  );
});

CartProductList.displayName = "CartProductList";

const MainCartSection = React.memo(
  ({ cartItems, upsellProducts, inventoryMapping, ltoProducts }) => {
    return (
      <div className="mb-7 flex flex-1 flex-col gap-4">
        <CartProductList
          cartItems={cartItems}
          inventoryMapping={inventoryMapping}
        />
        <LimitedTimeDealProductSection
          ltoProducts={ltoProducts}
          cartItems={cartItems}
        />
      </div>
    );
  },
);

MainCartSection.displayName = "MainCartSection";

export default MainCartSection;
