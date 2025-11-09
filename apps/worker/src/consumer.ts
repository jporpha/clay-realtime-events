import { Worker } from "bullmq";
import IORedis from "ioredis";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { sendSystemAlert } from "../../../packages/shared/src/alerts/alert.service";

dotenv.config();

// ===============================
// 🔧 Redis connection (Upstash-safe)
// ===============================
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  reconnectOnError: (err) => {
    const msg = err.message.toLowerCase();
    if (msg.includes("read") || msg.includes("reset")) {
      console.warn("⚠️ Redis transient error, reconnecting...");
      return true;
    }
    return false;
  },
  tls: redisUrl.startsWith("rediss://") ? {} : undefined,
  connectTimeout: 20000,
});

connection.on("connect", () => console.log("✅ Connected to Redis (Upstash)"));
connection.on("error", (err) => console.error("❌ Redis connection error:", err));

// ===============================
// 🔧 Mongo connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/clay-events")
  .then(() => console.log("✅ Connected to MongoDB from worker"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ===============================
// 👷 Worker setup
// ===============================
export const eventWorker = new Worker(
  "events_queue",
  async (job) => {
    console.log(`🪶 Processing job ${job.id} (${job.name})`, job.data);

    try {
      await sendSystemAlert(`✅ Job processed: ${job.name}`);
      console.log(`✅ Job ${job.id} completed successfully`);
    } catch (err) {
      console.error("❌ Error during job processing:", err);
    }
  },
  { connection }
);

eventWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

console.log("👷 Worker ready and listening for jobs...");
