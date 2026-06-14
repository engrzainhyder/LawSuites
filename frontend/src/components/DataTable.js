export default function DataTable({ columns, data, emptyMsg = 'No records found.' }) {
  if (!data?.length) return <p style={styles.empty}>{emptyMsg}</p>;
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>{columns.map(c => <th key={c.key} style={styles.th}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row._id || i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              {columns.map(c => (
                <td key={c.key} style={styles.td}>
                  {c.render ? c.render(row) : row[c.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: { overflowX: 'auto', borderRadius: '10px', border: '1px solid #e5e7eb' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' },
  th: { background: '#1a1a2e', color: '#e2b96f', padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' },
  td: { padding: '0.7rem 1rem', verticalAlign: 'middle', color: '#374151' },
  rowEven: { background: '#fff' },
  rowOdd: { background: '#f9fafb' },
  empty: { textAlign: 'center', color: '#9ca3af', padding: '2rem' },
};
