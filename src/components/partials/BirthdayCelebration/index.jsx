"use client";

import {
  BALLOON_ALLOWED_PATHS,
  WEB_ANIMATED_BALLOON,
} from "@/utils/data/constants";
import confetti from "canvas-confetti";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useConfiguration } from "@wow-star/utils-cms";

const BirthdayCelebration = React.memo(() => {
  const isBalloonAnimationAllowed = useConfiguration(
    WEB_ANIMATED_BALLOON,
    false,
  );

  const generateRandomValue = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  const findCeilMultiple = (number, multiple) => {
    const ceilMultiple = Math.ceil(number / multiple) * multiple;
    return ceilMultiple - number;
  };

  const balloonsCount = window.innerWidth <= 768 ? 7 : 15;
  const balloonImages = [
    "../images/balloon1.svg",
    "../images/balloon2.svg",
    "../images/balloon3.svg",
    "../images/balloon4.svg",
    "../images/balloon5.svg",
    "../images/balloon6.svg",
    "../images/balloon2.svg",
    "../images/balloon1.svg",
    "../images/balloon4.svg",
    "../images/balloon5.svg",
  ];

  useEffect(() => {
    const balloons = document.querySelectorAll(".balloons img");

    const trianglePath = confetti.shapeFromPath({
      path: "M 0 0 L 5 10 L -5 10 Z",
    });

    const handleBalloonClick = (balloon) => (e) => {
      e.preventDefault();
      e.stopPropagation();

      balloon.style.visibility = "hidden";
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 50,
        origin: {
          x: balloon.getBoundingClientRect().left / window?.innerWidth,
          y: balloon.getBoundingClientRect().top / window?.innerHeight,
        },
        colors: [
          "#dd8433",
          "#d18ee0",
          "#dc3f95",
          "#d1cfcb",
          "#a5863e",
          "#382e21",
          "#ba8a49",
          "#5c7e7e",
          "#bacd13",
        ],
        shapes: [trianglePath],
        gravity: 0.8,
        scalar: 1.5,
        ticks: 150,
        startVelocity: 30,
        drift: 0,
      });

      // Calculate visibility reset time
      const duration = parseFloat(balloon?.dataset?.animationDuration || "20");
      const startTime = parseFloat(balloon?.dataset?.startTime || "20");
      const randomDelay = parseFloat(balloon?.dataset?.randomDelay || "20");
      const currentTime = new Date().getTime();
      const timeoutDuration =
        findCeilMultiple((currentTime - startTime) / 1000, duration) +
        randomDelay;

      // Show the balloon again after its animation duration
      setTimeout(() => {
        balloon.style.visibility = "visible";
      }, timeoutDuration * 1000);
    };

    // Attach event handlers
    const clickHandlers = new Map();
    balloons.forEach((balloon) => {
      const handler = handleBalloonClick(balloon);
      clickHandlers.set(balloon, handler);
      balloon.addEventListener("click", handler);
      balloon.style.pointerEvents = "auto";
    });

    // Cleanup
    return () => {
      balloons.forEach((balloon) => {
        const handler = clickHandlers.get(balloon);
        if (handler) {
          balloon.removeEventListener("click", handler);
        }
      });
    };
  }, []);

  // same as coupon auto apply right now
  const pathname = usePathname();
  const shouldAllowedBalloonsToFloatOnPath = BALLOON_ALLOWED_PATHS.some(
    (allowedPath) =>
      pathname === allowedPath ||
      (allowedPath !== "/" && pathname.startsWith(`${allowedPath}/`)),
  );

  if (!shouldAllowedBalloonsToFloatOnPath || !isBalloonAnimationAllowed) {
    return <></>;
  }

  return (
    <div className="balloons pointer-events-none fixed inset-0 z-[12] h-full w-full overflow-hidden bg-transparent">
      {Array.from({ length: balloonsCount }).map((_, index) => {
        const randomDuration = generateRandomValue(5, 25); // Random animation duration (10s - 25s)
        const randomDelay = generateRandomValue(0, 5); // Random delay (0s - 5s)
        const randomLeft = generateRandomValue(0, 90); // Random horizontal position (0% - 90%)
        const randomImage =
          balloonImages[Math.floor(Math.random() * balloonImages.length)]; // Random image

        return (
          <img
            key={index}
            src={randomImage}
            alt="Balloon"
            className={`balloon animate-flying absolute -bottom-[250px] h-auto w-8 select-none`}
            data-animation-duration={`${randomDuration}s`} // Store duration in a custom data attribute
            data-start-time={new Date().getTime()}
            data-random-delay={randomDelay}
            style={{
              animationDuration: `${randomDuration}s`,
              animationDelay: `${randomDelay}s`,
              left: `${randomLeft}%`,
            }}
          />
        );
      })}
    </div>
  );
});

BirthdayCelebration.displayName = "BirthdayCelebration";

export default BirthdayCelebration;
