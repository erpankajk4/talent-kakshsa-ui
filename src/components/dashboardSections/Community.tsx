import React from "react";
import { UserComments } from "../Page-discussionForumPage/UserComments";
import { banner1, news1, video } from "@/assets";
import { codeSnippetDemo } from "@/data/shiki";
import DiscussionAside from "../AsideSections/DiscussionAside";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import formatFees from "@/utils/customText";

export default function Community() {
  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-span-6 space-y-5 max-lg:col-span-9">
        {/* Group List  */}
        <Group />
        {/* Popular Posts  */}
        {[1, 2].map((item) => (
          <UserComments
            key={item}
            description="This is a description"
            images={[news1]}
            cameraImages={[news1]}
            videos={[video]}
            lastUpdated="lastUpdated"
            userAvatar={news1}
            userName="User Name"
            userDesignation="User Designation"
            codeSnippet={codeSnippetDemo}
            codeSnippetFileName={"pankaj"}
          />
        ))}
      </div>
      <DiscussionAside />
    </div>
  );
}

function Group() {
  return (
    <div className="w-full space-y-5 rounded-lg bg-white p-3">
      <h2 className="border-b border-zinc-300 pb-3 text-xl font-bold">
        Groups
      </h2>
      <ul className="space-y-5 border-b border-zinc-300 pb-5">
        {[...Array(5)]?.map((item: any, Index: number) => (
          <GroupCard
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
        <button className="pb-3 text-center font-bold text-zinc-700 hover:underline">
          See all Results
        </button>
      </div>
    </div>
  );
}

function GroupCard({ title, bg, joinedMembers, desc, id }: any) {
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
          Join
        </Button>
      </div>
    </div>
  );
}
