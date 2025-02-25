import React from "react";
import Dashboard from "./Dashboard";

const TabContent = ({ activeTab }: any) => {
  return (
    <>
      {/* Render components based on activeTab */}
      {activeTab?.label === "dashboard" && <Dashboard />}
      {activeTab?.label === "my-affiliates" && <p>My Affiliates</p>}
      {activeTab?.label === "link-setup" && <p>Link Setup</p>}
      {activeTab?.label === "code-setup" && <p>Code Setup</p>}
      {activeTab?.label === "wallet" && <p>Wallet</p>}
      {activeTab?.label === "payouts" && <p>Payouts</p>}
    </>
  );
};

export default TabContent;
