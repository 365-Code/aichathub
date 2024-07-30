import { embedMany } from "ai";
import { genAI } from "./gemini";

export const generateChunks = (text: string) => {
  return text
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});
export async function generateEmbeddings(value: string) {
  // For embeddings, use the Text Embeddings model

  // TODO - break sentences into chunks, store them on database, use a chunk to embedding table reference
  // const chunks = generateChunks(value);
  // const {embeddings} = await embedMany({
  //   model: embeddingModel,
  //   values: chunks
  // })
  const result = await embeddingModel.embedContent(value);
  const embedding = result.embedding;

  if (!embedding.values) throw Error("Error generating Embeddings");
  // console.log(embedding.values);
  return embedding.values;
}
