import Image from "next/image";
import Link from "next/link";

export default function BlogListingCard({
  bgImage,
  category,
  author,
  title,
  lastUpdated,
  slug,
}: any) {
  return (
    <div className="my-3 flex cursor-pointer gap-5 rounded-lg bg-white p-2 max-md:flex-col">
      <Image
        src={bgImage}
        alt="logo"
        width={500}
        height={500}
        className="h-32 w-80 rounded-lg object-cover"
      />
      <div className="w-full space-y-2">
        <p className="text-sm text-blue-600">{category}</p>
        <div className="flex w-full justify-between gap-5 max-md:flex-col">
          <Link href={slug ? `/blogs/${slug}` : `#`}>
            <h3 className="cursor-pointer font-bold text-black hover:text-blue-900">
              {title}
            </h3>
          </Link>
        </div>
        <div className="flex items-end gap-4">
          <p className="font-bold text-orange-500">{author}</p>
          <p className="text-sm text-zinc-400">{lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}

export function BlogListingCardSkeleton() {
  return (
    <div className="my-3 flex animate-pulse gap-5 rounded-lg bg-white p-2 max-md:flex-col">
      <div className="h-32 w-80 rounded-lg bg-gray-200"></div>
      <div className="w-full space-y-2">
        <div className="h-4 w-24 rounded-md bg-gray-200"></div>
        <div className="flex w-full justify-between gap-5 max-md:flex-col">
          <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
        </div>
        <div className="flex items-end gap-4">
          <div className="h-6 w-24 rounded-md bg-gray-200"></div>
          <div className="h-4 w-16 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
