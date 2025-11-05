import { Router } from 'express';
import { eventsQueue } from '../queue';
import { EventDtoSchema } from '../../../../packages/shared/src/dto/event.dto';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const parseResult = EventDtoSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid event format' });
    }

    const event = parseResult.data;

    await eventsQueue.add('new_event', event);
    return res.status(202).json({ accepted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});
