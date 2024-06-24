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
      <TabList className="flex flex-wrap gap-5">
        {tabData.map((item, index) => (
          <Tab
            key={index}
            className={`px-4 py-[5px] text-base font-light capitalize ${tabClassName}`}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      <div className="flex flex-col w-full">
        {tabData.map((item, index) => (
          <TabPanel
            key={`tab-panel-${index}`}
            className="w-full overflow-x-auto no-scrollbar">
            {renderContent(item.content, index)}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default TabComponent;
