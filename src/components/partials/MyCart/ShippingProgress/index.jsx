// components/MyCart/ShippingProgress.jsx
import React, { useState, useEffect } from "react";
import { Text, Img } from "@/components/common";

export default function ShippingProgress({ freeShippingThreshold, cartValue }) {
  const [animate, setAnimate] = useState(false);
  const amountAwayFromFreeShipping = Math.max(
    0,
    freeShippingThreshold - cartValue,
  );
  const progressPercentage = Math.min(
    100,
    (cartValue / freeShippingThreshold) * 100,
  );

  useEffect(() => {
    // Trigger animation on mount and when cartValue changes
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [cartValue]);

  return (
    <div className="flex items-center justify-between gap-5 rounded-lg bg-lime-50 px-3 py-2 shadow-sm md:py-3">
      <Text size="base" as="p" className="line-clamp-2" responsive>
        {amountAwayFromFreeShipping > 0 ? (
          <>
            You are
            <span className="font-bold"> ₹{amountAwayFromFreeShipping} </span>
            away from FREE shipping.
          </>
        ) : (
          "You've qualified for FREE shipping, Enjoy! 🎉"
        )}
      </Text>
      <div className="mr-[5%] flex h-full w-1/2 shrink-0 items-center">
        <div className="relative mt-1 h-1 w-full bg-white-a700_01">
          <div
            className={`absolute left-0 top-0 h-full rounded-full bg-yellow-900 transition-all duration-1000 ease-in-out ${
              animate ? "" : "w-0"
            }`}
            style={{ width: animate ? `${progressPercentage}%` : "0%" }}
          ></div>
          <Img
            src="img_shipping_delivery_truck.svg"
            alt="Delivery truck"
            width={20}
            height={20}
            className={`absolute top-1/2 -translate-y-1/2 transform transition-all duration-1000 ease-in-out ${
              animate ? "" : "left-0"
            }`}
            style={{
              left: animate ? `calc(${progressPercentage}% - 4px)` : "0",
            }}
          />
        </div>
      </div>
    </div>
  );
}
