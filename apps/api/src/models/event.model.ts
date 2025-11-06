import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Number, required: true },
  metadata: { type: Object },
  ingestedAt: { type: Date, default: Date.now },
});

export const EventModel =
  mongoose.models.Event || mongoose.model('Event', eventSchema);
