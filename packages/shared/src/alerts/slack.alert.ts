import axios from 'axios';
import { AlertChannel } from './alert.interface';

export class SlackAlert implements AlertChannel {
  constructor(private webhookUrl: string) {}

  async sendAlert(message: string): Promise<void> {
    try {
      await axios.post(this.webhookUrl, { text: message });
      console.log('✅ Slack alert sent');
    } catch (err) {
      console.error('❌ Failed to send Slack alert:', err);
    }
  }
}
