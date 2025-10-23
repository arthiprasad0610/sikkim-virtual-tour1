import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchArtifacts } from '../services/api.js';
import ArtifactCard from '../components/ArtifactCard.jsx';

export default function Gallery() {
  const [params] = useSearchParams();
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const q = params.get('q') || '';

  useEffect(() => {
    fetchArtifacts({ q }).then(setData).catch(console.error);
  }, [q]);

  return (
    <div>
      <div style={{ marginBottom: 8, color: '#555' }}>{data.total} results</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {data.items.map(a => <ArtifactCard key={a._id} artifact={a} />)}
      </div>
    </div>
  );
}
