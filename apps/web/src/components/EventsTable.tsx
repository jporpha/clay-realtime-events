import { format } from 'date-fns';
import type { EventDto } from '../types';

type Props = {
  events: EventDto[];
  title?: string;
};

export default function EventsTable({ events, title = 'Recent events' }: Props) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={th}>Timestamp</th>
              <th style={th}>Type</th>
              <th style={th}>User</th>
              <th style={th}>Metadata</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid #f0f0f0' }}>
                <td style={td}>
                  {format(new Date(e.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </td>
                <td style={td}>{e.eventType}</td>
                <td style={td}>{e.userId}</td>
                <td style={td}>
                  <pre style={{ margin: 0, fontSize: 12 }}>
                    {JSON.stringify(e.metadata ?? {}, null, 2)}
                  </pre>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td style={td} colSpan={4}>
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { textAlign: 'left', padding: '8px 12px' };
const td: React.CSSProperties = { padding: '8px 12px', verticalAlign: 'top' };