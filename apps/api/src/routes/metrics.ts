import { Router } from 'express';
import { getMetrics } from '../controllers/metrics.controller';

export const metricsRouter = Router();

metricsRouter.get('/', getMetrics);
