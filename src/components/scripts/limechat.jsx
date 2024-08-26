"use client";

import { LIMECHAT_BASE_URL, LIMECHAT_WEBSITE_TOKEN } from "@/config";
import awaitGlobal from "await-global";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

function LimeChat() {
  const pathname = usePathname();
  const isLimechatShow = pathname === "/" || pathname === "/collections/all";

  useEffect(() => {
    const wootBubbleHolder = document.querySelector(".woot--bubble-holder");
    if (wootBubbleHolder) {
      wootBubbleHolder.classList.toggle(
        "woot--bubble-holder-hidden",
        !isLimechatShow,
      );
    }
  }, [isLimechatShow]);

  const handleScriptLoad = () => {
    awaitGlobal("chatwootSDK")
      .then((sdk) => {
        if (sdk?.run) {
          sdk.run({
            websiteToken: LIMECHAT_WEBSITE_TOKEN,
            baseUrl: LIMECHAT_BASE_URL,
          });
        } else {
          console.error(
            "LimeChat SDK is not available or does not have a run method",
          );
        }
      })
      .catch((error) => {
        console.error("Error initializing LimeChat SDK:", error);
      });
  };

  if (!isLimechatShow) return null;

  return (
    <Script
      data-cfasync="false"
      src="https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/LC_sdk/v1/sdk.js"
      onLoad={handleScriptLoad}
      onError={(e) => console.error("Error loading LimeChat script:", e)}
    />
  );
}

export default LimeChat;
