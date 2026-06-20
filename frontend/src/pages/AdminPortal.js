import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import { clientAPI, caseAPI } from '../services/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = { Pending: '#f59e0b', Active: '#10b981', Closed: '#6b7280', Adjourned: '#ef4444' };

const ATTORNEY_MAP = {
  Criminal:     'Adv. Ghufraan',
  Tax:          'Adv. Zain',
  RealEstate:   'Adv. Usman',
  Family:       'Adv. Anas',
  WomensRights: 'Adv. Javeria',
};

export default function AdminPortal() {
  const { pathname } = useLocation();
  const tab = pathname === '/admin/cases' ? 'cases' : 'clients';

  const [clients, setClients] = useState([]);
  const [cases, setCases] = useState([]);
  const [editCase, setEditCase] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [cl, ca] = await Promise.all([clientAPI.getAll(), caseAPI.getAll()]);
      setClients(cl.data);
      setCases(ca.data);
    } catch { toast.error('Failed to load data.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const deleteClient = async (id) => {
    if (!window.confirm('Delete this client and all their cases?')) return;
    try { await clientAPI.remove(id); toast.success('Client deleted.'); fetchAll(); }
    catch { toast.error('Delete failed.'); }
  };

  const deleteCase = async (id) => {
    if (!window.confirm('Delete this case?')) return;
    try { await caseAPI.remove(id); toast.success('Case deleted.'); fetchAll(); }
    catch { toast.error('Delete failed.'); }
  };

  const saveCase = async () => {
    try {
      await caseAPI.update(editCase._id, {
        experienceLevel: editCase.experienceLevel,
        status: editCase.status,
        attorneyType: editCase.attorneyType,
      });
      toast.success('Case updated.');
      setEditCase(null);
      fetchAll();
    } catch { toast.error('Update failed.'); }
  };

  const clientCols = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'cnic', label: 'CNIC' },
    { key: 'recommendedType', label: 'Type' },
    { key: 'createdAt', label: 'Registered', render: r => new Date(r.createdAt).toLocaleDateString('en-PK') },
    { key: 'actions', label: '', render: r => <button onClick={() => deleteClient(r._id)} style={styles.delBtn}>Delete</button> },
  ];

  const caseCols = [
    { key: 'caseNumber', label: 'Case #' },
    { key: 'client', label: 'Client', render: r => r.client?.fullName || '—' },
    { key: 'email', label: 'Email', render: r => r.client?.email || '—' },
    { key: 'attorneyType', label: 'Type' },
    { key: 'assignedAttorney', label: 'Attorney' },
    {
      key: 'status', label: 'Status',
      render: r => (
        <span style={{ background: STATUS_COLORS[r.status] + '22', color: STATUS_COLORS[r.status], padding: '0.2rem 0.7rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.78rem' }}>
          {r.status}
        </span>
      )
    },
    { key: 'createdAt', label: 'Filed', render: r => new Date(r.createdAt).toLocaleDateString('en-PK') },
    {
      key: 'actions', label: '',
      render: r => (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button onClick={() => setEditCase({ ...r, client: r.client })} style={styles.editBtn}>Edit</button>
          <button onClick={() => deleteCase(r._id)} style={styles.delBtn}>Delete</button>
        </div>
      )
    },
  ];

  const stats = [
    { label: 'Total Clients', value: clients.length, color: '#6366f1' },
    { label: 'Total Cases', value: cases.length, color: '#c9a84c' },
    { label: 'Active', value: cases.filter(c => c.status === 'Active').length, color: '#10b981' },
    { label: 'Pending', value: cases.filter(c => c.status === 'Pending').length, color: '#f59e0b' },
  ];

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <h1 style={styles.h1}>Admin Dashboard</h1>
          <p style={styles.h1Sub}>Manage clients, cases, and hearings</p>
        </div>

        <div style={styles.statsGrid}>
          {stats.map(s => (
            <div key={s.label} style={{ ...styles.statCard, borderTop: `3px solid ${s.color}` }}>
              <div style={{ ...styles.statVal, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>{tab === 'clients' ? 'Registered Clients' : 'All Cases'}</h2>
            <span style={styles.tableCount}>{tab === 'clients' ? clients.length : cases.length} records</span>
          </div>
          {loading
            ? <div style={styles.loading}>Loading...</div>
            : tab === 'clients'
              ? <DataTable columns={clientCols} data={clients} emptyMsg="No clients registered yet." />
              : <DataTable columns={caseCols} data={cases} emptyMsg="No cases filed yet." />
          }
        </div>

        {/* EDIT MODAL */}
        {editCase && (
          <div style={styles.overlay} onClick={e => e.target === e.currentTarget && setEditCase(null)}>
            <div style={styles.modal}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>Edit Case</h3>
                <span style={styles.caseNum}>{editCase.caseNumber}</span>
              </div>
              <div style={styles.modalClient}>
                Client: <strong style={{ color: '#e8d5a3' }}>{editCase.client?.fullName || '—'}</strong>
              </div>

              <div style={styles.modalGrid}>
                <div style={styles.mField}>
                  <label style={styles.mLabel}>Attorney Type</label>
                  <select style={styles.mInput} value={editCase.attorneyType || ''} onChange={e => setEditCase({ ...editCase, attorneyType: e.target.value })}>
                    {['Criminal', 'Tax', 'RealEstate', 'Family', 'WomensRights'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div style={styles.mField}>
                  <label style={styles.mLabel}>Assigned Attorney</label>
                  <div style={{ ...styles.mInput, background: '#0b0f1a', color: '#c9a84c', display: 'flex', alignItems: 'center', fontWeight: 600, border: '1px solid #1e2d45' }}>
                    {ATTORNEY_MAP[editCase.attorneyType] || '—'}
                  </div>
                </div>
                <div style={styles.mField}>
                  <label style={styles.mLabel}>Experience Level</label>
                  <select style={styles.mInput} value={editCase.experienceLevel || 'Mid'} onChange={e => setEditCase({ ...editCase, experienceLevel: e.target.value })}>
                    {['Junior', 'Mid', 'Senior'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div style={styles.mField}>
                  <label style={styles.mLabel}>Case Status</label>
                  <select style={styles.mInput} value={editCase.status || 'Pending'} onChange={e => setEditCase({ ...editCase, status: e.target.value })}>
                    {['Pending', 'Active', 'Closed', 'Adjourned'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div style={styles.mActions}>
                <button onClick={saveCase} style={styles.saveBtn}>Save Changes</button>
                <button onClick={() => setEditCase(null)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f0ebe3', fontFamily: "'Inter', sans-serif" },
  main: { flex: 1, padding: '2rem 2.5rem', overflow: 'auto' },
  pageHeader: { marginBottom: '1.8rem' },
  h1: { fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', fontWeight: 700, color: '#0b0f1a' },
  h1Sub: { color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.2rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.8rem' },
  statCard: { background: '#fff', borderRadius: '4px', padding: '1.3rem 1.5rem', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' },
  statVal: { fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, lineHeight: 1 },
  statLabel: { color: '#9ca3af', fontSize: '0.78rem', marginTop: '0.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' },
  tableCard: { background: '#fff', borderRadius: '4px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem', borderBottom: '1px solid #f0ebe3' },
  tableTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#0b0f1a' },
  tableCount: { background: '#f0ebe3', color: '#6b7280', fontSize: '0.78rem', fontWeight: 600, padding: '0.25rem 0.7rem', borderRadius: '20px' },
  loading: { padding: '3rem', textAlign: 'center', color: '#9ca3af' },
  editBtn: { background: '#1e2d45', color: '#c9a84c', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" },
  delBtn: { background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '0.3rem 0.75rem', borderRadius: '3px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(5,8,15,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(6px)' },
  modal: { background: '#0b0f1a', border: '1px solid #1e2d45', borderRadius: '4px', padding: '0', width: '100%', maxWidth: '500px', boxShadow: '0 30px 80px rgba(0,0,0,0.6)', overflow: 'hidden' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem', padding: '1.8rem 2rem 0' },
  modalTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#e8d5a3', fontSize: '1.35rem' },
  caseNum: { background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.8rem', borderRadius: '20px', letterSpacing: '0.05em' },
  modalClient: { color: '#4b5563', fontSize: '0.83rem', margin: '0.3rem 2rem 0', paddingBottom: '1.2rem', borderBottom: '1px solid #1e2d45' },
  modalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.4rem 2rem', },
  mField: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  mLabel: { fontSize: '0.68rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.12em', textTransform: 'uppercase' },
  mInput: { padding: '0.7rem 0.9rem', border: '1px solid #1e2d45', borderRadius: '3px', fontSize: '0.88rem', fontFamily: "'Inter', sans-serif", background: '#111827', color: '#e8d5a3', width: '100%', boxSizing: 'border-box', outline: 'none' },
  mActions: { display: 'flex', gap: '0.8rem', padding: '1.2rem 2rem 1.8rem', borderTop: '1px solid #1e2d45', marginTop: '0.4rem' },
  saveBtn: { flex: 1, background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.8rem', borderRadius: '3px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', letterSpacing: '0.03em' },
  cancelBtn: { flex: 1, background: 'transparent', color: '#4b5563', border: '1px solid #1e2d45', padding: '0.8rem', borderRadius: '3px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem' },
};
