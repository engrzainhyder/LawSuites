import { Link } from 'react-router-dom';

const TEAM = [
  { initials: 'GH', name: 'Adv. Ghufraan', role: 'Senior Criminal Lawyer', exp: '22 years experience' },
  { initials: 'JA', name: 'Adv. Javeria', role: "Women's Rights Specialist", exp: '18 years experience' },
  { initials: 'ZA', name: 'Adv. Zain', role: 'Tax & Filing Returns', exp: '20 years experience' },
  { initials: 'AN', name: 'Adv. Anas', role: 'Family & Estate Law', exp: '17 years experience' },
  { initials: 'US', name: 'Adv. Usman', role: 'Real Estate Law', exp: '15 years experience' },
  { initials: 'RM', name: 'Adv. Rania Malik', role: 'Criminal Defense', exp: '16 years experience' },
  { initials: 'FA', name: 'Adv. Faisal Amir', role: 'Corporate & Tax Law', exp: '19 years experience' },
  { initials: 'SN', name: 'Adv. Sadia Noor', role: 'Family & Women\'s Rights', exp: '14 years experience' },
];

const VALUES = [
  { num: '01', title: 'Integrity', desc: 'We uphold the highest ethical standards in every case we handle.' },
  { num: '02', title: 'Excellence', desc: 'Rigorous research and preparation form the foundation of our practice.' },
  { num: '03', title: 'Accessibility', desc: 'Quality legal counsel should not be a privilege — it is a right.' },
  { num: '04', title: 'Confidentiality', desc: 'Your information is protected under absolute client-attorney privilege.' },
];

export default function About() {
  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.badge}>Our Firm</div>
          <h1 style={styles.heroTitle}>About LawSuites</h1>
          <p style={styles.heroSub}>Bridging the gap between citizens and justice through technology and verified legal expertise.</p>
        </div>
      </section>

      {/* MISSION */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.twoCol}>
            <div>
              <div style={styles.sectionLabel}>Who We Are</div>
              <h2 style={styles.sectionTitle}>Our Mission</h2>
              <p style={styles.bodyText}>LawSuites is a technology-driven legal platform built to connect Pakistani citizens with verified attorneys across five critical practice areas. We combine AI-powered text analysis with a curated network of experienced lawyers to ensure you receive the right legal help — fast.</p>
              <p style={{ ...styles.bodyText, marginTop: '1rem' }}>Our platform removes the barriers of language, geography, and complexity that have historically kept quality legal counsel out of reach for ordinary citizens.</p>
              <Link to="/match" style={styles.ctaGold}>Get Your AI Match →</Link>
            </div>
            <div style={styles.missionStats}>
              {[['15+', 'Years Combined Experience'], ['500+', 'Cases Successfully Resolved'], ['5', 'Specialized Practice Areas'], ['98%', 'Client Satisfaction Rate']].map(([v, l]) => (
                <div key={l} style={styles.mStat}>
                  <div style={styles.mStatVal}>{v}</div>
                  <div style={styles.mStatLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.darkSection}>
        <div style={styles.sectionInner}>
          <div style={{ ...styles.sectionLabel, color: '#c9a84c88' }}>Process</div>
          <h2 style={{ ...styles.sectionTitle, color: '#e8d5a3' }}>How LawSuites Works</h2>
          <div style={styles.stepsGrid}>
            {[
              { n: '01', t: 'Describe Your Problem', d: 'Write your legal situation in plain Urdu or English — no legal jargon needed.' },
              { n: '02', t: 'AI Analyzes & Matches', d: 'Our engine scores your problem against 5 attorney types and recommends the best fit.' },
              { n: '03', t: 'Register & File Case', d: 'Complete a short registration form. Your case is filed instantly with the matched type.' },
              { n: '04', t: 'Attorney Assigned', d: 'Our admin assigns a verified attorney and schedules your first hearing.' },
              { n: '05', t: 'Track on Dashboard', d: 'Monitor case status, hearing dates, and attorney updates from your personal dashboard.' },
            ].map(s => (
              <div key={s.n} style={styles.step}>
                <div style={styles.stepNum}>{s.n}</div>
                <h4 style={styles.stepTitle}>{s.t}</h4>
                <p style={styles.stepDesc}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Our Principles</div>
          <h2 style={styles.sectionTitle}>Core Values</h2>
          <div style={styles.valuesGrid}>
            {VALUES.map(v => (
              <div key={v.num} style={styles.valueCard}>
                <span style={styles.valueNum}>{v.num}</span>
                <h4 style={styles.valueTitle}>{v.title}</h4>
                <p style={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={styles.teamSection}>
        <div style={styles.sectionInner}>
          <div style={styles.teamHeader}>
            <div>
              <div style={styles.sectionLabel}>The People</div>
              <h2 style={{ ...styles.sectionTitle, color: '#e8d5a3', marginBottom: '0' }}>Our Legal Team</h2>
            </div>
            <p style={styles.teamHeaderDesc}>Each attorney on our platform is verified, licensed, and a specialist in their domain.</p>
          </div>
          <div style={styles.teamGrid}>
            {TEAM.map((t, i) => (
              <div key={t.name} style={styles.teamCard}>
                <div style={styles.teamCardTop}>
                  <div style={styles.avatar}>{t.initials}</div>
                  <div style={styles.teamBadge}>Verified ✓</div>
                </div>
                <div style={styles.teamGoldLine} />
                <h4 style={styles.teamName}>{t.name}</h4>
                <div style={styles.teamRole}>{t.role}</div>
                <div style={styles.teamExp}>{t.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  page: { background: '#f9f5ef', fontFamily: "'Inter', sans-serif" },
  hero: { background: 'linear-gradient(135deg, #0b0f1a 0%, #1e2d45 100%)', padding: '5rem 2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' },
  heroInner: { maxWidth: '700px', margin: '0 auto', position: 'relative' },
  badge: { display: 'inline-block', border: '1px solid #c9a84c55', color: '#c9a84c', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.35rem 1.1rem', borderRadius: '2px', marginBottom: '1.5rem' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#f5f0e8', marginBottom: '1rem' },
  heroSub: { color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7 },
  section: { padding: '5.5rem 2.5rem', background: '#f9f5ef' },
  darkSection: { padding: '5.5rem 2.5rem', background: '#0b0f1a' },
  sectionInner: { maxWidth: '1100px', margin: '0 auto' },
  sectionLabel: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '0.6rem' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 700, color: '#0b0f1a', marginBottom: '2.5rem' },
  bodyText: { color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.8 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' },
  missionStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  mStat: { background: '#fff', border: '1px solid #e5e0d8', padding: '1.5rem', borderRadius: '2px', textAlign: 'center' },
  mStatVal: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: '#c9a84c' },
  mStatLabel: { color: '#6b7280', fontSize: '0.8rem', marginTop: '0.3rem', fontWeight: 500 },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' },
  step: { border: '1px solid #1e2d45', borderRadius: '2px', padding: '1.8rem 1.5rem', background: '#0f172a' },
  stepNum: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: '#c9a84c', marginBottom: '0.8rem' },
  stepTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.5rem' },
  stepDesc: { color: '#64748b', fontSize: '0.83rem', lineHeight: 1.65 },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' },
  valueCard: { background: '#fff', border: '1px solid #e5e0d8', padding: '1.8rem', borderRadius: '2px' },
  valueNum: { fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 800, color: '#c9a84c', display: 'block', marginBottom: '0.7rem' },
  valueTitle: { fontSize: '1rem', fontWeight: 700, color: '#0b0f1a', marginBottom: '0.5rem' },
  valueDesc: { color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.65 },
  teamSection: { padding: '5.5rem 2.5rem', background: '#0b0f1a' },
  teamHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '3rem', flexWrap: 'wrap' },
  teamHeaderDesc: { color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '360px', borderLeft: '2px solid #c9a84c33', paddingLeft: '1.2rem' },
  teamGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: '#1e2d45' },
  teamCard: { background: '#0f172a', padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column' },
  teamCardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' },
  avatar: { width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", border: '2px solid #c9a84c44' },
  teamBadge: { fontSize: '0.68rem', fontWeight: 700, color: '#10b981', background: '#10b98115', border: '1px solid #10b98133', padding: '0.2rem 0.6rem', borderRadius: '2px', letterSpacing: '0.04em' },
  teamGoldLine: { width: '28px', height: '1.5px', background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: '1rem' },
  teamName: { fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.35rem' },
  teamRole: { color: '#c9a84c', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '0.03em' },
  teamExp: { color: '#4b5563', fontSize: '0.78rem', fontWeight: 400 },
  ctaBanner: { background: '#0b0f1a', padding: '5rem 2.5rem', textAlign: 'center', borderTop: '1px solid #1e2d45' },
  ctaTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.8rem' },
  ctaSub: { color: '#64748b', marginBottom: '2rem', fontSize: '0.95rem' },
  ctaGold: { display: 'inline-block', marginTop: '1.5rem', background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', padding: '0.85rem 2rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' },
};
