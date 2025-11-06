import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
});

export async function fetchEvents(params?: {
  type?: string;
  from?: number;
  to?: number;
  limit?: number;
}) {
  const res = await api.get('/events', { params });
  return res.data;
}

export async function fetchMetrics() {
  const res = await api.get('/metrics');
  return res.data;
}
