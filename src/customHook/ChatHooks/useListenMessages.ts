"use client";
import { useEffect } from "react";
import useConversation from "@/zustand/useConversation";
import { useSocketContext } from "@/ContextAPI/SocketContext";
import { notificationSound } from "@/assets";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		const handleNewMessage = (newMessage: any) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		};

		socket?.on("newMessage", handleNewMessage);

		return () => {
			socket?.off("newMessage", handleNewMessage);
		};
	}, [socket, setMessages, messages]);
};

export default useListenMessages;
