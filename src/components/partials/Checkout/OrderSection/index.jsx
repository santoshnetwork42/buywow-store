"use client";

import PaymentMethods from "@/components/blocks/PaymentMethods/paymentMethod";
import { Button, Heading } from "@/components/elements";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

let razorpayMethod;

export default function OrderSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartData = useSelector((state) => state.cart);
  const { currentAddress } = useSelector((state) => state.address);

  const totalCartItemsCount = cartData?.data?.length || 0;

  const [selectedMethod, setSelectedMethod] = useState("PREPAID");
  const maxCOD = useConfiguration(MAX_COD_AMOUNT, -1);
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);
  const maxPrepaidDiscount = useConfiguration(MAX_PREPAID_DISCOUNT, 0);
  const codEnabled = useConfiguration(COD_ENABLED, true);
  const ppcodEnabled = useConfiguration(PPCOD_ENABLED, false);
  const ppcodAmount = useConfiguration(PPCOD_AMOUNT, 0);

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
    amountNeededToAvailCodCashback,
    amountNeededToAvailPrepaidCashback,
  } = useCartTotal({
    paymentType: selectedMethod,
    isRewardApplied,
  });

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
  };

  const afterOrderConfirm = async () => {
    if (isConfirmed && finalOrder) {
      if (razorpayMethod) {
        razorpayMethod.close();
      }
      await router.push(`/order/${finalOrder.id}`);
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      afterOrderConfirm();
    }
  }, [isConfirmed]);

  //need to add condition based on applied coupon
  const ppcodAmountToTake = ppcodAmount;

  const isMaxCODDisabled = maxCOD > -1 ? codGrandTotal > maxCOD : false;

  return (
    <div className="flex flex-col gap-4">
      <Heading size="2xl" as="h3" responsive>
        Payment Methods
      </Heading>
      <div className="flex w-full flex-col gap-2">
        <PaymentMethods
          label="Pay Online"
          id="PREPAID"
          description="Pay using credit/debit cards, net-banking, UPI, or digital wallets."
          total={prepaidGrandTotal}
          selectedMethod={selectedMethod}
          handleMethodChange={handleMethodChange}
        />
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
      </div>

      <Button
        variant="primary"
        className="p-3 text-xl"
        onClick={placeOrderHandler}
      >
        Place Order
      </Button>
      {/* {selectedMethod && (
        <p>
          You have selected:{" "}
          {paymentMethods.find((m) => m.id === selectedMethod).label}
        </p>
      )} */}
    </div>
  );
}
