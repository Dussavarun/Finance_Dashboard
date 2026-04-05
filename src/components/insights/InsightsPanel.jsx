import { useApp } from "../../context/AppContext";
import {
  groupByMonth,
  groupByCategory,
  formatCurrency,
  getTotalIncome,
  getTotalExpenses,
} from "../../utils/helpers";
import { CATEGORY_ICONS } from "../../data/mockData";

export default function InsightsPanel() {
  const { state } = useApp();
  const txns = state.transactions;

  const monthly = groupByMonth(txns);
  const byCategory = groupByCategory(txns);
  const topCategory = byCategory[0];

  const last = monthly[monthly.length - 1] || {};
  const prev = monthly[monthly.length - 2] || {};

  const savingsRate =
    last.income > 0
      ? (((last.income - last.expense) / last.income) * 100).toFixed(1)
      : 0;

  const totalIncome = getTotalIncome(txns);
  const totalExpenses = getTotalExpenses(txns);

  const insights = [
    {
      icon: "🔥",
      title: "Top Spending",
      value: topCategory
        ? `${CATEGORY_ICONS[topCategory.category]} ${topCategory.category}`
        : "N/A",
      sub: topCategory ? `${formatCurrency(topCategory.amount)} spent` : "",
      color: "var(--red)",
    },
    {
      icon: "📅",
      title: "Monthly Change",
      value:
        last.expense && prev.expense
          ? `${(((last.expense - prev.expense) / prev.expense) * 100).toFixed(1)}%`
          : "N/A",
      sub: last.expense ? `Spent ${formatCurrency(last.expense)}` : "",
      color: last.expense > prev.expense ? "var(--red)" : "var(--green)",
    },
    {
      icon: "💰",
      title: "Savings",
      value: `${savingsRate}%`,
      sub: "Saved this month",
      color: parseFloat(savingsRate) > 20 ? "var(--green)" : "var(--yellow)",
    },
    {
      icon: "📊",
      title: "Net Balance",
      value: formatCurrency(totalIncome - totalExpenses),
      sub: "Across all months",
      color: totalIncome > totalExpenses ? "var(--green)" : "var(--red)",
    },
  ];

  return (
    <div className="grid-2">
      {/* Insight Cards */}
      {insights.map((ins, i) => (
        <div
          key={i}
          style={{
            padding: "18px 20px",
            borderRadius: 16,
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            transition: "all 0.25s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-4px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0px)")
          }
        >
          {/* glow accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: "100%",
              background: ins.color,
              borderRadius: "4px 0 0 4px",
            }}
          />

          <div style={{ fontSize: 22, marginBottom: 8 }}>{ins.icon}</div>

          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              marginBottom: 6,
            }}
          >
            {ins.title}
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: ins.color,
              marginBottom: 4,
            }}
          >
            {ins.value}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
            }}
          >
            {ins.sub}
          </div>
        </div>
      ))}

      {/* Table */}
      <div
        style={{
          gridColumn: "1 / -1",
          borderRadius: 16,
          background: "var(--bg-card)",
          border: "1px solid var(--border-light)",
          padding: 16,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Monthly Breakdown
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "var(--text-muted)", fontSize: 11 }}>
                {["Month", "Income", "Expenses", "Net", "Savings"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 10px",
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {monthly.map((m, i) => {
                const net = m.income - m.expense;
                const sav =
                  m.income > 0 ? ((net / m.income) * 100).toFixed(1) : "—";

                return (
                  <tr
                    key={i}
                    style={{
                      borderTop: "1px solid var(--border-light)",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "var(--bg-card-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: 10 }}>{m.label}</td>
                    <td style={{ padding: 10, color: "var(--green)" }}>
                      {formatCurrency(m.income)}
                    </td>
                    <td style={{ padding: 10, color: "var(--red)" }}>
                      {formatCurrency(m.expense)}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        color: net >= 0 ? "var(--green)" : "var(--red)",
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(net)}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        color:
                          parseFloat(sav) > 20
                            ? "var(--green)"
                            : "var(--yellow)",
                      }}
                    >
                      {sav}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
