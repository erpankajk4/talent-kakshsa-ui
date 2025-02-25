"use client";
import { news1 } from "@/assets";
import Banner1 from "@/components/banners/Banner1";
import NewsBanner from "@/components/banners/NewsBanner";
import { Button } from "@/components/Button";
import NewsCard, {
  NewsCardSkeleton,
} from "@/components/cardsAndSliders/NewsCard";
import NewsListingCard1, {
  NewsListingCard1Skeleton,
} from "@/components/cardsAndSliders/NewsListingCard1";
import NewsSlider from "@/components/cardsAndSliders/NewsSlider";
import Faqs from "@/components/Faqs";
import NewsAside from "@/components/AsideSections/NewsAside";
import Wrapper from "@/components/Wrappers";
import { faqs } from "@/data/wrapperData";
import { getAllNews, getAllNewsCategory } from "@/graphql/newsQuery/news";
import { formatDate } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { faq } from "@/graphql/globleQuery/globle";

export default function NewsDetailPage() {
  const [selectedFilter, setSelectedFilter] = useState("");
  // ================= Query ==================== //
  const {
    data: newsCategoryList,
    loading: newsCategoryListLoading,
    error: newsCategoryListError,
    refetch: newsCategoryListRefetch,
  } = useQuery(getAllNewsCategory);
  const {
    data: recentNewsByCategory,
    loading: recentNewsByCategoryLoading,
    error: recentNewsByCategoryError,
    refetch: recentNewsByCategoryRefetch,
  } = useQuery(getAllNews, {
    variables: {
      category: selectedFilter || undefined,
      newsSortingParameter: "updatedAt",
      page: 1,
      pageSize: 2,
    },
  });
  const {
    data: trendingSequenceNews,
    loading: trendingSequenceLoading,
    error: trendingSequenceError,
    refetch: trendingSequenceRefetch,
  } = useQuery(getAllNews, {
    variables: {
      newsSortingParameter: "trendingSequence",
      page: 1,
      pageSize: 5,
    },
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
  // =================================================== //
  useEffect(() => {
    if (!trendingSequenceLoading && !trendingSequenceNews) {
      trendingSequenceRefetch();
    }
  }, [trendingSequenceNews, trendingSequenceRefetch, trendingSequenceLoading]);
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
  // ========================================================== //
  useEffect(() => {
    console.log(faqData, "faqData");
  }, [faqData]);

  const handleSelect = (item: any) => {
    setSelectedFilter(item);
  };

  return (
    <>
      <NewsBanner
        title="Everyday News Updates"
        subtitle="Search. Explore. Learn"
      />
      <Wrapper bgColor="bg-blue-50 py-10">
        {!newsCategoryListLoading ? (
          <Navbar
            navItems={
              newsCategoryList?.newsCategories?.data?.map(
                (item: any) => item?.attributes?.category,
              ) || []
            }
            onSelect={handleSelect}
            selectedFilter={selectedFilter}
          />
        ) : (
          <NavbarSkeleton />
        )}
        <main className="my-8 grid grid-cols-12 gap-5">
          <div className="col-span-12 space-y-5 lg:col-span-9">
            {/* Recent News  */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {!recentNewsByCategoryLoading
                ? recentNewsByCategory?.news?.data?.map(
                    (item: any, index: number) => (
                      <NewsCard
                        key={item?.id}
                        bgImage={
                          item?.attributes?.bgImage?.data?.attributes?.url
                        }
                        title={item?.attributes?.title}
                        tags={
                          item?.attributes?.tag?.data?.map(
                            (item: any) => item?.attributes?.tag,
                          ) || []
                        }
                        author={
                          item?.attributes?.author?.data?.attributes?.name
                        }
                        lastUpdated={formatDate(
                          item?.attributes?.author?.data?.attributes?.updatedAt,
                        )}
                        description={item?.attributes?.description}
                        slug={item?.id}
                      />
                    ),
                  )
                : [0, 1]?.map((item: any, index: number) => (
                    <NewsCardSkeleton key={index} />
                  ))}
            </div>
            {/* Most Trending  */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-blue-900">
                Most Trending
              </h2>
              {!trendingSequenceLoading
                ? trendingSequenceNews?.news?.data?.map(
                    (item: any, index: number) => (
                      <NewsListingCard
                        key={item?.id}
                        bgImage={
                          item?.attributes?.bgImage?.data?.attributes?.url
                        }
                        title={item?.attributes?.title}
                        tags={
                          item?.attributes?.tag?.data?.map(
                            (item: any) => item?.attributes?.tag,
                          ) || []
                        }
                        author={
                          item?.attributes?.author?.data?.attributes?.name
                        }
                        lastUpdated={formatDate(
                          item?.attributes?.author?.data?.attributes?.updatedAt,
                        )}
                        description={item?.attributes?.description}
                        slug={item?.id}
                      />
                    ),
                  )
                : [0, 1]?.map((item: any, index: number) => (
                    <NewsListingCardSkeleton key={index} />
                  ))}
            </div>
          </div>
          {/* Aside Section  */}
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
      <Banner1 />
    </>
  );
}

function Navbar({ navItems, onSelect, selectedFilter }: any) {
  return (
    <nav className="rounded-lg bg-blue-900">
      <ul className="no-scrollbar flex gap-x-8 overflow-x-auto px-5">
        {navItems.map((item: any, index: number) => (
          <>
            <li key={index}>
              <button
                className={`text-nowrap py-5 capitalize ${
                  selectedFilter === item
                    ? "text-orange-500 duration-100"
                    : "text-white duration-100"
                }`}
                onClick={() => onSelect(item)}
              >
                {item}
              </button>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
}

function NavbarSkeleton() {
  return (
    <nav className="rounded-lg bg-blue-900">
      <ul className="no-scrollbar flex animate-pulse gap-x-8 overflow-x-auto px-5 py-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <div className="h-6 w-20 rounded-md bg-gray-200"></div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NewsListingCard({
  bgImage,
  tags,
  author,
  title,
  lastUpdated,
  slug,
}: any) {
  return (
    <div className="my-3 flex cursor-pointer items-center gap-5 rounded-lg bg-white p-2 max-md:flex-col">
      <Image
        src={bgImage}
        alt="logo"
        width={500}
        height={500}
        className="h-32 w-80 rounded-lg object-cover"
      />
      <div className="w-full space-y-2">
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag: any, index: number) => (
            <span
              key={index}
              className="rounded-full bg-blue-900 px-4 py-1 text-sm text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex w-full justify-between gap-5 max-md:flex-col">
          <Link href={slug ? `/news/${slug}` : `#`}>
            <h3 className="cursor-pointer font-bold text-black hover:text-blue-900 md:line-clamp-1">
              {title}
            </h3>
          </Link>
          <Link href={slug ? `/news/${slug}` : `#`}>
            <Button variant="orange" className="text-nowrap !px-2 !py-1">
              Read Full Story
            </Button>
          </Link>
        </div>
        <div className="flex items-end gap-4">
          <p className="font-bold text-zinc-500">{author}</p>
          <p className="text-sm text-zinc-400">{lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}

function NewsListingCardSkeleton() {
  return (
    <div className="my-3 flex animate-pulse items-center gap-5 rounded-lg bg-white p-2 max-md:flex-col">
      <div className="h-32 w-80 rounded-lg bg-gray-200"></div>
      <div className="w-full space-y-2">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex w-full justify-between gap-5 max-md:flex-col">
          <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
          <div className="h-8 w-24 rounded-md bg-orange-300"></div>
        </div>
        <div className="flex items-end gap-4">
          <div className="h-6 w-24 rounded-md bg-gray-200"></div>
          <div className="h-4 w-16 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
