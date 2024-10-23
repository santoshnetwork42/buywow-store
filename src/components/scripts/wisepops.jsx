import { STORE_ID, WISEPOPS_KEY } from "@/config";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useUpdateUserCoupon } from "@wow-star/utils";
import Script from "next/script";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { showToast } from "@/components/common/ToastComponent";

function Wisepops() {
  const user = useSelector((state) => state.user?.user);
  const { spinTheWheelPlayedEvent, spinTheWheelRewardEvent } =
    useEventsDispatch();
  const [coupons, updateUserCoupon] = useUpdateUserCoupon();

  const beforeFormSubmitHandler = useCallback(
    (event) => {
      const button = event.detail.target.querySelector("button");
      if (button) button.setCustomValidity("");
      spinTheWheelPlayedEvent({ URL: window.location.href });
    },
    [spinTheWheelPlayedEvent],
  );

  const afterFormSubmitHandler = useCallback(
    (event) => {
      const couponValue = event.detail.target.elements["coupon"]?.value;
      if (couponValue && couponValue !== "BETTER LUCK NEXT TIME") {
        updateUserCoupon(couponValue, STORE_ID);
        showToast.success("Your coupon has been availed", "success");
      }
    },
    [updateUserCoupon],
  );

  useEffect(() => {
    const appliedCoupon = coupons?.find((coupon) => coupon?.isExternal);
    if (appliedCoupon) {
      spinTheWheelRewardEvent({
        URL: window.location.href,
        "Reward Type": appliedCoupon.couponType,
        "Reward Won": appliedCoupon.code,
        "Reward Description": appliedCoupon.description,
      });
    }
  }, [coupons, spinTheWheelRewardEvent]);

  useEffect(() => {
    window.addEventListener(
      "wisepops.before-form-submit",
      beforeFormSubmitHandler,
      { passive: true },
    );
    window.addEventListener(
      "wisepops.after-form-submit",
      afterFormSubmitHandler,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "wisepops.before-form-submit",
        beforeFormSubmitHandler,
      );
      window.removeEventListener(
        "wisepops.after-form-submit",
        afterFormSubmitHandler,
      );
    };
  }, [beforeFormSubmitHandler, afterFormSubmitHandler, user]);

  return (
    <Script
      data-cfasync="false"
      src={`https://wisepops.net/loader.js?v=2&h=${WISEPOPS_KEY}`}
      strategy="lazyOnload"
      defer
      onError={(e) => console.error("Error loading Wisepops script:", e)}
    />
  );
}

export default Wisepops;
