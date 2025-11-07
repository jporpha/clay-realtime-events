import { EventDtoSchema } from './event.dto';

describe('EventDtoSchema', () => {
  it('accepts valid event', () => {
    const valid = {
      eventType: 'login',
      userId: '123',
      timestamp: 1730912345000,
      metadata: { device: 'mobile' },
    };
    const parsed = EventDtoSchema.parse(valid);
    expect(parsed.eventType).toBe('login');
  });

  it('rejects invalid event', () => {
    const invalid = { eventType: '', userId: '', timestamp: -1 };
    expect(() => EventDtoSchema.parse(invalid)).toThrow();
  });
});
