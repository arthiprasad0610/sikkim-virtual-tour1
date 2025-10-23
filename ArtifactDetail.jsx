import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtifact } from '../services/api.js';
export default function ArtifactDetail() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  useEffect(() => {
    fetchArtifact(id).then(setArtifact).catch(console.error);
  }, [id]);
  if (!artifact) return <div>Loading...</div>;
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <img src={artifact.imageUrl} alt={artifact.title} style={{ width: '100%', borderRadius: 8 }} />
      <div>
        <h2 style={{ marginTop: 0 }}>{artifact.title}</h2>
        <div style={{ color: '#666' }}>{artifact.monastery} • {artifact.category}</div>
        <p>{artifact.description}</p>
        {artifact.historicalContext && (
          <section>
            <h3>Historical Context</h3>
            <p>{artifact.historicalContext}</p>
          </section>
        )}
        {artifact.tags?.length ? (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {artifact.tags.map(t => (
              <span key={t} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', padding: '2px 8px', borderRadius: 999 }}>{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
