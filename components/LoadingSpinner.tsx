export default function LoadingSpinner({ text = 'Memuat...' }: { text?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem',
      gap: '1rem',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--border)',
        borderTop: '3px solid var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}