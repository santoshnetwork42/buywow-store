"use client";

import React, { useState, useEffect } from "react";
import { Text, Img } from "@/components/common";

const FlipUnit = ({ digit, unit }) => {
  const [flip, setFlip] = useState(false);
  const [displayedDigit, setDisplayedDigit] = useState(digit);

  useEffect(() => {
    setFlip(true);
    const flipTimer = setTimeout(() => setFlip(false), 500);

    // Set up a timer to update the displayed digit after 300ms
    const displayTimer = setTimeout(() => setDisplayedDigit(digit), 300);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(displayTimer);
    };
  }, [digit]);

  return (
    <div className="flex h-7 w-6 flex-col overflow-hidden rounded-sm bg-white-a700_01">
      <div className={`relative mt-0.5 flex-1`}>
        <div
          className={`absolute top-0 z-10 flex h-1/2 w-full items-end justify-center overflow-hidden border-b-[0.5px] border-gray-400 shadow-sm ${flip ? "animate-flip" : ""}`}
        >
          <span className="-mb-2.5 text-sm font-bold text-blue_gray-300">
            {displayedDigit}
          </span>
        </div>
        <div className="absolute bottom-0 flex h-1/2 w-full items-start justify-center overflow-hidden">
          <span className="-mt-2.5 text-sm font-bold text-blue_gray-300">
            {displayedDigit}
          </span>
        </div>
      </div>
      <Text size="xxs" as="p" className="w-full text-center text-[8px]">
        {unit}
      </Text>
    </div>
  );
};
const FlipClock = ({ targetDate, centerText }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Text as="p" className="text-white-a700_01" size="sm" responsive>
          {centerText}
        </Text>
      </div>
      <div className="flex items-center">
        <FlipUnit digit={timeLeft.days} unit="DYS" />
        <Text className="mx-1 mb-1 text-white-a700_01">:</Text>
        <FlipUnit digit={timeLeft.hours} unit="HRS" />
        <Text className="mx-1 mb-1 text-white-a700_01">:</Text>
        <FlipUnit digit={timeLeft.minutes} unit="MIN" />
        <Text className="mx-1 mb-1 text-white-a700_01">:</Text>
        <FlipUnit digit={timeLeft.seconds} unit="SEC" />
      </div>
    </div>
  );
};

export default FlipClock;
