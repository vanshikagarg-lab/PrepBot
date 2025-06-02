import express, {  Request, Response, Router }from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { transcribeAudio } from "../services/whisperService";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { audioBase64 } = req.body;

    if (!audioBase64 || typeof audioBase64 !== "string") {
        res.status(400).json({ error: "No audio data received" });
        return;
    }

    const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const fileName = `${uuidv4()}.webm`;
    const filePath = path.join("uploads", fileName);
    fs.writeFileSync(filePath, buffer);

    const transcript = await transcribeAudio(filePath);

    fs.unlinkSync(filePath);
    res.json({ transcript });
  } catch (error) {
    console.error("Transcription failed:", error);
    res.status(500).json({ error: "Transcription failed" });
  }
});

export default router;
