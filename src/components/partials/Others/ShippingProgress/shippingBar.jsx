import { Button, Heading, Img, Text } from "@/components/elements";
import Modal from "@/components/features/Modal";
import Confetti from "@/components/features/Modal/Confetti";
import { useNavbar } from "@wow-star/utils-cms";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const FreeShippingModal = ({ isOpen, onClose, appliedCoupon }) => (
  <Modal
    isOpen={isOpen}
    showMobileView={false}
    onClose={onClose}
    showConfetti={true}
    modalContainerClassName="max-w-[min(400px,88vw)] z-10 w-full p-0 rounded overflow-hidden md:w-full"
  >
    <div className="flex items-center justify-between px-5 py-1">
      <div className="flex flex-col gap-1">
        <Heading
          as="h3"
          size="xl"
          className="text-lg font-bold text-yellow-900"
          responsive
        >
          {`Free Shipping`}
        </Heading>
      </div>
      <div className="aspect-square size-[68px]">
        <Img
          src="img_shipping_delivery_truck.svg"
          width={50}
          height={50}
          alt="Coupon"
          className="aspect-square h-auto w-full"
          isStatic
        />
      </div>
    </div>
    <div className="flex flex-col items-center gap-4 bg-deep_orange-50_03 px-5 py-4">
      <div className="flex w-full flex-col gap-1">
        <Heading as="h5" size="base" className="text-sm" responsive>
          {`You've qualified for FREE shipping, Enjoy! 🎉`}
        </Heading>
        {/* <Text
          as="span"
          size="sm"
          className="line-clamp-3"
          dangerouslySetInnerHTML={{ __html: appliedCoupon?.description }}
          responsive
        /> */}
      </div>
      <Button variant="primary" size="small" onClick={onClose}>
        Okay
      </Button>
    </div>
  </Modal>
);

export default function ShippingProgressBar({ cartValue = 0 }) {
  const appliedCoupon = useSelector((state) => state.cart?.coupon);
  const maxProgressQuantity = useSelector((state) => state.nudge.maxQuantity);
  const { shippingTiers = [] } = useNavbar();

  const [showShippingConfetti, setShowShippingConfetti] = useState(false);

  const customShippingTiers = useMemo(() => {
    const filtered = shippingTiers
      ?.filter((tier) => tier?.type === "CUSTOM")
      ?.sort((a, b) => (b?.amount || 0) - (a?.amount || 0));
    return filtered;
  }, [shippingTiers]);

  const isCustomShippingTierApplicable = useMemo(() => {
    return shippingTiers?.some(
      (tier) =>
        tier?.type === "COUPON" &&
        tier?.coupons?.includes(appliedCoupon?.id) &&
        (tier?.paymentType === "PREPAID" || tier?.paymentType === "ALL"),
    );
  }, [shippingTiers, appliedCoupon]);

  const currentShippingTierIndex = customShippingTiers?.findIndex(
    (i) => i.minOrderValue <= cartValue && i.maxOrderValue > cartValue,
  );

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { amountAway, progress } = useMemo(() => {
    const freeShippingThreshold = customShippingTiers?.at(-1)?.maxOrderValue;
    const away = Math.max(0, freeShippingThreshold - cartValue + 1);
    const tierSize = 100 / (customShippingTiers.length + 1);
    const currentTier = customShippingTiers[currentShippingTierIndex] || {};
    const tierProgress =
      ((cartValue - (currentTier?.minOrderValue || 0)) /
        ((currentTier?.maxOrderValue || 0) -
          (currentTier?.minOrderValue || 0))) *
      tierSize;

    const progress = Math.min(
      tierSize * currentShippingTierIndex + tierProgress,
      100,
    );

    return {
      amountAway: away,
      progress: Math.min(progress, 100),
    };
  }, [customShippingTiers, cartValue]);

  const message = useMemo(() => {
    return amountAway > 0 ? (
      <>
        You are <span className="font-bold">₹{amountAway.toFixed(0)}</span> away
        from FREE shipping.
      </>
    ) : (
      "You've qualified for FREE shipping, Enjoy! 🎉"
    );
  }, [amountAway]);

  useEffect(() => {
    setShowShippingConfetti(amountAway <= 0);
  }, [amountAway]);

  if (isCustomShippingTierApplicable || maxProgressQuantity > 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-orange-50 p-2 text-center">
      {showShippingConfetti && (
        <>
          {/* <FreeShippingModal
            isOpen={isModalOpen}
            isClose={() => setIsModalOpen(false)}
          /> */}
          <Confetti />
        </>
      )}
      <div className="flex justify-center gap-x-2">
        <div className="z-10 flex flex-col items-center">
          <div>
            <Img
              src="img_shipping_delivery_truck.svg"
              width={50}
              height={50}
              alt="Coupon"
              className="aspect-square h-auto w-full"
              isStatic
            />
          </div>
        </div>
        <Text size="sm" as="p" className="line-clamp-2">
          {message}
        </Text>
      </div>
      <div className="progress-bar relative flex items-center">
        {/* Progress Line */}
        <div class="absolute left-0 right-0 top-1/2 z-10 h-1 rounded-full bg-gray-300 transition-all duration-300">
          <div
            class="h-full rounded-full bg-yellow-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Dots */}
        {customShippingTiers.map((tier, index) => (
          <div
            key={tier.id}
            className={`circle-${index} z-10 mt-2 flex flex-1 flex-col items-end`}
          >
            <Text
              size="xs"
              className={twMerge(
                `flex h-7 w-7 items-center justify-center rounded-full px-1 text-[12px] font-medium md:h-8 md:w-8 md:text-sm`,
                currentShippingTierIndex === index ? "animate-pulse-glow" : "",
                currentShippingTierIndex >= index ||
                  currentShippingTierIndex === -1
                  ? "bg-yellow-900 text-white-a700_01 duration-700"
                  : "bg-gray-300 text-black-900 duration-300",
              )}
            >
              ₹{tier.amount}
            </Text>
          </div>
        ))}
        <div
          key={""}
          className="circle-free z-10 mt-2 flex flex-1 flex-col items-end justify-center"
        >
          <Text
            size="xs"
            className={`flex h-7 w-7 items-center justify-center rounded-full px-1 text-[12px] font-medium md:h-8 md:w-8 md:text-sm ${amountAway <= 0 ? "animate-pulse-glow bg-yellow-900 text-white-a700" : "bg-gray-300 text-black-900"}`}
          >
            {`Free`}
          </Text>
          {/* <div className="text-xs">
            {" "}
            Above ₹{customShippingTiers?.at(-1)?.maxOrderValue}
          </div> */}
        </div>
        {/* Free Shipping */}
      </div>
    </div>
  );
}
