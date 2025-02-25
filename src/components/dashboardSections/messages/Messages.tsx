import { useEffect, useRef } from "react";
import Message, { MessageSkeleton } from "./Message";
import useGetMessages from "@/customHook/ChatHooks/useGetMessages";
import useListenMessages from "@/customHook/ChatHooks/useListenMessages";
import { dummyConversations } from "@/data/wrapperData";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="min-h-[55vh] flex-1 overflow-auto px-4 md:min-h-[60vh]">
      {!loading &&
        messages.length > 0 &&
        messages.map((message: any) => (
          <div key={message.id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
