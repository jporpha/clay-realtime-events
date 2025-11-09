import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger-docs";
import { router as eventsRouter } from "./routes/events";
import { metricsRouter } from "./routes/metrics";
import { streamRouter } from "./routes/stream";
import { sendSystemAlert } from '../../../packages/shared/src/alerts/alert.service';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ====== MongoDB Connection ======
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/clay-events")
  .then(() => console.log("✅ Connected to MongoDB from API"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====== Routes ======
app.use("/events", eventsRouter);
app.use("/metrics", metricsRouter);
app.use("/stream", streamRouter);

// ====== Swagger Docs ======
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (req, res) => res.json(swaggerSpec));

// ====== Serve React Frontend (static build) ======
const webPath = path.join(__dirname, "../../web/dist");
app.use(express.static(webPath));

// Catch-all route for React Router
app.all('/*', (req, res) => {
  res.sendFile(path.join(webPath, "index.html"));
});

// ====== Global Error Handling ======
app.use((err: Error, req: any, res: any, next: any) => {
  console.error("❌ Global error:", err);
  sendSystemAlert(`API Error: ${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});

// ====== Start Server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API & Frontend live on port ${PORT}`);
});
