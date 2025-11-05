import { Queue } from 'bullmq';
import { RedisOptions } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

export const eventsQueue = new Queue('events_queue', {
  connection: redisOptions,
});
