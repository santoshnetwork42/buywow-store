// components/GokwikLoader.js
"use client";

import { useEffect } from "react";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function loadScriptWhenIdle(src) {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        loadScript(src).then(resolve);
      });
    } else {
      setTimeout(() => {
        loadScript(src).then(resolve);
      }, 500);
    }
  });
}

export default function GokwikLoader({ src }) {
  useEffect(() => {
    if (src) {
      loadScriptWhenIdle(src).then((success) => {
        if (success) {
          console.log("GOKWIK script loaded successfully");
        } else {
          console.error("Failed to load GOKWIK script");
        }
      });
    }
  }, [src]);

  return null;
}
