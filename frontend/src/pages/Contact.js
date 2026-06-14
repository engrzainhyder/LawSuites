import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const set = f => e => setForm({ ...form, [f]: e.target.value });

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.badge}>Get In Touch</div>
          <h1 style={styles.heroTitle}>Contact LawSuites</h1>
          <p style={styles.heroSub}>Reach out for consultations, case inquiries, or general legal guidance. We respond within 24 hours.</p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.grid}>

            {/* INFO */}
            <div style={styles.infoCol}>
              <h2 style={styles.infoTitle}>Office Information</h2>
              {[
                { icon: '📍', label: 'Address', val: 'Street 12, F-7/2, Islamabad, Pakistan' },
                { icon: '✆', label: 'Phone', val: '+92 300 0000 000' },
                { icon: '✉', label: 'Email', val: 'info@lawsuites.pk' },
                { icon: '🕐', label: 'Hours', val: 'Mon – Sat: 9:00 AM – 6:00 PM' },
              ].map(({ icon, label, val }) => (
                <div key={label} style={styles.infoItem}>
                  <div style={styles.infoIcon}>{icon}</div>
                  <div>
                    <div style={styles.infoLabel}>{label}</div>
                    <div style={styles.infoVal}>{val}</div>
                  </div>
                </div>
              ))}

              <div style={styles.ctaBox}>
                <div style={styles.ctaBoxLabel}>Need Immediate Help?</div>
                <p style={styles.ctaBoxText}>Use our AI Matchmaker for an instant attorney recommendation.</p>
                <Link to="/match" style={styles.ctaBtn}>Try AI Matchmaker →</Link>
              </div>
            </div>

            {/* FORM */}
            <div style={styles.formCard}>
              {sent ? (
                <div style={styles.success}>
                  <div style={styles.successIcon}>✓</div>
                  <h3 style={styles.successTitle}>Message Received</h3>
                  <p style={styles.successText}>Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} style={styles.resetBtn}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 style={styles.formTitle}>Send a Message</h3>
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={styles.form}>
                    <div style={styles.twoInputs}>
                      <div style={styles.field}>
                        <label style={styles.label}>Full Name *</label>
                        <input style={styles.input} type="text" required value={form.name} onChange={set('name')} placeholder="Your full name" />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Email *</label>
                        <input style={styles.input} type="email" required value={form.email} onChange={set('email')} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div style={styles.twoInputs}>
                      <div style={styles.field}>
                        <label style={styles.label}>Phone</label>
                        <input style={styles.input} type="tel" value={form.phone} onChange={set('phone')} placeholder="+92 300 0000 000" />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Subject *</label>
                        <select style={styles.input} required value={form.subject} onChange={set('subject')}>
                          <option value="">Select subject</option>
                          <option>Criminal Law</option>
                          <option>Tax & Filing</option>
                          <option>Real Estate</option>
                          <option>Family Law</option>
                          <option>Women's Rights</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>Message *</label>
                      <textarea style={{ ...styles.input, minHeight: '140px', resize: 'vertical' }} required value={form.message} onChange={set('message')} placeholder="Describe your legal matter briefly..." />
                    </div>
                    <button type="submit" style={styles.submitBtn}>Send Message →</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { background: '#f9f5ef', fontFamily: "'Inter', sans-serif" },
  hero: { background: 'linear-gradient(135deg, #0b0f1a 0%, #1e2d45 100%)', padding: '5rem 2.5rem', textAlign: 'center' },
  heroInner: { maxWidth: '680px', margin: '0 auto' },
  badge: { display: 'inline-block', border: '1px solid #c9a84c55', color: '#c9a84c', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.35rem 1.1rem', borderRadius: '2px', marginBottom: '1.5rem' },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#f5f0e8', marginBottom: '1rem' },
  heroSub: { color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 },
  section: { padding: '5rem 2.5rem' },
  sectionInner: { maxWidth: '1100px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start' },
  infoCol: { display: 'flex', flexDirection: 'column', gap: '0' },
  infoTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#0b0f1a', marginBottom: '1.8rem' },
  infoItem: { display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.1rem 0', borderBottom: '1px solid #e5e0d8' },
  infoIcon: { fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' },
  infoLabel: { fontSize: '0.72rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' },
  infoVal: { color: '#374151', fontSize: '0.9rem', fontWeight: 500 },
  ctaBox: { marginTop: '2rem', background: '#0b0f1a', padding: '1.5rem', borderRadius: '2px', borderLeft: '3px solid #c9a84c' },
  ctaBoxLabel: { color: '#c9a84c', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' },
  ctaBoxText: { color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' },
  ctaBtn: { display: 'inline-block', background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', padding: '0.6rem 1.4rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.83rem', textDecoration: 'none' },
  formCard: { background: '#fff', border: '1px solid #e5e0d8', borderRadius: '2px', padding: '2.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' },
  formTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#0b0f1a', marginBottom: '1.8rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  twoInputs: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.78rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em' },
  input: { padding: '0.75rem 0.9rem', border: '1px solid #d5cfc7', borderRadius: '2px', fontSize: '0.88rem', background: '#faf8f5', outline: 'none', fontFamily: "'Inter', sans-serif", color: '#0b0f1a', width: '100%', boxSizing: 'border-box' },
  submitBtn: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.9rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', letterSpacing: '0.03em', fontFamily: "'Inter', sans-serif" },
  success: { textAlign: 'center', padding: '3rem 2rem' },
  successIcon: { width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', fontSize: '1.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' },
  successTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#0b0f1a', marginBottom: '0.6rem' },
  successText: { color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' },
  resetBtn: { background: 'transparent', border: '1px solid #d5cfc7', color: '#6b7280', padding: '0.6rem 1.4rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" },
};
