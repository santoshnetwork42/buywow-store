"use client";

import PendingLockIcon from "@/assets/svg/pendingLockIcon";
import TagIcon from "@/assets/svg/tagIcon";
import { showToast } from "@/components/common/ToastComponent";
import { Button, Heading, Text } from "@/components/elements";
import ProgressBar from "@/components/features/ProgressBar";
import Slider from "@/components/features/Slider";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import {
  LIMITED_TIME_DEAL_DURATION_IN_MINUTES,
  PREPAID_ENABLED,
} from "@/utils/data/constants";
import {
  getDiscountPercentage,
  getRecordKey,
  toDecimal,
} from "@/utils/helpers";
import { getThumbImage, useCartTotal, useConfiguration } from "@wow-star/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export const LimitedTimeDealProduct = ({
  item,
  addToCart,
  totalAmount,
  ltoProductItem,
}) => {
  const { variantId, product, flatPrice, minOrderValue, maximumOrderQuantity } =
    item;

  const { slug, listingPrice, title, images } = product || {};
  const variant = product?.variants?.items?.find((i) => i.id === variantId);

  //images
  const productImage = getThumbImage(product, variant)?.imageKey || "";

  if (!product?.id) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: flatPrice,
      minimumOrderQuantity: 1,
      maximumOrderQuantity,
      ...(variantId && { title: `${title} - ${variant.title}` }),
      qty: 1,
      cartItemSource: "LIMITED_TIME_DEAL",
      recordKey: getRecordKey(item.product, item.variantId, true), //(product,variantId,isLtoProduct)
      section: {
        id: "LIMITED_TIME_DEAL".toLowerCase().replace(/\ /g, "-"),
        name: "LIMITED_TIME_DEAL",
      },
    });
    ltoProductItem({
      product: {
        ...product,
        price: flatPrice,
        minimumOrderQuantity: 1,
        maximumOrderQuantity,
      },
      type: "ADD",
    });
  };

  const discount = getDiscountPercentage(flatPrice, listingPrice);

  const isLocked = minOrderValue > totalAmount;

  return (
    <Link
      prefetch={false}
      href={`/product/${slug}`}
      className="relative flex min-h-40 w-full min-w-80 rounded-md bg-white-a700 p-2.5 shadow md:min-w-96 md:p-3"
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex min-h-10 flex-col justify-between">
          <Heading
            as={"p"}
            size="sm"
            className="line-clamp-2 flex items-center gap-x-2 pb-1 tracking-wide text-green-500"
          >
            {isLocked ? (
              <>
                <PendingLockIcon size={22} />
                Shop for ₹{Math.round(minOrderValue - totalAmount, 2)} more to
                unlock limited time deal
              </>
            ) : (
              <>
                <TagIcon size={20} />
                Yay !! Get {discount}% off on this product
              </>
            )}
          </Heading>
          <ProgressBar
            progress={Math.min(
              Math.floor((totalAmount / minOrderValue) * 100),
              100,
            )}
          />
        </div>
        <div className="flex min-h-20">
          <div
            className="flex aspect-[74/80] w-[74px] items-center overflow-hidden rounded"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <ProductThumbnail
              height={100}
              width={200}
              imageKey={productImage}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex justify-between gap-2">
                {" "}
                <Heading
                  as="h4"
                  size="base"
                  className="line-clamp-2 text-sm font-semibold"
                  responsive
                >
                  {title}
                </Heading>
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div className="flex shrink items-center gap-2">
                <Heading as="span" size="lg" className="text-base" responsive>
                  ₹{toDecimal(flatPrice)}
                </Heading>
                {listingPrice > flatPrice && (
                  <Text
                    as="del"
                    size="base"
                    className="text-sm text-gray-500"
                    responsive
                  >
                    ₹{toDecimal(listingPrice)}
                  </Text>
                )}
                {discount > 0 && (
                  <Text
                    size="sm"
                    as="p"
                    className="shrink-0 rounded-md bg-lime-50 p-1"
                    responsive
                  >
                    {discount}% Off
                  </Text>
                )}
              </div>

              <Button
                variant="primary"
                disabled={isLocked}
                className={twMerge(
                  "h-fit shrink-0 rounded-md px-4 py-1.5 text-sm",
                  isLocked ? "" : "",
                )}
                onClick={(e) => {
                  if (!isLocked) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(e);
                  } else {
                    showToast.error(
                      `Shop for ₹${Math.round(minOrderValue - totalAmount, 2)} more  to unlock limited time deal`,
                    );
                  }
                }}
              >
                {isLocked ? "Unlock" : "Add"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
LimitedTimeDealProduct.displayName = "LimitedTimeDealProduct";

const LimitedTimeDealProductSection = ({ ltoProducts, cartItems }) => {
  //timer
  const [timeLeft, setTimeLeft] = useState("");
  const startTime = useSelector((state) => state?.cart?.cartCreatedAt);

  // get cart total
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);

  const { totalAmount } = useCartTotal({
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
    isRewardApplied,
  });

  // events and redux
  const { addToCart, removeFromCart } = useCartDispatch();
  const { ltoProductItem } = useEventsDispatch();
  // Calculate endTime once on startTime change
  const endTime = useMemo(() => {
    if (!startTime) return null;
    return (
      new Date(startTime).getTime() +
      LIMITED_TIME_DEAL_DURATION_IN_MINUTES * 60 * 1000
    );
  }, [startTime]);

  // logic to count for timer
  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = endTime - now;

      if (remainingTime <= 0) {
        clearInterval(timer);
        setTimeLeft("");
      } else {
        // const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setTimeLeft(`${minutes}m : ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // products to show as LTO -> if added in cart -> filter from ltoProducts
  const { notBoughtLTOProducts, boughtLTOProducts } = useMemo(() => {
    if (!ltoProducts || !cartItems)
      return { notBoughtLTOProducts: [], boughtLTOProducts: [] };

    const cartRecordKeys = new Set(
      cartItems.map((cartItem) => cartItem.recordKey),
    );

    return ltoProducts?.reduce(
      (acc, ltoProduct) => {
        const recordKey = getRecordKey(
          ltoProduct.product,
          ltoProduct.variantId,
          true,
        );
        if (cartRecordKeys.has(recordKey)) {
          acc.boughtLTOProducts.push(ltoProduct);
        } else {
          acc.notBoughtLTOProducts.push(ltoProduct);
        }
        return acc;
      },
      { notBoughtLTOProducts: [], boughtLTOProducts: [] },
    );
  }, [ltoProducts, cartItems]);

  const totalAmountWithoutLTOProducts = useMemo(() => {
    if (!ltoProducts || !cartItems) return totalAmount;

    const cartRecordKeys = new Set(
      cartItems.map((cartItem) => cartItem.recordKey),
    );

    return ltoProducts
      .filter((ltoProduct) =>
        cartRecordKeys.has(
          getRecordKey(ltoProduct.product, ltoProduct.variantId, true),
        ),
      )
      .reduce((acc, item) => acc - item.flatPrice, totalAmount);
  }, [cartItems]);

  useEffect(() => {
    if (!boughtLTOProducts?.length) return;

    boughtLTOProducts?.forEach((lto) => {
      const {
        minOrderValue,
        product,
        flatPrice,
        maximumOrderQuantity,
        variantId,
      } = lto;
      if (minOrderValue > totalAmountWithoutLTOProducts) {
        const recordKey = getRecordKey(product, variantId, true);
        removeFromCart({
          ...product,
          price: flatPrice,
          minimumOrderQuantity: 1,
          maximumOrderQuantity,
          cartItemSource: "LIMITED_TIME_DEAL",
          recordKey: recordKey,
        });
        ltoProductItem({
          product: {
            ...product,
            price: flatPrice,
            minimumOrderQuantity: 1,
            maximumOrderQuantity,
          },
          type: "REMOVE",
        });
      }
    });
  }, [boughtLTOProducts, totalAmountWithoutLTOProducts]);

  // if no lto products or timer off
  if (!notBoughtLTOProducts?.length || !timeLeft) return null;

  return (
    <div
      className={twMerge(
        "mb-6 flex flex-col justify-center px-3 max-sm:[clipPath:inset(0_-100vmax)] sm:rounded-lg md:mb-7 md:px-4",
        "bg-lime-50 py-3 max-sm:shadow-[0_0_0_100vmax_#FBFBF5]",
        "!mb-0 rounded-lg shadow-[0_4px_4px_#0000000D]",
        "mb-1 md:mb-2",
        "px-3! gap-2 md:gap-3",
      )}
    >
      {
        <Heading
          size={"base"}
          as="h4"
          className={twMerge("line-clamp-2 w-fit", "text-sm")}
          responsive
        >
          <span className={`mb-1`}>{"Limited Time Deal"}</span>
          {!!timeLeft && (
            <span className="ml-0.5 text-sm font-bold text-yellow-900 lg:text-base">
              {" "}
              {timeLeft}
            </span>
          )}
        </Heading>
      }
      <Slider
        sliderClassName="gap-2 lg:gap-3 lg:mb-4 flex"
        className=""
        size={"small"}
      >
        {notBoughtLTOProducts.map((item, index) => (
          <LimitedTimeDealProduct
            key={`product-${item.slug}-${index}`}
            item={item}
            addToCart={addToCart}
            ltoProductItem={ltoProductItem}
            totalAmount={totalAmountWithoutLTOProducts}
          />
        ))}
      </Slider>
    </div>
  );
};

export default LimitedTimeDealProductSection;
