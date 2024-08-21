"use client";

import {
  ArrowIconSVG,
  ListRadio,
  LocationDot,
  LogOutIcon,
  User,
  WowCashIcon,
} from "@/assets/svg/icons";
import AccountDetails from "@/components/partials/Account/AccountDetails";
import AccountSkeleton from "@/components/partials/Account/AccountSkeleton";
import AccountTabs from "@/components/partials/Account/AccountTabs";
import AddressSection from "@/components/partials/Account/AddressSection";
import OrderSection from "@/components/partials/Account/OrderSection";
import WowLoyalty from "@/components/partials/Account/WowLoyalty";
import { useAuthDispatch } from "@/store/sagas/dispatch/auth.dispatch";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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
    setIsLoading(true);
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
    <div className="container-main mb-main mt-4 flex flex-col gap-3 sm:mt-5 sm:gap-4 md:mt-6 md:flex-row md:gap-5 lg:mt-7 lg:gap-6">
      <AccountTabs
        tabItems={tabItems}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      <div className="flex flex-1 flex-col overflow-x-auto">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

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

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "My Orders":
      return <OrderSection />;
    case "My Addresses":
      return <AddressSection variant="CHECKOUT" />;
    case "Account Details":
      return <AccountDetails />;
    case "WOW Cash":
      return <WowLoyalty />;
    default:
      return null;
  }
};

export default Account;
