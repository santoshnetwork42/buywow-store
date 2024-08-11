"use client";

import { useAnnouncementContext } from "@/utils/context/AnnouncementContext";
import { useEffect } from "react";

const PageAnnouncementBar = (data) => {
  const { updatePageAnnouncement } = useAnnouncementContext();

  useEffect(() => {
    if (data) {
      updatePageAnnouncement(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return null;
};

export default PageAnnouncementBar;
