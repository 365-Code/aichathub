import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see our Getting Started tutorial)
const apikey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apikey) throw Error("Google Api key not set");

export const genAI = new GoogleGenerativeAI(apikey);
