// "use client";

// import { Message, useChat } from "ai/react";
// import { Card, CardDescription } from "./ui/card";
// import { Button } from "./ui/button";
// import { ArrowUp } from "lucide-react";
// import { ChangeEvent, useEffect, useRef, useState } from "react";
// import { useChatState } from "@/context/ChatState";
// import {
//   createResourceWithEmbedding,
//   updateResource,
//   updateResourceWithEmbeddings,
// } from "@/lib/actions/resources";
// import { generateUUID } from "@/lib/utils";
// import Markdown from "react-markdown";
// import CustomMarkdown from "./CustomMarkdown";

// export default function MessageArea() {
//   const msgRef = useRef<HTMLDivElement | null>(null);
//   const { chat, setChat } = useChatState();
//   const { messages, input, setMessages, handleInputChange, handleSubmit } =
//     useChat({
//       async onFinish(message) {
//         if (!chat) return;
//         updateResource(
//           {
//             chatId: chat.id,
//           },
//           {
//             role: "assistant",
//             content: message.content,
//           }
//         );
//       },
//     });

//   useEffect(() => {
//     if (msgRef.current) {
//       msgRef.current.scrollIntoView();
//     }
//   });

//   useEffect(() => {
//     if (chat && chat.id) {
//       setMessages(chat.messages as Message[]);
//     } else {
//       setMessages([]);
//     }
//   }, [chat?.id, chat, chat?.messages]);

//   const handleFromSubmit = (e: ChangeEvent<HTMLFormElement>) => {
//     if (chat) {
//       updateResourceWithEmbeddings(
//         {
//           chatId: chat.id,
//         },
//         {
//           role: "user",
//           content: input,
//         }
//       );
//     } else {
//       const chatId = generateUUID();
//       let chat = {
//         id: chatId,
//         title: input,
//         messages: [
//           {
//             role: "user",
//             content: input,
//           },
//         ],
//       };
//       setChat(chat);

//       createResourceWithEmbedding(
//         {
//           chatId,
//           title: chat.title,
//         },
//         chat.messages[0]
//       );
//     }
//     handleSubmit(e);
//   };

//   return (
//     <>
//       <div
//         className={`max-w-full p-6 pb-0 w-[800px] mx-auto space-y-2 flex-1 h-full overflow-y-scroll no-scrollbar transition-all scroll-smooth`}
//       >
//         {messages.map((m, i) => (
//           <Card
//             key={i}
//             ref={i + 1 == messages.length ? msgRef : null}
//             className={`max-w-[92%] text-wrap p-4 ${m.role.toLowerCase() == "user" ? "ml-auto" : " bg-secondary "}`}
//           >
//             <CardDescription className="">
//               <Markdown className={"text-wrap overflow-x-auto break-words"}>
//                 {m.content}
//               </Markdown>
//             </CardDescription>
//           </Card>
//         ))}

//         {messages.length == 0 && (
//           <h1 className="text-2xl font-semibold w-full h-full flex-1 flex flex-col justify-center items-center">
//             Welcome to Gemini RAG
//           </h1>
//         )}
//       </div>

//       <div className="px-6 py-4 flex items-center gap-x-4 w-[800px] max-w-full mx-auto">
//         <form
//           // onSubmit={handleSubmit}
//           onSubmit={handleFromSubmit}
//           className="w-full bg-primary-foreground overflow-hidden flex items-center h-fit focus-within:border-gray-300 border transition-all rounded-full px-2 pl-4"
//         >
//           <input
//             className="w-full bg-transparent h-full px-2 py-4 flex-1 shadow-xl outline-none"
//             value={input}
//             placeholder="Say something..."
//             onChange={handleInputChange}
//           />
//           <Button
//             type="submit"
//             size={"icon"}
//             variant={"secondary"}
//             className="rounded-full"
//           >
//             <ArrowUp className="w-[1.2rem] h-[1.2rem]" />
//           </Button>
//         </form>
//       </div>
//     </>
//   );

//   // return (
//   //   <div className="h-full flex-1 w-full max-w-3xl mx-auto stretch pt-6 pb-4">
//   //     <div
//   //       className={`max-w-full p-6 pb-0 w-[800px] mx-auto space-y-2 flex-1 h-full overflow-y-scroll no-scrollbar`}
//   //     >
//   //       {messages.map((m, i) => (
//   //         <Card
//   //           key={i}
//   //           className={`max-w-[92%] sm:max-w-[80%] p-4 ${m.role == "user" ? "ml-auto" : " bg-secondary "}`}
//   //         >
//   //           <CardDescription>{m.content}</CardDescription>
//   //         </Card>
//   //       ))}
//   //     </div>
//   //     <div className="flex items-center mt-4 gap-x-4">
//   //       <Button
//   //         variant={"outline"}
//   //         size={"icon"}
//   //         className="rounded-full text-center"
//   //       >
//   //         <MessageCircle className="w-[1.2rem] h-[1.2rem]" />
//   //       </Button>
//   //       <form
//   //         onSubmit={handleSubmit}
//   //         className="w-full bg-primary-foreground overflow-hidden rounded flex items-center h-fit focus-within:border border-gray-300"
//   //       >
//   //         <input
//   //           className="w-full bg-transparent h-full px-2 py-4 flex-1 shadow-xl outline-none"
//   //           value={input}
//   //           placeholder="Say something..."
//   //           onChange={handleInputChange}
//   //         />
//   //         <Button size={"icon"} variant={"secondary"}>
//   //           <Forward className="w-[1.2rem] h-[1.2rem]" />
//   //         </Button>
//   //       </form>
//   //     </div>
//   //   </div>
//   // );
// }

"use client";

import { Message, useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useChatState } from "@/context/ChatState";
import {
  createResourceWithEmbedding,
  updateResource,
  updateResourceWithEmbeddings,
} from "@/lib/actions/resources";
import { generateUUID } from "@/lib/utils";
import CustomMarkdown from "./CustomMarkdown"; // Import CustomMarkdown
import Messages from "./Messages";
import Welcome from "./Welcome";

export default function MessageArea() {
  // const msgRef = useRef<HTMLDivElement | null>(null);
  const { chat, setChat } = useChatState();
  const { messages, input, setMessages, handleInputChange, handleSubmit } =
    useChat({
      async onFinish(message) {
        if (!chat) return;
        updateResource(
          {
            chatId: chat.id,
          },
          {
            role: "assistant",
            content: message.content,
          }
        );
      },
    });

  // useEffect(() => {
  //   if (chat && chat.id) {
  //     setMessages(chat.messages as Message[]);
  //   } else {
  //     setMessages([]);
  //   }
  // }, [chat?.id, chat, chat?.messages]);

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
        className={`max-w-full w-[900px] p-6 pb-0  mx-auto space-y-2 flex-1 h-full overflow-y-scroll no-scrollbar transition-all scroll-smooth`}
      >
        {messages.length == 0 ? <Welcome /> : <Messages messages={messages} />}
      </div>
      <div className="px-6 py-4 flex items-center gap-x-4 w-[900px] max-w-full mx-auto">
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
}
