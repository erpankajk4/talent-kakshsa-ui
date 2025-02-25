"use client";
import React from "react";
import Wrapper from "../Wrappers";
import Image from "next/image";
import { banner5 } from "@/assets";
import Link from "next/link";

export default function JobPortalBanner1() {
  return (
    <Wrapper
      as="section"
      bgColor="bg-neutral-100"
      containerClassName="relative clip-right-bottom overflow-hidden py-16"
      className="clip-top-left grid grid-cols-1 bg-orange-500 max-md:p-2 md:grid-cols-2 md:pt-8"
    >
      {/* left  */}
      <div className="relative z-10 col-span-1 flex flex-col justify-center gap-3 p-5 text-white max-md:items-center max-md:text-center md:gap-8 md:py-16 md:pl-10">
        <h2 className="text-3xl font-bold md:text-6xl">
          Start finding your <br /> dream jobs today
        </h2>
        <p className="text-sm md:text-xl">
          Start landing in your dream company at no cost.
        </p>
        <Link
          href="/job-portal"
          className="w-max bg-white px-4 py-2 font-bold text-orange-500 hover:underline md:text-xl"
        >
          Sign Up For Free
        </Link>
      </div>
      {/* right  */}
      <div className="col-span-1 max-md:p-5 max-md:pt-0">
        <Image
          src={banner5}
          width={1000}
          height={1000}
          alt="banner"
          className="w-full object-contain"
        />
      </div>
    </Wrapper>
  );
}
