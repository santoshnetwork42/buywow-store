"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import Quantity from "@/components/common/Quantity";
import { Button } from "@/components/elements";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import {
  getRecordKey,
  getUpdatedCart,
  sortCouponBasedOnQuantity,
} from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useConfiguration, useCoupons } from "@wow-star/utils-cms";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { BUNDLE_ADD_TO_CART_ENABLED } from "@/utils/data/wowStarConstants";

const AddToCart = ({
  product,
  selectedVariant,
  buttonText,
  buttonSize = "none",
  buttonClassName,
  quantityClassName,
  showGoToCart = false,
  section,
  isWhatsappOrderButtonVisible = false,
  showGoToCartClassName,
  collectionSlug = "",
}) => {
  const { addToCart, updateCart, removeFromCart } = useCartDispatch();
  const { addToCartEvent } = useEventsDispatch();
  const { handleCartVisibility } = useModalDispatch();
  const cartItems = useSelector((state) => state.cart?.data || []);

  const isBundleAddToCartEnabled = useConfiguration(
    BUNDLE_ADD_TO_CART_ENABLED,
    false,
  );

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const hasHandledAddToCart = useRef(false);

  useEffect(() => {
    const addToCartViaLPPages = () => {
      const removeQueryParam = (param = "add_to_cart") => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete(param);
        router.replace(`${pathname}?${newParams.toString()}`);
      };

      try {
        if (!product) return;

        const shouldAddToCart =
          searchParams.get("add_to_cart") === "1" &&
          `/products/${product?.slug}` === pathname;

        if (shouldAddToCart && !!product?.id && !hasHandledAddToCart.current) {
          addToCart({
            ...product,
            qty: product.minimumOrderQuantity || 1,
            variantId: selectedVariant?.id,
            section: {
              id: section?.name ?? "pdp_page",
              name: section?.name ?? "pdp_page",
              tabValue: section?.tabValue ?? "pdp_page",
            },
          });
          hasHandledAddToCart.current = true;
          removeQueryParam();
        }
      } catch (e) {
        console.error(e);
        removeQueryParam();
      }
    };
    addToCartViaLPPages();
  }, [searchParams, product, selectedVariant, pathname, router]);

  //######### BUNDLE ADD TO CART EVENT LOGIC
  const calculateCouponQuantity = (coupon) => {
    if (!coupon) return 0;
    const { couponType, buyXQuantity = 1, getYQuantity = 0 } = coupon;

    if (couponType === "BUY_X_AT_Y") {
      return buyXQuantity;
    } else if (couponType === "BUY_X_GET_Y") {
      return buyXQuantity + getYQuantity;
    }
    return 0;
  };

  const topCoupons = useCoupons() || [];
  const storedCouponCode =
    useSelector((state) => state.cart?.storedCouponCode) || "";

  const storedCoupon = useMemo(() => {
    if (!storedCouponCode || !topCoupons.length) return null;
    return topCoupons.find((coupon) => coupon?.code === storedCouponCode);
  }, [topCoupons, storedCouponCode]);

  const associatedBundleCoupons = useMemo(() => {
    if (!collectionSlug || !topCoupons.length) return [];

    const bundleTypes = new Set(["BUY_X_AT_Y", "BUY_X_GET_Y"]);

    const filteredCoupons = topCoupons.filter(
      (coupon) =>
        bundleTypes.has(coupon?.couponType) &&
        (coupon?.applicableCollections || []).includes(collectionSlug) &&
        coupon?.code !== storedCouponCode &&
        !!coupon?.isBundleOffer,
    );
    return sortCouponBasedOnQuantity(filteredCoupons);
  }, [collectionSlug, topCoupons, storedCouponCode]);

  const targetQtyToFireEvent = useMemo(() => {
    const totalCartItems = cartItems?.reduce((acc, item) => {
      return acc + Number(item?.qty ?? 0);
    }, 0);

    if (!!storedCoupon?.isBundleOffer) {
      return calculateCouponQuantity(storedCoupon);
    } else if (!!associatedBundleCoupons.length) {
      // Find the first coupon that meets the cart quantity requirement
      const nextCoupon = associatedBundleCoupons.find(
        (coupon) => calculateCouponQuantity(coupon) >= totalCartItems,
      );
      return nextCoupon ? calculateCouponQuantity(nextCoupon) : totalCartItems;
    }
    return 0;
  }, [associatedBundleCoupons, storedCoupon, cartItems]);

  //################################

  const addToCartEventHandler = useCallback(
    (product) => {
      if (!product) return;

      // const totalCartItems = [...(cartItems || []), product]?.reduce(
      //   (acc, item) => {
      //     return acc + Number(item?.qty ?? 0);
      //   },
      //   0,
      // );

      if (isBundleAddToCartEnabled || !targetQtyToFireEvent || !collectionSlug)
        addToCartEvent({
          ...product,
          qty: product.minimumOrderQuantity || 1,
          variantId: selectedVariant?.id,
          // isBundleOffer: targetQtyToFireEvent === totalCartItems,
          section: {
            id: section?.name ?? "pdp_page",
            name: section?.name ?? "pdp_page",
            tabValue: section?.tabValue ?? "pdp_page",
          },
        });
    },
    [
      product,
      selectedVariant,
      storedCoupon,
      collectionSlug,
      targetQtyToFireEvent,
      cartItems,
      isBundleAddToCartEnabled,
    ],
  );

  const addToCartHandler = useCallback(() => {
    if (!product) return;
    addToCart({
      ...product,
      qty: product.minimumOrderQuantity || 1,
      variantId: selectedVariant?.id,
      section: {
        id: section?.name ?? "pdp_page",
        name: section?.name ?? "pdp_page",
        tabValue: section?.tabValue ?? "pdp_page",
      },
    });
    if (isWhatsappOrderButtonVisible) handleCartVisibility(true);

    addToCartEventHandler({
      ...product,
      qty: product.minimumOrderQuantity || 1,
      variantId: selectedVariant?.id,
      section: {
        id: section?.name ?? "pdp_page",
        name: section?.name ?? "pdp_page",
        tabValue: section?.tabValue ?? "pdp_page",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, selectedVariant]);

  const cartItem = useMemo(() => {
    if (!cartItems.length || !product) return null;

    const recordKey = getRecordKey(product, selectedVariant?.id);
    return cartItems.find((item) => item.recordKey === recordKey);
  }, [cartItems, product, selectedVariant]);

  const changeQuantity = useCallback(
    (newQuantity) => {
      if (!cartItem || !product) return;

      if (newQuantity >= 1) {
        const recordKey = getRecordKey(product, selectedVariant?.id);
        const updatedCart = getUpdatedCart(cartItems, recordKey, {
          qty: newQuantity,
        });

        updateCart(updatedCart);
      } else {
        removeFromCart(cartItem);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItem, cartItems, product, selectedVariant?.id],
  );

  const minimumOrderQuantity =
    selectedVariant?.minimumOrderQuantity || product?.minimumOrderQuantity || 1;

  const maximumOrderQuantity =
    selectedVariant?.maximumOrderQuantity ||
    product?.maximumOrderQuantity ||
    99;

  const totalItemQuantity = cartItem?.qty || minimumOrderQuantity;

  if (!product) return null;

  if (!product.hasInventory) {
    return (
      <Button
        variant="primary"
        size={buttonSize}
        className={twMerge(
          buttonClassName,
          "bg-gray-400 px-2 text-white-a700 opacity-100",
        )}
        disabled
      >
        Sold Out
      </Button>
    );
  }

  if (cartItem) {
    return (
      <div
        className={`flex h-full gap-2 sm:gap-3 md:gap-4 lg:gap-5 ${showGoToCartClassName}`}
      >
        <div className={`flex ${showGoToCart ? "w-1/3" : "w-full"} `}>
          <Quantity
            product={product}
            max={product.currentInventory}
            quantity={cartItem.qty}
            minimumOrderQuantity={minimumOrderQuantity}
            maximumOrderQuantity={maximumOrderQuantity}
            totalItemQuantity={totalItemQuantity}
            onChangeQuantity={changeQuantity}
            className={quantityClassName}
          />
        </div>
        {!!showGoToCart && (
          <Button
            variant="primary"
            size={buttonSize}
            className={twMerge(buttonClassName, "w-auto flex-1")}
            onClick={() => handleCartVisibility(true)}
          >
            Go to cart
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size={buttonSize}
      className={buttonClassName}
      onClick={addToCartHandler}
      disabled={!product.isAtcEnabled}
    >
      {buttonText}
    </Button>
  );
};

export default AddToCart;
