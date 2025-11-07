import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router as eventsRouter } from './routes/events';
import { metricsRouter } from './routes/metrics';
import { streamRouter } from './routes/stream';
import { sendSystemAlert } from '../../../packages/shared/src/alerts/alert.service';
import { Request, Response, NextFunction } from 'express';
import { setupSwagger } from './swagger'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Clay Realtime Events API is running!');
});


mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clay-events')
  .then(() => console.log('✅ Connected to MongoDB from API'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

setupSwagger(app);
app.use('/events', eventsRouter);
app.use('/metrics', metricsRouter);
app.use('/stream', streamRouter);

app.use(
  async (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ API error:', err);
    await sendSystemAlert(err);
    res.status(500).json({ error: 'Internal server error' });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API listening on port ${PORT}`);
});
