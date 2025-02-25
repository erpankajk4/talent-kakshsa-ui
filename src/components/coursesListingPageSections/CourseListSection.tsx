"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import Wrapper from "@/components/Wrappers";
import { Button, LoadingButton } from "../Button";
import CourseFilters from "./CourseFilters";
import CourseFilteredCard, {
  CourseFilteredCardList,
  CourseFilteredCardListSkeleton,
  CourseFilteredCardSkeleton,
} from "../cardsAndSliders/CourseFilteredCard";

import { getAllCourses } from "@/graphql/courseQuery/course";
import { useQuery } from "@apollo/client";
import SortButton from "../SortButton";
import { course1 } from "@/assets";
import { LuLayoutGrid } from "react-icons/lu";
import { FaList } from "react-icons/fa";
export default function CourseListSection({
  data,
  // filterBy,
  tabsSections,
}: any) {
  const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any>();
  const [SelectedFilters, setSelectedFilters] = useState({
    priceRange: 0,
    stream: [] as string[],
    courseLevel: "",
    courseDuration: 0,
  });
  const [PinState, setPinState] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  // used for Query
  const [searchValue, setSearchValue] = useState("");

  const [PriceCheckedFilters, setPriceCheckedFilters] = useState<number>();
  const [StreamCheckedFilters, setStreamCheckedFilters] = useState<string[]>(
    [],
  );
  const [CourseLevelCheckedFilters, setCourseLevelCheckedFilters] =
    useState<string>("");
  const [CourseCheckedDurationFilters, setCourseCheckedDurationFilters] =
    useState<number>();

  const [pageNo, setPageNo] = useState(1);
  const [sortingParameterName, setSortingParameterName] =
    useState("courseSequence");

  // Query
  const {
    data: courseData,
    loading,
    error,
    refetch,
  } = useQuery(getAllCourses, {
    variables: {
      searchByCourseName: searchValue,
      priceRange: PriceCheckedFilters,
      stream: StreamCheckedFilters,
      courseLevel: CourseLevelCheckedFilters,
      duration: CourseCheckedDurationFilters,
      sortingParameter: sortingParameterName,
      page: pageNo,
      pageSize: 10,
    },
  });
  useEffect(() => {
    if (courseData) {
      if (pageNo === 1) {
        setFilteredData(courseData?.courses?.data);
      } else {
        setFilteredData((prevData: any) => [
          ...prevData,
          ...courseData?.courses?.data,
        ]);
      }
    }
  }, [
    courseData,
    searchValue,
    PriceCheckedFilters,
    StreamCheckedFilters,
    CourseLevelCheckedFilters,
    CourseCheckedDurationFilters,
    sortingParameterName,
    pageNo,
  ]);
  // ========================================================== //
  useEffect(() => {
    if (!loading && !courseData) {
      refetch();
    }
  }, [courseData, refetch, loading]);
  // ========================================================== //
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event?.target?.value?.toLowerCase()?.trim();
    if (searchTerm.length >= 3) {
      setSearchValue(searchTerm);
    } else {
      setSearchValue("");
    }
  }

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      setSortingParameterName("courseName");
    } else if (option === "reset") {
      setSortingParameterName("courseSequence");
    }
  };

  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  const handlePin = ({ slug }: any) => {
    setPinState(true);
  };

  return (
    <Wrapper
      bgColor="bg-blue-50"
      className="flex flex-col justify-between gap-5 pb-10 md:flex-row"
    >
      {/* Aside College Filter Section  */}
      <CourseFilters
        // filterBy={filterBy}
        SelectedFilters={SelectedFilters}
        setSelectedFilters={setSelectedFilters}
        totalResults={courseData?.courses?.meta?.pagination?.total}
        mobileFilter={MobileFilter}
        setMobileFilter={setMobileFilter}
        handleSearch={handleSearch}
        // For query
        // filters
        StreamCheckedFilters={StreamCheckedFilters}
        setStreamCheckedFilters={setStreamCheckedFilters}
        CourseLevelCheckedFilters={CourseLevelCheckedFilters}
        setCourseLevelCheckedFilters={setCourseLevelCheckedFilters}
        PriceCheckedFilters={PriceCheckedFilters}
        setPriceCheckedFilters={setPriceCheckedFilters}
        CourseCheckedDurationFilters={CourseCheckedDurationFilters}
        setCourseCheckedDurationFilters={setCourseCheckedDurationFilters}
      />
      {/* main Course Search and List Section  */}
      <main className="flex w-full flex-col py-5 pt-3 md:min-w-[550px] md:[flex:8]">
        <h1 className="text-3xl font-bold text-blue-900">Discover Course</h1>
        {/* Total Result and Sort Section  */}
        <div className="relative mb-4 flex items-center justify-between">
          <p className="poppins-regular">Showing 250 Total Results</p>
          <div className="flex gap-3">
            <div className="bottom-0 left-0 right-0 flex justify-end gap-4 border-orange-300 bg-white max-md:fixed max-md:z-40 max-md:w-full max-md:justify-between max-md:border-t max-md:p-3">
              {/* Sort button  */}
              <SortButton handleFilterOptionClick={handleFilterOptionClick} />
              {/* Filter Button  */}
              <div
                className="hidden max-md:block max-md:w-full max-md:flex-[1]"
                onClick={() => setMobileFilter((prev) => !prev)}
              >
                <Button
                  variant="orange"
                  className="group flex h-12 cursor-pointer items-center gap-2 !rounded-xl !px-2 max-md:!w-full"
                >
                  <span>Filter</span>
                  <MdOutlineSort />
                </Button>
              </div>
            </div>
            <button
              className={`${isGridView ? "bg-blue-900 text-white" : "bg-white text-blue-900"} rounded-md border-2 border-blue-900 p-2 px-3 text-xl max-md:hidden`}
              onClick={() => setIsGridView(true)}
            >
              <LuLayoutGrid />
            </button>
            <button
              className={`${!isGridView ? "bg-blue-900 text-white" : "bg-white text-blue-900"} rounded-md border-2 border-blue-900 p-2 px-3 text-xl max-md:hidden`}
              onClick={() => setIsGridView(false)}
            >
              <FaList />
            </button>
          </div>
        </div>
        {/* College List Section (Grid View)  */}
        {isGridView ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {true
              ? [0, 1, 2, 3, 4, 5]?.map((course: any, index: number) => (
                  <CourseFilteredCard
                    key={index}
                    slug={index}
                    bgImage={course1}
                    courseTitle={"Learning JavaScript With Imagination"}
                    tutor={"Pankaj Kumar"}
                    fees={50000}
                    tag={"Development"}
                    reviews={5}
                    handlePin={setPinState}
                    pinState={PinState}
                    discountedPercentage={20}
                  />
                ))
              : [1, 2, 3, 4, 5]?.map(() => (
                  <CourseFilteredCardSkeleton key={Math.random()} />
                ))}
            {courseData?.courses?.meta?.pagination?.total >
              filteredData?.length && (
              <LoadingButton onClick={handleLoadMore} className="mx-auto">
                Load More
              </LoadingButton>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {true
              ? [0, 1, 2, 3, 4, 5]?.map((course: any, index: number) => (
                  <CourseFilteredCardList
                    key={index}
                    slug={index}
                    bgImage={course1}
                    courseTitle={"Learning JavaScript With Imagination"}
                    tutor={"Pankaj Kumar"}
                    fees={50000}
                    tag={"Development"}
                    reviews={5}
                    handlePin={setPinState}
                    pinState={PinState}
                  />
                ))
              : [1, 2, 3, 4, 5]?.map(() => (
                  <CourseFilteredCardListSkeleton key={Math.random()} />
                ))}
            {courseData?.courses?.meta?.pagination?.total >
              filteredData?.length && (
              <LoadingButton onClick={handleLoadMore} className="mx-auto">
                Load More
              </LoadingButton>
            )}
          </div>
        )}
      </main>
    </Wrapper>
  );
}
