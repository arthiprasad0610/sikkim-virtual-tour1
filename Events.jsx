import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api.js';
export default function Events() {
  const [items, setItems] = useState([]);
  useEffect(() => { fetchEvents({}).then(setItems).catch(console.error); }, []);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map(ev => (
        <div key={ev._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 600 }}>{ev.title}</div>
            <div style={{ color: '#666' }}>{new Date(ev.startDate).toLocaleDateString()}</div>
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>{ev.monastery} • {ev.category}</div>
          {ev.description && <p style={{ marginTop: 8 }}>{ev.description}</p>}
        </div>
      ))}
    </div>
  );
}
