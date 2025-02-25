import Banner2 from "@/components/banners/Banner2";
import CourseBanner from "@/components/banners/CourseBanner";
import CourseListSection from "@/components/coursesListingPageSections/CourseListSection";
import Wrapper from "@/components/Wrappers";
import React from "react";

export default function page() {
  return (
    <>
      <Wrapper bgColor="bg-blue-50" containerClassName="mt-14 py-10">
        <div className="swiperStyle2 relative">
          <CourseBanner />
        </div>
      </Wrapper>
      <CourseListSection
      // data={courses}
      // filterBy={coursePage?.filterBy}
      // tabsSections={tabsSections}
      />
      <Banner2 />
    </>
  );
}
