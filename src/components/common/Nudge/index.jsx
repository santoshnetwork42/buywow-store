import GiftIcon from "@/assets/svg/gift";
import { useSelector } from "react-redux";

const IntegratedProgressStepper = ({
  steps,
  appliedCoupon,
  currQuantity,
  maxQuantity,
  isCart,
}) => {
  if (maxQuantity <= 0 || currQuantity <= 0 || steps <= 0) return;

  // Ensure currQuantity doesn't exceed maxQuantity
  const safeCurrentQuantity = Math.min(currQuantity, maxQuantity);

  // Calculate progress percentage
  const progressPercentage = (safeCurrentQuantity / maxQuantity) * 100;

  // Determine the next step based on currQuantity
  const nextStepIndex = steps?.findIndex(
    (step) => safeCurrentQuantity < step.quantity,
  );

  // Find the index of the applied coupon
  // const appliedCouponIndex = steps
  //   ? steps.findIndex((step) => step.code === appliedCoupon?.code)
  //   : -1;

  // Determine the current step based on currQuantity
  // const currentStepIndex = steps?.findIndex(
  //   (step) => safeCurrentQuantity > step.quantity,
  // );

  let nudgeMsg = "";
  if (nextStepIndex === -1) {
    if (steps?.length > 1) {
      nudgeMsg = "🥳" + "You have unlocked all Offers!";
    } else if (steps?.length === 1) {
      const coupon = steps[0];
      if (coupon.couponType === "BUY_X_AT_Y")
        nudgeMsg = `Congrats, your Buy ${coupon.buyXQuantity} @ ₹${coupon?.getYAmount} offer has been availed!`;
      else if (coupon.couponType === "BUY_X_GET_Y")
        nudgeMsg = `Congrats, your Buy  ${coupon.buyXQuantity} Get ${coupon?.getYQuantity}  offer has been availed!`;
    }
  }
  if (nextStepIndex !== -1) {
    const coupon = steps[nextStepIndex];
    const remainingQty = Math.max(coupon.quantity - currQuantity, 0);
    if (remainingQty === 0) {
      nudgeMsg = "🥳  You have unlocked all Offers!";
    } else if (coupon.couponType === "BUY_X_AT_Y") {
      nudgeMsg = `Add ${remainingQty} more ${remainingQty === 1 ? "item" : "items"} to unlock  Buy ${coupon.buyXQuantity} At  ₹${coupon?.getYAmount} Offer`;
    } else if (coupon.couponType === "BUY_X_GET_Y") {
      nudgeMsg = `Add ${remainingQty} more ${remainingQty === 1 ? "item" : "items"} to unlock  Buy ${coupon.buyXQuantity} Get ${coupon?.getYQuantity} Free`;
    }
  }

  return (
    <div
      className={`w-full rounded-lg bg-deep_orange-50 px-4 ${isCart ? "py-12" : "pb-10 pt-12"}`}
    >
      <div className="relative">
        <div className="absolute top-0 -mt-9 w-full text-center text-[14px] !leading-3">
          {nudgeMsg}
        </div>
        {/* Progress Bar */}
        <div className="h-1 rounded-full bg-gray-200">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="h-full rounded-full bg-yellow-900 transition-all duration-300 ease-in-out"
          ></div>
        </div>

        {/* Current and Max Quantity */}
        {/* <div className="absolute -top-8 left-0 mt-2 flex w-full justify-between text-xs text-gray-600">
          <span>{safeCurrentQuantity}</span>
          <span>{maxQuantity}</span>
        </div> */}

        {/* Steps */}
        <div className="absolute left-0 top-0 -mt-4 flex w-full justify-between">
          {steps?.map((step, index) => {
            const stepPosition = (step.quantity / maxQuantity) * 100;
            const isMarked = step.quantity <= currQuantity;
            const isNextIndex = nextStepIndex === index;

            return (
              <div
                key={step.code}
                className="absolute left-3 flex justify-end pr-1 md:pr-2"
                style={{
                  width: `${(100 / maxQuantity) * (step.buyXQuantity + (step.getYQuantity || 0))}%`,
                }}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-white-a700_01 transition-all duration-300 ease-in-out ${isNextIndex ? "animate-pulse-glow shadow-[0_0_5px_5px_rgba(59,130,246,0.5)]" : ""} ${isMarked ? "ring-2 ring-green-600 ring-opacity-50" : "ring-2 ring-gray-400 ring-opacity-10"} `}
                  >
                    {<GiftIcon color={isMarked ? "#16a34a" : "#c2c3c7"} />}
                  </div>
                  <div className="flex flex-col text-center transition-all duration-300 ease-in-out">
                    <span
                      className={`block text-xs font-medium ${isMarked ? "text-green-600" : "text-gray-600"} !leading-3 transition-all duration-300 ease-in-out`}
                    >
                      {step.code}
                    </span>
                    {isCart && (
                      <span
                        className={`block text-xs font-medium !leading-3 ${isMarked ? "text-green-600" : "text-gray-600"} transition-all duration-300 ease-in-out`}
                      >
                        {`On ${step.quantity} Products`}
                      </span>
                    )}
                  </div>
                </div>
                {/* 
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-center">
                    <span className="text-xs font-medium text-gray-500 transition-all duration-300 ease-in-out">
                      {step.quantity}
                    </span>
                  </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Nudge = ({ isCart = false }) => {
  const nudgeFeat = useSelector((state) => state.nudge.applicableCoupons);
  const currQuantity = useSelector((state) => state.nudge.currQuantity);
  const maxProgressQuantity = useSelector((state) => state.nudge.maxQuantity);
  const appliedCoupon = useSelector((state) => state.cart?.coupon);

  const steps = nudgeFeat.map((i) => ({
    ...i,
    quantity: i.buyXQuantity + (i?.getYQuantity || 0),
  }));

  return (
    <div className="w-full">
      <IntegratedProgressStepper
        steps={steps}
        appliedCoupon={appliedCoupon}
        currQuantity={currQuantity}
        maxQuantity={maxProgressQuantity}
        isCart={isCart}
      />
    </div>
  );
};

export default Nudge;

// isFeatured and isPDPFeatured and isAffiliated
