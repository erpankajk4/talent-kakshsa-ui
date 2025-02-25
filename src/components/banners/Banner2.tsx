import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import Image from "next/image";
import { vector4 } from "@/assets";

export default function Banner2() {
  return (
    <Wrapper
      bgColor="bg-blue-50"
      containerClassName="pb-10"
      className="max-md:flex-center relative flex w-full justify-between gap-5 overflow-hidden rounded-xl bg-blue-900 p-5 text-white max-md:flex-col md:p-10"
    >
      <Image src={vector4} alt="vector1" className="absolute right-0 top-0" />
      <div className="z-10 max-md:text-center">
        <h2 className="text-2xl font-bold">Join and get amazing discount</h2>
        <p className="text-blue-300">
          With our responsive themes and mobile and desktop apps
        </p>
      </div>
      <Button variant="orange" className="z-10 text-nowrap">
        Subscribe
      </Button>
    </Wrapper>
  );
}
