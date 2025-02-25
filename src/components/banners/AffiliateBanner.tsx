import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import Image from "next/image";
import { vector1, vector2 } from "@/assets";

export default function AffiliateBanner({ title, subtitle }: any) {
  return (
    <Wrapper
      as="section"
      bgColor="bg-orange-500"
      containerClassName="mt-20"
      className="relative"
    >
      <Image src={vector1} alt="logo" className="absolute left-5 top-5" />
      <Image src={vector2} alt="logo" className="absolute bottom-5 right-5" />
      <div className="flex-center relative z-10 flex-col gap-5 py-10">
        <h1 className="text-center text-3xl font-bold capitalize text-white md:text-5xl">
          {title}
        </h1>
        <p className="tracking-widest text-white">{subtitle}</p>
        <div className="flex gap-4 max-sm:flex-col max-sm:items-center">
          <Button
            variant="whiteTransparent"
            className="text-nowrap font-semibold"
          >
            Join Now
          </Button>
          <Button variant="blue" className="text-nowrap font-semibold">
            Subscribe Now
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
