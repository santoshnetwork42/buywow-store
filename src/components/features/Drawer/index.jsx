"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Drawer = ({
  isOpen,
  onClose,
  children,
  position = "left",
  width = "326px",
  className = "",
  isNestedDrawer = false,
  enableOutsideClick = true,
}) => {
  const pathname = usePathname();

  const [state, setState] = useState({
    isAnimating: false,
    positionValue: "-100%",
    bgOpacity: 0,
  });

  const isCartOpen = useSelector(
    (state) => state.modal?.modal?.cart?.isCartOpen,
  );

  const drawerRef = useRef(null);

  const toggleScroll = useCallback((lock) => {
    document.body.style.overflow = lock ? "hidden" : "unset";
  }, []);

  const openDrawer = () => {
    toggleScroll(true);
    setState((prev) => ({ ...prev, isAnimating: true }));
    const timers = [
      setTimeout(
        () => setState((prev) => ({ ...prev, positionValue: "0%" })),
        50,
      ),
      setTimeout(() => setState((prev) => ({ ...prev, bgOpacity: 0.2 })), 50),
    ];
    return () => timers.forEach(clearTimeout);
  };

  const closeDrawer = () => {
    setState((prev) => ({
      ...prev,
      positionValue: "-100%",
      bgOpacity: 0,
    }));
    !isNestedDrawer && !isCartOpen && toggleScroll(false);
    const timer = setTimeout(
      () => setState((prev) => ({ ...prev, isAnimating: false })),
      300,
    );
    return () => clearTimeout(timer);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (enableOutsideClick && !drawerRef.current?.contains(event.target)) {
        onClose();
      }
    },
    [enableOutsideClick, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    } else {
      closeDrawer();
    }

    return () => {
      !isNestedDrawer && toggleScroll(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, position, toggleScroll]);

  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-300 ease-in-out ${className}`}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
        backgroundColor: `rgba(0, 0, 0, ${state.bgOpacity})`,
      }}
      onClick={handleClickOutside}
    >
      <div
        ref={drawerRef}
        style={{
          [position]: state.positionValue,
          width: width,
        }}
        className={`no-scrollbar absolute top-0 flex h-dvh max-w-full flex-col overflow-x-hidden bg-white-a700 shadow-lg transition-all duration-300 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
