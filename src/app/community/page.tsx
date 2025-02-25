"use client";
import DiscussionAside from "@/components/AsideSections/DiscussionAside";
import Banner2 from "@/components/banners/Banner2";
import Tab from "@/components/dashboardSections/Tab";
import TabContent from "@/components/dashboardSections/TabContent";
import Wrapper from "@/components/Wrappers";
import useUserData from "@/customHook/useProfile";
import { community } from "@/data/community";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function Community() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tab || "feeds");

  const { data: userProfileData, loading, error, refetch } = useUserData();
  // ================================================================ //
  useEffect(() => {
    if (!loading && !userProfileData) {
      refetch();
    }
  }, [userProfileData, refetch, loading]);
  // useEffect(() => {
  //   if (
  //     tab &&
  //     tab !== activeTab &&
  //     community.tabs.some((t) => t.label === tab)
  //   ) {
  //     setActiveTab(tab);
  //   }
  // }, [tab, activeTab]);
  // ================================================================ //
  const handleTabClick = (tabLabel: string) => {
    const selectedTab = community.tabs.find((t) => t.label === tabLabel);
    if (selectedTab) {
      setActiveTab(tabLabel);
      router.push(`?tab=${encodeURIComponent(tabLabel)}`);
    }
  };
  // ================================================================ //
  return (
    <>
      <Wrapper
        as="main"
        containerClassName="!bg-blue-50 mt-10"
        className="relative grid grid-cols-12 gap-1 py-14 md:gap-4"
      >
        <aside className="bottom-0 left-1/2 w-full space-y-5 max-md:fixed max-md:z-50 max-md:-translate-x-1/2 md:col-span-2 lg:col-span-3">
          {/* Tabs */}
          <ul className="flex w-full justify-between rounded-2xl bg-white p-5 px-3 text-lg shadow-md md:flex-col md:gap-4 lg:gap-1">
            <Tab
              tabs={community?.tabs}
              activeTab={activeTab}
              setActiveTab={handleTabClick}
            />
          </ul>
        </aside>
        <section className="col-span-12 space-y-5 md:col-span-10 lg:col-span-9">
          <TabContent
            activeTab={community?.tabs?.find((tab) => tab?.label === activeTab)}
          />
        </section>
      </Wrapper>
      <Banner2 />
    </>
  );
}

export default function CommunityPage() {
  return (
    <Suspense
      fallback={<div className="w-100vw h-100vh bg-orange-500">Loading...</div>}
    >
      <Community />
    </Suspense>
  );
}
