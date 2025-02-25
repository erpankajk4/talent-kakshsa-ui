import { useState } from "react";
// import { useAuthContext } from "../../context/AuthContext";
import { useAppSelector } from "@/Redux";
import Image from "next/image";
import useConversation from "@/zustand/useConversation";
import { formatTime } from "@/utils/customText";

const Message = ({ message }: any) => {
  // const { authUser } = useAuthContext();
  const authUser = useAppSelector((state) => state.auth);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.userID;
  const formattedTime = formatTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const avatar = fromMe ? authUser.avatar : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-green-700" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image alt="chat bubble" src={avatar} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} group relative pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer flex items-center gap-1 text-xs opacity-50">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;

export const MessageSkeleton = () => {
  return (
    <div className="chat">
      <div className="chat-image avatar">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
      </div>
      <div className="chat-bubble group relative h-6 w-3/4 animate-pulse rounded-lg bg-gray-400 pb-2 text-white">
        <div className="h-full w-full"></div>
      </div>
      <div className="chat-footer flex items-center gap-1 text-xs opacity-50">
        <div className="h-4 w-10 animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
};
