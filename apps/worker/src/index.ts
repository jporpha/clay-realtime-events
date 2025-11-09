import dotenv from "dotenv";
import "./consumer";
import express from "express";

dotenv.config();

console.log("👷 Worker running and waiting for jobs...");

// === Mini Express server to satisfy Render health check ===
const app = express();

app.get("/", (req, res) => {
  res.send("👷 Worker is alive and processing jobs!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Health endpoint running on port ${PORT}`);
});
