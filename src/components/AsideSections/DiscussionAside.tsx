"use client";
import { news1, user1 } from "@/assets";
import { getAllBlogs } from "@/graphql/blogQuery/blog";
import { getAllCommunity } from "@/graphql/communityQuery/community";
import { getAllNews } from "@/graphql/newsQuery/news";
import { formatDate } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DiscussionAside() {
  const [avatar, setAvatar] = useState(false);
  // Query
  const {
    data: popularSequenceBlog,
    loading: popularSequenceLoading,
    error: popularSequenceError,
    refetch: popularSequenceRefetch,
  } = useQuery(getAllBlogs, {
    variables: {
      blogSortingParameter: "popularSequence",
      page: 1,
      pageSize: 5,
    },
  });
  const {
    data: communityData,
    loading: communityDataLoading,
    error: communityDataError,
    refetch: communityDataRefetch,
  } = useQuery(getAllCommunity, {
    variables: {
      page: 1,
      pageSize: 5,
    },
  });
  // ==================================== //
  useEffect(() => {
    if (!popularSequenceLoading && !popularSequenceBlog) {
      popularSequenceRefetch();
    }
  }, [popularSequenceBlog, popularSequenceRefetch, popularSequenceLoading]);
  useEffect(() => {
    if (!communityDataLoading && !communityData) {
      communityDataRefetch();
    }
  }, [communityData, communityDataRefetch, communityDataLoading]);

  // useEffect(() => {
  //   console.log(popularSequenceBlog);
  // }, [popularSequenceBlog]);

  return (
    <aside className="col-span-3 space-y-5 max-lg:hidden">
      {/* User Discussions  */}
      <div className="space-y-5 rounded-xl bg-white p-3 font-semibold text-zinc-700 shadow-lg">
        {/* Avatar with Name  */}
        <div className="flex w-full items-center gap-3">
          {!avatar ? (
            <div className="flex-center min-h-10 min-w-10 rounded-full bg-blue-900 capitalize text-white">
              P
            </div>
          ) : (
            <Image
              src={user1}
              alt="avatar"
              width={50}
              height={50}
              className="min-10 h-10 min-h-10 w-10 rounded-full object-cover"
            />
          )}
          <p className="text-bold">Pankaj Kumar</p>
        </div>
        <div className="flex justify-between px-5 text-sm font-normal">
          <p className="flex-center flex-col">
            <span className="font-semibold">8</span>
            <span>Answers</span>
          </p>
          <p className="flex-center flex-col">
            <span className="font-semibold">81</span>
            <span>Questions</span>
          </p>
          <p className="flex-center flex-col">
            <span className="font-semibold">18</span>
            <span>Posts</span>
          </p>
        </div>
      </div>
      {/* Popular Posts */}
      <div className="rounded-xl bg-white p-3 font-semibold shadow-lg">
        <h4 className="border-b border-zinc-400 pb-2 text-lg">Popular Posts</h4>
        {!popularSequenceLoading && popularSequenceBlog
          ? popularSequenceBlog?.blogs?.data?.map(
              (item: any, index: number) => (
                <BlogAsideCard
                  key={index}
                  bgImage={item?.attributes?.bgImage?.data?.attributes?.url}
                  title={item?.attributes?.title}
                  lastUpdated={formatDate(item?.attributes?.updatedAt)}
                  slug={item?.id}
                />
              ),
            )
          : [0, 1, 2, 3, 4].map((item: any, index: number) => (
              <BlogAsideCardSkeleton key={index} />
            ))}
      </div>
      {/* Discover communities */}
      <div className="rounded-xl bg-white p-3 font-semibold shadow-lg">
        <h4 className="border-b border-zinc-400 pb-2 text-lg">
          Discover communities
        </h4>
        {!communityDataLoading && communityData
          ? communityData?.communities?.data?.map(
              (item: any, index: number) => (
                <BlogAsideCard
                  key={index}
                  bgImage={item?.attributes?.bgImage?.data?.attributes?.url}
                  title={item?.attributes?.title}
                  totalMembersJoined={item?.attributes?.totalMembersJoined}
                  slug
                />
              ),
            )
          : [0, 1, 2, 3, 4].map((item: any, index: number) => (
              <BlogAsideCardSkeleton key={index} />
            ))}
      </div>
    </aside>
  );
}

function BlogAsideCard({
  bgImage,
  title,
  lastUpdated,
  slug,
  totalMembersJoined,
}: any) {
  return (
    <div className="my-3 flex cursor-pointer items-center gap-x-2 rounded-lg p-2 hover:bg-gray-100">
      <Image
        src={bgImage}
        alt="logo"
        width={100}
        height={100}
        className="h-16 w-16 rounded-lg object-cover"
      />
      <div>
        <Link href={slug ? `/communities/${slug}` : `#`}>
          <h3 className="line-clamp-2 cursor-pointer font-semibold text-zinc-700 hover:text-blue-900">
            {title}
          </h3>
        </Link>
        {lastUpdated && <p className="text-xs text-zinc-400">{lastUpdated}</p>}
        {totalMembersJoined && (
          <p className="text-xs text-zinc-400">{totalMembersJoined}</p>
        )}
      </div>
    </div>
  );
}

function BlogAsideCardSkeleton() {
  return (
    <div className="my-3 flex animate-pulse items-center gap-x-2 rounded-lg bg-gray-100 p-2">
      <div className="h-16 w-16 rounded-lg bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded-md bg-gray-200"></div>
        <div className="h-3 w-1/2 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
}
