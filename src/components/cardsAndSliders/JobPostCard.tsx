import React from "react";
import moment from "moment";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { GrLineChart } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { MdCurrencyRupee, MdOutlineWorkHistory } from "react-icons/md";
import { Button } from "../Button";
import Link from "next/link";

export default function JobPostCard({
  id,
  isActivelyHiring,
  title,
  companyName,
  isPartTime,
  isFullTime,
  isRemote,
  isOffice,
  isHybrid,
  startDate,
  minSalary,
  maxSalary,
  jobPostDate,
  location,
  noOfOpening,
  minExperience,
  maxExperience,
}: any) {
  return (
    <div className="space-y-2 rounded-lg bg-white p-3 text-left">
      {isActivelyHiring && (
        <p className="flex w-max items-center gap-2 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-600">
          <GrLineChart /> Actively hiring
        </p>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="">{companyName}</p>
      <div className="flex flex-wrap gap-2 gap-x-5">
        {isRemote && (
          <p className="flex items-center gap-2">
            <IoLocationOutline /> Remote
          </p>
        )}
        {isOffice && (
          <p className="flex items-center gap-2">
            <IoLocationOutline />
            Office
          </p>
        )}
        {isHybrid && (
          <p className="flex items-center gap-2">
            <IoLocationOutline />
            Hybrid
          </p>
        )}
        {isPartTime && (
          <p className="flex items-center gap-2 bg-blue-100 px-2 py-1 text-sm text-blue-600">
            <MdOutlineWorkHistory />
            PartTime
          </p>
        )}
        {isFullTime && (
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
          <p>{startDate}</p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-sm text-zinc-400">
            <MdCurrencyRupee />
            CTC (ANNUAL)
          </p>
          <p>
            INR {minSalary} – {maxSalary} Lac
          </p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm text-zinc-400">
            <FaRegCalendarAlt />
            EXPERIENCE
          </p>
          <p>
            {minExperience} – {maxExperience} Years
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 gap-x-8">
        <p className="flex items-center gap-2 bg-blue-100 px-2 py-1 text-sm text-blue-600">
          <FaRegClock />
          {moment(jobPostDate).fromNow()}
        </p>
        <p className="flex items-center gap-2 bg-zinc-100 px-2 py-1 text-sm text-zinc-800">
          <IoLocationOutline />
          {location}
        </p>
        <p className="bg-orange-100 px-2 py-1 text-sm text-orange-600">
          {noOfOpening} Openings
        </p>
      </div>
      <div className="flex justify-end border-t border-zinc-300 pt-3">
        <Link href={id ? `/job-portal/job-description/${id}` : "#"}>
          <Button variant="orange" className="text-nowrap">
            See Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
