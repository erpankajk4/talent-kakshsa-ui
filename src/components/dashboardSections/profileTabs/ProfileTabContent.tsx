import React from "react";
import Feeds from "./Feeds";
import About from "./About";
import Community from "./Community";
import Experience from "./Experience";
import Skills from "./Skills";

const ProfileTabContent = ({ activeTab }: any) => {
  return (
    <>
      {activeTab?.label === "feeds" && <Feeds />}
      {activeTab?.label === "about" && <About />}
      {activeTab?.label === "community" && <Community />}
      {activeTab?.label === "experience" && <Experience />}
      {activeTab?.label === "skills" && <Skills />}
    </>
  );
};

export default ProfileTabContent;
