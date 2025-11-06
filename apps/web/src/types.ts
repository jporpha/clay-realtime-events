export type EventDto = {
  eventType: string;
  userId: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
  ingestedAt?: string | Date;
};

export type MetricsResponse = {
  totalEventsLastMinute: number;
  byType: Array<{ _id: string; count: number }>;
};

export type StreamPayload = {
  timestamp: string;
  total: number;
  recent: EventDto[];
};
