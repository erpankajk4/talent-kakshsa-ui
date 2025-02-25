import { vector1, vector2, vector3 } from "@/assets";
import JobPostCard from "@/components/cardsAndSliders/JobPostCard";
import Wrapper from "@/components/Wrappers";
import { company, jobPost } from "@/data/job-portal";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

export default function CompanyPage() {
  return (
    <Wrapper bgColor="bg-blue-50" containerClassName="mt-14 py-10">
      <CompanyBanner />
      <div className="space-y-5 pt-10">
        <h2 className="text-3xl font-bold text-zinc-700">Overview</h2>
        <div className="rounded-lg border border-zinc-300 bg-white p-2 md:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:gap-20">
            <div className="grid grid-cols-2">
              <div className="col-span-1 space-y-2">
                <p>Hiring since </p>
                <p>Opportunities posted </p>
                <p>Location</p>
              </div>
              <div className="col-span-1 space-y-2">
                <p>{company?.establishedYear}</p>
                <p>{company?.noOfOpening}</p>
                <p>
                  {company?.locations
                    ?.map((location) => location.city)
                    .join(", ")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1 space-y-2">
                <p>Employee count</p>
                <p>Candidates hired</p>
                <p>Industry</p>
              </div>
              <div className="col-span-1 space-y-2">
                <p>{company?.employeeCount}</p>
                <p>{company?.candidatesHired}</p>
                <p>{company?.industryType}</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4 className="text-2xl font-bold">About {company?.name}</h4>
            <p>{company?.description}</p>
          </div>
        </div>
      </div>
      <div className="space-y-5 py-10">
        <h2 className="text-3xl font-bold text-zinc-700">Job Openings</h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <JobPostCard
              key={index}
              id={jobPost.id}
              isActivelyHiring={jobPost?.isFeatured}
              title={jobPost?.title}
              companyName={jobPost?.company?.name}
              isPartTime={jobPost?.isPartTime}
              isFullTime={jobPost?.isFullTime}
              isRemote={jobPost?.isRemote}
              isHybrid={jobPost?.isHybrid}
              isOffice={jobPost?.isOffice}
              startDate={jobPost?.startDate}
              minSalary={jobPost?.salaryRange?.min}
              maxSalary={jobPost?.salaryRange?.max}
              jobPostDate={jobPost?.jobPostDate}
              location={jobPost?.location?.city}
              noOfOpening={jobPost?.noOfOpening}
              minExperience={jobPost?.experienceRequired?.min}
              maxExperience={jobPost?.experienceRequired?.max}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

function CompanyBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-orange-500">
      <Image
        src={vector3}
        width={2500}
        height={2500}
        alt="banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <Image src={vector1} alt="vector" className="absolute left-5 top-5" />
      <Image src={vector2} alt="vector" className="absolute bottom-5 right-5" />
      <div className="flex w-full justify-center gap-5 p-16 text-white max-sm:flex-col max-sm:items-center max-sm:px-5 md:px-28">
        <div className="flex-center h-min w-28 rounded-lg bg-white p-2">
          <Image
            alt="logo"
            src={company?.logoUrl}
            className="w-full object-contain"
          />
        </div>
        <div className="w-full max-sm:text-center">
          <h2 className="text-3xl font-bold text-white">{company?.name}</h2>
          <p className="flex items-center gap-2 max-sm:justify-center">
            <FaLocationDot />
            {`${company?.headquarters?.city}, ${company?.headquarters?.state}, ${company?.headquarters?.country}`}
          </p>
        </div>
      </div>
    </div>
  );
}
