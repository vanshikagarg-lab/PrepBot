// routes/evaluate.ts

import express, { Request, Response } from "express";
import { evaluateAnswer } from "../services/geminiService";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;
    const result = await evaluateAnswer(question, answer);

    res.json({ transcript: answer, ...result });
  } catch (err) {
    console.error("❌ Evaluation error:", err);
    res.status(500).json({ error: "Failed to evaluate answer" });
  }
});

export default router;
