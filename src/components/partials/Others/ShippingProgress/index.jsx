import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Text, Img } from "@/components/elements";
import { twMerge } from "tailwind-merge";

const ShippingProgress = ({ freeShippingThreshold, cartValue, className }) => {
  const [animate, setAnimate] = useState(false);

  const { amountAwayFromFreeShipping, progressPercentage, shippingMessage } =
    useMemo(() => {
      if (
        typeof freeShippingThreshold !== "number" ||
        typeof cartValue !== "number"
      ) {
        return {
          amountAwayFromFreeShipping: 0,
          progressPercentage: 0,
          shippingMessage: null,
        };
      }

      const amountAway = Math.max(0, freeShippingThreshold - cartValue);
      const progress = Math.min(100, (cartValue / freeShippingThreshold) * 100);

      const message =
        amountAway > 0 ? (
          <>
            You are <span className="font-bold">₹{amountAway.toFixed(2)}</span>{" "}
            away from FREE shipping.
          </>
        ) : (
          "You've qualified for FREE shipping, Enjoy! 🎉"
        );

      return {
        amountAwayFromFreeShipping: amountAway,
        progressPercentage: progress,
        shippingMessage: message,
      };
    }, [freeShippingThreshold, cartValue]);

  const startAnimation = useCallback(() => {
    setAnimate(false);
    const animationTimer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(animationTimer);
  }, []);

  useEffect(() => {
    return startAnimation();
  }, [cartValue, startAnimation]);

  if (!shippingMessage) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-5 rounded-lg bg-lime-50 px-3 py-2 shadow-sm md:py-3",
        className,
      )}
    >
      <Text size="base" as="p" className="line-clamp-2" responsive>
        {shippingMessage}
      </Text>
      <div className="mr-[5%] flex h-full w-1/2 shrink-0 items-center">
        <div className="relative mt-1 h-1 w-full bg-white-a700_01">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-yellow-900 transition-all duration-1000 ease-in-out"
            style={{ width: animate ? `${progressPercentage}%` : "0%" }}
          />
          <Img
            src="img_shipping_delivery_truck.svg"
            alt="Delivery truck"
            width={20}
            height={20}
            className="absolute top-1/2 -translate-y-1/2 transform transition-all duration-1000 ease-in-out"
            style={{
              left: animate ? `calc(${progressPercentage}% - 4px)` : "0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShippingProgress);
