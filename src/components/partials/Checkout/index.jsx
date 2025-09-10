"use client";

import { showToast } from "@/components/common/ToastComponent";
import { Button } from "@/components/elements";
import Cashback from "@/components/partials/CartDrawer/Cashback";
import AddressSection from "@/components/partials/Account/AddressSection";
import PaymentLoader from "@/components/partials/Checkout/PaymentLoader";
import PaymentMethodsSection from "@/components/partials/Checkout/PaymentMethodsSection";
import ProgressSteps from "@/components/partials/Others/ProgressSteps";
import {
  RAZORPAY_KEY,
  RAZORPAY_SCRIPT,
  CASHFREE_APP_ID,
  CASHFREE_SCRIPT,
  CASHFREE_MODE,
  STORE_ID,
  STORE_PREFIX,
} from "@/config";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useGuestCheckout } from "@/utils/context/navbar";
import {
  COD_ENABLED,
  MAX_COD_AMOUNT,
  MIN_COD_AMOUNT,
  PPCOD_AMOUNT,
  PPCOD_ENABLED,
  PREPAID_ENABLED,
} from "@/utils/data/wowStarConstants";
import { CASHFREE_ENABLED, GOKWIK_ENABLED } from "@/utils/data/constants";
import {
  checkAffiseValidity,
  checkFormValidity,
  compareStringsIgnoreCase,
  isValidAddress,
  nameSplitter,
  toDecimal,
} from "@/utils/helpers";
import { getPublicImageURL } from "@/utils/helpers/img-loader";
import loadScript from "@/utils/loadScript";
import {
  MAX_PREPAID_DISCOUNT,
  useCartItems,
  useCartTotal,
  useConfiguration,
  useFreeProducts,
  useNavbar,
  useOrders,
} from "@wow-star/utils-cms";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useInventory } from "@/utils/hooks/useInventory";
import { COD_BLOCKED_UTM_SOURCES } from "@/utils/data/constants";

const EmptyCart = dynamic(
  () => import("@/components/partials/CartDrawer/EmptyCart"),
  { ssr: false },
);

const OrderSummary = dynamic(
  () => import("@/components/partials/Checkout/OrderSummary"),
  { ssr: false },
);

let razorpayMethod;
let cashfreeMethod;

const CheckoutClient = () => {
  const router = useRouter();
  const { handlePasswordLessModal } = useModalDispatch();
  const { validateCart, emptyCart, validateCartOnError } = useCartDispatch();
  const {
    addPaymentInfoEvent,
    placeOrderEvent: onPlaceOrderEvent,
    startCheckoutEvent,
  } = useEventsDispatch();
  const cartItems = useSelector((state) => state.cart?.data || []);
  const currentAddress = useSelector((state) => state.address?.currentAddress);
  const user = useSelector((state) => state.user?.user);
  const customUser = useSelector((state) => state.user?.customUser);
  const isRewardApplied = useSelector((state) => state.cart?.isRewardApplied);
  const metaData = useSelector((state) => state.system?.meta);
  const storeData = useSelector((state) => state.system?.store);
  const shoppingCartId = useSelector((state) => state.cart?.cartId);
  const { appliedCoupon } = useSelector((state) => ({
    appliedCoupon: state.cart?.coupon,
  }));

  const cartList = useCartItems({
    showLTOProducts: true,
    showNonApplicableFreeProducts: false,
  });

  const maxCOD = useConfiguration(MAX_COD_AMOUNT, -1);
  const minCOD = useConfiguration(MIN_COD_AMOUNT, -1);
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const maxPrepaidDiscount = useConfiguration(MAX_PREPAID_DISCOUNT, 0);
  const codBlockedUtmSource = useConfiguration(COD_BLOCKED_UTM_SOURCES, 0);
  const codEnabled = useConfiguration(COD_ENABLED, true);
  const ppcodEnabled = useConfiguration(PPCOD_ENABLED, false);
  const ppcodAmount = useConfiguration(PPCOD_AMOUNT, 0);
  
  // Payment Gateway Configuration
  const gokwikEnabled = useConfiguration(GOKWIK_ENABLED, false);
  const cashfreeEnabled = useConfiguration(CASHFREE_ENABLED, false);

  const isUtmSourceAllowedForCod = useMemo(() => {
    if (!metaData?.utmSource || !codBlockedUtmSource?.length) {
      return true;
    }
    const isBlockedUtm = codBlockedUtmSource?.find((utmSource) =>
      compareStringsIgnoreCase(utmSource || "", metaData?.utmSource || ""),
    );
    return !!isBlockedUtm ? false : true;
  }, [codBlockedUtmSource, metaData]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    prepaidEnabled ? "PREPAID" : "COD",
  );
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState("RAZORPAY"); // Default to Razorpay
  const [pageLoading, setPageLoading] = useState(true);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const guestCheckout = useGuestCheckout();
  const { isReady, userWithRewardPoints, setUserWithRewardPoints } =
    useNavbar();

  const { ready: isInventoryCheckReady, inventoryMapping } = useInventory({
    validateCart,
  });

  const freeProductsResponse = useFreeProducts({
    showNonApplicableFreeProducts: false,
  });

  const freeProducts = useMemo(
    () => freeProductsResponse.map((f) => f.products),
    [freeProductsResponse],
  );

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    totalAmountSaved: totalSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
    codGrandTotal,
    prepaidGrandTotal,
    codCharges,
    appliedCODCharges,
    prepaidDiscountPercent,
    usableRewards,
    totalAmount,
    codCashbackRewardsOnOrder,
    prepaidCashbackRewardsOnOrder,
    amountNeededToAvailPrepaidCashback,
    amountNeededToAvailCodCashback,
  } = useCartTotal({
    paymentType: selectedPaymentMethod,
    isRewardApplied,
  });

  const [
    { isConfirmed, order: finalOrder, loading },
    placeOrderV1,
    orderHelper,
  ] = useOrders({ orderVersion: "V5" });

  useEffect(() => {
    setPageLoading(true);
    if (!user?.id && !guestCheckout && !customUser?.phone) {
      // router.push("/");
      handlePasswordLessModal(true, false, "/");
    } else if (user?.id || guestCheckout || customUser?.phone) {
      setPageLoading(false);
      handlePasswordLessModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, guestCheckout, customUser, router]);

  const { codCouponDisabled, onlineDisabled, ppcodCouponEnabled } =
    useMemo(() => {
      return {
        codCouponDisabled: appliedCoupon?.paymentMethod === "ONLINE",
        onlineDisabled: appliedCoupon?.paymentMethod === "COD",
        ppcodCouponEnabled: appliedCoupon?.ppcodCouponAmount > 0,
      };
    }, [appliedCoupon]);

  useEffect(() => {
    if (onlineDisabled && (codEnabled || ppcodCouponEnabled)) {
      setSelectedPaymentMethod("COD");
    } else if (codCouponDisabled && prepaidEnabled) {
      setSelectedPaymentMethod("PREPAID");
    }
  }, [
    codCouponDisabled,
    onlineDisabled,
    ppcodCouponEnabled,
    codEnabled,
    prepaidEnabled,
  ]);

  const handleMethodChange = useCallback((id) => {
    setSelectedPaymentMethod(id);
  }, []);

  // Determine which payment gateway to use based on admin configuration
  const getPaymentGateway = useCallback(() => {
    if (cashfreeEnabled) return "CASHFREE";
    if (gokwikEnabled) return "GOKWIK";
    return "RAZORPAY"; // Default fallback
  }, [cashfreeEnabled, gokwikEnabled]);

  useEffect(() => {
    setSelectedPaymentGateway(getPaymentGateway());
  }, [getPaymentGateway]);

  const placeOrderHandler = async () => {
    if (!checkFormValidity(currentAddress)) {
      showToast.error("Please Add Valid Address to Proceed");
      return;
    }

    const {
      area = "",
      address = "",
      city = "",
      state = "",
      country = "",
      pinCode = "",
      landmark = "",
      phone = "",
      name = "",
    } = currentAddress || {};

    const { firstName, lastName } = nameSplitter(name);
    const shippingAddress = {
      firstName,
      lastName,
      area,
      address,
      city,
      state,
      country,
      pinCode,
      landmark,
      phone,
    };

    const variables = {
      paymentMethod: selectedPaymentMethod,
      address: shippingAddress,
      metadata: metaData,
      appliedRewardPoints: isRewardApplied ? usableRewards : 0,
      totalAmount: totalAmount,
      shoppingCartId: shoppingCartId || null,
      source: "WEB",
      totalCashbackEarned:
        selectedPaymentMethod === "COD"
          ? codCashbackRewardsOnOrder
          : prepaidCashbackRewardsOnOrder,
    };

    if (isRewardApplied && !!usableRewards) {
      variables.appliedRewardPoints = usableRewards ? usableRewards : null;
    }

    try {
      const isAffiseTrackingValid = checkAffiseValidity();
      if (isAffiseTrackingValid) {
        variables.isAffiseTrackingValid = isAffiseTrackingValid;
      }

      if (
        !guestCheckout &&
        !customUser?.phone &&
        (!user?.id || !user.isActive)
      ) {
        emptyCart();
        router.replace("/");
        return;
      }

      setPaymentLoader(true);
      
      // Load the appropriate payment gateway script based on configuration
      const paymentGateway = getPaymentGateway();
      let scriptLoadPromise;
      
      switch (paymentGateway) {
        case "CASHFREE":
          scriptLoadPromise = loadScript(CASHFREE_SCRIPT);
          break;
        case "GOKWIK":
          scriptLoadPromise = loadScript(GOKWIK_SCRIPT);
          break;
        case "RAZORPAY":
        default:
          scriptLoadPromise = loadScript(RAZORPAY_SCRIPT);
          break;
      }
      
      const [orderResult, scriptEnabled] = await Promise.all([
        placeOrderV1(variables),
        scriptLoadPromise,
      ]);

      const { success, code, error, formError, order, payment, transaction } =
        orderResult;
      if (code === "INVALID_ADDRESS") {
        let error = formError || {};
        if (
          error?.pincode ===
            "Online Delivery is not available at this pincocde" ||
          error?.pincode ===
            "Cash on Delivery is not available at this pincocde"
        ) {
          error.pincode = (
            <>
              We&#39;re sorry! We currently don&#39;t deliver to this pincode.
              However, we&#39;re working hard to expand our service areas and
              hope to reach your location soon. Please try a different delivery
              address to proceed.
            </>
          );
        }

        const errorKeys = Object.keys(error) || [];
        if (errorKeys.length === 1) {
          showToast.custom(
            <p key={errorKeys[0]}>{error[errorKeys[0]]}</p>,
            error?.pincode && {
              duration: 5000,
            },
            error?.pincode && "text-center", // textClassName
            error?.pincode && "!flex-row", //mainClassName
          );
        } else {
          showToast.error(
            Object.values(formError).map((val) => <li key={val}>{val}</li>),
          );
        }
        setPaymentLoader(false);
        return;
      }
      if (error) {
        // showToast.error("Something went wrong");
        setPaymentLoader(false);
        const inventoryPayload = cartItems?.map((product) => ({
          recordKey: product.recordKey,
          productId: product.id,
          variantId: product.variantId,
          source: product.cartItemSource || null,
        }));
        validateCartOnError(inventoryPayload);
        router.push("/?cart=1");
        return Promise.resolve();
      }

      addPaymentInfoEvent({
        ...variables,
        ...payment,
        grandTotal,
      });

      if (success && scriptEnabled && transaction && order) {
        const paymentGateway = getPaymentGateway();
        
        if (paymentGateway === "CASHFREE") {
          // Cashfree Payment Processing
          const cashfreeOptions = {
            app_id: CASHFREE_APP_ID,
            order_id: transaction.orderId,
            order_amount: transaction.amount / 100, // Cashfree expects amount in rupees, not paisa
            order_currency: "INR",
            customer_details: {
              customer_id: user?.id || customUser?.phone || "guest",
              customer_name: shippingAddress.firstName + " " + shippingAddress.lastName,
              customer_email: shippingAddress.email || "customer@example.com",
              customer_phone: shippingAddress.phone,
            },
            order_meta: {
              return_url: `${window.location.origin}/order/${order.id}`,
              notify_url: `${window.location.origin}/api/cashfree/webhook`,
              payment_methods: "cc,dc,nb,upi,wallet"
            }
          };

          try {
            cashfreeMethod = new Cashfree(CASHFREE_MODE);
            cashfreeMethod.checkout(cashfreeOptions).then(function(result) {
              if (result.error) {
                console.error("Cashfree error:", result.error);
                orderHelper.reset();
                setPaymentLoader(false);
              } else {
                orderHelper.fetchTransactionStatus(order.id, result.transaction_id);
              }
            });
          } catch (error) {
            console.error("Cashfree initialization error:", error);
            setPaymentLoader(false);
          }
        } else if (paymentGateway === "GOKWIK") {
          // Gokwik Payment Processing (if needed in future)
          // TODO: Implement Gokwik payment processing
          console.log("Gokwik payment processing not implemented yet");
          setPaymentLoader(false);
        } else {
          // Default Razorpay Payment Processing
          const options = {
            key: RAZORPAY_KEY,
            amount: transaction.amount,
            currency: "INR",
            name: storeData?.name,
            image: getPublicImageURL({
              key: storeData?.imageUrl,
              addPrefix: true,
            }),
            order_id: transaction.orderId,
            handler: async function ({ razorpay_payment_id }) {
              orderHelper.fetchTransactionStatus(order.id, razorpay_payment_id);
            },
            prefill: {
              name: shippingAddress.firstName + " " + shippingAddress.lastName,
              email: shippingAddress.email || "customer@example.com",
              contact: shippingAddress.phone,
            },
            notes: {
              storeId: storeData?.id,
              orderId: order.id,
              paymentId: payment.id,
            },
            theme: {
              color: "#3399cc",
            },
            modal: {
              ondismiss: function () {
                orderHelper.reset();
                razorpayMethod = null;
                setPaymentLoader(false);
              },
            },
          };

          razorpayMethod = new Razorpay(options);
          razorpayMethod.open();
        }
      }

      return Promise.resolve();
    } catch (error) {
      showToast.error("Something Unexpected has occurred");
    } finally {
      setPaymentLoader(false);
    }
  };

  const afterOrderConfirm = useCallback(async () => {
    if (isConfirmed && finalOrder) {
      onPlaceOrderEvent(
        finalOrder,
        [...freeProducts],
        appliedCoupon,
        currentAddress,
        selectedPaymentMethod,
        selectedPaymentGateway, // Pass the selected payment gateway instead of hardcoded "BUYWOW"
      );

      if (isRewardApplied)
        setUserWithRewardPoints({
          ...userWithRewardPoints,
          totalRewards: Math.max(
            userWithRewardPoints?.totalRewards - usableRewards,
            0,
          ),
        });

      // Clean up payment gateway instances
      if (razorpayMethod) {
        razorpayMethod.close();
      }
      if (cashfreeMethod) {
        // Cashfree cleanup if needed
        cashfreeMethod = null;
      }
      router.push(`/order/${finalOrder.id}`);
      setPaymentLoader(false);
      emptyCart();

      if (window?.localStorage) {
        const lastWonCode = window.localStorage?.getItem(
          STORE_PREFIX + "_" + "last_won_code",
        );
        if (appliedCoupon?.code === lastWonCode) {
          window.localStorage.setItem(
            STORE_PREFIX + "_" + "last_won_code_used",
            "TRUE",
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, finalOrder, router]);

  useEffect(() => {
    if (isConfirmed) {
      afterOrderConfirm();
    }
  }, [isConfirmed, afterOrderConfirm]);

  useEffect(() => {
    startCheckoutEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ppcodAmountToTake = ppcodCouponEnabled
    ? appliedCoupon?.ppcodCouponAmount
    : ppcodAmount;

  const isMaxCODDisabled = maxCOD > -1 ? codGrandTotal > maxCOD : false;
  const isMinCODDisabled = minCOD > -1 ? codGrandTotal < minCOD : false;

  if (pageLoading) return null;

  return (
    <main className="container-main mb-main mt-2 flex min-h-[calc(100dvh-170px)] w-full flex-col gap-7 sm:mt-4 sm:min-h-[calc(100dvh-180px)] md:mt-6 md:min-h-[calc(100dvh-190px)] lg:mt-8 lg:min-h-[calc(100dvh-200px)]">
      <PaymentLoader loading={paymentLoader || loading} />

      <ProgressSteps activeStep={2} />

      {cartList.length > 0 && totalListingPrice > 0 ? (
        <div className="mb-12 grid w-full grid-cols-1 gap-5 sm:gap-6 md:mb-0 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
          <div className="order-3 md:order-1 md:row-span-3">
            <AddressSection variant="CHECKOUT" />
          </div>

          <div className="order-1 md:order-2">
            <OrderSummary
              cartList={cartList}
              totalPrice={totalPrice}
              totalListingPrice={totalListingPrice}
              appliedCoupon={appliedCoupon}
              couponTotal={couponTotal}
              selectedPaymentMethod={selectedPaymentMethod}
              prepaidDiscount={prepaidDiscount}
              prepaidDiscountPercent={prepaidDiscountPercent}
              codCharges={codCharges}
              appliedCODCharges={appliedCODCharges}
              shippingTotal={shippingTotal}
              usableRewards={usableRewards}
              isRewardApplied={isRewardApplied}
              grandTotal={grandTotal}
              totalSaved={totalSaved}
              inventoryMapping={inventoryMapping}
            />
          </div>

          <div className="order-2 overflow-hidden rounded-md md:order-3">
            <Cashback
              cashbackAmount={
                selectedPaymentMethod === "COD"
                  ? codCashbackRewardsOnOrder
                  : prepaidCashbackRewardsOnOrder
              }
              amountNeeded={
                selectedPaymentMethod === "COD" &&
                amountNeededToAvailCodCashback.isEnabled
                  ? toDecimal(
                      amountNeededToAvailCodCashback.amount - codGrandTotal,
                    )
                  : selectedPaymentMethod === "PREPAID" &&
                      amountNeededToAvailPrepaidCashback.isEnabled
                    ? toDecimal(
                        amountNeededToAvailPrepaidCashback.amount -
                          prepaidGrandTotal,
                      )
                    : 0
              }
            />
          </div>

          <div className="order-4 flex flex-col gap-5">
            <PaymentMethodsSection
              prepaidEnabled={prepaidEnabled}
              codEnabled={codEnabled}
              isUtmSourceAllowedForCod={isUtmSourceAllowedForCod}
              ppcodEnabled={ppcodEnabled}
              ppcodCouponEnabled={ppcodCouponEnabled}
              prepaidDiscount={prepaidDiscount}
              prepaidDiscountPercent={prepaidDiscountPercent}
              maxPrepaidDiscount={maxPrepaidDiscount}
              onlineDisabled={onlineDisabled}
              appliedCoupon={appliedCoupon}
              prepaidGrandTotal={prepaidGrandTotal}
              selectedPaymentMethod={selectedPaymentMethod}
              handleMethodChange={handleMethodChange}
              codCharges={codCharges}
              codCouponDisabled={codCouponDisabled}
              isMaxCODDisabled={isMaxCODDisabled}
              isMinCODDisabled={isMinCODDisabled}
              ppcodAmount={ppcodAmount}
              ppcodAmountToTake={ppcodAmountToTake}
              codGrandTotal={codGrandTotal}
              maxCOD={maxCOD}
              minCOD={minCOD}
              selectedPaymentGateway={selectedPaymentGateway}
              gokwikEnabled={gokwikEnabled}
              cashfreeEnabled={cashfreeEnabled}
            />

            <div className="fixed bottom-0 left-0 w-full border-t bg-white-a700 px-3 py-2.5 sm:px-5 md:relative md:border-none md:p-0">
              <Button
                variant="primary"
                size="large"
                className="w-full py-2.5"
                onClick={placeOrderHandler}
                loader={loading}
                loaderClass="ml-2"
                disabled={
                  !isReady ||
                  !isValidAddress(currentAddress) ||
                  !isInventoryCheckReady ||
                  loading ||
                  paymentLoader
                }
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
};

export default CheckoutClient;
