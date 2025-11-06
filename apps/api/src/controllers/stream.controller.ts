import { Request, Response } from 'express';
import { EventModel } from '../models/event.model';

/**
 * Controlador SSE para transmitir datos en tiempo real a los clientes.
 */
const clients: Response[] = [];

/**
 * Envía actualizaciones periódicas a todos los clientes conectados.
 */
const broadcastUpdates = async () => {
  try {
    const total = await EventModel.countDocuments();
    const recent = await EventModel.find().sort({ timestamp: -1 }).limit(5);

    const payload = {
      timestamp: new Date(),
      total,
      recent,
    };

    clients.forEach((res) => res.write(`data: ${JSON.stringify(payload)}\n\n`));
  } catch (error) {
    console.error('❌ Error al enviar SSE:', error);
  }
};

// Intervalo de actualización (cada 3 segundos)
setInterval(broadcastUpdates, 3000);

/**
 * GET /stream
 * Conecta un cliente al flujo SSE.
 */
export const streamEvents = (req: Request, res: Response) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  res.write(`data: ${JSON.stringify({ connected: true })}\n\n`);

  clients.push(res);

  req.on('close', () => {
    const idx = clients.indexOf(res);
    if (idx >= 0) clients.splice(idx, 1);
  });
};
