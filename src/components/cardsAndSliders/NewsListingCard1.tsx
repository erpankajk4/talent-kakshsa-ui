import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../Button";

export default function NewsListingCard1({
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
        className="h-36 w-80 rounded-lg object-cover"
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
        <Link href={slug ? `/news/${slug}` : `#`} className="max-md:mt-3">
          <h3 className="cursor-pointer font-bold text-black hover:text-blue-900">
            {title}
          </h3>
        </Link>

        <div className="flex items-end gap-4">
          <p className="font-bold text-zinc-500">{author}</p>
          <p className="text-sm text-zinc-400">{lastUpdated}</p>
        </div>
        <Link href={slug ? `/news/${slug}` : `#`}>
          <Button variant="orange" className="text-nowrap !px-2 !py-1">
            Read Full Story
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function NewsListingCard1Skeleton() {
  return (
    <div className="my-3 flex animate-pulse items-center gap-5 rounded-lg bg-white p-2 max-md:flex-col">
      <div className="h-36 w-80 rounded-lg bg-gray-200"></div>
      <div className="w-full space-y-2">
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
          <div className="h-6 w-16 rounded-full bg-gray-200"></div>
        </div>
        <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
        <div className="flex items-end gap-4">
          <div className="h-6 w-24 rounded-md bg-gray-200"></div>
          <div className="h-4 w-16 rounded-md bg-gray-200"></div>
        </div>
        <div className="h-8 w-24 rounded-md bg-orange-300"></div>
      </div>
    </div>
  );
}
