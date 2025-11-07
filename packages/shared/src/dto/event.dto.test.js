"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_dto_1 = require("./event.dto");
describe('EventDtoSchema', () => {
    it('accepts valid event', () => {
        const valid = {
            eventType: 'login',
            userId: '123',
            timestamp: 1730912345000,
            metadata: { device: 'mobile' },
        };
        const parsed = event_dto_1.EventDtoSchema.parse(valid);
        expect(parsed.eventType).toBe('login');
    });
    it('rejects invalid event', () => {
        const invalid = { eventType: '', userId: '', timestamp: -1 };
        expect(() => event_dto_1.EventDtoSchema.parse(invalid)).toThrow();
    });
});
//# sourceMappingURL=event.dto.test.js.map