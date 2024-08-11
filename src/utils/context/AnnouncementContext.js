"use client";

import React, { createContext, useContext, useState } from "react";

const AnnouncementContext = createContext();

export const useAnnouncementContext = () => {
  return useContext(AnnouncementContext);
};

export const AnnouncementProvider = ({ children }) => {
  const [globalAnnouncement, setGlobalAnnouncement] = useState(null);
  const [pageAnnouncements, setPageAnnouncements] = useState(null);

  const updateGlobalAnnouncement = (message) => {
    setGlobalAnnouncement(message);
  };

  const updatePageAnnouncement = (message) => {
    setPageAnnouncements(message);
  };

  const value = {
    globalAnnouncement,
    pageAnnouncements,
    updateGlobalAnnouncement,
    updatePageAnnouncement,
  };

  return (
    <AnnouncementContext.Provider value={value}>
      {children}
    </AnnouncementContext.Provider>
  );
};
