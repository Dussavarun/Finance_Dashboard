import { useApp } from '../../context/AppContext';
import { formatCurrency, getTotalIncome, getTotalExpenses } from '../../utils/helpers';

export default function SummaryCards() {
  const { state } = useApp();
  const txns = state.transactions;

  const now = new Date();
  const thisMonth = txns.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const lastMonth = txns.filter(t => {
    const d = new Date(t.date);
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getMonth() === prev.getMonth() && d.getFullYear() === prev.getFullYear();
  });

  const income = getTotalIncome(thisMonth);
  const expenses = getTotalExpenses(thisMonth);
  const balance = income - expenses;
  const lastIncome = getTotalIncome(lastMonth);
  const lastExpenses = getTotalExpenses(lastMonth);

  const pct = (a, b) => b === 0 ? 0 : (((a - b) / b) * 100).toFixed(1);

  const cards = [
    {
      label: 'Net Balance',
      value: formatCurrency(balance),
      change: `${balance >= 0 ? '+' : ''}${pct(balance, lastIncome - lastExpenses)}% vs last month`,
      up: balance >= 0,
      accent: balance >= 0 ? 'var(--green)' : 'var(--red)',
    },
    {
      label: 'Total Income',
      value: formatCurrency(income),
      change: `${pct(income, lastIncome) >= 0 ? '+' : ''}${pct(income, lastIncome)}% vs last month`,
      up: income >= lastIncome,
      accent: 'var(--green)',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(expenses),
      change: `${pct(expenses, lastExpenses) >= 0 ? '+' : ''}${pct(expenses, lastExpenses)}% vs last month`,
      up: expenses < lastExpenses,
      accent: 'var(--red)',
    },
    {
      label: 'Savings Rate',
      value: income === 0 ? '—' : `${((balance / income) * 100).toFixed(1)}%`,
      change: `${thisMonth.length} transactions this month`,
      up: balance > 0,
      accent: balance > 0 ? 'var(--green)' : 'var(--red)',
    },
  ];

  return (
    <div className="grid-4" style={{ marginBottom: 20 }}>
      {cards.map((card, i) => (
        <div className="summary-card" key={i} style={{ borderTop: `2px solid ${card.accent}` }}>
          <div className="label">{card.label}</div>
          <div className="value" style={{ color: card.accent }}>{card.value}</div>
          <div className={`change ${card.up ? 'up' : 'down'}`}>
            <span>{card.up ? '↑' : '↓'}</span>
            <span>{card.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}