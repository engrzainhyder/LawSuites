import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { clientAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const TYPE_LABELS = { Criminal: 'Criminal Law', Tax: 'Tax & Filing', RealEstate: 'Real Estate', Family: 'Family Law', WomensRights: "Women's Rights" };

export default function Register() {
  const { state } = useLocation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const matchData = state?.matchData;
  const problemText = state?.problemText || '';

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', cnic: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const { data } = await clientAPI.register({ ...form, recommendedType: matchData?.recommendedType || '', problemDescription: problemText });
      login(data.token, data.client);
      toast.success('Registration successful! Welcome to LawSuites.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  const FIELDS = [
    { f: 'fullName', l: 'Full Name', t: 'text', p: 'Muhammad Ali' },
    { f: 'email', l: 'Email Address', t: 'email', p: 'your@email.com' },
    { f: 'phone', l: 'Phone Number', t: 'tel', p: '+92 300 0000 000' },
    { f: 'cnic', l: 'CNIC (13 digits)', t: 'text', p: '3520212345678' },
    { f: 'password', l: 'Password', t: 'password', p: '••••••••' },
    { f: 'confirmPassword', l: 'Confirm Password', t: 'password', p: '••••••••' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <Link to="/" style={styles.back}>← Back to Home</Link>
          <div style={styles.logoWrap}>
            <div style={styles.logoMark}>⚖</div>
            <div>
              <div style={styles.logoName}>LawSuites</div>
              <div style={styles.logoTag}>Legal Excellence</div>
            </div>
          </div>
          <h2 style={styles.leftTitle}>One Step Away from Legal Help</h2>
          <p style={styles.leftSub}>Register to file your case, track hearing dates, and communicate with your assigned attorney — all from one dashboard.</p>
          {matchData && (
            <div style={styles.matchBox}>
              <div style={styles.matchBoxLabel}>Your AI Recommendation</div>
              <div style={styles.matchType}>{TYPE_LABELS[matchData.recommendedType] || matchData.recommendedType}</div>
              <div style={styles.matchMeta}>Experience Level: <strong>{matchData.experienceLevel}</strong> · Confidence: <strong>{matchData.confidence}</strong></div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Your Account</h2>
          <p style={styles.formSub}>Already registered? <Link to="/login" style={styles.loginLink}>Sign in →</Link></p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid}>
              {FIELDS.map(({ f, l, t, p }) => (
                <div key={f} style={styles.field}>
                  <label style={styles.label}>{l}</label>
                  <input style={styles.input} type={t} required value={form[f]} onChange={set(f)} placeholder={p} />
                </div>
              ))}
            </div>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Creating Account...' : 'Register & File Case →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
  left: { width: '420px', background: 'linear-gradient(160deg, #0b0f1a 0%, #1e2d45 100%)', display: 'flex', alignItems: 'center', padding: '3rem 2.5rem', flexShrink: 0 },
  leftInner: { width: '100%' },
  back: { display: 'inline-block', color: '#4b5563', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '2rem' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '2.5rem' },
  logoMark: { width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  logoName: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#e8d5a3' },
  logoTag: { fontSize: '0.58rem', color: '#c9a84c', letterSpacing: '0.16em', textTransform: 'uppercase' },
  leftTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#f5f0e8', marginBottom: '1rem', lineHeight: 1.3 },
  leftSub: { color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '2rem' },
  matchBox: { background: '#0f172a', border: '1px solid #1e2d45', borderLeft: '3px solid #c9a84c', padding: '1.2rem', borderRadius: '2px' },
  matchBoxLabel: { fontSize: '0.68rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.5rem' },
  matchType: { fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.4rem' },
  matchMeta: { color: '#64748b', fontSize: '0.8rem' },
  right: { flex: 1, background: '#f9f5ef', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' },
  formCard: { width: '100%', maxWidth: '540px' },
  formTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#0b0f1a', marginBottom: '0.3rem' },
  formSub: { color: '#6b7280', fontSize: '0.88rem', marginBottom: '2rem' },
  loginLink: { color: '#c9a84c', fontWeight: 600, textDecoration: 'none' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em' },
  input: { padding: '0.78rem 0.9rem', border: '1px solid #d5cfc7', borderRadius: '2px', fontSize: '0.88rem', fontFamily: "'Inter', sans-serif", background: '#fff', color: '#0b0f1a', outline: 'none', width: '100%', boxSizing: 'border-box' },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.9rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em', marginTop: '0.3rem' },
};
