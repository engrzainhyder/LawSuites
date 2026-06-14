import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import { caseAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = { Pending: '#f59e0b', Active: '#10b981', Closed: '#6b7280', Adjourned: '#ef4444' };

export default function Dashboard() {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    caseAPI.getMyCases()
      .then(r => setCases(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'caseNumber', label: 'Case #' },
    { key: 'attorneyType', label: 'Type' },
    { key: 'assignedAttorney', label: 'Attorney' },
    { key: 'experienceLevel', label: 'Level' },
    {
      key: 'status', label: 'Status',
      render: row => (
        <span style={{ background: STATUS_COLORS[row.status] + '22', color: STATUS_COLORS[row.status], padding: '0.2rem 0.7rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.8rem' }}>
          {row.status}
        </span>
      )
    },
    {
      key: 'hearings', label: 'Next Hearing',
      render: row => {
        const upcoming = row.hearings?.filter(h => new Date(h.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
        return upcoming?.length ? new Date(upcoming[0].date).toLocaleDateString('en-PK') : 'Not Scheduled';
      }
    },
    { key: 'createdAt', label: 'Filed On', render: row => new Date(row.createdAt).toLocaleDateString('en-PK') },
  ];

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.h1}>My Cases</h1>
            <p style={styles.sub}>Welcome, {user?.fullName}</p>
          </div>
          <div style={styles.statBadge}>{cases.length} Case{cases.length !== 1 ? 's' : ''}</div>
        </div>

        {loading ? <p>Loading...</p> : (
          <>
            <DataTable columns={columns} data={cases} emptyMsg="No cases found. File your first case via the AI Matchmaker." />

            {cases.map(c => c.hearings?.length > 0 && (
              <div key={c._id} style={styles.hearingCard}>
                <h3 style={styles.h3}>{c.caseNumber} — Scheduled Hearings</h3>
                <div style={styles.hearingList}>
                  {c.hearings.sort((a, b) => new Date(a.date) - new Date(b.date)).map(h => (
                    <div key={h._id} style={styles.hearing}>
                      <span style={styles.hearingDate}>{new Date(h.date).toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      {h.notes && <span style={styles.hearingNote}>{h.notes}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f8fafc' },
  main: { flex: 1, padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' },
  h1: { fontSize: '1.6rem', fontWeight: 800, color: '#1a1a2e', margin: 0 },
  sub: { color: '#6b7280', marginTop: '0.2rem' },
  statBadge: { background: '#1a1a2e', color: '#e2b96f', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 700 },
  hearingCard: { marginTop: '1.5rem', background: '#fff', borderRadius: '10px', padding: '1.2rem', boxShadow: '0 1px 8px #0001' },
  h3: { fontWeight: 700, color: '#1a1a2e', marginBottom: '0.8rem', fontSize: '1rem' },
  hearingList: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  hearing: { display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.5rem 0.8rem', background: '#f0fdf4', borderRadius: '7px', borderLeft: '3px solid #10b981' },
  hearingDate: { fontWeight: 600, color: '#065f46', fontSize: '0.9rem' },
  hearingNote: { color: '#6b7280', fontSize: '0.85rem' },
};
