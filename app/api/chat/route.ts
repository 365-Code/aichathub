import prisma from "@/lib/db/prisma";
import { generateEmbeddings } from "@/lib/embeddings";
import { chatIndex } from "@/lib/pinecone";
import { getUser } from "@/utils/supabase/server";
import { google } from "@ai-sdk/google";
import { CoreMessage, LanguageModel, streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: CoreMessage[] = body.messages;
    const truncatedMessages = messages.slice(-6);

    // console.log(messages.at(-1));

    const embeddings = await generateEmbeddings(
      truncatedMessages.map((m) => m.content).join("\n")
    );

    const user = await getUser();

    if (!user) return NextResponse.json({ msg: "Unauthorized" });

    const vectorQueryResponse = await chatIndex.query({
      vector: embeddings,
      topK: 3,
      filter: { userId: user.id },
    });
    // console.log(vectorQueryResponse.matches.map((match) => match.id));

    let relevantMessages = null;
    if (vectorQueryResponse.matches.length != 0) {
      relevantMessages = await prisma.messages.findMany({
        where: {
          id: {
            in: vectorQueryResponse.matches.map((match) => match.id),
          },
        },
      });
      console.log(relevantMessages);
    }

    const systemMessage: CoreMessage = {
      role: "assistant",
      content:
        "You are an intelligent memorizer and query solver. You answer the user's question based on their existing messages first. If the info is personal, answer them you don't know, if its public give them the best answer" +
        (relevantMessages && relevantMessages?.length != 0
          ? "The relevant messages for this query are:\n" +
            relevantMessages.map((msg) => msg.content).join("\n")
          : ""),
    };

    const result = await streamText({
      model: google("models/gemini-pro") as LanguageModel,
      messages: [systemMessage, ...truncatedMessages],
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Chat Api Error" });
  }
}

// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { Message, StreamingTextResponse } from 'ai';

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// // convert messages from the Vercel AI SDK Format to the format
// // that is expected by the Google GenAI SDK
// const buildGoogleGenAIPrompt = (messages: Message[]) => ({
//   contents: messages
//     .filter(message => message.role === 'user' || message.role === 'assistant')
//     .map(message => ({
//       role: message.role === 'user' ? 'user' : 'model',
//       parts: [{ text: message.content }],
//     })),
// });

// export async function POST(req: Request) {
//   // Extract the `prompt` from the body of the request
//   const { messages } = await req.json();

//   const geminiStream = await genAI
//     .getGenerativeModel({ model: 'gemini-pro' })
//     .generateContentStream(buildGoogleGenAIPrompt(messages));

//   // Convert the response into a friendly text-stream
//   const stream = creategoogle(geminiStream);

//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }
