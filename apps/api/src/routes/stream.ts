import { Router } from 'express';
import { streamEvents } from '../controllers/stream.controller';

export const streamRouter = Router();

streamRouter.get('/', streamEvents);
