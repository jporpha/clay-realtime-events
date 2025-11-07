"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alert_service_1 = require("./alert.service");
describe('sendSystemAlert', () => {
    it('should run without throwing when no transports are configured', async () => {
        // Simulamos variables de entorno vacías
        delete process.env.SLACK_WEBHOOK_URL;
        delete process.env.SMTP_HOST;
        // Verificamos que no lance errores
        await expect((0, alert_service_1.sendSystemAlert)('Test alert without transports')).resolves.not.toThrow();
    });
    it('should handle Error objects gracefully', async () => {
        const error = new Error('Simulated failure');
        await expect((0, alert_service_1.sendSystemAlert)(error)).resolves.not.toThrow();
    });
});
//# sourceMappingURL=alert.service.test.js.map