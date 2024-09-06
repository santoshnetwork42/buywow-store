import Quantity from "@/components/common/Quantity";
import { Button, Heading, Img, Text } from "@/components/elements";
import ProductPricing from "@/components/partials/MyCart/CartProductList/ProductPricing";
import VariantSelector from "@/components/partials/Others/VariantSelector";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import { getUpdatedCart, toDecimal } from "@/utils/helpers";
import { getProductInventory, useProductVariantGroups } from "@wow-star/utils";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductImage = React.memo(({ slug, outOfStock, imageKey }) => (
  <Link
    prefetch
    href={outOfStock ? "#" : `/product/${slug}`}
    className={`relative flex aspect-[65/77] h-fit w-16 shrink-0 overflow-hidden rounded-lg bg-lime-50 sm:w-20 sm:p-1 md:aspect-square md:w-24 md:p-1.5 lg:w-28 lg:p-2 xl:w-32 ${
      outOfStock ? "cursor-auto" : ""
    }`}
  >
    {outOfStock && (
      <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black-900/55">
        <Heading
          size="2xl"
          as="h2"
          className="text-center text-white-a700"
          responsive
        >
          Out Of Stock
        </Heading>
      </div>
    )}
    <ProductThumbnail
      width={300}
      height={300}
      imageKey={imageKey}
      className="aspect-[65/77] h-auto w-full object-contain md:aspect-square"
      alt="Product Image"
    />
  </Link>
));

ProductImage.displayName = "ProductImage";

const ProductDetails = React.memo(
  ({
    title,
    slug,
    hasInventory,
    currentInventory,
    isFreeProduct,
    quantity,
  }) => (
    <Link prefetch href={`/product/${slug}`} className="flex flex-col gap-1">
      <Heading size="base" as="h4" className="line-clamp-3" responsive>
        {title}
      </Heading>
      {hasInventory && currentInventory < 10 && (
        <Text size="sm" as="p" className="line-clamp-2 text-red-600" responsive>
          Only {currentInventory} left!
        </Text>
      )}
      {isFreeProduct && quantity > 0 && (
        <Text
          size="sm"
          as="p"
          className="text-grey lh-1 text-alignment mb-2"
          responsive
        >
          Qty: {quantity}
        </Text>
      )}
    </Link>
  ),
);

ProductDetails.displayName = "ProductDetails";

const RemoveButton = React.memo(({ onRemove }) => (
  <Button
    className="h-full min-h-6 rounded-md border bg-transparent px-2 sm:min-h-7 lg:min-h-8 lg:px-2.5"
    onClick={onRemove}
    enableRipple={false}
  >
    <div className="aspect-[10/14] w-2.5 md:w-3">
      <Img
        src="img_remove.svg"
        width={10}
        height={14}
        className="aspect-[10/14] h-auto w-full object-contain"
        isStatic
      />
    </div>
  </Button>
));

RemoveButton.displayName = "RemoveButton";

const ProductItemSkeleton = React.memo(() => (
  <div className="grid animate-pulse grid-cols-[1fr,25%] gap-5 border-b py-4">
    <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
      <div className="h-20 w-16 rounded-lg bg-gray-200 sm:w-20 md:w-24 lg:w-28 xl:w-32"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="h-8 w-1/3 rounded bg-gray-200"></div>
      </div>
    </div>
    <div className="w-full">
      <div className="h-6 w-1/2 rounded bg-gray-200"></div>
    </div>
  </div>
));

ProductItemSkeleton.displayName = "ProductItemSkeleton";

const ProductItem = React.memo(({ item, inventory = 99, inventoryMapping }) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart?.data || []);

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
    thumbImage,
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
  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(item, variantId),
    [item, variantId],
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

  const changeQuantity = useCallback(
    (newQuantity) => {
      if (!item) return;

      const finalQuantity = newQuantity + extraQuantity;

      if (finalQuantity >= 1) {
        const updatedCart = getUpdatedCart(cartList, recordKey, {
          qty: finalQuantity,
        });
        dispatch({
          type: cartSagaActions.UPDATE_CART,
          payload: { data: updatedCart },
        });
      } else {
        const actionType =
          item.cartItemSource === "COUPON"
            ? cartSagaActions.REMOVE_COUPON
            : cartSagaActions.REMOVE_FROM_CART;
        dispatch({
          type: actionType,
          payload:
            actionType === cartSagaActions.REMOVE_FROM_CART
              ? { product: item }
              : undefined,
        });
      }
    },
    [cartList, dispatch, extraQuantity, item, recordKey],
  );

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
        dispatch({
          type: cartSagaActions.UPDATE_CART,
          payload: { data: updatedCart },
        });
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
        dispatch({
          type: cartSagaActions.UPDATE_CART,
          payload: { data: updatedCart },
        });
        dispatch({
          type: cartSagaActions.REMOVE_FROM_CART,
          payload: { product: item },
        });
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
      !variantId || (variantId && variantGroup?.length > 0);

    setIsLoading(!(hasRequiredFields && hasValidVariant));
  }, [item, price, variantId, variantGroup]);

  if (!item) return null;
  if (isLoading) return <ProductItemSkeleton />;

  return (
    <div className="grid grid-cols-[1fr,25%] gap-5 border-b py-4">
      <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
        <ProductImage
          slug={slug}
          outOfStock={outOfStock}
          imageKey={thumbImage}
        />

        <div className="flex flex-1 flex-col justify-between gap-2">
          <ProductDetails
            title={title}
            slug={slug}
            hasInventory={hasInventory}
            currentInventory={currentInventory}
            isFreeProduct={isFreeProduct}
            quantity={quantity}
          />
          <div className="flex flex-col gap-1">
            <VariantSelector
              variantGroup={variantGroup}
              selectedVariantGroupOptions={selectedVariantGroupOptions}
              handleOnChangeVariant={handleOnChangeVariant}
              isFreeProduct={isFreeProduct}
              disableChange={disableChange}
            />
            <div className="flex items-center gap-2">
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
                  onChangeQuantity={changeQuantity}
                  className="grid-cols-[repeat(3,28px)] sm:grid-cols-[repeat(3,32px)] md:h-7 lg:h-8"
                />
              )}
              <RemoveButton onRemove={() => changeQuantity(0)} />
            </div>
            {(selectedVariant?.minimumOrderQuantity > 1 ||
              itemMinOrderQuantity > 1) && (
              <Text as="span" size="xs" className="font-light">
                Minimum Order Quantity:{" "}
                {selectedVariant?.minimumOrderQuantity || itemMinOrderQuantity}
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <ProductPricing
          price={price}
          listingPrice={listingPrice}
          cartItemType={cartItemType}
          slug={slug}
        />
      </div>
    </div>
  );
});

ProductItem.displayName = "ProductItem";

const CartProductList = React.memo(
  ({ cartItems, totalItems, subtotal, inventoryMapping }) => {
    if (!cartItems || !Array.isArray(cartItems)) return null;

    return (
      <div className="w-full">
        <div className="grid grid-cols-[1fr,25%] items-center gap-5 border-b border-t py-2">
          <Text
            size="sm"
            as="p"
            className="pl-5 uppercase text-blue_gray-400 md:pl-6"
            responsive
          >
            PRODUCT
          </Text>
          <Text
            size="sm"
            as="p"
            className="uppercase text-blue_gray-400"
            responsive
          >
            PRICE
          </Text>
        </div>
        {cartItems.map((item, index) => (
          <ProductItem
            item={item}
            key={`cart-item-${index}-${item?.id}`}
            inventory={(inventoryMapping || {})[item?.recordKey]}
            inventoryMapping={inventoryMapping}
          />
        ))}
        <div className="grid grid-cols-[1fr,25%] items-center gap-5 py-2 sm:py-3 lg:py-4">
          <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
            <div className="w-16 sm:w-20 md:w-24 md:p-1.5 lg:w-28 xl:w-32"></div>
            <Heading
              size="base"
              as="h4"
              className="text-sm font-semibold"
              responsive
            >
              {toDecimal(totalItems, 0)} Items
            </Heading>
          </div>
          <Heading
            size="base"
            as="h4"
            className="text-sm font-semibold"
            responsive
          >
            ₹{toDecimal(subtotal)}
          </Heading>
        </div>
      </div>
    );
  },
);

CartProductList.displayName = "CartProductList";

export default CartProductList;
