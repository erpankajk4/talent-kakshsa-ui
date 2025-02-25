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
import NewsSlider from "@/components/cardsAndSliders/NewsSlider";
import { getAllNews } from "@/graphql/newsQuery/news";
import NewsListingCard1, {
  NewsListingCard1Skeleton,
} from "@/components/cardsAndSliders/NewsListingCard1";
import Faqs from "@/components/Faqs";
import { faqs } from "@/data/wrapperData";
import { faq } from "@/graphql/globleQuery/globle";

type Props = {
  params: {
    news: String;
  };
};
export default function NewsPage({ params }: Props) {
  const newsId = params?.news;
  // Query
  const {
    loading,
    error,
    data: newsDetailData,
    refetch,
  } = useQuery(getNewsDetails, {
    variables: { ID: newsId },
  });
  const {
    data: featuredSequenceNews,
    loading: featuredSequenceLoading,
    error: featuredSequenceError,
    refetch: featuredSequenceRefetch,
  } = useQuery(getAllNews, {
    variables: {
      newsSortingParameter: "featuredSequence",
      page: 1,
      pageSize: 5,
    },
  });
  const {
    data: faqData,
    loading: faqLoading,
    error: faqError,
    refetch: faqRefetch,
  } = useQuery(faq);
  // ============================================= //
  // useEffect(() => {
  //   console.log(newsDetailData, "first");
  //   console.log(newsId, "newsId");
  // }, [newsDetailData]);
  // ==================================================== //
  useEffect(() => {
    if (!loading && !newsDetailData) {
      refetch();
    }
  }, [newsDetailData, refetch, loading]);
  useEffect(() => {
    if (!featuredSequenceLoading && !featuredSequenceNews) {
      featuredSequenceRefetch();
    }
  }, [featuredSequenceNews, featuredSequenceRefetch, featuredSequenceLoading]);
  useEffect(() => {
    if (!faqLoading && !faqData) {
      faqRefetch();
    }
  }, [faqData, faqRefetch, faqLoading]);
  // ==================================================== //
  return (
    <>
      {!loading ? (
        <NewsDetailPageBanner
          title={newsDetailData?.new?.data?.attributes?.title}
          tags={
            newsDetailData?.new?.data?.attributes?.tag?.data?.map(
              (item: any) => item?.attributes?.tag,
            ) || []
          }
          description={newsDetailData?.new?.data?.attributes?.description}
          lastUpdated={formatDate(
            newsDetailData?.new?.data?.attributes?.updatedAt,
          )}
          bgImage={
            newsDetailData?.new?.data?.attributes?.bgImage?.data?.attributes
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
                  newsDetailData?.new?.data?.attributes?.author?.data
                    ?.attributes?.avatar?.data?.attributes?.url
                }
                writerName={
                  newsDetailData?.new?.data?.attributes?.author?.data
                    ?.attributes?.name
                }
                designation={
                  newsDetailData?.new?.data?.attributes?.author?.data
                    ?.attributes?.designation
                }
                content={newsDetailData?.new?.data?.attributes?.content}
                title={newsDetailData?.new?.data?.attributes?.title}
                date={newsDetailData?.new?.data?.attributes?.updatedAt}
                tags={
                  newsDetailData?.new?.data?.attributes?.tag?.data?.map(
                    (item: any) => item?.attributes?.tag,
                  ) || []
                }
              />
            ) : (
              <ContentSkeleton />
            )}
          </div>
          <NewsAside />
        </main>
        {/* Top Stories  */}
        <div className="space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">Top Stories</h2>
          <div className="sliderStyle relative">
            <NewsSlider />
          </div>
        </div>
        {/* Featured Articles  */}
        <div className="my-8 space-y-3">
          <h2 className="text-2xl font-bold text-blue-900">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {!featuredSequenceLoading
              ? featuredSequenceNews?.news?.data?.map(
                  (item: any, index: number) => (
                    <NewsListingCard1
                      key={item?.id}
                      bgImage={item?.attributes?.bgImage?.data?.attributes?.url}
                      title={item?.attributes?.title}
                      tags={
                        item?.attributes?.tag?.data?.map(
                          (item: any) => item?.attributes?.tag,
                        ) || []
                      }
                      author={item?.attributes?.author?.data?.attributes?.name}
                      lastUpdated={formatDate(
                        item?.attributes?.author?.data?.attributes?.updatedAt,
                      )}
                      description={item?.attributes?.description}
                      slug={item?.id}
                    />
                  ),
                )
              : [1, 2, 3, 4].map((item: any, index: number) => (
                  <NewsListingCard1Skeleton key={index} />
                ))}
          </div>
        </div>
        {/* FAQ's  */}
        <div className="my-8 space-y-3">
          <h2 className="mb-5 text-2xl font-bold text-blue-900">
            Frequently Asked Questions
          </h2>
          <Faqs
            data={faqData?.faqs?.data?.map((item: any) => ({
              question: item?.attributes?.question,
              answer: item?.attributes?.answer,
              id: item?.id,
            }))}
          />
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
          <div className="flex flex-wrap items-center gap-2 text-zinc-500">
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
