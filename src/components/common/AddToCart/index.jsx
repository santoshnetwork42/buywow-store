"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import Quantity from "@/components/common/Quantity";
import { Button } from "@/components/elements";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { getRecordKey, getUpdatedCart } from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const AddToCart = ({
  product,
  selectedVariant,
  buttonText,
  buttonSize = "none",
  buttonClassName,
  quantityClassName,
  showGoToCart = false,
  section,
}) => {
  const { addToCart, updateCart, removeFromCart } = useCartDispatch();
  const { handleCartVisibility } = useModalDispatch();
  const cartItems = useSelector((state) => state.cart?.data || []);

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
      <div className="flex h-full gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <div className={`flex ${showGoToCart ? "w-1/3" : "w-auto"}`}>
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
