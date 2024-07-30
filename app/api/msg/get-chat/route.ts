import prisma from "@/lib/db/prisma";
import { getUser } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) return NextResponse.json({ msg: "Invalid Key" });
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.messages.findMany({where: {chatUserId: chatId}});

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}