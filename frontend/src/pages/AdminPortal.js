import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import { clientAPI, caseAPI } from '../services/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = { Pending: '#f59e0b', Active: '#10b981', Closed: '#6b7280', Adjourned: '#ef4444' };

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
        assignedAttorney: editCase.assignedAttorney,
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
                Client: <strong>{editCase.client?.fullName || '—'}</strong>
              </div>

              <div style={styles.modalGrid}>
                <div style={styles.mField}>
                  <label style={styles.mLabel}>Assigned Attorney</label>
                  <input style={styles.mInput} type="text" placeholder="Full name of attorney" value={editCase.assignedAttorney || ''} onChange={e => setEditCase({ ...editCase, assignedAttorney: e.target.value })} />
                </div>
                <div style={styles.mField}>
                  <label style={styles.mLabel}>Attorney Type</label>
                  <select style={styles.mInput} value={editCase.attorneyType || ''} onChange={e => setEditCase({ ...editCase, attorneyType: e.target.value })}>
                    {['Criminal', 'Tax', 'RealEstate', 'Family', 'WomensRights'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
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
  overlay: { position: 'fixed', inset: 0, background: 'rgba(11,15,26,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(2px)' },
  modal: { background: '#fff', borderRadius: '4px', padding: '2rem', width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' },
  modalTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#0b0f1a', fontSize: '1.2rem' },
  caseNum: { background: '#0b0f1a', color: '#c9a84c', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.7rem', borderRadius: '20px' },
  modalClient: { color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f0ebe3' },
  modalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  mField: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  mLabel: { fontSize: '0.75rem', fontWeight: 700, color: '#374151', letterSpacing: '0.05em', textTransform: 'uppercase' },
  mInput: { padding: '0.65rem 0.8rem', border: '1px solid #d5cfc7', borderRadius: '3px', fontSize: '0.88rem', fontFamily: "'Inter', sans-serif", background: '#faf8f5', color: '#0b0f1a', width: '100%', boxSizing: 'border-box' },
  mActions: { display: 'flex', gap: '0.8rem' },
  saveBtn: { flex: 1, background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#0b0f1a', border: 'none', padding: '0.75rem', borderRadius: '3px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  cancelBtn: { flex: 1, background: '#f9f5ef', color: '#6b7280', border: '1px solid #d5cfc7', padding: '0.75rem', borderRadius: '3px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
};
