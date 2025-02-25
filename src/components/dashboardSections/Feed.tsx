import React from "react";
import { DiscussionForumPostInput } from "../Page-discussionForumPage/DiscussionForumPostInput";
import { UserComments } from "../Page-discussionForumPage/UserComments";
import { news1, video } from "@/assets";
import { codeSnippetDemo } from "@/data/shiki";
import DiscussionAside from "../AsideSections/DiscussionAside";

export default function Feed() {
  return (
    <div className="grid grid-cols-9 gap-4">
      <div className="col-span-6 space-y-5 max-lg:col-span-9">
        <DiscussionForumPostInput avatar={false} />
        {/* Other User Comments  */}
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
