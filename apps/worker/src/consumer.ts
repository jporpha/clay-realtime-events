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
  maxRetriesPerRequest: null,          // Upstash requires this
  enableReadyCheck: false,             // Skip 'PING' check
  reconnectOnError: (err) => {
    // Reconnect if a read-only or ECONNRESET error occurs
    const msg = err.message.toLowerCase();
    if (msg.includes("read") || msg.includes("reset")) {
      console.warn("⚠️ Redis transient error, reconnecting...");
      return true;
    }
    return false;
  },
  tls: redisUrl.startsWith("rediss://") ? {} : undefined, // ✅ Secure TLS
  connectTimeout: 20000,
  keepAlive: 0, // disable TCP keepalive packets
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
    console.log(`🪶 Processing job ${job.id}...`, job.data);

    // Simulate your business logic here
    try {
      // Example: send alert for demo
      await sendSystemAlert(`✅ Job processed: ${job.name}`);
    } catch (err) {
      console.error("❌ Error processing job:", err);
    }
  },
  { connection }
);

eventWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

console.log("👷 Worker running and waiting for jobs...");
