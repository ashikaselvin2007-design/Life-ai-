const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Life AI Backend is working!"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI error: " + error.message
    });
  }
});

app.post("/api/study", async (req, res) => {
  try {
    const { question, format } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `You are a helpful study assistant. Answer this question in ${format} format:\n\n${question}`
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI error: " + error.message
    });
  }
});

// Important for Vercel
module.exports = app;
