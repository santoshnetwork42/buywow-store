"use client";

import { Gift } from "@/assets/svg/alertIcon";
import { showToast } from "@/components/common/ToastComponent";
import Modal from "@/components/features/Modal";
import SpinWheel from "@/components/partials/SpinTheWheel/SpinWheel";
import { STORE_PREFIX } from "@/config";
import { useEventsDispatch } from "@/store/sagas/dispatch/events.dispatch";
import { useEffect, useState } from "react";

export default function SpinTheWheel() {
  const [isVisible, setIsVisible] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [previousWin, setPreviousWin] = useState(null);
  const [showCouponBar, setShowCouponBar] = useState(false);
  const { spinTheWheelClickedEvent } = useEventsDispatch();

  useEffect(() => {
    const lastWonCode = window.localStorage.getItem(
      STORE_PREFIX + "_" + "last_won_code",
    );
    // Show the wheel after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Show the modal after a short delay
    const modalTimer = setTimeout(() => {
      if (!lastWonCode) setShowWheel(true);
    }, 6000);

    // Check for previous win
    if (lastWonCode) {
      const offers = [
        { label: "15% OFF", code: "SPIN15485vgc" },
        { label: "BUY 2 GET 2", code: "SPINBG159qlf7e" },
        { label: "BUY 1 GET 1", code: "SPINBG4WCVZS" },
        { label: "20% OFF", code: "SPIN20N43JRO" },
        { label: "FREE GIFT", code: "SPINFGTILC2RV" },
        { label: "30% OFF", code: "SPIN30ODRZ3W" },
      ];
      const win = offers.find((offer) => offer.code === lastWonCode);
      if (win) {
        setPreviousWin(win);
        // setShowCouponBar(true);
      }
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(modalTimer);
    };
  }, []);

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast.success("Coupon code copied to clipboard!");
    } catch (err) {
      showToast.error("Failed to copy code. Please try again.");
    }
  };

  return (
    <main className="relative bg-gradient-to-b from-orange-50 to-amber-50">
      <button
        onClick={() => {
          setShowWheel(true);
          spinTheWheelClickedEvent({ event: "spin_the_wheel_clicked" });
        }}
        className={`group fixed md:bottom-8 md:left-8 ${
          isVisible && !showCouponBar
            ? "translate-y-0 opacity-100 md:animate-[bounce_1s_ease-in-out_infinite]"
            : "translate-y-16 opacity-0"
        } bottom-36 left-0 transition-all duration-100 ease-out md:duration-700`}
        style={{ zIndex: showWheel ? 10 : 9999 }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 md:animate-ping"></div>
          <div className="text-white relative transform rounded-none rounded-r-full bg-gradient-to-br from-orange-500_01 to-orange-600 p-2 shadow-lg transition-transform group-hover:scale-110 md:rounded-full md:p-4">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[3px] !border-white-a700 md:h-16 md:w-16 md:border-4">
              <div className="absolute inset-0 bg-orange-500_01 opacity-50"></div>
              <Gift
                className="text-white relative z-10 h-5 w-5 md:h-8 md:w-8"
                color={"white"}
              />

              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
          <div
            className="bg-white absolute -left-2 -top-16 whitespace-nowrap rounded-full px-4 py-2 font-semibold text-orange-900 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:left-0"
            style={{ backgroundColor: "white", zIndex: 9999 }}
          >
            {`Spin & Win Rewards! 🎁`}
            <div className="border-t-white absolute -bottom-2 left-8 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent"></div>
          </div>
        </div>
      </button>
      {/* {showCouponBar && previousWin && (
        <div
          className="to-orange-500_01 fixed bottom-0 left-0 right-0 z-50 transform bg-gradient-to-r from-orange-600 px-4 py-3 shadow-md transition-transform md:shadow-lg"
          style={{ color: "white" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:flex md:h-12 md:w-12">
                <Gift className="text-white h-6 w-6 animate-pulse md:h-7 md:w-7" />
              </div>
              <p className="text-sm font-medium md:text-base">
                Your coupon code is reserved for a limited time! Use{" "}
                <span className="bg-white/20 rounded px-2 py-1 font-mono font-bold">
                  {previousWin.code}
                </span>{" "}
                at checkout to get {previousWin.label}.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowCouponBar(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </div>
      )} */}
      <Modal
        isOpen={showWheel}
        onClose={() => setShowWheel(false)}
        modalContainerClassName={
          "bg-gradient-to-b from-orange-50 to-amber-50 md:!w-[600px]"
        }
        title={"  "}
        titleClassName={
          "mb-1 text-3xl font-bold text-orange-900 md:text-4xl text-orange-800"
        }
        enableOutsideClick={false}
        bgOpacity={"darker"}
      >
        <SpinWheel />
      </Modal>
    </main>
  );
}
