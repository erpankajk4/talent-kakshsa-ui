import { course1, icon } from "@/assets";
import { discountedAmount, formatRupee } from "@/utils/customText";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../Button";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import CourseFilteredCard from "../cardsAndSliders/CourseFilteredCard";

export default function PriceAndMaterialIncluded() {
  return (
    <>
      {true ? (
        <div className="space-y-2 rounded-lg border border-zinc-400 bg-white p-3">
          <h2 className="text-lg font-bold">Price</h2>
          <div className="flex flex-wrap items-center justify-between gap-2 font-semibold">
            <p className="flex items-center">
              <span className="text-xl font-extrabold text-blue-900">
                ₹ {formatRupee(discountedAmount(4999, 20))}
              </span>
              <span className="text-zinc-700 line-through">
                / ₹ {formatRupee(4999)}
              </span>
            </p>
            <p className="text-blue-900">-{20}% Off</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-between">
            <Button variant="white" className="text-nowrap !px-3">
              Watch Demo
            </Button>
            <Button variant="blue" className="text-nowrap !px-7">
              Buy Now
            </Button>
          </div>
          <p className="text-lg font-bold">Material Included</p>
          <div className="space-y-2">
            {[0, 1, 2, 3, 4]?.map((item: any, index: number) => (
              <Card
                key={index}
                icon={icon}
                title={"Authentic Certificate"}
                desc={"Earn a Certificate upon completion"}
                slug={"#"}
              />
            ))}
          </div>
          {/* Social links  */}
          <div className="space-y-2 rounded-lg bg-blue-900 p-5 text-white">
            <p>Follows Us</p>
            <div className="flex gap-5 text-3xl">
              <Link href={"#"}>
                <FaFacebookSquare />
              </Link>
              <Link href={"#"}>
                <FaSquareXTwitter />
              </Link>
              <Link href={"#"}>
                <FaLinkedin />
              </Link>
            </div>
          </div>
          <h2 className="text-lg font-bold">TAGS</h2>
          <ul className="flex flex-wrap gap-2">
            {["graphics", "3d", "animation", "video"]?.map(
              (item: any, index: number) => (
                <li key={index}>
                  <Button
                    variant="white"
                    className="text-nowrap !px-3 capitalize"
                  >
                    {item}
                  </Button>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : (
        <CardSkeleton />
      )}
    </>
  );
}

export function PopularCourses() {
  const [PinState, setPinState] = useState(false);
  return (
    <div className="space-y-2 rounded-lg border border-zinc-400 bg-white p-3 max-md:hidden">
      <h2 className="text-lg font-bold">Popular Courses</h2>
      <div className="space-y-4">
        {[0, 1, 2, 3, 4]?.map((item: any, index: number) => (
          <CourseFilteredCard
            key={index}
            slug={"#"}
            bgImage={course1}
            courseTitle={"Learning JavaScript With Imagination"}
            tutor={"Pankaj Kumar"}
            fees={50000}
            tag={"Development"}
            reviews={5}
            handlePin={setPinState}
            pinState={PinState}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ icon, title, desc, slug }: any) {
  return (
    <div className="flex cursor-pointer items-center gap-x-2 rounded-lg p-2 hover:bg-gray-100">
      <div className="flex-center h-14 w-14 rounded-md bg-blue-900 p-2">
        <Image
          src={icon}
          alt="logo"
          width={100}
          height={100}
          className="h-8 w-8 object-contain"
        />
      </div>
      <div>
        <Link href={slug ? `${slug}` : `#`}>
          <h3 className="line-clamp-2 cursor-pointer font-semibold text-black hover:text-blue-900">
            {title}
          </h3>
        </Link>
        {desc && <p className="text-xs text-zinc-400">{desc}</p>}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-400 bg-white p-3">
      <div className="h-6 w-24 rounded bg-gray-300" />
      <div className="flex flex-wrap items-center justify-between gap-2 font-semibold">
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 rounded bg-gray-300" />
          <div className="h-4 w-12 rounded bg-gray-300" />
        </div>
        <div className="h-6 w-16 rounded bg-gray-300" />
      </div>
      <div className="flex justify-between gap-2">
        <div className="h-10 w-24 rounded bg-gray-300" />
        <div className="h-10 w-24 rounded bg-gray-300" />
      </div>
      <div className="h-6 w-36 rounded bg-gray-300" />
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((_, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <div className="flex-center h-14 w-14 rounded-md bg-gray-300 p-2" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-300" />
              <div className="h-3 w-1/2 rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 rounded-lg bg-gray-300 p-5">
        <div className="h-6 w-24 rounded bg-gray-400" />
        <div className="flex gap-5">
          <div className="h-8 w-8 rounded-md bg-gray-400" />
          <div className="h-8 w-8 rounded-md bg-gray-400" />
          <div className="h-8 w-8 rounded-md bg-gray-400" />
        </div>
      </div>
      <div className="h-6 w-24 rounded bg-gray-300" />
      <ul className="flex flex-wrap gap-2">
        {[0, 1, 2].map((_, index) => (
          <li key={index} className="h-8 w-20 rounded bg-gray-300" />
        ))}
      </ul>
    </div>
  );
}
