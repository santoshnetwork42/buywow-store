import { useState, useEffect, useCallback } from "react";

export const useDeviceWidth = () => {
  const [width, setWidth] = useState(null);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return width;
};
