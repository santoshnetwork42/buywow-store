"use client";

import { useEffect } from "react";

export function ServiceWorkerUnregistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      console.log("unregistering service worker>>>");
      console.log("navigator>>>>", navigator);
      const registrations = navigator.serviceWorker;
      console.log("registrations>>>>", registrations);
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        console.log("registrations>>>>>>>>>", registrations);
        for (let registration of registrations) {
          console.log("registration>>>", registration);
          console.log("unregistering service worker>>>", registration);
          registration.unregister();
        }
      });
    }
  }, []);

  return null;
}
