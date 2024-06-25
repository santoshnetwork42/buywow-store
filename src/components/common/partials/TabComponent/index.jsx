// components/TabComponent.jsx
"use client";

import React from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

const TabComponent = ({
  tabData,
  renderContent,
  className = "",
  tabClassName = "",
  selectedTabClassName = "",
  selectedTabPanelClassName = "",
}) => {
  return (
    <Tabs
      className={className}
      selectedTabClassName={selectedTabClassName}
      selectedTabPanelClassName={selectedTabPanelClassName}
    >
      <div className="no-scrollbar w-full overflow-x-auto [text-align:-webkit-center]">
        <TabList className="flex w-max gap-1 sm:gap-3 lg:gap-5">
          {tabData.map((item, index) => (
            <Tab
              key={index}
              className={`px-2 py-1 text-sm font-light capitalize sm:px-3 md:px-4 md:py-[6px] md:text-base ${tabClassName}`}
            >
              {item.label}
            </Tab>
          ))}
        </TabList>
      </div>
      <div className="flex w-full flex-col">
        {tabData.map((item, index) => (
          <TabPanel
            key={`tab-panel-${index}`}
            className="no-scrollbar w-full overflow-x-auto overflow-y-visible"
          >
            {renderContent(item.content, index)}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default TabComponent;
