"use client";
import OrderList from "@/components/common/Orders";
import WowLoyalty from "@/components/common/WowLoyalty";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

export default function Account() {
  const tabItems = ["WOW Cash", "Orders", "Addresses"];
  const renderTabPanel = (item, index) => (
    <TabPanel
      key={`tab-panel-${index}`}
      className="no-scrollbar w-full overflow-x-auto overflow-y-visible"
    >
      {item === "Orders" && <OrderList />}
      {item === "WOW Cash" && <WowLoyalty />}
    </TabPanel>
  );

  return (
    <>
      <Tabs
        className="flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-5"
        selectedTabClassName="text-black-900 font-normal bg-amber-200 rounded-full"
        selectedTabPanelClassName="relative tab-panel--selected"
      >
        <div className="no-scrollbar w-full overflow-x-auto [text-align:-webkit-center]">
          <TabList className="flex w-max gap-1 sm:gap-3 lg:gap-5">
            {tabItems.map((item, index) => (
              <Tab
                key={index}
                className="px-2.5 py-1 text-sm font-light capitalize text-black-900 sm:px-3 md:px-4 md:py-[6px] md:text-base"
              >
                {item}
              </Tab>
            ))}
          </TabList>
        </div>
        <div className="flex w-full flex-col">
          {tabItems.map(renderTabPanel)}
        </div>
      </Tabs>
      {/* <OrderList /> */}
    </>
  );
}
