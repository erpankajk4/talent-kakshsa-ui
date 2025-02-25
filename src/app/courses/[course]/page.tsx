"use client";
import { video, videoT } from "@/assets";
import Banner2 from "@/components/banners/Banner2";
import BlogDetailPageBanner2 from "@/components/banners/BlogDetailPageBanner2";
import { CourseDetailBanner } from "@/components/banners/CourseDetailBanner";
import PriceAndMaterialIncluded, {
  PopularCourses,
} from "@/components/detailPageSections/Aside";
import Content, {
  InstructorContent,
  OtherCourses,
} from "@/components/detailPageSections/Content";
import Faqs from "@/components/Faqs";
import Wrapper from "@/components/Wrappers";
import { faqs } from "@/data/wrapperData";
import { formatRupee } from "@/utils/customText";
import React from "react";

export default function page() {
  return (
    <>
      <Wrapper bgColor="bg-blue-50" containerClassName="mt-14 py-10">
        <CourseDetailBanner
          tag={"Web Development"}
          title={"Mastering Digital Marketing: Strategies & Tactics"}
          desc={
            "Learn the ins and outs of digital marketing to grow your business and career."
          }
          isBestSeller={true}
          reviews={44}
          rating={4.5}
          authorName={"Pankaj Kumar"}
          lastUpdated={"08 Sep 2024"}
          fees={5000}
          discountFeesBy={20}
          demoVideo={video}
          videoThumbnail={videoT}
        />
        <BlogDetailPageBanner2
          text={
            "Access this top-rated course, plus 11,000+ more top-rated courses, with a Talent Kaksha’s plan."
          }
          priceLink={"#"}
          reviews={formatRupee(43335454)}
          rating={4.5}
          students={formatRupee(124356)}
        />
        <main className="grid grid-rows-[auto,auto] gap-5 md:grid-cols-12">
          <article className="max-md:row-start-2 md:col-span-8 xl:col-span-9">
            <Content />
            <InstructorContent />
            <OtherCourses />
            {/* FAQs  */}
            <div className="my-10">
              <div className="space-y-2">
                <h2 className="flex items-center gap-3 text-sm font-medium text-orange-500">
                  <span className="h-0 w-10 border-t-2 border-orange-500"></span>
                  FAQs
                </h2>
                <h1 className="pb-5 text-2xl font-bold text-zinc-800">
                  Still having a doubt? Let’s be more clearer!
                </h1>
              </div>
              <Faqs data={faqs} />
            </div>
          </article>
          <aside className="max-h-min space-y-5 max-md:row-start-1 md:col-span-4 xl:col-span-3">
            <PriceAndMaterialIncluded />
            <PopularCourses />
          </aside>
        </main>
      </Wrapper>
      <Banner2 />
    </>
  );
}
