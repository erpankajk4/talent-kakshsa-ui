"use client";
import { user1 } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileTab from "./profileTabs/ProfileTab";
import { useRouter, useSearchParams } from "next/navigation";
import { profileTab } from "@/data/community";
import ProfileTabContent from "./profileTabs/ProfileTabContent";

export default function MyProfile({ tab }: any) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <ProfileBanner
        avatar={user1}
        bgImage={""}
        userName={"Pankaj Kumar"}
        designation={"Software Engineer"}
        desc={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        }
      />
      <MyProfileTabsSection />
    </div>
  );
}

function ProfileBanner({ avatar, bgImage, userName, designation, desc }: any) {
  return (
    <div className="w-full space-y-5">
      <div className="wavy-gradient relative h-44 w-full">
        {bgImage && (
          <Image
            src={bgImage}
            alt="banner"
            className="h-full w-full object-cover object-top"
          />
        )}
        <div className="flex-center absolute left-10 top-full z-10 h-20 w-20 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-blue-900 shadow-lg">
          {avatar ? (
            <Image src={avatar} alt="avatar" className="rounded-full" />
          ) : (
            <p className="text-3xl font-bold text-white">
              {userName?.slice(0, 1)}
            </p>
          )}
        </div>
      </div>
      <div className="p-3 pt-8">
        <h1 className="text-3xl font-bold">{userName}</h1>
        <p className="text-zinc-500">{designation}</p>
        <p className="text-zinc-700">{desc}</p>
      </div>
    </div>
  );
}

function MyProfileTabsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("profile-tab");
  const [activeTab, setActiveTab] = useState(tab || "feeds");
  // ================================================================ //
  const handleTabClick = (tabLabel: string) => {
    const selectedTab = profileTab?.find((t) => t.label === tabLabel);
    if (selectedTab) {
      setActiveTab(tabLabel);
      router.push(
        `/community?tab=my-profile&profile-tab=${encodeURIComponent(tabLabel)}`,
      );
    }
  };
  return (
    <div className="p-3">
      {/* Tabs */}
      <ul className="flex w-full gap-5 overflow-x-hidden rounded-lg bg-blue-50 p-2 px-3 text-lg shadow-md lg:gap-1">
        <ProfileTab
          tabs={profileTab}
          activeTab={activeTab}
          setActiveTab={handleTabClick}
        />
      </ul>
      <section className="col-span-12 space-y-5 md:col-span-10 lg:col-span-9">
        <ProfileTabContent
          activeTab={profileTab?.find((tab) => tab?.label === activeTab)}
        />
      </section>
    </div>
  );
}
