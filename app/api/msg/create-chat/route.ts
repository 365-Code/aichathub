import prisma from "@/lib/db/prisma";
import { generateEmbeddings } from "@/lib/embeddings";
import { chatIndex } from "@/lib/pinecone";
import { getUser } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chatId, message, role, title } = await req.json();
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }
    if (!chatId || !role) {
      return NextResponse.json({ msg: "Database Error" }, { status: 401 });
    }
    const embeddings = await generateEmbeddings(message);
    const msgId = crypto.randomUUID();
    const msg = await prisma.$transaction(async (tx) => {
      const msg = tx.chat.create({
        data: {
          chatId,
          userId: user.id,
          title,
          chats: {
            create: [
              {
                id: msgId,
                role,
                content: message,
              },
            ],
          },
        },
      });

      await chatIndex.upsert([
        {
          id: msgId,
          values: embeddings,
          metadata: {
            userId: user.id,
          },
        },
      ]);

      return msg;
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
