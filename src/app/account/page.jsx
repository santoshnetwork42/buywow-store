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

TabContent.displayName = "TabContent";

const Account = () => {
  const [activeTab, setActiveTab] = useState("My Orders");
  const router = useRouter();
  const { handleSignOut } = useAuthDispatch();

  const handleLogout = useCallback(() => {
    handleSignOut();
    router.push("/");
  }, [router, handleSignOut]);

  const tabItems = useMemo(
    () => [
      {
        name: "My Orders",
        component: "My Orders",
        icon: <ListRadio size={18} />,
      },
      {
        name: "My Addresses",
        component: "My Addresses",
        icon: <LocationDot size={18} />,
      },
      {
        name: "Account Details",
        component: "Account Details",
        icon: <User size={18} />,
      },
      {
        name: "WOW Cash",
        component: "WOW Cash",
        icon: <WowCashIcon size={18} />,
      },
      {
        name: "Logout",
        component: "Logout",
        icon: <LogOutIcon size={18} />,
        onClick: handleLogout,
      },
    ],
    [handleLogout],
  );

  const handleTabClick = useCallback((tab) => {
    if (tab.component === "Logout") {
      tab.onClick();
    } else {
      setActiveTab(tab.component);
    }
  }, []);

  return (
    <div className="container-main mb-main mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:flex-row md:gap-5 lg:mt-7 lg:gap-6">
      <div className="no-scrollbar w-full overflow-x-auto md:flex md:w-[200px] lg:w-[232px] xl:w-[264px]">
        <div className="flex w-max flex-row gap-1 sm:gap-2 md:flex-1 md:flex-col lg:gap-1">
          {tabItems.map((item) =>
            item.component === "Logout" ? (
              <Button
                key={item.name}
                onClick={item.onClick}
                size="large"
                className="justify-start rounded-md py-3 hover:bg-amber-200/15"
              >
                <Heading
                  as="span"
                  size="base"
                  className="flex items-center md:gap-3"
                >
                  <span className="hidden md:block">{item.icon}</span>
                  {item.name}
                </Heading>
              </Button>
            ) : (
              <Button
                key={item.name}
                onClick={() => handleTabClick(item)}
                size="large"
                className={`items-center justify-between rounded-md px-3 py-3 hover:bg-amber-200/25 ${
                  activeTab === item.component
                    ? "bg-amber-200 font-medium hover:bg-amber-200"
                    : ""
                }`}
              >
                <Heading
                  as="span"
                  size="base"
                  className="flex items-center text-left md:gap-3"
                >
                  <span className="hidden md:block">{item.icon}</span>
                  {item.name}
                </Heading>
                <ArrowIconSVG className="hidden md:block" />
              </Button>
            ),
          )}
        </div>
      </div>
      <div className="flex w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-md border shadow-sm">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default React.memo(Account);
