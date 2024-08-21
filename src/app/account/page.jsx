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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const router = useRouter();
  const { handleSignOut } = useAuthDispatch();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("My Orders");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id === null) {
      router.push("/");
    } else if (user?.id) {
      setIsLoading(false);
    }
  }, [user, router]);

  const handleLogout = useCallback(() => {
    router.push("/");
    handleSignOut();
  }, [router, handleSignOut]);

  const tabItems = useMemo(() => getTabItems(handleLogout), [handleLogout]);

  const handleTabClick = useCallback((tab) => {
    if (tab?.component === "Logout") {
      tab.onClick?.();
    } else {
      setActiveTab(tab?.component);
    }
  }, []);

  if (isLoading) {
    return <AccountSkeleton />;
  }

  if (!user?.id) {
    return null;
  }

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

const AccountSkeleton = () => (
  <div className="container-main mb-main mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:flex-row md:gap-5 lg:mt-7 lg:gap-6">
    <div className="no-scrollbar w-full overflow-x-scroll md:w-[200px] lg:w-[232px] xl:w-[264px]">
      <div className="flex w-max gap-2 md:w-full md:flex-col">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-12 w-28 animate-pulse rounded-md bg-gray-200 md:w-full"
          ></div>
        ))}
      </div>
    </div>
    <div className="flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 h-8 w-1/3 animate-pulse rounded bg-gray-200"></div>

        {/* Content blocks */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-100"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-20 w-full animate-pulse rounded bg-gray-100"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/5 animate-pulse rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-6 w-full animate-pulse rounded bg-gray-100"></div>
              <div className="h-6 w-2/3 animate-pulse rounded bg-gray-100"></div>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-full animate-pulse rounded bg-gray-100"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
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
