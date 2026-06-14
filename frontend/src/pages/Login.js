import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { clientAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await clientAPI.login(form);
      login(data.token, data.client);
      toast.success(`Welcome back, ${data.client.fullName}`);
      navigate(data.client.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.logoWrap}>
            <div style={styles.logoMark}>⚖</div>
            <div>
              <div style={styles.logoName}>LawSuites</div>
              <div style={styles.logoTag}>Legal Excellence</div>
            </div>
          </div>
          <blockquote style={styles.quote}>
            "Justice is Not Just a Principle —<br />It is Our Practice."
          </blockquote>
          <p style={styles.leftSub}>Pakistan's AI-powered legal matchmaking platform connecting citizens with verified attorneys.</p>
          <div style={styles.stats}>
            {[['500+', 'Cases Resolved'], ['5', 'Practice Areas'], ['98%', 'Satisfaction']].map(([v, l]) => (
              <div key={l} style={styles.stat}>
                <div style={styles.statVal}>{v}</div>
                <div style={styles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Client Login</h2>
          <p style={styles.subtitle}>Access your case dashboard and hearing schedule.</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email" required value={form.email} placeholder="your@email.com" onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" required value={form.password} placeholder="••••••••" onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <div style={styles.divider}><span style={styles.dividerText}>New to LawSuites?</span></div>
          <Link to="/match" style={styles.registerLink}>Get AI Match & Register →</Link>
          <p style={styles.backLink}><Link to="/" style={{ color: '#9ca3af', fontSize: '0.82rem', textDecoration: 'none' }}>← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
  left: { flex: 1, background: 'linear-gradient(135deg, #0b0f1a 0%, #1e2d45 100%)', display: 'flex', alignItems: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' },
  leftContent: { maxWidth: '440px', position: 'relative' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3.5rem' },
  logoMark: { width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 },
  logoName: { fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#e8d5a3' },
  logoTag: { fontSize: '0.6rem', color: '#c9a84c', letterSpacing: '0.16em', textTransform: 'uppercase' },
  quote: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, color: '#f5f0e8', lineHeight: 1.4, fontStyle: 'italic', marginBottom: '1.2rem', borderLeft: '3px solid #c9a84c', paddingLeft: '1.2rem' },
  leftSub: { color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2.5rem' },
  stats: { display: 'flex', gap: '2rem' },
  stat: { textAlign: 'center' },
  statVal: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 800, color: '#c9a84c' },
  statLabel: { color: '#4b5563', fontSize: '0.72rem', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' },
  right: { width: '480px', background: '#f9f5ef', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  card: { width: '100%', maxWidth: '380px' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 700, color: '#0b0f1a', marginBottom: '0.4rem' },
  subtitle: { color: '#6b7280', fontSize: '0.88rem', marginBottom: '2rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em' },
  input: { padding: '0.8rem 0.95rem', border: '1px solid #d5cfc7', borderRadius: '2px', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", background: '#fff', color: '#0b0f1a', outline: 'none' },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.9rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.4rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' },
  divider: { textAlign: 'center', margin: '1.5rem 0', position: 'relative' },
  dividerText: { background: '#f9f5ef', padding: '0 0.8rem', color: '#9ca3af', fontSize: '0.8rem', position: 'relative', zIndex: 1 },
  registerLink: { display: 'block', textAlign: 'center', background: 'transparent', border: '1px solid #d5cfc7', color: '#0b0f1a', padding: '0.8rem', borderRadius: '3px', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', marginBottom: '1rem' },
  backLink: { textAlign: 'center' },
};
