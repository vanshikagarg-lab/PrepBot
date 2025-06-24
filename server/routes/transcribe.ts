// routes/transcribe.ts

import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const audioBase64 = req.body.audioBase64;
    const tempDir = path.join(__dirname, "..", "..", "temp");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const inputWebmPath = path.join(tempDir, "input.webm");
    const inputWavPath = path.join(tempDir, "input.wav");
    const outputBasePath = path.join(tempDir, "output");

    // Save base64 audio to .webm file
    const base64Data = audioBase64.split(";base64,").pop();
    fs.writeFileSync(inputWebmPath, Buffer.from(base64Data!, "base64"));

    // Convert .webm to .wav using ffmpeg
    const ffmpegCommand = `ffmpeg -y -i "${inputWebmPath}" -ar 16000 -ac 1 -f wav "${inputWavPath}"`;
    exec(ffmpegCommand, (ffmpegErr) => {
      if (ffmpegErr) {
        console.error("FFmpeg error:", ffmpegErr);
        return res.status(500).json({ error: "Audio conversion failed" });
      }

      // Use absolute paths inside Docker container
      const whisperPath = "/whisper.cpp/build/whisper-cli";
      const modelPath = "/whisper.cpp/models/ggml-base.en.bin";
      const whisperCommand = `${whisperPath} -m "${modelPath}" -f "${inputWavPath}" -otxt -of "${outputBasePath}"`;

      exec(whisperCommand, (whisperErr, stdout, stderr) => {
        console.log("Whisper stdout:", stdout);
        console.log("Whisper stderr:", stderr);

        if (whisperErr) {
          console.error("Whisper error:", whisperErr);
          return res.status(500).json({ error: "Transcription failed" });
        }

        const transcriptPath = `${outputBasePath}.txt`;
        if (!fs.existsSync(transcriptPath)) {
          return res.status(500).json({ error: "Transcript not found" });
        }

        const transcript = fs.readFileSync(transcriptPath, "utf-8");
        res.json({ transcript });
      });
    });
  } catch (err) {
    console.error("Transcription route error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
