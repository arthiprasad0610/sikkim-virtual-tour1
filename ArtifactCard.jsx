import { Link } from 'react-router-dom';
export default function ArtifactCard({ artifact }) {
  return (
    <Link to={`/artifact/${artifact._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
        <img src={artifact.imageUrl} alt={artifact.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
        <div style={{ padding: 8 }}>
          <div style={{ fontWeight: 600 }}>{artifact.title}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{artifact.monastery} • {artifact.category}</div>
        </div>
      </div>
    </Link>
  );
}
