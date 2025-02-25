import React from "react";
import Feed from "./Feed";
import ChatBox from "./ChatBox";
import Community from "./Community";
import MyProfile from "./MyProfile";

const TabContent = ({ activeTab }: any) => {
  return (
    <>
      {/* Render components based on activeTab */}
      {activeTab?.label === "feeds" && <Feed />}
      {activeTab?.label === "messages" && <ChatBox />}
      {activeTab?.label === "community" && <Community />}
      {activeTab?.label === "my-profile" && <MyProfile />}
    </>
  );
};

export default TabContent;
