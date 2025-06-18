import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import { configureGemini } from "../config/geminy-config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    user.chats.push({ content: message, role: "user" });

    const genAI = configureGemini();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const chatHistory = user.chats.map(({ role, content }) => ({
      role: role === "user" ? "user" : "model",
      parts: [{ text: content }],
    }));

    const chatResponse = await model.generateContent({
      contents: chatHistory,
    });

    const assistantReply = chatResponse.response.text();
    if (!assistantReply) {
      return res.status(500).json({ message: "Failed to get response from Gemini" });
    }

    user.chats.push({ content: assistantReply, role: "assistant" });
    await user.save();

    return res.status(200).json({ chats: user.chats });

  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error in generateChatCompletion:", err.message);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error in sendChatsToUser:", err.message);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Uncomment if you want to actually clear chats
    // user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error in deleteChats:", err.message);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};
