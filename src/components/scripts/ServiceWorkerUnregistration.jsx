"use client";

import { useEffect } from "react";

export function ServiceWorkerUnregistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        console.log("unregistering service worker>>>");
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            console.log("unregistering service worker>>>", registration);
          registration.unregister();
        }
      });
    }
  }, []);

  return null;
}
