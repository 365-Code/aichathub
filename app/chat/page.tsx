"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { MessageCircle, SidebarClose } from "lucide-react";
import MessageArea from "@/components/MessageArea";
import { useChatState } from "@/context/ChatState";
import ChatHistory from "@/components/ChatHistory";

function Page() {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-screen overflow-hidden h-full relative"
    >
      <ResizablePanel
        className={`md:max-w-[25%] md:translate-x-0 md:opacity-100 w-full md:bg-gray-800 p-4 md:py-6 md:z-auto md:relative max-h-screen fixed custom-scrollbar overflow-y-auto transition-transform z-20 md:h-auto h-full duration-300 ease-in-out ${showHistory ? "translate-x-0 opacity-100 bg-gray-800" : "-translate-x-full opacity-0"} shadow-lg`}
        minSize={15}
        defaultSize={20}
        maxSize={25}
      >
        <ChatHistory
          isVisible={showHistory}
          hideHistory={() => setShowHistory(false)}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-screen flex flex-col relative bg-gray-900 text-white">
        <Header
          isVisible={showHistory}
          showHistory={() => setShowHistory(true)}
        />
        <MessageArea />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Page;
