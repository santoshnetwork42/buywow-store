"use client";

import { useEffect, useState } from "react";
import { Gift, Copy, X } from "@/assets/svg/alertIcon";
import { Button } from "@/components/elements";
import SpinWheel from "@/components/partials/SpinTheWheel/SpinWheel";
import { showToast } from "@/components/common/ToastComponent";
import Modal from "@/components/features/Modal";

export default function SpinTheWheel() {
  const [isVisible, setIsVisible] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [previousWin, setPreviousWin] = useState(null);
  const [showCouponBar, setShowCouponBar] = useState(false);

  useEffect(() => {
    // Show the wheel after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Check for previous win
    if (typeof window !== "undefined") {
      const lastWonCode = window.localStorage.getItem("last_won_code");
      if (lastWonCode) {
        const offers = [
          { label: "10% OFF", code: "WIN10" },
          { label: "FREE SHIPPING", code: "FREESHIP" },
          { label: "BUY 1 GET 1", code: "BOGO" },
          { label: "20% OFF", code: "WIN20" },
          { label: "FREE GIFT", code: "GIFT" },
          { label: "VIP ACCESS", code: "VIP" },
        ];

        const win = offers.find((offer) => offer.code === lastWonCode);
        if (win) {
          setPreviousWin(win);
          setShowCouponBar(true);
        }
      }
    }

    return () => clearTimeout(timer);
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
        onClick={() => setShowWheel(true)}
        className={`group fixed bottom-8 left-8 ${
          isVisible && !showCouponBar
            ? "translate-y-0 animate-[bounce_1s_ease-in-out_infinite] opacity-100"
            : "translate-y-16 opacity-0"
        } transition-all duration-700 ease-out`}
        style={{ zIndex: 9999 }}
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-orange-400 opacity-20"></div>

          <div className="text-white relative transform rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-4 shadow-lg transition-transform group-hover:scale-110">
            <div className="border-white relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4">
              <div className="absolute inset-0 bg-orange-500 opacity-50"></div>
              <Gift className="text-white relative z-10 h-8 w-8" />

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
            className="bg-white absolute -top-16 left-0 whitespace-nowrap rounded-full px-4 py-2 font-semibold text-orange-900 opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
            style={{ backgroundColor: "white", zIndex: 9999 }}
          >
            Spin & Win Rewards! 🎁
            <div className="border-t-white absolute -bottom-2 left-8 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent"></div>
          </div>
        </div>
      </button>
      {showCouponBar && previousWin && (
        <div className="text-white fixed bottom-0 left-0 right-0 z-50 transform bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-3 shadow-lg transition-transform">
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
      )}
      <Modal
        isOpen={showWheel}
        onClose={() => setShowWheel(false)}
        modalContainerClassName={
          "bg-gradient-to-b from-orange-50 to-amber-50 md:!w-[600px]"
        }
        title={"  "}
        titleClassName={"mb-1 text-3xl font-bold text-orange-900 md:text-4xl"}
        enableOutsideClick={false}
        bgOpacity={"darker"}
      >
        <SpinWheel />
      </Modal>
    </main>
  );
}
