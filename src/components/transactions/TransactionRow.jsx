import { formatCurrency, formatDate } from '../../utils/helpers';
import { CATEGORY_ICONS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function TransactionRow({ txn, onEdit }) {
  const { state, dispatch } = useApp();
  const isAdmin = state.role === 'admin';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
      alignItems: 'center',
      gap: 12,
      padding: '13px 16px',
      borderBottom: '1px solid var(--border-light)',
      transition: 'background var(--transition)',
      borderRadius: 8,
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: txn.type === 'income' ? 'var(--green-dim)' : 'var(--red-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0,
        }}>
          {CATEGORY_ICONS[txn.category] || '●'}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{txn.description}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{txn.category}</div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {formatDate(txn.date)}
      </div>

      <div><span className={`badge ${txn.type}`}>{txn.type}</span></div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        fontSize: 14,
        color: txn.type === 'income' ? 'var(--green)' : 'var(--red)',
      }}>
        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
      </div>

      {isAdmin ? (
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-ghost" style={{ padding: '5px 10px', fontSize: 11 }} onClick={() => onEdit(txn)}>Edit</button>
          <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: 11 }}
            onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: txn.id })}>Del</button>
        </div>
      ) : <div />}
    </div>
  );
}