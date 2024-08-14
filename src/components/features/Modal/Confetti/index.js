import React, { useRef, useEffect } from "react";
import { create } from "canvas-confetti";

const Confetti = () => {
  const canvasRef = useRef(null);
  const fireRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      fireRef.current = create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
      fire();
    }
    return () => {
      if (fireRef.current) {
        fireRef.current.reset();
      }
    };
  }, []);

  const fire = () => {
    const count = 500;
    const defaults = {
      origin: { y: 0.6 },
    };

    function fireConfetti(particleRatio, opts) {
      fireRef.current({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fireConfetti(0.2, {
      spread: 60,
    });

    fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fireConfetti(0.1, {
      spread: 140,
      startVelocity: 45,
    });
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    />
  );
};

export default Confetti;
