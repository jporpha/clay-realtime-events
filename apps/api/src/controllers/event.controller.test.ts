import request from 'supertest';
import express from 'express';
import { createEvent } from './event.controller';
import { eventsQueue } from "../queue/eventQueue"; 

jest.mock('../queue', () => ({
  eventsQueue: { add: jest.fn().mockResolvedValue({}) },
}));

const app = express();
app.use(express.json());
app.post('/events', createEvent);

describe('POST /events', () => {
  it('should accept a valid event and return 202', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        eventType: 'test',
        userId: '42',
        timestamp: 1730912345, 
      });
    expect(res.status).toBe(202);
    expect(eventsQueue.add).toHaveBeenCalled();
  });

  it('should reject invalid event', async () => {
    const res = await request(app).post('/events').send({});
    expect(res.status).toBe(400);
  });
});
