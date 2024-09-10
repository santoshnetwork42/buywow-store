"use client";

import { useCallback, useEffect } from "react";

const CK_SURVIVAL_MINUTES = 30 * 24 * 60;
const TRACKED_PARAMS = ["gclid", "fbclid", "igshid", "gad_source", "msclkid"];

const Affise = () => {
  const getCKSearchParams = useCallback(() => {
    if (typeof window === "undefined") return {};
    return Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    );
  }, []);

  const storeCKInLocalStorage = useCallback((params) => {
    if (typeof window === "undefined") return;

    const hasTrackedParam = TRACKED_PARAMS.some((param) => param in params);

    if (hasTrackedParam) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("bw_")) {
          localStorage.removeItem(key);
        }
      });
    } else {
      TRACKED_PARAMS.forEach((param) => {
        if (!(param in params)) {
          localStorage.removeItem(`bw_${param}`);
        }
      });

      Object.entries(params).forEach(([key, value]) => {
        localStorage.setItem(`bw_${key}`, value);
      });

      localStorage.setItem(
        "bw_timestamp",
        Math.floor(Date.now() / 1000).toString(),
      );
    }
  }, []);

  useEffect(() => {
    const runAffiseLogic = () => {
      try {
        const ckSearchParams = getCKSearchParams();
        storeCKInLocalStorage(ckSearchParams);
      } catch (error) {
        console.error("Error in Affise logic:", error);
      }
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    if (window.requestIdleCallback) {
      window.requestIdleCallback(runAffiseLogic);
    } else {
      setTimeout(runAffiseLogic, 0);
    }
  }, [getCKSearchParams, storeCKInLocalStorage]);

  return null;
};

export default Affise;
