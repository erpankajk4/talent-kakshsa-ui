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

export default function ProductSlider() {
  const uniqueId = "product123";
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
        {[...Array(10)]?.map((item: any, index: number) => {
          const slide = (
            <SwiperSlide key={index} className="w-full">
              {" "}
              <Card
                key={index}
                bgImage={smartphoneProduct?.images?.[0]}
                name={smartphoneProduct?.name}
                price={smartphoneProduct?.price}
                discountedPercentage={smartphoneProduct?.discountedPercentage}
                id={smartphoneProduct?.id}
              />
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

function Card({ bgImage, name, price, discountedPercentage, id }: any) {
  return (
    <Link href={id ? `/store/${id}` : "#"} className="cursor-pointer">
      <div className="relative overflow-hidden rounded-xl border-sky-500 bg-white hover:border hover:shadow-lg">
        <p className="absolute right-0 top-0 w-min rounded-bl-xl bg-sky-500 p-2 text-sm font-semibold text-white">
          {discountedPercentage}% OFF
        </p>
        <div className="flex-center w-full py-5">
          <Image
            width={500}
            height={500}
            src={bgImage}
            alt={name}
            className="h-48 w-max cursor-pointer object-contain"
          />
        </div>
        <div className="p-2 font-semibold">
          <h2 className="cursor-pointer">{name}</h2>
          <p className="flex items-center gap-2">
            <span>
              ₹{" "}
              {discountedPercentage
                ? formatRupee(discountedAmount(price, discountedPercentage))
                : formatRupee(price)}
            </span>
            {discountedPercentage && (
              <span className="text-base text-zinc-500 line-through">
                ₹ {formatRupee(price)}
              </span>
            )}
          </p>
          <p className="mt-2 border-t border-zinc-300 pt-2 font-semibold text-green-500">
            Save – ₹{" "}
            {formatRupee(price - discountedAmount(price, discountedPercentage))}
          </p>
        </div>
      </div>
    </Link>
  );
}
