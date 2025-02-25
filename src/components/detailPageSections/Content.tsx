import { content, instructorDetails } from "@/data/wrapperData";
import React, { useState } from "react";
import { Accordion } from "../accordian/Accordion";
import Image from "next/image";
import { FaPlayCircle, FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import CourseFilteredCard from "../cardsAndSliders/CourseFilteredCard";
import { course1 } from "@/assets";

export default function Content() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <>
      {content &&
        content?.length > 0 &&
        content?.map((section, index) => {
          return (
            <div className="" key={index}>
              {/* Heading  */}
              <div className="space-y-2">
                <h2 className="flex items-center gap-3 text-sm font-medium text-orange-500">
                  <span className="h-0 w-10 border-t-2 border-orange-500"></span>
                  {section?.subtitle}
                </h2>
                <h1 className="text-2xl font-bold text-zinc-800">
                  {section?.title}
                </h1>
              </div>
              {/* text editor */}
              {section?.textEditor && (
                <div className="mb-10">
                  <div
                    className={`${
                      isExpanded
                        ? ""
                        : "mask-gradient max-h-40 overflow-y-hidden"
                    }`}
                    dangerouslySetInnerHTML={{ __html: section?.textEditor }}
                  />
                  <p
                    className="cursor-pointer text-right text-sm font-bold text-blue-900 hover:underline"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </p>
                </div>
              )}
              {/* syllabus  */}
              {section?.syllabus && (
                <div className="space-y-8">
                  <ul className="ml-5 mt-5 flex list-disc flex-wrap gap-5 text-sm text-zinc-500">
                    <li>{section?.syllabus?.totalLessons} Lessons</li>
                    <li>{section?.syllabus?.totalVideos} Videos</li>
                    <li>{section?.syllabus?.totalArticles} Articles</li>
                    <li>{section?.syllabus?.totalAssignments} Assignments</li>
                    <li>{section?.syllabus?.totalHours} Completion Time</li>
                  </ul>
                  <SyllabusAccordion data={section?.syllabus?.lessons} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}

function SyllabusAccordion({ data }: any) {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <div className="">
      {data?.map((item: any, i: number) => (
        <Accordion
          key={i}
          title={item?.title}
          titleTime={item?.duration}
          content={item?.sections}
          i={i}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </div>
  );
}

export function InstructorContent() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div className="my-10">
      <h2 className="mb-5 flex items-center gap-3 text-sm font-medium text-orange-500">
        <span className="h-0 w-10 border-t-2 border-orange-500"></span>
        About Instructor
      </h2>
      {instructorDetails && (
        <div className="grid grid-cols-3 gap-5">
          {/* 1  */}
          <div className="col-span-1 space-y-2 text-blue-900">
            <div className="max-h-96 w-full overflow-hidden rounded-3xl text-lg font-bold">
              <Image
                src={instructorDetails?.avatar}
                alt="instructor"
                width={800}
                height={800}
                className="w-full object-cover object-top"
              />
            </div>
            <p className="flex items-center gap-2 font-bold">
              <FaStar className="text-2xl" />{" "}
              <span>
                {instructorDetails?.rating}{" "}
                <span className="font-medium">Instructor Rating</span>
              </span>
            </p>
            <p className="flex items-center gap-2 font-bold">
              <MdRateReview className="text-2xl" />{" "}
              <span>
                {instructorDetails?.totalReviews}{" "}
                <span className="font-medium">Reviews</span>
              </span>
            </p>
            <p className="flex items-center gap-2 font-bold">
              <PiStudent className="text-2xl" />{" "}
              <span>
                {instructorDetails?.studentEnrolled}{" "}
                <span className="font-medium">Students</span>
              </span>
            </p>
            <p className="flex items-center gap-2 font-bold">
              <FaPlayCircle className="text-2xl" />{" "}
              <span>
                {instructorDetails?.totalCourse}{" "}
                <span className="font-medium">Courses</span>
              </span>
            </p>
          </div>
          {/* 2  */}
          <div className="col-span-2 space-y-3 text-blue-900">
            <h1 className="flex items-center text-2xl font-bold md:text-5xl">
              {instructorDetails?.instructorName}{" "}
              <span className="text2xl text-green-500">
                <SiTicktick className="text-3xl" />
              </span>
            </h1>
            <p className="font-bold text-zinc-600 md:text-xl">
              {instructorDetails?.designation}
            </p>
            <div className="h-0 w-full border-t border-zinc-300" />
            {/* text editor */}
            {instructorDetails?.textEditor && (
              <div className="mb-10">
                <div
                  className={`${
                    isExpanded ? "" : "mask-gradient max-h-40 overflow-y-hidden"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: instructorDetails?.textEditor,
                  }}
                />
                <p
                  className="cursor-pointer text-right text-sm font-bold text-blue-900 hover:underline"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function OtherCourses() {
  const [PinState, setPinState] = useState(false);
  return (
    <div className="space-y-2">
      <h2 className="mb-5 flex items-center gap-3 text-sm font-medium text-orange-500">
        <span className="h-0 w-10 border-t-2 border-orange-500"></span>
        Instructor More Courses
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

// https://codesandbox.io/p/sandbox/framer-motion-accordion-qx958?file=%2Fsrc%2FExample.tsx%3A45%2C5-45%2C70
