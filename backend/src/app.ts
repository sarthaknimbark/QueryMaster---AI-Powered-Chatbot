import { config } from 'dotenv';
config();

import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));

// API routes
app.use("/api/v1", appRouter);

// ==============================
// Serve React frontend in production
// ==============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve from dist, not build
const clientBuildPath = path.resolve(__dirname, "../../frontend/dist");

app.use(express.static(clientBuildPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

export default app;
