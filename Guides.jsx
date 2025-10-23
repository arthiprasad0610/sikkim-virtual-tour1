import { useEffect, useState } from 'react';
import { fetchGuides } from '../services/api.js';
export default function Guides() {
  const [items, setItems] = useState([]);
  useEffect(() => { fetchGuides().then(setItems).catch(console.error); }, []);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
      {items.map(g => (
        <div key={g._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <div style={{ fontWeight: 600 }}>{g.name}</div>
          <div style={{ fontSize: 12, color: '#666' }}>Languages: {g.languages?.join(', ') || '—'}</div>
          <div style={{ fontSize: 12, color: '#666' }}>Regions: {g.regions?.join(', ') || '—'}</div>
          <div style={{ marginTop: 8 }}>Rating: {g.rating?.toFixed(1) ?? 'N/A'}</div>
          {g.bio && <p style={{ marginTop: 8 }}>{g.bio}</p>}
        </div>
      ))}
    </div>
  );
}
