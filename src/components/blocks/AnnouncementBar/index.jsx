"use client";

import React, { useEffect, useMemo } from "react";
import { Text } from "@/components/elements";
import FlipClock from "@/components/partials/Others/FlipClock";
import { useAnnouncementContext } from "@/utils/context/AnnouncementContext";
import { extractAttributes } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AnnouncementContent = ({ announcement }) => {
  const { leftText, centerText, rightText, showTimer, timer } = announcement;

  if (!leftText && !centerText && !rightText && (showTimer ? !timer : true))
    return null;

  return (
    <div className="flex flex-1 items-center justify-between gap-5 py-1 md:py-2">
      <Text
        as="p"
        className="shrink-0 text-white-a700_01 max-lg:hidden lg:w-[28%]"
        size="sm"
      >
        {leftText}
      </Text>
      <div className="m-auto flex w-auto shrink-0 items-center justify-center">
        {showTimer && !!timer ? (
          <FlipClock timer={timer} centerText={centerText} />
        ) : (
          <Text as="p" className="py-0.5 text-white-a700_01" size="sm">
            {centerText}
          </Text>
        )}
      </div>

      <Text
        as="p"
        className="text-end text-white-a700_01 max-lg:hidden lg:w-[28%]"
        size="sm"
      >
        {rightText}
      </Text>
    </div>
  );
};

const AnnouncementBar = ({ data }) => {
  const pathname = usePathname();
  const {
    globalAnnouncement,
    pageAnnouncements,
    updateGlobalAnnouncement,
    updatePageAnnouncement,
  } = useAnnouncementContext();

  useEffect(() => {
    if (pathname) {
      updatePageAnnouncement(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (data) {
      const extractedData = extractAttributes(data);
      updateGlobalAnnouncement(extractedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const announcement = useMemo(() => {
    return pageAnnouncements || globalAnnouncement || {};
  }, [globalAnnouncement, pageAnnouncements]);

  if (!announcement || Object.keys(announcement).length === 0) {
    return null;
  }

  return (
    <Link
      href={announcement?.link || "#"}
      className="container-main flex justify-center"
      style={{ backgroundColor: announcement?.bgColor || "#6E809A" }}
    >
      <AnnouncementContent announcement={announcement} />
    </Link>
  );
};

export default React.memo(AnnouncementBar);
