import prisma from "@/lib/db/prisma";
import { generateEmbeddings } from "@/lib/embeddings";
import { chatIndex } from "@/lib/pinecone";
import { getUser } from "@/utils/supabase/server";
import { google } from "@ai-sdk/google";
import {
  convertToCoreMessages,
  CoreMessage,
  LanguageModel,
  streamText,
} from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: CoreMessage[] = body.messages;
    const truncatedMessages = messages.slice(-6);

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

    let relevantMessages = null;
    if (vectorQueryResponse.matches.length != 0) {
      relevantMessages = await prisma.messages.findMany({
        where: {
          id: {
            in: vectorQueryResponse.matches.map((match) => match.id),
          },
        },
      });
    }

    // const systemMessage: CoreMessage = {
    //   role: "assistant",
    //   content: `
    //     You are an intelligent memorizer and query solver. You answer the user's question based on their existing messages first. If the info is personal, answer them you don't know; if it's public, give them the best answer.
    //     ${
    //       relevantMessages && relevantMessages?.length != 0
    //         ? "The relevant messages for this query are:\n" +
    //           relevantMessages.map((msg) => msg.content).join("\n")
    //         : ""
    //     }
    //     Always format your responses in Markdown.
    //   `,
    // };

    const systemMessage: CoreMessage = {
      role: "assistant",
      content: `
        **Introduction:**
        You are an intelligent assistant trained to provide detailed and well-structured responses based on the user's query and relevant past messages.
    
        **Response Guidelines:**
        1. **Start with a Brief Description**: Begin with a short context or background related to the user's query.
        2. **Provide the Direct Answer**: Clearly state the answer to the user's question.
        3. **Include Explanations**: Add additional explanations if needed for clarity. Use headings and bullet points where appropriate.
        4. **Format Using Markdown**:
           - Use **bold** for important terms or concepts.
           - Use "code blocks" for technical terms or code snippets.
           - Use bullet points to list multiple items.
           - Use **headings** for sections like Introduction, Response, and Explanation.
    
        ${
          relevantMessages && relevantMessages.length > 0
            ? "Here are some relevant messages to consider:\n\n" +
              relevantMessages.map((msg) => `- **Message:** ${msg.content}`).join("\n")
            : "No relevant messages found."
        }
    
        Ensure your responses are well-organized and easy to read.
      `
    }
    

    const msgs = [systemMessage, ...truncatedMessages] as Array<any>;
    const result = await streamText({
      model: google("models/gemini-pro") as LanguageModel,
      messages: convertToCoreMessages(msgs),
    });

    return result.toAIStreamResponse({
      headers: { "Content-Type": "text/markdown" },
    });

    // return result.toAIStreamResponse();
  } catch (error) {
    return NextResponse.json({ msg: "Chat Api Error", error });
  }
}
