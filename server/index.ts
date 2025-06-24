// index.ts

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Load environment variables
dotenv.config();

import evaluateRoute from "./routes/evaluate";
import questionsRoute from "./routes/questions";
import transcribeRouter from "./routes/transcribe"; // Must be a default export

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Optional: Health check or root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send("PrepBot backend is running 🚀");
});

// Routes
app.use("/api/evaluate", evaluateRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/transcribe", transcribeRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ PrepBot server is running on port ${PORT}`);
});
