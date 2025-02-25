import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import Image from "next/image";
import { vector1, vector2 } from "@/assets";
import NewsTypeHeadSearchBar from "../TypeHeadSearchBar/NewsTypeHeadSearchBar";

export default function BlogBanner({ title, subtitle }: any) {
  return (
    <Wrapper
      as="section"
      bgColor="bg-orange-500"
      containerClassName="mt-20"
      className="relative"
    >
      <Image src={vector1} alt="logo" className="absolute left-5 top-5" />
      <Image src={vector2} alt="logo" className="absolute bottom-5 right-5" />
      <div className="flex-center flex-col gap-5 py-10">
        <h1 className="text-3xl font-bold capitalize text-white md:text-5xl">
          {title}
        </h1>
        <p className="tracking-widest text-white">{subtitle}</p>
        <div className="flex gap-4 max-sm:flex-col max-sm:items-center">
          <Button
            variant="whiteTransparent"
            className="text-nowrap font-semibold"
          >
            Read More
          </Button>
          <Button variant="blue" className="text-nowrap font-semibold">
            Subscribe Now
          </Button>
        </div>
        {/* Search Bar */}
        <div className="relative mx-auto mb-10 flex h-min w-full max-w-screen-sm items-center gap-2 rounded-full bg-white px-2 py-2 focus-within:border-orange-500">
          <NewsTypeHeadSearchBar />
        </div>
      </div>
    </Wrapper>
  );
}
