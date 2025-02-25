"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getNewsDetails } from "@/graphql/newsQuery/newsDetails";
import Image from "next/image";
import { formatDate } from "@/utils/customText";
import Wrapper from "@/components/Wrappers";
import NewsDetailPageBanner, {
  NewsDetailPageBannerSkeleton,
} from "@/components/banners/NewsDetailPageBanner";
import { news1 } from "@/assets";
import NewsAside from "@/components/AsideSections/NewsAside";
import { getBlogDetails } from "@/graphql/blogQuery/blogDetails";
import BlogAside from "@/components/AsideSections/BlogAside";
import BlogDetailPageBanner from "@/components/banners/BlogDetailPageBanner";
import BlogListingCard, {
  BlogListingCardSkeleton,
} from "@/components/cardsAndSliders/BlogListingCard";
import { getAllBlogs } from "@/graphql/blogQuery/blog";
import BlogSlider1, {
  BlogSlider1Skeleton,
} from "@/components/cardsAndSliders/BlogSlider1";

type Props = {
  params: {
    blog: String;
  };
};
export default function NewsPage({ params }: Props) {
  const blogId = params?.blog;
  // Query
  const {
    loading,
    error,
    data: blogDetailData,
    refetch,
  } = useQuery(getBlogDetails, {
    variables: { ID: blogId },
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
  // useEffect(() => {
  //   console.log(blogDetailData, "first");
  // }, [blogDetailData]);
  // ==================================================== //
  useEffect(() => {
    if (!loading && !blogDetailData) {
      refetch();
    }
  }, [blogDetailData, refetch, loading]);
  useEffect(() => {
    if (!featuredBlogsLoading && !featuredBlogsData) {
      featuredBlogsRefetch();
    }
  }, [featuredBlogsData, featuredBlogsRefetch, featuredBlogsLoading]);
  // ==================================================== //
  return (
    <>
      {!loading ? (
        <BlogDetailPageBanner
          title={blogDetailData?.blog?.data?.attributes?.title}
          tags={
            blogDetailData?.blog?.data?.attributes?.tag?.data?.map(
              (item: any) => item?.attributes?.tag,
            ) || []
          }
          description={blogDetailData?.blog?.data?.attributes?.description}
          lastUpdated={formatDate(
            blogDetailData?.blog?.data?.attributes?.updatedAt,
          )}
          bgImage={
            blogDetailData?.blog?.data?.attributes?.bgImage?.data?.attributes
              ?.url
          }
        />
      ) : (
        <NewsDetailPageBannerSkeleton />
      )}
      <Wrapper bgColor="bg-blue-50 py-10">
        <main className="grid grid-cols-12 gap-5">
          <div className="col-span-12 space-y-5 lg:col-span-9">
            {!loading ? (
              <Content
                avatar={
                  blogDetailData?.blog?.data?.attributes?.author?.data
                    ?.attributes?.avatar?.data?.attributes?.url
                }
                writerName={
                  blogDetailData?.blog?.data?.attributes?.author?.data
                    ?.attributes?.name
                }
                designation={
                  blogDetailData?.blog?.data?.attributes?.author?.data
                    ?.attributes?.designation
                }
                content={blogDetailData?.blog?.data?.attributes?.content}
                title={blogDetailData?.blog?.data?.attributes?.title}
                date={blogDetailData?.blog?.data?.attributes?.updatedAt}
                tags={
                  blogDetailData?.blog?.data?.attributes?.tag?.data?.map(
                    (item: any) => item?.attributes?.tag,
                  ) || []
                }
              />
            ) : (
              <ContentSkeleton />
            )}
          </div>
          <BlogAside />
        </main>
        {/* Featured Posts  */}
        <div className="space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">
            Featured Posts
          </h2>
          <div className="sliderStyle relative">
            {!loading ? (
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
          {!featuredBlogsLoading ? (
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
      </Wrapper>
    </>
  );
}

function Content({
  avatar,
  writerName,
  designation,
  content,
  title,
  date,
  tags,
}: any) {
  // console.log(avatar, "avatar");
  return (
    <div className="w-full">
      {/* Author */}
      <div className="mb-8 flex items-center gap-x-2">
        <Image
          src={avatar}
          alt="avatar"
          className="h-16 w-16 rounded-full"
          width={48}
          height={48}
        />
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold text-orange-500">
            {writerName || "Admin"}
          </p>
          <div className="flex items-center gap-2 text-zinc-500">
            <p className="font-bold">{designation} |</p>
            <p className="font-medium">Last Updated: {formatDate(date)}</p>
          </div>
        </div>
      </div>
      {/* Title  */}
      <h2 className="my-5 text-2xl font-bold capitalize">{title}</h2>
      {/* EditorText */}
      {content && (
        <div
          className={`dangerouslySetInnerHTMLStyle transparent-bg mb-5 text-justify`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag: any, index: number) => (
            <span
              key={index}
              className="rounded-full bg-orange-500 px-4 py-1 text-sm text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
function ContentSkeleton() {
  return (
    <Wrapper>
      <div className="mt-5 w-full p-5 md:min-w-[550px]">
        {/* Author */}
        <div className="mb-8 flex animate-pulse items-center gap-x-2">
          <div className="h-16 w-16 rounded-full bg-orange-300"></div>
          <div className="flex flex-col gap-2">
            <div className="h-6 w-36 rounded-md bg-orange-300"></div>
            <div className="flex items-center gap-2 text-zinc-500">
              <div className="h-4 w-24 rounded-md bg-orange-300"></div>
              <div className="h-4 w-24 rounded-md bg-orange-300"></div>
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="mb-5 h-8 w-3/4 animate-pulse rounded-md bg-orange-300"></div>
        {/* Content */}
        <div className="mb-5 h-4 animate-pulse rounded-md bg-orange-300"></div>
        <div className="mb-5 h-4 animate-pulse rounded-md bg-orange-300"></div>
        <div className="mb-5 h-4 animate-pulse rounded-md bg-orange-300"></div>
        <div className="mb-5 h-4 w-1/2 animate-pulse rounded-md bg-orange-300"></div>
        <div className="mb-5 h-4 animate-pulse rounded-md bg-orange-300"></div>
        <div className="mb-5 h-4 animate-pulse rounded-md bg-orange-300"></div>
        <div className="mb-5 h-4 w-1/2 animate-pulse rounded-md bg-orange-300"></div>
      </div>
    </Wrapper>
  );
}
