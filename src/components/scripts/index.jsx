"use client";

import { LIMECHAT_ENABLED, WISEPOPS_KEY } from "@/config";
import { useIsInteractive, useSource } from "@/utils/context/navbar";
import Affise from "./affise";
import LimeChat from "./limechat";
import Wisepops from "./wisepops";

export default function Scripts() {
  const isInteractive = useIsInteractive();
  const source = useSource();

  // useEffect(() => {
  //   if (isInteractive && source !== "app") {
  //     GTM.initialize({ gtmId: GTM_ID });
  //   }
  // }, [isInteractive, source]);

  return (
    <>
      <Affise />
      {isInteractive && source !== "app" && (
        <>
          {!!LIMECHAT_ENABLED && <LimeChat />}
          {!WISEPOPS_KEY && <Wisepops />}
        </>
      )}
    </>
  );
}
