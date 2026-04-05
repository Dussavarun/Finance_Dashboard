import { useApp } from "../../context/AppContext";
import { groupByCategory, formatCurrency } from "../../utils/helpers";
import { CATEGORY_ICONS } from "../../data/mockData";
import { useState } from "react";

const COLORS = [
  "#2e7d32",
  "#c62828",
  "#f57f17",
  "#1565c0",
  "#6a1b9a",
  "#00897b",
  "#388e3c",
  "#d84315",
];

export default function SpendingBreakdown() {
  const { state } = useApp();
  const [active, setActive] = useState(null);

  const byCategory = groupByCategory(state.transactions).slice(0, 6);
  const total = byCategory.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="card">
      <div className="section-header">
        <div className="section-title">Spending Breakdown</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
          by category
        </div>
      </div>

      {byCategory.length === 0 ? (
        <div
          style={{
            color: "var(--text-muted)",
            textAlign: "center",
            padding: 40,
            fontSize: 13,
          }}
        >
          No expense data yet
        </div>
      ) : (
        <>
          {/* Donut */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160">
              {(() => {
                let offset = 0;
                const r = 56;
                const circ = 2 * Math.PI * r;

                return byCategory.map((c, i) => {
                  const pct = c.amount / total;
                  const dash = pct * circ;
                  const isActive = active === i;

                  const el = (
                    <circle
                      key={i}
                      cx="80"
                      cy="80"
                      r={r}
                      fill="none"
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth={isActive ? 22 : 16}
                      strokeDasharray={`${dash} ${circ - dash}`}
                      strokeDashoffset={-offset * circ + circ * 0.25}
                      style={{
                        transition: "all 0.4s ease",
                        filter: isActive
                          ? `drop-shadow(0 0 8px ${COLORS[i]})`
                          : "none",
                        opacity: active === null || isActive ? 1 : 0.3,
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                    />
                  );

                  offset += pct;
                  return el;
                });
              })()}

              {/* center text */}
              <text
                x="80"
                y="70"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="10"
              >
                {active !== null ? byCategory[active].category : "Total"}
              </text>

              <text
                x="80"
                y="90"
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
              >
                {active !== null
                  ? formatCurrency(byCategory[active].amount)
                  : (total / 100000).toFixed(1) + "L"}
              </text>
            </svg>
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {byCategory.map((c, i) => {
              const pct = ((c.amount / total) * 100).toFixed(1);
              const isActive = active === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    cursor: "pointer",
                    opacity: active === null || isActive ? 1 : 0.4,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>
                      {CATEGORY_ICONS[c.category] || "●"} {c.category}
                    </span>
                    <span
                      style={{
                        color: COLORS[i % COLORS.length],
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      {pct}%
                    </span>
                  </div>

                  <div
                    style={{
                      height: 6,
                      background: "var(--border)",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: COLORS[i % COLORS.length],
                        borderRadius: 99,
                        transition: "all 0.4s ease",
                        boxShadow: isActive ? `0 0 10px ${COLORS[i]}` : "none",
                        transform: isActive ? "scaleY(1.2)" : "scaleY(1)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
