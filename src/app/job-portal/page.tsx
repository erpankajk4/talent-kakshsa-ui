import { icon1 } from "@/assets";
import Banner2 from "@/components/banners/Banner2";
import JobPortalBanner from "@/components/banners/JobPortalBanner";
import JobPortalBanner1 from "@/components/banners/JobPortalBanner1";
import Wrapper from "@/components/Wrappers";
import { color } from "@/data/wrapperData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBullhorn, FaLaptopCode } from "react-icons/fa";
import {
  FaArrowRightLong,
  FaMoneyBillTrendUp,
  FaPeopleGroup,
} from "react-icons/fa6";
import { MdOutlineBusinessCenter, MdOutlineEngineering } from "react-icons/md";
import { TbGraph, TbPencilStar } from "react-icons/tb";

export default function page() {
  return (
    <>
      <JobPortalBanner />
      {/* Explore by category  */}
      <Wrapper bgColor="bg-blue-50" className="py-10">
        <Heading
          t1="Explore by"
          t2="category"
          href="/job-portal/all/all/all/on-site/experience-all/salary-all"
        />
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {jobCategory?.map((item: any, index: number) => (
            <Link
              href={item?.href || "#"}
              key={index}
              className="group cursor-pointer space-y-3 border border-zinc-300 bg-white p-4 duration-300 hover:scale-105 hover:bg-orange-500"
            >
              <div className="mb-5 text-4xl text-orange-500 group-hover:text-white">
                {item?.icon}
              </div>
              <h6 className="font-bold group-hover:text-white">{item?.tile}</h6>
              <p className="flex cursor-pointer items-center gap-2 text-sm text-zinc-500 hover:underline group-hover:text-white">
                {item?.jobs} Jobs available{" "}
                <FaArrowRightLong className="text-black group-hover:text-white" />
              </p>
            </Link>
          ))}
        </ul>
      </Wrapper>
      <JobPortalBanner1 />
      <Wrapper bgColor="bg-blue-50" className="py-10">
        <Heading
          t1="Featured"
          t2="jobs"
          href="/job-portal/all/all/all/on-site/experience-all/salary-all"
        />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)]?.map((item: any, index: number) => (
            <JobCard
              key={index}
              icon={icon1}
              title="Product Designer"
              companyName="Google"
              location="New York, NY"
              type="Full Time"
              description="Revolut is looking for Email Marketing to help team ma ..."
              tags={["marketing", "sales", "design"]}
            />
          ))}
        </ul>
      </Wrapper>
      <Wrapper bgColor="bg-blue-50" className="py-10">
        <Heading
          t1="Latest"
          t2="jobs open"
          href="/job-portal/all/all/all/on-site/experience-all/salary-all"
        />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
          {[...Array(8)]?.map((item: any, index: number) => (
            <JobCard1
              key={index}
              icon={icon1}
              title="Product Designer"
              companyName="Google"
              location="New York, NY"
              type="Full Time"
              description="Revolut is looking for Email Marketing to help team To make a sharp cut on the right bottom side of your section, you can use CSS clip-path. This property allows you to clip elements into different shapes, including diagonal cuts.
              "
              tags={["marketing", "sales", "design"]}
            />
          ))}
        </ul>
      </Wrapper>
      <Banner2 />
    </>
  );
}

const jobCategory = [
  {
    icon: <TbPencilStar />,
    tile: "Design",
    jobs: 500,
    href: "/job-portal/design",
  },
  {
    icon: <TbGraph />,
    tile: "Sales",
    jobs: 500,
    href: "/job-portal/sales",
  },
  {
    icon: <FaBullhorn />,
    tile: "Marketing",
    jobs: 240,
    href: "/job-portal/marketing",
  },
  {
    icon: <FaMoneyBillTrendUp />,
    tile: "Finance",
    jobs: 640,
    href: "/job-portal/finance",
  },
  {
    icon: <FaLaptopCode />,
    tile: "Technology",
    jobs: 140,
    href: "/job-portal/technology",
  },
  {
    icon: <MdOutlineEngineering />,
    tile: "Engineering",
    jobs: 840,
    href: "/job-portal/engineering",
  },
  {
    icon: <MdOutlineBusinessCenter />,
    tile: "Business",
    jobs: 140,
    href: "/job-portal/business",
  },
  {
    icon: <FaPeopleGroup />,
    tile: "Human Resource",
    jobs: 140,
    href: "/job-portal/human-resource",
  },
];

function Heading({ t1 = "", t2 = "", href = "#" }: any) {
  return (
    <div className="mb-5 flex items-center justify-between max-sm:flex-col">
      <h2 className="text-3xl font-bold">
        <span className="text-zinc-800">{t1}</span>{" "}
        <span className="capitalize text-orange-500">{t2}</span>
      </h2>
      <Link href={href}>
        <p className="flex-center cursor-pointer text-right text-orange-500 hover:underline">
          Show all jobs <FaArrowRightLong />
        </p>
      </Link>
    </div>
  );
}

function JobCard({
  icon,
  title,
  companyName,
  location,
  type,
  description,
  tags,
}: any) {
  return (
    <li className="space-y-3 border border-zinc-300 bg-white p-4">
      <div className="flex justify-between">
        <Image src={icon} alt="icon" />
        <p className="h-min border border-red-500 px-2 py-1 text-sm text-red-500">
          {type}
        </p>
      </div>
      <h6 className="font-bold">{title}</h6>
      <p className="flex items-center gap-2 text-sm text-zinc-500">
        {companyName} - {location}
      </p>
      <p className="line-clamp-2 text-sm text-zinc-400">{description}</p>
      <ul className="flex flex-wrap gap-2">
        {tags?.map((item: string, index: number) => (
          <li
            key={index}
            className={`${color[index % color.length]} w-max rounded-full px-2`}
          >
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}
function JobCard1({
  icon,
  title,
  description,
  companyName,
  location,
  type,
  tags,
}: any) {
  return (
    <li className="space-y-3 border border-zinc-300 bg-white p-4">
      <div className="flex gap-2">
        <Image src={icon} alt="icon" />
        <div className="space-y-1">
          <h6 className="font-bold">{title}</h6>
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            {companyName} - {location}
          </p>
          <p className="line-clamp-2 text-zinc-400">{description}</p>
          <ul className="flex flex-wrap gap-2">
            <li className="h-min rounded-full bg-purple-200 px-2 text-sm font-semibold text-purple-600">
              {type}
            </li>
            {tags?.map((item: string, index: number) => (
              <li
                key={index}
                className={`${color[index % color.length]} w-max rounded-full px-2`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
