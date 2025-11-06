import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/event.controller';

export const router = Router();

router.post('/', createEvent);
router.get('/', getEvents);
