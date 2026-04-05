import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

export default function TransactionFilters() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const set = (key, val) => dispatch({ type: 'SET_FILTER', payload: { [key]: val } });

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
      <input
        className="input"
        placeholder="🔍  Search transactions..."
        style={{ flex: '1 1 200px', minWidth: 160 }}
        value={filters.search}
        onChange={e => set('search', e.target.value)}
      />
      <select className="input" value={filters.type} onChange={e => set('type', e.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select className="input" value={filters.category} onChange={e => set('category', e.target.value)}>
        <option value="all">All Categories</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>
      <select className="input" value={filters.sort} onChange={e => set('sort', e.target.value)}>
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </select>
    </div>
  );
}