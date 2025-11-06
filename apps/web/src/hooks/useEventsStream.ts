import { useEffect, useRef, useState } from 'react';
import type { StreamPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useEventsStream() {
  const [connected, setConnected] = useState(false);
  const [payload, setPayload] = useState<StreamPayload | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource(`${API_URL}/stream`);
    esRef.current = es;

    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // data puede ser { connected: true } al inicio o el payload periódico
        if (data && (data.total !== undefined || data.connected)) {
          setPayload(data);
        }
      } catch {
        // ignore parse errors
      }
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, []);

  return { connected, payload };
}
