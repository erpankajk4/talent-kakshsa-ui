import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewsCard({
  bgImage,
  title,
  tags,
  author,
  lastUpdated,
  description,
  slug,
}: any) {
  return (
    <div className="col-span-1 w-full space-y-3 rounded-lg bg-white p-5 shadow-lg">
      <Image
        src={bgImage}
        alt="news Bg"
        width={400}
        height={400}
        className="mb-3 h-60 w-full rounded-lg object-cover"
      />
      <Link href={slug ? `/news/${slug}` : `#`}>
        <h2 className="line-clamp-2 cursor-pointer text-lg font-bold hover:text-blue-900">
          {title}
        </h2>
      </Link>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag: any, index: number) => (
          <span
            key={index}
            className="rounded-full bg-blue-200 px-2 py-1 text-sm text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-end gap-4">
        <p className="font-bold">{author}</p>
        <p className="text-sm text-zinc-400">{lastUpdated}</p>
      </div>
      <p className="line-clamp-4 text-justify text-zinc-500">{description}</p>
      <Link
        href={slug ? `/news/${slug}` : `#`}
        className="text-blue-900 hover:underline"
      >
        Read More
      </Link>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="col-span-1 w-full space-y-3 rounded-lg bg-white p-5 shadow-lg">
      <div className="mb-3 h-60 w-full animate-pulse rounded-lg bg-gray-200"></div>
      <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
      </div>
      <div className="flex items-end gap-4">
        <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
      <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200"></div>
    </div>
  );
}
