"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlert = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailAlert {
    constructor(from, to, smtpHost, smtpPort, smtpUser, smtpPass) {
        this.from = from;
        this.to = to;
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
        this.smtpUser = smtpUser;
        this.smtpPass = smtpPass;
        this.transporter = nodemailer_1.default.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });
    }
    async sendAlert(message) {
        try {
            await this.transporter.sendMail({
                from: this.from,
                to: this.to,
                subject: '🚨 Worker Error Alert',
                text: message,
            });
            console.log('✅ Email alert sent');
        }
        catch (err) {
            console.error('❌ Failed to send Email alert:', err);
        }
    }
}
exports.EmailAlert = EmailAlert;
//# sourceMappingURL=email.alert.js.map