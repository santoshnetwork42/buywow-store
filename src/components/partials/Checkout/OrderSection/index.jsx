"use client";

import { Button, Heading, Text } from "@/components/elements";
import { useNavBarState } from "@/utils/context/navbar";
import { checkAffiseValidity } from "@/utils/helpers";
import loadScript from "@/utils/loadScript";
import { useCartTotal, useOrders } from "@wow-star/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RAZORPAY_KEY, RAZORPAY_SCRIPT } from "@/config";

let razorpayMethod;

export default function OrderSection() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const totalCartItemsCount = cartData?.data?.length || 0;

  const [selectedMethod, setSelectedMethod] = useState("PREPAID");

  const paymentMethods = [
    {
      id: "PREPAID",
      label: "PrePaid",
      desc: "Pay using credit/debit cards, net-banking, UPI, or digital wallets.",
    },
    {
      id: "COD",
      label: "Cash on Delivery",
      desc: "Pay using Cash on Delivery.",
    },
  ];

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
    const shippingAddress = {
      firstName: "Piyush",
      lastName: "Jain",
      phone: "+919909772852",
      country: "IN",
      state: "AN",
      city: "Surat",
      pinCode: "395007",
      landmark: "",
      address: "Tessstttt",
      area: "",
    };

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

  return (
    <div className="flex flex-col gap-4">
      <Heading size="2xl" as="h3" responsive>
        Payment Methods
      </Heading>
      <div className="flex w-full flex-col gap-2">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex w-full cursor-pointer items-center gap-2 shadow-xs"
            onClick={() => {
              handleMethodChange(method.id);
            }}
          >
            <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-white-a700_01 p-4">
              <div className="flex gap-2">
                <div>
                  <input
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Text htmlFor={method.id} className="w-full cursor-pointer">
                    {method.label}
                  </Text>
                  <Text
                    htmlFor={method.id}
                    size="sm"
                    className="w-full cursor-pointer font-light"
                  >
                    {method.desc}
                  </Text>
                </div>
              </div>
              <div>
                <Text size="lg">
                  ₹
                  {method.id === "COD"
                    ? codGrandTotal.toFixed(2)
                    : prepaidGrandTotal.toFixed(2)}
                </Text>
              </div>
            </div>
          </div>
        ))}
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
