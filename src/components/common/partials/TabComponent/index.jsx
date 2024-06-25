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
      selectedTabPanelClassName={selectedTabPanelClassName}>
      <div className="w-full [text-align:-webkit-center] overflow-x-auto no-scrollbar">
        <TabList className="flex w-max gap-1 sm:gap-3 lg:gap-5">
          {tabData.map((item, index) => (
            <Tab
              key={index}
              className={`px-2 py-1 sm:px-3 md:px-4 md:py-[6px] text-sm md:text-base font-light capitalize ${tabClassName}`}>
              {item.label}
            </Tab>
          ))}
        </TabList>
      </div>
      <div className="flex flex-col w-full">
        {tabData.map((item, index) => (
          <TabPanel
            key={`tab-panel-${index}`}
            className="w-full overflow-y-visible overflow-x-auto no-scrollbar">
            {renderContent(item.content, index)}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default TabComponent;
