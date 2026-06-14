import { Link } from 'react-router-dom';

const STATS = [
  { value: '15+', label: 'Years of Practice' },
  { value: '500+', label: 'Cases Resolved' },
  { value: '5', label: 'Practice Areas' },
  { value: '98%', label: 'Client Satisfaction' },
];

const PRACTICES = [
  { num: '01', icon: '🔒', title: 'Criminal Law', desc: 'Defense representation for all criminal charges, FIR cases, bail hearings, and trial proceedings before courts.', items: ['Bail & Remand', 'Trial Defense', 'FIR Filing', 'Appeals'] },
  { num: '02', icon: '🧾', title: 'Tax & Filing', desc: 'FBR compliance, income tax returns, NTN registration, audit defense, and GST matters handled by specialists.', items: ['Income Tax Returns', 'FBR Registration', 'GST Compliance', 'Audit Defense'] },
  { num: '03', icon: '🏠', title: 'Real Estate', desc: 'Property disputes, title deed verification, lease agreements, registry matters, and encroachment cases.', items: ['Title Deeds', 'Property Disputes', 'Lease Agreements', 'Registry'] },
  { num: '04', icon: '👨‍👩‍👧', title: 'Family Law', desc: 'Divorce, khula, child custody, maintenance orders, inheritance claims, and all family court proceedings.', items: ['Divorce & Khula', 'Child Custody', 'Inheritance', 'Maintenance'] },
  { num: '05', icon: '♀️', title: "Women's Rights", desc: 'Legal aid for harassment, domestic violence, dowry cases, acid attacks, and gender-based violence victims.', items: ['Harassment Cases', 'Domestic Violence', 'Dowry Protection', 'Legal Aid'] },
];

const TESTIMONIALS = [
  { quote: 'LawSuites matched me with exactly the right attorney. My property dispute was resolved in 3 months.', name: 'Ahmed K.', type: 'Real Estate Case' },
  { quote: 'The AI matched me to a Women\'s Rights attorney immediately. The team was professional and compassionate.', name: 'Sara M.', type: 'Women\'s Rights Case' },
  { quote: 'Filing my tax returns through LawSuites saved me from an FBR audit penalty. Highly recommended.', name: 'Bilal R.', type: 'Tax Filing Case' },
];

const WHY = [
  { num: '01', title: 'AI-Powered Matching', desc: 'Our system reads your problem and instantly recommends the right attorney type and experience level.' },
  { num: '02', title: 'Verified Specialists', desc: 'Every attorney on our platform is verified, licensed, and experienced in their specific domain.' },
  { num: '03', title: 'Full Case Tracking', desc: 'Monitor your case status, hearing dates, and attorney assignments from your personal dashboard.' },
  { num: '04', title: 'Confidential & Secure', desc: 'All your case details are encrypted and protected under strict client-attorney confidentiality.' },
  { num: '05', title: 'Affordable Access', desc: 'We connect citizens with quality legal services regardless of financial background.' },
  { num: '06', title: 'Nationwide Coverage', desc: 'Serving clients across all major cities and districts of Pakistan.' },
];

export default function Home() {
  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>Trusted Legal Services — Pakistan</div>
          <h1 style={styles.heroTitle}>
            Justice is Not Just a<br />
            <em style={styles.heroItalic}>Principle —</em> It is Our Practice.
          </h1>
          <p style={styles.heroSub}>
            LawSuites connects you with verified attorneys across Criminal, Tax, Real Estate,
            Family, and Women's Rights law — matched by AI to your exact situation.
          </p>
          <div style={styles.heroCtas}>
            <Link to="/match" style={styles.ctaGold}>Schedule a Consultation →</Link>
            <Link to="/about" style={styles.ctaOutline}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsBar}>
        {STATS.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* PRACTICE AREAS */}
      <section style={styles.practiceSection}>
        <div style={styles.sectionInner}>
          <div style={styles.practiceHeader}>
            <div>
              <div style={styles.sectionLabel}>Our Expertise</div>
              <h2 style={{ ...styles.sectionTitle, color: '#e8d5a3' }}>Practice Areas</h2>
            </div>
            <p style={styles.practiceHeaderDesc}>Specialized legal representation across Pakistan's most critical areas of law. Each practice area is handled by verified, experienced attorneys.</p>
          </div>

          <div style={styles.practiceGrid}>
            {PRACTICES.map((p, i) => (
              <div key={p.num} style={styles.practiceCard} className="practice-card">
                <div style={styles.practiceCardTop}>
                  <span style={styles.practiceNum}>{p.num}</span>
                  <div style={styles.practiceIconWrap}>{p.icon}</div>
                </div>
                <div style={styles.practiceGoldLine} />
                <h3 style={styles.practiceTitle}>{p.title}</h3>
                <p style={styles.practiceDesc}>{p.desc}</p>
                <ul style={styles.practiceList}>
                  {p.items.map(item => (
                    <li key={item} style={styles.practiceListItem}>
                      <span style={styles.bullet}>—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={styles.dividerWrap}>
        <div style={styles.dividerLine} />
      </div>

      {/* WHY US */}
      <section style={styles.darkSection}>
        <div style={styles.sectionInner}>
          <div style={{ ...styles.sectionLabel, color: '#c9a84c88' }}>Why Choose Us</div>
          <h2 style={{ ...styles.sectionTitle, color: '#e8d5a3' }}>The LawSuites Difference</h2>
          <p style={{ ...styles.sectionSub, color: '#64748b' }}>Built to give every Pakistani citizen access to quality legal counsel.</p>
          <div style={styles.whyGrid}>
            {WHY.map(w => (
              <div key={w.num} style={styles.whyCard}>
                <span style={styles.whyNum}>{w.num}</span>
                <h4 style={styles.whyTitle}>{w.title}</h4>
                <p style={styles.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Client Stories</div>
          <h2 style={styles.sectionTitle}>What Our Clients Say</h2>
          <div style={styles.testimonialGrid}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <div style={styles.quoteIcon}>"</div>
                <p style={styles.quoteText}>{t.quote}</p>
                <div style={styles.quoteDivider} />
                <div style={styles.quoteName}>{t.name}</div>
                <div style={styles.quoteType}>{t.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={styles.ctaBanner}>
        <div style={styles.ctaBannerInner}>
          <h2 style={styles.ctaBannerTitle}>Not Sure Which Attorney You Need?</h2>
          <p style={styles.ctaBannerSub}>Our AI Matchmaker reads your situation and points you to the exact specialist in seconds.</p>
          <div style={styles.heroCtas}>
            <Link to="/match" style={styles.ctaGold}>Try AI Matchmaker →</Link>
            <Link to="/register" style={styles.ctaOutline}>Register as a Client →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>
              <div style={styles.footerLogoMark}>⚖</div>
              <div>
                <div style={styles.footerBrandName}>LawSuites</div>
                <div style={styles.footerBrandTag}>Legal Excellence</div>
              </div>
            </div>
            <p style={styles.footerAbout}>Connecting citizens with verified legal specialists through AI-powered matching across Pakistan.</p>
          </div>
          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>Practice Areas</div>
            {['Criminal Law', 'Tax & Filing', 'Real Estate', 'Family Law', "Women's Rights"].map(a => (
              <div key={a} style={styles.footerLink}>{a}</div>
            ))}
          </div>
          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>Quick Links</div>
            {[['/', 'Home'], ['/about', 'About Us'], ['/match', 'AI Matchmaker'], ['/login', 'Client Login'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={styles.footerLink}>{label}</Link>
            ))}
          </div>
          <div style={styles.footerCol}>
            <div style={styles.footerColTitle}>Contact</div>
            <div style={styles.footerLink}>✆ +92 300 0000 000</div>
            <div style={styles.footerLink}>✉ info@lawsuites.pk</div>
            <div style={styles.footerLink}>📍 Islamabad, Pakistan</div>
            <div style={{ ...styles.footerLink, marginTop: '0.8rem' }}>Mon – Sat: 9:00 AM – 6:00 PM</div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© {new Date().getFullYear()} LawSuites. All rights reserved.</span>
          <span style={{ color: '#c9a84c' }}>Justice · Excellence · Trust</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: 'var(--cream, #f9f5ef)', fontFamily: "'Inter', sans-serif" },

  /* HERO */
  hero: { position: 'relative', background: 'linear-gradient(135deg, #0b0f1a 0%, #111827 50%, #1e2d45 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' },
  heroOverlay: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none' },
  heroContent: { position: 'relative', maxWidth: '780px', margin: '0 auto', padding: '5rem 2.5rem', textAlign: 'center' },
  heroBadge: { display: 'inline-block', border: '1px solid #c9a84c55', color: '#c9a84c', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.4rem 1.2rem', borderRadius: '2px', marginBottom: '2rem' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700, color: '#f5f0e8', lineHeight: 1.15, marginBottom: '1.5rem' },
  heroItalic: { color: '#c9a84c', fontStyle: 'italic' },
  heroSub: { color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' },
  heroCtas: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  ctaGold: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', padding: '0.85rem 2rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.03em', textDecoration: 'none', display: 'inline-block' },
  ctaOutline: { border: '1px solid #c9a84c66', color: '#e8d5a3', padding: '0.85rem 2rem', borderRadius: '3px', fontWeight: 500, fontSize: '0.92rem', textDecoration: 'none', display: 'inline-block' },

  /* STATS */
  statsBar: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#c9a84c', },
  statItem: { padding: '1.8rem 1rem', textAlign: 'center', borderRight: '1px solid #a07830' },
  statValue: { fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800, color: '#0b0f1a', lineHeight: 1 },
  statLabel: { fontSize: '0.78rem', fontWeight: 600, color: '#4a3000', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' },

  /* SECTIONS */
  section: { padding: '6rem 2.5rem', background: '#f9f5ef' },
  darkSection: { padding: '6rem 2.5rem', background: '#0b0f1a' },
  sectionInner: { maxWidth: '1180px', margin: '0 auto' },
  sectionLabel: { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '0.7rem' },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#0b0f1a', marginBottom: '0.9rem', lineHeight: 1.2 },
  sectionSub: { color: '#6b7280', fontSize: '1rem', lineHeight: 1.65, marginBottom: '3rem', maxWidth: '560px' },

  /* PRACTICE SECTION */
  practiceSection: { padding: '7rem 2.5rem', background: '#0b0f1a' },
  practiceHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '3rem', flexWrap: 'wrap' },
  practiceHeaderDesc: { color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.75, maxWidth: '420px', borderLeft: '2px solid #c9a84c33', paddingLeft: '1.2rem' },

  /* PRACTICE CARDS */
  practiceGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1px', background: '#1e2d45', border: '1px solid #1e2d45' },
  practiceCard: { background: '#0f172a', padding: '2.2rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', transition: 'background 0.25s', cursor: 'default' },
  practiceCardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.4rem' },
  practiceNum: { fontFamily: "'Playfair Display', serif", fontSize: '0.8rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.1em', border: '1px solid #c9a84c44', padding: '0.2rem 0.6rem', borderRadius: '2px' },
  practiceIconWrap: { fontSize: '1.6rem', opacity: 0.9 },
  practiceGoldLine: { width: '32px', height: '2px', background: 'linear-gradient(90deg, #c9a84c, transparent)', marginBottom: '1.1rem' },
  practiceTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.7rem', lineHeight: 1.3 },
  practiceDesc: { color: '#4b5563', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '1.3rem', flex: 1 },
  practiceList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.6rem' },
  practiceListItem: { color: '#64748b', fontSize: '0.8rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem' },
  bullet: { color: '#c9a84c', fontWeight: 700, fontSize: '0.65rem', flexShrink: 0 },

  dividerWrap: { background: '#0b0f1a', padding: '0 4rem' },
  dividerLine: { height: '1px', background: 'linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8d5a3 50%, #c9a84c 70%, transparent 100%)' },

  /* WHY GRID */
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
  whyCard: { border: '1px solid #1e2d45', borderRadius: '2px', padding: '1.8rem', background: '#0f172a' },
  whyNum: { fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 800, color: '#c9a84c', display: 'block', marginBottom: '0.7rem' },
  whyTitle: { fontSize: '1rem', fontWeight: 700, color: '#e8d5a3', marginBottom: '0.5rem' },
  whyDesc: { color: '#64748b', fontSize: '0.85rem', lineHeight: 1.65 },

  /* TESTIMONIALS */
  testimonialGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
  testimonialCard: { background: '#fff', border: '1px solid #e5e0d8', borderRadius: '2px', padding: '2rem' },
  quoteIcon: { fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: '#c9a84c', lineHeight: 0.8, marginBottom: '1rem', display: 'block' },
  quoteText: { color: '#374151', fontSize: '0.92rem', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.2rem' },
  quoteDivider: { width: '40px', height: '2px', background: '#c9a84c', marginBottom: '1rem' },
  quoteName: { fontWeight: 700, color: '#0b0f1a', fontSize: '0.9rem' },
  quoteType: { color: '#c9a84c', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', marginTop: '0.2rem' },

  /* CTA BANNER */
  ctaBanner: { background: 'linear-gradient(135deg, #111827, #1e2d45)', padding: '5rem 2.5rem', textAlign: 'center' },
  ctaBannerInner: { maxWidth: '680px', margin: '0 auto' },
  ctaBannerTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#e8d5a3', marginBottom: '1rem' },
  ctaBannerSub: { color: '#64748b', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.65 },

  /* FOOTER */
  footer: { background: '#080c14', borderTop: '1px solid #1e2d45', paddingTop: '4rem' },
  footerInner: { maxWidth: '1180px', margin: '0 auto', padding: '0 2.5rem 3rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: '3rem' },
  footerBrand: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  footerLogo: { display: 'flex', gap: '0.8rem', alignItems: 'center' },
  footerLogoMark: { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 },
  footerBrandName: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#e8d5a3' },
  footerBrandTag: { fontSize: '0.6rem', color: '#c9a84c', letterSpacing: '0.16em', textTransform: 'uppercase' },
  footerAbout: { color: '#4b5563', fontSize: '0.84rem', lineHeight: 1.7 },
  footerCol: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  footerColTitle: { color: '#e8d5a3', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem', borderBottom: '1px solid #1e2d45', paddingBottom: '0.6rem' },
  footerLink: { color: '#4b5563', fontSize: '0.84rem', textDecoration: 'none', display: 'block', lineHeight: 1.4 },
  footerBottom: { borderTop: '1px solid #1e2d45', padding: '1.2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#374151' },
};
