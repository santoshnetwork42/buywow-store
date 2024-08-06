"use client";
import { useState, useCallback } from "react";
import OrderList from "@/components/common/Orders";
import WowLoyalty from "@/components/common/WowLoyalty";
import { Button, Text } from "@/components/elements";

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "WOW Cash":
      return <WowLoyalty />;
    case "Orders":
      return <OrderList />;
    case "Addresses":
      return <div>Addresses Content</div>; // Placeholder for Addresses content
    default:
      return null;
  }
};

export default function Account() {
  const [activeTab, setActiveTab] = useState("WOW Cash");
  const tabItems = ["WOW Cash", "Orders", "Addresses"];

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="container-main flex w-full flex-col gap-3 py-6 sm:gap-4 md:flex-row lg:gap-5">
      <div className="no-scrollbar min-w-48 overflow-x-auto [text-align:-webkit-center]">
        <div className="flex w-full flex-row gap-1 sm:gap-3 md:flex-col lg:gap-5">
          {tabItems.map((item) => (
            <Button
              key={item}
              onClick={() => handleTabClick(item)}
              className={`rounded-md px-2.5 py-1 text-sm font-light capitalize text-black-900 sm:px-3 md:px-4 md:py-[6px] md:text-base ${
                activeTab === item ? "bg-amber-200" : ""
              }`}
              size="md"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex max-h-screen w-full flex-1 flex-col border">
        <div className="no-scrollbar w-full overflow-x-auto overflow-y-visible">
          <TabContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
