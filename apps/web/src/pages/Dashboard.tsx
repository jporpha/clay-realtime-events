import { useEffect, useState } from 'react';
import EventsTable from '../components/EventsTable';
import MetricsPanel from '../components/MetricsPanel';
import LivePanel from '../components/LivePanel';
import { fetchEvents } from '../services/api';
import type { EventDto } from '../types';

export default function Dashboard() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents({ limit: 100 })
      .then(setEvents)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
      <h1 style={{ marginTop: 0 }}>Clay Realtime Events — Dashboard</h1>
      <p style={{ marginTop: 4, color: '#666' }}>
        API + Redis + Worker + Mongo + React (SSE)
      </p>

      <div style={grid}>
        <div style={col}>
          <MetricsPanel />
        </div>
        <div style={col}>
          <LivePanel />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        {loading ? (
          <div>Loading events...</div>
        ) : (
          <EventsTable events={events} title="Last 100 (stored)" />
        )}
      </div>
    </div>
  );
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
};
const col: React.CSSProperties = { minWidth: 0 };