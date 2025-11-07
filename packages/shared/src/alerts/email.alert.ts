import nodemailer from 'nodemailer';
import { AlertChannel } from './alert.interface';

export class EmailAlert implements AlertChannel {
  private transporter;

  constructor(
    private from: string,
    private to: string,
    private smtpHost: string,
    private smtpPort: number,
    private smtpUser: string,
    private smtpPass: string
  ) {
    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendAlert(message: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to: this.to,
        subject: '🚨 Worker Error Alert',
        text: message,
      });
      console.log('✅ Email alert sent');
    } catch (err) {
      console.error('❌ Failed to send Email alert:', err);
    }
  }
}
