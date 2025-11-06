import { Request, Response } from 'express';
import { EventModel } from '../models/event.model';

/**
 * GET /metrics
 * Devuelve estadísticas de eventos recientes.
 */
export const getMetrics = async (req: Request, res: Response) => {
  try {
    const since = Date.now() - 60 * 1000; // últimos 60 segundos

    const grouped = await EventModel.aggregate([
      { $match: { timestamp: { $gte: since } } },
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const total = grouped.reduce((sum, g) => sum + g.count, 0);

    res.json({
      totalEventsLastMinute: total,
      byType: grouped,
    });
  } catch (error) {
    console.error('❌ Error en getMetrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};
