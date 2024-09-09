"use client";

import Affise from "@/components/scripts/affise";
import LimeChat from "@/components/scripts/limechat";
import Wisepops from "@/components/scripts/wisepops";
import { GTM_ID, LIMECHAT_ENABLED, WISEPOPS_KEY } from "@/config";
import { useIsInteractive, useSource } from "@/utils/context/navbar";
import { useEffect } from "react";
import GTM from "react-gtm-module";

export default function Scripts() {
  const isInteractive = useIsInteractive();
  const source = useSource();

  useEffect(() => {
    if (isInteractive && source !== "app") {
      GTM.initialize({ gtmId: GTM_ID });
    }
  }, [isInteractive, source]);

  return (
    <>
      <Affise />
      {isInteractive && source !== "app" && (
        <>
          {!!LIMECHAT_ENABLED && <LimeChat />}
          {!!WISEPOPS_KEY && <Wisepops />}
        </>
      )}
    </>
  );
}
