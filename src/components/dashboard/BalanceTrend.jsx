// import { useApp } from "../../context/AppContext";
// import { groupByMonth, formatCurrency } from "../../utils/helpers";
// import { useState } from "react";

// export default function BalanceTrend() {
//   const { state } = useApp();
//   const [hovered, setHovered] = useState(null);
//   const monthly = groupByMonth(state.transactions);

//   const maxVal = Math.max(
//     ...monthly.flatMap((m) => [Number(m.income) || 0, Number(m.expense) || 0]),
//     1,
//   );

//   const CHART_HEIGHT = 180;

//   return (
//     <div className="card" style={{ marginBottom: 20 }}>
//       {/* header */}
//       <div className="section-header">
//         <div className="section-title">Monthly Overview</div>
//         <div
//           style={{
//             fontSize: 11,
//             color: "var(--text-muted)",
//             fontFamily: "var(--font-mono)",
//           }}
//         >
//           Income vs Expenses
//         </div>
//       </div>

//       {/* chart container */}
//       <div
//         style={{
//           position: "relative",
//           display: "flex",
//           alignItems: "flex-end",
//           gap: 14,
//           height: CHART_HEIGHT + 32 ,
//           paddingTop: 8,
//         }}
//       >
//         {/* subtle grid lines anchored to bottom */}
//         {[0.25, 0.5, 0.75, 1].map((pct) => (
//           <div
//             key={pct}
//             style={{
//               position: "absolute",
//               left: 0,
//               right: 0,
//               bottom: 32 + CHART_HEIGHT * pct /* 32px = label row height */,
//               height: 1,
//               background: "var(--grid-line)",
//               pointerEvents: "none",
//             }}
//           />
//         ))}

//         {monthly.map((m, i) => {
//           const incomeH = Math.max(
//             ((Number(m.income) || 0) / maxVal) * CHART_HEIGHT,
//             4,
//           );
//           const expenseH = Math.max(
//             ((Number(m.expense) || 0) / maxVal) * CHART_HEIGHT,
//             4,
//           );
//           const isHovered = hovered === i;

//           return (
//             <div
//               key={i}
//               style={{
//                 flex: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 position: "relative",
//                 cursor: "pointer",
//                 /* push label to absolute bottom of container */
//                 height: "100%",
//                 justifyContent: "flex-end",
//               }}
//               onMouseEnter={() => setHovered(i)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               {/* tooltip */}
//               {isHovered && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: 32 + Math.max(incomeH, expenseH) + 10,
//                     background: "var(--tooltip-bg)",
//                     backdropFilter: "blur(12px)",
//                     border: "1px solid var(--tooltip-border)",
//                     borderRadius: 10,
//                     padding: "7px 12px",
//                     fontSize: 11,
//                     zIndex: 10,
//                     whiteSpace: "nowrap",
//                     fontFamily: "var(--font-mono)",
//                     boxShadow: `0 8px 32px var(--tooltip-shadow)`,
//                     lineHeight: 1.7,
//                   }}
//                 >
//                   <div style={{ color: "var(--green)" }}>
//                     ↑ {formatCurrency(m.income)}
//                   </div>
//                   <div style={{ color: "var(--red)" }}>
//                     ↓ {formatCurrency(m.expense)}
//                   </div>
//                 </div>
//               )}

//               {/* bars + label wrapper */}
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   width: "100%",
//                 }}
//               >
//                 {/* bars row */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "flex-end",
//                     gap: 5,
//                     height: CHART_HEIGHT,
//                   }}
//                 >
//                   {/* Income bar */}
//                   <div
//                     style={{
//                       width: 14,
//                       height: incomeH,
//                       background: isHovered
//                         ? "linear-gradient(to top, #16a34a, #4ade80)"
//                         : "linear-gradient(to top, #15803d88, #22c55e99)",
//                       borderRadius: "5px 5px 2px 2px",
//                       transition: "all 0.35s ease",
//                       boxShadow: isHovered
//                         ? "0 0 16px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
//                         : "inset 0 1px 0 rgba(255,255,255,0.08)",
//                       border: isHovered
//                         ? "1px solid rgba(74,222,128,0.35)"
//                         : "1px solid transparent",
//                     }}
//                   />

//                   {/* Expense bar */}
//                   <div
//                     style={{
//                       width: 14,
//                       height: expenseH,
//                       background: isHovered
//                         ? "linear-gradient(to top, #b91c1c, #f87171)"
//                         : "linear-gradient(to top, #991b1b88, #ef444499)",
//                       borderRadius: "5px 5px 2px 2px",
//                       transition: "all 0.35s ease",
//                       boxShadow: isHovered
//                         ? "0 0 16px rgba(239,68,68,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
//                         : "inset 0 1px 0 rgba(255,255,255,0.08)",
//                       border: isHovered
//                         ? "1px solid rgba(248,113,113,0.35)"
//                         : "1px solid transparent",
//                     }}
//                   />
//                 </div>

//                 {/* baseline tick */}
//                 <div
//                   style={{
//                     width: "60%",
//                     height: 1,
//                     background: "var(--grid-line)",
//                     margin: "2px 0",
//                   }}
//                 />

//                 {/* month label */}
//                 <div
//                   style={{
//                     fontSize: 11,
//                     color: isHovered
//                       ? "var(--text-secondary)"
//                       : "var(--text-muted)",
//                     fontFamily: "var(--font-mono)",
//                     transition: "color 0.2s",
//                     paddingTop: 4,
//                     height: 24,
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   {m.label}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* legend */}
//       <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
//         {[
//           ["Income", "var(--green)"],
//           ["Expenses", "var(--red)"],
//         ].map(([l, c]) => (
//           <div
//             key={l}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 6,
//               fontSize: 11,
//               color: "var(--text-secondary)",
//             }}
//           >
//             <div
//               style={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 3,
//                 background: c,
//               }}
//             />
//             {l}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useApp } from "../../context/AppContext";
import { groupByMonth, formatCurrency } from "../../utils/helpers";
import { useState, useMemo } from "react";

export default function BalanceTrend() {
  const { state } = useApp();
  const [hovered, setHovered] = useState(null);
  const monthly = groupByMonth(state.transactions);

  const maxVal = Math.max(
    ...monthly.flatMap((m) => [Number(m.income) || 0, Number(m.expense) || 0]),
    1,
  );

  const CHART_HEIGHT = 180;

  // Stable seeded random multipliers per index — won't shift on re-render
  const randomMultipliers = useMemo(() => {
    const seededRand = (seed) => {
      const x = Math.sin(seed + 1) * 10000;
      return x - Math.floor(x);
    };
    return monthly.map((_, i) => ({
      income: 0.55 + seededRand(i * 2) * 0.45,      // range: 0.55 – 1.00
      expense: 0.35 + seededRand(i * 2 + 1) * 0.50, // range: 0.35 – 0.85
    }));
  }, [monthly.length]);

  return (
    <div className="card" style={{ marginBottom: 20 }}>
      {/* header */}
      <div className="section-header">
        <div className="section-title">Monthly Overview</div>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Income vs Expenses
        </div>
      </div>

      {/* chart container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
          height: CHART_HEIGHT + 32,
          paddingTop: 8,
        }}
      >
        {/* grid lines */}
        {[0.25, 0.5, 0.75, 1].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 32 + CHART_HEIGHT * pct,
              height: 1,
              background: "var(--grid-line)",
              pointerEvents: "none",
            }}
          />
        ))}

        {monthly.map((m, i) => {
          const mult = randomMultipliers[i] || { income: 0.8, expense: 0.5 };

          const incomeH = Math.max(
            ((Number(m.income) || 0) / maxVal) * CHART_HEIGHT * mult.income,
            8,
          );
          const expenseH = Math.max(
            ((Number(m.expense) || 0) / maxVal) * CHART_HEIGHT * mult.expense,
            8,
          );
          const isHovered = hovered === i;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
                height: "100%",
                justifyContent: "flex-end",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* tooltip */}
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 32 + Math.max(incomeH, expenseH) + 10,
                    background: "var(--tooltip-bg)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--tooltip-border)",
                    borderRadius: 10,
                    padding: "7px 12px",
                    fontSize: 11,
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-mono)",
                    boxShadow: "0 8px 32px var(--tooltip-shadow)",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ color: "var(--green)" }}>
                    ↑ {formatCurrency(m.income)}
                  </div>
                  <div style={{ color: "var(--red)" }}>
                    ↓ {formatCurrency(m.expense)}
                  </div>
                </div>
              )}

              {/* bars + label */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 5,
                    height: CHART_HEIGHT,
                  }}
                >
                  {/* Income bar */}
                  <div
                    style={{
                      width: 14,
                      height: incomeH,
                      background: isHovered
                        ? "linear-gradient(to top, #16a34a, #4ade80)"
                        : "linear-gradient(to top, #15803d88, #22c55e99)",
                      borderRadius: "5px 5px 2px 2px",
                      transition: "all 0.35s ease",
                      boxShadow: isHovered
                        ? "0 0 16px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
                        : "inset 0 1px 0 rgba(255,255,255,0.08)",
                      border: isHovered
                        ? "1px solid rgba(74,222,128,0.35)"
                        : "1px solid transparent",
                    }}
                  />
                  {/* Expense bar */}
                  <div
                    style={{
                      width: 14,
                      height: expenseH,
                      background: isHovered
                        ? "linear-gradient(to top, #b91c1c, #f87171)"
                        : "linear-gradient(to top, #991b1b88, #ef444499)",
                      borderRadius: "5px 5px 2px 2px",
                      transition: "all 0.35s ease",
                      boxShadow: isHovered
                        ? "0 0 16px rgba(239,68,68,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
                        : "inset 0 1px 0 rgba(255,255,255,0.08)",
                      border: isHovered
                        ? "1px solid rgba(248,113,113,0.35)"
                        : "1px solid transparent",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "60%",
                    height: 1,
                    background: "var(--grid-line)",
                    margin: "2px 0",
                  }}
                />

                <div
                  style={{
                    fontSize: 11,
                    color: isHovered ? "var(--text-secondary)" : "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    transition: "color 0.2s",
                    paddingTop: 4,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {m.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        {[
          ["Income", "var(--green)"],
          ["Expenses", "var(--red)"],
        ].map(([l, c]) => (
          <div
            key={l}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}