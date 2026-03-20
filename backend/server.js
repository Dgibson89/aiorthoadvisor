import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "./.env", debug: true });

console.log("cwd:", process.cwd());
console.log("env path loaded: backend/.env");
console.log("Loaded key exists:", !!process.env.OPENAI_API_KEY);
console.log("Loaded key prefix:", process.env.OPENAI_API_KEY?.slice(0, 12));
console.log("Loaded key length:", process.env.OPENAI_API_KEY?.length);

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { conversation, newMessage } = req.body;

    const userMessage = {
      role: "user",
      content: newMessage,
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional orthopedic healthcare assistant. Be concise, helpful, and recommend consulting a medical professional.",
        },
        ...conversation,
        userMessage,
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  }catch (error) {
  console.error("===== SERVER ERROR =====");
  console.error("Message:", error.message);
  console.error("Status:", error.status);
  console.error("Code:", error.code);
  console.error("Type:", error.type);
  console.error("Full error:", error);

  res.status(500).json({
    error: error.message || "Something went wrong",
  });
}
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});