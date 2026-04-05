import { useApp } from '../../context/AppContext';
import './Sidebar.css';

const NAV = [
  { id: 'dashboard', label: 'Overview', icon: '▦' },
  { id: 'transactions', label: 'Transactions', icon: '⇄' },
  { id: 'insights', label: 'Insights', icon: '◈' },
];

export default function Sidebar({ open, onClose }) {
  const { state, dispatch } = useApp();

  const go = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    onClose?.();
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">Finance Dashboard</span>
        </div>

        <div className="sidebar-section-label">Dashboards</div>
        <nav className="sidebar-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${state.activePage === item.id ? 'sidebar-item--active' : ''}`}
              onClick={() => go(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label">Settings</div>
        <div className="sidebar-role">
          <div className="role-label">Active Role</div>
          <select
            className="role-select"
            value={state.role}
            onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">⚡ Admin</option>
          </select>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">AK</div>
            <div className="user-info">
              <div className="user-name">DUSSA VARUN</div>
              <div className="user-role">{state.role}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}