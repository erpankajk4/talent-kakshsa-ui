import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";

export default function ThreadListingCard({
  title,
  description,
  tags,
  lastUpdated,
  slug,
}: any) {
  return (
    <div className="my-3 flex cursor-pointer items-center gap-5 rounded-lg bg-white p-2 max-md:flex-col">
      <div className="w-full space-y-2">
        <div className="flex w-full justify-between gap-5 max-md:flex-col">
          <Link href={slug ? `/discussion-forum/${slug}` : `#`}>
            <h3 className="cursor-pointer font-bold capitalize text-black hover:text-blue-900 md:line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-zinc-400">{lastUpdated}</p>
        </div>
        <p className="line-clamp-2 text-zinc-700">{description}</p>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag: any, index: number) => (
              <span
                key={index}
                className="flex-center rounded-full bg-blue-900 px-4 py-1 text-sm capitalize text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={slug ? `/discussion-forum/${slug}` : `#`}>
            <Button variant="orange" className="text-nowrap !px-2 !py-1">
              Join Discussion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
