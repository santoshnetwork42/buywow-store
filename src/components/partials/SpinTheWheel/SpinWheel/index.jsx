"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/elements";
import {
  Gift,
  Volume2,
  VolumeX,
  Copy,
  ExternalLink,
  Timer,
  X,
} from "@/assets/svg/alertIcon";
import confetti from "canvas-confetti";
import { showToast } from "@/components/common/ToastComponent";
import Modal from "@/components/features/Modal";
import { STORE_PREFIX } from "@/config";

const SPINNING_TIME = 5000;
const ROTATION_DEGREES = 360 * 5;
const SHOP_BASE_URL = "https://www.buywow.in/collections/all";

const WHEEL_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/2006/2006-preview.mp3";
const WIN_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3";

const STORAGE_KEY = STORE_PREFIX + "_" + "wheel_claimed_percentage";
const STORAGE_TIME_KEY = STORE_PREFIX + "_" + "wheel_first_visit";
const ATTEMPTS_KEY = STORE_PREFIX + "_" + "wheel_spin_attempts";
const MAX_ATTEMPTS = 1;
const MIN_START_PERCENTAGE = 65;
const MAX_START_PERCENTAGE = 75;
const MAX_PERCENTAGE = 95;

const offers = [
  { label: "10% OFF", color: "#E67E22", code: "SPIN10%OFF", weight: 30 },
  { label: "BUY 8 @ 1000", color: "#8B4513", code: "SPINBUY8", weight: 25 },
  { label: "BUY 1 GET 1", color: "#F39C12", code: "SPINWOW", weight: 5 },
  { label: "20% OFF", color: "#A0522D", code: "SPIN20%OFF", weight: 10 },
  { label: "FREE GIFT", color: "#FFA500", code: "FREEGIFT", weight: 15 },
  { label: "30% OFF", color: "#CD853F", code: "SPIN30%OFF", weight: 15 },
];

const totalWeight = offers.reduce((sum, offer) => sum + offer.weight, 0);

function getWeightedRandomIndex() {
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (let i = 0; i < offers.length; i++) {
    weightSum += offers[i].weight;
    if (random <= weightSum) {
      return i;
    }
  }

  return offers.length - 1;
}

function calculateInitialPercentage() {
  if (typeof window === "undefined") return MIN_START_PERCENTAGE;

  const storedPercentage = window.localStorage.getItem(STORAGE_KEY);
  const firstVisitTime = window.localStorage.getItem(STORAGE_TIME_KEY);

  if (storedPercentage && firstVisitTime) {
    const hoursPassed =
      (Date.now() - parseInt(firstVisitTime)) / (1000 * 60 * 60);
    const basePercentage = parseFloat(storedPercentage);
    const increase = Math.min(hoursPassed * 2, 20);
    return Math.min(basePercentage + increase, MAX_PERCENTAGE);
  }

  const initialPercentage =
    MIN_START_PERCENTAGE +
    Math.random() * (MAX_START_PERCENTAGE - MIN_START_PERCENTAGE);

  window.localStorage.setItem(STORAGE_KEY, initialPercentage.toString());
  window.localStorage.setItem(STORAGE_TIME_KEY, Date.now().toString());

  return initialPercentage;
}

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [claimedPercentage, setClaimedPercentage] = useState(70);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [showMaxAttemptsDialog, setShowMaxAttemptsDialog] = useState(false);
  const wheelAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const wheelRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    wheelAudioRef.current = new Audio(WHEEL_SOUND_URL);
    winAudioRef.current = new Audio(WIN_SOUND_URL);

    const firstVisitTime = window.localStorage.getItem(STORAGE_TIME_KEY);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (now - firstVisitTime > twentyFourHours) {
      window.localStorage.removeItem(STORE_PREFIX + "_" + "last_won_code");
      window.localStorage.setItem(STORAGE_TIME_KEY, Date.now().toString());
      window.localStorage.setItem(ATTEMPTS_KEY, String(0));
      window.localStorage.setItem(STORAGE_KEY, String(MAX_START_PERCENTAGE));
    }

    const usedAttempts = parseInt(
      window.localStorage.getItem(ATTEMPTS_KEY) || "0",
    );
    setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - usedAttempts));

    try {
      const initialPercentage = calculateInitialPercentage();
      setClaimedPercentage(initialPercentage);
    } catch (error) {
      console.error("Error initializing percentage:", error);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastUpdateRef.current;

      setClaimedPercentage((prev) => {
        const increase = (timeDiff / (1000 * 60)) * 0.1;
        const newValue = Math.min(prev + increase, MAX_PERCENTAGE);

        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, newValue.toString());
          }
        } catch (error) {
          console.error("Error saving percentage:", error);
        }

        return newValue;
      });

      lastUpdateRef.current = now;
    }, 30000);

    return () => {
      if (wheelAudioRef.current) {
        wheelAudioRef.current.pause();
        wheelAudioRef.current = null;
      }
      if (winAudioRef.current) {
        winAudioRef.current.pause();
        winAudioRef.current = null;
      }
      clearInterval(interval);
    };
  }, []);

  const playSound = async (audio) => {
    if (isSoundEnabled && audio) {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = duration - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast.success("Coupon code copied to clipboard!");
    } catch (err) {
      showToast.error("Failed to copy code. Please try again.");
    }
  };

  const getShoppingUrl = (code) => {
    return `${SHOP_BASE_URL}?couponCode=${code}`;
  };

  const getPreviousWin = () => {
    if (typeof window === "undefined") return null;

    const code = window.localStorage.getItem(
      STORE_PREFIX + "_" + "last_won_code",
    );
    if (code) {
      return offers.find((offer) => offer.code === code);
    }
    return null;
  };

  const saveWinningOffer = (offer) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORE_PREFIX + "_" + "last_won_code",
      offer.code,
    );
  };

  const spinWheel = () => {
    if (isSpinning) return;

    if (attemptsLeft <= 0) {
      setShowMaxAttemptsDialog(true);
      return;
    }

    setIsSpinning(true);
    setSelectedOffer(null);

    const currentAttempts = parseInt(
      window.localStorage.getItem(ATTEMPTS_KEY) || "0",
    );
    window.localStorage.setItem(ATTEMPTS_KEY, (currentAttempts + 1).toString());
    setAttemptsLeft((prev) => prev - 1);

    playSound(wheelAudioRef.current);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
      wheelRef.current.offsetHeight;
      wheelRef.current.style.transition =
        "transform 5s cubic-bezier(0.32, 0.94, 0.60, 1)";
    }

    const randomSlice = getWeightedRandomIndex();
    const sliceSize = 360 / offers.length;
    // const targetRotation = 360 - (randomSlice * sliceSize + sliceSize / 2);
    const targetRotation =
      (360 - (randomSlice * sliceSize + sliceSize / 2) + 90) % 360;

    const totalRotation = ROTATION_DEGREES + targetRotation;
    setRotation(totalRotation);

    setTimeout(() => {
      const selected = offers[randomSlice];
      setSelectedOffer(selected);
      saveWinningOffer(selected);
      setIsSpinning(false);

      if (wheelAudioRef.current) {
        wheelAudioRef.current.pause();
      }
      playSound(winAudioRef.current);
      triggerConfetti();
    }, SPINNING_TIME);
  };

  const toggleSound = () => {
    if (isSpinning && attemptsLeft >= 0) {
      setIsSoundEnabled((isSoundEnabled) => !isSoundEnabled);
      if (!isSoundEnabled) {
        if (wheelAudioRef.current) wheelAudioRef.current.play();
        if (winAudioRef.current) winAudioRef.current.play();
      } else if (isSpinning && isSoundEnabled) {
        if (wheelAudioRef.current) wheelAudioRef.current.pause();
        if (winAudioRef.current) winAudioRef.current.pause();
      }
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-orange-50 to-amber-50 p-6">
      {/* <h1 className="sr-only">Spin Wheel Rewards</h1> */}
      <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-start text-center">
        {!selectedOffer ? (
          <>
            <div className="mb-2">
              <h1 className="mb-1 text-3xl font-bold text-orange-900 md:text-4xl">
                Spin to Win!
              </h1>
              <p className="text-base text-orange-800">
                Try your luck and win amazing rewards!
              </p>{" "}
              <br />
            </div>

            <div className="relative mx-auto mb-4 h-[260px] w-[260px] md:h-[300px] md:w-[300px]">
              <div
                ref={wheelRef}
                className="absolute h-full w-full overflow-hidden rounded-full will-change-transform"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(from 0deg, ${offers
                    .map(
                      (offer, i) =>
                        `${offer.color} ${i * 60}deg ${(i + 1) * 60}deg`,
                    )
                    .join(", ")})`,
                  boxShadow: "0 0 0 12px white, 0 0 0 14px #f4d03f",
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom"
                    style={{
                      transform: `rotate(${i * 60}deg)`,
                    }}
                  />
                ))}
                {offers.map((offer, index) => {
                  const rotation = index * 60;
                  const sliceCenter = rotation + 30; // Center of the slice

                  return (
                    <div
                      key={index}
                      className="absolute h-full w-full"
                      style={{
                        transform: `rotate(${sliceCenter}deg)`,
                      }}
                    >
                      <div
                        className="absolute left-1/2"
                        style={{
                          transform: "translate(-50%, 150%) rotate(-90deg)",
                          transformOrigin: "center",
                        }}
                      >
                        <span
                          className="text-white inline-block px-2 py-1 text-center text-xs font-bold md:text-base"
                          style={{
                            color: "white",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                            // WebkitTextStroke: "0.5px rgba(0,0,0,0.5)",
                            // letterSpacing: "0.5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {offer.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="bg-white absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-orange-600 shadow-lg"
                style={{ backgroundColor: "#fff7ed" }}
              >
                <Gift className="h-6 w-6 text-orange-600" />
              </div>

              <div className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-[calc(100%+0.5rem)]">
                <div
                  className="h-0 w-0 border-b-[1.5rem] border-r-[2.5rem] border-t-[1.5rem] border-b-transparent border-r-orange-600 border-t-transparent drop-shadow-md filter"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  }}
                />
              </div>
            </div>

            <div className="my-4 flex gap-x-2">
              <Button
                onClick={spinWheel}
                disabled={isSpinning || attemptsLeft <= 0}
                style={{ color: "white" }}
                className="text-white transform rounded-full bg-orange-600 px-6 py-3 text-lg shadow-lg transition-all hover:scale-105 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSpinning
                  ? "Spinning..."
                  : attemptsLeft > 0
                    ? "Try Your Luck!"
                    : "You've already won!"}
              </Button>

              <Button
                onClick={toggleSound}
                variant="ghost"
                size="icon"
                disabled={attemptsLeft <= 0 && !isSpinning}
                className="text-orange-600 hover:text-orange-700"
              >
                {isSoundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col">
              <div className="mb-1.5 flex items-center justify-center gap-2 text-orange-800">
                <Timer className="h-4 w-4" />
                <p className="text-md font-medium">
                  {Math.round(claimedPercentage)}% offers have been claimed!
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-orange-100">
                <div
                  className="h-full rounded-full bg-orange-600 transition-all duration-1000 ease-out"
                  style={{ width: `${claimedPercentage}%` }}
                />
              </div>
              {attemptsLeft > 0 && (
                <p className="text-md mt-1.5 font-medium text-orange-700">
                  Hurry! Spin the wheel now to claim yours!
                </p>
              )}

              {getPreviousWin() && attemptsLeft <= 0 && (
                <button
                  onClick={() => setShowMaxAttemptsDialog(true)}
                  className="text-md mt-3 text-orange-600 underline decoration-dashed hover:text-orange-700"
                >
                  View your previous reward
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 transform items-center justify-center rounded-full bg-orange-100 shadow-xl">
              <Gift className="h-10 w-10 animate-pulse text-orange-600" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-orange-900 md:text-3xl">
              🎉 Congratulations! 🎉{" "}
            </h2>
            <p className="mb-3 text-lg text-orange-800">
              You won: {selectedOffer.label}!
            </p>
            <div
              className="bg-white mb-4 rounded-xl border-2 border-orange-200 p-4 shadow-lg"
              style={{ background: "white" }}
            >
              <p className="mb-2 text-sm text-orange-600">
                Use this code at checkout:
              </p>
              <div className="flex items-center justify-center gap-3 rounded-lg bg-orange-50 px-4 py-2">
                <code className="font-mono text-lg font-bold text-orange-600">
                  {selectedOffer.code}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(selectedOffer.code)}
                  className="h-8 w-8 hover:bg-orange-100"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() =>
                  (window.location.href = getShoppingUrl(selectedOffer.code))
                }
                className="text-white w-full rounded-md bg-orange-600 px-4 py-2 hover:bg-orange-700"
                style={{ color: "white" }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                CONTINUE & USE DISCOUNT
              </Button>
              <p className="text-sm text-orange-600">
                Remember to use your discount code when you checkout. This offer
                is valid for the next 24 hours.
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={showMaxAttemptsDialog}
        titleClassName={"text-white text-orange-800"}
        onClose={() => setShowMaxAttemptsDialog(false)}
        title={"Maximum Attempts Reached"}
        bgOpacity={"darkest"}
      >
        <div className="text-center">
          {getPreviousWin() ? (
            <>
              <p className="mb-4 text-orange-800">
                {`You've already won a reward! Here's your discount code:`}
              </p>
              <div className="bg-white mb-4 rounded-xl border-2 border-orange-200 p-4 shadow-lg">
                <div className="flex items-center justify-center gap-3 rounded-lg bg-orange-50 px-4 py-2">
                  <code className="font-mono text-lg font-bold text-orange-600">
                    {getPreviousWin()?.code}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(getPreviousWin()?.code || "")
                    }
                    className="h-8 w-8 hover:bg-orange-100"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => {
                  const previousWin = getPreviousWin();
                  if (previousWin) {
                    window.location.href = getShoppingUrl(previousWin.code);
                  }
                }}
                className="text-white w-full rounded-md bg-orange-600 px-4 py-2 hover:bg-orange-700"
                style={{ color: "white" }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                USE YOUR DISCOUNT NOW
              </Button>
            </>
          ) : (
            <p className="text-orange-800">
              {`You've reached the maximum number of attempts. Please try again
              later.`}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 hover:bg-orange-100"
          onClick={() => setShowMaxAttemptsDialog(false)}
        ></Button>
      </Modal>
      {/* 
      <Dialog
        open={showMaxAttemptsDialog}
        onOpenChange={setShowMaxAttemptsDialog}
      >
        <DialogContent className="border-2 border-orange-200 bg-gradient-to-b from-orange-50 to-amber-50 sm:max-w-md">
          <DialogTitle className="mb-3 text-xl font-bold text-orange-900">
            
          </DialogTitle>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
