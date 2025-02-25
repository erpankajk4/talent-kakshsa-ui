"use client";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { banner1, vector1, vector2, vector3 } from "@/assets";
import { sliderText } from "@/utils/motion";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { SiTicktick } from "react-icons/si";
import MediaModal from "../MediaModal";
import { discountedAmount, formatRupee } from "@/utils/customText";
import { Button } from "../Button";

export function CourseDetailBanner({
  tag,
  title,
  desc,
  isBestSeller,
  reviews,
  rating,
  authorName,
  lastUpdated,
  fees,
  discountFeesBy,
  demoVideo,
  videoThumbnail,
}: any) {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaSrc, setSelectedMediaSrc] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState<"image" | "video">(
    "image",
  );
  const openModal = (src: string, type: "image" | "video") => {
    setSelectedMediaSrc(src);
    setSelectedMediaType(type);
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="relative overflow-hidden rounded-xl bg-orange-500">
        <Image
          src={vector3}
          width={2500}
          height={2500}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="max-md:grid-row-2 grid gap-5 md:grid-cols-2">
          {/* Left */}
          <div className="z-10 flex flex-col justify-center space-y-5 p-3 text-white max-md:row-start-1 md:col-span-1 md:p-10 md:pr-0">
            {/* Breadcrumb  */}
            <div className="flex flex-wrap items-center gap-2 font-semibold">
              <Link href={"/"}>Home</Link>
              <IoIosArrowForward />
              <Link href={"/courses"}>Courses</Link>
              <IoIosArrowForward />
              <p className="text-blue-900">{tag}</p>
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="text-lg">{desc}</p>
            <div className="flex flex-wrap gap-5 text-sm">
              <div className="flex items-center gap-2">
                <FaStar className="text-lg text-yellow-500" />
                <p>{rating}</p>
                <p>({reviews} Reviews)</p>
              </div>
              <div className="flex items-center gap-2">
                <GoDotFill />
                <p className="flex gap-3">
                  Publish By{" "}
                  <span className="text-bold flex items-center gap-2 underline">
                    {authorName}
                    <SiTicktick className="text-lg text-green-500" />
                  </span>
                </p>
              </div>
              <p>Last Updated: {lastUpdated}</p>
            </div>
            <p className="flex flex-wrap items-center gap-2 font-semibold">
              <span className="text-3xl font-extrabold text-blue-900">
                ₹ {formatRupee(discountedAmount(fees, discountFeesBy))}
              </span>
              <span className="line-through">/ ₹ {formatRupee(fees)}</span>
              <span className="text-blue-900">-{discountFeesBy}% Off</span>
            </p>
            <div className="flex gap-4 max-md:flex-col">
              <Button variant="whiteTransparent" className="text-nowrap">
                WishList
              </Button>
              <Button variant="blue" className="text-nowrap">
                Buy Now
              </Button>
            </div>
          </div>
          {/* Right */}
          <div className="flex-center relative max-md:row-start-2 max-md:h-96 max-sm:h-72 md:col-span-1">
            <div className="h-min w-min">
              <Image
                src={vector1}
                alt="vector"
                className="absolute left-5 top-5"
              />
              <Image
                src={vector2}
                alt="vector"
                className="absolute bottom-5 right-5"
              />
              <Image
                src={videoThumbnail}
                alt="Video Thumbnail"
                className="absolute inset-1/2 h-64 min-w-max -translate-x-1/2 -translate-y-1/2 transform object-contain max-md:h-44 max-sm:h-40"
                onClick={() => openModal(demoVideo, "video")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Media Modal */}
      <MediaModal
        isOpen={isModalOpen}
        mediaSrc={selectedMediaSrc}
        mediaType={selectedMediaType}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
