"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { addCommas, convertToYearlyFee, formatDate } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import NewsCard from "./NewsCard";
import { news1 } from "@/assets";
import { getAllBlogs } from "@/graphql/blogQuery/blog";
// import { getAllColleges } from "@/graphql/collegeQuery/colleges";
// import { getAllTopColleges } from "@/graphql/collegeQuery/topColleges";

export default function BlogSlider1() {
  const uniqueId = "blog1123";
  // Query
  const {
    data: relatedCategoryBlogsData,
    loading: relatedCategoryBlogsLoading,
    error: relatedCategoryBlogsError,
    refetch: relatedCategoryBlogsRefetch,
  } = useQuery(getAllBlogs, {
    variables: {
      blogSortingParameter: "featuredSequence",
      page: 1,
      pageSize: 10,
    },
  });
  // =========================================== //
  useEffect(() => {
    if (!relatedCategoryBlogsLoading && !relatedCategoryBlogsData) {
      relatedCategoryBlogsRefetch();
    }
  }, [
    relatedCategoryBlogsData,
    relatedCategoryBlogsRefetch,
    relatedCategoryBlogsLoading,
  ]);

  // useEffect(() => {
  //   console.log(relatedCategoryBlogsData, "relatedCategoryBlogsData");
  // }, [relatedCategoryBlogsData]);
  // =========================================== //

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
      // dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Pagination, Navigation],
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1260: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <>
      <Swiper
        {...swiperOptions}
        className={`mySwiper w-full max-w-fit px-5 ${uniqueId}`}
      >
        {relatedCategoryBlogsData?.blogs?.data?.map(
          (item: any, index: number) => {
            const slide = (
              <SwiperSlide
                key={index}
                className="mb-12 w-full overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg"
              >
                {" "}
                <Card
                  key={index}
                  bgImage={item?.attributes.bgImage?.data?.attributes?.url}
                  title={item?.attributes?.title}
                  category={item?.attributes?.category?.data
                    ?.map(
                      (categoryItem: any) => categoryItem?.attributes?.category,
                    )
                    .join(", ")}
                  author={item?.attributes?.author?.data?.attributes?.name}
                  lastUpdated={formatDate(
                    item?.attributes?.author?.data?.attributes?.updatedAt,
                  )}
                  description={item?.attributes?.description}
                  slug={item?.id}
                />
              </SwiperSlide>
            );
            return <>{slide}</>;
          },
        )}
      </Swiper>
      {/* Add navigation buttons */}
      {/* {topCollegeData?.colleges?.data && ( */}
      <div className={`${uniqueId}-next swiper-button-next !top-[34%]`}></div>
      {/*  )} */}
      {/* {topCollegeData?.colleges?.data && ( */}
      <div className={`${uniqueId}-prev swiper-button-prev !top-[34%]`}></div>
      {/*  )} */}
    </>
  );
}

export function Card({
  bgImage,
  title,
  category,
  author,
  lastUpdated,
  description,
  slug,
  lineClamp = 4,
}: any) {
  return (
    <div className="col-span-1 w-full space-y-3 rounded-lg bg-white p-5 shadow-lg">
      <Image
        src={bgImage}
        alt="news Bg"
        width={400}
        height={400}
        className="mb-3 h-44 w-full rounded-lg object-cover"
      />
      <Link href={slug ? `/blogs/${slug}` : `#`}>
        <h2 className="line-clamp-2 cursor-pointer text-lg font-bold hover:text-blue-900">
          {title}
        </h2>
      </Link>
      <div className="flex items-end gap-4 text-sm">
        <p className="font-bold capitalize text-orange-500">{author}</p>
        <p className="text-zinc-400">{lastUpdated}</p>
      </div>
      <p className="capitalize text-blue-600">{category}</p>
      <p className={`line-clamp-${lineClamp} text-zinc-500`}>{description}</p>
      <Link
        href={slug ? `/blogs/${slug}` : `#`}
        className="text-blue-900 hover:underline"
      >
        Read More
      </Link>
    </div>
  );
}

export function BlogSlider1Skeleton() {
  return (
    <div className="col-span-1 w-full animate-pulse space-y-3 rounded-lg bg-white p-5 shadow-lg">
      <div className="mb-3 h-44 w-full rounded-lg bg-gray-200"></div>
      <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
      <div className="flex items-end gap-4 text-sm">
        <div className="h-6 w-24 rounded-md bg-gray-200"></div>
        <div className="h-4 w-16 rounded-md bg-gray-200"></div>
      </div>
      <div className="h-4 w-32 rounded-md bg-gray-200"></div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded-md bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
        <div className="h-4 w-4/5 rounded-md bg-gray-200"></div>
      </div>
      <div className="h-4 w-20 rounded-md bg-gray-200"></div>
    </div>
  );
}
