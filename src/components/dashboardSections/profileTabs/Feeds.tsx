import { news1, video } from "@/assets";
import { UserComments } from "@/components/Page-discussionForumPage/UserComments";
import { codeSnippetDemo } from "@/data/shiki";
import React from "react";

export default function Feeds() {
  return (
    <div className="col-span-6 space-y-5 max-lg:col-span-9">
      {/* Your Asked Feeds  */}
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
  );
}
