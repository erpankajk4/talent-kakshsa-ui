"use client";
import Tab from "@/components/AffiliateProgramDetailPageSections/Tab";
import TabContent from "@/components/AffiliateProgramDetailPageSections/TabContent";
import Banner1 from "@/components/banners/Banner1";
import Wrapper from "@/components/Wrappers";
import { affiliate } from "@/data/affiliate";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  params: {
    userId: String;
  };
};
export default function AffiliateProgramDetailPage({ params }: Props) {
  const blogId = params?.userId;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tab || "dashboard");
  const handleTabClick = (tabLabel: string) => {
    const selectedTab = affiliate.find((t) => t.label === tabLabel);
    if (selectedTab) {
      setActiveTab(tabLabel);
      router.push(`?tab=${encodeURIComponent(tabLabel)}`);
    }
  };
  //   ================================================= //
  return (
    <>
      <Wrapper
        as="section"
        bgColor="!bg-blue-50"
        containerClassName="mt-10"
        className="relative grid grid-cols-12 gap-1 py-14 md:gap-4"
      >
        <aside className="bottom-0 left-1/2 w-full space-y-5 max-md:z-50 max-md:hidden max-md:-translate-x-1/2 md:col-span-2 lg:col-span-3">
          {/* Tabs */}
          <ul className="flex w-full justify-between rounded-2xl bg-white p-5 px-3 text-lg shadow-md md:flex-col md:gap-4 lg:gap-1">
            <Tab
              tabs={affiliate}
              activeTab={activeTab}
              setActiveTab={handleTabClick}
            />
          </ul>
        </aside>
        <section className="col-span-12 space-y-5 md:col-span-10 lg:col-span-9">
          <TabContent
            activeTab={affiliate?.find((tab) => tab?.label === activeTab)}
          />
        </section>
      </Wrapper>
      <Banner1 />
    </>
  );
}
