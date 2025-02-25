"use client";
import { news1, user1 } from "@/assets";
import Banner1 from "@/components/banners/Banner1";
import NewsBanner from "@/components/banners/NewsBanner";
import { Button } from "@/components/Button";
import BlogSlider, {
  BlogSliderCardSkeleton,
} from "@/components/cardsAndSliders/BlogSlider";
import BlogSlider1, {
  Card,
  BlogSlider1Skeleton,
} from "@/components/cardsAndSliders/BlogSlider1";
import EventCard, {
  EventCardSkeleton,
} from "@/components/cardsAndSliders/EventCard";
import NewsCard from "@/components/cardsAndSliders/NewsCard";
import NewsSlider from "@/components/cardsAndSliders/NewsSlider";
import Faqs from "@/components/Faqs";
import NewsAside from "@/components/AsideSections/NewsAside";
import Wrapper from "@/components/Wrappers";
import { getAllBlogCategory, getAllBlogs } from "@/graphql/blogQuery/blog";
import { getAllEvents } from "@/graphql/eventQuery/event";
import { formatDate, formatTime } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlogListingCard, {
  BlogListingCardSkeleton,
} from "@/components/cardsAndSliders/BlogListingCard";

export default function BlogPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  // Query
  const {
    data: blogCategoryData,
    loading: blogCategoryLoading,
    error: blogCategoryError,
    refetch: blogCategoryRefetch,
  } = useQuery(getAllBlogCategory);
  const {
    data: relatedCategoryBlogsData,
    loading: relatedCategoryBlogsLoading,
    error: relatedCategoryBlogsError,
    refetch: relatedCategoryBlogsRefetch,
  } = useQuery(getAllBlogs, {
    variables: {
      category: selectedBlogCategory,
      blogSortingParameter: "updatedAt",
      page: 1,
      pageSize: 4,
    },
  });
  const {
    data: featuredBlogsData,
    loading: featuredBlogsLoading,
    error: featuredBlogsError,
    refetch: featuredBlogsRefetch,
  } = useQuery(getAllBlogs, {
    variables: {
      blogSortingParameter: "updatedAt",
      page: 1,
      pageSize: 4,
    },
  });
  const {
    data: popularBlogsData,
    loading: popularBlogsLoading,
    error: popularBlogsError,
    refetch: popularBlogsRefetch,
  } = useQuery(getAllBlogs, {
    variables: {
      blogSortingParameter: "popularSequence",
      page: 1,
      pageSize: 4,
    },
  });
  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
    refetch: eventsRefetch,
  } = useQuery(getAllEvents);
  // =========================================== //
  useEffect(() => {
    if (!blogCategoryLoading && !blogCategoryData) {
      blogCategoryRefetch();
    }
  }, [blogCategoryData, blogCategoryRefetch, blogCategoryLoading]);
  useEffect(() => {
    if (!relatedCategoryBlogsLoading && !relatedCategoryBlogsData) {
      relatedCategoryBlogsRefetch();
    }
  }, [
    relatedCategoryBlogsData,
    relatedCategoryBlogsRefetch,
    relatedCategoryBlogsLoading,
  ]);
  useEffect(() => {
    if (!featuredBlogsLoading && !featuredBlogsData) {
      featuredBlogsRefetch();
    }
  }, [featuredBlogsData, featuredBlogsRefetch, featuredBlogsLoading]);
  useEffect(() => {
    if (!popularBlogsLoading && !popularBlogsData) {
      popularBlogsRefetch();
    }
  }, [popularBlogsData, popularBlogsRefetch, popularBlogsLoading]);
  // =========================================== //
  useEffect(() => {
    if (!eventsLoading && !eventsData) {
      eventsRefetch();
    }
  }, [eventsData, eventsRefetch, eventsLoading]);
  // useEffect(() => {
  //   console.log(eventsData, "eventsData");
  // }, [eventsData]);
  return (
    <>
      <NewsBanner title="Our Blog" subtitle="Search. Explore. Learn" />
      <Wrapper bgColor="bg-blue-50 py-10">
        {/* Categories  */}
        <div className="space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">Categories</h2>
          <div className="sliderStyle relative">
            {!blogCategoryLoading ? (
              <BlogSlider
                data={blogCategoryData?.blogCategories?.data}
                setSelectedBlogCategory={setSelectedBlogCategory}
              />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[1, 2, 3, 4, 5]?.map((i: any) => (
                  <BlogSliderCardSkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Related Blogs acc. to Category  */}
        {selectedBlogCategory !== "" && (
          <div className="my-10 space-y-3">
            <h2 className="text-2xl font-bold text-blue-900">
              Blogs Related to <span>&quot;{selectedBlogCategory}&quot;</span>
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {!relatedCategoryBlogsLoading && relatedCategoryBlogsData
                ? relatedCategoryBlogsData?.blogs?.data?.map(
                    (item: any, index: number) => (
                      <div className="col-span-1" key={index}>
                        <Card
                          bgImage={
                            item?.attributes?.bgImage?.data?.attributes?.url
                          }
                          title={item?.attributes?.title}
                          category={item?.attributes?.category?.data
                            ?.map(
                              (categoryItem: any) =>
                                categoryItem?.attributes?.category,
                            )
                            .join(", ")}
                          author={
                            item?.attributes?.author?.data?.attributes?.name
                          }
                          lastUpdated={formatDate(
                            item?.attributes?.author?.data?.attributes
                              ?.updatedAt,
                          )}
                          description={item?.attributes?.description}
                          slug={item?.id}
                          lineClamp={2}
                        />
                      </div>
                    ),
                  )
                : [1, 2, 3, 4, 5, 6]?.map((item: any, index: number) => (
                    <BlogSlider1Skeleton key={index} />
                  ))}
            </div>
          </div>
        )}
        {/* Featured Posts  */}
        <div className="space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">
            Featured Posts
          </h2>
          <div className="sliderStyle relative">
            {!featuredBlogsLoading && featuredBlogsData ? (
              <BlogSlider1 />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4]?.map((i: any) => <BlogSlider1Skeleton key={i} />)}
              </div>
            )}
          </div>
        </div>
        {/* Latest Posts  */}
        <div className="my-10 space-y-3">
          <h2 className="text-2xl font-bold text-blue-900">Latest Posts</h2>
          {!relatedCategoryBlogsLoading && relatedCategoryBlogsData ? (
            featuredBlogsData?.blogs?.data?.map((item: any, index: number) => (
              <BlogListingCard
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
            ))
          ) : (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i: any) => (
                <BlogListingCardSkeleton key={i} />
              ))}
            </div>
          )}
        </div>
        {/* Popular Posts  */}
        <div className="my-10 space-y-3">
          <h2 className="text-2xl font-bold text-blue-900">Popular Posts</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {!relatedCategoryBlogsLoading && relatedCategoryBlogsData
              ? popularBlogsData?.blogs?.data?.map(
                  (item: any, index: number) => (
                    <div className="col-span-1" key={index}>
                      <Card
                        key={index}
                        bgImage={
                          item?.attributes.bgImage?.data?.attributes?.url
                        }
                        title={item?.attributes?.title}
                        category={item?.attributes?.category?.data
                          ?.map(
                            (categoryItem: any) =>
                              categoryItem?.attributes?.category,
                          )
                          .join(", ")}
                        author={
                          item?.attributes?.author?.data?.attributes?.name
                        }
                        lastUpdated={formatDate(
                          item?.attributes?.author?.data?.attributes?.updatedAt,
                        )}
                        description={item?.attributes?.description}
                        slug={item?.id}
                        lineClamp={2}
                      />
                    </div>
                  ),
                )
              : [1, 2, 3, 4, 5, 6]?.map((item: any, index: number) => (
                  <BlogSlider1Skeleton key={index} />
                ))}
          </div>
        </div>
        {/* Upcoming Events  */}
        <div className="space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!eventsLoading && eventsData
              ? eventsData?.events?.data?.map((item: any, index: number) => (
                  <EventCard
                    key={item?.id}
                    title={item?.attributes?.title}
                    hostName={item?.attributes?.hostName}
                    usersAvatars={item?.attributes?.usersAvatars?.data.map(
                      (item: any) => item?.attributes?.url,
                    )}
                    date={formatDate(item?.attributes?.timeFrom)}
                    timeFrom={formatTime(item?.attributes?.timeFrom)}
                    timeTo={formatTime(item?.attributes?.timeTo)}
                    eventMedium={item?.attributes?.eventMedium}
                  />
                ))
              : [1, 2, 3, 4]?.map((item: any, index: number) => (
                  <EventCardSkeleton key={index} />
                ))}
          </div>
        </div>
      </Wrapper>
      <Banner1 />
    </>
  );
}
