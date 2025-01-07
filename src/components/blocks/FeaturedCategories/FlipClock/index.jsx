"use client";

import ClockIcon from "@/assets/svg/clockIcon";
import { Text } from "@/components/elements";
import { useCallback, useEffect, useState } from "react";

const FlipUnit = ({ digit, unit }) => {
  const [displayedDigit, setDisplayedDigit] = useState(digit);

  useEffect(() => {
    const displayTimer = setTimeout(() => setDisplayedDigit(digit), 300);

    return () => {
      clearTimeout(displayTimer);
    };
  }, [digit]);

  return (
    <div className="flex h-6 max-w-min flex-col overflow-hidden rounded-sm">
      <div className="relative mt-0.5 flex-1">
        <div
          className={`flex h-1/2 w-full items-end justify-center overflow-hidden`}
        >
          <span className="-mb-2.5 text-sm text-white-a700_01">
            {displayedDigit}
          </span>
        </div>
        <div className="flex h-1/2 w-full items-start justify-center overflow-hidden">
          <span className="-mt-2.5 text-sm text-white-a700_01">
            {displayedDigit}
          </span>
        </div>
      </div>
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
      if (!!timer.endTime) {
        const [endHours, endMinutes, endSeconds] = timer.endTime
          .split(":")
          .map(Number);
        targetDate.setHours(endHours, endMinutes, endSeconds, 0);

        if (targetDate <= now) {
          return null;
        }
      }
    }

    const distance = targetDate.getTime() - now.getTime();

    const formatWithLeadingZero = (value) => {
      return value < 10 ? `0${value}` : value.toString();
    };

    const totalMinutes = Math.floor(distance / (1000 * 60));
    const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      minutes: formatWithLeadingZero(totalMinutes),
      seconds: formatWithLeadingZero(remainingSeconds),
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
        <div className="flex items-center justify-center gap-1 px-1">
          <div className="flex items-center gap-0.5">
            <FlipUnit digit={timeLeft.minutes} unit="MIN" />
            <Text className="mb-1 text-white-a700_01">:</Text>
            <FlipUnit digit={timeLeft.seconds} unit="SEC" />
          </div>
          <ClockIcon size={14} />
        </div>
      )}
    </div>
  );
};

FlipClock.displayName = "FlipClock";

export default FlipClock;
