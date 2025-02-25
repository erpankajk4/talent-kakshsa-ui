import Wrapper from "@/components/Wrappers";
import { jobPost } from "@/data/job-portal";
import moment from "moment";
import React from "react";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { MdCurrencyRupee, MdOutlineWorkHistory } from "react-icons/md";
import { GiDart } from "react-icons/gi";
import { Button } from "@/components/Button";

export default function JobDescriptionPage() {
  return (
    <Wrapper
      bgColor="bg-blue-50"
      containerClassName="mt-14 py-16 lg:px-36"
      className="space-y-8"
    >
      <h1 className="text-center text-xl font-bold md:text-3xl">
        {jobPost?.title} Job in {jobPost?.location?.city} at{" "}
        {jobPost?.company?.name}
      </h1>
      <div className="space-y-2 rounded-lg bg-white p-3 text-left">
        {jobPost?.isFeatured && (
          <p className="flex w-max items-center gap-2 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-600">
            <GrLineChart /> Actively hiring
          </p>
        )}
        <h2 className="text-xl font-semibold">{jobPost?.title}</h2>
        <p>{jobPost?.company?.name}</p>
        <div className="flex flex-wrap gap-2 gap-x-5">
          {jobPost?.isRemote && (
            <p className="flex items-center gap-2">
              <IoLocationOutline /> Remote
            </p>
          )}
          {jobPost?.isOffice && (
            <p className="flex items-center gap-2">
              <IoLocationOutline />
              Office
            </p>
          )}
          {jobPost?.isHybrid && (
            <p className="flex items-center gap-2">
              <IoLocationOutline />
              Hybrid
            </p>
          )}
          {jobPost?.isPartTime && (
            <p className="flex items-center gap-2 bg-blue-100 px-2 py-1 text-sm text-blue-600">
              <MdOutlineWorkHistory />
              PartTime
            </p>
          )}
          {jobPost?.isFullTime && (
            <p className="flex items-center gap-2 bg-blue-100 px-2 py-1 text-sm text-blue-600">
              <MdOutlineWorkHistory />
              FullTime
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 gap-x-8">
          <div>
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              <FaRegCalendarAlt />
              START DATE
            </p>
            <p>{jobPost?.startDate}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm text-zinc-400">
              <MdCurrencyRupee />
              CTC (ANNUAL)
            </p>
            <p>
              INR {jobPost?.salaryRange?.min} – {jobPost?.salaryRange?.max} Lac
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              <FaRegCalendarAlt />
              EXPERIENCE
            </p>
            <p>
              {jobPost?.experienceRequired?.min} –{" "}
              {jobPost?.experienceRequired?.max} Years
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm text-zinc-400">
              <FaRegCalendarAlt />
              APPLY BY
            </p>
            <p>{jobPost?.applicationDeadline}</p>
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-2 gap-x-8 border-b border-zinc-300 pb-5">
          <p className="flex items-center gap-2 bg-blue-100 px-2 py-1 text-sm text-blue-600">
            <FaRegClock />
            {moment(jobPost?.jobPostDate).fromNow()}
          </p>
          <p className="flex items-center gap-2 bg-zinc-100 px-2 py-1 text-sm text-zinc-800">
            <IoLocationOutline />
            {jobPost?.location?.city}
          </p>
          <p className="flex items-center gap-2 bg-orange-100 px-2 py-1 text-sm text-orange-600">
            <IoLocationOutline />
            {jobPost?.noOfOpening} Openings
          </p>
        </div>
        <p className="mt-5 flex items-center gap-2">
          <GiDart className="text-red-600" />
          Be an early applicant
        </p>
        <h2 className="text-xl font-bold">About the Job</h2>
        <p>{jobPost?.description}</p>
        <ul className="list-disc pl-5">
          {jobPost?.AboutJob?.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <h3 className="text-lg font-semibold">Key Responsibilities</h3>
        <ul className="list-disc pl-5">
          {jobPost?.responsibilities?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold">Skill(s) Required</h3>
        <ul className="flex flex-wrap gap-3">
          {jobPost?.requirements?.skills?.map((item, index) => (
            <li
              key={index}
              className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-blue-500"
            >
              {item}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold">Number of openings</h3>
        <p>{jobPost?.noOfOpening}</p>
        <h3 className="text-xl font-semibold">
          About {jobPost?.company?.name}
        </h3>
        <p className="mb-5 border-b border-zinc-400 pb-5">
          {jobPost?.company?.description}
        </p>
        <Button className="!mx-auto text-nowrap">Apply Now</Button>
      </div>
    </Wrapper>
  );
}
