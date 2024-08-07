"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";

const DrawerContext = React.createContext({
  isChildDrawerOpen: false,
  setIsChildDrawerOpen: () => {},
  parentLockScroll: () => {},
  parentUnlockScroll: () => {},
});

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
    const [isAnimating, setIsAnimating] = useState(false);
    const [drawerSize, setDrawerSize] = useState("0px");
    const [bgOpacity, setBgOpacity] = useState(0);
    const drawerRef = useRef(null);
    const [isChildDrawerOpen, setIsChildDrawerOpen] = useState(false);

    const parentContext = useContext(DrawerContext);

    const lockScroll = useCallback(() => {
      document.body.style.overflow = "hidden";
    }, []);

    const unlockScroll = useCallback(() => {
      document.body.style.overflow = "unset";
    }, []);

    useEffect(() => {
      if (isOpen) {
        lockScroll();
        setIsAnimating(true);
        const sizeTimer = setTimeout(() => setDrawerSize(width), 50);
        const opacityTimer = setTimeout(() => setBgOpacity(0.2), 50);

        if (parentContext) {
          parentContext.setIsChildDrawerOpen(true);
          parentContext.parentLockScroll();
        }

        return () => {
          clearTimeout(sizeTimer);
          clearTimeout(opacityTimer);
          unlockScroll();
        };
      } else {
        setDrawerSize("0px");
        setBgOpacity(0);
        unlockScroll();

        const timer = setTimeout(() => setIsAnimating(false), 300);

        if (parentContext) {
          parentContext.setIsChildDrawerOpen(false);
          parentContext.parentLockScroll();
        }

        return () => {
          clearTimeout(timer);
          unlockScroll();
        };
      }
    }, [isOpen, width, parentContext, lockScroll, unlockScroll]);

    useEffect(() => {
      if (isChildDrawerOpen && drawerRef.current) {
        drawerRef.current.scrollTo({ top: 0 });
      }
    }, [isChildDrawerOpen]);

    const handleClickOutside = useCallback(
      (event) => {
        if (
          enableOutsideClick &&
          drawerRef.current &&
          !drawerRef.current.contains(event.target)
        ) {
          onClose();
        }
      },
      [enableOutsideClick, onClose],
    );

    const contextValue = useMemo(
      () => ({
        isChildDrawerOpen,
        setIsChildDrawerOpen,
        parentLockScroll: lockScroll,
        parentUnlockScroll: unlockScroll,
      }),
      [isChildDrawerOpen, lockScroll, unlockScroll],
    );

    const drawerStyle = useMemo(
      () => ({
        [position]: 0,
        [position === "left" || position === "right" ? "width" : "height"]:
          drawerSize,
        maxWidth: width,
        overflowY: isChildDrawerOpen ? "hidden" : "auto",
      }),
      [position, drawerSize, width, isChildDrawerOpen],
    );

    if (!isOpen && !isAnimating) return null;

    return (
      <DrawerContext.Provider value={contextValue}>
        <div
          className={`fixed inset-0 z-[100] transition-all duration-300 ease-in-out ${className}`}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          }}
          onClick={handleClickOutside}
        >
          <div
            ref={drawerRef}
            style={drawerStyle}
            className={`absolute top-0 flex h-dvh flex-col overflow-x-hidden bg-gray-50 shadow-lg transition-all duration-300 ease-in-out ${
              position === "right" ? "right-0" : "left-0"
            }`}
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
