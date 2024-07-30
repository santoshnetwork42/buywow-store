"use client";

import { Button, Heading, Text } from "@/components/common";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { STORE_ID } from "../../../../../config";

export default function OrderSection() {
  const cartData = useSelector((state) => state.cart);
  const totalCartItemsCount = cartData?.data?.length || 0;

  const [selectedMethod, setSelectedMethod] = useState("");

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
      referrer: "http://localhost:3002/",
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
      appliedRewardPoints: false ? usableRewards : 0,
      totalAmount: cartData.subTotal,
      shoppingCartId: uuidv4(),
      source: "WEB",
      totalCashbackEarned: 0,
    };
    
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
            <div className="flex w-full cursor-pointer gap-2 rounded-md border bg-white-a700_01 p-4">
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
