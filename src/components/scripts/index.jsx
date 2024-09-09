"use client";

import { GTM_ID, LIMECHAT_ENABLED, WISEPOPS_KEY } from "@/config";
import { useIsInteractive, useSource } from "@/utils/context/navbar";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GTM = dynamic(() => import("react-gtm-module"), { ssr: false });
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
    if (isInteractive && source !== "app" && !gtmInitialized) {
      const initGTM = async () => {
        const GTMModule = await GTM;
        GTMModule.initialize({ gtmId: GTM_ID });
        setGtmInitialized(true);
      };
      initGTM();
    }
  }, [isInteractive, source, gtmInitialized]);

  if (!isInteractive || source === "app") {
    return null;
  }

  return (
    <>
      <Affise />
      {LIMECHAT_ENABLED && <LimeChat />}
      {WISEPOPS_KEY && <Wisepops />}
    </>
  );
}
