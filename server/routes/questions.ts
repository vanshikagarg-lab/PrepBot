import express from "express";
import { generateInterviewQuestions } from "../services/geminiService";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const questions = await generateInterviewQuestions();
    res.json({ questions });
  } catch (err) {
    console.error("Questions Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
