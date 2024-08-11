import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCouponDiscount,
  useBestCoupon,
  useFeaturedCoupons,
} from "@wow-star/utils";
import { applyCouponAPI } from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import CouponModal from "./CouponModal";
import CouponDrawer from "./CouponDrawer";
import CouponHeader from "./CouponHeader";

const CouponsAndOffers = () => {
  const { applyCoupon, removeCoupon, removeFromCart } = useCartDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const { cartList, appliedCoupon, storedCouponCode, user } = useSelector(
    (state) => ({
      cartList: state.cart.data || [],
      appliedCoupon: state.cart.coupon,
      storedCouponCode: state.cart.storedCouponCode,
      user: state.user.user,
    }),
  );

  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons();
  const bestCouponCode = useBestCoupon();

  const previousCartList = useRef(cartList);

  const applyCouponCode = useCallback(
    async (code, autoApplied = false) => {
      if (!code) return;

      setLoading(true);
      try {
        const response = await applyCouponAPI(code);
        if (!response?.data?.applyCoupon) {
          throw new Error("Coupon not found");
        }

        const {
          allowed,
          message,
          coupon: couponResponse,
        } = getCouponDiscount(response.data.applyCoupon, cartList);

        if (allowed) {
          applyCoupon({ ...couponResponse, autoApplied: !!autoApplied });
          setTimeout(() => {
            setIsCouponModalOpen(true);
          }, 300);
          setIsSidebarOpen(false);
        } else {
          setError(message);
        }
      } catch (error) {
        console.log("Coupon not found", error);
        setError("Coupon not found");
      } finally {
        setCouponCode("");
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartList, user],
  );

  useEffect(() => {
    if (cartList || cartList !== previousCartList.current) {
      previousCartList.current = cartList;
      // console.log("abc");
      // console.log(storedCouponCode, bestCouponCode, appliedCoupon);

      if (
        storedCouponCode &&
        (!appliedCoupon || appliedCoupon?.autoApplied) &&
        appliedCoupon?.code !== storedCouponCode
      ) {
        // console.log("appliedCoupon", storedCouponCode);

        applyCouponCode(storedCouponCode, true);
      } else if (
        bestCouponCode &&
        (!appliedCoupon || appliedCoupon?.autoApplied) &&
        appliedCoupon?.code !== bestCouponCode
      ) {
        // console.log("appliedCoupon", bestCouponCode);

        applyCouponCode(bestCouponCode, true);
      } else if (appliedCoupon?.autoApplied) {
        // console.log("removeCoupon");

        removeCoupon();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestCouponCode, cartList]);

  const handleCouponRemove = useCallback(() => {
    cartList.forEach((item) => {
      if (item.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });
    removeCoupon();
  }, [cartList, removeFromCart, removeCoupon]);

  useEffect(() => {
    if (couponCode) {
      setError(null);
    }
  }, [couponCode]);

  return (
    <>
      <CouponHeader openSidebar={() => setIsSidebarOpen(true)} />

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        appliedCoupon={appliedCoupon}
      />

      <CouponDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        loading={loading}
        error={error}
        applyCouponCode={applyCouponCode}
        featuredCoupons={featuredCoupons}
        appliedCoupon={appliedCoupon}
        handleCouponRemove={handleCouponRemove}
      />
    </>
  );
};

export default React.memo(CouponsAndOffers);
