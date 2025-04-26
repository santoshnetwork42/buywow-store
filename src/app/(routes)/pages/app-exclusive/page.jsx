"use client";

import BuywowIcon from "@/assets/svg/buywow";
import { Button, Text } from "@/components/elements";
import { ONE_LINK_URL } from "@/config";
import useWindowDimensions from "@/utils/helpers/getWindowDimension";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const revalidate = 86400;

const AppExclusive = () => {
  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const { isSmallSize: isMobile } = useWindowDimensions();

  useEffect(() => {
    const encodedUrl = searchParams.get("originalUrl");
    const originalUrl = decodeURIComponent(encodedUrl);
    if (!!originalUrl) setOriginalUrl(originalUrl);
  }, [searchParams]);

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed: ", err);
    }

    document.body.removeChild(textArea);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(originalUrl);
    } catch (err) {
      console.error("Failed to copy: ", err);
      fallbackCopyToClipboard(originalUrl);
    }
  };

  return (
    <div className="my-auto flex flex-col items-center">
      <div>
        <BuywowIcon
          width={isMobile ? 200 : 400}
          height={isMobile ? 100 : 200}
        />
      </div>
      <Text
        as="h1"
        className="li mb-5 mt-0 text-center text-lg text-gray-700 sm:mb-14 sm:mt-4"
        size="4xl"
        responsive
      >
        Download the Buywow App for Exclusive Games & Offers!
      </Text>
      <Button
        variant="primary"
        size={"large"}
        onClick={(e) => {
          copyToClipboard();
          if (typeof window !== "undefined") {
            window.location.href = ONE_LINK_URL;
          }
        }}
        className={
          "rounded-md px-6 py-4 text-lg font-semibold text-white-a700 opacity-100 md:px-10 md:py-7 md:text-3xl lg:px-12 lg:py-9 lg:text-4xl"
        }
      >
        Open the App
      </Button>
    </div>
  );
};

export default AppExclusive;
