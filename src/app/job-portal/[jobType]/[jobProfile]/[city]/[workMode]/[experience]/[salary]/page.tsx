"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import JobKeywordTypeHead from "@/components/jobPortalSections/SeachBar/JobKeywordTypeHead";
import LocationTypeHead from "@/components/jobPortalSections/SeachBar/LocationTypeHead";
import Wrapper from "@/components/Wrappers";
import { IoIosCloseCircleOutline, IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { TbFilterCheck } from "react-icons/tb";
import JobPostCard from "@/components/cardsAndSliders/JobPostCard";
import { jobPost } from "@/data/job-portal";

export default function JobPortalFilterPage({
  params,
}: {
  params: {
    jobType: string;
    jobProfile: string;
    city: string;
    workMode: string;
    experience: string;
    salary: string;
  };
}) {
  const router = useRouter();
  const { jobType, jobProfile, city, workMode, experience, salary } = params;
  const jobProfileArray = decodeURIComponent(params.jobProfile).split(",");
  const jobTypeArray = jobType.split(",");
  const cityArray = decodeURIComponent(params.city).split(",");
  const workModeArray = workMode.split(",");
  // Parse experience and salary (assuming they are passed as numbers after `experience-` and `salary-`)
  const experienceYear = parseInt(experience.replace("experience-", ""), 10);
  const salaryRange = parseInt(salary.replace("salary-", ""), 10);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobProfile: jobProfileArray, // List of job profiles
    location: cityArray, // List of cities
    isPartTime: jobTypeArray.includes("part-time"), // Check if part-time is selected
    isFullTime: jobTypeArray.includes("full-time"), // Check if full-time is selected
    isRemote: workModeArray.includes("work-from-home"), // Check if work-from-home is selected
    salaryRange: salaryRange || 0, // Set salary range (default to 0 if not available)
    experienceYear: experienceYear || 0, // Set experience (default to 0 if not available)
  });

  // Function to handle filter changes and update the URL
  const updateURL = () => {
    // Default to 'all' when filters are empty
    const updatedJobType =
      [
        filters.isPartTime ? "part-time" : "",
        filters.isFullTime ? "full-time" : "",
      ]
        .filter(Boolean)
        .join(",") || "all";

    const updatedJobProfile =
      filters.jobProfile.length > 0
        ? filters.jobProfile
            .map((profile) => profile.replace(/\s+/g, "-"))
            .join(",")
        : "all";
    const updatedCity =
      filters.location.length > 0
        ? filters.location.map((city) => city.replace(/\s+/g, "-")).join(",")
        : "all";
    const updatedWorkMode = filters.isRemote ? "work-from-home" : "on-site";
    const updatedExperience =
      filters.experienceYear > 0
        ? `experience-${filters.experienceYear}`
        : "experience-all";
    const updatedSalary =
      filters.salaryRange > 0 ? `salary-${filters.salaryRange}` : "salary-all";

    // Update the URL programmatically
    const newUrl = `/job-portal/${encodeURIComponent(updatedJobType)}/${updatedJobProfile}/${updatedCity}/${updatedWorkMode}/${updatedExperience}/${updatedSalary}`;
    router.push(newUrl);
  };

  // // Effect to update URL whenever filters change
  useEffect(() => {
    updateURL();
  }, [filters]);

  console.log(filters);
  const handleSalaryRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), 10); // Cap the value at 10
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      salaryRange: value,
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };
  const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      experienceYear: Number(e.target.value),
    }));
  };
  return (
    <>
      <Wrapper
        bgColor="bg-blue-50"
        containerClassName="pt-24 lg:px-36"
        className="grid grid-cols-12 gap-5"
      >
        <div className="max-md:hidden md:col-span-4"></div>
        <div className="col-span-12 text-center md:col-span-8">
          <h2 className="text-xl font-semibold">1234 Jobs</h2>
          <p className="text-lg">
            Search and Apply to Latest Job Vacancies & Openings in India
          </p>
        </div>
      </Wrapper>
      <Wrapper
        bgColor="bg-blue-50"
        containerClassName="py-16 pt-5  lg:px-36"
        className="relative grid grid-cols-12 gap-5"
      >
        <button
          className="flex w-max items-center gap-2 rounded-full border border-orange-500 px-2 py-1 md:hidden"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <TbFilterCheck className="text-orange-500" />
          Filters
        </button>
        <aside
          className={`col-span-12 rounded-lg bg-white p-3 md:sticky md:top-16 md:col-span-4 md:block md:h-screen ${
            showFilters
              ? "fixed inset-0 z-50 overflow-y-auto bg-white"
              : "hidden"
          }`}
        >
          <button
            className="!fixed !right-4 !top-4 !z-50 text-3xl text-black hover:text-orange-500 md:hidden"
            onClick={() => setShowFilters((pre) => !pre)}
          >
            <IoIosCloseCircleOutline />
          </button>
          <h2 className="mx-auto mb-5 flex w-max items-center gap-2 text-xl font-bold">
            <TbFilterCheck className="text-orange-500" /> Filter
          </h2>
          <div className="mb-5">
            <p className="mb-3 ml-1">Profile</p>
            <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-400 p-1.5">
              <JobKeywordTypeHead
                setInputs={setFilters}
                defaultJobProfiles={jobProfileArray}
              />
            </div>
          </div>
          <div className="mb-5">
            <p className="mb-3 ml-1">Location</p>
            <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-400 p-1.5">
              <LocationTypeHead
                setInputs={setFilters}
                defaultCities={cityArray}
              />
            </div>
          </div>
          <div>
            {/* Checkboxes for job types */}
            <div className="mb-5 flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPartTime"
                  checked={filters.isPartTime}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Part-Time
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isRemote"
                  checked={filters.isRemote}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Include work from home also
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFullTime"
                  checked={filters.isFullTime}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Full-Time
              </label>
            </div>
          </div>
          {/* Annual salary  */}
          <div className="mb-5">
            <p className="mb-3 ml-1">Annual salary (in lakhs)</p>
            <input
              type="range"
              min="0"
              max="12"
              step={1}
              value={filters.salaryRange}
              onChange={handleSalaryRangeChange}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 outline-none"
              style={{
                cursor: "pointer",
                background: `linear-gradient(to right, rgb(229 231 235 ) ${
                  (filters.salaryRange / 12) * 100
                }%, rgb(249, 115, 22) ${(filters.salaryRange / 12) * 100}%)`,
              }}
            />
            <div className="flex justify-between pr-[0.8rem]">
              {[0, 2, 4, 6, 8, 10].map((item, index) => (
                <span key={index}>{item}</span>
              ))}
              <span> </span>
            </div>
          </div>
          {/* Years of Experience  */}
          <div className="mb-5">
            <p className="mb-3 ml-1">Years of Experience</p>
            <select
              value={filters.experienceYear}
              onChange={handleExperienceChange}
              className="w-full rounded-lg border border-zinc-400 p-2"
            >
              <option value={0}>Fresher</option>
              <option value={1}>1 year</option>
              <option value={2}>2 years</option>
              <option value={3}>3 years</option>
              <option value={4}>4 years</option>
              <option value={5}>5 years</option>
              <option value={6}>&gt;5 years</option>
            </select>
          </div>
          <Button variant="orange" className="!w-full">
            Apply Filters
          </Button>
        </aside>
        <div className="col-span-12 space-y-5 text-center md:col-span-8">
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
      </Wrapper>
    </>
  );
}

// src\app\job-portal\[jobType]\[jobProfile]\[city]\[workMode]\[experience]\[salary]\page.tsx

//   {
//   jobProfile: [ { id: 1, name: 'Digital Marketing' }, { id: 3, name: 'SEO' } ],
//   location: [ { id: 1, name: 'Delhi' }, { id: 3, name: 'Banglore' } ],
//   isPartTime: false,
//   isFullTime: false,
//   isRemote: false,
//   salaryRange: 0,
//   experienceYear: 0
// }
