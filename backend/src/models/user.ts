import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID, // ✅ Fix: Use `randomUUID` (no parentheses)
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: {
    type: [chatSchema], 
    default: [], // ✅ Fix: Ensures `chats` is always an array
  },
});

export default mongoose.model("User", userSchema);
