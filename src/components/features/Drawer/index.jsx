"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";

const DrawerContext = React.createContext({});

const Drawer = React.memo(
  ({
    isOpen,
    onClose,
    children,
    position = "left",
    width = "326px",
    className = "",
    enableOutsideClick = true,
  }) => {
    const [state, setState] = useState({
      isAnimating: false,
      drawerSize: "0px",
      bgOpacity: 0,
    });

    const drawerRef = useRef(null);
    const parentContext = useContext(DrawerContext);

    const toggleScroll = useCallback((lock) => {
      document.body.style.overflow = lock ? "hidden" : "unset";
    }, []);

    useEffect(() => {
      if (isOpen) {
        openDrawer();
      } else {
        closeDrawer();
      }

      return () => {
        toggleScroll(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, width, parentContext, toggleScroll]);

    const openDrawer = () => {
      toggleScroll(true);
      setState((prev) => ({ ...prev, isAnimating: true }));

      const timers = [
        setTimeout(
          () => setState((prev) => ({ ...prev, drawerSize: width })),
          50,
        ),
        setTimeout(() => setState((prev) => ({ ...prev, bgOpacity: 0.2 })), 50),
      ];

      parentContext?.parentLockScroll?.();

      return () => timers.forEach(clearTimeout);
    };

    const closeDrawer = () => {
      setState((prev) => ({ ...prev, drawerSize: "0px", bgOpacity: 0 }));
      toggleScroll(false);

      const timer = setTimeout(
        () => setState((prev) => ({ ...prev, isAnimating: false })),
        300,
      );

      parentContext?.parentLockScroll?.();

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

    if (!isOpen && !state.isAnimating) return null;

    return (
      <DrawerContext.Provider
        value={{
          parentLockScroll: () => toggleScroll(true),
          parentUnlockScroll: () => toggleScroll(false),
        }}
      >
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
              [position]: 0,
              [position === "left" || position === "right"
                ? "width"
                : "height"]: state.drawerSize,
              maxWidth: width,
            }}
            className={`absolute top-0 flex h-dvh flex-col overflow-x-hidden bg-gray-50 shadow-lg transition-all duration-300 ease-in-out ${position === "right" ? "right-0" : "left-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </DrawerContext.Provider>
    );
  },
);

Drawer.displayName = "Drawer";

export default Drawer;
