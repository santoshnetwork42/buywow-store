"use client";

import {
  GOKWIK_SCRIPT,
  GTM_ID,
  LIMECHAT_ENABLED,
  VERCEL_ANALYTICS_ENABLED,
  WISEPOPS_KEY,
} from "@/config";
import { useIsInteractive, useSource } from "@/utils/context/navbar";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useState } from "react";
import GTM from "react-gtm-module";

const Affise = dynamic(() => import("@/components/scripts/affise"), {
  ssr: false,
});
const LimeChat = dynamic(() => import("@/components/scripts/limechat"), {
  ssr: false,
});
const Wisepops = dynamic(() => import("@/components/scripts/wisepops"), {
  ssr: false,
});

export default function Scripts() {
  const isInteractive = useIsInteractive();
  const source = useSource();
  const [gtmInitialized, setGtmInitialized] = useState(false);

  useEffect(() => {
    if (source !== "app" && !gtmInitialized) {
      GTM.initialize({ gtmId: GTM_ID });
      setGtmInitialized(true);
    }
  }, [source, gtmInitialized]);

  if (!isInteractive || source === "app") {
    return null;
  }

  return (
    <>
      <Affise />
      {VERCEL_ANALYTICS_ENABLED && <Analytics />}
      {LIMECHAT_ENABLED && <LimeChat />}
      {/* {WISEPOPS_KEY && <Wisepops />} */}
      {!!GOKWIK_SCRIPT && (
        <Script strategy="afterInteractive" defer src={GOKWIK_SCRIPT} />
      )}
    </>
  );
}
