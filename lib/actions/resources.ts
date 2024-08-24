"use server";
import { getUser } from "@/utils/supabase/server";
import prisma from "../db/prisma";
import { chatIndex } from "../pinecone";
import { generateEmbeddings } from "../embeddings";
import { generateUUID } from "../utils";

type MessageType = {
  id?: string;
  role: string;
  content: string;
};

type ResourceType = {
  chatId: string;
  userId?: string;
  title: string;
};

export async function createResource(
  resource: ResourceType,
  message: MessageType
) {
  try {
    const user = await getUser();
    if (!user) throw Error("Unauthorized Access");

    const msgId = generateUUID();
    const chat = await prisma.chat.create({
      data: {
        chatId: resource.chatId,
        userId: user.id,
        title: resource.title,
        chats: {
          create: [
            {
              id: msgId,
              role: message.role,
              content: message.content,
            },
          ],
        },
      },
    });

  } catch (error) {
    console.log(error);
  }
}

export async function updateResource(
  resource: { chatId: string },
  message: MessageType
) {
  try {
    const user = await getUser();
    if (!user) throw Error("Unauthorized Access");

    const msgId = generateUUID();
    const chat = await prisma.chat.update({
      where: {
        chatId: resource.chatId,
      },
      data: {
        chats: {
          create: [
            {
              id: msgId,
              role: message.role,
              content: message.content,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateResourceWithEmbeddings(
  resource: { chatId: string },
  message: MessageType
) {
  try {
    const user = await getUser();
    if (!user) throw Error("Unauthorized Access");

    const msgId = generateUUID();
    const embeddings = await generateEmbeddings(message.content);
    if(!embeddings || !msgId || !resource.chatId || !message) return
    const chat = await prisma.$transaction(async (tx) => {
      const chat = await tx.chat.update({
        where: {
          chatId: resource.chatId,
        },
        data: {
          chats: {
            create: [
              {
                id: msgId,
                role: message.role,
                content: message.content,
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

      return chat
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createResourceWithEmbedding(
  resource: ResourceType,
  message: MessageType
) {
  try {
    const user = await getUser();
    if (!user) throw Error("Unauthorized Access");

    // TODO: user zod for validation
    if (!resource) return;

    const embeddings = await generateEmbeddings(message.content);
    const msgId = generateUUID();
    const chat = await prisma.$transaction(async (tx) => {
      const chat = await tx.chat.create({
        data: {
          chatId: resource.chatId,
          userId: user.id,
          title: resource.title,
          chats: {
            create: [
              {
                id: msgId,
                role: message.role,
                content: message.content,
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
    });

  } catch (error) {
    throw error
  }
}
