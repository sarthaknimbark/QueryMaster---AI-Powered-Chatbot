import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is not defined in environment variables.");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
  }
};

export const disconnectToDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ MongoDB Disconnection Error:", err.message);
    throw err;
  }
};
