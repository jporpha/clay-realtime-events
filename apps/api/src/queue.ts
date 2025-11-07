import { Queue } from 'bullmq';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();


const redisConnection = new Redis(process.env.REDIS_URL || '', {
  tls: {}, // 🔒 Upstash requiere conexión segura (SSL/TLS)
});

export const eventsQueue = new Queue('events_queue', {
  connection: redisConnection,
});

console.log('✅ Redis connection established via Upstash');
