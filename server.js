const express = require("express");

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

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Life AI Backend is working!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.post("/api/chat", (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  res.json({
    reply: "You said: " + message
  });
});

app.post("/api/study", (req, res) => {
  const question = req.body.question;
  const format = req.body.format || "Simple";

  if (!question) {
    return res.status(400).json({
      error: "Question is required"
    });
  }

  res.json({
    reply: format + " answer:\n\n" + question
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Life AI running on port " +
