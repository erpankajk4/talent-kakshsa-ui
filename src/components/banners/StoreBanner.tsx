"use client";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { banner1, storeBanner, vector3 } from "@/assets";
import { sliderText } from "@/utils/motion";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function StoreBanner() {
  const uniqueId = "StoreBanner123";
  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Pagination, EffectFade, Navigation],
    // effect: "fade",
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {sliderContent.map((item, index) => (
          <SwiperSlide key={index}>
            <CourseBannerCard bgImg={item?.bgImg} href={item?.href} />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Add navigation buttons */}
      {/* {sliderContent && ( */}
      <div
        className={`${uniqueId}-next swiper-button-next !right-0 !top-1/2 !h-16 !w-16 !translate-x-1/2 rounded-full !border-4 !border-white !bg-zinc-100 !p-5 !text-xs !text-zinc-500 max-md:!hidden`}
      >
        <GrNext />
      </div>
      {/* )} */}
      {/* {sliderContent && ( */}
      <div
        className={`${uniqueId}-prev swiper-button-prev !left-0 !top-1/2 !h-16 !w-16 !-translate-x-1/2 rounded-full !border-4 !border-white !bg-zinc-100 !p-5 !text-xs !text-zinc-500 max-md:!hidden`}
      >
        <GrPrevious />
      </div>
      {/* )} */}
    </>
  );
}

import React from "react";
import { Button } from "../Button";

function CourseBannerCard({ bgImg, href }: any) {
  return (
    <Link href={href} className="w-full overflow-hidden rounded-xl">
      <Image
        src={bgImg}
        className="w-full object-cover object-center max-md:min-h-48"
        alt="banner image"
      />
    </Link>
  );
}

const sliderContent = [
  {
    id: 1,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
  {
    id: 2,
    bgImg: storeBanner,
    href: "#",
  },
];
