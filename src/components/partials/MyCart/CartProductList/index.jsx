import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Heading, Img, Text } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import Quantity from "@/components/common/Quantity";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import {
  getOfferValueWithPercentage,
  getUpdatedCart,
  toDecimal,
} from "@/utils/helpers";
import {
  getProductInventory,
  useProduct,
  useProductVariantGroups,
} from "@wow-star/utils";
import Link from "next/link";

const ProductItem = React.memo(({ item, inventory = 99 }) => {
  const dispatch = useDispatch();

  const {
    id,
    variants,
    recordKey,
    qty: quantity = 1,
    slug,
    images,
    thumbImage,
    title = "",
    price = 0,
    listingPrice = 0,
    variantId,
    cartItemType,
    extraQty: extraQuantity = 0,
    disableChange = false,
    hideRemove = false,
    couponMessage,
    ltoProduct,
    ltoDeal,
    cartItemSource,
    itemKey,
  } = item ?? {};

  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(item, variantId);

  const [selectedVariantGroupOptions, setSelectedVariantGroupOptions] =
    useState([]);
  const [variantUpdate, setVariantUpdate] = useState(false);

  const cartList = useSelector((state) => state?.cart?.data || []);

  const handleOnChangeVariant = (v1, v2) => {
    onVariantChange(v1, v2);
  };

  useEffect(() => {
    if (selectedVariant && variantUpdate) {
      const {
        id: selectedId,
        listingPrice,
        price,
        minimumOrderQuantity,
        maximumOrderQuantity,
      } = selectedVariant;
      const newRecordKey = `${id}-${selectedId}`;
      const cartItem = cartList.find((item) => item.recordKey === newRecordKey);

      if (!cartItem) {
        const updatedCart = getUpdatedCart(cartList, recordKey, {
          qty: minimumOrderQuantity || 1,
          recordKey: newRecordKey,
          listingPrice: listingPrice,
          price: price,
          variantId: selectedId,
        });
        dispatch({
          type: cartSagaActions.UPDATE_CART,
          payload: { data: updatedCart },
        });
      } else {
        let finalQuantity = cartItem.qty + quantity;
        if (maximumOrderQuantity) {
          finalQuantity =
            cartItem.qty + quantity <= maximumOrderQuantity
              ? cartItem.qty + quantity
              : maximumOrderQuantity;
        }

        const updatedCart = getUpdatedCart(cartList, cartItem.recordKey, {
          qty: finalQuantity,
          listingPrice: listingPrice,
          price: price,
          variantId: selectedId,
        });
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
  }, [
    selectedVariant,
    variantUpdate,
    cartList,
    dispatch,
    id,
    item,
    quantity,
    recordKey,
  ]);

  useEffect(() => {
    if (selectedVariant && variantGroup) {
      const { productVariantOptionIds } = selectedVariant;
      const finalGroup = productVariantOptionIds?.reduce((result, v1Item) => {
        const v2Item = variantGroup.find(
          (item) => item.id === v1Item.variantGroupId,
        );
        if (v2Item) {
          const option = v2Item.variantOptions.find(
            (option) => option.id === v1Item.variantGroupOptionId,
          );
          if (option) {
            result.push({
              variantGroupId: v1Item.variantGroupId,
              variantGroupOptionId: v1Item.variantGroupOptionId,
              label: option.label,
            });
          }
        }
        return result;
      }, []);
      setSelectedVariantGroupOptions([...(finalGroup || [])]);
    }
  }, [variantGroup, selectedVariant]);

  const minimumOrderQuantityMessage =
    selectedVariant?.minimumOrderQuantity || item?.minimumOrderQuantity;

  const showStrikePrice = listingPrice && price < listingPrice;

  const isFreeProduct =
    cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT";

  const outOfStock = quantity > inventory;

  const totalItemQuantity = useMemo(
    () =>
      item && cartList
        ? cartList.find((item) => item.recordKey === recordKey)?.qty || 0
        : 0,
    [item, cartList, recordKey],
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
        item.cartItemSource === "COUPON"
          ? dispatch({ type: cartSagaActions.REMOVE_COUPON })
          : dispatch({
              type: cartSagaActions.REMOVE_FROM_CART,
              payload: { product: item },
            });
      }
    },
    [cartList, extraQuantity, item, recordKey, dispatch],
  );

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(item, variantId),
    [variantId, item],
  );

  const discountPercentage = useMemo(() => {
    return getOfferValueWithPercentage(price, listingPrice);
  }, [price, listingPrice]);

  const handleRemoveFromCart = useCallback(() => {
    changeQuantity(0);
  }, [changeQuantity]);

  if (!item) return null;

  return (
    <div className="grid grid-cols-[1fr,25%] gap-5 border-b py-4">
      <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
        <Link
          href={!!outOfStock ? "#" : `/product/${slug}`}
          className={`relative flex aspect-[65/77] h-fit w-16 shrink-0 overflow-hidden rounded-lg bg-lime-50 sm:w-20 sm:p-1 md:aspect-square md:w-24 md:p-1.5 lg:w-28 lg:p-2 xl:w-32 ${!!outOfStock ? "cursor-auto" : ""}`}
        >
          {!!outOfStock && (
            <div class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black-900/55">
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
            fetchedProduct={item}
            className="aspect-[65/77] h-auto w-full object-contain md:aspect-square"
            isStatic
            alt="Product Image"
          />
        </Link>

        <div className="flex flex-col justify-between gap-2">
          <Link href={`/product/${slug}`} className="flex flex-col gap-1">
            <Heading size="base" as="h4" className="line-clamp-3" responsive>
              {title}
            </Heading>
            {hasInventory && currentInventory < 10 && (
              <Text
                size="sm"
                as="p"
                className="line-clamp-2 text-red-600"
                responsive
              >
                Only {currentInventory} left!
              </Text>
            )}
            {isFreeProduct && !!quantity && (
              <Text
                size="sm"
                as="p"
                className="text-grey lh-1 text-alignment mb-2"
                responsive
              >
                Qty:{quantity}
              </Text>
            )}
          </Link>
          <div className="flex flex-col gap-1">
            {!isFreeProduct &&
              !!variantGroup &&
              variantGroup.length > 0 &&
              !disableChange && (
                <>
                  {variantGroup.map((v1, index) => {
                    const selectedOptionValue =
                      selectedVariantGroupOptions?.find(
                        (item) => item.variantGroupId === v1.id,
                      )?.variantGroupOptionId ??
                      selectedVariantGroupOptions[index]?.variantGroupOptionId;
                    return (
                      <div className="card-margin-bottom" key={v1.id}>
                        <select
                          name={`${v1.id}`}
                          className="form-control-drop-down"
                          value={`${selectedOptionValue}`}
                          onChange={(e) => {
                            setVariantUpdate(true);
                            handleOnChangeVariant(v1.id, e.target.value);
                          }}
                        >
                          {v1.variantOptions.map((v) => {
                            return v.active ? (
                              <option key={v.id} value={v.id}>
                                {v.label}
                              </option>
                            ) : null;
                          })}
                        </select>
                      </div>
                    );
                  })}
                </>
              )}
            <div className="flex items-center">
              {!outOfStock && !isFreeProduct && !disableChange && (
                <Quantity
                  product={item}
                  minimumOrderQuantity={
                    selectedVariant?.minimumOrderQuantity ||
                    item?.minimumOrderQuantity
                  }
                  maximumOrderQuantity={
                    selectedVariant?.maximumOrderQuantity ||
                    item?.maximumOrderQuantity
                  }
                  totalItemQuantity={totalItemQuantity}
                  quantity={quantity}
                  max={inventory}
                  onChangeQuantity={changeQuantity}
                  className="grid-cols-[repeat(3,28px)] sm:grid-cols-[repeat(3,32px)] md:h-7 lg:h-8"
                />
              )}

              <Button
                className="ml-2 h-full min-h-6 rounded-md border bg-transparent px-2 sm:min-h-7 lg:min-h-8 lg:px-2.5"
                onClick={handleRemoveFromCart}
                enableRipple={false}
              >
                <div className="aspect-[10/14] w-2.5 md:w-3">
                  <Img
                    src="img_thumbs_up.svg"
                    width={10}
                    height={14}
                    className="aspect-[10/14] h-auto w-full object-contain"
                  />
                </div>
              </Button>
            </div>
            {minimumOrderQuantityMessage &&
              (selectedVariant?.minimumOrderQuantity > 1 ||
                item?.minimumOrderQuantity > 1) && (
                <Text as="span" size="xs" className="font-light">
                  Minimum Order Quantity: {minimumOrderQuantityMessage}
                </Text>
              )}
          </div>
        </div>
      </div>

      <div className="w-full">
        {cartItemType !== "AUTO_FREE_PRODUCT_DISABLED" &&
          (cartItemType === "FREE_PRODUCT" ||
          cartItemType === "AUTO_FREE_PRODUCT" ? (
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
              {!!price && (
                <Text as="span" size="sm" className="line-through" responsive>
                  {slug === "gift" ? "" : `₹${toDecimal(price)}`}
                </Text>
              )}
              <Text
                size="sm"
                as="p"
                className="h-fit w-fit rounded-md bg-green-600 px-2 py-0.5 text-white-a700_01"
                responsive
              >
                Free
              </Text>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Heading as="h4" size="base" className="text-sm" responsive>
                  ₹{toDecimal(price)}
                </Heading>
                {showStrikePrice && (
                  <Text as="span" size="sm" className="line-through" responsive>
                    ₹{toDecimal(listingPrice)}
                  </Text>
                )}
              </div>
              {!!discountPercentage && (
                <Text
                  size="sm"
                  as="p"
                  className="w-fit rounded-md bg-lime-50 px-2 py-0.5"
                  responsive
                >
                  {discountPercentage}% Off
                </Text>
              )}
            </div>
          ))}
      </div>
    </div>
  );
});

ProductItem.displayName = "ProductItem";

const CartProductList = ({
  cartItems,
  totalItems,
  subtotal,
  inventoryMapping,
}) => {
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
      {cartItems.map((item) => (
        <ProductItem
          item={item}
          key={item.id}
          inventory={(inventoryMapping || {})[item?.recordKey]}
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
            {totalItems} Items
          </Heading>
        </div>
        <Heading
          size="base"
          as="h4"
          className="text-sm font-semibold"
          responsive
        >
          ₹{subtotal}
        </Heading>
      </div>
    </div>
  );
};

export default CartProductList;
