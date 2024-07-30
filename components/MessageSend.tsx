"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Forward, MessageCircle } from "lucide-react";
import { useChat } from "ai/react";
import { useChatState } from "@/context/ChatState";

function MessageSend() {
  // const { input, handleInputChange, handleSubmit, messages } = useChat();

  const [input, setInput] = useState("");
  const { chat, setNewChat, setChat, updateChat } = useChatState();

  const handleSubmit = async () => {
    if (!input) return;
    if (!chat) {
      const chatId = crypto.randomUUID();
      setChat({
        id: chatId,
        title: input,
        messages: [
          {
            role: "User",
            content: input,
          },
        ],
      });
      const response = await fetch("/api/msg/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          title: input,
          role: "User",
          messge: input,
        }),
      });
    } else {
      updateChat({
        role: "User",
        content: input,
      });

      const response = await fetch("/api/msg/update-chat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chat.id,
          role: "User",
          messge: input,
        }),
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="px-6 py-4 flex items-center gap-x-4 w-[800px] max-w-full mx-auto">
      <Button
        variant={"outline"}
        size={"icon"}
        className="rounded-full text-center"
      >
        <MessageCircle className="w-[1.2rem] h-[1.2rem]" />
      </Button>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-primary-foreground overflow-hidden rounded flex items-center h-fit focus-within:border border-gray-300"
      >
        <input
          className="w-full bg-transparent h-full px-2 py-4 flex-1 shadow-xl outline-none"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          size={"icon"}
          variant={"secondary"}
        >
          <Forward className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </form>
    </div>
  );
}

export default MessageSend;
