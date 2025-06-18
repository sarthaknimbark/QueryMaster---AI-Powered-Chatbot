import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Logger (disable in prod if needed)
app.use(morgan("dev"));

// API routes
app.use("/api/v1", appRouter);

// ==============================
// Serve React frontend in production
// ==============================

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to React build
const clientBuildPath = path.resolve(__dirname, "../../frontend/build");

// Serve static files from React
app.use(express.static(clientBuildPath));

// All other routes → React index.html
app.get("*", (_, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

export default app;
