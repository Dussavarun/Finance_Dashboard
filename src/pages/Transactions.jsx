import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { formatCurrency } from '../utils/helpers';

export default function Transactions() {
  const { state } = useApp();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const isAdmin = state.role === 'admin';

  const handleEdit = (txn) => { setEditing(txn); setModal(true); };
  const handleClose = () => { setModal(false); setEditing(null); };

  const exportCSV = () => {
    const rows = [['Date', 'Description', 'Category', 'Type', 'Amount']];
    state.transactions.forEach(t => rows.push([t.date, t.description, t.category, t.type, t.amount]));
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div className="page-title">Transactions</div>
          <div className="page-subtitle">{state.transactions.length} total transactions</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" onClick={exportCSV}>↓ Export CSV</button>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => setModal(true)}>+ Add Transaction</button>
          )}
        </div>
      </div>

      <TransactionFilters />

      <div className="card" style={{ padding: 0 }}>
        <TransactionList onEdit={handleEdit} />
      </div>

      {modal && <AddTransactionModal onClose={handleClose} editing={editing} />}
    </div>
  );
}