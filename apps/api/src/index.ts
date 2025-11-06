import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router as eventsRouter } from './routes/events';
import { metricsRouter } from './routes/metrics';
import { streamRouter } from './routes/stream';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clay-events')
  .then(() => console.log('✅ Connected to MongoDB from API'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/events', eventsRouter);
app.use('/metrics', metricsRouter);
app.use('/stream', streamRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API listening on port ${PORT}`);
});
