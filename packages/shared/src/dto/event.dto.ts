import { z } from 'zod';

export const EventDtoSchema = z.object({
  eventType: z.string().min(1),
  userId: z.string().min(1),
  timestamp: z.number().positive(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type EventDto = z.infer<typeof EventDtoSchema>;
