"use client";

import {
  ArrowIconSVG,
  ListRadio,
  LocationDot,
  LogOutIcon,
  User,
  WowCashIcon,
} from "@/assets/svg/icons";
import AccountAddressSection from "@/components/common/AccountAddressSection";
import AccountDetails from "@/components/common/AccountDetails";
import OrderList from "@/components/common/Orders";
import WowLoyalty from "@/components/common/WowLoyalty";
import { Button, Heading } from "@/components/elements";
import { useAuthDispatch } from "@/store/sagas/dispatch/auth.dispatch";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

const Account = () => {
  const [activeTab, setActiveTab] = useState("My Orders");
  const router = useRouter();
  const { handleSignOut } = useAuthDispatch();

  const handleLogout = useCallback(() => {
    handleSignOut();
    router.push("/");
  }, [router, handleSignOut]);

  const tabItems = useMemo(() => getTabItems(handleLogout), [handleLogout]);

  const handleTabClick = useCallback((tab) => {
    if (tab?.component === "Logout") {
      tab.onClick?.();
    } else {
      setActiveTab(tab?.component);
    }
  }, []);

  return (
    <div className="container-main mb-main mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:flex-row md:gap-5 lg:mt-7 lg:gap-6">
      <AccountTabs
        tabItems={tabItems}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <div className="flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

const AccountTabs = React.memo(({ tabItems, activeTab, handleTabClick }) => (
  <div className="no-scrollbar w-full overflow-x-auto md:flex md:w-[200px] lg:w-[232px] xl:w-[264px]">
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
));

const AccountTabButton = React.memo(({ item, isActive, onClick }) => (
  <Button
    onClick={onClick}
    size="large"
    className={`items-center justify-between rounded-md px-3 py-3 hover:bg-amber-200/25 ${isActive ? "bg-amber-200 font-medium hover:bg-amber-200" : ""} ${item.component === "Logout" ? "justify-start" : ""}`}
  >
    <Heading
      as="span"
      size="base"
      className="flex items-center text-left md:gap-3"
    >
      <span className="hidden md:block">{item.icon}</span>
      {item.name}
    </Heading>
    {item.component !== "Logout" && (
      <item.ArrowIcon className="hidden md:block" />
    )}
  </Button>
));

const TabContent = React.memo(({ activeTab }) => {
  switch (activeTab) {
    case "My Orders":
      return <OrderList />;
    case "My Addresses":
      return <AccountAddressSection />;
    case "Account Details":
      return <AccountDetails />;
    case "WOW Cash":
      return <WowLoyalty />;
    default:
      return null;
  }
});

const getTabItems = (handleLogout) => [
  {
    name: "My Orders",
    component: "My Orders",
    icon: <ListRadio size={18} />,
    ArrowIcon: ArrowIconSVG,
  },
  {
    name: "My Addresses",
    component: "My Addresses",
    icon: <LocationDot size={18} />,
    ArrowIcon: ArrowIconSVG,
  },
  {
    name: "Account Details",
    component: "Account Details",
    icon: <User size={18} />,
    ArrowIcon: ArrowIconSVG,
  },
  {
    name: "WOW Cash",
    component: "WOW Cash",
    icon: <WowCashIcon size={18} />,
    ArrowIcon: ArrowIconSVG,
  },
  {
    name: "Logout",
    component: "Logout",
    icon: <LogOutIcon size={18} />,
    onClick: handleLogout,
    ArrowIcon: () => null,
  },
];

AccountTabs.displayName = "AccountTabs";
AccountTabButton.displayName = "AccountTabButton";
TabContent.displayName = "TabContent";

export default React.memo(Account);
