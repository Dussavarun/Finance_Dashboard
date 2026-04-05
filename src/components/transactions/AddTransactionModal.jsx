import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

export default function AddTransactionModal({ onClose, editing }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(editing || {
    description: '',
    amount: '',
    category: CATEGORIES[0],
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    const txn = { ...form, amount: parseFloat(form.amount), id: editing?.id || Date.now() };
    if (editing) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: txn });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: txn });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{editing ? 'Edit Transaction' : 'Add Transaction'}</div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input className="input" style={{ width: '100%' }} placeholder="e.g. Monthly Salary"
            value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input className="input" style={{ width: '100%' }} type="number" placeholder="0"
              value={form.amount} onChange={e => set('amount', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="input" style={{ width: '100%' }} type="date"
              value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="input" style={{ width: '100%' }}
              value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="input" style={{ width: '100%' }}
              value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}