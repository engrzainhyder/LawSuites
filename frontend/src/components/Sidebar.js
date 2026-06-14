import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const clientLinks = [{ to: '/dashboard', label: 'My Cases', icon: '📋' }];

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: '🏠' },
  { to: '/admin/clients', label: 'Clients', icon: '👥' },
  { to: '/admin/cases', label: 'Cases', icon: '📁' },
  { to: '/admin/hearings', label: 'Hearings', icon: '📅' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.role === 'admin' ? adminLinks : clientLinks;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoWrap}>
        <div style={styles.logoMark}>⚖</div>
        <div>
          <div style={styles.logoName}>LawSuites</div>
          <div style={styles.logoTag}>Legal Excellence</div>
        </div>
      </div>

      <div style={styles.userCard}>
        <div style={styles.userAvatar}>{user?.fullName?.charAt(0) || 'U'}</div>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user?.fullName}</div>
          <div style={styles.userRole}>{user?.role === 'admin' ? 'Administrator' : 'Client'}</div>
        </div>
      </div>

      <div style={styles.divider} />

      <nav style={styles.nav}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/admin' || l.to === '/dashboard'}
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}
          >
            <span style={styles.linkIcon}>{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={styles.bottom}>
        <div style={styles.divider} />
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <span>↩</span> Logout
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: { width: '240px', minHeight: '100vh', background: '#0b0f1a', display: 'flex', flexDirection: 'column', flexShrink: 0, borderRight: '1px solid #1e2d45' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.8rem 1.5rem 1.5rem', borderBottom: '1px solid #1e2d45' },
  logoMark: { width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #a07830)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  logoName: { fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#e8d5a3', lineHeight: 1.2 },
  logoTag: { fontSize: '0.55rem', color: '#c9a84c', letterSpacing: '0.16em', textTransform: 'uppercase' },
  userCard: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.2rem 1.5rem' },
  userAvatar: { width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e2d45, #2d4160)', color: '#c9a84c', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", flexShrink: 0 },
  userInfo: { overflow: 'hidden' },
  userName: { color: '#e8d5a3', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  userRole: { color: '#4b5563', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' },
  divider: { height: '1px', background: '#1e2d45', margin: '0 1.5rem' },
  nav: { display: 'flex', flexDirection: 'column', gap: '0.15rem', padding: '1rem 0.75rem', flex: 1 },
  link: { display: 'flex', alignItems: 'center', gap: '0.7rem', color: '#4b5563', textDecoration: 'none', padding: '0.65rem 0.9rem', borderRadius: '3px', fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.15s' },
  linkActive: { background: '#1e2d45', color: '#c9a84c', fontWeight: 600 },
  linkIcon: { fontSize: '1rem', flexShrink: 0 },
  bottom: { padding: '0 0 1.5rem' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1rem 0.75rem 0', background: 'transparent', border: '1px solid #1e2d45', color: '#4b5563', padding: '0.6rem 0.9rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif", width: 'calc(100% - 1.5rem)' },
};
