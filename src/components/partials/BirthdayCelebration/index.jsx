"use client";

import confetti from "canvas-confetti";
import React, { useEffect } from "react";

const BirthdayCelebration = React.memo(() => {
  useEffect(() => {
    const balloons = document?.querySelectorAll(".balloons img");
    let clickCount = 0;

    const trianglePath = confetti.shapeFromPath({
      path: "M 0 0 L 5 10 L -5 10 Z",
    });

    // Create the click handler function
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

      clickCount++;
    };

    // Store click handlers to remove them later
    const clickHandlers = new Map();

    // Add click listeners
    balloons.forEach((balloon) => {
      const handler = handleBalloonClick(balloon);
      clickHandlers.set(balloon, handler);
      balloon.addEventListener("click", handler);
      balloon.style.pointerEvents = "auto"; // Ensure clicks are registered
    });

    // Cleanup function
    return () => {
      balloons.forEach((balloon) => {
        const handler = clickHandlers.get(balloon);
        if (handler) {
          balloon.removeEventListener("click", handler);
        }
      });
    };
  }, []);

  return (
    <div className="balloons pointer-events-none fixed inset-0 z-[1] h-full w-full overflow-hidden bg-transparent">
      <img
        src="images/balloon1.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[25%] h-auto w-20 cursor-pointer select-none"
      />
      <img
        src="images/balloon2.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[85%] h-auto w-20 cursor-pointer select-none [animation-delay:2s] [animation-duration:12s]"
      />
      <img
        src="images/balloon3.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[10%] h-auto w-20 cursor-pointer select-none [animation-delay:4s]"
      />
      <img
        src="images/balloon4.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[70%] h-auto w-20 cursor-pointer select-none [animation-duration:18s]"
      />
      <img
        src="images/balloon5.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[65%] h-auto w-20 cursor-pointer select-none"
      />
      <img
        src="images/balloon6.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[35%] h-auto w-20 cursor-pointer select-none [animation-delay:3s]"
      />
      <img
        src="images/balloon4.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[30%] h-auto w-20 cursor-pointer select-none [animation-delay:6s] [animation-duration:8s]"
      />
      <img
        src="images/balloon2.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[55%] h-auto w-20 cursor-pointer select-none [animation-delay:4s]"
      />
      <img
        src="images/balloon5.svg"
        alt="Balloon"
        className="animate-flying pointer-events-auto absolute -bottom-[250px] left-[45%] h-auto w-20 cursor-pointer select-none [animation-delay:2.5s] [animation-duration:10s]"
      />
    </div>
  );
});

BirthdayCelebration.displayName = "BirthdayCelebration";

export default BirthdayCelebration;
