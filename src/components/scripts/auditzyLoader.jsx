// components/AuditzyLoader.js
"use client";

import { AUDITZ } from "@/config";
import { useEffect } from "react";

const AuditzyLoader = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && AUDITZ) {
      const worker = new Worker(
        new URL("../../../public/auditzy-worker.js", import.meta.url),
      );
      worker.postMessage("loadAuditzy");
      worker.onmessage = function (e) {
        if (e.data === "loaded") {
          console.log("Auditzy script loaded");
        } else if (e.data === "error") {
          console.error("Failed to load Auditzy script");
        }
      };
      return () => worker.terminate();
    }
  }, []);

  return null;
};

export default AuditzyLoader;
