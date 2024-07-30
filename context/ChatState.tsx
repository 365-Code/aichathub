"use client";
import prisma from "@/lib/db/prisma";
import { getUser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useChat } from "ai/react/dist";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type MsgType = {
  role: string;
  content: string;
};

type ChatType = {
  id: string;
  title: string;
  messages: MsgType[];
};
type ChatContextType = {
  chat: ChatType | null;
  setChat: Dispatch<SetStateAction<ChatType | null>>;
  setNewChat: (title: string, messages: MsgType) => void;
  user: User | null;
  updateChat: (message: MsgType) => void;
  fetchChat: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

const ChatState = ({ children }: { children: React.ReactNode }) => {
  const [chat, setChat] = useState<ChatType | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setCurrentUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  const fetchHistory = async () => {};

  const fetchChat = async (chatId: string) => {
    try {
      const response = await fetch("/api/msg/get-chat?chatId=" + chatId);

      if (response.ok) {
        const result = await response.json();
        setChat({
          id: chatId,
          title: result.messages[0].content,
          messages: result.messages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLastChat = async () => {
    try {
      const response = await fetch("/api/msg/get-latest");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setChat({
            id: result.chat.chatId,
            title: result.chat.title,
            messages: result.chat.messages,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLastChat();
    setCurrentUser();
  }, []);

  const setNewChat = (title: string, message: MsgType) => {
    if (!chat || chat.messages) return;
    setChat({
      id: crypto.randomUUID(),
      messages: [message],
      title,
    });
  };

  const updateChat = (message: MsgType) => {
    if (!message || !chat) return;
    setChat({ ...chat, messages: [...chat?.messages, message] });
  };

  return (
    <ChatContext.Provider
      value={{ chat, setChat, setNewChat, user, updateChat, fetchChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatState;

export const useChatState = () => useContext(ChatContext) as ChatContextType;
