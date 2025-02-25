"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { smartphoneProduct } from "@/data/wrapperData";
import Image from "next/image";
import { discountedAmount, formatRupee } from "@/utils/customText";
import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";
import { banner1, storeBanner1 } from "@/assets";

export default function ProductSlider2() {
  const uniqueId = "product12345";
  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Navigation],
    breakpoints: {
      640: {
        slidesPerView: 2,
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
        {[...Array(10)]?.map((item: any, index: number) => {
          const slide = (
            <SwiperSlide key={index} className="w-full">
              {" "}
              <Card key={index} bgImage={storeBanner1} id={""} />
            </SwiperSlide>
          );
          return <>{slide}</>;
        })}
      </Swiper>
      {/* Add navigation buttons */}
      {true && (
        <div
          className={`${uniqueId}-next swiper-button-next !right-0 !top-1/2 !h-10 !w-10 !translate-x-1/2 rounded-full !border !border-zinc-300 !bg-zinc-100 !p-3 !text-xs !text-zinc-500 max-md:!hidden`}
        >
          <GrNext />
        </div>
      )}
      {true && (
        <div
          className={`${uniqueId}-prev swiper-button-prev !left-0 !top-1/2 !h-10 !w-10 !-translate-x-1/2 rounded-full !border !border-zinc-300 !bg-zinc-100 !p-3 !text-xs !text-zinc-500 max-md:!hidden`}
        >
          <GrPrevious />
        </div>
      )}
    </>
  );
}

function Card({ bgImage, name, id }: any) {
  return (
    <Link href={id ? `/store/${id}` : "#"} className="cursor-pointer">
      <div className="max-h-52 w-full overflow-hidden rounded-xl">
        <Image
          width={500}
          height={500}
          src={bgImage}
          alt={name}
          className="h-full w-full cursor-pointer object-cover"
        />
      </div>
    </Link>
  );
}
