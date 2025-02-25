import Image from "next/image";
import React from "react";
import ChatTypeHeadSearchBar from "./TypeHeadSearchBar/ChatTypeHeadSearchBar";
import MessageContainer from "@/components/dashboardSections/messages/MessageContainer";
import useConversation from "@/zustand/useConversation";
import useGetConversations from "@/customHook/ChatHooks/useGetConversations";
import { useSocketContext } from "@/ContextAPI/SocketContext";
import useIsMobile from "../customHooks/useIsMobile";

export default function ChatBox() {
  const [isUsersShow, setIsUsersShow] = React.useState(true);
  const isMobile = useIsMobile();
  return (
    <div className="w-full rounded-xl bg-white">
      <div className="flex items-center gap-5 border-b border-zinc-300 p-2">
        <p className="font-semibold">Search:</p>
        {/* Search Bar */}
        <div className="relative flex h-min w-full max-w-sm items-center gap-2 rounded-full border border-zinc-300 bg-white px-2 py-1 focus-within:border-orange-500">
          <ChatTypeHeadSearchBar />
        </div>
      </div>
      <div className="grid grid-cols-12 p-2 pl-0">
        {/* Aside Section  */}
        <div
          className={`col-span-12 py-2 md:col-span-4 md:border-r-2 md:border-zinc-300 ${isMobile && (isUsersShow ? "block" : "hidden")}`}
        >
          <AsideUsers setIsUsersShow={setIsUsersShow} />
        </div>
        {/* Chatting Section   */}
        <div
          className={`col-span-12 md:col-span-8 ${isMobile && (!isUsersShow ? "block" : "hidden")}`}
        >
          <MessageContainer setIsUsersShow={setIsUsersShow} />
        </div>
      </div>
    </div>
  );
}

function AsideUsers({ setIsUsersShow }: any) {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="h-[68vh] w-full overflow-y-auto">
      {conversations?.map((conversation, i) => (
        <AsideUserCard
          key={conversation.id}
          conversation={conversation}
          setIsUsersShow={setIsUsersShow}
        />
      ))}
      {loading && <AsideUserCardSkeleton />}
    </div>
  );
}

function AsideUserCard({ conversation, setIsUsersShow }: any) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between gap-2 p-2 hover:bg-orange-100 ${isSelected && "border-l-4 border-orange-500 bg-orange-100"}`}
      onClick={() => {
        setSelectedConversation(conversation);
        setIsUsersShow(false);
      }}
    >
      <div className="flex gap-2">
        <div className="flex-center relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-orange-500 shadow-lg">
          {conversation?.avatar ? (
            <Image
              src={conversation?.avatar}
              alt="avatar"
              width={50}
              height={50}
              className="w-full object-contain"
            />
          ) : (
            <p className="h-min w-min uppercase text-white">
              {conversation?.name?.slice(0, 1)}
            </p>
          )}
          {isOnline && (
            <p
              className={`absolute right-0 top-0 bg-green-500 text-xs font-semibold`}
            >
              Online
            </p>
          )}
        </div>
        <div className="text-zinc-500">
          <h6>{conversation?.name}</h6>
          <p className="text-sm font-bold">{conversation?.lastMessage}</p>
        </div>
      </div>
      <div className="flex flex-col items-center text-sm text-zinc-500">
        <p className="text-sm">{conversation?.lastMessageTime}</p>
        {conversation?.unreadMessages > 0 && (
          <p className="h-min w-min rounded-full bg-orange-500 px-1.5 text-white">
            {conversation?.unreadMessages}
          </p>
        )}
      </div>
    </div>
  );
}

function AsideUserCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center justify-between gap-2 p-2">
      <div className="flex gap-2">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-zinc-300"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-zinc-300"></div>
          <div className="h-3 w-32 rounded bg-zinc-300"></div>
        </div>
      </div>
      <div className="flex flex-col items-center text-sm">
        <div className="h-3 w-16 rounded bg-zinc-300"></div>
        <div className="mt-2 h-4 w-4 rounded-full bg-zinc-300"></div>
      </div>
    </div>
  );
}
