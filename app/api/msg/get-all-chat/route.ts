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

    const messages = await prisma.chat.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      history: messages,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}
