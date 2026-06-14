import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { caseAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function ManageHearings() {
  const [cases, setCases] = useState([]);
  const [selected, setSelected] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    try {
      const { data } = await caseAPI.getAll();
      setCases(data);
    } catch { toast.error('Failed to load cases.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCases(); }, []);

  const addHearing = async (e) => {
    e.preventDefault();
    if (!selected) { toast.error('Select a case.'); return; }
    try {
      await caseAPI.addHearing(selected, { date, notes });
      toast.success('Hearing scheduled.');
      setDate(''); setNotes('');
      fetchCases();
    } catch { toast.error('Failed to schedule hearing.'); }
  };

  const removeHearing = async (caseId, hearingId) => {
    if (!window.confirm('Delete this hearing?')) return;
    try {
      await caseAPI.deleteHearing(caseId, hearingId);
      toast.success('Hearing removed.');
      fetchCases();
    } catch { toast.error('Failed to delete hearing.'); }
  };

  const selectedCase = cases.find(c => c._id === selected);

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <h1 style={styles.h1}>Manage Hearings</h1>
        <div style={styles.grid}>
          <div style={styles.panel}>
            <h2 style={styles.h2}>Schedule New Hearing</h2>
            <form onSubmit={addHearing} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Select Case</label>
                <select style={styles.input} value={selected} onChange={e => setSelected(e.target.value)} required>
                  <option value="">-- Choose a case --</option>
                  {cases.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.caseNumber} — {c.client?.fullName} ({c.attorneyType})
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Hearing Date & Time</label>
                <input style={styles.input} type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Notes (optional)</label>
                <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Courtroom number, judge name, etc." />
              </div>
              <button type="submit" style={styles.btn}>Schedule Hearing</button>
            </form>
          </div>

          <div style={styles.panel}>
            <h2 style={styles.h2}>
              {selectedCase ? `Hearings for ${selectedCase.caseNumber}` : 'All Upcoming Hearings'}
            </h2>
            {loading ? <p>Loading...</p> : (
              <div style={styles.hearingList}>
                {(selectedCase ? [selectedCase] : cases).flatMap(c =>
                  (c.hearings || []).map(h => ({ ...h, caseId: c._id, caseNumber: c.caseNumber, clientName: c.client?.fullName }))
                ).sort((a, b) => new Date(a.date) - new Date(b.date)).map(h => (
                  <div key={h._id} style={styles.hearingCard}>
                    <div style={styles.hearingTop}>
                      <span style={styles.caseTag}>{h.caseNumber}</span>
                      <span style={styles.clientTag}>{h.clientName}</span>
                    </div>
                    <div style={styles.hearingDate}>
                      📅 {new Date(h.date).toLocaleString('en-PK', { dateStyle: 'full', timeStyle: 'short' })}
                    </div>
                    {h.notes && <div style={styles.hearingNotes}>{h.notes}</div>}
                    <button onClick={() => removeHearing(h.caseId, h._id)} style={styles.delBtn}>Remove</button>
                  </div>
                ))}
                {!loading && (selectedCase ? [selectedCase] : cases).flatMap(c => c.hearings || []).length === 0 && (
                  <p style={styles.empty}>No hearings scheduled.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f8fafc' },
  main: { flex: 1, padding: '2rem' },
  h1: { fontSize: '1.6rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '1.5rem' },
  panel: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 8px #0001' },
  h2: { fontWeight: 700, color: '#1a1a2e', marginBottom: '1.2rem', fontSize: '1.1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.9rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.85rem', fontWeight: 600, color: '#374151' },
  input: { padding: '0.7rem', borderRadius: '7px', border: '1px solid #d1d5db', fontSize: '0.9rem', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' },
  btn: { background: '#1a1a2e', color: '#e2b96f', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' },
  hearingList: { display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '500px', overflowY: 'auto' },
  hearingCard: { background: '#f8fafc', borderRadius: '8px', padding: '0.9rem', borderLeft: '3px solid #6366f1' },
  hearingTop: { display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' },
  caseTag: { background: '#1a1a2e', color: '#e2b96f', fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.6rem', borderRadius: '10px' },
  clientTag: { color: '#6b7280', fontSize: '0.82rem', fontWeight: 500 },
  hearingDate: { fontWeight: 600, color: '#1e293b', fontSize: '0.88rem', marginBottom: '0.3rem' },
  hearingNotes: { color: '#6b7280', fontSize: '0.82rem', marginBottom: '0.5rem' },
  delBtn: { background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '0.2rem 0.6rem', borderRadius: '5px', cursor: 'pointer', fontSize: '0.78rem' },
  empty: { textAlign: 'center', color: '#9ca3af', padding: '2rem' },
};
