"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function BlogSlider({ data, setSelectedBlogCategory }: any) {
  const uniqueId = "blog123";
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
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
      1260: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <>
      <Swiper
        {...swiperOptions}
        className={`mySwiper w-full max-w-fit px-5 ${uniqueId}`}
      >
        {data?.map((item: any, index: number) => {
          const slide = (
            <SwiperSlide
              key={index}
              className="mb-12 w-full overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg"
            >
              {" "}
              <Card
                key={item?.id}
                bgImage={item.attributes.image.data.attributes.url}
                title={item.attributes.category}
                setSelectedBlogCategory={setSelectedBlogCategory}
              />
            </SwiperSlide>
          );
          return <>{slide}</>;
        })}
      </Swiper>
      {/* Add navigation buttons */}
      {/* {topCollegeData?.colleges?.data && ( */}
      <div className={`${uniqueId}-next swiper-button-next !top-[34%]`}></div>
      {/*  )} */}
      {/* {topCollegeData?.colleges?.data && ( */}
      <div className={`${uniqueId}-prev swiper-button-prev !top-[34%]`}></div>
      {/*  )} */}
    </>
  );
}

function Card({ bgImage, title, setSelectedBlogCategory }: any) {
  return (
    <div className="group col-span-1 w-full space-y-3 rounded-lg bg-white p-5 shadow-lg">
      <div
        className="cursor-pointer"
        onClick={() => setSelectedBlogCategory(title)}
      >
        <Image
          src={bgImage}
          alt="news Bg"
          width={400}
          height={400}
          className="mb-3 h-44 w-full rounded-lg object-cover"
        />
        <h2 className="line-clamp-2 cursor-pointer text-lg font-bold hover:text-blue-900">
          {title}
        </h2>
      </div>
    </div>
  );
}

export function BlogSliderCardSkeleton() {
  return (
    <div className="group col-span-1 w-full animate-pulse space-y-3 rounded-lg bg-white p-5 shadow-lg">
      <div className="cursor-pointer">
        <div className="mb-3 h-44 w-full rounded-lg bg-gray-200"></div>
        <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
}
