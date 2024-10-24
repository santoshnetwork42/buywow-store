"use client";

import {
  applyCouponAPI,
  fetchCouponRuleAPI,
  getOrderByIdAPI,
  getUserRewardsAPI,
} from "@/lib/appSyncAPIs";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useUserDispatch } from "@/store/sagas/dispatch/user.dispatch";
import { PREPAID_ENABLED } from "@/utils/data/constants";
import { errorHandler } from "@/utils/errorHandler";
import { addPhonePrefix, formatUserAddress } from "@/utils/helpers";
import {
  getCouponDiscount,
  useCartTotal,
  useConfiguration,
  useNavbar,
} from "@wow-star/utils";
import awaitGlobal from "await-global";
import { confirmSignIn, getCurrentUser, signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const GKContext = createContext();

function GoKwikProvider({ children }) {
  const router = useRouter();

  const { userWithRewardPoints, setUserWithRewardPoints } = useNavbar();
  const { applyCoupon, removeCoupon, emptyCart, removeFromCart } =
    useCartDispatch();
  const { setIsLoggedinViaGokwik, setCustomUser } = useUserDispatch();
  const cartList = useSelector((state) => state.cart?.data) || [];
  const userId = useSelector((state) => state.user?.user?.id) || {};
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);

  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const { totalPrice } = useCartTotal({
    isRewardApplied: isRewardApplied,
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
  });
  const {
    addressAddedEvent,
    placeOrderEvent,
    addressSelectedEvent,
    addPaymentInfoEvent,
    startCheckoutEvent,
    authEvent,
    customEvent,
  } = useEventsDispatch();

  const setRewardPoints = async () => {
    try {
      if (isRewardApplied)
        setUserWithRewardPoints({
          ...userWithRewardPoints,
          totalRewards: Math.max(
            userWithRewardPoints?.totalRewards - usableRewards,
            0,
          ),
        });
    } catch (e) {
      console.error("Error while upadating user points ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const applyCouponCode = async (couponCode, autoApplied = false) => {
    const response = await applyCouponAPI(couponCode);

    if (!!response?.data?.applyCoupon) {
      const {
        allowed,
        message,
        coupon: couponResponse,
      } = getCouponDiscount(response.data.applyCoupon, cartList);

      if (allowed) {
        applyCoupon({
          ...couponResponse,
          autoApplied: !!autoApplied,
          checkoutSource: "GOKWIK",
        });
      } else {
        console.error("Failed to apply coupon:", message);
      }
    } else {
      console.error("Coupon not found");
    }
  };

  const onGokwikClose = () => {
    setIsLoggedinViaGokwik(false);
    customEvent({ event: "gokwik_checkout_close", source: "GOKWIK" });
  };

  const onCouponRemove = () => {
    cartList.forEach((item) => {
      if (item.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });

    removeCoupon({ checkoutSource: "GOKWIK" });
  };

  const fetchOrder = async (orderId) => {
    try {
      const order = await getOrderByIdAPI({ id: orderId });
      return order;
    } catch (error) {
      errorHandler(error);
    }
  };

  const fetchCoupon = async (code, userId) => {
    try {
      const response = await fetchCouponRuleAPI(code, userId);
      return response;
    } catch (error) {
      errorHandler(error);
    }
  };

  const manageUserAuthEvent = async (phone, token) => {
    const isLoggedIn = await getCurrentUser().catch(() => null);
    if (!isLoggedIn) {
      try {
        const cu = await signIn({
          username: addPhonePrefix(phone),
          options: {
            authFlowType: "CUSTOM_WITHOUT_SRP",
            clientMetadata: { checkout: "GOKWIK" },
          },
        });

        if (
          cu?.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
        ) {
          const { isSignedIn } = await confirmSignIn({
            challengeResponse: token,
          });

          if (isSignedIn) {
            // const currentUser = await getCurrentUser();
            authEvent({ action: "login", moe: { userId: phone } });
            setIsLoggedinViaGokwik(true);
            const getUserResponse = await getUserRewardsAPI();
            setUserWithRewardPoints({
              ...getUserResponse,
            });
            return Promise.resolve(null);
          }
        }
      } catch (error) {
        console.error("user-login-successful error", error);
      }

      setCustomUser(phone);
      //   dispatchAuthEvent("signup", {
      //     userId: null,
      //     phone: addPhonePrefix(phone),
      //   });
    }
  };

  useEffect(() => {
    awaitGlobal("gokwikSdk", 1000, 20).then((gokwikSdk) => {
      gokwikSdk.on("order-complete", async (orderDetails) => {
        try {
          if (orderDetails.merchant_order_id) {
            let orderResponse, coupon;
            orderResponse = await fetchOrder(orderDetails.merchant_order_id);
            if (orderResponse) {
              const order = {
                totalCashOnDeliveryCharges:
                  orderResponse?.totalCashOnDeliveryCharges,
                totalShippingCharges: orderResponse?.totalShippingCharges,
                totalDiscount: orderResponse?.totalDiscount,
                totalAmount: orderResponse?.totalAmount,
                code: orderResponse?.code,
                status: orderResponse?.status,
                id: orderResponse?.id,
              };

              if (orderDetails?.applied_discount) {
                coupon = await fetchCoupon(
                  orderDetails?.applied_discount?.code,
                  userId,
                );
              }

              placeOrderEvent(
                order,
                orderResponse?.products?.items,
                coupon,
                orderDetails.shipping_address,
                orderResponse?.paymentType ||
                  orderDetails.payment_method.toUpperCase(),
                "GOKWIK",
              );

              setRewardPoints();

              setIsLoggedinViaGokwik(false);
            }
          }
        } catch (e) {
          errorHandler(e);
        } finally {
          await gokwikSdk.close();
          emptyCart();
          if (orderDetails.merchant_order_id) {
            router.push(`/order/${orderDetails.merchant_order_id}`);
          } else {
            router.push(`/`);
          }
        }
      });

      gokwikSdk.on("coupon-applied", (data) => {
        if (data.coupon_code) applyCouponCode(data.coupon_code);
      });

      gokwikSdk.on("checkout-close", () => {
        onGokwikClose();
      });

      gokwikSdk.on("coupon-removed", (data) => {
        if (data.coupon_code) onCouponRemove();
      });

      gokwikSdk.on("address-add", (address) => {
        const formattedAddress = formatUserAddress(address);
        addressAddedEvent(formattedAddress, totalPrice, "GOKWIK");
        addressSelectedEvent(formattedAddress, totalPrice, "GOKWIK");
      });

      gokwikSdk.on("address-selected", (address) => {
        const formattedAddress = formatUserAddress(address);
        addressSelectedEvent(formattedAddress, totalPrice, "GOKWIK");
      });

      gokwikSdk.on("payment-method-selected", (payment) => {
        const checkoutSource = "GOKWIK";
        addPaymentInfoEvent({ checkoutSource, payment });
      });

      gokwikSdk.on("checkout-initiation-failure", (checkout) => {
        gokwikSdk.close();
        router.push("/checkout");
      });

      gokwikSdk.on("user-login-successful", async (event) => {
        startCheckoutEvent("GOKWIK", event);
        await manageUserAuthEvent(event.phone_no, event.user_token);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GKContext.Provider value={{}}>{children}</GKContext.Provider>;
}

export default GoKwikProvider;
