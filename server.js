const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

const scoresFile = path.join(__dirname, "scores.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readScores() {
  if (!fs.existsSync(scoresFile)) {
    fs.writeFileSync(scoresFile, "[]");
  }

  const data = fs.readFileSync(scoresFile, "utf8");
  return JSON.parse(data);
}

function writeScores(scores) {
  fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2));
}

function rankScores(scores) {
  return scores.sort((a, b) => {
    if (a.healthLost !== b.healthLost) {
      return a.healthLost - b.healthLost;
    }
    if (a.coins !== b.coins) {
      return b.coins - a.coins;
    }
    if (a.retries !== b.retries) {
      return a.retries - b.retries;
    }
    return a.name.localeCompare(b.name);
  });
}

app.get("/api/scores", (req, res) => {
  const scores = rankScores(readScores());
  res.json(scores);
});

app.post("/api/scores", (req, res) => {
  const { name, coins, healthLost, retries } = req.body;

  if (
    typeof name !== "string" ||
    typeof coins !== "number" ||
    typeof healthLost !== "number" ||
    typeof retries !== "number"
  ) {
    return res.status(400).json({ error: "Invalid score data" });
  }

  const scores = readScores();

  scores.push({
    name: name.trim(),
    coins,
    healthLost,
    retries,
    submittedAt: new Date().toISOString()
  });

  const ranked = rankScores(scores).slice(0, 10);
  writeScores(ranked);

  res.json({ message: "Score saved", scores: ranked });
});

app.delete("/api/scores", (req, res) => {
  writeScores([]);
  res.json({ message: "Leaderboard cleared" });
});

app.listen(PORT, () => {
  console.log(`Leaderboard server running at http://localhost:${PORT}`);
});