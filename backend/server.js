import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { chatWithCharacter } from "./api/chatWithCharacter.js"; // <- 新路径

// Fix dotenv issue in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

console.log("ENV DEBUG =>", process.env.GROQ_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Anime Chat API is running ✅");
});

// API: chat with character
app.post("/api/chat", async (req, res) => {
  try {
    const { text, character } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Text input is required."
      });
    }

    if (!character || character.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Character input is required."
      });
    }

    const responseText = await chatWithCharacter(text, character);

    res.json({
      success: true,
      response: responseText
    });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
