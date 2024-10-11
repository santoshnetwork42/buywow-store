import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window || {};
    return {
      width,
      height,
      isSmallSize: width < 575,
      isDesktop: width >= 992,
    };
  }

  return {
    isSmallSize: false,
    isDesktop: false,
  };
};

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    handleResize();
    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
