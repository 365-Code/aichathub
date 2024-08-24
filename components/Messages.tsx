import React from "react";
import { Card, CardDescription } from "./ui/card";
import { Message } from "ai";
import CustomMarkdown from "./CustomMarkdown";
import { Bot, BrainCog, User } from "lucide-react";

const Messages = ({ messages }: { messages: Message[] }) => {
  const msgRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      {messages.map((m, i) => (
        <div className={`flex-row flex items-start gap-x-2`}>
          {m.role !== "user" && (
            <span className="mt-2 rounded-full dark:bg-white text-black overflow-hidden flex justify-center items-center p-2">
              <BrainCog className="w-[1rem] h-[1rem]" />
            </span>
          )}
          <Card
            key={i}
            ref={i + 1 == messages.length ? msgRef : null}
            className={`max-w-[92%] border-none text-wrap ${m.role == "user" ? "p-4 ml-auto dark:bg-white/10 bg-black/10" : "p-0 bg-transparent"}`}
          >
            {/* <CustomMarkdown content={m.content} /> Use CustomMarkdown */}
            <CardDescription className="text-base">
              <CustomMarkdown>{m.content}</CustomMarkdown>
            </CardDescription>
          </Card>
        </div>
      ))}
    </>
  );
};

export default Messages;
