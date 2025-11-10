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
import { sendSystemAlert } from "../../../packages/shared/src/alerts/alert.service";

dotenv.config();

(async () => {
  try {
    const app = express();
    app.use(cors());
    app.use(express.json());

    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/clay-events"
    );
    console.log("✅ Connected to MongoDB from API");

    app.use("/events", eventsRouter);
    app.use("/metrics", metricsRouter);
    app.use("/stream", streamRouter);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/openapi.json", (_, res) => res.json(swaggerSpec));

    const webPath = path.join(__dirname, "../../web/dist");
    app.use(express.static(webPath));

    app.use((req, res, next) => {
      if (req.accepts("html")) {
        res.sendFile(path.join(webPath, "index.html"), (err) => {
          if (err) next();
        });
      } else {
        next();
      }
    });

    app.use((err: Error, req: any, res: any, next: any) => {
      console.error("❌ Global error:", err);
      sendSystemAlert(`API Error: ${err.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    });

    app.get("/", (_, res) => {
      res.status(200).send("✅ Clay Realtime Events API running");
    });

    const PORT = Number(process.env.PORT) || 3000;
    const HOST = "0.0.0.0";

    app.listen(PORT, HOST, () => {
      console.log(`✅ Clay API running in Background Worker mode on ${HOST}:${PORT}`);
      console.log("🧠 Ready to receive and queue events...");
    });
  } catch (err) {
    console.error("❌ API startup error:", err);
    sendSystemAlert(`API startup error: ${(err as Error).message}`);
  }
})();
