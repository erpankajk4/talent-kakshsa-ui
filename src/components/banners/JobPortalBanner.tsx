"use client";
import React from "react";
import Wrapper from "../Wrappers";
import Image from "next/image";
import { Banner4, pattern1, vector5 } from "@/assets";
import { IoIosSearch } from "react-icons/io";
import JobKeywordTypeHead from "../jobPortalSections/SeachBar/JobKeywordTypeHead";
import { IoLocationOutline } from "react-icons/io5";
import LocationTypeHead from "../jobPortalSections/SeachBar/LocationTypeHead";
import { Button } from "../Button";

export default function JobPortalBanner() {
  return (
    <Wrapper
      as="section"
      bgColor="bg-neutral-100"
      containerClassName="mt-20 relative overflow-hidden clip-right-bottom"
      className=""
    >
      <div className="relative z-10 space-y-5 py-5 md:py-16">
        <div>
          <h2 className="text-3xl font-bold text-blue-950 md:text-6xl">
            Discover <br /> more than <br />
            <span className="text-orange-500">5000+ Jobs</span>
          </h2>
          <Image src={vector5} className="object-contain" alt="vector" />
        </div>
        <p className="text-zinc-500">
          Great platform for the job seeker that is searching for new career{" "}
          <br />
          heights and is passionate about startups.
        </p>

        {/* Search Bar */}
        <SearchBar />
      </div>

      {/* Image Behind Main Content */}
      <div className="absolute right-0 top-0">
        <Image
          src={pattern1}
          className="h-[500px] object-contain"
          alt="pattern"
        />
      </div>
      <div className="absolute right-[10%] top-10 max-md:hidden">
        <Image
          src={Banner4}
          className="h-[500px] object-contain"
          alt="pattern"
        />
      </div>
    </Wrapper>
  );
}

function SearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white p-4 shadow-md max-md:flex-col md:w-max">
      <div className="flex items-center space-x-2">
        <IoIosSearch className="text-lg" />
        <JobKeywordTypeHead />
      </div>
      <div className="flex items-center space-x-2">
        <IoLocationOutline className="text-lg" />
        <LocationTypeHead />
      </div>
      <Button variant="blue" className="!text-nowrap !text-sm">
        Search my job
      </Button>
    </div>
  );
}
