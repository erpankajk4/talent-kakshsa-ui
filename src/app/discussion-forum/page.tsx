"use client";
import DiscussionAside from "@/components/AsideSections/DiscussionAside";
import Wrapper from "@/components/Wrappers";
import React, { useEffect, useState } from "react";
import EventCard, {
  EventCardSkeleton,
} from "@/components/cardsAndSliders/EventCard";
import { formatDate, formatTime } from "@/utils/customText";
import { getAllEvents } from "@/graphql/eventQuery/event";
import { useQuery } from "@apollo/client";
import BlogSlider, {
  BlogSliderCardSkeleton,
} from "@/components/cardsAndSliders/BlogSlider";
import { getAllBlogCategory, getAllBlogs } from "@/graphql/blogQuery/blog";
import {
  BlogSlider1Skeleton,
  Card,
} from "@/components/cardsAndSliders/BlogSlider1";
import ThreadListingCard from "@/components/cardsAndSliders/ThreadListingCard";
import Banner1 from "@/components/banners/Banner1";
import { DiscussionForumPostInput } from "@/components/Page-discussionForumPage/DiscussionForumPostInput";

export default function DiscussionForumPage() {
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
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
    refetch: eventsRefetch,
  } = useQuery(getAllEvents);
  // ====================================== //
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
    if (!eventsLoading && !eventsData) {
      eventsRefetch();
    }
  }, [eventsData, eventsRefetch, eventsLoading]);
  return (
    <>
      <Wrapper containerClassName="mt-14" bgColor="bg-blue-50 py-10 mt-14">
        <main className="grid grid-cols-12 gap-5">
          <div className="col-span-12 space-y-5 lg:col-span-9">
            {/* DiscussionForumPostInput  */}
            <DiscussionForumPostInput avatar={false} />
            {/* Your Threads  */}
            <div className="space-y-3">
              <h2 className="mb-5 text-2xl font-bold text-blue-900">
                Your Threads
              </h2>
              {[1, 2, 3, 4, 5]?.map((item: any, i: any) => (
                <ThreadListingCard
                  key={i}
                  title={"title"}
                  description={"description"}
                  tags={["tag1", "tag2"]}
                  lastUpdated="lastUpdated"
                  slug={"#"}
                />
              ))}
            </div>
            {/* Popular Threads  */}
            <div className="space-y-3">
              <h2 className="mb-5 text-2xl font-bold text-blue-900">
                Popular Threads
              </h2>
              {[1, 2, 3, 4, 5]?.map((item: any, i: any) => (
                <ThreadListingCard
                  key={i}
                  title={"title"}
                  description={"description"}
                  tags={["tag1", "tag2"]}
                  lastUpdated="lastUpdated"
                  slug={"#"}
                />
              ))}
            </div>
          </div>
          <DiscussionAside />
        </main>
        {/* Categories  */}
        <div className="mt-5 space-y-3">
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
