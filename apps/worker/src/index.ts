import dotenv from "dotenv";
import "./consumer";
import express from "express";

dotenv.config();

console.log("👷 Worker running and waiting for jobs...");

// Mantiene el proceso vivo para Render sin bloquear BullMQ
if (process.env.RENDER) {
  const app = express();
  const PORT = process.env.PORT || 10000;
  app.get("/", (_, res) => res.send("✅ Worker alive!"));
  app.listen(PORT, () => console.log(`✅ Health endpoint on port ${PORT}`));
}
