"use client";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { banner1, vector3 } from "@/assets";
import { sliderText } from "@/utils/motion";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

export default function CourseBanner() {
  const uniqueId = "banner123";
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
    effect: "fade",
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(animationKey + 1);
  }, [currentSlide]);

  return (
    <>
      <Swiper
        {...swiperOptions}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)} // Update current slide index
        className="mySwiper"
      >
        <AnimatePresence>
          {sliderContent.map((item, index) => (
            <SwiperSlide key={index}>
              <CourseBannerCard
                bgImg={item?.bgImg}
                title={item?.title}
                subtitle={item?.subtitle}
                isButtonDisplay={item?.isButtonDisplay}
                currentSlide={currentSlide}
                animationKey={animationKey}
                style={item?.style}
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
          ))}
        </AnimatePresence>
      </Swiper>
      {/* Add navigation buttons */}
      {/* {sliderContent && ( */}
      <div
        className={`${uniqueId}-next swiper-button-next !right-0 !top-1/2 !bg-white !bg-opacity-50 !text-xs !text-white`}
      >
        <GrNext />
      </div>
      {/* )} */}
      {/* {sliderContent && ( */}
      <div
        className={`${uniqueId}-prev swiper-button-prev !left-0 !top-1/2 !bg-white !bg-opacity-50 !text-xs !text-white`}
      >
        <GrPrevious />
      </div>
      {/* )} */}
    </>
  );
}

import React from "react";
import { Button } from "../Button";

function CourseBannerCard({
  bgImg,
  title,
  subtitle,
  isButtonDisplay,
  currentSlide,
  animationKey,
  style,
}: any) {
  return (
    <div
      className={`relative h-max w-full overflow-hidden rounded-xl ${style} text-white`}
    >
      <Image
        src={bgImg}
        className="h-96 w-full object-cover object-center"
        alt="banner image"
      />
      <div className="absolute inset-0">
        <motion.div
          variants={sliderText}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex h-full w-full flex-col justify-center gap-5 p-8 md:p-10"
          key={animationKey}
        >
          <h2 className="max-w-screen-sm text-3xl font-bold md:text-5xl">
            {title}
          </h2>
          <p className="">{subtitle}</p>
          {isButtonDisplay && (
            <div className="flex gap-3 max-md:items-center max-sm:flex-col">
              <Button variant="blue" className="text-nowrap">
                Enroll Now
              </Button>
              <Button variant="whiteTransparent" className="text-nowrap">
                Explore More
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const sliderContent = [
  {
    id: 1,
    bgImg: vector3,
    title: "Learn something new everyday.",
    subtitle: "Become professionals and ready to join the world.",
    isButtonDisplay: true,
    style: "bg-orange-500",
  },
  {
    id: 2,
    bgImg: vector3,
    title: "Unlock Your Potential in Tech.",
    subtitle: "Join us and take your career to new heights!",
    isButtonDisplay: false,
    style: "bg-blue-900",
  },
  {
    id: 3,
    bgImg: vector3,
    title: "Elevate Your Skills with Expert Guidance.",
    subtitle: "Become professionals and ready to join the world.",
    isButtonDisplay: true,
    style: "bg-orange-500",
  },
];
