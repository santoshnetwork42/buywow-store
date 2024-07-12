"use client";

import React, { useRef, useEffect, useState } from "react";
import { useBodyScrollLock } from "@/utils/hooks/useBodyScrollLock";

const Drawer = ({
  isOpen,
  onClose,
  children,
  position = "left",
  width = "326px",
  className = "",
  enableOutsideClick = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState(
    position === "left" ? `-${width}` : width,
  );
  const drawerRef = useRef(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setDrawerPosition("0px"), 50);
    } else {
      setDrawerPosition(position === "left" ? `-${width}` : width);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, position, width]);

  const handleClickOutside = (event) => {
    if (
      enableOutsideClick &&
      drawerRef.current &&
      !drawerRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black-900 transition-opacity duration-300 ease-in-out ${className} ${
        isOpen ? "bg-opacity-20" : "pointer-events-none bg-opacity-0"
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={drawerRef}
        style={{
          transform: `translateX(${drawerPosition})`,
          [position]: 0,
          maxWidth: width,
        }}
        className={`fixed top-0 flex h-dvh w-full flex-col overflow-y-auto bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
