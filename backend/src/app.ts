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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Logger (remove in production if needed)
app.use(morgan("dev"));

// Routes
app.use("/api/v1", appRouter);

// -------------------------
// Serve React frontend in production
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend/build
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

export default app;
