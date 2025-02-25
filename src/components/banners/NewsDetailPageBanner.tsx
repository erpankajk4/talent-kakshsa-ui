import Image from "next/image";
import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";

export default function NewsDetailPageBanner({
  title,
  tags,
  description,
  lastUpdated,
  bgImage,
}: any) {
  return (
    <Wrapper
      as="section"
      bgColor="bg-orange-500"
      containerClassName="mt-20"
      className="relative flex gap-5 py-10 max-md:flex-col md:flex-row-reverse md:py-16"
    >
      <Image
        src={bgImage}
        alt="logo"
        width={500}
        height={500}
        className="max-h-80 w-full flex-[1] rounded-xl object-cover"
      />
      <div className="flex-[1] space-y-4">
        {/* BreadCrumb  */}
        <div className="flex items-center gap-3 text-black">
          <Link href={"/"} className="cursor-pointer">
            Home
          </Link>
          <MdArrowForwardIos />
          <Link href={"/news"} className="cursor-pointer">
            News
          </Link>
          <MdArrowForwardIos />
          <p className="text-blue-900">News Article</p>
        </div>
        <h1 className="text-3xl font-bold capitalize text-white md:text-5xl">
          {title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag: any, index: number) => (
            <span
              key={index}
              className="rounded-full bg-blue-900 px-4 py-1 text-sm text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-black">{description}</p>
        <p className="flex items-center gap-3 text-sm text-white">
          <IoMdCalendar className="text-xl" />
          <span>Last Updated: {lastUpdated}</span>
        </p>

        <Button variant="blue" className="text-nowrap font-semibold">
          Subscribe Now
        </Button>
      </div>
    </Wrapper>
  );
}

export function NewsDetailPageBannerSkeleton() {
  return (
    <Wrapper
      as="section"
      bgColor="bg-orange-500"
      containerClassName="mt-20"
      className="relative flex gap-5 py-10 max-md:flex-col md:flex-row-reverse md:py-16"
    >
      <div className="max-h-80 w-full flex-[1] animate-pulse rounded-xl bg-gray-200"></div>
      <div className="flex-[1] space-y-4">
        {/* BreadCrumb Skeleton */}
        <div className="flex items-center gap-3 text-black">
          <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200"></div>
        </div>
        <div className="h-10 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
        </div>
        <div className="h-6 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-6 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200"></div>
        </div>
        <div className="h-10 w-40 animate-pulse rounded-md bg-blue-900"></div>
      </div>
    </Wrapper>
  );
}
