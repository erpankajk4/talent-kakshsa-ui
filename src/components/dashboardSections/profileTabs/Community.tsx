import { banner1 } from "@/assets";
import { Button } from "@/components/Button";
import formatFees from "@/utils/customText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Community() {
  return (
    <div className="space-y-5 py-5">
      <ul className="space-y-5 border-b border-zinc-300 pb-5">
        {[...Array(5)]?.map((item: any, Index: number) => (
          <CommunityCard
            key={Index}
            title="Digital Marketing"
            bg={banner1}
            joinedMembers={1000000}
            desc="Digital Marketing is one of the most exciting and dynamic groups on LinkedIn for digital marketing professionals and is an extension."
            id={1}
          />
        ))}
      </ul>
      <div className="flex w-full justify-center">
        <button className="text-center font-bold text-zinc-700 hover:underline">
          See all Joined Community
        </button>
      </div>
    </div>
  );
}

function CommunityCard({ title, bg, joinedMembers, desc, id }: any) {
  return (
    <div className="grid-cols-12 gap-4 max-md:space-y-4 md:grid">
      <div className="col-span-2 overflow-hidden rounded-lg">
        <Image
          src={bg}
          alt={title}
          className="h-full w-full rounded-lg object-cover object-center max-md:h-44"
        />
      </div>
      <div className="col-span-7 text-zinc-700">
        <Link href={id ? `/groups/${id}` : `#`}>
          <h3 className="text-lg font-bold">{title}</h3>
        </Link>
        <p>{formatFees(joinedMembers)} Members</p>
        <p className="line-clamp-2 text-sm text-gray-500">{desc}</p>
      </div>
      <div className="col-span-3 flex w-full items-center">
        <Button variant="blueBorder" className="text-nowrap">
          Joined
        </Button>
      </div>
    </div>
  );
}
