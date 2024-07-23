// components/client/TabComponent.jsx
"use client";

import React from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

const TabComponent = ({ tabItems, renderTabContent, className }) => {
  return (
    <Tabs
      className={`flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-5 ${className}`}
      selectedTabClassName="text-black-900 font-normal bg-amber-200 rounded-full"
      selectedTabPanelClassName="relative tab-panel--selected"
    >
      <div className="no-scrollbar w-full overflow-x-auto [text-align:-webkit-center]">
        <TabList className="flex w-max gap-1 sm:gap-3 lg:gap-5">
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              className={`px-2 py-1 text-sm font-light capitalize text-black-900 sm:px-3 md:px-4 md:py-[6px] md:text-base`}
            >
              {item.title}
            </Tab>
          ))}
        </TabList>
      </div>
      <div className="flex w-full flex-col">
        {tabItems.map((item, index) => (
          <TabPanel
            key={`tab-panel-${index}`}
            className="no-scrollbar w-full overflow-x-auto overflow-y-visible"
          >
            {renderTabContent(item, index)}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default TabComponent;
