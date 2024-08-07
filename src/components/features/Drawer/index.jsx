"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useBodyScrollLock } from "@/utils/hooks/useBodyScrollLock";

// Create a context to manage nested drawers
const DrawerContext = React.createContext({
  isChildDrawerOpen: false,
  setIsChildDrawerOpen: () => {},
});

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
  const [drawerTranslate, setDrawerTranslate] = useState(
    position === "left" ? `-${width}` : width,
  );
  const [bgOpacity, setBgOpacity] = useState(0);
  const drawerRef = useRef(null);
  const [isChildDrawerOpen, setIsChildDrawerOpen] = useState(false);

  // Get the parent drawer's context
  const parentContext = useContext(DrawerContext);
  console.log(parentContext);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const translateTimer = setTimeout(() => setDrawerTranslate("0px"), 50);
      const opacityTimer = setTimeout(() => setBgOpacity(0.2), 50);

      if (parentContext) {
        parentContext.setIsChildDrawerOpen(true);
      }

      return () => {
        clearTimeout(translateTimer);
        clearTimeout(opacityTimer);
      };
    } else {
      setDrawerTranslate(position === "left" ? `-${width}` : width);
      setBgOpacity(0);
      const timer = setTimeout(() => setIsAnimating(false), 300);

      if (parentContext) {
        parentContext.setIsChildDrawerOpen(false);
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, position, width, parentContext]);

  useEffect(() => {
    if (isChildDrawerOpen && drawerRef.current) {
      drawerRef.current?.scrollTo({ top: 0 });
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

  if (!isOpen && !isAnimating) return null;

  return (
    <DrawerContext.Provider value={{ isChildDrawerOpen, setIsChildDrawerOpen }}>
      <div
        className={`bg-black fixed inset-0 z-[100] transition-all duration-300 ease-in-out ${className}`}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
        }}
        onClick={handleClickOutside}
      >
        <div
          ref={drawerRef}
          style={{
            transform: `translateX(${drawerTranslate})`,
            [position]: 0,
            maxWidth: width,
            overflow: isChildDrawerOpen ? "hidden" : "auto",
          }}
          className="absolute top-0 flex h-dvh w-full flex-col bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>
  );
};

Drawer.displayName = "Drawer";

export default Drawer;
