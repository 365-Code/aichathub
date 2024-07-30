"use client";

import { Message, useChat } from "ai/react";
import { Card, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useChatState } from "@/context/ChatState";
import {
  createResource,
  createResourceWithEmbedding,
  updateResource,
  updateResourceWithEmbeddings,
} from "@/lib/actions/resources";
import { generateUUID } from "@/lib/utils";
import Markdown from "react-markdown";

export default function MessageArea() {
  const { messages, input, setMessages, handleInputChange, handleSubmit } =
    useChat();
  // const { messages, setMessages } = useChat();
  const msgRef = useRef<HTMLDivElement | null>(null);
  // const [input, setInput] = useState("");
  const { chat, setNewChat, setChat, updateChat } = useChatState();

  // useEffect(() => {
  //   if (!chat) {
  //     const chatId = generateUUID();
  //     setChat({
  //       id: chatId,
  //       title: input,
  //       messages: [
  //         {
  //           role: "user",
  //           content: input,
  //         },
  //       ],
  //     });

  //     createResource(
  //       {
  //         chatId,
  //         title: input,
  //       },

  //       {
  //         role: "user",
  //         content: input,
  //       },
  //       true
  //     );
  //   } else {
  //     const chatId = chat.id;
  //     createResource(
  //       {
  //         chatId,
  //         title: input,
  //       },
  //       {
  //         role: "user",
  //         content: input,
  //       },
  //       false
  //     );
  //   }
  // }, []);

  // setMessages(chat?.messages)
  // const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!input) return;
  //   try {
  //     if (!chat) {
  //       const chatId = crypto.randomUUID();
  //       localStorage.setItem(
  //         "chat",
  //         JSON.stringify({
  //           id: chatId,
  //           title: input,
  //           messages: [
  //             {
  //               role: "User",
  //               content: input,
  //             },
  //           ],
  //         })
  //       );
  //       setChat({
  //         id: chatId,
  //         title: input,
  //         messages: [
  //           {
  //             role: "User",
  //             content: input,
  //           },
  //         ],
  //       });

  //       const response = await fetch("/api/msg/create-chat", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           chatId,
  //           title: input,
  //           role: "User",
  //           message: input,
  //           extra: messages,
  //         }),
  //       });
  //     } else {
  //       updateChat({
  //         role: "User",
  //         content: input,
  //       });

  //       localStorage.setItem(
  //         "chat",
  //         JSON.stringify({
  //           ...chat,
  //           messages: [
  //             ...chat.messages,
  //             {
  //               role: "User",
  //               content: input,
  //             },
  //           ],
  //         })
  //       );

  //       const response = await fetch("/api/msg/update-chat", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           chatId: chat.id,
  //           role: "User",
  //           message: input,
  //           extra: messages,
  //         }),
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setInput("");
  //   }
  // };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInput(e.target.value);
  // };

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  });

  const handleMessage = () => {
    if (messages && chat) {
      const sysMsg = messages.at(-1);
      if (sysMsg && sysMsg?.role != "user") {
        updateResource(
          {
            chatId: chat.id,
          },
          {
            role: "assistant",
            content: sysMsg.content,
          }
        );
      }
    }
  };

  useEffect(() => {
    if (chat && chat.id) {
      setMessages(chat.messages as Message[]);
    } else {
      setMessages([]);
    }
  }, [chat?.id, chat, chat?.messages]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleMessage();
    }, 2000);
    return () => clearTimeout(debounce);
  }, [messages]);

  const handleFromSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    if (chat) {
      updateResourceWithEmbeddings(
        {
          chatId: chat.id,
        },
        {
          role: "user",
          content: input,
        }
      );
    } else {
      const chatId = generateUUID();
      let chat = {
        id: chatId,
        title: input,
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      };
      setChat(chat);

      createResourceWithEmbedding(
        {
          chatId,
          title: chat.title,
        },
        chat.messages[0]
      );
    }
    handleSubmit(e);
  };

  return (
    <>
      <div
        className={`max-w-full p-6 pb-0 w-[800px] mx-auto space-y-2 flex-1 h-full overflow-y-scroll no-scrollbar transition-all scroll-smooth`}
      >
        {messages.map((m, i) => (
          <Card
            key={i}
            ref={i + 1 == messages.length ? msgRef : null}
            className={`max-w-[92%] sm:max-w-[80%] p-4 ${m.role.toLowerCase() == "user" ? "ml-auto" : " bg-secondary "}`}
          >
            <CardDescription>
              <Markdown>{m.content}</Markdown>
              {/* <pre
                dangerouslySetInnerHTML={{ __html: m.content }}
                className="text-wrap"
              /> */}
              {/* {m.content} */}
            </CardDescription>
          </Card>
        ))}

        {messages.length == 0 && (
          <h1 className="text-2xl font-semibold w-full h-full flex-1 flex flex-col justify-center items-center">
            Welcome to Gemini RAG
          </h1>
        )}
      </div>

      <div className="px-6 py-4 flex items-center gap-x-4 w-[800px] max-w-full mx-auto">
        <form
          // onSubmit={handleSubmit}
          onSubmit={handleFromSubmit}
          className="w-full bg-primary-foreground overflow-hidden flex items-center h-fit focus-within:border-gray-300 border transition-all rounded-full px-2 pl-4"
        >
          <input
            className="w-full bg-transparent h-full px-2 py-4 flex-1 shadow-xl outline-none"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            size={"icon"}
            variant={"secondary"}
            className="rounded-full"
          >
            <ArrowUp className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </form>
      </div>
    </>
  );

  // return (
  //   <div className="h-full flex-1 w-full max-w-3xl mx-auto stretch pt-6 pb-4">
  //     <div
  //       className={`max-w-full p-6 pb-0 w-[800px] mx-auto space-y-2 flex-1 h-full overflow-y-scroll no-scrollbar`}
  //     >
  //       {messages.map((m, i) => (
  //         <Card
  //           key={i}
  //           className={`max-w-[92%] sm:max-w-[80%] p-4 ${m.role == "user" ? "ml-auto" : " bg-secondary "}`}
  //         >
  //           <CardDescription>{m.content}</CardDescription>
  //         </Card>
  //       ))}
  //     </div>
  //     <div className="flex items-center mt-4 gap-x-4">
  //       <Button
  //         variant={"outline"}
  //         size={"icon"}
  //         className="rounded-full text-center"
  //       >
  //         <MessageCircle className="w-[1.2rem] h-[1.2rem]" />
  //       </Button>
  //       <form
  //         onSubmit={handleSubmit}
  //         className="w-full bg-primary-foreground overflow-hidden rounded flex items-center h-fit focus-within:border border-gray-300"
  //       >
  //         <input
  //           className="w-full bg-transparent h-full px-2 py-4 flex-1 shadow-xl outline-none"
  //           value={input}
  //           placeholder="Say something..."
  //           onChange={handleInputChange}
  //         />
  //         <Button size={"icon"} variant={"secondary"}>
  //           <Forward className="w-[1.2rem] h-[1.2rem]" />
  //         </Button>
  //       </form>
  //     </div>
  //   </div>
  // );
}
