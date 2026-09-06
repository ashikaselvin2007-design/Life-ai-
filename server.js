const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Life AI"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    // Real AI API will be connected securely later
    res.json({
      reply: `You said: ${message}`
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong."
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Life AI is running on port ${PORT}`);
});
