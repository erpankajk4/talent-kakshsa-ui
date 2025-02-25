import React from "react";
import { Button } from "../Button";
import Image from "next/image";
import formatFees, { discountedAmount, formatRupee } from "@/utils/customText";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { TiPinOutline } from "react-icons/ti";
import Link from "next/link";

export default function CourseFilteredCard({
  slug,
  bgImage,
  courseTitle,
  tutor,
  fees,
  tag,
  reviews,
  discountedPercentage,
  handlePin,
  pinState,
}: any) {
  return (
    <div
      className={`relative w-full rounded-md border-2 border-blue-50 bg-white duration-300 hover:shadow-[0px_0px_20px_2px_#ed8936]`}
    >
      <button
        className={`${pinState ? "shadow-[0px_0px_20px_2px_#ed8936]" : ""} absolute right-3 top-3 rounded-md border border-orange-500 bg-white p-1 text-xl text-orange-500 duration-300 hover:shadow-[0px_0px_20px_2px_#ed8936] active:shadow-[0px_0px_20px_2px_#ed8936]`}
        onClick={() => handlePin(!pinState)}
      >
        <TiPinOutline />
      </button>
      <div className="p-5 pb-3">
        <Image
          src={bgImage}
          alt="logo"
          width={500}
          height={500}
          className="h-60 w-full rounded-md object-cover"
        />
      </div>
      <div className="space-y-3 p-5 pt-0">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="rounded-e-full rounded-s-full bg-zinc-300 px-4 py-1 font-semibold">
            {tag}
          </p>
          <p className="flex flex-wrap items-center text-zinc-400">
            <FaStar className="text-yellow-500" />({reviews} Review)
          </p>
        </div>
        <Link href={slug ? `courses/${slug}` : `#`}>
          <h2 className="poppins-bold cursor-pointer text-lg hover:text-blue-900">
            {courseTitle}
          </h2>
        </Link>
        <p>By {tutor}</p>
        <div className="flex items-center justify-between">
          <Button
            variant="orangeAnimated"
            className="poppins-bold flex items-center gap-2 text-nowrap"
          >
            Enroll Now <FaArrowRightLong />
          </Button>
          <div className="text-right">
            <p className="poppins-bold text-lg">
              ₹{" "}
              {discountedPercentage
                ? formatRupee(discountedAmount(fees, discountedPercentage))
                : formatRupee(fees)}
            </p>
            {discountedPercentage && (
              <p className="poppins-medium text-zinc-500 line-through">
                ₹ {formatRupee(fees)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseFilteredCardList({
  slug,
  bgImage,
  courseTitle,
  tutor,
  fees,
  tag,
  reviews,
  handlePin,
  pinState,
}: any) {
  return (
    <div
      className={`relative flex w-full rounded-md bg-white duration-300 hover:shadow-[0px_0px_20px_2px_#ed8936]`}
    >
      <button
        className={`${pinState ? "shadow-[0px_0px_20px_2px_#ed8936]" : ""} absolute left-3 top-3 rounded-md border border-orange-500 bg-white p-1 text-xl text-orange-500 duration-300 hover:shadow-[0px_0px_20px_2px_#ed8936] active:shadow-[0px_0px_20px_2px_#ed8936]`}
        onClick={() => handlePin(!pinState)}
      >
        <TiPinOutline />
      </button>
      <div className="p-5">
        <Image
          src={bgImage}
          alt="logo"
          width={500}
          height={500}
          className="h-32 w-60 rounded-md object-cover"
        />
      </div>
      <div className="flex w-full space-y-5 p-5 pl-0 max-md:flex-col md:justify-between">
        <div className="space-y-3">
          <p className="max-w-min rounded-e-full rounded-s-full bg-zinc-300 px-4 py-1 font-semibold">
            {tag}
          </p>
          <div>
            <Link href={slug ? `courses/${slug}` : `#`}>
              <h2 className="poppins-bold cursor-pointer text-lg hover:text-blue-900">
                {courseTitle}
              </h2>
            </Link>
            <p>By {tutor}</p>
            <p className="flex items-center text-zinc-400">
              <FaStar className="text-yellow-500" />({reviews} Review)
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-3 md:items-center">
          <Button
            variant="orangeAnimated"
            className="poppins-bold flex items-center gap-2 text-nowrap"
          >
            Enroll Now <FaArrowRightLong />
          </Button>
          <p className="poppins-bold text-lg">₹ {formatRupee(fees)}</p>
        </div>
      </div>
    </div>
  );
}

export function CourseFilteredCardSkeleton() {
  return (
    <div className="relative w-full rounded-md border-2 border-blue-50 bg-white duration-300">
      <div className="absolute right-3 top-3 h-8 w-8 rounded-md bg-gray-300" />
      <div className="h-60 p-5">
        <div className="h-full w-full rounded-md bg-gray-300" />
      </div>
      <div className="space-y-3 p-5 pt-0">
        <div className="flex items-center justify-between gap-2">
          <div className="h-6 w-16 rounded-e-full rounded-s-full bg-gray-300" />
          <div className="h-6 w-24 rounded bg-gray-300" />
        </div>
        <div className="h-6 w-3/4 rounded bg-gray-300" />
        <div className="h-4 w-1/2 rounded bg-gray-300" />
        <div className="flex items-center justify-between">
          <div className="h-10 w-24 rounded bg-gray-300" />
          <div className="h-6 w-20 rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

export function CourseFilteredCardListSkeleton() {
  return (
    <div className="relative flex w-full rounded-md bg-white duration-300">
      <div className="absolute left-3 top-3 h-8 w-8 rounded-md bg-gray-300" />
      <div className="p-5">
        <div className="h-32 w-60 rounded-md bg-gray-300" />
      </div>
      <div className="flex w-full space-y-5 p-5 pl-0 max-md:flex-col md:justify-between">
        <div className="space-y-3">
          <div className="h-6 w-16 rounded-e-full rounded-s-full bg-gray-300" />
          <div className="space-y-2">
            <div className="h-6 w-3/4 rounded bg-gray-300" />
            <div className="h-4 w-1/2 rounded bg-gray-300" />
            <div className="h-6 w-24 rounded bg-gray-300" />
          </div>
        </div>
        <div className="flex flex-col space-y-3 md:items-center">
          <div className="h-10 w-24 rounded bg-gray-300" />
          <div className="h-6 w-20 rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
