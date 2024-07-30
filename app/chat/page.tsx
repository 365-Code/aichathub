"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle, SidebarClose } from "lucide-react";
import MessageArea from "@/components/MessageArea";
import { useChatState } from "@/context/ChatState";

function Page() {
  const [showHistory, setShowHistory] = useState(false);

  const [history, setHistory] = useState<Array<{
    chatId: string;
    title: string;
  }> | null>(null);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/msg/get-all-chat");
      if (response.ok) {
        const result = await response.json();
        setHistory(result.history);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const { chat, fetchChat, setChat } = useChatState();

  const handleNewChat = () => {
    if (!chat) return;
    if (history && chat.id != history[0].chatId) {
      setHistory([{ chatId: chat.id, title: chat.title }, ...history]);
    } else {
      setHistory([
        {
          chatId: chat.id,
          title: chat.title,
        },
      ]);
    }
    setChat(null);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-screen overflow-y-hidden relative"
    >
      <ResizablePanel
        className={`md:max-w-[25%] w-full md:bg-auto p-6 max-h-screen custom-scrollbar overflow-y-scroll transition-all md:translate-x-0 md:opacity-100 md:relative md:z-auto fixed ${showHistory ? "translate-x-0 opacity-100 z-20 bg-black" : "-translate-x-full opacity-0"}`}
        minSize={15}
        defaultSize={20}
        maxSize={25}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-xl">Chat History</h2>
          <Button
            variant={"outline"}
            size={"icon"}
            title="New Chat"
            className="rounded-full text-center"
            onClick={handleNewChat}
          >
            <MessageCircle className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </div>
        <div className="mt-2 space-y-2 h-full max-h-[95%] custom-scrollbar overflow-y-scroll">
          {history && history.length == 0 && (
            <h2 className="text-center my-4 font-semibold text-xl">
              No Chats Yet
            </h2>
          )}
          {history?.map((h, i) => (
            <Button
              onClick={() => fetchChat(h.chatId)}
              key={i}
              variant={"outline"}
              className="w-full text-left"
            >
              <p className="truncate text-left">{h.title}</p>
            </Button>
          ))}
          {/* {hstry.map((m, i) => (
            <Button key={i} variant={"outline"} className="w-full">
              <p className="truncate">{m.title}</p>
            </Button>
          ))} */}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-screen flex flex-col relative ">
        <Header />
        <Button
          variant={"outline"}
          className=" absolute z-20 md:hidden block right-6 top-6"
          onClick={() => setShowHistory(!showHistory)}
        >
          <Menu
            className={` ${showHistory ? "rotate-0 opacity-100" : "opacity-0 rotate-90"} `}
          />
          <SidebarClose
            className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${showHistory ? "rotate-90 opacity-0" : "rotate-0 opacity-100"} `}
          />
        </Button>
        <MessageArea />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Page;
