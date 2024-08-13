"use client";

import { BagIcon } from "@/assets/svg/icons";
import PaymentMethods from "@/components/blocks/PaymentMethods/paymentMethod";
import Address from "@/components/common/Address";
import SummaryItem from "@/components/common/CheckoutSummaryItem";
import { showToast } from "@/components/common/ToastComponent";
import { Button, Heading, Text } from "@/components/elements";
import Accordion from "@/components/features/Accordion";
import ToggleArrow from "@/components/features/Accordion/AccordionToggle";
import ProductThumbnail from "@/components/partials/Product/ProductThumbnail";
import { RAZORPAY_KEY, RAZORPAY_SCRIPT } from "@/config";
import { useNavBarState } from "@/utils/context/navbar";
import {
  COD_ENABLED,
  MAX_COD_AMOUNT,
  PPCOD_AMOUNT,
  PPCOD_ENABLED,
  PREPAID_ENABLED,
} from "@/utils/data/wowStarConstants";
import { checkAffiseValidity, nameSplitter, toDecimal } from "@/utils/helpers";
import loadScript from "@/utils/loadScript";
import {
  MAX_PREPAID_DISCOUNT,
  useCartTotal,
  useConfiguration,
  useOrders,
} from "@wow-star/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

let razorpayMethod;

export default function OrderSection() {
  const router = useRouter();
  const cartData = useSelector((state) => state.cart);
  const { currentAddress } = useSelector((state) => state.address);

  const [selectedMethod, setSelectedMethod] = useState("PREPAID");

  const maxCOD = useConfiguration(MAX_COD_AMOUNT, -1);
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const maxPrepaidDiscount = useConfiguration(MAX_PREPAID_DISCOUNT, 0);
  const codEnabled = useConfiguration(COD_ENABLED, true);
  const ppcodEnabled = useConfiguration(PPCOD_ENABLED, false);
  const ppcodAmount = useConfiguration(PPCOD_AMOUNT, 0);

  useEffect(() => {
    if (prepaidEnabled) {
      setSelectedMethod("PREPAID");
    } else if (codEnabled || ppcodEnabled) {
      setSelectedMethod("COD");
    }
  }, [codEnabled, prepaidEnabled, ppcodEnabled]);

  const handleMethodChange = (id) => {
    setSelectedMethod(id);
  };

  const { isRewardApplied } = useNavBarState();

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
  } = useCartTotal({
    paymentType: selectedMethod,
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
      paymentMethod: selectedMethod,
      address: shippingAddress,
      metadata: metaData,
      appliedRewardPoints: null,
      totalAmount: totalAmount,
      shoppingCartId: uuidv4(),
      source: "WEB",
      totalCashbackEarned:
        selectedMethod === "COD"
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
        showToast.error("Please Add Address to Proceed");
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
      if (razorpayMethod) {
        razorpayMethod.close();
      }
      router.push(`/order/${finalOrder.id}`);
    }
  }, [isConfirmed, finalOrder, router]);

  useEffect(() => {
    if (isConfirmed) {
      void afterOrderConfirm(); // Using `void` to ignore the Promise returned by afterOrderConfirm
    }
  }, [isConfirmed, afterOrderConfirm]);

  //need to add condition based on applied coupon
  const ppcodAmountToTake = ppcodAmount;

  const isMaxCODDisabled = maxCOD > -1 ? codGrandTotal > maxCOD : false;

  const OrderSummary = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Accordion
        title=""
        header={
          <div
            className="flex w-full justify-between py-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex w-full gap-2">
              <div className="mt-1">
                <BagIcon size={18} />
              </div>
              <div className="flex flex-col">
                <Text>Order Summary</Text>
                <Text className="font-light text-green-600" size="sm">
                  You Saved ₹{totalSaved?.toFixed(2)}
                </Text>
              </div>
              <ToggleArrow open={isOpen} />
            </div>
            <div>
              <Text>₹{grandTotal?.toFixed(2)}</Text>
            </div>
          </div>
        }
        imgUrl={""}
        alternativeText={""}
      >
        <div className="flex flex-col gap-3">
          {cartData?.data?.map((product, index) => {
            const showStrikedPrice = product?.price < product?.listingPrice;
            return (
              <div key={index} className="flex w-full gap-2 py-2 shadow-sm">
                <div className="max-h-22 max-w-20 rounded-md bg-lime-50 p-1">
                  <ProductThumbnail
                    width={170}
                    height={170}
                    imageKey={product?.images?.items[0]?.imageKey}
                    className="aspect-[65/77] h-auto w-full object-contain md:aspect-square"
                    isStatic
                    alt="Product Image"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Text responsive className="line-clamp-2">
                    {product?.title}
                  </Text>
                  <div className="flex items-center gap-2">
                    {!!showStrikedPrice && (
                      <Text
                        size="sm"
                        as="p"
                        className="capitalize line-through"
                        responsive
                      >
                        ₹{product?.listingPrice}
                      </Text>
                    )}
                    <Text responsive>{product?.price}</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text responsive>Qty:</Text>
                    <Text responsive>{product?.qty}</Text>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col gap-2">
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
            {prepaidDiscount > 0 && (
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
          <div className="flex flex-col">
            <div className="flex flex-col justify-between">
              <div className="flex justify-between gap-1">
                <Heading size="xl" as="h3" responsive>
                  Total
                </Heading>
                <Heading size="xl" as="h3" responsive>
                  ₹{grandTotal.toFixed(2)}
                </Heading>
              </div>
              <div className="flex items-center justify-between">
                <Text size="xs" as="span" className="text-[#696969]">
                  Inclusive of all taxes
                </Text>
                <Text className="font-light text-green-600" size="sm">
                  You Saved ₹{totalSaved?.toFixed(2)}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Accordion>
    );
  };

  return (
    <div className="container-main mb-8 flex w-full flex-col justify-center gap-8 py-4 sm:gap-10 md:flex-row lg:gap-12">
      <div className="order-1 md:hidden">
        <OrderSummary />
      </div>

      <div className="order-2 md:order-1 md:w-6/12">
        <Address />
      </div>
      <div className="order-3 flex h-full flex-col justify-between gap-4 md:order-2">
        <div className="hidden md:order-2 md:block">
          <OrderSummary />
        </div>

        <div className="flex h-full flex-col justify-between gap-4 md:order-3">
          <Heading size="2xl" as="h3" responsive>
            Payment Methods
          </Heading>
          <div className="flex w-full flex-col gap-2">
            {prepaidEnabled && (
              <PaymentMethods
                label="Pay Online"
                id="PREPAID"
                description="Pay using credit/debit cards, net-banking, UPI, or digital wallets."
                total={prepaidGrandTotal}
                selectedMethod={selectedMethod}
                handleMethodChange={handleMethodChange}
              />
            )}
            {(ppcodEnabled || codEnabled) && (
              <PaymentMethods
                label="Cash On Delivery"
                id="COD"
                description={
                  ppcodEnabled && ppcodAmount
                    ? `Pay ₹${toDecimal(
                        ppcodAmountToTake,
                      )} now (non-refundable). Rest ₹${toDecimal(
                        codGrandTotal - ppcodAmountToTake,
                      )} on delivery.`
                    : "Pay using Cash on Delivery."
                }
                total={codGrandTotal}
                selectedMethod={selectedMethod}
                handleMethodChange={handleMethodChange}
                disabled={isMaxCODDisabled}
              />
            )}
          </div>

          <Button
            variant="primary"
            className="p-3 text-xl"
            onClick={placeOrderHandler}
            loader={loading}
            loaderClass="ml-2"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
