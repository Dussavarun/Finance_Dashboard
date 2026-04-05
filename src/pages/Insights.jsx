import InsightsPanel from '../components/insights/InsightsPanel';

export default function Insights() {
  return (
    <div>
      <div className="page-title">Insights</div>
      <div className="page-subtitle">Patterns and observations from your financial data</div>
      <InsightsPanel />
    </div>
  );
}