"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDtoSchema = void 0;
const zod_1 = require("zod");
exports.EventDtoSchema = zod_1.z.object({
    eventType: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
    timestamp: zod_1.z.number().positive(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
//# sourceMappingURL=event.dto.js.map