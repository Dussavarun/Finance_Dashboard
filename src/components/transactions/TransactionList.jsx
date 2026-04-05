import { useApp } from '../../context/AppContext';
import TransactionRow from './TransactionRow';

export default function TransactionList({ onEdit }) {
  const { state } = useApp();
  const { transactions, filters } = state;

  let filtered = transactions.filter(t => {
    const search = filters.search.toLowerCase();
    if (search && !t.description.toLowerCase().includes(search) && !t.category.toLowerCase().includes(search)) return false;
    if (filters.type !== 'all' && t.type !== filters.type) return false;
    if (filters.category !== 'all' && t.category !== filters.category) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case 'date-asc': return new Date(a.date) - new Date(b.date);
      case 'amount-desc': return b.amount - a.amount;
      case 'amount-asc': return a.amount - b.amount;
      default: return new Date(b.date) - new Date(a.date);
    }
  });

  if (filtered.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '60px 0',
        color: 'var(--text-muted)', fontSize: 13,
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
        No transactions match your filters.
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
        gap: 12,
        padding: '8px 16px 10px',
        borderBottom: '1px solid var(--border)',
      }}>
        {['Description', 'Date', 'Type', 'Amount', ''].map(h => (
          <div key={h} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            {h}
          </div>
        ))}
      </div>
      {filtered.map(t => <TransactionRow key={t.id} txn={t} onEdit={onEdit} />)}
      <div style={{ padding: '10px 16px', fontSize: 11, color: 'var(--text-muted)' }}>
        {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}