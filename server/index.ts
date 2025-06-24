// index.ts

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import evaluateRoute from "./routes/evaluate";
import questionsRoute from "./routes/questions";
import transcribeRouter from "./routes/transcribe"; // Must be a default export

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));  // Use express built-in JSON parser

// Optional: Health check or root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send("PrepBot backend is running 🚀");
});

// Routes
app.use("/api/evaluate", evaluateRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/transcribe", transcribeRouter);

// Basic error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ PrepBot server is running on port ${PORT}`);
});
