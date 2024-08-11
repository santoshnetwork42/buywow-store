"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Text, Img } from "@/components/elements";

const FlipUnit = ({ digit, unit }) => {
  const [flip, setFlip] = useState(false);
  const [displayedDigit, setDisplayedDigit] = useState(digit);

  useEffect(() => {
    setFlip(true);
    const flipTimer = setTimeout(() => setFlip(false), 500);
    const displayTimer = setTimeout(() => setDisplayedDigit(digit), 300);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(displayTimer);
    };
  }, [digit]);

  return (
    <div className="flex h-7 w-6 flex-col overflow-hidden rounded-sm bg-white-a700_01">
      <div className="relative mt-0.5 flex-1">
        <div
          className={`absolute top-0 z-10 flex h-1/2 w-full items-end justify-center overflow-hidden border-b-[0.5px] border-gray-400 shadow-sm ${
            flip ? "animate-flip" : ""
          }`}
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

FlipUnit.displayName = "FlipUnit";

const FlipClock = ({ timer, centerText }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const startDateTime = new Date(`${timer.startDate}T${timer.startTime}`);
    const endDateTime = new Date(`${timer.endDate}T${timer.endTime}`);

    if (
      now < startDateTime ||
      now > endDateTime ||
      startDateTime > endDateTime
    ) {
      return null;
    }

    let targetDate = endDateTime;
    if (timer.type === "DAILY") {
      // For daily timer, set target to today's end time
      targetDate = new Date(now);
      const [endHours, endMinutes, endSeconds] = timer.endTime
        .split(":")
        .map(Number);
      targetDate.setHours(endHours, endMinutes, endSeconds, 0);

      if (targetDate <= now) {
        return null;
      }
    }

    const distance = targetDate.getTime() - now.getTime();

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, [timer]);

  useEffect(() => {
    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (!timer || !timer.startDate || !timer.endDate) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {centerText && (
        <div className="flex items-center">
          <Text as="p" className="text-white-a700_01" size="sm" responsive>
            {centerText}
          </Text>
        </div>
      )}
      {!!timeLeft && (
        <div className="flex items-center">
          <FlipUnit digit={timeLeft.days} unit="DYS" />
          <Text className="mx-1 mb-1 text-white-a700_01">:</Text>
          <FlipUnit digit={timeLeft.hours} unit="HRS" />
          <Text className="mx-1 mb-1 text-white-a700_01">:</Text>
          <FlipUnit digit={timeLeft.minutes} unit="MIN" />
          <Text className="mx-1 mb-1 text-white-a700_01">:</Text>
          <FlipUnit digit={timeLeft.seconds} unit="SEC" />
        </div>
      )}
    </div>
  );
};

FlipClock.displayName = "FlipClock";

export default FlipClock;
