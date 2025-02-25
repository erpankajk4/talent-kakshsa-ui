import { motion } from "framer-motion";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

interface TabProps {
  tabs: {
    id: string | any;
    label: string;
    icon?: JSX.Element;
  }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <>
      {tabs.map((tab) => (
        <React.Fragment key={tab.id}>
          <li
            onClick={() => setActiveTab(tab?.label)}
            className={`${
              activeTab === tab.label
                ? "mb-0 text-white"
                : "text-black hover:text-orange-500"
            } relative flex w-full cursor-pointer flex-nowrap items-center gap-2 rounded-full px-0.5 py-1.5 font-medium transition focus-visible:outline-2 max-lg:justify-center md:px-5`}
          >
            {activeTab === tab?.label && (
              <motion.span
                layoutId="bubble-123"
                className="absolute inset-0 z-10 gap-x-2 rounded-md bg-orange-500 shadow-lg"
                transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              />
            )}
            <span className="z-20 text-2xl">{tab?.icon}</span>
            <span className="z-20 capitalize max-lg:hidden">
              {tab?.label?.split("-").join(" ")}
            </span>
          </li>
        </React.Fragment>
      ))}
    </>
  );
};

export default Tab;
