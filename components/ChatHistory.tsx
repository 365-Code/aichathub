import React, { useEffect, useState } from "react";
import { ResizablePanel } from "./ui/resizable";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { hstry } from "@/utils";
import ChatTitle from "./ChatTitle";

const ChatHistory = () => {
  const [showHistory, setShowHistory] = useState(false);

  const [chats, setChats] = useState([]);

  const fetchChats = () => {
    
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
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
        >
          <MessageCircle className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </div>
      <div className="mt-2 space-y-2 max-h-[95%] custom-scrollbar overflow-y-scroll">
        {hstry.map((m, i) => (
          <ChatTitle title={m.title} />
        ))}
      </div>
    </ResizablePanel>
  );
};

export default ChatHistory;
