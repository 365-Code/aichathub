import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) throw Error("PINCONE_API_KEY is undefined");

const pinecone = new Pinecone({
  apiKey,
});

export const chatIndex = pinecone.Index("rag-supabase");
