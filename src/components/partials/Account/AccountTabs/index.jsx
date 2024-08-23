import { Button, Heading } from "@/components/elements";
import React from "react";

const AccountTabs = ({ tabItems, activeTab, handleTabClick }) => (
  <div className="no-scrollbar w-full shrink-0 overflow-x-auto md:flex">
    <div className="flex w-max flex-row gap-1 sm:gap-2 md:flex-1 md:flex-col lg:gap-1">
      {tabItems.map((item) => (
        <AccountTabButton
          key={item.name}
          item={item}
          isActive={activeTab === item.component}
          onClick={() => handleTabClick(item)}
        />
      ))}
    </div>
  </div>
);

const AccountTabButton = React.memo(({ item, isActive, onClick }) => (
  <Button
    onClick={onClick}
    size="large"
    className={`items-center justify-between rounded-md px-3 py-2 hover:bg-orange-500/50 ${isActive ? "bg-orange-500 font-medium hover:bg-orange-500" : ""} ${item.component === "Logout" ? "justify-start" : ""}`}
  >
    <Heading
      as="span"
      size="base"
      className="flex items-center text-left text-sm font-normal md:gap-3"
      responsive
    >
      <span className="hidden md:block">{item.icon}</span>
      {item.name}
    </Heading>
    {item.component !== "Logout" && (
      <item.ArrowIcon className="hidden md:block" />
    )}
  </Button>
));

AccountTabButton.displayName = "AccountTabButton";

export default React.memo(AccountTabs);
