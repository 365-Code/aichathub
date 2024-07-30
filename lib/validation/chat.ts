import { z } from "zod";

export const ChatSchema = z.object({
  chatId: z.string(),
  userId: z.string(),
  title: z.string().min(1, { message: "Title is Required" }),
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
});

export type CreateChatSchema = z.infer<typeof ChatSchema>;
