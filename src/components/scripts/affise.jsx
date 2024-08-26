"use client";

import { useEffect } from "react";

const CK_SURVIVAL_MINUTES = 30 * 24 * 60;
const TRACKED_PARAMS = ["gclid", "fbclid", "igshid", "gad_source", "msclkid"];

const getCKSearchParams = () => {
  if (typeof window === "undefined") return {};
  const searchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(searchParams.entries());
};

const storeCKInLocalStorage = (params) => {
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
};

const Affise = () => {
  useEffect(() => {
    try {
      const ckSearchParams = getCKSearchParams();
      storeCKInLocalStorage(ckSearchParams);
    } catch (error) {
      console.error("Error in Affise logic:", error);
    }
  }, []);

  return null;
};

export default Affise;
