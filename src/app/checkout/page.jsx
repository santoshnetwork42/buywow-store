"use client";

import { ArrowIconSVG, BagIcon } from "@/assets/svg/icons";
import PaymentMethods from "@/components/blocks/PaymentMethods/paymentMethod";
import SummaryItem from "@/components/common/CheckoutSummaryItem";
import { showToast } from "@/components/common/ToastComponent";
import { Button, Heading, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import AddressSection from "@/components/partials/Account/AddressSection";
import Cashback from "@/components/partials/CartDrawer/Cashback";
import EmptyCart from "@/components/partials/CartDrawer/EmptyCart";
import ProductPricing from "@/components/partials/CartDrawer/MainCartSection/ProductItem/ProductDetails/ProductPricing";
import PaymentLoader from "@/components/partials/Checkout/PaymentLoader";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { RAZORPAY_KEY, RAZORPAY_SCRIPT } from "@/config";
import { useCartDispatch } from "@/store/sagas/dispatch/cart.dispatch";
import { useModalDispatch } from "@/store/sagas/dispatch/modal.dispatch";
import { useGuestCheckout } from "@/utils/context/navbar";
import {
  COD_ENABLED,
  MAX_COD_AMOUNT,
  PPCOD_AMOUNT,
  PPCOD_ENABLED,
  PREPAID_ENABLED,
} from "@/utils/data/wowStarConstants";
import {
  checkAffiseValidity,
  checkFormValidity,
  isValidAddress,
  nameSplitter,
  toDecimal,
} from "@/utils/helpers";
import loadScript from "@/utils/loadScript";
import {
  MAX_PREPAID_DISCOUNT,
  useCartItems,
  useCartTotal,
  useConfiguration,
  useFreeProducts,
  useInventory,
  useNavbar,
  useOrders,
} from "@wow-star/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

let razorpayMethod;

const Checkout = () => {
  const router = useRouter();

  const { handlePasswordLessModal } = useModalDispatch();
  const { validateCart, emptyCart } = useCartDispatch();

  const { currentAddress, user, customUser, isRewardApplied } = useSelector(
    (state) => ({
      currentAddress: state.address?.currentAddress,
      user: state.user?.user,
      customUser: state.user?.customUser,
      isRewardApplied: state.cart?.isRewardApplied,
    }),
  );

  const cartList = useCartItems({
    showLTOProducts: true,
    showNonApplicableFreeProducts: false,
  });

  const maxCOD = useConfiguration(MAX_COD_AMOUNT, -1);
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const maxPrepaidDiscount = useConfiguration(MAX_PREPAID_DISCOUNT, 0);
  const codEnabled = useConfiguration(COD_ENABLED, true);
  const ppcodEnabled = useConfiguration(PPCOD_ENABLED, false);
  const ppcodAmount = useConfiguration(PPCOD_AMOUNT, 0);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    prepaidEnabled ? "PREPAID" : "COD",
  );
  const [pageLoading, setPageLoading] = useState(true);
  const guestCheckout = useGuestCheckout();
  const { isReady, userWithRewardPoints, setUserWithRewardPoints } =
    useNavbar();

  const { ready: isInventoryCheckReady, inventoryMapping } = useInventory({
    validateCart,
  });

  useEffect(() => {
    // startCheckout();
  }, []);

  useEffect(() => {
    setPageLoading(true);
    if (!user?.id && !guestCheckout && !customUser?.phone) {
      router.push("/");
      handlePasswordLessModal(true, false, "/collections");
    }
    if (user?.id || guestCheckout || customUser?.phone) {
      setPageLoading(false);
    }
  }, [user, guestCheckout, customUser, router]);

  useEffect(() => {
    if (prepaidEnabled) {
      setSelectedPaymentMethod("PREPAID");
    } else if (codEnabled || ppcodEnabled) {
      setSelectedPaymentMethod("COD");
    }
  }, [codEnabled, prepaidEnabled, ppcodEnabled]);

  const handleMethodChange = (id) => {
    setSelectedPaymentMethod(id);
  };

  const freeProductsResponse = useFreeProducts({
    showNonApplicableFreeProducts: false,
  });

  const freeProducts = useMemo(
    () => freeProductsResponse.map((f) => f.product),
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

  const { appliedCoupon } = useSelector((state) => ({
    appliedCoupon: state?.cart?.coupon,
  }));

  const [
    { isConfirmed, order: finalOrder, loading },
    placeOrderV1,
    orderHelper,
  ] = useOrders();

  const placeOrderHandler = async () => {
    const metaData = {
      landingPage: "http://localhost:3002/",
      referrer: "http://localhost:3002/checkout",
      utmCampaign: null,
      utmContent: null,
      utmMedium: null,
      utmSource: null,
      utmTerm: null,
      clickId: "",
    };

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
      appliedRewardPoints: null,
      totalAmount: totalAmount,
      shoppingCartId: uuidv4(),
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
        variables.isAffiseTrackingValid = isAffiseTrackingValid
          ? isAffiseTrackingValid
          : null;
      }

      const [
        { success, code, error, formError, order, payment, transaction },
        rzpEnabled,
      ] = await Promise.all([
        placeOrderV1(variables),
        loadScript(RAZORPAY_SCRIPT),
      ]);

      if (code === "INVALID_ADDRESS") {
        showToast.error("Invalid Address");
        return;
      }
      if (error) {
        showToast.error("Something went wrong");
        return;
      }

      if (success && rzpEnabled && transaction && order) {
        const options = {
          key: RAZORPAY_KEY,
          amount: transaction.amount,
          currency: "INR",
          name: "Buy Wow",
          image: "",
          order_id: transaction.orderId,
          handler: async function ({ razorpay_payment_id }) {
            orderHelper.fetchTransactionStatus(order.id, razorpay_payment_id);
          },
          prefill: {
            name: shippingAddress.name,
            email: shippingAddress.email,
            contact: shippingAddress.phone,
          },
          notes: {
            storeId: "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
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
            },
          },
        };

        razorpayMethod = new Razorpay(options);
        razorpayMethod.open();
        // addPaymentInfo();
        // logger.verbose("Razorpay initialization");
      }
    } catch (error) {
      showToast.error("Something Unexcpected has occurred");
    } finally {
    }
  };

  const afterOrderConfirm = useCallback(async () => {
    if (isConfirmed && finalOrder) {
      // onPlaceOrder(
      //   finalOrder,
      //   [...freeProducts],
      //   appliedCoupon,
      //   currentAddress,
      //   selectedPaymentMethod,
      //   "BUYWOW",
      // );

      if (isRewardApplied)
        setUserWithRewardPoints({
          ...userWithRewardPoints,
          totalRewards: Math.max(
            userWithRewardPoints?.totalRewards - usableRewards,
            0,
          ),
        });

      if (razorpayMethod) {
        razorpayMethod.close();
      }
      router.push(`/order/${finalOrder.id}`);

      emptyCart();
    }
  }, [isConfirmed, finalOrder, router]);

  useEffect(() => {
    if (isConfirmed) {
      afterOrderConfirm();
    }
  }, [isConfirmed, afterOrderConfirm]);

  const { codCouponDisabled, onlineDisabled, ppcodCouponEnabled } =
    useMemo(() => {
      return {
        codCouponDisabled: appliedCoupon?.paymentMethod === "ONLINE",
        onlineDisabled: appliedCoupon?.paymentMethod === "COD",
        ppcodCouponEnabled: appliedCoupon?.ppcodCouponAmount > 0,
      };
    }, [appliedCoupon]);

  const ppcodAmountToTake = ppcodCouponEnabled
    ? appliedCoupon?.ppcodCouponAmount
    : ppcodAmount;

  const isMaxCODDisabled = maxCOD > -1 ? codGrandTotal > maxCOD : false;

  if (pageLoading) return null;

  const OrderSummary = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Accordion
        className=""
        accordionMainContainerClassName="!px-1 "
        header={
          <div
            className="flex w-full items-center justify-between py-3 text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex gap-2">
              <div className="mt-1">
                <BagIcon />
              </div>
              <div className="flex flex-col gap-1">
                <Text as="span" size="base">
                  Order Summary
                </Text>
                <Text as="span" size="sm" className="text-green-600" responsive>
                  You Saved ₹{toDecimal(totalSaved)}
                </Text>
              </div>
              <ToggleArrow open={isOpen} />
            </div>
            <Text as="span" size="lg" className="text-base" responsive>
              ₹{toDecimal(totalAmount)}
            </Text>
          </div>
        }
        imgUrl={""}
        alternativeText={""}
      >
        <div className="flex flex-col gap-3">
          {cartList?.map((product, index) => {
            const isFreeProduct =
              product?.cartItemType === "FREE_PRODUCT" ||
              product?.cartItemType === "AUTO_FREE_PRODUCT";
            return (
              <div
                key={index}
                className="flex w-full gap-2.5 rounded-md border p-2 shadow-sm md:p-2.5"
              >
                <div className="max-h-22 max-w-20 overflow-hidden rounded bg-lime-50">
                  <ProductThumbnail
                    width={170}
                    height={170}
                    imageKey={product?.thumbImage}
                    className="aspect-square h-auto w-full object-contain"
                    isStatic
                    alt="Product Image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Text
                    as="span"
                    size="base"
                    className="line-clamp-2 text-sm"
                    responsive
                  >
                    {product?.title}
                  </Text>
                  {inventoryMapping &&
                    (product.qty > inventoryMapping[product.recordKey] ? (
                      <Text
                        as="span"
                        size="sm"
                        className="mt-auto w-fit rounded-md bg-gray-400 px-2 py-0.5 text-white-a700"
                        responsive
                      >
                        Out of Stock
                      </Text>
                    ) : (
                      <>
                        <ProductPricing
                          price={product?.price}
                          listingPrice={product?.listingPrice}
                          cartItemType={product?.cartItemType}
                          isFreeProduct={isFreeProduct}
                          slug={product?.slug}
                        />
                        {!!product?.qty && (
                          <Text
                            size="sm"
                            as="p"
                            className="my-1 text-gray-500"
                            responsive
                          >
                            Qty: {product?.qty}
                          </Text>
                        )}
                      </>
                    ))}
                </div>
              </div>
            );
          })}
          <div className="mt-1 flex flex-col gap-2">
            <SummaryItem
              label="Subtotal"
              value={totalPrice}
              originalValue={totalListingPrice}
            />
            {!!appliedCoupon && !!couponTotal && (
              <SummaryItem
                label={`Discounts (${appliedCoupon?.code})`}
                value={-couponTotal}
                color="text-green-600"
              />
            )}
            {selectedPaymentMethod === "PREPAID" && prepaidDiscount > 0 && (
              <SummaryItem
                label={`${prepaidDiscountPercent}% Online Payment Discount`}
                value={-prepaidDiscount}
                color="text-green-600"
              />
            )}
            {!!codCharges && (
              <SummaryItem
                label="COD Charges"
                value={appliedCODCharges ? appliedCODCharges : "Free"}
                originalValue={codCharges}
                color={appliedCODCharges ? "text-black-600" : "text-green-600"}
              />
            )}
            <SummaryItem
              label="Shipping"
              value={shippingTotal ? shippingTotal : "Free"}
              originalValue={shippingTotal < 50 ? 50 : null}
              color={shippingTotal ? "text-black-600" : "text-green-600"}
            />
            {!!usableRewards && isRewardApplied && (
              <SummaryItem
                label="WOW Cash"
                value={-usableRewards}
                color="text-green-600"
              />
            )}
          </div>
          <div className="h-px bg-black-900" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col justify-between gap-0.5">
              <div className="flex justify-between gap-2">
                <Heading size="xl" as="h3" responsive>
                  Total
                </Heading>
                <Heading size="xl" as="h3" responsive>
                  ₹{grandTotal.toFixed(2)}
                </Heading>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Text size="xs" as="span" className="text-[#696969]">
                  Inclusive of all taxes
                </Text>
                <Text className="text-green-600" size="sm">
                  You Saved ₹{totalSaved?.toFixed(2)}
                </Text>
              </div>
            </div>
            <Text as="span" size="sm" className="text-gray-600" responsive>
              Estimated delivery within 3-5 days
            </Text>
          </div>
        </div>
      </Accordion>
    );
  };

  return (
    <main className="container-main my-4 flex min-h-[calc(100dvh-170px)] w-full flex-col gap-7 sm:my-6 sm:min-h-[calc(100dvh-180px)] md:min-h-[calc(100dvh-190px)] lg:my-8 lg:min-h-[calc(100dvh-200px)]">
      <PaymentLoader loading={loading} />

      <div className="hidden flex-wrap items-center justify-center gap-2 md:flex">
        <Text as="h3" size="xl" className="uppercase text-gray-600/90">
          1. Shopping Cart
        </Text>
        <ArrowIconSVG size={18} strokeColor="#666666bb" />
        <Text as="h3" size="xl" className="uppercase">
          2. Checkout
        </Text>
        <ArrowIconSVG size={18} />
        <Text as="h3" size="xl" className="uppercase text-gray-600/90">
          3. Order Complete
        </Text>
      </div>

      {cartList.length > 0 && totalListingPrice > 0 ? (
        <div className="mb-14 grid w-full grid-cols-1 gap-5 sm:gap-6 md:mb-0 md:grid-cols-2 md:grid-rows-[auto_auto_1fr] md:gap-x-8 lg:gap-x-10 xl:gap-x-12">
          <div className="md:row-span-3">
            <AddressSection variant="CHECKOUT" />
          </div>

          <OrderSummary />

          <div className="overflow-hidden rounded-md">
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

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <Heading size="2xl" as="h3" className="font-medium" responsive>
                Payment Methods
              </Heading>
              <div className="flex w-full flex-col gap-2 md:gap-2.5">
                {prepaidEnabled && (
                  <PaymentMethods
                    label="Pay Online"
                    id="PREPAID"
                    tag={
                      !!prepaidDiscount &&
                      `EXTRA ${prepaidDiscountPercent}% OFF ${
                        !!maxPrepaidDiscount && `UP TO ₹${maxPrepaidDiscount}`
                      }`
                    }
                    tagVariant="success"
                    description={
                      onlineDisabled
                        ? `Online payment disabled for you coupon "${appliedCoupon?.code}"`
                        : "Pay using credit/debit cards, net-banking, UPI, or digital wallets."
                    }
                    total={prepaidGrandTotal}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onMethodChange={handleMethodChange}
                    disabled={onlineDisabled}
                  />
                )}
                {(ppcodEnabled || codEnabled) && (
                  <PaymentMethods
                    label="Cash On Delivery"
                    id="COD"
                    tag={!!codCharges && `₹${toDecimal(codCharges)} EXTRA`}
                    tagVariant="danger"
                    description={
                      codCouponDisabled
                        ? `COD payment disabled for your coupon "${appliedCoupon?.code}"`
                        : isMaxCODDisabled
                          ? `COD payment is not allowed for orders above ₹${maxCOD}.`
                          : (ppcodEnabled && ppcodAmount) || ppcodCouponEnabled
                            ? `Pay ₹${toDecimal(
                                ppcodAmountToTake,
                              )} now (non-refundable). Rest ₹${toDecimal(
                                codGrandTotal - ppcodAmountToTake,
                              )} on delivery.`
                            : "Pay using Cash on Delivery."
                    }
                    total={codGrandTotal}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onMethodChange={handleMethodChange}
                    disabled={codCouponDisabled || isMaxCODDisabled}
                  />
                )}
              </div>
            </div>

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
                  loading
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

export default Checkout;
