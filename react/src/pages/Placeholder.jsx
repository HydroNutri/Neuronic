import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const { pathname } = useLocation();

  return (
    <div style={{ paddingTop: '120px', minHeight: '60vh', textAlign: 'center' }}>
      <h2>{pathname}</h2>
      <p style={{ marginTop: '1rem', color: '#666' }}>This page will be migrated soon.</p>
    </div>
  );
}
