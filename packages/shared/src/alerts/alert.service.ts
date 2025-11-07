import { AlertChannel } from './alert.interface';
import { SlackAlert } from './slack.alert';
import { EmailAlert } from './email.alert';

const alertChannels: AlertChannel[] = [];

if (process.env.SLACK_WEBHOOK_URL) {
  alertChannels.push(new SlackAlert(process.env.SLACK_WEBHOOK_URL));
}

if (
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.ALERT_EMAIL_TO &&
  process.env.ALERT_EMAIL_FROM
) {
  alertChannels.push(
    new EmailAlert(
      process.env.ALERT_EMAIL_FROM,
      process.env.ALERT_EMAIL_TO,
      process.env.SMTP_HOST,
      Number(process.env.SMTP_PORT),
      process.env.SMTP_USER,
      process.env.SMTP_PASS
    )
  );
}

export async function sendSystemAlert(error: Error | string) {
  const message =
    typeof error === 'string' ? error : `${error.name}: ${error.message}`;

  for (const channel of alertChannels) {
    await channel.sendAlert(message);
  }
}
