import dynamic from "next/dynamic";
import React from "react";

const ProductItem = dynamic(
  () => import("@/components/partials/CartDrawer/MainCartSection/ProductItem"),
);

const LimitedTimeDealProductSection = dynamic(
  () => import("@/components/partials/CartDrawer/LTOProductSection"),
);

const UpsellProducts = dynamic(
  () =>
    import(
      "@/components/partials/Product/PDP/ProductDetailViewBlocks/UpsellProducts"
    ),
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
  ({ cartItems, upsellProducts, inventoryMapping }) => {
    const validLtoProduct =
      !!cartItems?.length &&
      (cartItems.find((i) => i.ltoProduct) || cartItems.find((i) => i.ltoDeal));

    const outOfStock =
      validLtoProduct?.qty >
      ((inventoryMapping || {})[validLtoProduct?.recordKey] || 99);

    return (
      <div className="mb-7 flex flex-1 flex-col gap-4">
        <CartProductList
          cartItems={cartItems}
          inventoryMapping={inventoryMapping}
        />
        {!!validLtoProduct && !outOfStock && (
          <LimitedTimeDealProductSection
            parentRecordKey={validLtoProduct?.recordKey}
            product={validLtoProduct?.ltoDeal || validLtoProduct?.ltoProduct}
            addedAt={validLtoProduct?.addedAt}
            isBought={!!validLtoProduct?.ltoProduct}
          />
        )}

        {!!upsellProducts?.cartUpsellProducts?.length && (
          <UpsellProducts
            title={upsellProducts?.title}
            upsellProductsBgColor={upsellProducts?.cartUpsellProductsBgColor}
            upsellProductItems={upsellProducts?.cartUpsellProducts}
            endTime={upsellProducts?.endTime}
            isCartUpsell={true}
          />
        )}
      </div>
    );
  },
);

MainCartSection.displayName = "MainCartSection";

export default MainCartSection;
