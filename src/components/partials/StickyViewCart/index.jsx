"use client";

import Nudge from "@/components/common/Nudge";
import { Button, Heading, Img, Text } from "@/components/elements";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useIsInteractive } from "@/utils/context/navbar";
import {
  STICKY_VIEW_CART_TO_SHOW,
  IS_PREPAID_DISCOUNT_TO_SHOW,
  SPIN_THE_WHEEL_CONFIG,
} from "@/utils/data/constants";
import { toDecimal } from "@/utils/helpers";
import useWindowDimensions from "@/utils/helpers/getWindowDimension";
import {
  useCartItems,
  useCartTotal,
  useConfiguration,
} from "@wow-star/utils-cms";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const CartSummary = React.memo(
  ({
    totalItems,
    grandTotal,
    prepaidDiscountPercent,
    prepaidDiscount = 0,
    isMobileFooterToShow,
  }) => {
    if (!totalItems) {
      return <></>;
    }

    return (
      <div className="flex flex-col gap-1">
        <Heading
          size="lg"
          as="h3"
          className={twMerge(
            "text-base",
            isMobileFooterToShow ? "text-white-a700_01" : "",
          )}
          responsive
        >
          {totalItems > 1 ? `${totalItems} Items` : "1 Item"} | ₹{" "}
          {toDecimal(grandTotal + prepaidDiscount)}
        </Heading>
        {prepaidDiscountPercent > 0 && (
          <Text
            as="p"
            size="sm"
            className={twMerge(
              isMobileFooterToShow ? "text-white-a700_01" : "text-black-900",
            )}
            responsive
          >
            Including {prepaidDiscountPercent}% prepaid discount
          </Text>
        )}
      </div>
    );
  },
);

CartSummary.displayName = "CartSummary";

const FooterBarForMWeb = React.memo(
  ({
    footerTabs,
    isMobileFooterToShow,
    openMobileMenu,
    handleCartVisibility,
    handleUserLoginClick,
  }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const normalizeTitle = useCallback(
      (title) => title.toLowerCase().replace(/[\s\/\-]/g, ""),
      [],
    );

    const handleOnClick = useCallback(
      (normalTitle) => {
        switch (normalTitle) {
          case "cart":
          case "carts":
            return (
              typeof handleCartVisibility === "function" &&
              handleCartVisibility(true)
            );

          case "category":
          case "categories":
            return typeof openMobileMenu === "function" && openMobileMenu(true);

          case "login":
          case "signin":
          case "profile":
            return (
              typeof handleUserLoginClick === "function" &&
              handleUserLoginClick()
            );

          default:
            return;
        }
      },
      [handleCartVisibility, openMobileMenu, handleUserLoginClick],
    );

    const renderTab = ({ slug, image, title }, index) => {
      const trimmedSlug = slug?.trim();
      const normalTitle = normalizeTitle(title);

      const { alternativeText = "", url: imgUrl = "" } =
        image?.data?.attributes;

      const handleClick = (e) => {
        e.stopPropagation();
        setActiveIndex(index);
        handleOnClick(normalTitle);
      };

      const content = (
        <div
          className="flex flex-col items-center justify-center"
          onClick={handleClick}
        >
          <div className="w-6">
            <Img
              src={imgUrl}
              width={32}
              style={{
                filter:
                  index === activeIndex
                    ? "invert(66%) sepia(6%) saturate(6705%) hue-rotate(338deg) brightness(92%) contrast(87%)"
                    : "none",
              }}
              height={32}
              alt={alternativeText || `${slug} Image`}
              className="h-auto w-full object-contain"
            />
          </div>
          <Text
            as="p"
            size="sm"
            className={`${activeIndex === index ? "!text-yellow-900" : ""}`}
          >
            {title}
          </Text>
        </div>
      );

      return trimmedSlug ? (
        <Link key={index} href={trimmedSlug}>
          {content}
        </Link>
      ) : (
        <div key={index}>{content}</div>
      );
    };

    if (!isMobileFooterToShow) return null;

    return (
      <div className="flex w-full justify-around border-t border-gray-200 bg-white-a700 px-3 py-2">
        {footerTabs?.map(renderTab)}
      </div>
    );
  },
);

FooterBarForMWeb.displayName = "FooterBarForMWeb";

const StickyViewCart = ({
  mobileFooterBarData,
  openMobileMenu,
  handleUserLoginClick,
}) => {
  const footerTabs =
    mobileFooterBarData?.data?.attributes?.mobileFooterTabs || [];

  const { isSmallSize: isMobile } = useWindowDimensions();

  const isMobileFooterToShow = isMobile
    ? mobileFooterBarData?.data?.attributes?.showComponentInWeb
    : false;

  // const isInteractive = useIsInteractive();
  const isPrepaidDiscountToShow = useConfiguration(
    IS_PREPAID_DISCOUNT_TO_SHOW,
    true,
  );

  const unParsedSpinTheWheelConfig = useConfiguration(
    SPIN_THE_WHEEL_CONFIG,
    "{}",
  );
  const spinTheWheelConfig = JSON.parse(unParsedSpinTheWheelConfig);

  const pathname = usePathname();

  const { handleCartVisibility } = useModalDispatch();

  const isRewardApplied = useSelector(
    (state) => state.cart?.isRewardApplied || false,
  );
  const appliedCoupon = useSelector((state) => state.cart?.coupon);

  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const isAllowed = useMemo(
    () =>
      STICKY_VIEW_CART_TO_SHOW.some(
        (allowedPath) =>
          pathname === allowedPath ||
          (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
      ),
    [pathname],
  );

  const { grandTotal, totalItems, prepaidDiscountPercent, prepaidDiscount } =
    useCartTotal({
      paymentType: "PREPAID",
      isRewardApplied,
    });

  const openCart = useCallback(() => {
    handleCartVisibility(true);
  }, [handleCartVisibility]);

  if (!isAllowed) return null;

  const getCollectionWiseNudgeMsg = () => {
    if (pathname === "/collections/all" || pathname === "/") {
      if (appliedCoupon?.code === "FREEDUO") {
        return "Congrats, your Buy 2 Get 2 offer has been availed!";
      } else {
        return "Add more items to unlock 'Buy 2 Get 2 Free'";
      }
    } else if (pathname === "/collections/buy-8-1000") {
      if (appliedCoupon?.code === "BUY8") {
        return "Congrats, your Buy 8 @ ₹1000 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 8 @ ₹1000 Offer'";
    } else if (pathname === "/collections/buy-8-1199") {
      if (appliedCoupon?.code === "BUNDLE8") {
        return "Congrats, your Buy 8 @ ₹1199 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 8 @ ₹1199 Offer'";
    } else if (pathname === "/collections/buy-3-599") {
      if (appliedCoupon?.code === "TRI599") {
        return "Congrats, your Buy 3 @ ₹599 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 3 @ ₹599 Offer'";
    } else if (pathname === "/collections/buy-4-699") {
      if (appliedCoupon?.code === "BUY699") {
        return "Congrats, your Buy 4 @ ₹699 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 4 @ ₹699 Offer'";
    } else if (pathname === "/collections/buy-6-899") {
      if (appliedCoupon?.code === "BUNDLE6") {
        return "Congrats, your Buy 6 @ ₹899 offer has been availed!";
      }
      return "Add more items to unlock 'Buy 6 @ ₹899 Offer'";
    }
    return "";
  };

  return (
    <>
      <div
        id="add-to-cart-sticky-bar"
        className={twMerge(
          `bg-white fixed bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 flex-col justify-between sm:bottom-[35px] sm:max-w-[500px] sm:rounded-lg`,
          isMobileFooterToShow
            ? ""
            : "bg-white-a700 bg-opacity-95 shadow-[0_0_10px_0_rgba(0,0,0,0.12)] backdrop-blur-sm",
        )}
      >
        {!!cartItems.length && (
          <>
            <Nudge spinTheWheelConfig={spinTheWheelConfig} />
            <div
              className={twMerge(
                `flex flex-grow items-center justify-between`,
                isMobileFooterToShow
                  ? "mx-3 my-1 rounded-md bg-yellow-900 px-4 py-1.5"
                  : "px-5 py-2",
              )}
            >
              <CartSummary
                totalItems={totalItems}
                grandTotal={grandTotal}
                prepaidDiscountPercent={
                  isPrepaidDiscountToShow
                    ? !!appliedCoupon
                      ? appliedCoupon?.applyPrepaidDiscount
                        ? prepaidDiscountPercent
                        : 0
                      : prepaidDiscountPercent
                    : 0
                }
                prepaidDiscount={isPrepaidDiscountToShow ? 0 : prepaidDiscount}
                isMobileFooterToShow={isMobileFooterToShow}
              />
              <Button
                variant={isMobileFooterToShow ? "none" : "primary"}
                size="none"
                className={twMerge(
                  "rounded-md py-3 text-white-a700 transition-colors duration-300",
                  isMobileFooterToShow ? "px-3 text-lg" : "px-6",
                )}
                onClick={openCart}
              >
                {isMobileFooterToShow ? "View Cart" : "GO TO CART"}
              </Button>
            </div>
          </>
        )}
        <FooterBarForMWeb
          footerTabs={footerTabs}
          isMobileFooterToShow={isMobileFooterToShow}
          openMobileMenu={openMobileMenu}
          handleCartVisibility={handleCartVisibility}
          handleUserLoginClick={handleUserLoginClick}
        />
      </div>
    </>
  );
};

export default React.memo(StickyViewCart);
