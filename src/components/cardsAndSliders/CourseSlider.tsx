"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CourseFilteredCard from "./CourseFilteredCard";
import { course1 } from "@/assets";

export default function CourseSlider() {
  const uniqueId = "CourseSlider123";
  const [PinState, setPinState] = useState(false);
  const handlePin = ({ slug }: any) => {
    setPinState(true);
  };

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
      // dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Pagination, Navigation],
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1260: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <>
      <Swiper
        {...swiperOptions}
        className={`mySwiper w-full max-w-fit px-5 ${uniqueId}`}
      >
        {[...Array(8)]?.map((college: any, index: number) => {
          const slide = (
            <SwiperSlide
              key={index}
              className="mb-12 w-full overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg"
            >
              {" "}
              <CourseFilteredCard
                key={index}
                slug={index}
                bgImage={course1}
                courseTitle={
                  "Mastering Digital Marketing: Strategies & Tactics"
                }
                tutor={"Pankaj Kumar"}
                fees={50000}
                tag={"Marketing"}
                reviews={5}
                handlePin={handlePin}
                pinState={PinState}
                discountedPercentage={20}
              />
            </SwiperSlide>
          );
          return <>{slide}</>;
        })}
      </Swiper>

      {/* Add navigation buttons */}
      {/* {topCollegeData?.colleges?.data && ( */}
      <div className={`${uniqueId}-next swiper-button-next !top-[34%]`}></div>
      {/* )} */}
      {/* {topCollegeData?.colleges?.data && ( */}
      <div className={`${uniqueId}-prev swiper-button-prev !top-[34%]`}></div>
      {/* )} */}
    </>
  );
}
