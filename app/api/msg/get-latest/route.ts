import prisma from "@/lib/db/prisma";
import { generateEmbeddings } from "@/lib/embeddings";
import { chatIndex } from "@/lib/pinecone";
import { getUser } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const chat = await prisma.chat.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    if (chat.length == 0) {
      return NextResponse.json({ msg: "No Chats Yet", success: false });
    }

    const chats = await prisma.messages.findMany({
      where: {
        chatUserId: chat[0].chatId,
      },
    });

    return NextResponse.json({
      success: true,
      chat: {
        chatId: chat[0].chatId,
        title: chat[0].title,
        messages: chats,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
