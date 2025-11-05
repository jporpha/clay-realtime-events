import { Worker } from 'bullmq';
import { RedisOptions } from 'ioredis';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { EventDtoSchema } from '../../../packages/shared/src/dto/event.dto';

dotenv.config();

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
};

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clay-events')
  .then(() => console.log('✅ Connected to MongoDB from worker'))
  .catch(console.error);

const eventSchema = new mongoose.Schema({
  eventType: String,
  userId: String,
  timestamp: Number,
  metadata: Object,
  ingestedAt: { type: Date, default: Date.now },
});

const EventModel = mongoose.model('Event', eventSchema);

export const eventWorker = new Worker(
  'events_queue',
  async (job) => {
    const parse = EventDtoSchema.safeParse(job.data);
    if (!parse.success) {
      console.error('❌ Invalid job data:', job.data);
      return;
    }

    const event = parse.data;
    await EventModel.create(event);
    console.log(`✅ Processed event: ${event.eventType}`);
  },
  { connection: redisOptions }
);
