import React from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import Image from "next/image";
import { homeBanner, vector1, vector2 } from "@/assets";
import NewsTypeHeadSearchBar from "../TypeHeadSearchBar/NewsTypeHeadSearchBar";
import HomeTypeHeadSearchBar from "../homePageSections/HomeTypeHead";
import TextWithLineBreak, {
  TextWithoutLineBreak,
} from "@/utils/TextWithLineBreak";
import useIsMobile from "../customHooks/useIsMobile";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { FaBook, FaHandPeace } from "react-icons/fa";
import { addCommas } from "@/utils/customText";
import Link from "next/link";

export default function HomeBanner({
  title,
  subtitle,
  desc,
  totalStudents,
  totalCourses,
  totalInstructor,
}: any) {
  const isMobile = useIsMobile();
  return (
    <>
      <Wrapper
        as="section"
        bgColor="dotted-gradient"
        containerClassName="mt-20"
        className="grid grid-cols-1 gap-5 py-10 md:grid-cols-3 md:pb-0"
      >
        {/* left  */}
        <div className="col-span-3 flex flex-col justify-center gap-6 max-md:text-center md:col-span-2 md:gap-10 md:pb-10">
          <div>
            <h2 className="text-lg font-semibold">{subtitle}</h2>
            <h1 className="text-3xl font-bold text-blue-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 font-semibold text-zinc-700">
              {isMobile ? (
                <TextWithoutLineBreak text={desc} />
              ) : (
                <TextWithLineBreak text={desc} />
              )}
            </p>
          </div>
          {/* Search Bar */}
          <div className="relative flex h-min w-full max-w-screen-sm items-center gap-2 rounded-lg border-2 border-blue-950 bg-white px-2 py-2 focus-within:border-blue-900">
            <HomeTypeHeadSearchBar />
          </div>
          <div className="flex gap-2 max-sm:justify-center md:gap-4">
            <Link href="/courses">
              <Button
                variant="whiteTransparent"
                className="text-nowrap font-semibold max-md:!px-4"
              >
                Explore Now
              </Button>
            </Link>
            <Button
              variant="blue"
              className="text-nowrap font-semibold max-md:!px-4"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
        {/* Right  */}
        <div className="col-span-1 max-md:hidden">
          <Image
            src={homeBanner}
            alt="logo"
            className="h-[90%] object-contain"
          />
        </div>
      </Wrapper>
      <Wrapper
        as="section"
        bgColor="bg-blue-900"
        className="grid grid-cols-2 py-4 text-white md:grid-cols-4"
      >
        <Card
          title="Students"
          text={`${addCommas(totalStudents)}+`}
          icon={<PiStudentBold />}
          isBorder={true}
        />
        <Card
          title="Online Courses"
          text={`${addCommas(totalCourses)}+`}
          icon={<FaBook />}
          isBorder={true}
        />
        <Card
          title="Instructors"
          text={`${addCommas(totalInstructor)}+`}
          icon={<FaPeopleGroup />}
          isBorder={true}
        />
        <Card
          title="Satisfaction"
          text="100%"
          icon={<FaHandPeace />}
          isBorder={false}
        />
      </Wrapper>
    </>
  );
}

function Card({ title, text, icon, isBorder }: any) {
  return (
    <div
      className={`flex-center flex flex-col items-center gap-2 p-3 text-center ${isBorder && "border-white md:border-r-2"}`}
    >
      <div className="text-5xl">{icon}</div>
      <div className="md:text-center">
        <h3 className="text-2xl font-semibold">{text}</h3>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
}
