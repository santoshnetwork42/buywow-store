import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window || {};
    return {
      width,
      height,
      isSmallSize: width < 576,
      isMidSize: width >= 576 && width < 768,
      isDesktop: width >= 768 && width < 992,
      isLargeDesktop: width >= 992,
    };
  }

  return {
    isSmallSize: false,
    isMidSize: false,
    isDesktop: false,
    isLargeDesktop: false,
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
