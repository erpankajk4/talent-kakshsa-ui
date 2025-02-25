"use client";
import { useEffect, useState } from "react";
import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAppSelector } from "@/Redux";
import BgSvg from "./BgSvg";
import { IoMdArrowRoundBack } from "react-icons/io";

const MessageContainer = ({ setIsUsersShow }: any = {}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex w-full flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="mb-2 flex border-b border-zinc-300 px-4 py-2">
            <span className="flex-center mx-2 rounded-lg bg-orange-500 p-1 text-xl text-white md:hidden">
              <IoMdArrowRoundBack onClick={() => setIsUsersShow(true)} />
            </span>
            <span className="label-text">To:</span>{" "}
            <span className="font-bold text-zinc-600">
              {selectedConversation?.name}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const [isClient, setIsClient] = useState(false);
  const authUser = useAppSelector((state) => state.auth);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {}, [authUser]);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 px-4 text-center font-semibold text-zinc-600 sm:text-lg md:text-xl">
        <BgSvg />
        {authUser?.userName && <p>Welcome, {authUser?.userName}</p>}
        <p className="text-sm">
          Make a Quality Discussion Here with Your Friends
        </p>
      </div>
    </div>
  );
};
