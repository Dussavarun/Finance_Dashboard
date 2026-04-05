import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import "./Topbar.css";

const PAGE_TITLES = {
  dashboard: ["Overview", "Your financial summary at a glance"],
  transactions: ["Transactions", "Browse and manage your activity"],
  insights: ["Insights", "Patterns and observations in your data"],
};

export default function Topbar({ onMenuToggle }) {
  const { state } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [title, subtitle] = PAGE_TITLES[state.activePage] || ["", ""];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <span />
          <span />
          <span />
        </button>
        <div>
          <div className="topbar-title">{title}</div>
          <div className="topbar-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-date">{today}</div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="role-pill">
          <span
            className={`role-dot ${state.role === "admin" ? "role-dot--admin" : ""}`}
          />
          {state.role}
        </div>
      </div>
    </header>
  );
}
