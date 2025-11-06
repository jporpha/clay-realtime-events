import { Request, Response } from 'express';
import { eventsQueue } from '../queue';
import { EventDtoSchema } from '../../../../packages/shared/src/dto/event.dto';
import { EventModel } from '../models/event.model';

/**
 * POST /events
 * Recibe un evento y lo envía a la cola para procesamiento.
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const validation = EventDtoSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'Invalid event format',
        details: validation.error.issues,
      });
    }

    const event = validation.data;
    if (event.timestamp < 10_000_000_000){
      event.timestamp *= 1000;
    }

    await eventsQueue.add('new_event', event);
    res.status(202).json({ accepted: true });
  } catch (error) {
    console.error('❌ Error en createEvent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /events
 * Retorna eventos filtrados por tipo, fecha o límite.
 */
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { type, from, to, limit = 50 } = req.query;

    const query: Record<string, any> = {};
    if (type) query.eventType = type;
    if (from || to) query.timestamp = {};
    if (from) query.timestamp.$gte = Number(from);
    if (to) query.timestamp.$lte = Number(to);

    const events = await EventModel.find(query)
      .sort({ timestamp: -1 })
      .limit(Number(limit));

    res.json(events);
  } catch (error) {
    console.error('❌ Error en getEvents:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
