import AccountAddressSection from "@/components/common/AccountAddressSection";
import AccountDetails from "@/components/common/AccountDetails";
import OrderList from "@/components/common/Orders";
import WowLoyalty from "@/components/common/WowLoyalty";
import React from "react";

const TabContent = ({ activeTab }) => {
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
};

export default React.memo(TabContent);
