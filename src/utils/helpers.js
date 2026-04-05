export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const getMonthLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
};

export const getMonthKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const groupByMonth = (transactions) => {
  const map = {};
  transactions.forEach(t => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { income: 0, expense: 0, label: getMonthLabel(t.date) };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expense += t.amount;
  });
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([, v]) => v);
};

export const groupByCategory = (transactions) => {
  const map = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map).sort(([, a], [, b]) => b - a).map(([cat, amt]) => ({ category: cat, amount: amt }));
};

export const getTotalIncome = (txns) =>
  txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

export const getTotalExpenses = (txns) =>
  txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);