// hooks/useBodyScrollLock.js
import { useEffect } from "react";

export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLocked]);
}
