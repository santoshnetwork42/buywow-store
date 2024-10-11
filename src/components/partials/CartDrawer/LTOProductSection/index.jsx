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
  const {
    variantId,
    product,
    flatPrice,
    minOrderValue,
    maximumOrderQuantity,
    minimumOrderQuantity,
    link = "#",
  } = item;

  const { slug, listingPrice, title } = product || {};
  const variant = product?.variants?.items?.find((i) => i.id === variantId);

  //images
  const productImage = getThumbImage(product, variant)?.imageKey || "";

  if (!product?.id) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: flatPrice,
      qty: minimumOrderQuantity || 1,
      variantId,
      minimumOrderQuantity: minimumOrderQuantity || 1,
      maximumOrderQuantity,
      ...(variantId && { title: `${title} - ${variant.title}` }),
      cartItemSource: "LIMITED_TIME_DEAL",
      cartItemType: "LIMITED_TIME_DEAL",
      recordKey: getRecordKey(product, variantId, true), //(product,variantId,isLtoProduct)
      section: {
        id: "LIMITED_TIME_DEAL".toLowerCase().replace(/\ /g, "-"),
        name: "LIMITED_TIME_DEAL",
      },
    });
    ltoProductItem(
      {
        ...product,
        variantId,
        qty: minimumOrderQuantity || 1,
        price: flatPrice,
        minimumOrderQuantity: minimumOrderQuantity || 1,
        maximumOrderQuantity,
      },
      "ADD",
    );
  };

  const discount = getDiscountPercentage(flatPrice, listingPrice);
  const isLocked = minOrderValue > totalAmount;
  const flatPriceDecimal = toDecimal(flatPrice);

  return (
    <Link
      prefetch={false}
      href={`/product/${slug}`}
      className="relative flex min-h-40 w-full min-w-80 rounded-md bg-white-a700 p-2.5 shadow md:min-w-96 md:p-3"
    >
      <div className="flex grow flex-col gap-y-2">
        <div className="flex min-h-10 flex-col justify-between">
          <Heading
            as={"p"}
            size="sm"
            className="line-clamp-2 flex items-center gap-x-2 pb-1 !normal-case tracking-wide"
          >
            {isLocked ? (
              <>
                <PendingLockIcon size={22} />
                <div>
                  Shop for{" "}
                  <span className="inline font-extrabold">
                    ₹{Math.round(minOrderValue - totalAmount, 2)} more
                  </span>{" "}
                  to unlock special price
                </div>
              </>
            ) : (
              <>
                <TagIcon size={20} />
                <Text className="text-green-500" size="md">
                  Yay! Get {discount}% off on this product
                </Text>
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
                  className="line-clamp-1 text-sm font-semibold"
                  responsive
                >
                  {title}
                </Heading>
              </div>
            </div>
            <div className="flex justify-between gap-10">
              <div className="flex shrink items-center gap-2">
                {!!Number(flatPriceDecimal) && (
                  <>
                    <Heading
                      as="span"
                      size="lg"
                      className="text-base"
                      responsive
                    >
                      ₹{flatPriceDecimal}
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
                  </>
                )}
                {!Number(flatPriceDecimal) && (
                  <>
                    <Heading
                      as="span"
                      size="lg"
                      className="text-base text-green-500"
                      responsive
                    >
                      FREE
                    </Heading>
                  </>
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

              {!isLocked && (
                <Button
                  variant="primary"
                  className={twMerge(
                    "h-fit shrink-0 rounded-md px-4 py-1.5 text-sm",
                    isLocked ? "backdrop-blur-lg backdrop-filter" : "",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(e);
                  }}
                >
                  Add
                </Button>
              )}
              {isLocked && (
                <div className="rounded-md border-2 border-yellow-900 bg-white-a700_01 px-4 py-1.5">
                  <Link prefetch={false} href={link ?? "#"} className="flex">
                    <Text
                      as="span"
                      size="sm"
                      className="flex items-center justify-center gap-2 overflow-hidden text-sm font-medium capitalize !leading-tight text-yellow-900 transition-colors duration-200"
                      responsive
                    >
                      Unlock
                    </Text>
                  </Link>
                </div>
              )}
            </div>
            {minimumOrderQuantity > 1 && (
              <Text as="span" size="xs" className="font-light">
                Minimum Order Quantity: {minimumOrderQuantity}
              </Text>
            )}
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

    const cartRecordKeys = cartItems.map((cartItem) => cartItem.recordKey);

    return ltoProducts?.reduce(
      (acc, ltoProduct) => {
        const recordKey = getRecordKey(
          ltoProduct.product,
          ltoProduct.variantId,
          true,
        );
        if (cartRecordKeys.includes(recordKey)) {
          acc.boughtLTOProducts.push(ltoProduct);
        } else {
          acc.notBoughtLTOProducts.push(ltoProduct);
        }
        return acc;
      },
      { notBoughtLTOProducts: [], boughtLTOProducts: [] },
    );
  }, [ltoProducts, cartItems]);

  const totalCartAmount = useMemo(() => {
    if (!cartItems) return 0;

    // get cart item which don't have limited time deal
    return cartItems?.reduce((acc, cartItem) => {
      if (
        !(
          cartItem.cartItemType === "LIMITED_TIME_DEAL" ||
          cartItem.cartItemType === "FREE_PRODUCT"
        )
      ) {
        acc += cartItem.price * cartItem.qty;
      }
      return acc;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    if (!boughtLTOProducts?.length) return;

    boughtLTOProducts?.forEach((lto) => {
      const {
        minOrderValue,
        product,
        flatPrice,
        minimumOrderQuantity,
        maximumOrderQuantity,
        variantId,
      } = lto;
      if (minOrderValue > totalCartAmount) {
        const recordKey = getRecordKey(product, variantId, true);
        removeFromCart({
          ...product,
          price: flatPrice,
          minimumOrderQuantity: minimumOrderQuantity || 1,
          maximumOrderQuantity,
          cartItemSource: "LIMITED_TIME_DEAL",
          recordKey: recordKey,
        });
        ltoProductItem(
          {
            ...product,
            variantId,
            price: flatPrice,
            minimumOrderQuantity: minimumOrderQuantity || 1,
            maximumOrderQuantity,
          },
          "REMOVE",
        );
      }
    });
  }, [boughtLTOProducts, totalCartAmount]);

  useEffect(() => {
    const autoApplyLTOProducts = notBoughtLTOProducts?.filter(
      (i) => i.autoApply,
    );
    const cartRecordKeys = cartItems.map((cartItem) => cartItem.recordKey);
    autoApplyLTOProducts?.forEach((item) => {
      const {
        variantId,
        product,
        flatPrice,
        minOrderValue,
        maximumOrderQuantity,
        minimumOrderQuantity,
      } = item;

      const { title } = product || {};
      const variant = product?.variants?.items?.find((i) => i.id === variantId);

      const recordKey = getRecordKey(product, variantId, true);
      if (
        minOrderValue < totalCartAmount &&
        !cartRecordKeys.includes(recordKey)
      ) {
        addToCart({
          ...product,
          price: flatPrice,
          qty: minimumOrderQuantity || 1,
          variantId,
          minimumOrderQuantity: minimumOrderQuantity || 1,
          maximumOrderQuantity,
          ...(variantId && { title: `${title} - ${variant.title}` }),
          cartItemSource: "LIMITED_TIME_DEAL",
          cartItemType: "LIMITED_TIME_DEAL",
          recordKey: getRecordKey(product, variantId, true), //(product,variantId,isLtoProduct)
          section: {
            id: "LIMITED_TIME_DEAL".toLowerCase().replace(/\ /g, "-"),
            name: "LIMITED_TIME_DEAL",
          },
        });
        ltoProductItem(
          {
            ...product,
            variantId,
            qty: minimumOrderQuantity || 1,
            price: flatPrice,
            minimumOrderQuantity: minimumOrderQuantity || 1,
            maximumOrderQuantity,
          },
          "ADD",
        );
      }
    });
  }, [totalCartAmount]);
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
            totalAmount={totalCartAmount}
          />
        ))}
      </Slider>
    </div>
  );
};

export default LimitedTimeDealProductSection;
