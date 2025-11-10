import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';


const redisConnection = new Redis(redisUrl, {
  tls: redisUrl.startsWith('rediss://') ? {} : undefined,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectTimeout: 20000,
});

export const eventsQueue = new Queue('events_queue', {
  connection: redisConnection,
});

console.log(`✅ Redis connection established via ${redisUrl}`);