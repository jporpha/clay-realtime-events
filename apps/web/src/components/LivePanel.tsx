import { useEventsStream } from '../hooks/useEventsStream';
import EventsTable from './EventsTable';

export default function LivePanel() {
  const { connected, payload } = useEventsStream();

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Live stream (SSE)</h3>
        <span
          title={connected ? 'Connected' : 'Disconnected'}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            display: 'inline-block',
            background: connected ? '#22c55e' : '#ef4444',
          }}
        />
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
        {payload?.timestamp
          ? `Last update: ${new Date(payload.timestamp).toLocaleString()}`
          : 'Waiting for updates...'}
      </div>

      <div style={{ marginTop: 16 }}>
        <EventsTable events={payload?.recent ?? []} title="Recent (live)" />
      </div>
    </div>
  );
}
