import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, SidebarClose } from "lucide-react";
import { useChatState } from "@/context/ChatState";
import { isVoidExpression } from "typescript";

type ChatHistoryProps = {
  isVisible: boolean;
  hideHistory: () => void;
};

const ChatHistory = ({ isVisible, hideHistory }: ChatHistoryProps) => {
  const [history, setHistory] = React.useState<Array<{
    chatId: string;
    title: string;
  }> | null>(null);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/msg/get-all-chat");
      if (response.ok) {
        const result = await response.json();
        setHistory(result.history.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const { chat, fetchChat, setChat } = useChatState();

  const handleNewChat = () => {
    if (!chat) return;
    if (history?.findIndex((hst) => hst.chatId != chat.id) === -1) {
      setHistory([{ chatId: chat.id, title: chat.title }, ...history]);
    }
    setChat(null);
    setActiveChat(-1);
  };

  const [activeChat, setActiveChat] = React.useState(0);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg text-white">Chat History</h2>
        <div className="flex items-center gap-x-2">
          <Button onClick={hideHistory} className="md:hidden text-black">
            <SidebarClose
              className={`transition-transform ${isVisible ? "rotate-0 opacity-100" : "rotate-90 opacity-0"} duration-300`}
            />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            title="New Chat"
            className="rounded-full text-center border text-white hover:bg-gray-600"
            onClick={handleNewChat}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-2 h-full max-h-[93%] custom-scrollbar scroll-smooth overflow-y-auto">
        {history && history.length === 0 && (
          <h2 className="text-center my-4 font-semibold text-lg text-gray-400">
            No Chats Yet
          </h2>
        )}
        {history?.map((h, i) => (
          <Button
            onClick={() => {
              setActiveChat(i);
              fetchChat(h.chatId);
            }}
            key={i}
            variant={activeChat === i ? "default" : "outline"}
            className={`w-full text-left ${activeChat === i ? "dark:hover:text-black bg-gray-700 text-white" : "text-gray-200"}`}
          >
            <p className="truncate">{h.title}</p>
          </Button>
        ))}
      </div>
    </>
  );
};

export default ChatHistory;
