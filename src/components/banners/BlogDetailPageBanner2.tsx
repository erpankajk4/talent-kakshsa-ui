import Image from "next/image";
import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import Link from "next/link";
import { MdArrowForwardIos, MdOutlineVideoLibrary } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { StarRating } from "../StarRating";
import { IoPeopleSharp } from "react-icons/io5";

export default function BlogDetailPageBanner2({
  text,
  priceLink,
  reviews,
  rating,
  students,
}: any) {
  return (
    <div className="my-10 grid grid-cols-1 overflow-hidden rounded-lg bg-white md:grid-cols-10">
      {/* 1  */}
      <div className="flex-center w-full flex-col bg-blue-900 py-5 text-white md:col-span-4 md:py-10">
        <MdOutlineVideoLibrary className="text-4xl" />
        <p className="font-semibold">Included in plans</p>
      </div>
      {/* 2  */}
      <div className="grid md:col-span-6 md:grid-cols-12">
        <div className="flex-center col-span-6 p-5 md:p-10">
          <p className="text-sm">
            {text}{" "}
            <Link href={priceLink ? priceLink : "#"}>See Plans & Pricing</Link>
          </p>
        </div>
        <div className="flex-center col-span-3 flex-col text-blue-900">
          <p className="text-3xl font-bold text-blue-900">4.7</p>
          <StarRating rating={rating} totalStars={5} />
          <p className="text-sm text-zinc-400 underline">{reviews} Reviews</p>
        </div>
        <div className="flex-center col-span-3 flex-col leading-4 text-blue-900">
          <IoPeopleSharp className="text-4xl" />
          <p className="text-bold">{students}+</p>
          <p className="text-sm text-zinc-400">learners</p>
        </div>
      </div>
    </div>
  );
}

export function NewsDetailPageBannerSkeleton() {
  return <div></div>;
}
