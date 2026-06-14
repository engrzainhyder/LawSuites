import { useState } from 'react';
import { aiAPI } from '../services/api';

const TYPE_META = {
  Criminal:     { color: '#ef4444', label: 'Criminal Law',     attorney: 'Adv. Ghufraan',   initials: 'GH' },
  Tax:          { color: '#c9a84c', label: 'Tax & Filing',     attorney: 'Adv. Zain',        initials: 'ZA' },
  RealEstate:   { color: '#10b981', label: 'Real Estate',      attorney: 'Adv. Usman',       initials: 'US' },
  Family:       { color: '#6366f1', label: 'Family Law',       attorney: 'Adv. Anas',        initials: 'AN' },
  WomensRights: { color: '#ec4899', label: "Women's Rights",   attorney: 'Adv. Javeria',     initials: 'JA' },
};

export default function AIWidget({ onResult }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (text.trim().length < 10) { setError('Please describe your problem in more detail (minimum 10 characters).'); return; }
    setLoading(true);
    try {
      const { data } = await aiAPI.match(text);
      setResult(data);
      if (onResult) onResult(data, text);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const meta = result ? (TYPE_META[result.recommendedType] || { color: '#c9a84c', label: result.recommendedType, attorney: 'Adv. Usman', initials: 'US' }) : null;
  const confColor = result?.confidenceLabel === 'high' ? '#10b981' : result?.confidenceLabel === 'medium' ? '#c9a84c' : '#ef4444';

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.title}>Describe Your Legal Problem</h2>
        <p style={styles.sub}>Write in plain language — Urdu or English. Our AI will analyse your situation and match you with the correct attorney and experience level.</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          rows={6}
          placeholder="e.g. My landlord has illegally changed the locks on my rented property and is refusing to return my security deposit..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div style={styles.formFooter}>
          <span style={styles.charCount}>{text.length} characters</span>
          {error && <span style={styles.error}>{error}</span>}
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Analysing...' : 'Find My Attorney →'}
          </button>
        </div>
      </form>

      {result && meta && (
        <div style={styles.resultWrap}>
          {/* HEADER ROW */}
          <div style={styles.resultHeader}>
            <div style={{ ...styles.typePill, background: meta.color + '18', color: meta.color, border: `1px solid ${meta.color}44` }}>
              {meta.label}
            </div>
            <div style={styles.metaChips}>
              <span style={styles.chip}>Experience: <strong style={{ color: '#e8d5a3' }}>Senior</strong></span>
              <span style={styles.chipDivider} />
              <span style={styles.chip}>Confidence: <strong style={{ color: confColor }}>{result.confidence}</strong></span>
            </div>
          </div>

          {/* ATTORNEY ROW */}
          <div style={styles.attorneyRow}>
            <div style={{ ...styles.attorneyAvatar, background: `linear-gradient(135deg, ${meta.color}, ${meta.color}88)` }}>
              {meta.initials}
            </div>
            <div style={styles.attorneyInfo}>
              <div style={styles.attorneyName}>{meta.attorney}</div>
              <div style={styles.attorneySpec}>{meta.label} Specialist · ✓ Verified</div>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div style={styles.breakdown}>
            <div style={styles.breakdownLabel}>Analysis Breakdown</div>
            <div style={styles.scoreGrid}>
              {result.allScores?.map(s => {
                const m = TYPE_META[s.type];
                const maxScore = Math.max(...(result.allScores?.map(x => x.score) || [1]), 1);
                const pct = Math.round((s.score / maxScore) * 100);
                return (
                  <div key={s.type} style={styles.scoreRow}>
                    <div style={styles.scoreType}>{m?.label || s.type}</div>
                    <div style={styles.scoreTrack}>
                      <div style={{ ...styles.scoreFill, width: `${pct}%`, background: m?.color || '#c9a84c', opacity: s.score === 0 ? 0.12 : 1 }} />
                    </div>
                    <div style={{ ...styles.scoreCount, color: s.score > 0 ? '#e8d5a3' : '#4b5563' }}>{s.score}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '1px solid #e5e0d8', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' },

  cardHeader: { background: '#0b0f1a', padding: '2rem 2.5rem', borderBottom: '1px solid #1e2d45' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.5rem' },
  sub: { color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.65 },

  form: { padding: '2rem 2.5rem', borderBottom: '1px solid #f0ebe3' },
  textarea: { width: '100%', padding: '1rem', border: '1px solid #d5cfc7', fontSize: '0.9rem', resize: 'vertical', fontFamily: "'Inter', sans-serif", color: '#0b0f1a', background: '#faf8f5', lineHeight: 1.65, outline: 'none', boxSizing: 'border-box' },
  formFooter: { display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.8rem', flexWrap: 'wrap' },
  charCount: { color: '#9ca3af', fontSize: '0.78rem', marginRight: 'auto' },
  error: { color: '#ef4444', fontSize: '0.82rem', flex: '1 1 100%' },
  btn: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' },

  resultWrap: { background: '#0b0f1a', borderTop: '1px solid #1e2d45' },

  resultHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 2rem', borderBottom: '1px solid #1e2d45', flexWrap: 'wrap', gap: '0.8rem' },
  typePill: { fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, padding: '0.35rem 1rem', letterSpacing: '0.02em' },
  metaChips: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  chip: { color: '#4b5563', fontSize: '0.8rem' },
  chipDivider: { width: '1px', height: '14px', background: '#1e2d45' },

  attorneyRow: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.3rem 2rem', borderBottom: '1px solid #1e2d45' },
  attorneyAvatar: { width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 800, color: '#0b0f1a', fontSize: '0.85rem', flexShrink: 0 },
  attorneyInfo: {},
  attorneyName: { fontFamily: "'Playfair Display', serif", fontSize: '0.98rem', fontWeight: 700, color: '#e8d5a3' },
  attorneySpec: { color: '#4b5563', fontSize: '0.76rem', marginTop: '0.15rem' },

  breakdown: { padding: '1.3rem 2rem 1.8rem' },
  breakdownLabel: { fontSize: '0.62rem', fontWeight: 700, color: '#4b5563', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.9rem' },
  scoreGrid: { display: 'flex', flexDirection: 'column', gap: '0.55rem' },
  scoreRow: { display: 'flex', alignItems: 'center', gap: '0.8rem' },
  scoreType: { width: '105px', fontSize: '0.76rem', color: '#4b5563', flexShrink: 0 },
  scoreTrack: { flex: 1, height: '3px', background: '#1e2d45', overflow: 'hidden' },
  scoreFill: { height: '100%', transition: 'width 0.7s ease' },
  scoreCount: { width: '20px', fontSize: '0.73rem', fontWeight: 700, textAlign: 'right', flexShrink: 0 },
};
