import DiscountIcon from "@/assets/svg/discountIcon";
import Quantity from "@/components/common/Quantity";
import { Text } from "@/components/elements";
import ProductDetails from "@/components/partials/CartDrawer/MainCartSection/ProductItem//ProductDetails";
import ProductImage from "@/components/partials/CartDrawer/MainCartSection/ProductItem//ProductImage";
import RemoveButton from "@/components/partials/CartDrawer/MainCartSection/ProductItem//RemoveButton";
import ProductItemSkeleton from "@/components/partials/CartDrawer/MainCartSection/ProductItem/ProductItemSkeleton";
import VariantSelector from "@/components/partials/Others/VariantSelector";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
import { getUpdatedCart } from "@/utils/helpers";
import {
  getProductInventory,
  useProductVariantGroups,
} from "@wow-star/utils-cms";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const ProductItem = ({
  item,
  inventory = 99,
  inventoryMapping,
  appliedCoupon,
}) => {
  const cartList = useSelector((state) => state.cart?.data || []);
  const { updateCart, removeCoupon, removeFromCart } = useCartDispatch();
  const isInteractive = useIsInteractive();

  const [isLoading, setIsLoading] = useState(true);

  const {
    id,
    recordKey,
    qty: quantity = 1,
    slug,
    title = "",
    price = 0,
    listingPrice = 0,
    variantId,
    cartItemType,
    cartItemSource,
    thumbImage,
    couponMessage,
    hideRemove,
    isCouponApplied = false,
    extraQty: extraQuantity = 0,
    disableChange = false,
    minimumOrderQuantity: itemMinOrderQuantity,
    maximumOrderQuantity: itemMaxOrderQuantity,
  } = item ?? {};

  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(item, variantId);
  const [selectedVariantGroupOptions, setSelectedVariantGroupOptions] =
    useState([]);
  const [variantUpdate, setVariantUpdate] = useState(false);

  const isFreeProduct =
    cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT";
  const isLTOProduct = cartItemSource === "LIMITED_TIME_DEAL";

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(item, variantId),
    [variantId, item],
  );

  const outOfStock = quantity > inventory;

  const totalItemQuantity = useMemo(
    () =>
      cartList?.find((cartItem) => cartItem.recordKey === recordKey)?.qty || 0,
    [cartList, recordKey],
  );

  const handleOnChangeVariant = useCallback(
    (groupId, optionId) => {
      onVariantChange(groupId, optionId);
      setVariantUpdate(true);
    },
    [onVariantChange],
  );

  const handleChangeQuantity = (newQuantity) => {
    const finalQuantity = newQuantity + extraQuantity;

    if (finalQuantity > 0) {
      const updatedCart = getUpdatedCart(cartList, recordKey, {
        qty: finalQuantity,
      });
      updateCart(updatedCart);
    } else {
      item.cartItemSource === "COUPON" ? removeCoupon() : removeFromCart(item);
    }
  };

  useEffect(() => {
    if (selectedVariant && variantUpdate) {
      const {
        id: selectedId,
        listingPrice: variantListingPrice,
        price: variantPrice,
        minimumOrderQuantity: variantMinOrderQuantity,
        maximumOrderQuantity: variantMaxOrderQuantity,
      } = selectedVariant;

      const newRecordKey = `${id}-${selectedId}`;
      const existingCartItem = cartList.find(
        (item) => item.recordKey === newRecordKey,
      );

      if (!existingCartItem) {
        const updatedCart = getUpdatedCart(cartList, recordKey, {
          qty: variantMinOrderQuantity || 1,
          recordKey: newRecordKey,
          listingPrice: variantListingPrice,
          price: variantPrice,
          variantId: selectedId,
        });
        updateCart(updatedCart);
      } else {
        const isExistingCartItemOutOfStock =
          existingCartItem.qty >=
          (inventoryMapping || {})[existingCartItem?.recordKey];
        const finalQuantity = isExistingCartItemOutOfStock
          ? Math.max(1, (inventoryMapping || {})[existingCartItem?.recordKey])
          : Math.min(
              existingCartItem.qty + quantity,
              variantMaxOrderQuantity || 1,
            );

        const updatedCart = getUpdatedCart(
          cartList,
          existingCartItem.recordKey,
          {
            qty: finalQuantity,
            listingPrice: variantListingPrice,
            price: variantPrice,
            variantId: selectedId,
          },
        );
        updateCart(updatedCart);
        removeFromCart(item);
      }
    }
    setVariantUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);

  useEffect(() => {
    if (selectedVariant && variantGroup) {
      const finalGroup = selectedVariant.productVariantOptionIds?.reduce(
        (result, v1Item) => {
          const v2Item = variantGroup.find(
            (item) => item.id === v1Item.variantGroupId,
          );
          const option = v2Item?.variantOptions.find(
            (option) => option.id === v1Item.variantGroupOptionId,
          );
          if (option) {
            result.push({
              variantGroupId: v1Item.variantGroupId,
              variantGroupOptionId: v1Item.variantGroupOptionId,
              label: option.label,
            });
          }
          return result;
        },
        [],
      );
      setSelectedVariantGroupOptions(finalGroup || []);
    }
  }, [variantGroup, selectedVariant]);

  useEffect(() => {
    const hasRequiredFields = item && price !== undefined;
    const hasValidVariant =
      isFreeProduct || !variantId || (variantId && variantGroup?.length > 0);

    setIsLoading(isInteractive && !(hasRequiredFields && hasValidVariant));

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [item, price, variantId, variantGroup, isFreeProduct, isInteractive]);

  if (!item) return null;
  if (isLoading) return <ProductItemSkeleton />;

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 rounded-lg rounded-b-none border border-b-0 p-2 pl-3 shadow-[0_4px_4px_#0000000D]">
        <ProductImage
          slug={slug}
          outOfStock={outOfStock}
          imageKey={thumbImage}
          isFreeProduct={isFreeProduct}
        />
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-1 justify-between gap-5">
            <ProductDetails
              title={title}
              price={price}
              slug={slug}
              hasInventory={hasInventory}
              appliedCoupon={appliedCoupon}
              listingPrice={listingPrice}
              cartItemType={cartItemType}
              isLTOProduct={isLTOProduct}
              currentInventory={currentInventory}
              isFreeProduct={isFreeProduct}
              quantity={quantity}
              couponMessage={couponMessage}
            />

            {!hideRemove && (
              <RemoveButton onClick={() => handleChangeQuantity(0)} />
            )}
          </div>
          {!isLTOProduct && (
            <div className="flex flex-col justify-between gap-2">
              <div className="flex items-end justify-between gap-1">
                <VariantSelector
                  variantGroup={variantGroup}
                  selectedVariantGroupOptions={selectedVariantGroupOptions}
                  handleOnChangeVariant={handleOnChangeVariant}
                  isFreeProduct={isFreeProduct}
                  disableChange={disableChange}
                  variantClassName="w-fit"
                  className="lg:gap-1"
                />
                <div className="ml-auto flex items-center gap-2">
                  {!outOfStock && !isFreeProduct && !disableChange && (
                    <Quantity
                      product={item}
                      minimumOrderQuantity={
                        selectedVariant?.minimumOrderQuantity ||
                        itemMinOrderQuantity
                      }
                      maximumOrderQuantity={
                        selectedVariant?.maximumOrderQuantity ||
                        itemMaxOrderQuantity
                      }
                      totalItemQuantity={totalItemQuantity}
                      quantity={quantity}
                      max={inventory}
                      onChangeQuantity={handleChangeQuantity}
                      className="grid-cols-[repeat(3,28px)] sm:grid-cols-[repeat(3,32px)] md:h-7 lg:h-8"
                    />
                  )}
                </div>
              </div>

              {(selectedVariant?.minimumOrderQuantity > 1 ||
                itemMinOrderQuantity > 1) && (
                <Text as="span" size="xs" className="font-light">
                  Minimum Order Quantity:{" "}
                  {selectedVariant?.minimumOrderQuantity ||
                    itemMinOrderQuantity}
                </Text>
              )}
            </div>
          )}
        </div>
      </div>

      {!!appliedCoupon && !!appliedCoupon?.code && isCouponApplied && (
        <Text
          as="span"
          size="xs"
          className="flex w-full items-center justify-center rounded-lg rounded-t-none border border-t-0 bg-green-100_01 py-0.5 font-medium shadow-[0_4px_4px_#0000000D]"
        >
          <DiscountIcon width={20} height={20} color="green" className="mr-2" />
          {`“${appliedCoupon?.code}” applied`}
        </Text>
      )}
    </div>
  );
};

export default React.memo(ProductItem);
