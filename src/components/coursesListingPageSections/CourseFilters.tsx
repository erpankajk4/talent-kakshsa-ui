import Filter from "@/components/filters/Filter";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";

import { getAllModes } from "@/graphql/courseQuery/course";
import { useQuery } from "@apollo/client";
import formatFees from "@/utils/customText";
import { RiSearchLine } from "react-icons/ri";

export default function CourseFilters({
  // filterBy,
  SelectedFilters,
  setSelectedFilters,
  totalResults,
  mobileFilter,
  setMobileFilter,
  handleSearch,
  PriceCheckedFilters,
  setPriceCheckedFilters,
  StreamCheckedFilters,
  setStreamCheckedFilters,
  CourseLevelCheckedFilters,
  setCourseLevelCheckedFilters,
  CourseCheckedDurationFilters,
  setCourseCheckedDurationFilters,
}: any) {
  // const { data: modes, loading, error } = useQuery(getAllModes);
  // ============================================================ //
  // handleFilter functions
  const handlePriceRangeFilter = (data: number) => {
    setPriceCheckedFilters(data);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      priceRange: data,
    }));
  };
  const handleStreamFilter = (data: string) => {
    // Toggle the selection
    const updatedSelection = StreamCheckedFilters.includes(data)
      ? StreamCheckedFilters.filter((item: any) => item !== data)
      : [...StreamCheckedFilters, data];
    setStreamCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      stream: updatedSelection,
    }));
  };

  const handleCourseLevelFilter = (data: any) => {
    setCourseLevelCheckedFilters(data);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      courseLevel: data,
    }));
  };

  const handleCourseDurationFilter = (data: number) => {
    setCourseCheckedDurationFilters(data);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      courseDuration: data,
    }));
  };

  const handleUnselectFilter = (filter: string) => {
    if (filter === "stream") {
      setStreamCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        stream: [],
      }));
    } else if (filter === "courseDuration") {
      setCourseCheckedDurationFilters(0);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        courseDuration: 0,
      }));
    } else if (filter === "courseLevel") {
      setCourseLevelCheckedFilters("");
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        courseLevel: "",
      }));
    } else if (filter === "priceRange") {
      setPriceCheckedFilters(0);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        priceRange: 0,
      }));
    }
  };

  return (
    <aside
      className={`min-w-[300px] space-y-3 [flex:2] max-md:bg-orange-50 max-md:px-5 max-md:pt-20 md:sticky md:top-2 md:h-screen ${mobileFilter ? "slide-in fixed left-0 top-0 z-40 h-screen w-full overflow-y-scroll" : "max-md:hidden"}`}
    >
      <button
        className="!fixed !right-5 !top-24 !z-50 text-4xl text-black hover:text-orange-500 md:hidden"
        onClick={() => setMobileFilter(false)}
      >
        <IoIosCloseCircleOutline />
      </button>
      <h1 className="text-3xl font-bold text-blue-900">Filter Courses</h1>
      <div className="flex h-10 flex-1 items-center rounded-md border border-zinc-300 bg-white px-2 shadow-md">
        <RiSearchLine className="text-orange-500" />
        <input
          className="w-full pl-5 placeholder:text-sm focus:outline-none"
          type="text"
          placeholder="Search By Course Name"
          onChange={handleSearch}
        />
      </div>
      <div className="w-full pb-0 max-md:bg-opacity-95">
        <div className="mb-3 flex flex-wrap items-center gap-1 max-md:text-black">
          {Object.values(SelectedFilters).some(
            (value) =>
              value !== "" &&
              value !== 0 &&
              (!Array.isArray(value) || value.length !== 0),
          ) && <span className="text-xs font-bold">Filters Applied : </span>}
          {Object.entries(SelectedFilters).map(([key, value]: any) => {
            if (Array.isArray(value)) {
              value = value.join(" , ");
            } else if (key === "courseDuration" || key === "priceRange") {
              const duration: any =
                typeof value === "string" ? parseInt(value) : value;
              const fees: any =
                typeof value === "string" ? parseInt(value) : value;
              return (
                value !== "" &&
                value !== 0 && (
                  <div
                    key={key}
                    className="flex w-max items-center gap-1 rounded-md border border-orange-500 px-2 py-1 text-xs"
                  >
                    {key === "courseDuration" && (
                      <span>
                        {Math.floor(duration / 12)} years {duration % 12} months
                      </span>
                    )}
                    {key === "priceRange" && <span>₹ {formatFees(fees)}</span>}
                    <button onClick={() => handleUnselectFilter(key)}>
                      <MdClose />
                    </button>
                  </div>
                )
              );
            }
            return (
              value !== "" &&
              (!Array.isArray(value) || value?.length !== 0) && (
                <div
                  key={key}
                  className="flex w-max items-center gap-1 rounded-md border border-orange-500 px-2 py-1 text-xs"
                >
                  <span className="max-w-[150px] text-wrap">{value}</span>
                  <button onClick={() => handleUnselectFilter(key)}>
                    <MdClose />
                  </button>
                </div>
              )
            );
          })}
        </div>
        <div className="md:max-h-[76vh] md:overflow-hidden md:hover:overflow-y-auto">
          <Filter
            title="PRICE RANGE"
            filterList={[]}
            handleFilter={handlePriceRangeFilter}
            checked={PriceCheckedFilters || 100000}
          />
          <Filter
            title="SPECIALIZATION"
            filterList={[
              "C++",
              "JAVA",
              "ReactJs",
              "NextJs",
              "Angular",
              "Vue",
              "NodeJs",
              "SpringBoot",
            ]}
            handleFilter={handleStreamFilter}
            checked={StreamCheckedFilters}
          />
          <Filter
            title="COURSE LEVEL"
            filterList={["Beginner", "Intermediate", "Advanced"]}
            handleFilter={handleCourseLevelFilter}
            checked={CourseLevelCheckedFilters}
          />
          <Filter
            title="COURSE DURATION"
            filterList={[]}
            handleFilter={handleCourseDurationFilter}
            checked={CourseCheckedDurationFilters || 96}
          />
        </div>
      </div>
    </aside>
  );
}
