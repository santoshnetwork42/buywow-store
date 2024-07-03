"use client";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import React, { useEffect, useState } from "react";

const Drawer = ({
  isOpen,
  onClose,
  children,
  position = "left",
  width = "326px",
  className = "",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState(
    position === "left" ? `-${width}` : width,
  );

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setSidebarPosition("0px"), 50);
    } else {
      setSidebarPosition(position === "left" ? `-${width}` : width);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, position, width]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black-900 transition-opacity duration-300 ease-in-out ${className} ${
        isOpen ? "bg-opacity-20" : "pointer-events-none bg-opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        style={{
          transform: `translateX(${sidebarPosition})`,
          [position]: 0,
          maxWidth: width,
        }}
        className={`fixed top-0 flex h-screen w-full flex-col overflow-y-auto bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
