import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <div style={styles.topBar}>
        <span>✆ +92 300 0000 000</span>
        <span style={styles.topDivider}>|</span>
        <span>✉ info@lawsuites.pk</span>
        <span style={styles.topDivider}>|</span>
        <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.brand}>
          <div style={styles.logoMark}>
            <span style={styles.logoScale}>⚖</span>
          </div>
          <div style={styles.brandText}>
            <span style={styles.brandName}>LawSuites</span>
            <span style={styles.brandTagline}>Legal Excellence</span>
          </div>
        </Link>

        <div style={styles.links}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{ ...styles.link, ...(pathname === l.to ? styles.linkActive : {}) }}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <Link to="/match" style={{ ...styles.link, ...(pathname === '/match' ? styles.linkActive : {}) }}>
              AI Matchmaker
            </Link>
          )}
          {user?.role === 'client' && (
            <Link to="/dashboard" style={{ ...styles.link, ...(pathname === '/dashboard' ? styles.linkActive : {}) }}>
              My Cases
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ ...styles.link, ...(pathname.startsWith('/admin') ? styles.linkActive : {}) }}>
              Admin
            </Link>
          )}
        </div>

        <div style={styles.actions}>
          {user ? (
            <button onClick={handleLogout} style={styles.btnOutline}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={styles.btnOutline}>Login</Link>
              <Link to="/match" style={styles.btnGold}>Schedule Consultation →</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

const styles = {
  topBar: { background: '#0b0f1a', color: '#94a3b8', fontSize: '0.78rem', padding: '0.45rem 2.5rem', display: 'flex', gap: '0.8rem', alignItems: 'center', letterSpacing: '0.02em' },
  topDivider: { color: '#c9a84c', opacity: 0.5 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2.5rem', height: '76px', background: '#111827', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #1e2d45', boxShadow: '0 2px 20px rgba(0,0,0,0.4)' },
  brand: { display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' },
  logoMark: { width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #c9a84c44', flexShrink: 0 },
  logoScale: { fontSize: '1.5rem', filter: 'brightness(0) invert(1)' },
  brandText: { display: 'flex', flexDirection: 'column', lineHeight: 1.15 },
  brandName: { fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#e8d5a3', letterSpacing: '0.04em' },
  brandTagline: { fontSize: '0.65rem', color: '#c9a84c', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 },
  links: { display: 'flex', gap: '0.3rem', alignItems: 'center' },
  link: { color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, padding: '0.45rem 0.9rem', borderRadius: '4px', transition: 'color 0.2s', letterSpacing: '0.02em', textDecoration: 'none' },
  linkActive: { color: '#c9a84c' },
  actions: { display: 'flex', gap: '0.7rem', alignItems: 'center' },
  btnOutline: { border: '1px solid #c9a84c44', color: '#c9a84c', background: 'transparent', padding: '0.45rem 1.1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  btnGold: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', padding: '0.5rem 1.3rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em', whiteSpace: 'nowrap' },
};
