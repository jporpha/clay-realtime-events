import { useEffect, useState } from 'react';
import { fetchMetrics } from '../services/api';
import type { MetricsResponse } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function MetricsPanel() {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetchMetrics();
      setData(res);
    } catch (e) {
      console.error('Metrics error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 5_000); // refresco cada 5s
    return () => clearInterval(id);
  }, []);

  if (loading && !data) return <div>Loading metrics...</div>;

  const chartData =
    data?.byType?.map((x) => ({ type: x._id || 'unknown', count: x.count })) ??
    [];

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Metrics (last 60s)</h3>
      <p style={{ marginTop: 0 }}>
        Total: <strong>{data?.totalEventsLastMinute ?? 0}</strong>
      </p>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}