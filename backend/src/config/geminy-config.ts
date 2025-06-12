import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const configureGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("❌ Missing Gemini API Key. Set GEMINI_API_KEY in .env");
  }
  return new GoogleGenerativeAI(apiKey);
};
