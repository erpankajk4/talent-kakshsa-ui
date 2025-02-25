import { motion } from "framer-motion";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

interface TabProps {
  tabs: {
    id: string | any;
    label: string;
  }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const ProfileTab: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <>
      {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          <li
            onClick={() => setActiveTab(tab?.label)}
            className={`${
              activeTab === tab.label
                ? "mb-0 text-black"
                : "text-black hover:text-orange-500"
            } relative flex w-full cursor-pointer flex-nowrap items-center justify-center gap-2 rounded-full px-0.5 py-1.5 font-medium transition focus-visible:outline-2 md:px-5`}
          >
            {activeTab === tab?.label && (
              <motion.span
                layoutId="bubble-0" // Enable shared layout transitions between different components with the same layoutId.
                className="absolute inset-0 z-10 gap-x-2 rounded-lg bg-white shadow-md"
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              />
            )}
            <span className="z-20 capitalize">
              {tab?.label?.split("-").join(" ")}
            </span>
          </li>
        </React.Fragment>
      ))}
    </>
  );
};

export default ProfileTab;
