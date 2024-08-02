import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Heading, Img, SelectBox, Text } from "@/components/elements";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import Quantity from "@/components/common/Quantity";
import { cartSagaActions } from "@/store/sagas/sagaActions/cart.actions";
import {
  getOfferValueWithPercentage,
  getUpdatedCart,
  toDecimal,
} from "@/utils/helpers";
import { getProductInventory, useProductVariantGroups } from "@wow-star/utils";
import Link from "next/link";
import { DownArrowIconSVG } from "@/assets/images/downArrow";

const ProductItem = React.memo(({ item, inventory = 99 }) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state?.cart?.data || []);

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

  const discountPercentage = useMemo(
    () => getOfferValueWithPercentage(price, listingPrice),
    [price, listingPrice],
  );

  const showStrikePrice = listingPrice && price < listingPrice;

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
        const finalQuantity = Math.min(
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

  const renderVariantGroups = () => {
    if (
      !variantGroup ||
      variantGroup.length === 0 ||
      isFreeProduct ||
      disableChange
    )
      return null;

    return (
      <div className="flex flex-wrap gap-2">
        {variantGroup.map((group) => {
          const options = group.variantOptions
            .filter((option) => option.active)
            .map((option) => ({
              value: option.id,
              label: option.label,
            }));

          const selectedOption =
            options.find(
              (option) =>
                option.value ===
                selectedVariantGroupOptions.find(
                  (item) => item.variantGroupId === group.id,
                )?.variantGroupOptionId,
            ) || options[0];

          return (
            <div
              key={group.id}
              className="w-[calc(50%-4px)] min-w-[80px] md:min-w-[120px]"
            >
              <SelectBox
                indicator={
                  <DownArrowIconSVG
                    strokeWidth={1.25}
                    width={14}
                    height={14}
                    className="w-3 md:ml-2 md:w-[14px]"
                  />
                }
                name={`${group.id}`}
                value={selectedOption}
                options={options}
                onChange={(selectedOption) =>
                  handleOnChangeVariant(group.id, selectedOption.value)
                }
                className="flex flex-grow !cursor-pointer rounded-sm border border-black-900 px-0.5 py-1 text-sm font-medium md:px-1"
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    minWidth: "120px",
                    width: "max-content",
                    left: "0px",
                    "@media (max-width: 576px)": {
                      minWidth: "100px",
                    },
                  }),
                  option: (provided) => ({
                    ...provided,
                    fontSize: "14px",
                    padding: "8px 12px",
                    "@media (max-width: 768px)": {
                      fontSize: "12px",
                      padding: "6px 10px",
                    },
                  }),
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "transparent",
                    border: "0 !important",
                    boxShadow: "0 !important",
                    minHeight: "auto",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                    "&:hover": {
                      border: "0 !important",
                    },
                    "@media (max-width: 768px)": {
                      fontSize: "12px",
                    },
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    padding: "0px",
                  }),
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderPricing = () => {
    if (cartItemType === "AUTO_FREE_PRODUCT_DISABLED") return null;

    if (isFreeProduct) {
      return (
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
          {price > 0 && slug !== "gift" && (
            <Text as="span" size="sm" className="line-through" responsive>
              ₹{toDecimal(price)}
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
      );
    }

    return (
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
        {discountPercentage > 0 && (
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
    );
  };

  if (!item) return null;

  return (
    <div className="grid grid-cols-[1fr,25%] gap-5 border-b py-4">
      <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10">
        <Link
          href={outOfStock ? "#" : `/product/${slug}`}
          className={`relative flex aspect-[65/77] h-fit w-16 shrink-0 overflow-hidden rounded-lg bg-lime-50 sm:w-20 sm:p-1 md:aspect-square md:w-24 md:p-1.5 lg:w-28 lg:p-2 xl:w-32 ${outOfStock ? "cursor-auto" : ""}`}
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
          <div className="flex flex-col gap-1">
            {renderVariantGroups()}
            <div className="flex items-center">
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
              <Button
                className="ml-2 h-full min-h-6 rounded-md border bg-transparent px-2 sm:min-h-7 lg:min-h-8 lg:px-2.5"
                onClick={() => changeQuantity(0)}
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

      <div className="w-full">{renderPricing()}</div>
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
