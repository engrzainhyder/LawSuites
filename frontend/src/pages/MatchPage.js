import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIWidget from '../components/AIWidget';

export default function MatchPage() {
  const [matchData, setMatchData] = useState(null);
  const [problemText, setProblemText] = useState('');
  const navigate = useNavigate();

  const handleResult = (data, text) => { setMatchData(data); setProblemText(text); };
  const handleProceed = () => navigate('/register', { state: { matchData, problemText } });

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.badge}>AI-Powered</div>
          <h1 style={styles.heroTitle}>Attorney Matchmaker</h1>
          <p style={styles.heroSub}>Describe your legal situation in plain language. Our AI will analyse your problem and recommend the right attorney type and experience level — instantly.</p>
        </div>
      </section>

      <section style={styles.body}>
        <AIWidget onResult={handleResult} />
        {matchData && (
          <div style={styles.proceed}>
            <div style={styles.proceedCard}>
              <p style={styles.proceedText}>Your attorney type has been identified. Ready to file your case?</p>
              <button onClick={handleProceed} style={styles.proceedBtn}>Register & File Case →</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  page: { background: '#f9f5ef', fontFamily: "'Inter', sans-serif", minHeight: '100vh' },
  hero: { background: 'linear-gradient(135deg, #0b0f1a 0%, #1e2d45 100%)', padding: '4.5rem 2.5rem', textAlign: 'center' },
  heroInner: { maxWidth: '680px', margin: '0 auto' },
  badge: { display: 'inline-block', border: '1px solid #c9a84c55', color: '#c9a84c', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.35rem 1.1rem', borderRadius: '2px', marginBottom: '1.5rem' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#f5f0e8', marginBottom: '1rem' },
  heroSub: { color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.75 },
  body: { padding: '3.5rem 1.5rem', maxWidth: '800px', margin: '0 auto' },
  proceed: { marginTop: '1.5rem' },
  proceedCard: { background: '#0b0f1a', border: '1px solid #1e2d45', borderRadius: '2px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' },
  proceedText: { color: '#94a3b8', fontSize: '0.9rem' },
  proceedBtn: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.75rem 1.8rem', borderRadius: '3px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' },
};
