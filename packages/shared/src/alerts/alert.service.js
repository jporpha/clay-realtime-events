"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSystemAlert = sendSystemAlert;
const slack_alert_1 = require("./slack.alert");
const email_alert_1 = require("./email.alert");
const alertChannels = [];
if (process.env.SLACK_WEBHOOK_URL) {
    alertChannels.push(new slack_alert_1.SlackAlert(process.env.SLACK_WEBHOOK_URL));
}
if (process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.ALERT_EMAIL_TO &&
    process.env.ALERT_EMAIL_FROM) {
    alertChannels.push(new email_alert_1.EmailAlert(process.env.ALERT_EMAIL_FROM, process.env.ALERT_EMAIL_TO, process.env.SMTP_HOST, Number(process.env.SMTP_PORT), process.env.SMTP_USER, process.env.SMTP_PASS));
}
async function sendSystemAlert(error) {
    const message = typeof error === 'string' ? error : `${error.name}: ${error.message}`;
    for (const channel of alertChannels) {
        await channel.sendAlert(message);
    }
}
//# sourceMappingURL=alert.service.js.map