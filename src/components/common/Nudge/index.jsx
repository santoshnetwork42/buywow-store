"use client";

import GiftIcon from "@/assets/svg/gift";
import { Text } from "@/components/elements";
import { fetchCouponRuleAPI } from "@/lib/appSyncAPIs";
import {
  setApplicableCollectionCoupons,
  setApplicableProductCoupons,
  setCurrentQuantity,
  setMaximumQuantity,
} from "@/store/slices/nudge.slice";
import { errorHandler } from "@/utils/errorHandler";
import {
  extractCollectionSlug,
  extractCouponsForApplicableCollection,
  extractCouponsForApplicableProduct,
  extractProductSlug,
  getNudgeQuantity,
  sortCouponBasedOnQuantity,
} from "@/utils/helpers";
import { useCoupons } from "@wow-star/utils-cms";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GiftIconWithBorder = ({
  isMarked,
  isNextIndex,
  animationType = "linear",
}) => {
  return (
    <div className="relative">
      <div
        className={`relative flex h-8 w-8 items-center justify-center rounded-lg bg-white-a700_01 transition-all duration-300 ease-in-out ${isNextIndex ? "animate-pulse-glow" : ""} ${isMarked ? `border-animation border-animation-${animationType}` : "ring-2 ring-gray-400 ring-opacity-10"} `}
      >
        <GiftIcon color={isMarked ? "#dd8433" : "#c2c3c7"} />
      </div>
    </div>
  );
};

const IntegratedProgressStepper = ({
  steps,
  currQuantity,
  maxQuantity,
  isCart,
}) => {
  if (maxQuantity <= 0 || currQuantity <= 0 || steps <= 0) return;

  // Ensure currQuantity doesn't exceed maxQuantity
  const safeCurrentQuantity = Math.min(currQuantity, maxQuantity);

  // Calculate progress percentage
  const progressPercentage = (safeCurrentQuantity / maxQuantity) * 100;

  // Determine the next step based on currQuantity
  const nextStepIndex = steps?.findIndex(
    (step) => safeCurrentQuantity < step.quantity,
  );

  let progressQuantity = 0;
  // Find the index of the applied coupon
  // const appliedCouponIndex = steps
  //   ? steps.findIndex((step) => step.code === appliedCoupon?.code)
  //   : -1;

  // Determine the current step based on currQuantity
  // const currentStepIndex = steps?.findIndex(
  //   (step) => safeCurrentQuantity > step.quantity,
  // );

  let nudgeMsg = "";
  if (nextStepIndex === -1) {
    if (steps?.length > 1) {
      nudgeMsg = "🥳" + "You have unlocked all Offers!";
    } else if (steps?.length === 1) {
      const coupon = steps[0];
      if (coupon.couponType === "BUY_X_AT_Y")
        nudgeMsg = `Congratulations! You have unlocked Buy Any ${coupon.buyXQuantity} @ ₹${coupon?.getYAmount} Offer`;
      else if (coupon.couponType === "BUY_X_GET_Y")
        nudgeMsg = `Congratulations! You have unlocked Buy Any ${coupon.buyXQuantity} Get ${coupon?.getYQuantity} Free Offer`;
    }
  }
  if (nextStepIndex !== -1) {
    const coupon = steps[nextStepIndex];
    const remainingQty = Math.max(coupon.quantity - currQuantity, 0);
    if (remainingQty === 0) {
      nudgeMsg = "🥳" + "You have unlocked all Offers!";
    } else if (coupon.couponType === "BUY_X_AT_Y") {
      nudgeMsg = `Add ${remainingQty} more ${remainingQty === 1 ? "item" : "items"} to unlock Buy Any ${coupon.buyXQuantity} @ ₹${coupon?.getYAmount} Offer`;
    } else if (coupon.couponType === "BUY_X_GET_Y") {
      nudgeMsg = `Add ${remainingQty} more ${remainingQty === 1 ? "item" : "items"} to unlock Buy Any ${coupon.buyXQuantity} Get ${coupon?.getYQuantity} Free Offer`;
    }
  }

  return (
    <div
      className={`w-full rounded-lg rounded-t-none bg-deep_orange-50 p-4 py-6 pt-4`}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="mb-2 w-full text-center text-[12px] !leading-3">
          {nudgeMsg}
        </div>
        {/* Progress Bar */}
        <div className="relative">
          <div className="h-1 rounded-full bg-gray-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="h-full rounded-full bg-yellow-900 transition-all duration-300 ease-in-out"
            ></div>
          </div>

          <div className="relative flex w-full gap-1">
            {Array.from({ length: maxQuantity - 1 })?.map((_, index) => {
              return (
                <div
                  key={index}
                  style={{ width: `${(100 / maxQuantity) * (index + 1)}%` }}
                  className={`absolute -top-2.5 flex w-full justify-end`}
                >
                  <p
                    className={`transition-all ease-in-out ${(100 / maxQuantity) * (index + 1) <= progressPercentage ? "bg-yellow-900 duration-1000" : "bg-gray-300 duration-300"} rounded-full p-2`}
                  ></p>
                </div>
              );
            })}
          </div>

          <div className="relative flex w-full gap-1">
            {steps?.map((step, index) => {
              return (
                <div
                  key={index}
                  style={{ width: `${(100 / maxQuantity) * step.quantity}%` }}
                  className={`absolute -top-3.5 flex w-full justify-end`}
                >
                  <p
                    className={`rounded-full p-1 px-2.5 transition-all ease-in-out ${safeCurrentQuantity >= step.quantity ? "bg-yellow-900 text-white-a700_01 duration-700" : "bg-gray-300 text-black-900 duration-300"}`}
                    // className={`transition-all ease-in-out ${(100 / maxQuantity) * (index + 1) <= progressPercentage ? "bg-yellow-900 duration-1000" : "bg-gray-300 duration-300"} rounded-full p-2`}
                  >
                    {step.quantity}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className={`absolute -top-3 flex w-full justify-end`}>
          <Text
            as="p"
            size="base"
            className={`rounded-full p-1 px-2.5 transition-all ease-in-out ${safeCurrentQuantity === maxQuantity ? "bg-yellow-900 text-white-a700_01 duration-700" : "bg-gray-300 text-black-900 duration-300"}`}
          >
            {maxQuantity}
          </Text>
        </div> */}

        {/* <div className="flex w-full gap-1"></div> */}

        {/* <div className="flex w-[87%] gap-1">
          {steps?.map((step, index) => {
            return (
              <div key={index} className="h-2 w-full rounded-full">
                <div className="flex gap-1">
                  {Array.from({
                    length: index
                      ? step.quantity - steps[index - 1].quantity
                      : step.quantity,
                  }).map((_, qtyIndex) => (
                    <div
                      key={qtyIndex}
                      className={`h-1 w-full rounded-full transition-all duration-300 ease-in-out ${progressQuantity + qtyIndex < currQuantity ? "bg-yellow-900" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="hidden">
                  {(progressQuantity = step.quantity)}
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Steps */}
        {/* <div className="absolute left-0 top-0 -mt-4 flex w-full justify-between">
          {steps?.map((step, index) => {
            const stepPosition = (step.quantity / maxQuantity) * 100;
            const isMarked = step.quantity <= currQuantity;
            const isNextIndex = nextStepIndex === index;

            return (
              <div
                key={step.code}
                className="absolute left-3 flex justify-end pr-1 md:pr-2"
                style={{
                  width: `${(100 / steps?.length) * (index + 1)}%`,
                }}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <GiftIconWithBorder
                    isMarked={isMarked}
                    isNextIndex={isNextIndex}
                    animationType="linear" // or "clockwise" or "corners"
                  />

                  <div className="flex flex-col text-center transition-all duration-300 ease-in-out">
                    <span
                      className={`block text-xs font-medium ${isMarked ? "text-yellow-900" : "text-gray-600"} !leading-3 transition-all duration-300 ease-in-out`}
                    >
                      {step.code}
                    </span> 

                    <span
                      className={`block text-xs !leading-3 transition-all duration-300 ease-in-out`}
                    >
                      {`On ${step.quantity} Products`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

const Nudge = ({ isCart = false }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.data || []);
  const coupons = useCoupons();

  const collectionCoupons = useSelector(
    (state) => state.nudge.applicableCollectionCoupons,
  );
  const pdpCoupons = useSelector(
    (state) => state.nudge.applicableProductCoupons,
  );
  const globalCoupons = useSelector((state) => state.nudge.globalCoupons);
  const currQuantity = useSelector((state) => state.nudge.currQuantity);
  const maxProgressQuantity = useSelector((state) => state.nudge.maxQuantity);
  const storedCouponCode = useSelector((state) => state.cart?.storedCouponCode);

  const [nudgeFeat, setNudgeFeat] = useState([]);

  // Separate useEffect for fetching coupons
  useEffect(() => {
    const collectionSlug = extractCollectionSlug(pathname);
    const productSlug = extractProductSlug(pathname);

    const fetchCoupon = async () => {
      try {
        const response = await fetchCouponRuleAPI(storedCouponCode);
        dispatch(
          setApplicableCollectionCoupons(
            extractCouponsForApplicableCollection({
              coupons: response ? [response] : [],
              collectionSlug: pathname,
            }),
          ),
        );
      } catch (error) {
        errorHandler(error);
      }
    };

    if (storedCouponCode) {
      fetchCoupon();
    } else if (collectionSlug) {
      dispatch(
        setApplicableCollectionCoupons(
          extractCouponsForApplicableCollection({
            coupons,
            collectionSlug: pathname,
          }),
        ),
      );
    } else if (productSlug) {
      dispatch(
        setApplicableProductCoupons(
          extractCouponsForApplicableProduct({
            coupons,
            productSlug: pathname,
          }),
        ),
      );
    }
  }, [pathname, searchParams, coupons, storedCouponCode, dispatch]);

  // Separate useEffect for updating nudgeFeat
  useEffect(() => {
    const isHomepage = pathname === "/";
    const collectionSlug = extractCollectionSlug(pathname);
    const productSlug = extractProductSlug(pathname);

    let nextNudgeFeat = [];

    if (isHomepage) {
      nextNudgeFeat = globalCoupons;
    } else if (collectionSlug) {
      let relevantCollectionCoupons = [];
      if (storedCouponCode) {
        const isStoredCouponCollection =
          (searchParams.get("couponCode")?.split("&")[0] ||
            searchParams.get("couponcode")?.split("&")[0]) === storedCouponCode;

        relevantCollectionCoupons = collectionCoupons?.length
          ? collectionCoupons
          : isStoredCouponCollection
            ? globalCoupons?.filter(
                (coupon) => coupon.code === storedCouponCode,
              )
            : [];
      } else {
        relevantCollectionCoupons = collectionCoupons?.length
          ? sortCouponBasedOnQuantity([...collectionCoupons, ...globalCoupons])
          : globalCoupons;
      }
      nextNudgeFeat = relevantCollectionCoupons;
    } else if (productSlug) {
      nextNudgeFeat =
        pdpCoupons?.length && !storedCouponCode
          ? sortCouponBasedOnQuantity([...pdpCoupons, ...globalCoupons])
          : storedCouponCode
            ? coupons?.filter((coupon) => coupon.code === storedCouponCode)
            : globalCoupons;
    }

    setNudgeFeat(nextNudgeFeat || []);
  }, [
    pathname,
    coupons,
    globalCoupons,
    pdpCoupons,
    collectionCoupons,
    storedCouponCode,
    searchParams,
  ]);

  // Separate useEffect for quantity calculations
  useEffect(() => {
    const collectionSlug = extractCollectionSlug(pathname);
    const productSlug = extractProductSlug(pathname);

    const isGlobalOffer = !(collectionSlug || productSlug);

    let relevantCollectionCoupons = [];

    if (storedCouponCode) {
      const isStoredCouponCollection =
        (searchParams.get("couponCode")?.split("&")[0] ||
          searchParams.get("couponcode")?.split("&")[0]) === storedCouponCode;

      relevantCollectionCoupons = collectionCoupons?.length
        ? collectionCoupons
        : isStoredCouponCollection
          ? globalCoupons?.filter((coupon) => coupon.code === storedCouponCode)
          : [];
    } else {
      relevantCollectionCoupons = collectionCoupons?.length
        ? sortCouponBasedOnQuantity([...collectionCoupons, ...globalCoupons])
        : globalCoupons;
    }

    const relevantCoupons = isGlobalOffer
      ? globalCoupons
      : collectionSlug
        ? relevantCollectionCoupons
        : productSlug && pdpCoupons?.length
          ? pdpCoupons
          : globalCoupons;

    const { currQuantity = 0, maxProgressQuantity = 0 } =
      getNudgeQuantity({
        pathname,
        cartItems,
        isGlobalOffer,
        coupons: relevantCoupons,
      }) || {};

    dispatch(setCurrentQuantity(currQuantity));
    dispatch(setMaximumQuantity(maxProgressQuantity));
  }, [
    cartItems,
    pathname,
    collectionCoupons,
    pdpCoupons,
    globalCoupons,
    dispatch,
    storedCouponCode,
    coupons,
    searchParams,
  ]);

  const steps = useMemo(
    () =>
      nudgeFeat.map((i) => ({
        ...i,
        quantity: i.buyXQuantity + (i?.getYQuantity || 0),
      })),
    [nudgeFeat],
  );

  return (
    <div className="w-full">
      <IntegratedProgressStepper
        steps={steps}
        currQuantity={currQuantity}
        maxQuantity={maxProgressQuantity}
        isCart={isCart}
      />
    </div>
  );
};

export default Nudge;

// isFeatured and isPDPFeatured and isAffiliated
